import { VirtualNode, FragmentNode, VirtualText } from 'gclib-vdom';

export default function createVirtualNode(o: any) {

    if (typeof o === 'string') {

        return new VirtualText(o);
    }

    if (o.isVirtualNode === true) {

        return new VirtualNode(
            o.name,
            o.props,
            o.children.map(c => createVirtualNode(c))
        );
    }
    else if (o.IsFragmentNode) {

        return new FragmentNode(
            o.props,
            o.children.map(c => createVirtualNode(c))
        )
    }
    else {

        return new VirtualText(o.text);
    }
}