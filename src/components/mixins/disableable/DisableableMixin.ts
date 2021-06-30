// import { config } from "../../config";

const DisableableMixin = Base =>

    class Disableable extends Base {

        // static component = {
    
        //     styleUrls: [
        //         `${config.assetsFolder}/mixins/Disableable/Disableable.css`
        //     ]
        // };

        static properties = {

            /**
             * Whether the element is disabled
             */
            disabled: {
                type: Boolean,
                value: false
            }
        };
    };

export default DisableableMixin;