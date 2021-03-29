import CustomElement from '../../core/customElement/CustomElement';
import { Fragment, h } from 'gclib-vdom';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataLoadableMixin from '../mixins/data/DataLoadableMixin';

export class List extends
    SelectionContainerMixin(
        SizableMixin(
            DataLoadableMixin(
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
                    {this.renderData()}
                </ul>
            </Fragment>
        );
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

    connectedCallback() {

        super.connectedCallback();

        this.bindRenderRecord();

        this.initLoader();
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);