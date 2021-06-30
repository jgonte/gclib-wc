import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
/**
 * Pager component
 */
//@ts-ignore
export class Pager extends SizableMixin(CustomElement) {
    constructor() {
        super();
        this.goFirst = this.goFirst.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goLast = this.goLast.bind(this);
    }
    goFirst() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        pageIndex = 1;
        this.setPageIndex(pageIndex);
        this.pageableView.paginate(pageIndex, pageSize);
    }
    goPrevious() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        --pageIndex;
        this.setPageIndex(pageIndex);
        this.pageableView.paginate(pageIndex, pageSize);
    }
    goNext() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        ++pageIndex;
        this.setPageIndex(pageIndex);
        this.pageableView.paginate(pageIndex, pageSize);
    }
    goLast() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        pageIndex = totalPages;
        this.setPageIndex(pageIndex);
        this.pageableView.paginate(pageIndex, pageSize);
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
        return (h("span", null,
            h("gcl-select", { data: pageSizes, style: { width: '3rem' } }),
            "/ Page"));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        const { viewId } = this.props;
        this.pageableView = document.getElementById(viewId);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.pageableView = null;
    }
}
Pager.component = {
    styleUrls: [
        `${config.assetsFolder}/pager/Pager.css`
    ]
};
Pager.properties = {
    /**
     * The id of the view to paginate
     */
    viewId: {
        attribute: 'view-id',
        type: String,
        required: true
    },
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
