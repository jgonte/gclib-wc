export default function getComponentMetadata(ctor) {
    const metadata = {
        component: {},
        properties: {},
        state: {}
    };
    const set = new Set(); // To avoid URL duplicates
    while (ctor !== HTMLElement) {
        const { component, properties, state } = ctor;
        const urls = (component || {}).styleUrls || [];
        // Merge the style urls
        urls.forEach(url => {
            if (!set.has(url)) {
                set.add(url);
            }
        });
        // Merge the property descriptors
        metadata.properties = Object.assign(Object.assign({}, metadata.properties), properties);
        // Merge the state descriptor
        metadata.state = Object.assign(Object.assign({}, metadata.state), state);
        ctor = Object.getPrototypeOf(ctor.prototype).constructor;
    }
    metadata.component.styleUrls = Array.from(set);
    return metadata;
}
