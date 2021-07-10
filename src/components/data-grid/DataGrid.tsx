import { h, ElementNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../mixins/data/DataFieldDefinition';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../mixins/pageable/PageableMixin';

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
            `${config.assetsFolder}/data-grid/DataGrid.css`
        ]
    };

    render() {

        return (
            <div card style="background-color: beige; margin: 1rem;">
                <div style="background-color: lightgreen;">
                    {this.renderHeader()}
                </div>
                <div>
                    {this.renderLoading()}
                    {this.renderError()}
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
            recordId,
            size,
            selectable
        } = this.props;

        return (
            <gcl-grid-row
                size={size}
                selectable={selectable}
                record-id={record[recordId]}
            >
                {children}
            </gcl-grid-row>
        );

        // return new GridItem({
        //     parent: this,
        //     [recordId]: ,
        //     size,
        //     selectable
        // }, children);
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
                <span class="list-cell" style={{
                    width: f.width || '100px'
                }}>
                    {f.display}
                    {sorter}
                </span>
            );
        });

        return children;
    }

    renderFields(fields: DataFieldDefinition[], data: []) {

        return data.map(record => {

            const children = fields.map(f => {

                return (
                    <span class="list-cell" style={{
                        width: f.width || '100px'
                    }}>
                        {record[f.name]}
                    </span>
                );
            });

            return this.wrapRecord(record, 0, children);
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

