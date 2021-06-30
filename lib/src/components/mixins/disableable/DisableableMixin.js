// import { config } from "../../config";
const DisableableMixin = Base => { var _a; return _a = class Disableable extends Base {
    },
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/mixins/Disableable/Disableable.css`
    //     ]
    // };
    _a.properties = {
        /**
         * Whether the element is disabled
         */
        disabled: {
            type: Boolean,
            value: false
        }
    },
    _a; };
export default DisableableMixin;
