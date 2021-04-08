import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import { linkClicked } from '../navigation-link/NavigationLink';
import ContainerMixin from '../../core/mixins/ContainerMixin';
//@ts-ignore
export class NavigationBar extends SizableMixin(ContainerMixin(CustomElement)) {
    constructor() {
        super();
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }
    render() {
        const { links, size, variant } = this.props;
        return (h(Fragment, { size: size, variant: variant }, links !== undefined ?
            this.renderLinks() :
            (h("slot", null))));
    }
    renderLinks() {
        const { links } = this.props;
        return links.map(link => h("gcl-nav-link", { path: link.path, view: link.view, size: link.size }, link.Label));
    }
    linkClicked(event) {
        var _a, _b;
        const link = event.detail.link;
        const { activeLink } = this.state;
        if (link !== activeLink) {
            (_b = (_a = this.props).linkClicked) === null || _b === void 0 ? void 0 : _b.call(_a, link);
            //link.setAttribute('active', true);
            activeLink === null || activeLink === void 0 ? void 0 : activeLink.setAttribute('active', false);
            this.setActiveLink(link);
            if (this.router !== undefined) {
                this.router.navigate(link.props.to);
            }
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
    onRouteChanged(route, router) {
        // Save the router so we can navigate on click
        this.router = router;
        if (route === undefined) { // Not found route
            return;
        }
        if (!this.setActiveLinkFromRoute(route)) {
            this.route = route; // Save the route to retry on didMount;
        }
    }
    didMount() {
        super.didMount();
        if (this.route !== undefined) {
            this.setActiveLinkFromRoute(this.route);
            this.route = undefined;
        }
    }
    setActiveLinkFromRoute(route) {
        const { children, activeLink } = this.state;
        if ((children === null || children === void 0 ? void 0 : children.length) === 0) {
            return false;
        }
        const link = children.filter(l => l.props.to === route.path)[0];
        if (link === activeLink) {
            return; // The link is already active
        }
        link.setAttribute('active', true);
        activeLink === null || activeLink === void 0 ? void 0 : activeLink.setAttribute('active', false);
        this.setActiveLink(link);
        return true;
    }
}
NavigationBar.component = {
    //shadow: false,
    styleUrls: [
        `${config.assetsFolder}/navigation-bar/NavigationBar.css`
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
    /**
     * To track the last active link to deactivate it when other is selected
     */
    activeLink: {
        value: undefined
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-bar`, NavigationBar);
