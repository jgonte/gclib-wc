import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import TargetViewHolderMixin from '../mixins/target-view/TargetViewHolderMixin';
import { filterChanged } from './FilterField';

/**
 * Component to filter data requests of the target view
 */
export class FilterPanel extends TargetViewHolderMixin(CustomElement) {

    /**
     * The timeout handle to reset avery time there is a change in filter choice
     */
    timeout: any;

    /**
     * The collection of filters to create the query from
     */
    filters = [];

    render() {

        return (
            <div>
                <slot />
            </div>
        );
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(filterChanged, this.handleFilterChanged);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(filterChanged, this.handleFilterChanged);
    }

    handleFilterChanged(event: CustomEvent) {

        const {
            fieldName,
            operator,
            value
        } = event.detail;

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {

            const filter = this.getFilter(fieldName, operator, value);

            this.targetView.updateFilter(filter);

        }, 1000);

        event.stopPropagation();
    }

    getFilter(fieldName: string, operator: string, value: any) {

        if (fieldName === undefined) {

            throw new Error('Field name is required.');
        }

        if (operator === undefined) {

            throw new Error('Operator is required.');
        }

        // Unique filters by field name for this component
        let selectedFilters = this.filters.filter(f => f.fieldName === fieldName);

        switch (selectedFilters.length) {
            case 0: { // Filter does not exist

                if (value) {

                    this.filters.push({
                        fieldName: fieldName,
                        operator: operator,
                        value: value
                    });
                }
            }
                break;
            case 1: { 

                if (!value) { // Remove the filter by field name when the value is empty

                    const item = this.filters.find(f => f.fieldName === fieldName);

                    const index = this.filters.indexOf(item);

                    this.filters.splice(index, 1);
                }
                else { // Update the operator and value of existing filter

                    let filter = selectedFilters[0];

                    filter.operator = operator;

                    filter.value = value;
                }
            }
                break;
            default: // Duplicate filter
                throw new Error(`Duplicate filters for field: '${fieldName}'`);
        }

        // Update the filter to send to the server
        switch (this.filters.length) {
            case 0: return null;
            case 1: return this.filters[0];
            default: 
                return {
                    operator: 'and',
                    filters: this.filters
                };
        }
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-filter-panel`, FilterPanel);