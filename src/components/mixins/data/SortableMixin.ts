import { sorterChanged } from "../../tool/sorter/SorterTool";

const SortableMixin = Base =>

    class Sortable extends Base {

        static state = {

            sorters: []
        };

        /**
         * To track the current sorter element
         */
        sorterElement: any;

        connectedCallback() {

            super.connectedCallback?.();

            this.addEventListener(sorterChanged, this.handleSorterChanged);
        }

        disconnectedCallback() {

            super.disconnectedCallback?.();

            this.removeEventListener(sorterChanged, this.handleSorterChanged);
        }

        handleSorterChanged(event: CustomEvent) {

            const {
                field,
                ascending,
                sorterElement
            } = event.detail;

            if (this.sorterElement === undefined) {

                this.sorterElement = sorterElement;            
            }
            else if (this.sorterElement !== sorterElement) {

                this.sorterElement.setAscending(undefined);

                this.sorterElement = sorterElement;
            }

            this.setSorters([
                {
                    field,
                    order: ascending === true ?
                        'asc' :
                        'desc'
                }
            ]);

            this.load();

            event.stopPropagation();
        }

        updateSorters
    };

export default SortableMixin;