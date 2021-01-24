import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import VariantMixin from '../mixins/variant/VariantMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
import PassPropertiesToChildrenMixin from '../../core/mixins/PassPropertiesToChildrenMixin';
//@ts-ignore
export class Button extends PassPropertiesToChildrenMixin(DirectionMixin(VariantMixin(CustomElement))) {
    render() {
        const { type } = this.props;
        return (h("button", { type: type, class: this.getCSSClass(), onClick: this.onclick },
            h("slot", null)));
    }
    getChildNodes(nodeChanges) {
        // Get the first inserted item which is the button component
        const button = nodeChanges.inserted.filter(b => b instanceof HTMLButtonElement)[0];
        const slot = button.querySelector('slot');
        if (slot !== null) {
            return slot.assignedNodes({ flatten: true });
        }
        return [];
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
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);
