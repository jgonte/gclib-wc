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

        getCSSClass() {

            let cssClass;

            if (super.getCSSClass) {

                cssClass = super.getCSSClass();
            }

            const { variant } = this.props;

            return {
                ...cssClass,
                [variant]: true
            };
        }
    };

export default VariantMixin;