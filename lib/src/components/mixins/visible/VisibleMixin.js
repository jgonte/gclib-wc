export const renderWhenVisible = Symbol('renderWhenVisible');
const VisibleMixin = Base => { var _a; return _a = class Visible extends Base {
        render() {
            const { visible } = this.props;
            return visible === true ?
                this[renderWhenVisible]() :
                null;
        }
    },
    _a.properties = {
        /**
         * Whether the element is visible
         */
        visible: {
            type: Boolean,
            value: true,
            mutable: true,
            reflect: true
        }
    },
    _a; };
export default VisibleMixin;
