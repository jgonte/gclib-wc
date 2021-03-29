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
            emptyOption
        } = this.props;

        if (emptyOption === undefined) {

            return null;
        }

        const {
            label,
            value
        } = emptyOption;

        return (<option value={value}>{label}</option>);
    }

    renderRecord(record) {

        const {
            valueProperty,
            displayProperty
        } = this.props;

        return (<option value={record[valueProperty]}>{record[displayProperty]}</option>);
    }
}