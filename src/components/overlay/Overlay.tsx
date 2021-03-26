import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';

export class Overlay extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/overlay/Overlay.css`
        ]
    };

    render() {

        return (
            <Fragment class="center">
                <slot />
            </Fragment>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);