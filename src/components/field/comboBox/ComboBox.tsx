import { h, ElementNode } from 'gclib-vdom';
import { config } from '../../config';
import { Field, renderField } from '../Field';

//@ts-ignore
export class ComboBox extends Field  {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/comboBox/ComboBox.css`
    //     ]
    // };

    static properties = {

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

    constructor() {

        super();

        this.handleSelection = this.handleSelection.bind(this);

        this.renderRecord = this.renderRecord.bind(this);

    }

    handleSelection(selection: any[]) {

        let newValue;

        const {
            emptyValue,
            value
        } = this.props;

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

            this.updateValue(newValue);
        }
    }

    async onValueSet(newValue) {

        await this.dropdown.handleSelectionChanged([newValue]);
    }

    nodeDidConnect(node: HTMLElement) {

        if (node.tagName !== 'GCL-ROW') { // Root node only

            return;
        }

        super.nodeDidConnect?.(node);

        this.dropdown = node.childNodes[1]; //gcl-dropdown
    }

    [renderField](): ElementNode {

        const {
            //name,
            value,
            loadUrl,
            autoLoad,
            valueField,
            displayField,
            size,
            //required,
            //disabled
        } = this.props;

        return (
            <gcl-dropdown selection-changed={this.handleSelection} display-field={displayField}>
                <gcl-display id="header" slot="header"></gcl-display>
                <gcl-data-grid
                    id="content"
                    slot="content"
                    load-url={loadUrl}
                    autoLoad={autoLoad}
                    //fields={this.getFields}
                    render-record={this.renderRecord}
                    size={size}
                    selection={value === undefined ? value : [...value]}
                    record-id={valueField}
                    pageable="false"
                >
                </gcl-data-grid>
            </gcl-dropdown>
        );

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

    renderRecord(record) {

        const {
            displayField
        } = this.props;

        return record[displayField];
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-combo-box`, ComboBox);