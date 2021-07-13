export default function getGlobalFunction(value) {
    const functionName = value.replace('()', '').trim();
    return window[functionName];
}
