import { h, VirtualNode, FragmentNode } from 'gclib-vdom';
import { config } from '../../config';
import CollectionLoadableMixin from '../../mixins/data/CollectionLoadableMixin';
import ErrorableMixin from '../../mixins/errorable/ErrorableMixin';
import { renderField } from '../Field';
import { Field } from '../Field';
import SelectOptions from './SelectOptions';

//@ts-ignore
export class Select extends
    ErrorableMixin(
        CollectionLoadableMixin(
            Field
        )
    ) {

    static properties = {

        emptyOption: {
            attribute: 'empty-option',
            type: Object
        },

        options: {
            type: VirtualNode
        },

        style: {
            type: String
        },

        // Properties to pass through to the SelectOptions

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

        // We did not use the DataLoadingMixin becase we only use this property to pass through the SelectOptions component
        /**
         * The data fed into the element
         */
        data: {
            type: Array,
            mutable: true
        }
    };

    [renderField](): VirtualNode {

        const {
            name,
            value,
            size,
            //required,
            disabled,
            style
        } = this.props;

        return (
            <select
                name={name}
                id={name}
                style={style}
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
            valueProperty,
            displayProperty,
            emptyOption,
            options,
            data,
            value // The value of the select
        } = this.props;

        if (options === undefined) {

            if (data !== undefined) {

                return (
                    <SelectOptions
                        value-property={valueProperty}
                        display-property={displayProperty}
                        empty-option={emptyOption}
                        data={data}
                        parent={this}
                        selected={value}
                    />
                );
            }
            else {

                return null; // No options and no data
            }
        }
        else { // Display the options

            if (emptyOption !== undefined) {

                // Prepend the empty option
                (options as FragmentNode).prependChildNode(<option value={emptyOption[valueProperty]}>{emptyOption[displayProperty]}</option>);
            }

            return options;
        }
    }

    connectedCallback() {

        super.connectedCallback();

        this.initLoader();
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-select`, Select);