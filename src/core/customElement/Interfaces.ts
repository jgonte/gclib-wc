import { Observer } from "gclib-utils";

export interface CustomElementDescriptor {

    /**
     * Whether create a shadow DOM for the component
     * Defaults to true
     */
    shadow?: boolean;

    /**
     * The style URLs to import for the component
     */
    styleUrls?: string[];
}

export interface CustomElementPropertyDescriptor {
    /**
     * The name of the property in the props object
     */
    name: string;

    /**
     * The name of the HTML attribute mapped to the property
     */
    attribute: string;

    /**
     * The type of the property
     */
    type: Function;

    /**
     * The default value of the property if no attribute is set in HTML
     */
    value: any;

    /**
     * Whether the value of the property can be changed
     */
    mutable: boolean;

    /**
     * Whether to reflect the change of the property in its mapped HTML attribute
     */
    reflect: boolean;

    /**
     * Whether the value of the parent property needs to be passed th the children nodes when they are initialized
     */
    passToChildren: boolean;

    /**
     * The range to restrict the values of the property
     */
    options: string[];

    /**
     * Whether the property must have a value by the time the connectedCallback method is called
     */
    required: boolean;
}

export interface CustomElementMetadata {

    component: CustomElementDescriptor;

    properties: Record<string, CustomElementPropertyDescriptor>;

    state: any;
}

export interface CustomElementMetadataHolder {

    componentMetadata: CustomElementMetadata;
}

export interface CustomElementConstructor extends CustomElementMetadataHolder {

    /** The merged style content */
    style?: string;

    /** The observer of the constructor of the component to notify its instances when the styles have been merged */
    styleLoadedObserver: Observer;

    propertiesByAttribute: any;
}