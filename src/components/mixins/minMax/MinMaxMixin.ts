const MinMaxMixin = Base =>

    class MinMax extends Base {

        static properties = {

            min: {
                type: String
            },

            max: {
                type: String
            }
        };

    };

export default MinMaxMixin;