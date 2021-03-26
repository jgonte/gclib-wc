import { CustomElementMetadata } from "../customElement/Interfaces";

export default function getComponentMetadata(ctor) {

    const metadata : CustomElementMetadata = {
        component: {},
        properties: {},
        state: {}
    };

    // Set the shadow prpoerty
    metadata.component.shadow = (ctor.component || {}).shadow === undefined ? true : ctor.component.shadow;

    // Merge the URL styles
    const set = new Set<string>(); // To avoid URL duplicates

    while (ctor !== HTMLElement) {

        const {
            component,
            properties,
            state
        } = ctor;

        const urls = (component || {}).styleUrls || [];

        // Merge the style urls
        urls.forEach(url => {

            if (!set.has(url)) {

                set.add(url);
            }
        });

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

        ctor = Object.getPrototypeOf(ctor.prototype).constructor;
    }

    metadata.component.styleUrls = Array.from(set);

    return metadata;
}