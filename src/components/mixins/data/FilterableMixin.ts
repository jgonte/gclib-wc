const FilterableMixin = Base =>

    class Filterable extends Base {

        static state = {

            filter: {}
        };

        updateFilter(filter: any) {

            this.setFilter(filter);

            this.load();
        }
    };

export default FilterableMixin;