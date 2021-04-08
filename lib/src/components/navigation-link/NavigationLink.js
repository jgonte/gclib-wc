import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import ActivatableMixin from '../mixins/activatable/ActivatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ChildMixin from '../../core/mixins/ChildMixin';
import { config } from '../config';
export const linkClicked = 'linkClicked';
//@ts-ignore
export class NavigationLink extends ActivatableMixin(SizableMixin(ChildMixin(CustomElement))) {
    render() {
        const { size, active } = this.props;
        return (h(Fragment, { size: size, active: active },
            h("slot", null)));
    }
    onLinkClicked() {
        this.setActive(true);
        this.dispatchEvent(new CustomEvent(linkClicked, {
            detail: {
                link: this
            },
            bubbles: true,
            composed: true
        }));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener('click', this.onLinkClicked);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener('click', this.onLinkClicked);
    }
}
NavigationLink.component = {
    styleUrls: [
        `${config.assetsFolder}/navigation-link/NavigationLink.css`
    ]
};
NavigationLink.properties = {
    /**
     * The name of the path to append to the URL
     */
    to: {
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-link`, NavigationLink);
