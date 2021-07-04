import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import { linkClicked } from '../navigation-link/NavigationLink';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { Route, Router } from 'gclib-utils';

//@ts-ignore
export class NavigationBar extends
    SizableMixin(
        ContainerMixin(
            CustomElement
        )
    ) {

    static component = {

        //shadow: false,

        styleUrls: [
            `${config.assetsFolder}/navigation-bar/NavigationBar.css`
        ]
    };

    static properties = {

        links: {
            type: Array
        },

        linkClicked: {
            attribute: 'link-clicked',
            type: Function
        }
    };

    static state = {

        /**
         * To track the last active link to deactivate it when other is selected
         */
        activeLink: {
            value: undefined
        }
    }

    constructor() {

        super();

        this.onRouteChanged = this.onRouteChanged.bind(this);
    }

    render() {

        const {
            links,
            size,
            variant
        } = this.props;

        return (
            <Fragment size={size} variant={variant}>
                {
                    links !== undefined ?
                        this.renderLinks() :
                        (<slot />)
                }
            </Fragment>
        );
    }

    renderLinks() {

        const {
            links
        } = this.props;

        return links.map(link => <gcl-nav-link path={link.path} view={link.view} size={link.size}>{link.Label}</gcl-nav-link>);
    }

    linkClicked(event) {

        const link = event.detail.link;

        const {
            activeLink
        } = this.state;

        if (link !== activeLink) {

            this.props.linkClicked?.(link);

            //link.setAttribute('active', true);

            activeLink?.setAttribute('active', false);

            this.setActiveLink(link);

            if (this.router !== undefined) {

                this.router.navigate(link.props.to);
            }
        }
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(linkClicked, this.linkClicked);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(linkClicked, this.linkClicked);
    }

    onChildAdded(child: HTMLElement) {

        if ((child as any).props.active === true) {

            this.setActiveLink(child);
        }
    }

    onRouteChanged(route: Route, router: Router) {

        // Save the router so we can navigate on click
        this.router = router;

        if (route === undefined) { // Not found route

            return;
        }

        if (!this.setActiveLinkFromRoute(route)) {

            this.route = route; // Save the route to retry on nodeDidConnect;
        }
    }

    nodeDidConnect() {

        super.nodeDidConnect?.();

        if (this.route !== undefined) {

            this.setActiveLinkFromRoute(this.route);

            this.route = undefined;
        } 
    }

    setActiveLinkFromRoute(route: Route): boolean {

        const {
            children,
            activeLink
        } = this.state;

        if (children?.length === 0) {

            return false;
        }

        const link = children.filter(l => l.props.to === route.path)[0];

        if (link === activeLink) {

            return; // The link is already active
        }

        link.setAttribute('active', true);

        activeLink?.setAttribute('active', false);

        this.setActiveLink(link);

        return true;
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-bar`, NavigationBar);