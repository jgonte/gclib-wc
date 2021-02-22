import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { config } from '../config';
import { isInvisible } from '../alert/Alert';
export class Overlay extends VisibleMixin(CustomElement) {
    [renderWhenVisible]() {
        return (h(Fragment, { class: this.getCSSClass() },
            h("slot", null)));
    }
    getCSSClass() {
        return {
            "center": true // Center the content by default
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(isInvisible, () => this.setVisible(false));
    }
}
Overlay.component = {
    styleUrls: [
        `${config.assetsFolder}/overlay/Overlay.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);
