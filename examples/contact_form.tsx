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
                submit-url="http://localhost:60314/api/contacts/"
                size="medium">

                <gcl-hidden-field
                    name="id"
                />

                <gcl-text-field
                    label="Name"
                    name="name"
                    required
                />

                <gcl-date-field
                    label="Date of Birth"
                    name="dateOfBirth"
                // required
                />

                <gcl-number-field
                    label="Reputation"
                    name="reputation"
                    min="1"
                    max="10"
                // required
                />

                <gcl-multiline-text-field
                    label="Description"
                    name="description"
                    rows="5"
                    cols="30"
                // required
                />

                <gcl-file-field
                    label="Avatar"
                    name="avatar"
                // required
                />

            </gcl-form>
        );
    }

}

//@ts-ignore
customElements.define('contact-form', ContactForm);