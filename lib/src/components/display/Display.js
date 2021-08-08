import { ElementNode, h } from "gclib-vdom";
import CustomElement from "../../core/customElement/CustomElement";
import { config } from "../config";
/**
 * Displays a custom content
 */
export class Display extends CustomElement {
    render() {
        const { content } = this.props;
        if (content === undefined) {
            return null;
        }
        return (h("span", null, content));
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
