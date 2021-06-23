import { appCtrl, IntlProvider, OidcProvider } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';

export class App extends CustomElement {

    connectedCallback() {

        if ((window as any).getAppConfig !== undefined) {

            const {
                auth,
                intl
            } = (window as any).getAppConfig();

            if (auth !== undefined) {

                appCtrl.authProvider = new OidcProvider(auth);
            }

            if (intl !== undefined) {

                appCtrl.intlProvider = new IntlProvider(intl.lang, intl.data);
            }
        }

        // Attach a function to the window to get the app
        (window as any).getApp = () => appCtrl;

        super.connectedCallback();
    }

    render() {

        return (<slot />);
    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-app`, App);