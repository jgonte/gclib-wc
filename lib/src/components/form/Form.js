import { DataRecord } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
//@ts-ignore
export class Form extends AsyncDataSubmitableMixin(ValidatableMixin(ContainerMixin(CustomElement))) {
    constructor() {
        super();
        this._record = new DataRecord();
        this.reset = this.reset.bind(this);
    }
    render() {
        const { warnings, errors } = this.state;
        const { size } = this.props;
        return (h("form", null,
            h("slot", null),
            h("gcl-validation-summary", { size: size, warnings: warnings, errors: errors }),
            this.renderButtons()));
    }
    renderButtons() {
        return (h("div", null,
            h("gcl-button", { onClick: this.reset, variant: "secondary" }, "Reset"),
            h("gcl-button", { onClick: this.submit, variant: "primary" }, "Submit")));
    }
    submit() {
        if (this.validate()) {
            super.submit();
        }
    }
    validate() {
        const { validators } = this.props;
        const { children } = this.state;
        let valid = true;
        const context = {
            errors: [],
            warnings: []
        };
        validators.forEach((validator) => {
            if (!validator.validate(context)) {
            }
        });
        children.forEach((child) => {
            if (!child.validate()) {
                valid = false;
            }
        });
        return valid;
    }
    reset() {
        this._record.reset();
    }
    onChildAdded(child) {
        child.dataField = this._record.addField(child.props);
    }
    onChildRemoved(child) {
        this._record.removeField(child.props);
        child.dataField = undefined;
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        // Pass the properties to the data record
    }
}
Form.component = {
    styleUrls: [
        `${config.assetsFolder}/form/Form.css`
    ]
};
Form.properties = {
    /** The validators of the form */
    validators: {
        type: Array,
        mutable: true,
        value: []
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);
