import { config } from "../../config";
const DirectionMixin = Base => { var _a; return _a = class Direction extends Base {
        getDir() {
            return this.dir || document.dir;
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/direction/Direction.css`
        ]
    },
    _a.properties = {
        /**
         * The direction of the element
         */
        flipRtl: {
            attribute: 'flip-rtl',
            type: Boolean,
            value: true,
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };
export default DirectionMixin;
