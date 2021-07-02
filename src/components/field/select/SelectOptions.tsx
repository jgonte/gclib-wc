import { Fragment, h } from "gclib-vdom";
import Component from "../../../core/component/Component";
import DataMixin from "../../mixins/data/DataMixin";

// The select component expect children of they option. It will ignore any other component
// Therefore, to output that, we need to extend Component instead of CustomElement
//@ts-ignore
export default class SelectOptions extends
    DataMixin(
        Component
    ) {

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

        selected: {
            type: Object
        }
    };

    constructor(props?, children?) {

        super(props, children);

        this.bindRenderRecord();
    }

    render() {

        return (
            <Fragment>
                {this.renderEmptyOption()}
                {this.renderData()}
            </Fragment>
        );
    }

    renderEmptyOption() {

        const {
            valueProperty,
            displayProperty,
            emptyOption
        } = this.props;

        if (emptyOption === undefined) {

            return null;
        }

        return (<option value={emptyOption[valueProperty]}>{emptyOption[displayProperty]}</option>);
    }

    renderRecord(record, index) {

        const {
            valueProperty,
            displayProperty,
            selected,
            emptyOption,
            parent
        } = this.props;

        if (typeof record === 'object') { // Not a primitive

            const value = record[valueProperty];

            if (selected === undefined) {

                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {

                    parent.setValue(value); // Update the value in the parent

                    return (<option value={value} selected>{record[displayProperty]}</option>);
                }
                else {

                    return (<option value={value}>{record[displayProperty]}</option>);
                }
            }
            else { // selected !== undefined

                const isSelected = Array.isArray(selected) ? selected.includes(value) : selected === value;

                return (<option value={value} selected={isSelected}>{record[displayProperty]}</option>);
            }
        }
        else { // Is a primitive

            if (selected === undefined) {

                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {

                    parent.setValue(record); // Update the value in the parent

                    return (<option value={record} key={record} selected>{record}</option>);
                }
                else {

                    return (<option value={record} key={record} >{record}</option>);
                }
            }
            else { // selected !== undefined

                const isSelected = Array.isArray(selected) ? selected.includes(record) : selected === record;

                return (<option value={record} key={record} selected={isSelected}>{record}</option>);
            }

        }

    }
}