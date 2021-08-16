import { config } from '../../../config';
import SelectableMixin from '../SelectableMixin';

/**
 * Allows a component to be selected when clicked
 */
const SelectableOnClickMixin = Base =>

    class SelectableOnClick extends SelectableMixin(Base) {

        static component = {

            styleUrls: [

                `${config.assetsFolder}/mixins/selectable/on-click/SelectableOnClick.css`
            ]
        };

        constructor() {

            super();

            this.toggleSelect = this.toggleSelect.bind(this);
        }

        connectedCallback() {

            super.connectedCallback?.();
    
            this.addEventListener('click', this.toggleSelect);
        }
    
        disconnectedCallback() {
    
            super.disconnectedCallback?.();
    
            this.removeEventListener('click', this.toggleSelect);
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

            this.notifySelectionChanged(undefined);
        }
    };

export default SelectableOnClickMixin;