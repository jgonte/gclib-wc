import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';

//@ts-ignore
export class CurrentYear extends CustomElement {

    render() {

        return new Date().getFullYear();
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-current-year`, CurrentYear);