import { h } from 'gclib-vdom';
import CustomElement from '../src/core/customElement/CustomElement';
export class MyListSingleSelectionLoadData extends CustomElement {
    render() {
        return (h("gcl-list", { id: "listWithData", size: "small", selection: '["c"]', selectable: true, selectionChanged: this.showSelection, data: [
                {
                    value: 'a',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'en'
                },
                {
                    value: 'b',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'fr'
                },
                {
                    value: 'c',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'de'
                }
            ], renderRecord: record => {
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
customElements.define('my-list-single-selection-load-data', MyListSingleSelectionLoadData);
