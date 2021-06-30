import { markupToVDom } from "gclib-vdom";
/**
 * Enables rendering data for a component
 * @param Base
 * @returns
 */
const DataMixin = Base => { var _a; return _a = class Data extends Base {
        constructor(props, children) {
            super(props, children);
        }
        renderData() {
            const { data, fields } = this.props;
            if (data === undefined) {
                return this.renderNoData();
            }
            if (data.length === 0) { // The data was provided but it was empty
                return this.renderEmptyData();
            }
            const { renderRecord } = this;
            if (renderRecord !== undefined) {
                return data.map((record, index) => {
                    const markup = renderRecord(record, index);
                    if (typeof markup === 'string') {
                        return markupToVDom(markup.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
                    }
                    else {
                        return markup;
                    }
                });
            }
            else if (fields !== undefined) {
                const fds = typeof fields === 'function' ? fields() : fields;
                return this.renderFields(fds, data);
            }
            else { // Show the user the data
                return JSON.stringify(data);
            }
        }
        // renderField(field: DataFieldDefinition, data: any) : VirtualNode {
        //     const value = data[field.name];
        //     return (<gcl-text>{value}</gcl-text>);
        // }
        renderNoData() {
            return null;
        }
        renderEmptyData() {
            return 'There is no data to display';
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
            type: Function
        },
        /**
         * The name of the property that identifies the record id
         */
        recordId: {
            attribute: 'record-id',
            type: String,
            value: 'id'
        }
    },
    _a; };
export default DataMixin;
