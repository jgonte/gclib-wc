import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import { linkClicked } from '../navigationLink/NavigationLink';
import ContainerMixin from '../../core/mixins/ContainerMixin';
//@ts-ignore
export class NavigationBar extends SizableMixin(ContainerMixin(CustomElement)) {
    render() {
        const { links, size, variant } = this.props;
        return (h(Fragment, { size: size, variant: variant }, links !== undefined ?
            this.renderLinks() :
            (h("slot", null))));
    }
    renderLinks() {
        const { links } = this.props;
        return links.map(link => h("gcl-nav-link", { path: link.path }, link.Label));
    }
    linkClicked(event) {
        var _a, _b;
        const link = event.detail.link;
        const { activeLink } = this.state;
        if (link !== activeLink) {
            (_b = (_a = this.props).linkClicked) === null || _b === void 0 ? void 0 : _b.call(_a, link);
            activeLink === null || activeLink === void 0 ? void 0 : activeLink.setAttribute('active', false);
            this.setActiveLink(link);
        }
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(linkClicked, this.linkClicked);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(linkClicked, this.linkClicked);
    }
    onChildAdded(child) {
        if (child.props.active === true) {
            this.setActiveLink(child);
        }
    }
}
NavigationBar.component = {
    //shadow: false,
    styleUrls: [
        `${config.assetsFolder}/navigationBar/NavigationBar.css`
    ]
};
NavigationBar.properties = {
    links: {
        type: Array
    },
    linkClicked: {
        attribute: 'link-clicked',
        type: Function
    }
};
NavigationBar.state = {
    activeLink: {
        value: undefined
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-bar`, NavigationBar);
