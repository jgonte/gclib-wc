import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';
export class MyListSingleSelectionLoadEmptyData extends CustomElement {
    render() {
        return (h("gcl-list", { id: "listWithEmptyData", size: "small", selection: '["c"]', selectable: true, selectionChanged: this.showSelection, data: [
            // Empty
            ], renderData: record => {
                const { value, iconName, textKey, lang } = record;
                return (h("gcl-list-item", { value: value },
                    h("gcl-icon", { name: iconName }),
                    h("gcl-text", { "intl-key": textKey, lang: lang })));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-single-selection-load-empty-data', MyListSingleSelectionLoadEmptyData);
