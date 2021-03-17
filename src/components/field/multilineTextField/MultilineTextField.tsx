import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class MultilineTextField extends SingleValueField {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/TextField/TextField.css`
    //     ]
    // };

    static properties = {

        rows: {
            type: Number
        },

        cols: {
            type: Number
        }
    };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            rows,
            cols,
            size,
            //required,
            disabled
        } = this.props;

        return (
            <textarea
                name={name}
                id={name}
                rows={rows}
                cols={cols}
                //class={this.getCSSClass()}
                size={size}
                //required={required}
                // style={{ maxWidth, width }}
                // className={inputClass}

                onChange={this.onChange}
                // onFocus={onFocus}
                onBlur={this.onBlur}
                // title={error}
                // ref={i => this.inputref = i}
                disabled={disabled}
            >
                {value !== undefined ? value : null}
            </textarea>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-multiline-text-field`, MultilineTextField);