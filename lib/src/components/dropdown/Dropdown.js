import { h, markupToVDom } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import oneOf from '../../core/helpers/oneOf';
// import { SelectableRow } from '../../selectable/row/SelectableRow';
import { config } from '../config';
import SelectableMixin from '../mixins/selectable/SelectableMixin';
import SelectionHandlerMixin from '../mixins/selection/SelectionHandlerMixin';
import { dropChanged } from '../tool/drop/DropTool';
import dropdownManager from './dropdownManager';
//@ts-ignore
export class Dropdown extends SelectableMixin(SelectionHandlerMixin(CustomElement)) {
    constructor() {
        super();
        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(dropChanged, this.onDropChanged);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(dropChanged, this.onDropChanged);
    }
    onDropChanged(event) {
        const { showing } = event.detail;
        if (showing === true) { // Hide the contents of other showing dropdowns abd set this one as being shown
            dropdownManager.hideShown(this);
            dropdownManager.setShown(this);
        }
        this.setShowing(showing);
        event.stopPropagation();
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName !== 'DIV' &&
            node.className !== 'dropdown') {
            return;
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        const childNode = node.childNodes[0]; //gcl-row
        this.dropTool = Array.from(childNode.childNodes).filter(n => n.id === 'drop-tool')[0];
        const slots = node.querySelectorAll('slot');
        this.headerSlot = slots[0];
        const contentSlot = slots[1];
        if (contentSlot === undefined) {
            throw Error('The content slot must have a child');
        }
        this.contentNode = contentSlot.assignedNodes({ flatten: true })[0];
        // Set the handler when the selection changes
        this.contentNode.setProperty('selectionChanged', this.handleSelectionChanged);
        // Set any initial selection
        const selection = this.contentNode.props.selection;
        if ((selection === null || selection === void 0 ? void 0 : selection.length) > 0) {
            this.handleSelectionChanged(selection);
        }
    }
    async handleSelectionChanged(selection) {
        //this.setValue(value, this.onValueSet); // Update the current value
        //this.validate(value); // No need to validate again since this happens on input
        const { hideOnSelection } = this.props;
        const { showing } = this.state;
        if (showing === true &&
            hideOnSelection === true) {
            this.hide();
        }
        // Update the display of the header
        const header = this.headerSlot.assignedNodes({ flatten: true })[0];
        if (this.contentData === undefined) {
            this.contentData = await this.contentNode.getData();
            if (this.contentData.payload !== undefined) {
                this.contentData = this.contentData.payload;
            }
        }
        const recordId = this.contentNode.props.recordId;
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
                    const records = this.contentData.filter(r => r[recordId] === selection[0]);
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
                    // header.setProperty('record', record);
                }
                break;
            default: // Multiple selection
                {
                    const records = this.contentData.filter(r => selection.includes(r[recordId]));
                    header.setProperty('record', records);
                }
        }
        this.notifySelectionChanged(selection);
        this.callSelectionChanged(selection);
    }
    render() {
        const { showing } = this.state;
        return (h("div", { tabindex: "0", class: "dropdown" },
            h("gcl-row", null,
                h("slot", { id: "header", name: "header" }),
                h("gcl-drop-tool", { id: "drop-tool" })),
            h("div", { class: `dropdown-content ${showing ? 'show' : ''}` },
                h("slot", { name: "content" }))));
    }
    hide() {
        this.dropTool.hideContent();
    }
}
Dropdown.component = {
    styleUrls: [
        `${config.assetsFolder}/dropdown/Dropdown.css`
    ]
};
Dropdown.properties = {
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
    }
};
Dropdown.state = {
    showing: {
        value: false
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-dropdown`, Dropdown);
