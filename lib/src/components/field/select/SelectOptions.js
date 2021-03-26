import { Fragment, h } from "gclib-vdom";
import Component from "../../../core/component/Component";
import DataLoadableMixin from "../../mixins/data/DataLoadableMixin";
// The select component expect children of they option. It will ignore any other component
// Therefore, to output that, we need to extend Component instead of CustomElement
//@ts-ignore
export default class SelectOptions extends DataLoadableMixin(Component) {
    constructor(props, children) {
        super(props, children);
        this.bindRenderRecord();
        this.initLoader();
    }
    render() {
        return (h(Fragment, null,
            this.renderEmptyOption(),
            this.renderData()));
    }
    renderEmptyOption() {
        const { emptyOption } = this.props;
        if (emptyOption === undefined) {
            return null;
        }
        const { label, value } = emptyOption;
        return (h("option", { value: value }, label));
    }
    renderRecord(record) {
        const { valueProperty, displayProperty } = this.props;
        return (h("option", { value: record[valueProperty] }, record[displayProperty]));
    }
}
SelectOptions.properties = {
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