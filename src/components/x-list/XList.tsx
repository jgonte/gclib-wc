import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import XListItem from './XListItem';
// import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
// import SizableMixin from '../mixins/sizable/SizableMixin';
// import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
// import DataFieldDefinition from '../mixins/data/DataFieldDefinition';

export class XList extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/x-list/XList.css`
        ]
    };

    render() {

        return (
            <ul>
                {this.renderChildren()}
            </ul>
        );
    }

    renderChildren() {

        return [10, 20, 30, 40].map(item =>
            new XListItem(
                { value: item },
                (<div style={{ backgroundColor: 'red' }}>{item}</div>)
            )
        );
    }

    nodeDidConnect(node: Node) {

        alert('connected list');
    }

    nodeWillDisconnect(node: Node) {

        alert('list will disconnect');
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);

