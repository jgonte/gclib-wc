import { h, ElementNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../mixins/data/DataFieldDefinition';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import XListItem from './XListItem';

export class XList extends
    DataCollectionLoadableMixin(
        SelectionContainerMixin(
            SizableMixin(CustomElement)
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/x-list/XList.css`
        ]
    };

    render() {

        return (
            <ul>
                {this.renderLoading()}
                {this.renderError()}
                {this.renderData()}
            </ul>
        );
    }

    wrapRecordVNode(record: any, children: ElementNode | ElementNode[]) {

        const {
            recordId,
            size
        } = this.props;

        return new XListItem({
            parent: this,
            [recordId]: record[recordId],
            size
        }, children);
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

            return this.wrapRecordVNode(record, children);
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

    nodeDidConnect(node: Node) {

        console.log('connected list');
    }

    nodeWillDisconnect(node: Node) {

        console.log('list will disconnect');
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);

