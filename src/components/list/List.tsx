import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';

export class List extends SelectionContainerMixin(CustomElement) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/list/List.css`
        ]
    };

    render() {

        return (
            <ul>
                <slot />
            </ul>
        );
    }

    // Needed to pass properties to children
    getChildren(nodeChanges) {

        const {
            inserted
        } = nodeChanges;

        if (inserted.length === 0) {

            return {
                hasInsertedChildren: false,
                children: []
            };
        }

        // Get the first inserted item which is the button component
        const list = nodeChanges.inserted[0];

        const slot = list.querySelector('slot');

        if (slot !== null) {

            return {
                hasInsertedChildren: true,
                children: slot.assignedNodes({ flatten: true })
            };
        }

        return {
            hasInsertedChildren: true,
            children: []
        };
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);