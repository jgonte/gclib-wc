/** The loaded styles */
const _styles = new Map();
/** The classes requesting the style grouped by the style URL */
const _requesters = new Map();
/** The URL of the styles requested to be loaded to avoid requesting the same style */
const _requested = new Set();
const stylesRegistry = {
    async loadStyle(url) {
        const response = await fetch(url);
        const content = await response.body.getReader().read();
        return new TextDecoder("utf-8").decode(content.value);
    },
    async applyStyle(url, requester) {
        if (_styles.has(url)) { // The style has been already loaded for other type
            console.log(`Retrieving loaded style for URL: ${url}`);
            const style = _styles.get(url);
            requester.applyStyle(url, style);
        }
        else { // Load the style
            console.log(`Loading style for URL: ${url} and requester: ${requester.name}`);
            // Add an entry to the map
            if (!_requesters.has(url)) {
                _requesters.set(url, []);
            }
            // Add the requester to the existing ones for that URL
            const requesters = _requesters.get(url);
            requesters.push(requester);
            // Ensure the style hasn't been requested yet
            if (_requested.has(url)) { // Requested by other requester but not loaded yet
                console.log(`This URL: ${url} has been already requested to load the style`);
                return; // Already requested
            }
            _requested.add(url); // Flag it as already requested
            // Load the style
            const style = this.loadStyle(url);
            // Add it to the cache
            _styles.set(url, style);
            // Notify the existing requesters
            requesters.forEach(r => r.applyStyle(url, style));
        }
    }
};
export default stylesRegistry;
