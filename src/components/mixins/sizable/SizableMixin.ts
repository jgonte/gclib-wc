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
                passToChildren: true
            }
        };

        getCSSClass() {

            let cssClass;

            if (super.getCSSClass) {

                cssClass = super.getCSSClass();
            }

            const { size } = this.props;

            return {
                ...cssClass,
                [`size-${size}`]: true
            };
        }
    };

export default SizableMixin;