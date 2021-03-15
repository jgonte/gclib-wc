import { config } from "../../config";

const SizableMixin = Base =>

    class Sizable extends Base {

        static component = {

            styleUrls: [
                `${config.assetsFolder}/mixins/sizable/Sizable.css`
            ]
        };
        
        static properties = {

            size: {
                type: String,
                value: 'medium',
                mutable: true,
                reflect: true,
                passToChildren: true,
                options: ['large', 'medium', 'small']
            }
        };
    };

export default SizableMixin;