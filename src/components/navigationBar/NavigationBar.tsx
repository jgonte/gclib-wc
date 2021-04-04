import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import { linkClicked } from '../navigationLink/NavigationLink';
import ContainerMixin from '../../core/mixins/ContainerMixin';

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
            `${config.assetsFolder}/navigationBar/NavigationBar.css`
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

        activeLink: {
            value: undefined
        }
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

        return links.map(link => <gcl-nav-link path={link.path}>{link.Label}</gcl-nav-link>);
    }

    linkClicked(event) {

        const link = event.detail.link;

        const {
            activeLink
        } = this.state;

        if (link !== activeLink) {

            this.props.linkClicked?.(link);

            activeLink?.setAttribute('active', false);

            this.setActiveLink(link);
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
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-bar`, NavigationBar);