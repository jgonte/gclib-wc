import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';
export class Form extends CustomElement {
    render() {
        return (h("form", null,
            h("slot", null)));
    }
}
Form.component = {
    styleUrls: [
        `${config.assetsFolder}/form/Form.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);
