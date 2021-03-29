export interface ComponentPropertyDescriptor {

    /**
     * The name of the property in the props object
     */
    name: string;

    /**
     * The name of the JSX attribute mapped to the property
     */
    attribute: string;

    /**
     * The default value of the property if no attribute is set in the JSX
     */
    value: any;

    /**
     * Whether the value of the property can be changed
     */
    mutable: boolean;

    /**
     * The range to restrict the values of the property
     */
    options: string[];
}

export interface ComponentStateDescriptor {

    /**
     * The name of the state in the state object
     */
    name: string;

    /**
     * The default value of the state
     */
    value: any;
}

/**
 * The metadata that describes the properties and state of the component
 */
export interface ComponentMetadata {

    properties: Record<string, ComponentPropertyDescriptor>;

    state: Record<string, ComponentStateDescriptor>;
}