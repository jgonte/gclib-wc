import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { Field } from '../Field';

//@ts-ignore
export class TextField extends Field {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/TextField/TextField.css`
    //     ]
    // };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            size,
            //required,
            disabled
        } = this.props;

        return (
            <input
                type="text"
                name={name}
                id={name}
                size={size} // Needed for the CSS to get the right size
                //class={this.getCSSClass()}
                //required={required}
                // style={{ maxWidth, width }}
                value={value}
                onInput={this.onInput}
                onChange={this.onChange}
                // onFocus={onFocus}
                onBlur={this.onBlur}
                // title={error}
                // ref={i => this.inputref = i}
                disabled={disabled}
            />
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-text-field`, TextField);