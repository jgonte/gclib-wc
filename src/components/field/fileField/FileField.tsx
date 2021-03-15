import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class FileField extends SingleValueField {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/FileField/FileField.css`
    //     ]
    // };

    static properties = {

        accept: {
            type: String
        },

        capture: {
            type: Boolean
        },

        multiple: {
            type: Boolean
        }
    };

    [renderField](): VirtualNode {

        const {
            name,
            //value,
            accept,
            capture,
            multiple,
            size,
            //required,
            disabled
        } = this.props;

        return (
            <input
                type="file"
                name={name}
                id={name}
                accept={accept}
                capture={capture}
                multiple={multiple}
                size={size}
                //class={this.getCSSClass()}
                //required={required}
                style={{ minWidth: '220px' }}
                // className={inputClass}
                //value={value} //TODO: Use it to populate a preview section
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
customElements.define(`${config.tagPrefix}-file-field`, FileField);