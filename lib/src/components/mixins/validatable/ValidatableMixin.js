import { h } from "gclib-vdom";
const ValidatableMixin = Base => { var _a; return _a = class Validatable extends Base {
        renderWarnings() {
            const { warnings } = this.state;
            if (warnings === undefined) {
                return null;
            }
            return warnings.map(warning => h("gcl-alert", { type: "warning", message: warning, closable: false }));
        }
        renderErrors() {
            const { errors } = this.state;
            if (errors === undefined) {
                return null;
            }
            return errors.map(error => h("gcl-alert", { type: "error", message: error, closable: false }));
        }
    },
    _a.properties = {
        validators: {
            type: Array,
            mutable: true,
            value: []
        }
    },
    _a.state = {
        errors: [],
        warnings: []
    },
    _a; };
export default ValidatableMixin;
