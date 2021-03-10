import { VirtualText, FragmentNode, mount } from 'gclib-vdom';
const VirtualDomComponentMixin = Base => class VirtualDomComponent extends Base {
    constructor() {
        super();
        if (this.nodeDidUpdate !== undefined) {
            this.nodeDidUpdate = this.nodeDidUpdate.bind(this);
        }
    }
    /**
     * The root element of this component
     */
    get rootElement() {
        const element = (this._mountedNode || {}).element;
        if (element === undefined) {
            return element;
        }
        // Once the document fragment is appended to its parent element. It looses all its children, so we need its parent element to apply the diff
        if (element instanceof DocumentFragment) {
            return element.parentElement || this.document;
        }
    }
    update() {
        let node = this.render();
        if (node === undefined) {
            console.error('Undefined virtual node. Ensure that you return the node from the render function');
        }
        const nodeType = typeof node;
        const styleUrls = this.constructor.componentMetadata.component.styleUrls;
        const hasStyleUrls = styleUrls !== undefined;
        // If the node is a virtual one or a virtual text and there are styles,
        // then create a fragment node to hold the virtual node/text plus the style one(s)
        let requiresFragment = false;
        if (nodeType === 'string' ||
            nodeType === 'number' ||
            nodeType === 'boolean') {
            node = new VirtualText(node);
            if (hasStyleUrls) {
                requiresFragment = true;
            }
        }
        if (node !== null &&
            node.isVirtualNode &&
            hasStyleUrls) {
            requiresFragment = true;
        }
        if (requiresFragment) {
            node = new FragmentNode(null, [node]);
        }
        if (node !== null &&
            hasStyleUrls) {
            this.applyStyles(node, styleUrls);
        }
        mount(this.document, node, this._mountedNode, this.rootElement, this);
        this._mountedNode = node;
    }
};
export default VirtualDomComponentMixin;
