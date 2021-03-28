import { VirtualText, mount } from 'gclib-vdom';
/**
 * Connects the CustomElement or the FunctionalComponent to the virtual dom rendering cycle
 * @param Base
 * @returns
 */
const VirtualDomMixin = Base => class VirtualDom extends Base {
    // The props and children are ignored for custom elements but they are needed for Functional Components
    // so they are included in the constructor
    constructor(props, children) {
        super(props, children);
        this._isUpdating = false;
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
    requestUpdate() {
        if (this._isUpdating) {
            return;
        }
        this._isUpdating = true;
        requestAnimationFrame(() => {
            this.update();
            this._isUpdating = false;
        });
    }
    update() {
        let node = this.render();
        if (node === undefined) {
            console.error('Undefined virtual node. Ensure that you return the node from the render function');
        }
        // Create a virtual text node if the type of node is any primitive
        const nodeType = typeof node;
        if (nodeType === 'string' ||
            nodeType === 'number' ||
            nodeType === 'boolean') {
            node = new VirtualText(node);
        }
        if (this.onBeforeMount !== undefined) {
            node = this.onBeforeMount(node);
        }
        mount(this.document, node, this._mountedNode, this.rootElement, this);
        this._mountedNode = node;
    }
};
export default VirtualDomMixin;
