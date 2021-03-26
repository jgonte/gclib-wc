import { h } from 'gclib-vdom';
import CustomElement from '../src/core/customElement/CustomElement';

export class MyListSingleSelectionLoadEmptyData extends CustomElement {

    render() {

        return (
            <gcl-list
                id="listWithEmptyData"
                size="small"
                selection='["c"]'
                selectable
                selectionChanged={this.showSelection}
                data={[
                    // Empty
                ]}
                renderRecord={record => {
                    const {
                        value,
                        iconName,
                        textKey,
                        lang
                    } = record;

                    return (
                        <gcl-list-item value={value}>
                            <gcl-icon name={iconName}></gcl-icon>
                            <gcl-text intl-key={textKey} lang={lang}></gcl-text>
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
customElements.define('my-list-single-selection-load-empty-data', MyListSingleSelectionLoadEmptyData);