import CustomElement from '../../core/customElement/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import VariantMixin from '../mixins/variant/VariantMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DisableableMixin from '../mixins/disableable/DisableableMixin';
//@ts-ignore
export class Button extends DisableableMixin(SizableMixin(VariantMixin(DirectionMixin(ContainerMixin(CustomElement))))) {
    render() {
        const { type, click, size, variant, disabled } = this.props;
        return (h("button", { type: type, size: size, variant: variant, dir: this.getDir(), disabled: disabled, 
            // class={this.getCSSClass()}
            onClick: disabled ? null : click },
            h("slot", null)));
    }
}
Button.component = {
    styleUrls: [
        `${config.assetsFolder}/button/Button.css`
    ]
};
Button.properties = {
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
//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);
