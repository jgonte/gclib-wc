import { h } from 'gclib-vdom';
import { appCtrl } from 'gclib-utils';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';

/**
 * Layout component to encapsulate flexbox functionality
 */
export class LoginSection extends CustomElement {

    static state = {

        user: {}
    }

    async connectedCallback() {

        super.connectedCallback();

        const authProvider = appCtrl.authProvider;

        if (authProvider !== undefined) {

            var user = await authProvider.getUser();

            if (user != null) {

                this.setUser(user);
            }
        }
    }

    render() {

        const authProvider = appCtrl.authProvider;

        if (authProvider === undefined) {

            return (<span>There is no auth provider configured</span>);
        }

        const { user } = this.state;

        if (user === undefined) {

            return (
                <gcl-button variant="primary" click={() => authProvider.login()}>
                    <gcl-text>Login</gcl-text>
                    <gcl-icon name="door-open"></gcl-icon>
                </gcl-button>
            );
        }
        else {

            const {
                given_name,
                middle_name,
                family_name
            } = user.profile;

            return (
                <gcl-row>
                    <span style={{ marginRight: '1rem'}}>Welcome: {given_name} {middle_name} {family_name}!</span>
                    <gcl-button variant="primary" click={() => authProvider.logout()}>
                        <gcl-text>Logout</gcl-text>
                        <gcl-icon name="door-closed"></gcl-icon>
                    </gcl-button>
                </gcl-row>
            );
        }
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-login-section`, LoginSection);