import { h } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
//@ts-ignore
export class TextField extends SingleValueField {
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/TextField/TextField.css`
    //     ]
    // };
    [renderField]() {
        const { name, value, required } = this.props;
        return (h("input", { name: name, id: name, class: "field-input", required: required, 
            // style={{ maxWidth, width }}
            // className={inputClass}
            value: value, onChange: this.onChange }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-text-field`, TextField);
