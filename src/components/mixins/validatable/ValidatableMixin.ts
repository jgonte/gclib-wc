const ValidatableMixin = Base =>

    class Validatable extends Base {

        static properties = {

            validators: {
                type: Array,
                mutable: true,
                value: []
            }
        };

        static state = {

            validationErrors: [],
    
            validationWarnings: []
        }
    };

export default ValidatableMixin;