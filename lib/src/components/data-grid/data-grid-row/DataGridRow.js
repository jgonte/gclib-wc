import { h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
export default class DataGridRow extends SelectableMixin(ChildMixin(CustomElement)) {
    render() {
        const { size, selected } = this.props;
        return (h("div", { class: "hoverable", size: size, selected: selected },
            h("slot", null)));
    }
}
DataGridRow.component = {
    styleUrls: [
        `${config.assetsFolder}/data-grid/data-grid-row/DataGridRow.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-grid-row`, Grid);
