const registry = {
    /** The URL of the styles requested to be loaded to avoid requesting the same style */
    requested: new Set(),
    /** The loaded styles */
    loaded: new Map(),
    /** The callbacks mapped to the specific URL */
    callbacksMap: new Map(),
    /** Request to load a style from a given URL */
    async load(url, callback) {
        const { requested, loaded, callbacksMap } = this;
        if (loaded.has(url)) { // The style has been already loaded for other type
            console.log(`Retrieving loaded style for URL: ${url}`);
            const style = loaded.get(url);
            callback(url, style);
            return;
        }
        // Add an entry to the map
        if (!callbacksMap.has(url)) {
            callbacksMap.set(url, []);
        }
        // Get the collection of callbacks
        const callbacks = callbacksMap.get(url);
        callbacks.push(callback);
        if (requested.has(url)) { // Requested by other type but not loaded yet
            // console.log(`This URL: ${url} has been already requested to load the style`);
            return; // Already requested
        }
        requested.add(url); // Flag it as already requested
        // Load the style
        const response = await fetch(url);
        const content = await response.body.getReader().read();
        const style = new TextDecoder("utf-8").decode(content.value);
        //     console.log(`Setting loaded style from URL: ${url} in the registry
        // ${style}
        //             `);
        loaded.set(url, style);
        callbacks.forEach(cb => {
            cb(url, style);
        });
    }
};
export default function loadStyles(ctor) {
    const { styleUrls } = ctor.componentMetadata.component;
    styleUrls.forEach(url => {
        registry.load(url, ctor.mergeStyle);
    });
}
