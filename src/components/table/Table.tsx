import CustomElement from '../../core/customElement/CustomElement';
import { Fragment, h, VirtualNode } from 'gclib-vdom';
//import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
//import TableColumnDefinition from './TableColumnDefinition';
import { config } from '../config';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';

//@ts-ignore
export class Table extends DataCollectionLoadableMixin(CustomElement) {

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

        rowClick: {
            type: Function
        }
    }

    render() {

        const {
            caption,
            header,
            body,
            footer
        } = this.props;

        return (
            <Fragment>
                {this.renderLoading()}
                {this.renderError()}
                <table>
                    {caption || null}
                    {header || this.renderHeader()}
                    {body || this.renderBody()}
                    {footer || null}
                </table>
            </Fragment>
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

        return (
            <tbody>
                {this.renderData()}
            </tbody>
        );
    }

    renderRecord(record, i) {

        const {
            columns,
            rowClick,
            rowDoubleClick,
            cellClick
        } = this.props;

        return (
            <tr
                onClick={() => rowClick && rowClick(record, i)}
                onDblClick={() => rowDoubleClick && rowDoubleClick(record, i)}
            >
                {columns.map((c, j) => {

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

    connectedCallback() {

        super.connectedCallback?.();

        this.bindRenderRecord();

        this.initLoader();
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);