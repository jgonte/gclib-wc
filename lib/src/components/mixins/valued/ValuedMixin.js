import oneOf from "../../../core/helpers/oneOf";
import NamedMixin from "../named/NamedMixin";
export const valueChanged = 'valueChanged';
/**
 * Allows a component to have a value
 */
const ValuedMixin = Base => { var _a; return _a = 
//@ts-ignore
class Valued extends NamedMixin(Base) {
        updateValue(value) {
            const { name } = this.props;
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
    },
    _a.properties = {
        value: {
            type: oneOf(String, Object),
            mutable: true,
            reflect: true
        },
    },
    _a; };
export default ValuedMixin;
