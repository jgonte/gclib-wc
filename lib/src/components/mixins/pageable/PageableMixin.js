import { h } from "gclib-vdom";
/**
 * Allows a component to be pageable
 */
const PageableMixin = Base => { var _a; return _a = class Pageable extends Base {
        renderPager() {
            const { pageable, size } = this.props;
            if (pageable !== true) {
                return null;
            }
            return (h("gcl-pager", { "target-view": this, size: size, "total-pages": "5" }));
        }
    },
    _a.properties = {
        /**
         * Whether the element is pageable
         */
        pageable: {
            type: Boolean,
            value: true
        }
    },
    _a; };
export default PageableMixin;
