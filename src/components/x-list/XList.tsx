import { h, ElementNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../mixins/data/DataFieldDefinition';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import PageableMixin from '../mixins/pageable/PageableMixin';
import XListItem from './XListItem';

export class XList extends
    PageableMixin(
        DataCollectionLoadableMixin(
            SelectionContainerMixin(
                SizableMixin(CustomElement)
            )
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/x-list/XList.css`
        ]
    };

    render() {

        return (
            <div card style="background-color: beige; margin: 1rem;">
                <ul style="background-color: lightgreen;">
                    {this.renderHeader()}
                </ul>
                <ul>
                    {this.renderLoading()}
                    {this.renderError()}
                    {this.renderData()}
                </ul>
                <div style="background-color: lightgreen;">
                    {this.renderPager()}
                </div>
            </div>
        );
    }

    wrapRecordVNode(record: any, children: ElementNode | ElementNode[]) {

        const {
            recordId,
            size,
            selectable
        } = this.props;

        return new XListItem({
            parent: this,
            [recordId]: record[recordId],
            size,
            selectable
        }, children);
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

        return (
            <li>
                {children}
            </li>
        );
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
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-x-list`, XList);

