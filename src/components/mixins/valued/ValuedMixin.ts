import oneOf from "../../../core/helpers/oneOf";
import NamedMixin from "../named/NamedMixin";

export const valueChanged = 'valueChanged';

/**
 * Allows a component to have a value
 */
const ValuedMixin = Base =>

    //@ts-ignore
    class Valued extends NamedMixin(Base) {

        static properties = {

            value: {
                type: oneOf(String, Object), // Ideally is a string but could be a more complex object
                mutable: true,
                reflect: true
            },
        };

        updateValue(value: any) {

            const {
                name
            } = this.props;
            
            this.setValue(value); // Update the current value

            this.dispatchEvent(new CustomEvent(valueChanged, {
                detail: {
                    name,
                    value
                },
                bubbles: true,
                composed: true
            }));
        }
    };

export default ValuedMixin;
