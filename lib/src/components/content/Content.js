import { h, Fragment } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { resourceLoader } from 'gclib-utils';
//@ts-ignore
export class Content extends CustomElement {
    render() {
        return (h(Fragment, null));
    }
    async attributeChangedCallback(attributeName, oldValue, newValue) {
        var _a;
        (_a = super.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, attributeName, oldValue, newValue);
        if (attributeName === 'source' && oldValue !== newValue) {
            const content = await resourceLoader.get(newValue);
            this.document.innerHTML = content;
        }
    }
}
Content.component = {
    shadow: false // Do not create a shadow DOM for this component!
};
Content.properties = {
    /**
     * The source to set the content from
     */
    source: {
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);
