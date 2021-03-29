import { ComponentMetadata, ComponentPropertyDescriptor, ComponentStateDescriptor } from "../Interfaces";

function getComponentMetadata(ctor) {

    const metadata: ComponentMetadata = {
        properties: {},
        state: {}
    };

    while (ctor !== undefined) {

        const {
            properties,
            state
        } = ctor;

        // Merge the property descriptors
        metadata.properties = {
            ...metadata.properties,
            ...properties
        };

        // Merge the state descriptor
        metadata.state = {
            ...metadata.state,
            ...state
        };

        ctor = Object.getPrototypeOf(ctor.prototype)?.constructor;
    }

    return metadata;
}

/**
 * Mixin that initializes the properties for the component
 * @param Base 
 * @returns 
 */
const ComponentMetadataInitializerMixin = Base =>

    class ComponentMetadataInitializer extends Base {

        /** The merged properties from the ones declared in the component and the mixins */
        static metadata: ComponentMetadata = undefined;

        constructor(props?: Record<string, any>, children?) {

            super(props, children);

            if ((this.constructor as any).metadata === undefined) {

                (this.constructor as any).metadata = getComponentMetadata(this.constructor);
            }

            const {
                properties,
                state
            } = (this.constructor as any).metadata;

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

        initializeProperty(name: string, propertyDescriptor: ComponentPropertyDescriptor) {

            const {
                attribute,     //  The name of the JSX attribute mapped to the property       
                value, // The default value of the property if no attribute is set in the JSX
                mutable,
                //options
            } = propertyDescriptor;

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

                const setter = function (newValue: any, callback: Function) {

                    const oldValue = this.props[name];

                    if (oldValue === newValue) {

                        return;
                    }

                    //TODO: Research if this validation is necessary for components
                    //this.validatePropertyOptions(name, newValue, options);

                    // console.log(`Property: '${name}' of component: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

                    this.props[name] = newValue;

                    this.requestUpdate();

                    callback?.();
                };

                var setterName = this.getSetterName(name);

                this[setterName] = setter.bind(this);
            }
        }

        initializeState(name: string, stateDescriptor: ComponentStateDescriptor) {

            const {
                value
            } = stateDescriptor;

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
    };

export default ComponentMetadataInitializerMixin;