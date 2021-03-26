import CustomElement from '../../core/customElement/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import VariantMixin from '../mixins/variant/VariantMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';

//@ts-ignore
export class Button extends
    SizableMixin(
        VariantMixin(
            DirectionMixin(
                ContainerMixin(
                    CustomElement
                )
            )
        )
    )
{

    static component = {

        styleUrls: [
            `${config.assetsFolder}/button/Button.css`
        ]
    };

    static properties = {

        /**
         * The type of the button
         */
        type: {
            type: String,
            value: "button" // Options: "button" | "reset" | "submit"
        },

        /**
         * Callback when the button is clicked
         */
        click: {
            type: Function
        }
    };

    render() {

        const {
            type,
            click,
            size,
            variant
        } = this.props;

        return (
            <button type={type} size={size} variant={variant} dir={this.getDir()}
                // class={this.getCSSClass()}
                onClick={click}
            >
                <slot />
            </button>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);