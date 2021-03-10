import { h } from 'gclib-vdom';
import MetadataInitializerMixin from './mixins/MetadataInitializerMixin';
import VirtualDomComponentMixin from './mixins/VirtualDomComponentMixin';
export default class CustomElement extends VirtualDomComponentMixin(MetadataInitializerMixin(HTMLElement)) {
    constructor() {
        super();
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
        if (this._isUpdating) {
            return;
        }
        this._isUpdating = true;
        requestAnimationFrame(() => {
            this.update();
            this._isUpdating = false;
        });
    }
    /**
     * The DOM document in which this component is updated
     */
    get document() {
        return this.shadowRoot !== null ?
            this.shadowRoot :
            this;
    }
    applyStyles(vnode, styleUrls) {
        for (let i = 0; i < styleUrls.length; ++i) {
            vnode.appendChildNode(h("style", null, `@import '${styleUrls[i]}'`));
        }
    }
    /**
     * Sets the property bypassing any serialization
     * @param name The name of the property
     * @param value The value of the property
     */
    setProperty(name, value) {
        const oldValue = this.props[name];
        if (oldValue === value) {
            return;
        }
        if (typeof value === 'function') {
            this.props[name] = value.bind(this);
        }
        else {
            this.props[name] = value;
        }
        this.requestUpdate();
    }
}
