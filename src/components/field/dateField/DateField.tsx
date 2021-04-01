import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import MinMaxMixin from '../../mixins/minMax/MinMaxMixin';
import { renderField } from '../Field';
import { Field } from '../Field';
//import { formatDate} from 'gclib-utils';

function formatDate(value: string) {

    const i = value.indexOf('T');

    return value.substr(0, i);
}

//@ts-ignore
export class DateField extends MinMaxMixin(Field) {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/DateField/DateField.css`
    //     ]
    // };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            min,
            max,
            size,
            //required,
            disabled
        } = this.props;

        return (
            <input
                type="date"
                name={name}
                id={name}
                //class={this.getCSSClass()}
                min={min}
                max={max}
                size={size}
                //required={required}
                style={{ minWidth: '150px' }}
                value={value !== undefined ? formatDate(value) : undefined}
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
customElements.define(`${config.tagPrefix}-date-field`, DateField);