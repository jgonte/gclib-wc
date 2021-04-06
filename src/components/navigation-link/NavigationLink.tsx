import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
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

        styleUrls: [
            `${config.assetsFolder}/navigationLink/NavigationLink.css`
        ]
    };

    static properties = {

        /**
         * The path to the resource to navigate to
         */
        path: {
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