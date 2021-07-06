import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import XListItem from './XListItem';
// import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
// import SizableMixin from '../mixins/sizable/SizableMixin';
// import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
// import DataFieldDefinition from '../mixins/data/DataFieldDefinition';
export class XList extends CustomElement {
    render() {
        return (h("ul", null, this.renderChildren()));
    }
    renderChildren() {
        return [10, 20, 30, 40].map(item => new XListItem({ value: item }, (h("div", { style: { backgroundColor: 'red' } }, item))));
    }
    nodeDidConnect(node) {
        alert('connected list');
    }
    nodeWillDisconnect(node) {
        alert('list will disconnect');
    }
}
XList.component = {
    styleUrls: [
        `${config.assetsFolder}/x-list/XList.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);
