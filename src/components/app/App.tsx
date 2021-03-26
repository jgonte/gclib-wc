import { appCtrl, IntlProvider } from 'gclib-utils';
import CustomElement from '../../core/customElement/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';

export class App extends CustomElement {

    connectedCallback() {

        var intlProvider = new IntlProvider(
            /*lang*/
            'en',
            /*data*/
            {
                'en': {
                    'goodMorning': 'Good morning'
                },
                'de': {
                    'goodMorning': 'Guten Morgen'
                },
                'fr': {
                    'goodMorning': 'Bonjour'
                }
            });

        appCtrl.intlProvider = intlProvider;

        super.connectedCallback();
    }

    render() {

        return (<slot />);
    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-app`, App);