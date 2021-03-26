import CustomElement from '../../core/customElement/CustomElement';
import { Fragment, h } from 'gclib-vdom';
import { config } from '../config';
import SelectionContainerMixin from '../mixins/selectionContainer/SelectionContainerMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataLoadableMixin from '../mixins/data/DataLoadableMixin';
export class List extends SelectionContainerMixin(SizableMixin(DataLoadableMixin(CustomElement))) {
    render() {
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            h("ul", null, this.renderData())));
    }
    /**
     * When there is no data provided to the component, render its children
     */
    renderNoData() {
        return (h("ul", null,
            h("slot", null)));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.bindRenderRecord();
        this.initLoader();
    }
}
List.component = {
    styleUrls: [
        `${config.assetsFolder}/list/List.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);
