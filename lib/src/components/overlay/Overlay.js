import { Fragment, h } from "gclib-vdom";
import CustomElement from "../../core/CustomElement";
import { config } from "../config";
export class Overlay extends CustomElement {
    render() {
        const { visible } = this.props;
        return visible === true ?
            (h(Fragment, { class: this.getCSSClass() },
                h("slot", null))) : null;
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
Overlay.properties = {
    /**
     * Whether the overlay is shown
     */
    visible: {
        type: Boolean,
        value: false,
        mutable: true,
        reflect: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);
