import { Fragment, h } from 'gclib-vdom';
import { config } from '../../config';
import CustomElement from '../../../core/customElement/CustomElement';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import VariantMixin from '../../mixins/variant/VariantMixin';

//@ts-ignore
export class CloseTool extends
    SizableMixin(
        VariantMixin(
            CustomElement
        )
    ) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/tool/close-tool/CloseTool.css`
        ]
    };

    static properties = {

        /**
         * What action to execute when the tool has been closed
         */
        close: {
            type: Function
        }
    };

    connectedCallback() {

        super.connectedCallback?.();

        const {
            close
        } = this.props;

        this.addEventListener('click', close);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        const {
            close
        } = this.props;

        this.removeEventListener('click', close);
    }

    render() {

        const {
            variant,
            size
        } = this.props;

        return (
            <Fragment variant={variant} size={size}>
                &times;
            </Fragment>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-close-tool`, CloseTool);