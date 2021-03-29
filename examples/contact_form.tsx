import { /*Fragment, */ h } from 'gclib-vdom';
//import SelectOptions from '../src/components/field/select/SelectOptions';
import CustomElement from '../src/core/customElement/CustomElement';

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
                    is-id="true"
                />

                <gcl-text-field
                    label="Name"
                    name="name"
                    required
                />

                <gcl-select
                    label="Genre"
                    name="genre"
                    empty-option={{
                        label: '--Please choose an option--',
                        value: ''
                    }}
                    // data={[
                    //     {
                    //         code: 'm',
                    //         description: 'Male'
                    //     },
                    //     {
                    //         code: 'f',
                    //         description: 'Female'
                    //     }
                    // ]}
                    // options={
                    //     <Fragment>
                    //         <option value="m">Male</option>
                    //         <option value="f">Female</option>
                    //     </Fragment>
                    // }
                    load-url="http://localhost:60314/api/genders"
                >
                    {/* 
                    This option does not work
                    <option value="m">Male</option>
                    <option value="f">Female</option> 
                    */}
                </gcl-select>

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

                <gcl-text-area
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