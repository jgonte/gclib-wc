import { Fragment, h } from 'gclib-vdom';
import { config } from '../../config';
import CustomElement from '../../../core/customElement/CustomElement';
import SizableMixin from '../../mixins/sizable/SizableMixin';
import VariantMixin from '../../mixins/variant/VariantMixin';
//@ts-ignore
export class CloseTool extends SizableMixin(VariantMixin(CustomElement)) {
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        const { close } = this.props;
        this.addEventListener('click', close);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        const { close } = this.props;
        this.removeEventListener('click', close);
    }
    render() {
        const { variant, size } = this.props;
        return (h(Fragment, { variant: variant, size: size }, "\u00D7"));
    }
}
CloseTool.component = {
    styleUrls: [
        `${config.assetsFolder}/tool/closeTool/CloseTool.css`
    ]
};
CloseTool.properties = {
    /**
     * What action to execute when the tool has been closed
     */
    close: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-close-tool`, CloseTool);
