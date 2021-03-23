import { h, VirtualNode, Fragment } from 'gclib-vdom';
import { config } from '../../config';
import AsyncDataLoadableMixin from '../../mixins/data/AsyncDataLoadableMixin';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
//@ts-ignore
export class Select extends AsyncDataLoadableMixin(SingleValueField) {
    [renderField]() {
        const { name, value, size, 
        //required,
        disabled } = this.props;
        return (h("select", { name: name, id: name, 
            // style={{ maxWidth, width }}
            value: value, size: size, onInput: this.onInput, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, disabled: disabled }, this.renderOptions()));
    }
    renderOptions() {
        const { emptyOption, options, data, } = this.props;
        if (options != undefined) {
            if (emptyOption !== undefined) {
                // Prepend the empty option
                const { label, value } = emptyOption;
                options.prependChildNode(h("option", { value: value }, label));
            }
            return options;
        }
        if (data != undefined) {
            return (h(Fragment, null));
        }
        return null; // No options to render
    }
}
Select.properties = {
    /**
     * The name of the property to map the value of the option
     */
    valueProperty: {
        attribute: 'value-property',
        type: String,
        value: 'code'
    },
    displayProperty: {
        attribute: 'display-property',
        type: String,
        value: 'description'
    },
    emptyOption: {
        attribute: 'empty-option',
        type: Object
    },
    options: {
        type: VirtualNode
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-select`, Select);
