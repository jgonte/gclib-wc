import { sorterChanged } from "../../tool/sorter/SorterTool";
const SortableMixin = Base => { var _a; return _a = class Sortable extends Base {
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.addEventListener(sorterChanged, this.handleSorterChanged);
        }
        disconnectedCallback() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.removeEventListener(sorterChanged, this.handleSorterChanged);
        }
        handleSorterChanged(event) {
            const { field, ascending, sorterElement } = event.detail;
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
    },
    _a.state = {
        sorters: []
    },
    _a; };
export default SortableMixin;
