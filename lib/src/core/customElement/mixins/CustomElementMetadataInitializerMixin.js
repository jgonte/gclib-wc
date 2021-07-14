import { Observer } from "gclib-utils";
import defaultPropertyValueConverter from "../../helpers/defaultPropertyValueConverter";
import getComponentMetadata from "../../helpers/getComponentMetadata";
import loadStyles from "../../helpers/loadStyles";
const CustomElementMetadataInitializerMixin = Base => class CustomElementMetadataInitializer extends Base {
    constructor() {
        super();
        this.initialize();
    }
    initialize() {
        const { componentMetadata, style, styleLoadedObserver } = this.constructor;
        const { properties, state } = componentMetadata;
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
    initializeProperty(name, propertyDescriptor) {
        const { attribute, // The name of the HTML attribute mapped to the property
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
            const setter = function (newValue, callback) {
                const oldValue = this.props[name];
                if (oldValue === newValue) {
                    return;
                }
                this.validatePropertyOptions(name, newValue, options);
                // console.log(`Property: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                if (reflect) {
                    // This will trigger the attributeChangedCallback
                    this.setAttribute(attribute, defaultPropertyValueConverter.toAttribute(newValue, type));
                    if (typeof newValue === 'object') {
                        // Using JSON.serialize will wipe out any functions from the object
                        // Therefore after setting the attributes we set the new value as an object
                        this.setProperty(name, newValue);
                    }
                }
                else {
                    this.setProperty(name, newValue);
                }
                callback === null || callback === void 0 ? void 0 : callback();
            };
            var setterName = this.getSetterName(name);
            this[setterName] = setter.bind(this);
        }
    }
    initializeState(name, stateDescriptor) {
        const { value // The default value of the state if no HTML attribute is provided
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
        const { styleUrls } = this.componentMetadata.component;
        if (styleUrls.length > 0) {
            // console.log(`Loading styles for type: ${this.name}`);
            this.loadedStylesTracker = this.loadedStylesTracker || // Inherited one
                {
                    loadedStyles: [],
                    pendingUrls: new Set()
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
        const { properties } = this.componentMetadata;
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
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (newValue === oldValue) {
            return; // Nothing to update
        }
        const { name, type, options } = this.constructor.propertiesByAttribute[attributeName];
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
    static mergeStyle(url, style) {
        const { loadedStyles, pendingUrls } = this.loadedStylesTracker;
        loadedStyles.push(style);
        pendingUrls.delete(url);
        if (pendingUrls.size === 0) {
            this.style = loadedStyles.join('\n');
            this.styleLoadedObserver.notify();
            //delete this.loadedStylesTracker;
        }
    }
    validatePropertyOptions(name, newValue, options) {
        if (options !== undefined &&
            !options.includes(newValue)) {
            throw Error(`Value: [${newValue}] is not in the options of property: '${name}'. Options: [${options.join(', ')}] `);
        }
    }
};
export default CustomElementMetadataInitializerMixin;
