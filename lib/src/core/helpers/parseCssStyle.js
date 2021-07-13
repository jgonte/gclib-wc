export default function parseCssStyle(style) {
    const s = {};
    const parts = style.split(';');
    parts
        .filter(part => part !== '')
        .forEach(part => {
        const kvs = part.split(':');
        const key = toCamelCase(kvs[0].trim());
        const value = kvs[1].trim();
        s[key] = value;
    });
    return s;
}
function toCamelCase(s) {
    const exp = /-([a-z])/;
    while (exp.test(s)) {
        s = s.replace(exp, RegExp.$1.toUpperCase());
    }
    return s;
}
