import { Fragment, h } from "gclib-vdom";

/**
 * Enables rendering data for a component
 * @param Base 
 * @returns 
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
             * The function to render the data item
             */
            renderRecord: {
                type: Function
            }
        };

        constructor(props?, children?) {

            super(props, children);           
        }

        renderData() {

            const {
                data
            } = this.props;

            if (data === undefined) {

                return this.renderNoData();
            }

            if (data.length === 0) { // The data was provided but it was empty

                return this.renderEmptyData();
            }

            const {
                renderRecord
            } = this;

            if (renderRecord !== undefined) {

                return (
                    <Fragment>
                        {data.map(record => renderRecord(record))}
                    </Fragment>
                );
            }
            else { // Show the user the data

                return JSON.stringify(data);
            }
        }

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
    };

export default DataMixin;