import { markupToVDom, ElementNode, TextNode } from "gclib-vdom";
import oneOf from "../../../core/helpers/oneOf";

/**
 * Renders a component based on its data
 */
const DataMixin = Base =>

    class Data extends Base {

        static properties = {

            /**
             * The data fed into the element
             */
            data: {
                type: oneOf(Function, Array),
                mutable: true
            },

            /**
             * The definition of the fields to translate from the data of the record to the item component to generate
             */
            fields: {
                type: Array // Array<DataFieldDefinition>
            },

            /**
             * The function to render the data item
             */
            renderRecord: {
                attribute: 'render-record',
                type: Function,
                // change: (host, value) => {

                //     if (value !== undefined) {

                //         host.renderRecord = value.bind(host);
                //     }
                //     else {

                //         host.renderRecord = null;
                //     }
                // }
            }
        };

        /**
         * Reference to the loaded data
         */
        data: any;

        constructor(props?, children?) {

            super(props, children);
        }

        async elementWillConnect() {

            super.elementWillConnect?.();

            if (this.data === undefined) {
    
                this.data = await this.getData();
    
                if (this.data.payload !== undefined) {
    
                    this.data = this.data.payload;
                }
            }
        }

        async getData() {

            // If it is loadable (it has an URL to load from), then load it
            const {
                loadUrl
            } = this.props;

            if (loadUrl !== undefined) {

                return await this.load();
            }

            const {
                data
            } = this.props;

            if (data === undefined) {

                return undefined;
            }

            if (typeof data === 'function') { // If it is a function then call it

                return data();
            }
            else { // An array of records

                return data;
            }
        }

        renderData(): ElementNode | TextNode | string {

            const {
                fields
            } = this.props;

            let data = this.data;

            if (data === undefined) { // The data has not been cached, load it

                if (this.props.data !== undefined) { // It has local data

                    data = this.props.data;

                    if (typeof data === 'function') {

                        data = data.call(this);
                    }
                }
                else { // Request the remote data and return null, since setData will trigger a refresh

                    this.getData().then(data => {
                    
                        this.setData(data);
    
                        this.data = data;
                    });
    
                    return null;
                }

            }

            if (data.payload !== undefined) {

                data = data.payload;
            }

            // if (data === undefined) {

            //     return this.renderNoData();
            // }

            if (data.length === 0) { // The data was provided but it was empty

                return this.renderEmptyData();
            }

            const {
                renderRecord
            } = this;

            if (renderRecord !== undefined) {

                return data.map((record, index) => {

                    const markup = renderRecord(record, index);

                    if (typeof markup === 'string') {

                        const vNode = markupToVDom(markup.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });

                        if (this.wrapRecord !== undefined) {

                            return this.wrapRecord(record, index, vNode);
                        }
                        else {

                            return vNode;
                        }
                    }
                    else {

                        return markup;
                    }
                });
            }
            else if (fields !== undefined) {

                const fds = typeof fields === 'function' ?
                    fields() :
                    fields;

                return this.renderFields(fds, data);
            }
            else { // Show the user the data

                return JSON.stringify(data);
            }
        }

        // renderField(field: DataFieldDefinition, data: any) : ElementNode {

        //     const value = data[field.name];

        //     return (<gcl-text>{value}</gcl-text>);
        // }

        renderNoData() {

            return null;
        }

        renderEmptyData() {

            return 'There is no data to display';
        }

        connectedCallback() {

            super.connectedCallback?.();

            this.bindRenderRecord();
        }

        bindRenderRecord() {

            // This method is optional since the component might not use the data but have hardcoded children
            const renderRecord = this.props.renderRecord || this.renderRecord;

            if (renderRecord !== undefined) {

                this.renderRecord = renderRecord.bind(this);
            }
        }
    };

export default DataMixin;