import { h } from "gclib-vdom";

/**
 * Allows a component to be pageable
 */
const PageableMixin = Base =>

    class Pageable extends Base {

        static properties = {

            /**
             * Whether the element is pageable
             */
            pageable: {
                type: Boolean,
                value: true
            }
        };

        renderPager() {

            const {
                pageable
            } = this.props;

            if (pageable !== true) {

                return null;
            }

            return (
                <gcl-pager target-view={this} total-pages="5"></gcl-pager>
            );
        }
    };

export default PageableMixin;