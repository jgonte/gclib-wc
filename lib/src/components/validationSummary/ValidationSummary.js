import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
//@ts-ignore
export class ValidationSummary extends SizableMixin(CustomElement) {
    render() {
        return (h(Fragment, null, [
            ...this.renderWarnings(),
            ...this.renderErrors()
        ]));
    }
    renderWarnings() {
        const { warnings, size } = this.props;
        if (warnings === undefined) {
            return null;
        }
        return warnings.map(warning => h("gcl-alert", { type: "warning", message: warning, size: size, closable: false }));
    }
    renderErrors() {
        const { errors, size } = this.props;
        if (errors === undefined) {
            return null;
        }
        return errors.map(error => h("gcl-alert", { type: "error", message: error, size: size, closable: false }));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/validationSummary/ValidationSummary.css`
//     ]
// };
ValidationSummary.properties = {
    /**
     * The errors to display
     */
    errors: {
        type: Array,
        value: []
    },
    /**
     * The warnings to display
     */
    warnings: {
        type: Array,
        value: []
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-validation-summary`, ValidationSummary);
