import { config } from "../../config";

const VariantMixin = Base =>

    class Variant extends Base {

        static component = {
            styleUrls: [
                `${config.assetsFolder}/mixins/variant/Variant.css`
            ]
        };

        static properties = {
            variant: {
                type: String,
                value: 'default',
                mutable: true,
                reflect: true,
                passToChildren: true
            }
        };
    };

export default VariantMixin;