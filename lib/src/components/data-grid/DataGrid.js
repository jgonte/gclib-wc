import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../mixins/pageable/PageableMixin';
export class Grid extends PageableMixin(DataCollectionLoadableMixin(SelectionContainerMixin(SizableMixin(CustomElement)))) {
    render() {
        return (h("div", { card: true, style: "background-color: beige; margin: 1rem;" },
            h("div", { style: "background-color: lightgreen;" }, this.renderHeader()),
            h("div", null,
                this.renderLoading(),
                this.renderError(),
                this.renderData()),
            h("div", { style: "background-color: lightgreen;" }, this.renderPager())));
    }
    wrapRecord(record, index, children) {
        const { recordId, size, selectable } = this.props;
        return (h("gcl-grid-row", { size: size, selectable: selectable, "record-id": record[recordId] }, children));
        // return new GridItem({
        //     parent: this,
        //     [recordId]: ,
        //     size,
        //     selectable
        // }, children);
    }
    renderHeader() {
        const { fields } = this.props;
        if (fields === undefined) {
            return null;
        }
        const fds = typeof fields === 'function' ? fields() : fields;
        const children = fds.map(f => {
            const sorter = f.sortable !== false ?
                (h("gcl-sorter-tool", { field: f.name })) :
                null;
            return (h("span", { class: "list-cell", style: {
                    width: f.width || '100px'
                } },
                f.display,
                sorter));
        });
        return children;
    }
    renderFields(fields, data) {
        return data.map(record => {
            const children = fields.map(f => {
                return (h("span", { class: "list-cell", style: {
                        width: f.width || '100px'
                    } }, record[f.name]));
            });
            return this.wrapRecord(record, 0, children);
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
Grid.component = {
    styleUrls: [
        `${config.assetsFolder}/x-list/Grid.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-grid`, Grid);
