import { h } from "gclib-vdom";

const ValidatableMixin = Base =>

    class Validatable extends Base {

        static properties = {

            validators: {
                type: Array,
                mutable: true,
                value: []
            }
        };

        static state = {

            errors: [],
    
            warnings: []
        }

        renderWarnings() {

            const {
                warnings
            } = this.state;
    
            if (warnings === undefined) {
    
                return null;
            }
    
            return warnings.map(warning => <gcl-alert type="warning" message={warning} closable={false} />);
        }
    
        renderErrors() {
    
            const {
                errors
            } = this.state;
    
            if (errors === undefined) {
    
                return null;
            }
    
            return errors.map(error => <gcl-alert type="error" message={error} closable={false} />);
        }
    };

export default ValidatableMixin;