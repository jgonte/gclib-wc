import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';

/**
 * Shows a contact form populated and submitable to a back end
 */
export class ContactForm extends CustomElement {

    render() {

        return (
            <gcl-form
                id="contactForm"
                load-url="http://localhost:60314/api/contacts/1"
                size="medium">

                <gcl-text-field
                    label="Name"
                    name="name"
                    required
                />

            </gcl-form>
        );
    }

}

//@ts-ignore
customElements.define('contact-form', ContactForm);