import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import TargetViewHolderMixin from '../mixins/target-view/TargetViewHolderMixin';
/**
 * Pager component
 */
//@ts-ignore
export class Pager extends TargetViewHolderMixin(SizableMixin(CustomElement)) {
    constructor() {
        super();
        this.goFirst = this.goFirst.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goLast = this.goLast.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }
    goFirst() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        pageIndex = 1;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goPrevious() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        --pageIndex;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goNext() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        ++pageIndex;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goLast() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        pageIndex = totalPages;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    render() {
        const { pageIndex } = this.state;
        const { totalPages } = this.props;
        return (h("gcl-row", null,
            h("gcl-button", { variant: "primary", onClick: this.goFirst, disabled: pageIndex === 1 },
                h("gcl-icon", { name: "chevron-double-left" })),
            h("gcl-button", { variant: "primary", onClick: this.goPrevious, disabled: pageIndex === 1 },
                h("gcl-icon", { name: "chevron-left" })),
            pageIndex,
            " of ",
            totalPages,
            h("gcl-button", { variant: "primary", onClick: this.goNext, disabled: pageIndex === totalPages },
                h("gcl-icon", { name: "chevron-right" })),
            h("gcl-button", { variant: "primary", onClick: this.goLast, disabled: pageIndex === totalPages },
                h("gcl-icon", { name: "chevron-double-right" })),
            this.renderSizeChanger()));
    }
    renderSizeChanger() {
        const { pageSizes } = this.props;
        if (pageSizes === undefined) {
            return null;
        }
        return (h("gcl-row", null,
            h("gcl-select", { data: pageSizes, style: { minWidth: '4rem', width: '4rem' }, change: this.changePageSize }),
            h("span", null, "/ Page")));
    }
    changePageSize(value) {
        const pageIndex = 1; // Reset to start
        this.setPageIndex(pageIndex);
        const pageSize = parseInt(value);
        this.setPageSize(pageSize);
        this.targetView.paginate(pageIndex, pageSize);
    }
}
Pager.component = {
    styleUrls: [
        `${config.assetsFolder}/pager/Pager.css`
    ]
};
Pager.properties = {
    /**
     * The total of pages
     */
    totalPages: {
        attribute: 'total-pages',
        type: Number,
        value: 1,
        required: true
    },
    pageSizes: {
        attribute: 'page-sizes',
        type: Array,
        value: ['10', '25', '50', '100']
    }
};
Pager.state = {
    pageIndex: {
        value: 1
    },
    pageSize: {
        value: 10
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-pager`, Pager);
