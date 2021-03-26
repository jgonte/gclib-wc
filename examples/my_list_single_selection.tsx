import { h } from 'gclib-vdom';
import CustomElement from '../src/core/customElement/CustomElement';

export class MyListSingleSelection extends CustomElement {

    render() {

        return (
            <gcl-list
                selection='["a"]'
                selectable
                selectionChanged={this.showSelection}>

                <gcl-list-item value="a">
                    <gcl-icon name="alarm-fill"></gcl-icon>
                    <gcl-text intl-key="goodMorning" lang="en"></gcl-text>
                </gcl-list-item>

                <gcl-list-item value="b">
                    <gcl-icon name="alarm-fill"></gcl-icon>
                    <gcl-text intl-key="goodMorning" lang="fr"></gcl-text>
                </gcl-list-item>

                <gcl-list-item value="c">
                    <gcl-icon name="alarm-fill"></gcl-icon>
                    <gcl-text intl-key="goodMorning" lang="de"></gcl-text>
                </gcl-list-item>

            </gcl-list>
        );
    }

    showSelection(selection) {

        alert('Selection: ' + JSON.stringify(selection));
    }
}

//@ts-ignore
customElements.define('my-list-single-selection', MyListSingleSelection);