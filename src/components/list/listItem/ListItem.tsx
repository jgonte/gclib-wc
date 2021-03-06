import CustomElement from '../../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import ChildMixin from '../../../core/mixins/ChildMixin';

export class ListItem extends
    SelectableMixin(
        SizableMixin(
            ChildMixin(
                CustomElement
            )
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/list/listItem/ListItem.css`
        ]
    };

    render() {

        return (
            <li class={this.getCSSClass()}>
                <slot />
            </li>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-list-item`, ListItem);