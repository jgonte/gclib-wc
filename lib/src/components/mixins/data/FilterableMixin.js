import { createFilter } from 'gclib-utils';
const FilterableMixin = Base => { var _a; return _a = class Filterable extends Base {
        updateFilter(filter) {
            const f = createFilter(filter);
            this.setFilter(f);
            this.load();
        }
    },
    _a.state = {
        filter: {}
    },
    _a; };
export default FilterableMixin;
