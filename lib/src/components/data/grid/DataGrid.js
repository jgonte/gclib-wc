import { h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import { config } from '../../config';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../../mixins/data/DataCollectionLoadableMixin';
import SelectionContainerMixin from '../../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../../mixins/pageable/PageableMixin';
import SelectionHandlerMixin from '../../mixins/selection/SelectionHandlerMixin';
//@ts-ignore
export class DataGrid extends PageableMixin(DataCollectionLoadableMixin(SelectionContainerMixin(SelectionHandlerMixin(SizableMixin(CustomElement))))) {
    onChildAdded(child) {
        var _a;
        (_a = super.onChildAdded) === null || _a === void 0 ? void 0 : _a.call(this, child);
        const { selectedIndex } = this.props;
        if (selectedIndex === child.props.index) {
            child.select();
        }
    }
    render() {
        return (h("div", { card: true, style: "background-color: white;" },
            h("div", null,
                this.renderLoading(),
                this.renderError()),
            this.renderHeader(),
            h("div", { class: "body" }, this.renderData()),
            h("div", { style: "background-color: var(--gcl-header-background-color);" }, this.renderPager())));
    }
    wrapRecord(record, index, children) {
        const { rowIsHoverable, recordId, size, selectable } = this.props;
        const value = record[recordId];
        return (h("gcl-selectable-row", { style: { width: '100%' }, hoverable: rowIsHoverable, children: children, size: size, selectable: selectable, "selectable-value": value, key: value || index, index: index }));
    }
    renderHeader() {
        const { fields, size } = this.props;
        if (fields === undefined) {
            return null;
        }
        const fds = typeof fields === 'function' ? fields() : fields;
        const children = fds.map(f => {
            const sorter = f.sortable !== false ?
                (h("gcl-sorter-tool", { field: f.name, size: size })) :
                null;
            return (h("span", { style: {
                    width: f.width || '100px'
                } },
                f.display,
                sorter));
        });
        return (h("gcl-row", { id: "data-grid-header", style: "background-color: var(--gcl-header-background-color);" }, children));
    }
    renderFields(fields, data) {
        const { recordId, rowIsHoverable, size, selectable, } = this.props;
        return data.map((record, index) => {
            const value = record[recordId];
            return (h("gcl-data-row", { hoverable: rowIsHoverable, size: size, selectable: selectable, record: record, "selectable-value": value, key: value || index, index: index, fields: fields }));
        });
    }
    /**
     * When there is no data provided to the component, render its children
     */
    renderNoData() {
        return (h("ul", null,
            h("slot", null)));
    }
}
DataGrid.component = {
    styleUrls: [
        `${config.assetsFolder}/data/grid/DataGrid.css`
    ]
};
DataGrid.properties = {
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
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-grid`, DataGrid);
