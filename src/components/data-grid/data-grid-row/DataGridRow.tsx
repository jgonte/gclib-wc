import { h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';

export default class DataGridRow extends
    SelectableMixin(
        ChildMixin(CustomElement)
    ) {

        static component = {

            styleUrls: [
                `${config.assetsFolder}/data-grid/data-grid-row/DataGridRow.css`
            ]
        };

    render() {

        const {
            size,
            selected
        } = this.props;

        return (
            <div class="hoverable" size={size} selected={selected}>
                <slot />
            </div>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-data-grid-row`, Grid);
