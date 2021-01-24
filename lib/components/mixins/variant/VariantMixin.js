import { config } from "../../config";
const VariantMixin = Base => { var _a; return _a = class Variant extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const { variant } = this.props;
            return Object.assign(Object.assign({}, cssClass), { [variant]: true });
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/variant/Variant.css`
        ]
    },
    _a.properties = {
        variant: {
            type: String,
            value: 'default',
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };
export default VariantMixin;
