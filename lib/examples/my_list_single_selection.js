import { h } from "gclib-vdom";
import CustomElement from '../src/core/CustomElement';
export class MyListSingleSelection extends CustomElement {
    render() {
        return (h("gcl-list", { selection: '["a"]', selectable: true, selectionChanged: this.showSelection },
            h("gcl-list-item", { id: "listItem", value: "a" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "en" })),
            h("gcl-list-item", { id: "listItem", value: "b" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "fr" })),
            h("gcl-list-item", { id: "listItem", value: "c" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "de" }))));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-single-selection', MyListSingleSelection);
