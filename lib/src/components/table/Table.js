import CustomElement from '../../core/customElement/CustomElement';
import { Fragment, h, ElementNode } from 'gclib-vdom';
//import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
//import TableColumnDefinition from './TableColumnDefinition';
import { config } from '../config';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
//@ts-ignore
export class Table extends DataCollectionLoadableMixin(CustomElement) {
    render() {
        const { caption, header, body, footer } = this.props;
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            h("table", null,
                caption || null,
                header || this.renderHeader(),
                body || this.renderBody(),
                footer || null)));
    }
    renderHeader() {
        const { columns } = this.props;
        return (h("thead", null,
            h("tr", null, columns.map(c => {
                if (typeof c.renderLabel !== 'undefined') {
                    return (h("th", null, c.renderLabel()));
                }
                else {
                    return (h("th", null, c.title));
                }
            }))));
    }
    renderBody() {
        return (h("tbody", null, this.renderData()));
    }
    renderRecord(record, i) {
        const { columns, rowClick, rowDoubleClick, cellClick } = this.props;
        return (h("tr", { onClick: () => rowClick && rowClick(record, i), onDblClick: () => rowDoubleClick && rowDoubleClick(record, i) }, columns.map((c, j) => {
            if (c.render) {
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, c.render(record)));
            }
            else {
                const value = record[c.name];
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, value));
            }
        })));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.bindRenderRecord();
        this.initLoader();
    }
}
Table.component = {
    styleUrls: [
        `${config.assetsFolder}/table/Table.css`
    ]
};
Table.properties = {
    /**
     * The caption of the table
     */
    caption: {
        type: ElementNode
    },
    /**
     * The header of the table
     */
    header: {
        type: ElementNode
    },
    /**
     * The body of the table
     */
    body: {
        type: ElementNode
    },
    /**
     * The footer of the table
     */
    footer: {
        type: ElementNode
    },
    /**
     * The definition of the columns of the table
     */
    columns: {
        type: Array // Array<TableColumnDefinition>
    },
    rowClick: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);
