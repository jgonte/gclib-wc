import { markupToVDom, ElementNode, TextNode } from "gclib-vdom";

/**
 * Enables rendering data for a component
 */
const DataMixin = Base =>

    class Data extends Base {

        static properties = {

            /**
             * The data fed into the element
             */
            data: {
                type: Array,
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

        constructor(props?, children?) {

            super(props, children);
        }

        renderData(): ElementNode | TextNode | string {

            let {
                data
            } = this.props;

            const {
                fields
            } = this.props;

            if (data === undefined) {

                return this.renderNoData();
            }

            if (typeof data === 'function') {

                data = data();
            }

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