import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
export class Overlay extends CustomElement {
    render() {
        return (h(Fragment, { class: this.getCSSClass() },
            h("slot", null)));
    }
    getCSSClass() {
        return {
            "center": true // Center the content by default
        };
    }
}
Overlay.component = {
    styleUrls: [
        `${config.assetsFolder}/overlay/Overlay.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);
