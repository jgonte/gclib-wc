import { isPrimitive } from 'gclib-utils';
import { h, markupToVDom, NodeChanges } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import oneOf from '../../core/helpers/oneOf';
// import { SelectableRow } from '../../selectable/row/SelectableRow';
import { config } from '../config';
import SelectableMixin from '../mixins/selectable/SelectableMixin';
import SelectionHandlerMixin from '../mixins/selection/SelectionHandlerMixin';
import { dropChanged, DropTool } from '../tool/drop/DropTool';
import popupManager from '../popupManager';

//@ts-ignore
export class Dropdown extends
    SelectableMixin(
        SelectionHandlerMixin(
            CustomElement
        )
    ) {
    static component = {

        styleUrls: [
            `${config.assetsFolder}/dropdown/Dropdown.css`
        ]
    };

    static properties = {

        hideOnSelection: {
            attribute: 'hide-on-selection',
            type: Boolean,
            value: true
        },

        /**
         * The name of the field of the record to display its value in the dropdown header
         */
        displayField: {
            attribute: 'display-field',
            type: oneOf(String, Function),
            value: 'description'
        },

        /**
         * The text to display when there is no selection in the dropdown
         */
        emptyDisplay: {
            attribute: 'empty-display',
            type: oneOf(String, Function),
            value: 'Please select'
        },

        /**
         * Whether to emit a custom event to the parent elements if the selection changed 
         */
        notifyIfSelectionChanged: {
            attribute: 'notify-if-selection-changed',
            type: Boolean,
            value: true
        }
    };

    static state = {

        showing: {
            value: false
        }
    }

    /**
     * The slottted header to set the text when a selection is made
     */
    headerSlot: any;

    /**
     * The drop tool to show or hide the content
     */
    dropTool: DropTool;

    /**
     * The child node of the slotted content
     */
    contentNode: any;

    constructor() {

        super();

        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(dropChanged, this.handleDropChanged);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(dropChanged, this.handleDropChanged);
    }

    handleDropChanged(evt: CustomEvent) {

        evt.stopPropagation();

        const {
            showing,
            //dropElement
        } = evt.detail;

        if (showing === true) { // Hide the contents of other showing dropdowns and set this one as being shown

            popupManager.setShown(this as any);
        }

        this.setShowing(showing);
    }

    elementDidConnect(node: HTMLElement, changes: NodeChanges) {

        super.elementDidConnect?.(node);

        const childNode = node.childNodes[0]; //gcl-row

        this.dropTool = Array.from(childNode.childNodes).filter(n => (n as any).id === 'drop-tool')[0] as any as DropTool;

        const slots = node.querySelectorAll('slot');

        this.headerSlot = slots[0];

        const contentSlot = slots[1];

        if (contentSlot === undefined) {

            throw Error('The content slot must have a child');
        }

        this.contentNode = contentSlot.assignedNodes({ flatten: true })[0];

        // Set the handler when the selection changes
        this.contentNode.setProperty('selection-changed', this.handleSelectionChanged);

        // Set any initial selection
        const selection = this.contentNode.props.selection;

        if (selection?.length > 0) {

            this.handleSelectionChanged(selection);
        }
    }

    async updateHeader(selection) {

        // Update the display of the header
        const header = this.headerSlot.assignedNodes({ flatten: true })[0];

        if (header === undefined) {

            return;
        }

        if (this.contentNode.data === undefined) {

            this.contentNode.data = await this.contentNode.getData();
        }

        const {
            recordId
        } = this.contentNode.props;

        let {
            data
        } = this.contentNode;

        if (data.payload !== undefined) {

            data = data.payload;
        }

        switch (selection.length) {
            case 0:
                {
                    const { emptyDisplay } = this.props;

                    if ('setContent' in header) {

                        header.setContent(emptyDisplay);
                    }
                }
                break;
            case 1:
                {
                    // Sample the data to see if the are an array of primitives
                    const firstItem = data[0];

                    // If it is an array of primitives then
                    if (isPrimitive(firstItem)) {

                        let records = data.filter(r => r === selection[0]);

                        const displayValue = records[0];

                        header.setContent(displayValue);
                    }
                    else {

                        let records = data.filter(r => r[recordId] === selection[0]);

                        if (records.length > 0) {

                            const record = records[0];

                            const { displayField } = this.props;

                            if (typeof displayField === 'function') {

                                if ("setContent" in header) {

                                    let node = displayField(record);

                                    if (typeof node === 'string') {

                                        node = markupToVDom(node.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
                                    }

                                    header.setContent(node);
                                }
                            }
                            else {

                                const displayValue = record[displayField];

                                header.setContent(displayValue);
                            }
                        }
                        else {

                            // Sample the data to see if the are an array of primitives
                            const firstItem = data[0];

                            // If it is an array of primitives then
                            if (isPrimitive(firstItem)) {

                                records = data.filter(r => r === selection[0]);

                                const displayValue = records[0];

                                header.setContent(displayValue);
                            }
                            else {

                                console.log(`The selected value: ${selection[0]} does not match any of the record fields with key: ${recordId}`);
                            }

                        }
                    }

                }
                break;
            default: // Multiple selection
                {
                    const records = this.data.filter(r => selection.includes(r[recordId]));

                    header.setProperty('record', records);
                }
                break;
        }
    }

    handleSelectionChanged(selection) {

        //this.setValue(value, this.onValueSet); // Update the current value

        //this.validate(value); // No need to validate again since this happens on input

        const {
            hideOnSelection,
            notifyIfSelectionChanged
        } = this.props;

        const {
            showing
        } = this.state;

        if (showing === true &&

            hideOnSelection === true) {

            this.hideContent();
        }

        this.updateHeader(selection);

        if (notifyIfSelectionChanged === true) {

            this.notifySelectionChanged(selection);
        }

        this.callSelectionChanged(selection);
    }

    render() {

        const {
            showing
        } = this.state;

        return (
            <div tabindex="0" class="dropdown">
                <gcl-row>
                    <slot id="header" name="header" />
                    <gcl-drop-tool id="drop-tool"></gcl-drop-tool>
                </gcl-row>
                <div class={`dropdown-content ${showing ? 'show' : ''}`}>
                    <slot name="content" />
                </div>
            </div>
        );
    }

    hideContent() {

        const dropTool = this.shadowRoot.childNodes[0].childNodes[0].childNodes[1];

        dropTool.hideContent();

        popupManager.setHidden(this as any);
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-dropdown`, Dropdown);