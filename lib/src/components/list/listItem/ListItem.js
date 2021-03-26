import CustomElement from '../../../core/customElement/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import ChildMixin from '../../../core/mixins/ChildMixin';
export class ListItem extends SelectableMixin(SizableMixin(ChildMixin(CustomElement))) {
    render() {
        const { size } = this.props;
        return (h("li", { size: size },
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
