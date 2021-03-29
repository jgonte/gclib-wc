import { Fragment, h } from "gclib-vdom";
import Component from "../../../core/component/Component";
import DataMixin from "../../mixins/data/DataMixin";
// The select component expect children of they option. It will ignore any other component
// Therefore, to output that, we need to extend Component instead of CustomElement
//@ts-ignore
export default class SelectOptions extends DataMixin(Component) {
    constructor(props, children) {
        super(props, children);
        this.bindRenderRecord();
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
        const { valueProperty, displayProperty, selected } = this.props;
        const value = record[valueProperty];
        const isSelected = selected !== undefined &&
            Array.isArray(selected) ? selected.includes(value) : selected === value;
        return (h("option", { value: value, selected: isSelected }, record[displayProperty]));
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
    },
    selected: {
        type: Object
    }
};
