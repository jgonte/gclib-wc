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
    renderRecord(record, index) {
        const { valueProperty, displayProperty, selected, emptyOption, parent } = this.props;
        if (typeof record === 'object') { // Not a primitive
            const value = record[valueProperty];
            if (selected === undefined) {
                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {
                    parent.setValue(value); // Update the value in the parent
                    return (h("option", { value: value, selected: true }, record[displayProperty]));
                }
                else {
                    return (h("option", { value: value }, record[displayProperty]));
                }
            }
            else { // selected !== undefined
                const isSelected = Array.isArray(selected) ? selected.includes(value) : selected === value;
                return (h("option", { value: value, selected: isSelected }, record[displayProperty]));
            }
        }
        else { // Is a primitive
            if (selected === undefined) {
                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {
                    parent.setValue(record); // Update the value in the parent
                    return (h("option", { value: record, selected: true }, record));
                }
                else {
                    return (h("option", { value: record }, record));
                }
            }
            else { // selected !== undefined
                const isSelected = Array.isArray(selected) ? selected.includes(record) : selected === record;
                return (h("option", { value: record, selected: isSelected }, record));
            }
        }
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
