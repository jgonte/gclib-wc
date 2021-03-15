import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import MinMaxMixin from '../../mixins/minMax/MinMaxMixin';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class DateField extends MinMaxMixin(SingleValueField) {

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
                value={value}
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