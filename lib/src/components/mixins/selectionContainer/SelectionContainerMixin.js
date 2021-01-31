import ContainerMixin from "../../../core/mixins/ContainerMixin";
const SelectionContainerMixin = Base => { var _a; return _a = 
//@ts-ignore
class SelectionContainer extends ContainerMixin(Base) {
        constructor() {
            super();
            this.updateSelection = this.updateSelection.bind(this);
        }
        attributeChangedCallback(attributeName, oldValue, newValue) {
            if (super.attributeChangedCallback) {
                super.attributeChangedCallback(attributeName, oldValue, newValue);
            }
            if (attributeName === "selectable") {
                if (newValue === "true" || newValue === "") {
                    this.addEventListener('selectionChanged', this.updateSelection);
                }
                else { // newValue === "false"
                    this.removeEventListener('selectionChanged', this.updateSelection);
                }
            }
        }
        updateSelection(e) {
            const { multiple, selection, selectionChanged } = this.props;
            const { added, removed, child } = e.detail;
            if (multiple !== undefined) { // Add values to the selection
                if (added != undefined) {
                    this.setSelection([...selection, added]);
                }
                else if (removed != undefined) {
                    const index = selection.indexOf(removed);
                    selection.splice(index, 1);
                    this.setSelection(selection);
                }
            }
            else { // Replace the old selected value with the new selected one
                const { selectedChild } = this.state;
                // Deselect previous selected attribute
                if (selectedChild !== undefined) {
                    selectedChild.setAttribute("selected", "false");
                }
                if (added != undefined) {
                    this.setSelection([added]);
                    this.setSelectedChild(child);
                }
                else if (removed != undefined) {
                    this.setSelection([]);
                    this.setSelectedChild(undefined);
                }
            }
            if (selectionChanged !== undefined) {
                selectionChanged(this.props.selection); // Re-read from the updated selection props
            }
        }
        notifyChildren() {
            if (super.notifyChildren) {
                super.notifyChildren();
            }
            const { children } = this.state;
            const { multiple, selection } = this.props;
            // Select the children whose values match the ones of the selection of the container
            children.forEach(child => {
                var _a;
                if (!(child instanceof HTMLElement)) {
                    return;
                }
                if (selection.indexOf((_a = child.props) === null || _a === void 0 ? void 0 : _a.value) > -1 &&
                    child.setSelected !== undefined) {
                    child.setSelected(true);
                    if (multiple === undefined) { // Set the selected child for single selection model
                        this.setSelectedChild(child);
                    }
                }
            });
        }
    },
    _a.properties = {
        /**
         * Whether the container is selectable
         */
        selectable: {
            type: Boolean,
            value: true,
            reflect: true,
            passToChildren: true
        },
        /**
         * Whether we can process multiple selection (false by default)
         */
        multiple: {
            type: Boolean,
            reflect: true
        },
        /**
         * The selected item or items. It is an attribute since it can be passed through a property initally
         */
        selection: {
            type: Array,
            value: [],
            mutable: true,
            reflect: true
        },
        /**
         * The callback when the selection is changed
         */
        selectionChanged: {
            type: Function
        }
    },
    _a.state = {
        /**
         * To track the current selected child for a single selection model
         */
        selectedChild: {
            value: undefined
        }
    },
    _a; };
export default SelectionContainerMixin;
