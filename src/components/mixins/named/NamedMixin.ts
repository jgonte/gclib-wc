/**
 * Allows a component to be named
 */
const NamedMixin = Base =>

    class Named extends Base {

        static properties = {

            /**
             * The name of the component
             */
            name: {
                type: String
            }
        };
    };

export default NamedMixin;
