import { h, ElementNode } from 'gclib-vdom';
import { config } from '../../config';
import { Field } from '../Field';

//@ts-ignore
export class HiddenField extends Field {

    render(): ElementNode {

        const {
            name,
            value,
        } = this.props;

        return (
            <input
                type="hidden"
                name={name}
                value={value}
            />
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-hidden-field`, HiddenField);