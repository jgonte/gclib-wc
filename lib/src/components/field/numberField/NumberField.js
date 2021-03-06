import { h } from 'gclib-vdom';
import { config } from '../../config';
import MinMaxMixin from '../../mixins/minMax/MinMaxMixin';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
//@ts-ignore
export class NumberField extends MinMaxMixin(SingleValueField) {
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/numberField/NumberField.css`
    //     ]
    // };
    [renderField]() {
        const { name, value, 
        //required,
        min, max, disabled } = this.props;
        return (h("input", { type: "number", name: name, id: name, min: min, max: max, class: this.getCSSClass(), 
            //required={required}
            // style={{ maxWidth, width }}
            // className={inputClass}
            value: value, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-number-field`, NumberField);
