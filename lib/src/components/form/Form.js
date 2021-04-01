import { Fragment, h } from 'gclib-vdom';
import CustomElement from "../../core/customElement/CustomElement";
import { config } from '../config';
import { DataRecord } from 'gclib-utils';
import { Field } from '../field/Field';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataLoadableMixin from '../mixins/data/DataLoadableMixin';
import SubmittableMixin from '../mixins/data/SubmittableMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { valueChanged } from '../field/Field';
//@ts-ignore
export class Form extends SubmittableMixin(DataLoadableMixin(ValidatableMixin(ContainerMixin(SizableMixin(CustomElement))))) {
    constructor() {
        super();
        this._record = new DataRecord();
        this.reset = this.reset.bind(this);
    }
    render() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            this.renderSubmitting(),
            h("form", { size: size },
                h("slot", null),
                h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors }),
                this.renderButtons())));
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
            const { value } = child.props;
            if (!child.validate(value)) {
                valid = false;
            }
        });
        return valid;
    }
    reset() {
        this._record.reset();
        const data = this._record.getData();
        this.populateFields(data);
    }
    acceptChild(child) {
        return child instanceof Field; // Only accept fields
    }
    onChildAdded(child) {
        child.dataField = this._record.addField(child.props);
    }
    onChildRemoved(child) {
        this._record.removeField(child.props);
        child.dataField = undefined;
    }
    /** Called to retrieve the data to send the server */
    getSubmitData() {
        const data = this._record.getData();
        console.log(JSON.stringify(data));
        return data;
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.loadsCollection = false;
        this.initLoader();
        this.initSubmitter();
        this.addEventListener(valueChanged, this.onValueChanged);
        // Pass the properties to the data record
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(valueChanged, this.onValueChanged);
    }
    onValueChanged(event) {
        const { name, value } = event.detail;
        console.log('valueChanged: ' + JSON.stringify(event.detail));
        this._record.setData({
            [name]: value
        });
        event.stopPropagation();
    }
    handleSubmitResponse(data) {
        console.log(JSON.stringify(data));
        this._record.setData(data);
    }
    onLoadData(data) {
        super.onLoadData(data);
        const { payload } = data;
        this._record.initialize(payload);
        this.populateFields(payload);
    }
    populateFields(data) {
        const { children } = this.state;
        const fieldsMap = new Map(children.map(child => [child.props.name, child]));
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const field = fieldsMap.get(key);
                field.setValue(data[key], field.onValueSet);
            }
        }
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
