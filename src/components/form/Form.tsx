import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';

export class Form extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/form/Form.css`
        ]
    };

    render() {

        return (
            <form>
                <slot />
            </form>
        );
    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);