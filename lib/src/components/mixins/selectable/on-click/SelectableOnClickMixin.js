import { config } from '../../../config';
import SelectableMixin from '../SelectableMixin';
/**
 * Allows a component to be selected when clicked
 */
const SelectableOnClickMixin = Base => { var _a; return _a = class SelectableOnClick extends SelectableMixin(Base) {
        constructor() {
            super();
            this.toggleSelect = this.toggleSelect.bind(this);
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.addEventListener('click', this.toggleSelect);
        }
        disconnectedCallback() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
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
            const { selectable, selected } = this.props;
            if (!selectable) {
                return;
            }
            this.setSelected(!selected);
            this.notifySelectionChanged(undefined);
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/selectable/on-click/SelectableOnClick.css`
        ]
    },
    _a; };
export default SelectableOnClickMixin;
