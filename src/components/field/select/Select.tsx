import { h, VirtualNode, FragmentNode, Fragment } from 'gclib-vdom';
import { config } from '../../config';
import AsyncDataLoadableMixin from '../../mixins/data/AsyncDataLoadableMixin';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class Select extends AsyncDataLoadableMixin(SingleValueField) {

    static properties = {

        /**
         * The name of the property to map the value of the option
         */
        valueProperty: {
            attribute: 'value-property',
            type: String,
            value: 'code'
        },

        displayProperty: {
            attribute: 'display-property',
            type: String,
            value: 'description'
        },

        emptyOption: {
            attribute: 'empty-option',
            type: Object
        },

        options: {
            type: VirtualNode
        }
    };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            size,
            //required,
            disabled
        } = this.props;

        return (
            <select
                name={name}
                id={name}
                // style={{ maxWidth, width }}
                value={value}
                size={size} // Needed for the CSS to get the right size
                onInput={this.onInput}
                onChange={this.onChange}
                // onFocus={onFocus}
                onBlur={this.onBlur}
                disabled={disabled}
            >
                {this.renderOptions()}
            </select>
        );
    }

    renderOptions() {

        const {
            emptyOption,
            options,
            data,
            valueProperty,
            displayProperty
        } = this.props;

        if (options != undefined) {

            if (emptyOption !== undefined) {

                // Prepend the empty option
                const {
                    label,
                    value
                } = emptyOption;

                (options as FragmentNode).prependChildNode(<option value={value}>{label}</option>)

            }

            return options;
        }

        if (data != undefined) {

            return (
                <Fragment>
                    {data.map(item => <option value={item[valueProperty]}>{item[displayProperty]}</option>)}
                </Fragment>
            );
        }

        return null; // No options to render
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-select`, Select);