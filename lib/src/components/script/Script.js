import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
/**
 * Component to copy the scripts in the slot to the main application one.
 * Since the scripts declared inside the views, do not work
 */
export class Script extends CustomElement {
    render() {
        return (h("slot", null));
    }
    connectedCallback() {
        // Find the page where the gcl-content is
        const page = this.host.parent;
        // Dynamically append a script with the
        var script = document.createElement("script");
        var inlineScript = document.createTextNode("alert('Hello World!');");
        script.appendChild(inlineScript);
        page.appendChild(script);
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-script`, Script);
