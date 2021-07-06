import { h, Fragment, notifyNodeWillDisconnect } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { resourceLoader } from 'gclib-utils';
function createScriptNode(oldScript, newValue) {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.setAttribute('data-view', newValue); // Set the view attribute so we can remove it when other views are selected
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    return newScript;
}
export class Content extends CustomElement {
    constructor() {
        super();
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }
    render() {
        return (h(Fragment, null));
    }
    async attributeChangedCallback(attributeName, oldValue, newValue) {
        var _a;
        (_a = super.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, attributeName, oldValue, newValue);
        if (attributeName === 'source' && oldValue !== newValue) {
            const content = await resourceLoader.get(newValue);
            const parser = new DOMParser();
            // Even though it is a fragment, it creates a full HTML document
            const { head, body } = parser.parseFromString(content, "text/html");
            // Clear any previous content
            while (this.document.firstChild) {
                notifyNodeWillDisconnect(this.document.firstChild);
                this.document.firstChild.remove();
            }
            // Remove any scripts with the data-view attributes set
            document.head.querySelectorAll('[data-view]').forEach(script => script.remove());
            document.body.querySelectorAll('[data-view]').forEach(script => script.remove());
            // Add any script that appears in the head
            Array.from(head.children).forEach(child => {
                if (child.tagName === 'SCRIPT') {
                    const newScript = createScriptNode(child, newValue);
                    document.head.appendChild(newScript);
                }
                // else { // Maybe CSS or Meta
                //     throw Error('Not implemented');
                // }
            });
            // Add the new content
            Array.from(body.children).forEach(child => {
                if (child.tagName === 'SCRIPT') {
                    const newScript = createScriptNode(child, newValue);
                    document.body.appendChild(newScript);
                }
                else { // Add it to this component
                    this.document.appendChild(child);
                }
            });
        }
    }
    onRouteChanged(route, router) {
        if (route === undefined) {
            const { notFound } = this.props;
            this.setSource(notFound);
        }
        else {
            this.setSource(route.view);
        }
    }
}
Content.component = {
    shadow: false // Do not create a shadow DOM for this component!
};
Content.properties = {
    /**
     * The source to set the content from
     */
    source: {
        type: String,
        mutable: true,
        reflect: true
    },
    /**
     * The source to load when the route does not exist
     */
    notFound: {
        attribute: 'not-found',
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);
