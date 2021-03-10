import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';

export class Overlay extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/overlay/Overlay.css`
        ]
    };

    render() {

        return (
            <Fragment class={this.getCSSClass()}>
                <slot />
            </Fragment>
        );
    }

    getCSSClass() {

        return {
            "center": true // Center the content by default
        };
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);