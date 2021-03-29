import { /*Fragment, */ h } from 'gclib-vdom';
//import SelectOptions from '../src/components/field/select/SelectOptions';
import CustomElement from '../src/core/customElement/CustomElement';
/**
 * Shows a contact form populated and submitable to a back end
 */
export class ContactForm extends CustomElement {
    render() {
        return (h("gcl-form", { id: "contactForm", "load-url": "http://localhost:60314/api/contacts/1", "submit-url": "http://localhost:60314/api/contacts/", size: "medium" },
            h("gcl-hidden-field", { name: "id", "is-id": "true" }),
            h("gcl-text-field", { label: "Name", name: "name", required: true }),
            h("gcl-select", { label: "Gender", name: "gender", "empty-option": {
                    label: '--Please choose an option--',
                    value: ''
                }, "load-url": "http://localhost:60314/api/genders" }),
            h("gcl-date-field", { label: "Date of Birth", name: "dateOfBirth" }),
            h("gcl-number-field", { label: "Reputation", name: "reputation", min: "1", max: "10" }),
            h("gcl-text-area", { label: "Description", name: "description", rows: "5", cols: "30" }),
            h("gcl-file-field", { label: "Avatar", name: "avatar" })));
    }
}
//@ts-ignore
customElements.define('contact-form', ContactForm);
