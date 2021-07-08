
import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
import DataFieldDefinition from '../mixins/data/DataFieldDefinition';

export class List extends
    SelectionContainerMixin(
        SizableMixin(
            DataCollectionLoadableMixin(
                CustomElement
            )
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/list/List.css`
        ]
    };

    render() {

        return (
            <Fragment>
                {this.renderLoading()}
                {this.renderError()}
                <ul>
                    {this.renderHeader()}
                    {this.renderData()}
                </ul>
            </Fragment>
        );
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
            <gcl-list-item selectable="false">
                {children}
            </gcl-list-item>
        );
    }

    renderFields(fields: DataFieldDefinition[], data: []) {

        const {
            recordId
        } = this.props;

        return data.map(record => {

            const value = record[recordId];

            const children = fields.map(f => {

                return (
                    <span class="list-cell" style={{
                        width: f.width || '100px'
                    }}>{record[f.name]}
                    </span>
                );
            });

            return (
                <gcl-list-item value={value}>
                    {children}
                </gcl-list-item>
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
customElements.define(`${config.tagPrefix}-list`, List);