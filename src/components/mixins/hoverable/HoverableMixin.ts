import { config } from "../../config";

const HoverableMixin = Base =>

    class Hoverable extends Base {

        static component = {
    
            styleUrls: [
                `${config.assetsFolder}/mixins/Hoverable/Hoverable.css`
            ]
        };

        static properties = {

            /**
             * Whether the element is hoverable
             */
            hoverable: {
                type: Boolean,
                value: false
            }
        };
    };

export default HoverableMixin;