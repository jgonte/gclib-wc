import CustomElement from '../../core/CustomElement';
import { h } from 'gclib-vdom';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import AsyncDataLoadableMixin from '../mixins/data/AsyncDataLoadableMixin';
import { renderNoData } from '../mixins/data/DataLoadableMixin';

export class List extends
    SelectionContainerMixin(
        SizableMixin(
            AsyncDataLoadableMixin(
                CustomElement
            )
        )
    ) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/list/List.css`
        ]
    };

    /**
     * When there is no data provided to the component, render its children
     */
    [renderNoData]() {

        return (
            <ul>
                <slot />
            </ul>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);