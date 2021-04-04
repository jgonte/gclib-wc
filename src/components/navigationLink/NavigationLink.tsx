import { Fragment, h, VirtualNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import ActivatableMixin from '../mixins/activatable/ActivatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ChildMixin from '../../core/mixins/ChildMixin';

export const linkClicked = 'linkClicked';

//@ts-ignore
export class NavigationLink extends
    ActivatableMixin(
        SizableMixin(
            ChildMixin(
                CustomElement
            )        
        )
    ) {

    static component = {

        //shadow: false,

        styleUrls: [
            `${config.assetsFolder}/navigationLink/NavigationLink.css`
        ]
    };

    static properties = {

        /**
         * The key to retrieve a localized value from an i18n provider
         */
        intlKey: {
            attribute: 'intl-key',
            type: String
        },

        /** 
         * The label of the navigation item
         */
        label: {
            type: String,
            mutable: true,
            reflect: true
        },

        path: {
            type: String
        },

        content: {
            type: VirtualNode
        }
    };

    render() {

        const {
            label,
            size,
            active
        } = this.props;

        return (
            <Fragment size={size} active={active}>
                {
                    label !== undefined ?
                        (<gcl-text>{label}</gcl-text>) :
                        (<slot />)
                }
            </Fragment>
        );
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

        super.connectedCallback?.();

        this.addEventListener('click', this.onLinkClicked);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener('click', this.onLinkClicked);
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-link`, NavigationLink);