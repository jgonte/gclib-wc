import { Fragment, h } from "gclib-vdom";
import { config } from "../../components/config";
import CustomElement from "../../core/CustomElement";
import VariantMixin from "../mixins/variant/VariantMixin";
import SizableMixin from "../mixins/sizable/SizableMixin";
import DirectionMixin from "../mixins/direction/DirectionMixin";
const { assetsFolder } = config;
//The path to the icons svg file
const _iconsPath = `${assetsFolder}/icon/assets/bootstrap-icons.svg`;
//@ts-ignore
export class Icon extends SizableMixin(VariantMixin(DirectionMixin(CustomElement))) {
    render() {
        const { name } = this.props;
        return (h(Fragment, { class: this.getCSSClass() },
            h("svg", { role: "img" },
                h("use", { href: `${_iconsPath}#${name}` }))));
    }
}
Icon.component = {
    styleUrls: [
        `${assetsFolder}/icon/Icon.css`,
        `${assetsFolder}/mixins/direction/Direction-Icon.css`
    ]
};
Icon.properties = {
    name: {
        type: String,
        value: ''
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);
