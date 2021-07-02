import { VirtualNode, FragmentNode, VirtualText, markupToVDom } from 'gclib-vdom';
export default function createVirtualNode(o) {
    if (typeof o === 'string') {
        return markupToVDom(o.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
    }
    if (o.isVirtualNode === true) {
        return new VirtualNode(o.name, o.props, o.children.map(c => createVirtualNode(c)));
    }
    else if (o.IsFragmentNode) {
        return new FragmentNode(o.props, o.children.map(c => createVirtualNode(c)));
    }
    else {
        return new VirtualText(o.text);
    }
}
