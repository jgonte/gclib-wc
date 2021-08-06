import { ElementNode } from "gclib-vdom";
import CustomElement from "../../core/customElement/CustomElement";
import { config } from "../config";

/**
 * Displays a custom content
 */
export class Display extends CustomElement {

    static properties = {

        /** 
         * The content of the display
         */
        content: {
            type: ElementNode,
            mutable: true
        }
    };

    render() {

        return this.props.content || null;
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-display`, Display);