import { config } from "../../config";
const HoverableMixin = Base => { var _a; return _a = class Hoverable extends Base {
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/Hoverable/Hoverable.css`
        ]
    },
    _a.properties = {
        /**
         * Whether the element is hoverable
         */
        hoverable: {
            type: Boolean,
            value: true
        }
    },
    _a; };
export default HoverableMixin;
