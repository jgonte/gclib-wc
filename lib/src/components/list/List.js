import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
export class List extends SelectionContainerMixin(SizableMixin(CustomElement)) {
    render() {
        return (h("ul", null,
            h("slot", null)));
    }
}
List.component = {
    styleUrls: [
        `${config.assetsFolder}/list/List.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);
