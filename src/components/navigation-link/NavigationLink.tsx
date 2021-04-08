import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import ActivatableMixin from '../mixins/activatable/ActivatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ChildMixin from '../../core/mixins/ChildMixin';
import { config } from '../config';

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

        styleUrls: [
            `${config.assetsFolder}/navigation-link/NavigationLink.css`
        ]
    };

    static properties = {

        /**
         * The name of the path to append to the URL
         */
        to: {
            type: String
        }
    };

    render() {

        const {
            size,
            active
        } = this.props;

        return (
            <Fragment size={size} active={active}>
                <slot />
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