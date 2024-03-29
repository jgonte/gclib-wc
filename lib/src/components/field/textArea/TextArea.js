import { h } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { Field } from '../Field';
//@ts-ignore
export class TextArea extends Field {
    [renderField]() {
        const { name, value, rows, cols, size, 
        //required,
        disabled } = this.props;
        return (h("textarea", { name: name, id: name, rows: rows, cols: cols, 
            //class={this.getCSSClass()}
            size: size, 
            //required={required}
            // style={{ maxWidth, width }}
            // className={inputClass}
            onInput: this.onInput, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }, value !== undefined ? value : null));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/TextField/TextField.css`
//     ]
// };
TextArea.properties = {
    rows: {
        type: Number
    },
    cols: {
        type: Number
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text-area`, TextArea);
