const DirectionMixin = Base =>

    class Direction extends Base {

        static properties = {
            flipRtl: {
                attribute: 'flip-rtl',
                type: Boolean,
                value: true,
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

            const isRtl = this.dir === 'rtl' || document.dir === 'rtl';

            return {
                ...cssClass,
                'rtl': this.props.flipRtl && isRtl
            };
        }
    };

export default DirectionMixin;