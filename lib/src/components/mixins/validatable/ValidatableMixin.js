const ValidatableMixin = Base => { var _a; return _a = class Validatable extends Base {
    },
    _a.properties = {
        validators: {
            type: Array,
            mutable: true,
            value: []
        }
    },
    _a.state = {
        errors: [],
        warnings: []
    },
    _a; };
export default ValidatableMixin;
