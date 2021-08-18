export const selectionChanged = 'selectionChanged';

/**
 * Allows a component to be selected when clicked
 */
const SelectableMixin = Base =>

    class Selectable extends Base {

        static properties = {

            /**
             * Whether the component is selectable
             */
            selectable: {
                type: Boolean,
                value: true,
                reflect: true,
                passToChildren: true // Maybe the children are selectable too
            },

            /**
             * Whether the item is selected
             */
            selected: {
                type: Boolean,
                mutable: true,
                reflect: true,
                //passToChildren: true // Maybe the children want to show some UI that they were selected
            },

            /**
             * The value to select in the event
             */
            selectableValue: {
                attribute: 'selectable-value',
                type: Object
            }
        };

        notifySelectionChanged(selection) {

            const {
                selectableValue
            } = this.props;

            this.dispatchEvent(new CustomEvent(selectionChanged, {
                detail: {
                    child: this,
                    selection,
                    selectableValue // Needed to determine what value to remove in a multiple selection when the new selection is undefined
                },
                bubbles: true,
                composed: true
            }));
        }

    };

export default SelectableMixin;