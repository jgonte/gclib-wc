import ContainerMixin from "../../../core/mixins/ContainerMixin";

const SelectionContainerMixin = Base =>

    //@ts-ignore
    class SelectionContainer extends ContainerMixin(Base) {

        static properties = {

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
                attribute: 'selection-changed',
                type: Function
            },

            /**
             * The name of the property that identifies the record id
             */
             recordId: {
                attribute: 'record-id',
                type: String,
                value: 'id'
            }
        };

        static state = {

            /**
             * To track the current selected child for a single selection model
             */
            selectedChild: {
                value: undefined
            }
        };

        connectedCallback() {

            super.connectedCallback();

            this.updateSelection = this.updateSelection.bind(this);

            const {
                selectable
            } = this.props;

            if (selectable === true) {

                this.addEventListener('selectionChanged', this.updateSelection);
            }
        }

        attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

            super.attributeChangedCallback?.(attributeName, oldValue, newValue);

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

            const {
                multiple,
                selection,
                selectionChanged
            } = this.props;

            const {
                child,
                selectableValue,
                selected
            } = e.detail;

            if (multiple !== undefined) { // Add values to the selection

                if (selected === true) {

                    this.setSelection([...selection, selectableValue]);
                }
                else {

                    const index = selection.indexOf(selectableValue);

                    selection.splice(index, 1);

                    this.setSelection(selection);
                }
            }
            else { // Replace the old selection with the new one

                const {
                    selectedChild
                } = this.state;

                // Deselect previous selected child
                if (selectedChild !== undefined) {

                    selectedChild.setSelected(false);
                }

                if (selected === true) {

                    this.setSelection([selectableValue]);

                    this.setSelectedChild(child);
                }
                else {

                    this.setSelection([]);

                    this.setSelectedChild(undefined);
                }
            }

            if (selectionChanged !== undefined) {

                selectionChanged(this.props.selection); // Re-read from the updated selection props
            }
        }

        onChildAdded(child: HTMLElement) {

            super.onChildAdded?.(child);

            // If any of the values of the selection match the value of the child, then set the child as selected
            const {
                multiple,
                selectable 
            } = this.props;

            const selection = this.props.selection || [];

            if (selectable !== true) {

                return;
            }

            const childProps = (child as any).props || {};

            const selectableValue = childProps.selectableValue;

            if (selection.indexOf(selectableValue) > -1 &&
                (child as any).setSelected !== undefined) {

                (child as any).setSelected(true);

                if (multiple === undefined) { // Set the selected child for single selection model

                    this.setSelectedChild(child);
                }
            }
        }

        // notifyChildren() {

        //     if (super.notifyChildren) {

        //         super.notifyChildren();
        //     }

        //     const {
        //         children
        //     } = this.state;

        //     const {
        //         multiple,
        //         selection
        //     } = this.props;

        //     visitChildren(children, child => {
        //         if (!(child instanceof HTMLElement)) {

        //             return;
        //         }

        //         if (selection.indexOf((child as any).props?.value) > -1 &&
        //             (child as any).setSelected !== undefined) {

        //             (child as any).setSelected(true);

        //             if (multiple === undefined) { // Set the selected child for single selection model

        //                 this.setSelectedChild(child);
        //             }
        //         }
        //     });
        // }

    };

export default SelectionContainerMixin;

