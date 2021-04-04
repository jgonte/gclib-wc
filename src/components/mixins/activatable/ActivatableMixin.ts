import { config } from "../../config";

const ActivatableMixin = Base =>

    class Activatable extends Base {

        static component = {
    
            styleUrls: [
                `${config.assetsFolder}/mixins/activatable/Activatable.css`
            ]
        };

        static properties = {

            /**
             * Whether the element is active
             */
            active: {
                type: Boolean,
                value: false,
                mutable: true,
                reflect: true
            }
        };
    };

export default ActivatableMixin;