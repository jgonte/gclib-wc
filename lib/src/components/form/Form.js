import { DataRecord } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { config } from '../config';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';
export class Form extends AsyncDataSubmitableMixin(ContainerMixin(CustomElement)) {
    constructor() {
        super(...arguments);
        this._record = new DataRecord();
    }
    render() {
        return (h("form", null,
            h("slot", null),
            this.renderButtons()));
    }
    renderButtons() {
        return (h("div", null,
            h("gcl-button", { onClick: this.reset, variant: "secondary" }, "Reset"),
            h("gcl-button", { onClick: this.submit, variant: "primary" }, "Submit")));
    }
    submit() {
        const context = {
            errors: [],
            stopWhenInvalid: true
        };
        if (this._record.validate(context)) {
            super.submit();
        }
    }
    reset() {
    }
    onChildAdded(child) {
        this._record.addField(child.props);
    }
    onChildRemoved(child) {
        this._record.removeField(child.props);
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
//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);
