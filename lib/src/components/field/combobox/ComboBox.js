import { h } from 'gclib-vdom';
import { config } from '../../config';
import { Field, renderField } from '../Field';
//@ts-ignore
export class ComboBox extends Field {
    constructor() {
        super();
        this.handleSelection = this.handleSelection.bind(this);
        this.renderRecord = this.renderRecord.bind(this);
    }
    handleSelection(selection) {
        let newValue;
        const { emptyValue, value } = this.props;
        switch (selection.length) {
            case 0:
                {
                    newValue = emptyValue;
                }
                break;
            case 1:
                {
                    newValue = selection[0];
                }
                break;
            default:
                {
                    newValue = selection;
                }
                break;
        }
        if (value !== newValue) {
            this.setValue(newValue);
        }
    }
    async onValueSet(newValue) {
        await this.dropdown.handleSelectionChanged([newValue]);
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName !== 'GCL-ROW') { // Root node only
            return;
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        this.dropdown = node.childNodes[1]; //gcl-dropdown
    }
    [renderField]() {
        const { 
        //name,
        value, loadUrl, autoLoad, valueField, displayField, size,
        //required,
        //disabled
         } = this.props;
        return (h("gcl-dropdown", { "selection-changed": this.handleSelection, "display-field": displayField },
            h("gcl-display", { id: "header", slot: "header" }),
            h("gcl-data-grid", { id: "content", slot: "content", "load-url": loadUrl, autoLoad: autoLoad, "render-record": this.renderRecord, size: size, selection: value === undefined ? value : [...value], "record-id": valueField, pageable: "false" })));
        // return (
        //     <input
        //         type="text"
        //         name={name}
        //         id={name}
        //         size={size} // Needed for the CSS to get the right size
        //         //class={this.getCSSClass()}
        //         //required={required}
        //         // style={{ maxWidth, width }}
        //         value={value}
        //         onInput={this.onInput}
        //         onChange={this.onChange}
        //         // onFocus={onFocus}
        //         onBlur={this.onBlur}
        //         // title={error}
        //         // ref={i => this.inputref = i}
        //         disabled={disabled}
        //     />
        // );
    }
    getFields() {
        return [
            {
                name: "description",
                display: "Gender",
                width: '100%'
            }
        ];
    }
    renderRecord(record) {
        const { displayField } = this.props;
        return record[displayField];
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/comboBox/ComboBox.css`
//     ]
// };
ComboBox.properties = {
    /**
     * The URL to retrieve the data from
     */
    loadUrl: {
        attribute: 'load-url',
        type: String,
        //required: true Loading the form or other component might be optional
    },
    /**
     * Whether to load the data for the component when the component is connected
     */
    autoLoad: {
        attribute: 'auto-load',
        type: Boolean,
        value: true
    },
    /**
     * The name of the property to map the value of the option
     */
    valueField: {
        attribute: 'value-field',
        type: String,
        value: 'code'
    },
    /**
     * The name of the property to map the description of the option
     */
    displayField: {
        attribute: 'display-field',
        type: String,
        value: 'description'
    },
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-combo-box`, ComboBox);
