import { isPrimitive } from "gclib-utils";
import { markupToVDom, h } from "gclib-vdom";
import oneOf from "../../../core/helpers/oneOf";
/**
 * Renders a component based on its data
 */
const DataMixin = Base => { var _a; return _a = class Data extends Base {
        constructor(props, children) {
            super(props, children);
        }
        async elementWillConnect() {
            var _a;
            (_a = super.elementWillConnect) === null || _a === void 0 ? void 0 : _a.call(this);
            if (this.data === undefined) {
                this.data = await this.getData();
                if (this.data.payload !== undefined) {
                    this.data = this.data.payload;
                }
            }
        }
        async getData() {
            // If it is loadable (it has an URL to load from), then load it
            const { loadUrl } = this.props;
            if (loadUrl !== undefined) {
                return await this.load();
            }
            const { data } = this.props;
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
        renderData() {
            const { fields, size, selectable } = this.props;
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
            const { renderRecord } = this;
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
                // Sample the data to see if the are an array of primitives
                const firstItem = data[0];
                // If it is an array of primitives then
                if (isPrimitive(firstItem)) {
                    return data.map((item, index) => {
                        return (h("gcl-selectable-row", { hoverable: true, children: (h("span", { style: { width: '100%' } }, item)), size: size, selectable: selectable, "selectable-value": item, key: item || index, index: index }));
                    });
                }
                else {
                    return JSON.stringify(data);
                }
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
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.bindRenderRecord();
        }
        bindRenderRecord() {
            // This method is optional since the component might not use the data but have hardcoded children
            const renderRecord = this.props.renderRecord || this.renderRecord;
            if (renderRecord !== undefined) {
                this.renderRecord = renderRecord.bind(this);
            }
        }
    },
    _a.properties = {
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
    },
    _a; };
export default DataMixin;
