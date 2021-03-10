import { h } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
//@ts-ignore
export class HiddenField extends SingleValueField {
    [renderField]() {
        const { name, value, } = this.props;
        return (h("input", { type: "hidden", name: name, value: value }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-hidden-field`, HiddenField);
