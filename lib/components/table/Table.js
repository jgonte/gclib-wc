import CustomElement from '../../core/CustomElement';
import { h, VirtualNode } from 'gclib-vdom';
//import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
//import TableColumnDefinition from './TableColumnDefinition';
import { config } from '../config';
export class Table extends CustomElement {
    render() {
        return (h("table", null,
            this.caption || null,
            this.header || this.renderHeader(),
            this.body || this.renderBody(),
            this.footer || null));
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
        const { data } = this.props;
        return (h("tbody", null, data.map((record, i) => {
            return this.renderRecord(record, i);
        })));
    }
    renderRecord(record, i) {
        const { rowClick, rowDoubleClick, cellClick } = this.props;
        return (h("tr", { onClick: () => rowClick && rowClick(record, i), onDblClick: () => rowDoubleClick && rowDoubleClick(record, i) }, this.columns.map((c, j) => {
            if (c.render) {
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, c.render(record)));
            }
            else {
                const value = record[c.name];
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, value));
            }
        })));
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
        type: VirtualNode
    },
    /**
     * The header of the table
     */
    header: {
        type: VirtualNode
    },
    /**
     * The body of the table
     */
    body: {
        type: VirtualNode
    },
    /**
     * The footer of the table
     */
    footer: {
        type: VirtualNode
    },
    /**
     * The definition of the columns of the table
     */
    columns: {
        type: Array // Array<TableColumnDefinition>
    },
    /**
     * The data fed into the table
     */
    data: {
        type: Array
    },
    rowClick: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);
