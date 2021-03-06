import { config } from "../../config";
const SizableMixin = Base => { var _a; return _a = class Sizable extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const { size } = this.props;
            return Object.assign(Object.assign({}, cssClass), { [`size-${size}`]: true });
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/sizable/Sizable.css`
        ]
    },
    _a.properties = {
        size: {
            type: String,
            value: 'medium',
            mutable: true,
            reflect: true,
            passToChildren: true,
            options: ['large', 'medium', 'small']
        }
    },
    _a; };
export default SizableMixin;
