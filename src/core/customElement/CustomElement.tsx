import { FragmentNode, h } from 'gclib-vdom';
import { CustomElementConstructor } from './Interfaces';
import CustomElementMetadataInitializerMixin from './mixins/CustomElementMetadataInitializerMixin';
import VirtualDomMixin from '../mixins/VirtualDomMixin';
import MountedNotifierMixin from '../mixins/MountedNotifierMixin';

export default abstract class CustomElement extends
    MountedNotifierMixin(
        VirtualDomMixin(
            CustomElementMetadataInitializerMixin(
                HTMLElement
            )
        )
    ) {

    constructor() {

        super();

        const {
            componentMetadata
        } = this.constructor as unknown as CustomElementConstructor;

        if (componentMetadata.component.shadow === true) {

            this.attachShadow({ mode: 'open' });
        }

        console.log(`CustomElement - Constructor called for type: ${this.constructor.name}`)
    }

    connectedCallback() {

        super.connectedCallback?.();

        // Validate that all the required properties have been set
        const {
            componentMetadata
        } = this.constructor as unknown as CustomElementConstructor;

        const {
            properties
        } = componentMetadata;

        const requiredProperties = Object.values(properties).filter(p => p.required === true);

        const invalidAttributes: string[] = [];

        requiredProperties.forEach(property => {

            if (this.props[property.name] === undefined) {

                invalidAttributes.push(property.attribute);
            }
        });

        if (invalidAttributes.length > 0) {

            throw Error(`These attributes are required but are missing their values: [${invalidAttributes.join(', ')}]`)
        }

        this.requestUpdate();
    }

    requestUpdate() {

        const {
            style,
            styleLoadedObserver
        } = this.constructor as unknown as CustomElementConstructor;

        if (styleLoadedObserver !== undefined && style === undefined) {

            return; // Requires a style but the style hasn't been loaded or merged yet
        }

        super.requestUpdate();
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
    setProperty(attribute: string, value: any) {

        // Get the mapped property by the name of the attribute
        let property = (this.constructor as any).propertiesByAttribute[attribute];

        if (property === undefined) {

            // Try to get it by the property name
            property = (this.constructor as any).properties[attribute];

            if (property === undefined) {

                throw Error(`There is no mapped property for attribute: ${attribute} in type: ${this.constructor.name}`)
            }
        }

        const name = property.name;

        const oldValue = this.props[name];

        if (oldValue === value) {

            return;
        }

        // console.log(`setProperty: '${name}' of custom element: [${this.constructor.name}] value: <${value}>`);

        if (typeof value === 'function') {

            this.props[name] = (value as Function).bind(this);
        }
        else {

            this.props[name] = value;
        }

        this.requestUpdate();
    }

    onBeforeMount(vnode) {

        if (vnode === null) {

            return vnode; // No style added to a null node
        }

        const style = (this.constructor as any).style;

        if (style === undefined) {

            return vnode; // No style to add
        }

        // We need to append a style
        if (vnode.isElement ||
            vnode.isText) {

            // Create a fragment with the original node as a child so we can append the style
            vnode = new FragmentNode(null, [vnode]);
        }

        vnode.appendChildNode(<style>{style}</style>);

        return vnode;
    }

}
