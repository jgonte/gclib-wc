import { h, ElementNode } from 'gclib-vdom';
import { config } from '../../config';
import MinMaxMixin from '../../mixins/minMax/MinMaxMixin';
import { renderField } from '../Field';
import { Field } from '../Field';

//@ts-ignore
export class NumberField extends MinMaxMixin(Field) {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/numberField/NumberField.css`
    //     ]
    // };

    [renderField](): ElementNode {

        const {
            name,
            value,
            //required,
            min,
            max,
            size,
            disabled
        } = this.props;

        return (
            <input
                type="number"
                name={name}
                id={name}
                min={min}
                max={max}
                size={size}
                // class={this.getCSSClass()}
                //required={required}
                // style={{ maxWidth, width }}
                // className={inputClass}
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
customElements.define(`${config.tagPrefix}-number-field`, NumberField);