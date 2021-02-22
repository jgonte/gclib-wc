import { Fragment, h } from "gclib-vdom";

/**
 * Render when the data property has been passed to the element
 */
export const renderData = Symbol('renderData');

/**
 * Render when the data property has been passed to the element but it is an empty array
 */
export const renderEmptyData = Symbol('renderEmptyData');

/**
 * Render when no data property has been passed to the element
 */
export const renderNoData = Symbol('renderNoData');

const DataLoadableMixin = Base =>

    class DataLoadable extends Base {

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
            renderData: {
                type: Function
            }
        };

        render() {

            const {
                data
            } = this.props;

            return data !== undefined ?
                this[renderData as any]() :
                // The derived components must implement this method to allow to display their children if no data was provided
                this[renderNoData as any]();
        }

        [renderData]() {

            const {
                data,
                renderData: renderRecord
            } = this.props;

            if (data.length === 0) { // The data was provided but it was empty

                return this[renderEmptyData]();
            }

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

        [renderEmptyData]() {

            return 'There is no data to display';
        }
    };

export default DataLoadableMixin;