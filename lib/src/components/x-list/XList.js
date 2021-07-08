import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import XListItem from './XListItem';
export class XList extends DataCollectionLoadableMixin(SelectionContainerMixin(SizableMixin(CustomElement))) {
    render() {
        return (h("ul", null,
            this.renderLoading(),
            this.renderError(),
            this.renderData()));
    }
    wrapRecordVNode(record, children) {
        const { recordId, size } = this.props;
        return new XListItem({
            parent: this,
            [recordId]: record[recordId],
            size
        }, children);
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
    nodeDidConnect(node) {
        console.log('connected list');
    }
    nodeWillDisconnect(node) {
        console.log('list will disconnect');
    }
}
XList.component = {
    styleUrls: [
        `${config.assetsFolder}/x-list/XList.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);
