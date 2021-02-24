import { formatDate } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';

/**
 * Shows a contacts list populated from a back end
 */
export class ContactsList extends CustomElement {

    render() {

        return (
            <gcl-list
                id="contactsList"
                load-url="http://localhost:60314/api/contacts"
                size="medium"
                selection='[2]'
                selectable
                selectionChanged={this.showSelection}
                renderData={record => {
                    const {
                        id,
                        name,
                        dateOfBirth,
                        reputation,
                        description,
                        avatar
                    } = record;

                    return (
                        <gcl-list-item value={id}>
                            {/* <gcl-icon name={iconName}></gcl-icon> */}
                            <gcl-text>Name: {name}</gcl-text>
                            <gcl-text>Date of Birth: {formatDate(dateOfBirth)}</gcl-text>
                            <gcl-text>Reputation: {reputation}</gcl-text>
                            <gcl-text>Description: {description}</gcl-text>
                            <img style="width: 64px; height: 64px; border-radius: 50%;" src={`data:image/jpeg;base64,${avatar}`} />
                        </gcl-list-item>
                    );
                }}>

            </gcl-list>
        );
    }

    showSelection(selection) {

        alert('Selection: ' + JSON.stringify(selection));
    }
}

//@ts-ignore
customElements.define('contacts-list', ContactsList);