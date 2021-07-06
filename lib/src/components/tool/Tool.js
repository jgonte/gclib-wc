import { h } from 'gclib-vdom';
//import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VariantMixin from '../mixins/variant/VariantMixin';
//@ts-ignore
export class Tool extends SizableMixin(VariantMixin(CustomElement)) {
    render() {
        const { variant, size } = this.props;
        const { iconName, click } = this;
        const icon = typeof iconName === 'function' ?
            iconName() :
            iconName;
        return (h("gcl-button", { variant: variant, size: size, click: click },
            h("gcl-icon", { name: icon })));
    }
}
