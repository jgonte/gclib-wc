import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class TextField extends SingleValueField {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/TextField/TextField.css`
    //     ]
    // };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            required
        } = (this as any).props;

        return (
            <input
                name={name}
                id={name}
                class={this.getCSSClass()}
                required={required}
                // style={{ maxWidth, width }}
                // className={inputClass}
                value={value}
                onChange={this.onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // title={error}
            // ref={i => this.inputref = i}
            // disabled={disabled}
            />
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-text-field`, TextField);