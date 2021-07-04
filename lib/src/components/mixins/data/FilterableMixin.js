const FilterableMixin = Base => { var _a; return _a = class Filterable extends Base {
        updateFilter(filter) {
            this.setFilter(filter);
            this.load();
        }
    },
    _a.state = {
        filter: {}
    },
    _a; };
export default FilterableMixin;
