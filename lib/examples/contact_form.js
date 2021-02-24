import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';
/**
 * Shows a contact form populated and submitable to a back end
 */
export class ContactForm extends CustomElement {
    render() {
        return (h("gcl-form", { id: "contactForm", "load-url": "http://localhost:60314/api/contacts/1", size: "medium" }));
    }
}
//@ts-ignore
customElements.define('contact-form', ContactForm);
