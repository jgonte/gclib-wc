import CustomElementMetadataInitializerMixin from './mixins/CustomElementMetadataInitializerMixin';
import VirtualDomComponentMixin from '../mixins/VirtualDomComponentMixin';
export default class CustomElement extends VirtualDomComponentMixin(CustomElementMetadataInitializerMixin(HTMLElement)) {
    constructor() {
        super();
        this._isUpdating = false;
        const { componentMetadata } = this.constructor;
        if (componentMetadata.component.shadow === true) {
            this.attachShadow({ mode: 'open' });
        }
    }
    connectedCallback() {
        // Validate that all the required properties have been set
        const { componentMetadata } = this.constructor;
        const { properties } = componentMetadata;
        const requiredProperties = Object.values(properties).filter(p => p.required === true);
        const invalidAttributes = [];
        requiredProperties.forEach(property => {
            if (this.props[property.name] === undefined) {
                invalidAttributes.push(property.attribute);
            }
        });
        if (invalidAttributes.length > 0) {
            throw Error(`These attributes are required but are missing their values: [${invalidAttributes.join(', ')}]`);
        }
        this.requestUpdate();
    }
    requestUpdate() {
        const { style, styleLoadedObserver } = this.constructor;
        if (styleLoadedObserver !== undefined && style === undefined) {
            return; // Requires a style but the style hasn't been loaded or merged yet
        }
        if (this._isUpdating) {
            return;
        }
        this._isUpdating = true;
        requestAnimationFrame(() => {
            this.update();
            this._isUpdating = false;
        });
    }
    onStyleLoaded() {
        // console.log(`Style loaded for component ${this.constructor.name} ... requesting update`);
        this.requestUpdate();
    }
    /**
     * The DOM document in which this component is updated
     */
    get document() {
        return this.shadowRoot !== null ?
            this.shadowRoot :
            this;
    }
    /**
     * Sets the property bypassing any serialization
     * @param attribute The name of the property
     * @param value The value of the property
     */
    setProperty(attribute, value) {
        // Get the mapped property
        const property = this.constructor.propertiesByAttribute[attribute];
        const name = property !== undefined ? property.name : attribute;
        const oldValue = this.props[name];
        if (oldValue === value) {
            return;
        }
        // console.log(`setProperty: '${name}' of custom element: [${this.constructor.name}] value: <${value}>`);
        if (typeof value === 'function') {
            this.props[name] = value.bind(this);
        }
        else {
            this.props[name] = value;
        }
        this.requestUpdate();
    }
}