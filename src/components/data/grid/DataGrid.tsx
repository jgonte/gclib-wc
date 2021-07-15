import { h, ElementNode } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import { config } from '../../config';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../../mixins/data/DataFieldDefinition';
import SelectionContainerMixin from '../../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../../mixins/pageable/PageableMixin';

//@ts-ignore
export class DataGrid extends
    PageableMixin(
        DataCollectionLoadableMixin(
            SelectionContainerMixin(
                SizableMixin(CustomElement)
            )
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/data/grid/DataGrid.css`
        ]
    };

    static properties = {

        /**
         * The record to render the row from
         */
        rowIsHoverable: {
            attribute: 'row-is-hoverable',
            type: Boolean,
            value: true
        }
    };

    render() {

        return (
            <div card style="background-color: beige; margin: 1rem;">

                <div>
                    {this.renderLoading()}
                    {this.renderError()}
                </div>

                <div style="background-color: lightgreen;">
                    {this.renderHeader()}
                </div>

                <div class="body">
                    {this.renderData()}
                </div>

                <div style="background-color: lightgreen;">
                    {this.renderPager()}
                </div>

            </div>
        );
    }

    wrapRecord(record: any, index: number, children: ElementNode | ElementNode[]) {

        const {
            rowIsHoverable,
            recordId,
            size,
            selectable
        } = this.props;

        const value = record[recordId];

        return (
            <gcl-selectable-row
                hoverable={rowIsHoverable}
                children={children}
                size={size}
                selectable={selectable}
                selectable-value={value}
                key={value || index}
                index={index}
            >
            </gcl-selectable-row>
        );
    }

    renderHeader() {

        const {
            fields
        } = this.props;

        if (fields === undefined) {

            return null;
        }

        const fds = typeof fields === 'function' ? fields() : fields;

        const children = fds.map(f => {

            const sorter = f.sortable !== false ?
                (
                    <gcl-sorter-tool field={f.name}></gcl-sorter-tool>
                ) :
                null;

            return (
                <span style={{
                    width: f.width || '100px'
                }}>
                    {f.display}
                    {sorter}
                </span>
            );
        });

        return (
            <gcl-row>{children}</gcl-row>
        );
    }

    renderFields(fields: DataFieldDefinition[], data: []) {

        const {
            recordId,
            rowIsHoverable,
            size,
            selectable,
        } = this.props;
        return data.map((record, index) => {

            const value = record[recordId];

            return (
                <gcl-data-row
                    hoverable={rowIsHoverable}
                    size={size}
                    selectable={selectable}
                    record={record}
                    selectable-value={value}
                    key={value || index}
                    index={index}
                    fields={fields}
                >
                </gcl-data-row>
            );
        });
    }

    /**
     * When there is no data provided to the component, render its children
     */
    renderNoData() {

        return (
            <ul>
                <slot />
            </ul>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-data-grid`, DataGrid);

