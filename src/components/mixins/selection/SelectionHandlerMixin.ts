/**
 * Allows the component to call a handler when the selection has changed
 */
const SelectionHandlerMixin = Base =>

    class SelectionHandler extends Base {

        static properties = {

            /**
             * The handler to call when the selection has changed
             */
             selectionChanged: {
                attribute: 'selection-changed',
                type: Function
            }
        };

        callSelectionChanged(selection) {

            const {
                selectionChanged
            } = this.props;

            if (selectionChanged !== undefined) {

                selectionChanged(selection || this.props.selection); // Re-read from the updated selection props
            }
        }
    };

export default SelectionHandlerMixin;