import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
export class List extends SelectionContainerMixin(SizableMixin(DataCollectionLoadableMixin(CustomElement))) {
    render() {
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            h("ul", null, this.renderHeader()),
            h("ul", null, this.renderData())));
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
        return (h("gcl-list-item", { selectable: "false" }, children));
    }
    renderFields(fields, data) {
        const { recordId } = this.props;
        return data.map(record => {
            const value = record[recordId];
            const children = fields.map(f => {
                return (h("span", { class: "list-cell", style: {
                        width: f.width || '100px'
                    } }, record[f.name]));
            });
            return (h("gcl-list-item", { value: value }, children));
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
List.component = {
    styleUrls: [
        `${config.assetsFolder}/list/List.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);
