import { h } from 'gclib-vdom';
import { config } from '../../components/config';
import CustomElement from '../../core/customElement/CustomElement';
import VariantMixin from '../mixins/variant/VariantMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
const { assetsFolder } = config;
//The path to the icons svg file
const _iconsPath = `${assetsFolder}/icon/assets/bootstrap-icons.svg`;
//@ts-ignore
export class Icon extends SizableMixin(VariantMixin(DirectionMixin(CustomElement))) {
    render() {
        const { name, size, variant } = this.props;
        return (h("svg", { role: "img", size: size, variant: variant, dir: this.getDir() },
            h("use", { href: `${_iconsPath}#${name}` })));
    }
}
Icon.component = {
    styleUrls: [
        `${assetsFolder}/icon/Icon.css`
    ]
};
Icon.properties = {
    /**
     * The name of the icon
     */
    name: {
        type: String,
        value: '',
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);
