import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../mixins/pageable/PageableMixin';
import XListItem from './XListItem';
export class XList extends PageableMixin(DataCollectionLoadableMixin(SelectionContainerMixin(SizableMixin(CustomElement)))) {
    render() {
        return (h("div", { card: true, style: "background-color: beige; margin: 1rem;" },
            h("ul", { style: "background-color: lightgreen;" }, this.renderHeader()),
            h("ul", null,
                this.renderLoading(),
                this.renderError(),
                this.renderData()),
            h("div", { style: "background-color: lightgreen;" }, this.renderPager())));
    }
    wrapRecordVNode(record, children) {
        const { recordId, size, selectable } = this.props;
        return new XListItem({
            parent: this,
            [recordId]: record[recordId],
            size,
            selectable
        }, children);
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
        return (h("li", null, children));
    }
    renderFields(fields, data) {
        return data.map(record => {
            const children = fields.map(f => {
                return (h("span", { class: "list-cell", style: {
                        width: f.width || '100px'
                    } }, record[f.name]));
            });
            return this.wrapRecordVNode(record, children);
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
XList.component = {
    styleUrls: [
        `${config.assetsFolder}/x-list/XList.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);
