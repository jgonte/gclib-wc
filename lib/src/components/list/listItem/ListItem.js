import CustomElement from '../../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import SizableMixin from '../../mixins/sizable/SizableMixin';
export class ListItem extends SelectableMixin(SizableMixin(CustomElement)) {
    render() {
        return (h("li", { class: this.getCSSClass() },
            h("slot", null)));
    }
}
ListItem.component = {
    styleUrls: [
        `${config.assetsFolder}/list/listItem/ListItem.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list-item`, ListItem);
