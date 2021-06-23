import { h } from 'gclib-vdom';
import { appCtrl } from 'gclib-utils';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
/**
 * Layout component to encapsulate flexbox functionality
 */
export class LoginSection extends CustomElement {
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
            return (h("span", null, "There is no auth provider configured"));
        }
        const { user } = this.state;
        if (user === undefined) {
            return (h("gcl-button", { variant: "primary", click: () => authProvider.login() },
                h("gcl-text", null, "Login"),
                h("gcl-icon", { name: "door-open" })));
        }
        else {
            const { given_name, middle_name, family_name } = user.profile;
            return (h("gcl-row", null,
                h("span", { style: { marginRight: '1rem' } },
                    "Welcome: ",
                    given_name,
                    " ",
                    middle_name,
                    " ",
                    family_name,
                    "!"),
                h("gcl-button", { variant: "primary", click: () => authProvider.logout() },
                    h("gcl-text", null, "Logout"),
                    h("gcl-icon", { name: "door-closed" }))));
        }
    }
}
LoginSection.state = {
    user: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-login-section`, LoginSection);
