const SizableMixin = Base =>

    class Sizable extends Base {

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