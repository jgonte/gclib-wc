/**
 * Allows the component to call a handler when the selection has changed
 */
const SelectionHandlerMixin = Base => { var _a; return _a = class SelectionHandler extends Base {
        callSelectionChanged(selection) {
            const { selectionChanged } = this.props;
            if (selectionChanged !== undefined) {
                selectionChanged(selection || this.props.selection); // Re-read from the updated selection props
            }
        }
    },
    _a.properties = {
        /**
         * The handler to call when the selection has changed
         */
        selectionChanged: {
            attribute: 'selection-changed',
            type: Function
        }
    },
    _a; };
export default SelectionHandlerMixin;
