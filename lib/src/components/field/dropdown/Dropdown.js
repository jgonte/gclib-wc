import { h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
// import { SelectableRow } from '../../selectable/row/SelectableRow';
// import oneOf from '../../../core/helpers/oneOf';
import { config } from '../../config';
import { dropChanged } from '../../tool/drop/DropTool';
import { valueChanged } from '../Field';
import dropdownManager from './dropdownManager';
export class Dropdown extends CustomElement {
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
        if (showing === true) {
            dropdownManager.hideShown(this);
            dropdownManager.setShown(this);
        }
        this.setShowing(showing);
        event.stopPropagation();
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName === 'STYLE') {
            return;
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        this.dropTool = Array.from(node.childNodes).filter(n => n.id === 'drop-tool')[0];
        const slots = node.querySelectorAll('slot');
        const contentSlot = slots[1];
        if (contentSlot === undefined) {
            throw Error('The content slot must have a child');
        }
        const selectable = contentSlot.assignedNodes({ flatten: true })[0];
        // Set the handler when the selection changes
        selectable.setProperty('selectionChanged', this.handleSelectionChanged);
        // Set any initial selection
        const selection = selectable.props.selection;
        if ((selection === null || selection === void 0 ? void 0 : selection.length) > 0) {
            this.handleSelectionChanged(selection);
        }
    }
    handleSelectionChanged(selection) {
        //this.setValue(value, this.onValueSet); // Update the current value
        //this.validate(value); // No need to validate again since this happens on input
        const { name, hideOnSelection } = this.props;
        const { showing } = this.state;
        if (showing === true &&
            hideOnSelection === true) {
            this.hide();
        }
        this.dispatchEvent(new CustomEvent(valueChanged, {
            detail: {
                name,
                selection
            },
            bubbles: true,
            composed: true
        }));
    }
    render() {
        const { showing } = this.state;
        return (h("div", { class: "dropdown" },
            h("slot", { name: "header" }),
            h("gcl-drop-tool", { id: "drop-tool" }),
            h("div", { class: `dropdown-content ${showing ? 'show' : ''}` },
                h("slot", { name: "content" }))));
    }
    hide() {
        this.dropTool.hideContent();
    }
}
Dropdown.component = {
    styleUrls: [
        `${config.assetsFolder}/field/dropdown/Dropdown.css`
    ]
};
Dropdown.properties = {
    hideOnSelection: {
        attribute: 'hide-on-selection',
        type: Boolean,
        value: true
    }
};
Dropdown.state = {
    showing: {
        value: false
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-dropdown`, Dropdown);
