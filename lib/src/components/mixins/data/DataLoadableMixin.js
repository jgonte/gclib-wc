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
const DataLoadableMixin = Base => { var _a; return _a = class DataLoadable extends Base {
        render() {
            const { data } = this.props;
            return data !== undefined ?
                this[renderData]() :
                // The derived components must implement this method to allow to display their children if no data was provided
                this[renderNoData]();
        }
        [renderData]() {
            const { data, renderData: renderRecord } = this.props;
            if (data.length === 0) { // The data was provided but it was empty
                return this[renderEmptyData]();
            }
            if (renderRecord !== undefined) {
                return (h(Fragment, null, data.map(record => renderRecord(record))));
            }
            else { // Show the user the data
                return JSON.stringify(data);
            }
        }
        [renderEmptyData]() {
            return 'There is no data to display';
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
         * The function to render the data item
         */
        renderData: {
            type: Function
        }
    },
    _a; };
export default DataLoadableMixin;
