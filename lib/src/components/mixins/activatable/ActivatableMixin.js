import { config } from "../../config";
const ActivatableMixin = Base => { var _a; return _a = class Activatable extends Base {
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/activatable/Activatable.css`
        ]
    },
    _a.properties = {
        /**
         * Whether the element is active
         */
        active: {
            type: Boolean,
            value: false,
            mutable: true,
            reflect: true
        }
    },
    _a; };
export default ActivatableMixin;
