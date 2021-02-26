import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { config } from '../config';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';
export class Form extends AsyncDataSubmitableMixin(ContainerMixin(CustomElement)) {
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
    reset() {
    }
}
Form.component = {
    styleUrls: [
        `${config.assetsFolder}/form/Form.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);
