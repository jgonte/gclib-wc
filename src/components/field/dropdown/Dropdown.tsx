import { h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
// import { SelectableRow } from '../../selectable/row/SelectableRow';
// import oneOf from '../../../core/helpers/oneOf';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import SelectionHandlerMixin from '../../mixins/selection/SelectionHandlerMixin';
import { dropChanged, DropTool } from '../../tool/drop/DropTool';
import dropdownManager from './dropdownManager';

//@ts-ignore
export class Dropdown extends SelectableMixin(
    SelectionHandlerMixin(
        CustomElement
    )
)
{
    static component = {

        styleUrls: [
            `${config.assetsFolder}/field/dropdown/Dropdown.css`
        ]
    };

    static properties = {

        hideOnSelection: {
            attribute: 'hide-on-selection',
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
     * The drop tool to show or hide the content
     */
    dropTool: DropTool;

    constructor() {

        super();

        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(dropChanged, this.onDropChanged);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(dropChanged, this.onDropChanged);
    }

    onDropChanged(event: CustomEvent) {

        const {
            showing
        } = event.detail;

        if (showing === true) { // Hide the contents of other showing dropdowns abd set this one as being shown

            dropdownManager.hideShown(this);

            dropdownManager.setShown(this);
        }

        this.setShowing(showing);

        event.stopPropagation();
    }

    nodeDidConnect(node: HTMLElement) {

        if (node.tagName === 'STYLE') {

            return;
        }

        super.nodeDidConnect?.(node);

        this.dropTool = Array.from(node.childNodes).filter(n => (n as any).id === 'drop-tool')[0] as any as DropTool;

        const slots = node.querySelectorAll('slot');

        const contentSlot = slots[1];

        if (contentSlot === undefined) {

            throw Error('The content slot must have a child');
        }

        const selectable = contentSlot.assignedNodes({ flatten: true })[0];

        // Set the handler when the selection changes
        (selectable as any).setProperty('selectionChanged', this.handleSelectionChanged);

        // Set any initial selection
        const selection = (selectable as any).props.selection;

        if (selection?.length > 0) {

            this.handleSelectionChanged(selection);
        }

    }

    handleSelectionChanged(selection) {

        //this.setValue(value, this.onValueSet); // Update the current value

        //this.validate(value); // No need to validate again since this happens on input

        const {
            hideOnSelection
        } = this.props;

        const {
            showing
        } = this.state;

        if (showing === true &&
            hideOnSelection === true) {

            this.hide();
        }

        this.notifySelectionChanged(selection);

        this.callSelectionChanged(selection);
    }

    render() {

        const {
            showing
        } = this.state;

        return (
            <div class="dropdown">
                <slot name="header" />
                <gcl-drop-tool id="drop-tool"></gcl-drop-tool>
                <div class={`dropdown-content ${showing ? 'show' : ''}`}>
                    <slot name="content" />
                </div>
            </div>
        );
    }

    hide() {

        this.dropTool.hideContent();
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-dropdown`, Dropdown);