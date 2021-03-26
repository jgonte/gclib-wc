import { formatDate } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from '../src/core/customElement/CustomElement';
/**
 * Shows a contacts list populated from a back end
 */
export class ContactsList extends CustomElement {
    render() {
        return (h("gcl-list", { id: "contactsList", "load-url": "http://localhost:60314/api/contacts", size: "medium", selection: '[2]', selectable: true, selectionChanged: this.showSelection, renderRecord: record => {
                const { id, name, dateOfBirth, reputation, description, avatar } = record;
                return (h("gcl-list-item", { value: id },
                    h("gcl-text", null,
                        "Name: ",
                        name),
                    h("gcl-text", null,
                        "Date of Birth: ",
                        formatDate(dateOfBirth)),
                    h("gcl-text", null,
                        "Reputation: ",
                        reputation),
                    h("gcl-text", null,
                        "Description: ",
                        description),
                    h("img", { style: "width: 64px; height: 64px; border-radius: 50%;", src: `data:image/jpeg;base64,${avatar.content}` })));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('contacts-list', ContactsList);
