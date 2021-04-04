import ContainerMixin from '../../../core/mixins/ContainerMixin';
import { config } from '../../config';
export const selectionChanged = 'selectionChanged';
/**
 * Allows a component to be selectable
 * @param Base
 */
const SelectableMixin = Base => { var _a; return _a = class Selectable extends ContainerMixin(Base) {
        constructor() {
            super();
            this.toggleSelect = this.toggleSelect.bind(this);
        }
        attributeChangedCallback(attributeName, oldValue, newValue) {
            if (super.attributeChangedCallback) {
                super.attributeChangedCallback(attributeName, oldValue, newValue);
            }
            if (attributeName === "selectable") {
                if (newValue === "true" || newValue === "") {
                    this.addEventListener('click', this.toggleSelect);
                }
                else { // newValue === "false"
                    if (this.props.selected) { // Unselect if selected
                        this.setSelected(false);
                        this.dispatchEvent(new CustomEvent(selectionChanged, {
                            detail: {
                                child: this,
                                removed: this.props.value
                            },
                            bubbles: true,
                            composed: true
                        }));
                    }
                    this.removeEventListener('click', this.toggleSelect);
                }
            }
        }
        toggleSelect() {
            const { selectable, selected, value } = this.props;
            if (!selectable) {
                return;
            }
            this.setSelected(!selected);
            this.dispatchEvent(new CustomEvent('selectionChanged', {
                detail: this.props.selected ? // Need to read again since the property was updated
                    {
                        child: this,
                        added: value
                    } :
                    {
                        child: this,
                        removed: value
                    },
                bubbles: true,
                composed: true
            }));
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/selectable/Selectable.css`
        ]
    },
    _a.properties = {
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
            passToChildren: true // Maybe the children want to show some UI that they were selected
        },
        /**
         * The value to select in the event
         */
        value: {
            type: Object
        }
    },
    _a; };
export default SelectableMixin;
