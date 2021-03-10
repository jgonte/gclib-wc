import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';
/**
 * Shows a contact form populated and submitable to a back end
 */
export class ContactForm extends CustomElement {
    render() {
        return (h("gcl-form", { id: "contactForm", "load-url": "http://localhost:60314/api/contacts/1", "submit-url": "http://localhost:60314/api/contacts/", size: "medium" },
            h("gcl-hidden-field", { name: "id" }),
            h("gcl-text-field", { label: "Name", name: "name", required: true }),
            h("gcl-date-field", { label: "Date of Birth", name: "dateOfBirth" }),
            h("gcl-number-field", { label: "Reputation", name: "reputation", min: "1", max: "10" }),
            h("gcl-multiline-text-field", { label: "Description", name: "description", rows: "5", cols: "30" }),
            h("gcl-file-field", { label: "Avatar", name: "avatar" })));
    }
}
//@ts-ignore
customElements.define('contact-form', ContactForm);
