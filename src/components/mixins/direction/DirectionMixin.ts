import { config } from "../../config";

const DirectionMixin = Base =>

    class Direction extends Base {

        static component = {
    
            styleUrls: [
                `${config.assetsFolder}/mixins/direction/Direction.css`
            ]
        };

        static properties = {

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
        };

        getDir() {
            
            return this.dir || document.dir;
        }
    };

export default DirectionMixin;