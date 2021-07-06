import { h, VirtualNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
const texts = {
    // Comparison operators
    'eq': 'Equals',
    'ne': 'Not equals',
    'gt': 'Greater than',
    'ge': 'Greater than or equals',
    'lt': 'Less than',
    'le': 'Less than or equals',
    // Logical operators
    'not': 'Not',
    'and': 'And',
    'or': 'Or',
    // String functions
    'contains': 'Contains',
    'startswith': 'Starts with',
    'endswith': 'Ends with'
};
const getText = operator => {
    const text = texts[operator];
    if (!text) {
        throw new Error(`Text not found for operator: '${operator}'`);
    }
    return text;
};
export const filterChanged = 'filterChanged';
/**
 * Component to filter data requests of the target view
 */
export class FilterField extends CustomElement {
    constructor() {
        super();
        this.operatorChanged = this.operatorChanged.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
    }
    render() {
        const { field, operators } = this.props;
        const select = (h("gcl-select", { slot: "after-label", name: "operator", "empty-option": {
                description: '--Select Operator--',
                code: ''
            }, data: this.operatorsToOptions(operators), change: this.operatorChanged }));
        this.fieldName = field.props['name'];
        field.props['input'] = this.valueChanged;
        field.children.push(select);
        return field;
    }
    operatorsToOptions(operators) {
        return operators.map(operator => {
            return {
                code: operator,
                description: getText(operator)
            };
        });
    }
    operatorChanged(operator) {
        this.operator = operator;
        const { fieldName, value } = this;
        if (value === undefined) {
            return; // Ignore when the operator has changed if there is no value to filter
        }
        this.dispatchEvent(new CustomEvent(filterChanged, {
            detail: {
                field: fieldName,
                operator,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
    valueChanged(value) {
        this.value = value;
        const { fieldName, operator } = this;
        if (operator === undefined) {
            return; // Ignore when the value has changed if there is no operator to filter
        }
        this.dispatchEvent(new CustomEvent(filterChanged, {
            detail: {
                field: fieldName,
                operator,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
}
FilterField.properties = {
    /**
     * The field to render
     */
    field: {
        type: VirtualNode,
        required: true
    },
    /**
     * The operators of the filter
     */
    operators: {
        type: Array,
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-filter-field`, FilterField);
