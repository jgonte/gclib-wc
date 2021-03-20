import { Observer } from "gclib-utils";
import defaultPropertyValueConverter from "../helpers/defaultPropertyValueConverter";
import getComponentMetadata from "../helpers/getComponentMetadata";
import loadStyles from "../helpers/loadStyles";
import { CustomPropertyDescriptor, MetadataInitializerConstructor } from "../Interfaces";

/**
 * Tracks the loaded styles so when all the required styles have been loaded.
 * The final merge stail can be set and the instances of the type can be notified so tehy can be rendered
 */
interface LoadedStylesTracker {

    /** The loaded styles to be merged once the pending URL are empty */
    loadedStyles: string[],

    /** The pending URLs that get removed every time its corresponding style gets added tothe loaded styles */
    pendingUrls: Set<string>
}

const MetadataInitializerMixin = Base =>

    class MetadataInitializer extends Base {

        static loadedStylesTracker?: LoadedStylesTracker;

        constructor() {

            super();

            this.initialize();
        }

        initialize() {

            const {
                componentMetadata,
                style,
                styleLoadedObserver
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

            // Style
            if (styleLoadedObserver !== undefined && style === undefined) { // Requires style but it hasn't been loaded yet

                styleLoadedObserver.subscribe(this);
            }
        }

        initializeProperty(name: string, propertyDescriptor: CustomPropertyDescriptor) {

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

                const setter = function (newValue: any, callback: Function) {

                    const oldValue = this.props[name];

                    if (oldValue === newValue) {

                        return;
                    }

                    this.validatePropertyOptions(name, newValue, options);

                    // console.log(`Property: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

                    if (reflect) { // This will trigger the attributeChangedCallback

                        this.setAttribute(attribute, defaultPropertyValueConverter.toAttribute(newValue, type));
                    }
                    else {

                        this.setProperty(name, newValue);
                    }

                    callback?.();
                };

                var setterName = this.getSetterName(name);

                this[setterName] = setter.bind(this);
            }
        }

        initializeState(name: string, stateDescriptor) {

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

                // console.log(`State: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

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

            const {
                styleUrls
            } = this.componentMetadata.component;

            if (styleUrls.length > 0) {

                // console.log(`Loading styles for type: ${this.name}`);

                this.loadedStylesTracker = {

                    loadedStyles: [],

                    pendingUrls: new Set<string>()
                };

                // Populate the pending URLs to load
                styleUrls.forEach(styleUrl => {

                    this.loadedStylesTracker.pendingUrls.add(styleUrl);
                });

                // Set up the observer
                this.styleLoadedObserver = new Observer('onStyleLoaded');

                this.mergeStyle = this.mergeStyle.bind(this);

                loadStyles(this);
            }

            // Collect the observed attributes
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

            // console.log(`attributeChangedCallback: '${attributeName}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);

            // Update the internal property 
            this.props[name] = defaultPropertyValueConverter.toProperty(newValue, type);

            this.requestUpdate();
        }

        /**
         * Called when there is a style available to merge
         * @param url
         * @param style 
         */
        static mergeStyle(url: string, style: string): void {

            const {
                loadedStyles,
                pendingUrls
            } = this.loadedStylesTracker;

            loadedStyles.push(style);

            pendingUrls.delete(url);

            if (pendingUrls.size === 0) {

                this.style = loadedStyles.join('\n');

                this.styleLoadedObserver.notify();

                delete this.loadedStylesTracker;
            }
        }

        private validatePropertyOptions(name: string, newValue: string, options: string[]) {

            if (options !== undefined &&
                !options.includes(newValue)) {

                throw Error(`Value: [${newValue}] is not in the options of property: '${name}'. Options: [${options.join(', ')}] `);
            }
        }
    }

export default MetadataInitializerMixin