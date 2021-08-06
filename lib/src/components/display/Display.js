import { ElementNode } from "gclib-vdom";
import CustomElement from "../../core/customElement/CustomElement";
import { config } from "../config";
/**
 * Displays a custom content
 */
export class Display extends CustomElement {
    render() {
        return this.props.content || null;
    }
}
Display.properties = {
    /**
     * The content of the display
     */
    content: {
        type: ElementNode,
        mutable: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-display`, Display);
