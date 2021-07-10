import { config } from '../../config';

export const selectionChanged = 'selectionChanged';

/**
 * Allows a component to be selectable
 */
const SelectableMixin = Base =>

    class Selectable extends Base {

        static component = {

            styleUrls: [

                `${config.assetsFolder}/mixins/selectable/Selectable.css`
            ]
        };

        static properties = {

            /**
             * Whether the item is selectable
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
            value: {
                type: Object
            }
        };

        constructor(props, children) {

            super(props, children);

            this.toggleSelect = this.toggleSelect.bind(this);
        }

        nodeDidConnect(node: Node) {

            super.nodeDidConnect?.(node);

            const {
                selectable
            } = this.props;

            if (selectable === true) {

                node.addEventListener('click', this.toggleSelect);
            }
        }

        // attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

        //     if (super.attributeChangedCallback) {

        //         super.attributeChangedCallback(attributeName, oldValue, newValue);
        //     }

        //     if (attributeName === "selectable") {

        //         if (newValue === "true" || newValue === "") {

        //             this.addEventListener('click', this.toggleSelect);
        //         }
        //         else { // newValue === "false"

        //             if (this.props.selected) { // Unselect if selected

        //                 this.setSelected(false);

        //                 this.dispatchEvent(new CustomEvent(selectionChanged, {
        //                     detail: {
        //                         child: this,
        //                         removed: this.props.value
        //                     },
        //                     bubbles: true,
        //                     composed: true
        //                 }));
        //             }

        //             this.removeEventListener('click', this.toggleSelect);
        //         }
        //     }
        // }

        toggleSelect() {

            const {
                selectable,
                selected
            } = this.props;

            if (!selectable) {

                return;
            }

            this.setSelected(!selected);

            this.rootElement.dispatchEvent(new CustomEvent(selectionChanged, {
                detail: {
                    child: this,
                    selected: this.props.selected// Need to read again since the property was updated
                },
                bubbles: true,
                composed: true
            }));
        }
    };

export default SelectableMixin;