import { h } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
//@ts-ignore
export class MultilineTextField extends SingleValueField {
    [renderField]() {
        const { name, value, rows, cols, 
        //required,
        disabled } = this.props;
        return (h("textarea", { name: name, id: name, rows: rows, cols: cols, class: this.getCSSClass(), 
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
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/TextField/TextField.css`
//     ]
// };
MultilineTextField.properties = {
    rows: {
        type: Number
    },
    cols: {
        type: Number
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-multiline-text-field`, MultilineTextField);