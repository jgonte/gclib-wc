const DirectionMixin = Base => { var _a; return _a = class Direction extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const isRtl = this.dir === 'rtl' || document.dir === 'rtl';
            return Object.assign(Object.assign({}, cssClass), { 'rtl': this.props.flipRtl && isRtl });
        }
    },
    _a.properties = {
        flipRtl: {
            attribute: 'flip-rtl',
            type: Boolean,
            value: true,
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };
export default DirectionMixin;
