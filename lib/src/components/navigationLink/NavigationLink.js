import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import ActivatableMixin from '../mixins/activatable/ActivatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ChildMixin from '../../core/mixins/ChildMixin';
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
        `${config.assetsFolder}/navigationLink/NavigationLink.css`
    ]
};
NavigationLink.properties = {
    /**
     * The path to the resource to navigate to
     */
    path: {
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-link`, NavigationLink);
