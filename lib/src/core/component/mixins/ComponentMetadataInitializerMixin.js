function getComponentMetadata(ctor) {
    var _a;
    const metadata = {
        properties: {},
        state: {}
    };
    while (ctor !== undefined) {
        const { properties, state } = ctor;
        // Merge the property descriptors
        metadata.properties = Object.assign(Object.assign({}, metadata.properties), properties);
        // Merge the state descriptor
        metadata.state = Object.assign(Object.assign({}, metadata.state), state);
        ctor = (_a = Object.getPrototypeOf(ctor.prototype)) === null || _a === void 0 ? void 0 : _a.constructor;
    }
    return metadata;
}
/**
 * Mixin that initializes the properties for the component
 * @param Base
 * @returns
 */
const ComponentMetadataInitializerMixin = Base => { var _a; return _a = class ComponentMetadataInitializer extends Base {
        constructor(props, children) {
            super(props, children);
            if (this.constructor.metadata === undefined) {
                this.constructor.metadata = getComponentMetadata(this.constructor);
            }
            const { properties, state } = this.constructor.metadata;
            // Properties
            this.props = props || {};
            for (var name in properties) {
                if (properties.hasOwnProperty(name)) {
                    this.initializeProperty(name, properties[name]);
                }
            }
            // State
            this.state = {};
            for (var name in state) {
                if (state.hasOwnProperty(name)) {
                    this.initializeState(name, state[name]);
                }
            }
        }
        initializeProperty(name, propertyDescriptor) {
            const { attribute, //  The name of the JSX attribute mapped to the property       
            value, // The default value of the property if no attribute is set in the JSX
            mutable, } = propertyDescriptor;
            if (this.props[name] === undefined) { // Property is not initialized
                if (attribute !== undefined && attribute !== name) {
                    const val = this.props[attribute]; // See if that attribute has a value set
                    if (val !== undefined) {
                        this.props[name] = val;
                        delete this.props[attribute];
                    }
                }
                if (this.props[name] === undefined && // The value was not set from the attribute
                    value !== undefined) { // It has a default value
                    this.props[name] = value;
                }
            }
            if (mutable === true) { // Generate a setter
                const setter = function (newValue, callback) {
                    const oldValue = this.props[name];
                    if (oldValue === newValue) {
                        return;
                    }
                    //TODO: Research if this validation is necessary for components
                    //this.validatePropertyOptions(name, newValue, options);
                    // console.log(`Property: '${name}' of component: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                    this.props[name] = newValue;
                    this.requestUpdate();
                    callback === null || callback === void 0 ? void 0 : callback();
                };
                var setterName = this.getSetterName(name);
                this[setterName] = setter.bind(this);
            }
        }
        initializeState(name, stateDescriptor) {
            const { value } = stateDescriptor;
            if (value !== undefined) { // Initialize the state to the default value if any
                this.state[name] = value;
            }
            const setter = function (newValue) {
                const oldValue = this.state[name];
                if (oldValue === newValue) {
                    return;
                }
                // console.log(`State: '${name}' of component: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                this.state[name] = newValue;
                this.requestUpdate();
            };
            var setterName = this.getSetterName(name);
            this[setterName] = setter.bind(this);
        }
        getSetterName(name) {
            return `set${name[0].toUpperCase()}${name.substring(1)}`;
        }
    },
    /** The merged properties from the ones declared in the component and the mixins */
    _a.metadata = undefined,
    _a; };
export default ComponentMetadataInitializerMixin;
