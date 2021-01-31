import { Fragment, h } from "gclib-vdom";
import CustomElement from "../../core/CustomElement";
import { config } from "../config";

export class Overlay extends CustomElement {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/overlay/Overlay.css`
        ]
    };

    static properties = {

        /** 
         * Whether the overlay is shown
         */
        visible: {
            type: Boolean,
            value: false,
            mutable: true,
            reflect: true
        }
    };

    render() {

        const {
            visible
        } = this.props;

        return visible === true ?
            (
                <Fragment class={this.getCSSClass()} >
                    <slot />
                </Fragment>
            ) : null
    }

    getCSSClass() {

        return {
            "center": true // Center the content by default
        };
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);