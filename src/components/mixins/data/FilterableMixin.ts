import { createFilter } from 'gclib-utils';

const FilterableMixin = Base =>

    class Filterable extends Base {

        static state = {

            filter: {}
        };

        updateFilter(filter: any) {

            const f = createFilter(filter);

            this.setFilter(f);

            this.load();
        }
    };

export default FilterableMixin;
