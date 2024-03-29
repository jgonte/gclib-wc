import { h, ElementNode } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import { config } from '../../config';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../../mixins/data/DataFieldDefinition';
import SelectionContainerMixin from '../../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../../mixins/pageable/PageableMixin';
import SelectionHandlerMixin from '../../mixins/selection/SelectionHandlerMixin';

//@ts-ignore
export class DataGrid extends
    PageableMixin(
        DataCollectionLoadableMixin(
            SelectionContainerMixin(
                SelectionHandlerMixin(
                    SizableMixin(CustomElement)
                )
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
         * Whether the row highlights on hover
         */
        rowIsHoverable: {
            attribute: 'row-is-hoverable',
            type: Boolean,
            value: true
        },

        /**
         * Any index initially selected
         */
        selectedIndex: {
            attribute: 'selected-index',
            type: Number
        }
    };

    onChildAdded(child: HTMLElement) {

        super.onChildAdded?.(child);

        const {
            selectedIndex
        } = this.props;

        if (selectedIndex === (child as any).props.index) {

            (child as any).select();
        }
    }

    render() {

        return (
            <div card style="background-color: white;">

                <div>
                    {this.renderLoading()}
                    {this.renderError()}
                </div>

                {this.renderHeader()}

                <div class="body">
                    {this.renderData()}
                </div>

                <div style="background-color: var(--gcl-header-background-color);">
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
                style={{ width: '100%' }}
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
            fields,
            size
        } = this.props;

        if (fields === undefined) {

            return null;
        }

        const fds = typeof fields === 'function' ? fields() : fields;

        const children = fds.map(f => {

            const sorter = f.sortable !== false ?
                (
                    <gcl-sorter-tool
                        field={f.name}
                        size={size}
                    >
                    </gcl-sorter-tool>
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
            <gcl-row id="data-grid-header"
                style="background-color: var(--gcl-header-background-color);">
                {children}
            </gcl-row>
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

