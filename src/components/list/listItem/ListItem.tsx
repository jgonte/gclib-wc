import CustomElement from '../../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../../config';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';

export class ListItem extends SelectableMixin(CustomElement) {

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

    // Needed to pass properties to children
    getChildren(nodeChanges) {

        // Get the first inserted item which is the button component
        const listItem = nodeChanges.inserted[0];

        if (listItem !== undefined) { // It might be other changes such as attribute change

            const slot = listItem.querySelector('slot');

            if (slot !== null) {

                return slot.assignedNodes({ flatten: true });
            }
        }

        return [];
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-list-item`, ListItem);