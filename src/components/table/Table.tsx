import CustomElement from '../../core/CustomElement';
import { h, VirtualNode } from 'gclib-vdom';
//import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
//import TableColumnDefinition from './TableColumnDefinition';
import { config } from '../config';

export class Table extends CustomElement {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/table/Table.css`
        ]
    };

    static properties = {

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
    }

    render() {

        return (
            <table>
                {this.caption || null}
                {this.header || this.renderHeader()}
                {this.body || this.renderBody()}
                {this.footer || null}
            </table>
        );
    }

    renderHeader() {

        const {
            columns
        } = this.props;

        return (
            <thead>
                <tr>
                    {columns.map(c => {

                        if (typeof c.renderLabel !== 'undefined') {

                            return (
                                <th>{c.renderLabel()}</th>
                            );
                        }
                        else {

                            return (
                                <th>{c.title}</th>
                            );
                        }
                    })}
                </tr>
            </thead>
        );
    }

    renderBody() {

        const {
            data
        } = this.props;

        return (
            <tbody>
                {data.map((record, i) => {
                    return this.renderRecord(record, i);
                })}
            </tbody>
        );
    }

    renderRecord(record, i) {

        const {
            rowClick,
            rowDoubleClick,
            cellClick
        } = this.props;

        return (
            <tr
                onClick={() => rowClick && rowClick(record, i)}
                onDblClick={() => rowDoubleClick && rowDoubleClick(record, i)}
            >
                {this.columns.map((c, j) => {

                    if (c.render) {

                        return (
                            <td
                                onClick={() => cellClick && cellClick(record, i, j)}
                            >
                                {c.render(record)}
                            </td>
                        );
                    }
                    else {

                        const value = record[c.name];

                        return (
                            <td
                                onClick={() => cellClick && cellClick(record, i, j)}
                            >
                                {value}
                            </td>
                        );
                    }
                })}
            </tr>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);