export const renderWhenVisible = Symbol('renderWhenVisible');

const VisibleMixin = Base =>

    class Visible extends Base {

        static properties = {

            /** 
             * Whether the element is shown
             */
            visible: {
                type: Boolean,
                value: true,
                mutable: true,
                reflect: true
            }
        };

        render() {

            const {
                visible
            } = this.props;
    
            return visible === true ? this[renderWhenVisible as any]() : null;
        }
    };

export default VisibleMixin;