/**
 * Allows a component to be named
 */
const NamedMixin = Base => { var _a; return _a = class Named extends Base {
    },
    _a.properties = {
        /**
         * The name of the component
         */
        name: {
            type: String
        }
    },
    _a; };
export default NamedMixin;
