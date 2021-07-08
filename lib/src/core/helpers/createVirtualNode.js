import { ElementNode, FragmentNode, TextNode, markupToVDom } from 'gclib-vdom';
export default function createElementNode(o) {
    if (typeof o === 'string') {
        return markupToVDom(o.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
    }
    if (o.isElementNode === true) {
        return new ElementNode(o.name, o.props, o.children.map(c => createElementNode(c)));
    }
    else if (o.IsFragmentNode) {
        return new FragmentNode(o.props, o.children.map(c => createElementNode(c)));
    }
    else {
        return new TextNode(o.text);
    }
}
