import defaultPropertyValueConverter from "../helpers/defaultPropertyValueConverter";
import getComponentMetadata from "../helpers/getComponentMetadata";
import { CustomPropertyDescriptor, MetadataInitializerConstructor } from "../Interfaces";

const MetadataInitializerMixin = Base =>

    class MetadataInitializer extends Base {

        constructor() {

            super();

            this.initialize();
        }

        initialize() {

            const {
                componentMetadata
            } = this.constructor as unknown as MetadataInitializerConstructor;

            const {
                properties,
                state
            } = componentMetadata;

            // Properties
            this.props = {};

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

        initializeProperty(name, propertyDescriptor: CustomPropertyDescriptor) {

            const {
                attribute, // The name of the HTML attribute mapped to the property
                type, // The type of the property
                value, // The default value of the property if no HTML attribute is provided
                mutable, // Whether the value of the property can be changed
                reflect, // Whether to reflect the change of the property in its mapped HTML attribute,
                options // The range to restrict the values
            } = propertyDescriptor;

            if (value !== undefined) { // Initialize the property to the default value if any

                this.props[name] = value;
            }

            if (mutable === true) { // Generate a setter

                const setter = function (newValue) {

                    const oldValue = this.props[name];

                    if (oldValue === newValue) {

                        return;
                    }

                    this.validatePropertyOptions(name, newValue, options);

                    console.log(`Property: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

                    if (reflect) { // This will trigger the attributeChangedCallback

                        this.setAttribute(attribute, defaultPropertyValueConverter.toAttribute(newValue, type));
                    }
                    else {

                        this.setProperty(name, newValue);
                    }
                };

                var setterName = this.getSetterName(name);

                this[setterName] = setter.bind(this);
            }
        }

        initializeState(name, stateDescriptor) {

            const {
                value // The default value of the state if no HTML attribute is provided
            } = stateDescriptor;

            if (value !== undefined) { // Initialize the state to the default value if any

                this.state[name] = value;
            }

            const setter = function (newValue) {

                const oldValue = this.state[name];

                if (oldValue === newValue) {

                    return;
                }

                console.log(`State: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

                this.state[name] = newValue;

                this.requestUpdate();
            };

            var setterName = this.getSetterName(name);

            this[setterName] = setter.bind(this);
        }

        getSetterName(name) {

            return `set${name[0].toUpperCase()}${name.substring(1)}`;
        }

        static get observedAttributes() {

            this.componentMetadata = getComponentMetadata(this);

            const attributes = [];

            // To index the property descriptor by attribute name
            this.propertiesByAttribute = {};

            const {
                properties
            } = this.componentMetadata;

            for (var name in properties) {

                if (properties.hasOwnProperty(name)) {

                    const property = properties[name];

                    property.name = name; // Add the name so it can be retrieved from the attribute in attributeChangedCallback

                    if (property.attribute === undefined) { // Set the name of the attribute as same as the name of the property if no attributes were provided

                        property.attribute = name;
                    }

                    attributes.push(property.attribute);

                    this.propertiesByAttribute[property.attribute] = property; // Index by attribute name
                }
            }

            return attributes;
        }

        attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

            if (newValue === oldValue) {

                return; // Nothing to update
            }

            const {
                name,
                type,
                options
            } = (this.constructor as unknown as MetadataInitializerConstructor).propertiesByAttribute[attributeName];

            this.validatePropertyOptions(name, newValue, options);

            console.log(`attributeChangedCallback: '${attributeName}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

            // Update the internal property 
            this.props[name] = defaultPropertyValueConverter.toProperty(newValue, type);

            this.requestUpdate();
        }

        private validatePropertyOptions(name: string, newValue: string, options: string[]) {

            if (options !== undefined &&
                !options.includes(newValue)) {

                throw Error(`Value: [${newValue}] is not in the options of property: '${name}'. Options: [${options.join(', ')}] `);
            }
        }
    }

export default MetadataInitializerMixin