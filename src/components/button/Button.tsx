import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import VariantMixin from '../mixins/variant/VariantMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
import PassPropertiesToChildrenMixin from '../../core/mixins/PassPropertiesToChildrenMixin';

//@ts-ignore
export class Button extends
    PassPropertiesToChildrenMixin(
        DirectionMixin(
            VariantMixin(
                CustomElement
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
        }
    };

    render() {

        const {
            type
        } = this.props;

        return (
            <button
                type={type}
                class={this.getCSSClass()}
                onClick={this.onclick}
            >
                <slot />
            </button>
        );
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

//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);