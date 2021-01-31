import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import VariantMixin from '../mixins/variant/VariantMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';

export class Button extends
    ContainerMixin(
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
            click
        } = this.props;

        return (
            <button
                type={type}
                class={this.getCSSClass()}
                onClick={click}
            >
                <slot />
            </button>
        );
    }

    // Needed to pass properties to children
    getChildren(nodeChanges) {

        const {
            inserted
        } = nodeChanges;

        if (inserted.length === 0) {

            return {
                hasInsertedChildren: false,
                children: []
            };
        }

        // Get the first inserted item which is the button component
        const button = nodeChanges.inserted.filter(b => b instanceof HTMLButtonElement)[0];

        const slot = button.querySelector('slot');

        if (slot !== null) {

            return {
                hasInsertedChildren: true,
                children: slot.assignedNodes({ flatten: true })
            };
        }

        return {
            hasInsertedChildren: true,
            children: []
        };
    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);