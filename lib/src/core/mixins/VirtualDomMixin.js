import { TextNode, diff } from 'gclib-vdom';
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
        /**
         * Flag to avoid re-requesting update if it is alaready requested
         */
        this._isUpdating = false;
        if (this.nodeDidConnect !== undefined) {
            this.nodeDidConnect = this.nodeDidConnect.bind(this);
        }
        if (this.nodeWillConnect !== undefined) {
            this.nodeWillConnect = this.nodeWillConnect.bind(this);
        }
        if (this.nodeDidUpdate !== undefined) {
            this.nodeDidUpdate = this.nodeDidUpdate.bind(this);
        }
        if (this.nodeWillDisconnect !== undefined) {
            this.nodeWillDisconnect = this.nodeWillDisconnect.bind(this);
        }
    }
    /**
     * The root element of this component
     */
    get rootElement() {
        const dom = (this.mountedVNode || {}).dom;
        if (dom === undefined) {
            return dom;
        }
        // Once the document fragment is appended to its parent element. It looses all its children, so we need its parent element to apply the diff
        if (dom instanceof DocumentFragment) {
            return dom.parentElement || this.document;
        }
        return dom;
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
        var _a, _b, _c, _d, _e;
        let node = this.render();
        if (node === undefined) {
            console.error('Undefined virtual node. Ensure that you return the node from the render function');
        }
        // Create a virtual text node if the type of node is any primitive
        const nodeType = typeof node;
        if (nodeType === 'string' ||
            nodeType === 'number' ||
            nodeType === 'boolean') {
            node = new TextNode(node);
        }
        // Modify the virtual node if necessary (i.e. add style) before diffing it, to keep it consistent with the mounted one
        if (this.onBeforeMount !== undefined) {
            node = this.onBeforeMount(node);
        }
        // Do the diffing
        const previousNode = this.mountedVNode;
        const patches = diff(previousNode, node);
        if (!patches.hasPatches()) {
            return false; // Nothing to mount   
        }
        if (previousNode === undefined) { // Will mount
            if (node !== null) {
                (_a = this.willMount) === null || _a === void 0 ? void 0 : _a.call(this);
            }
            // else { node === null
            //     Do nothing
            // }
            patches.applyPatches(this.document, undefined, this);
            if (node != null) {
                (_b = this.didMount) === null || _b === void 0 ? void 0 : _b.call(this);
            }
        }
        else { // previousNode !== undefined
            if (node === null) {
                (_c = this.willUnmount) === null || _c === void 0 ? void 0 : _c.call(this);
            }
            else { // node !== null
                (_d = this.willUpdate) === null || _d === void 0 ? void 0 : _d.call(// node !== null
                this);
            }
            patches.applyPatches(this.document, this.rootElement, this);
            if (node != null) {
                (_e = this.didUpdate) === null || _e === void 0 ? void 0 : _e.call(this);
            }
        }
        // Set the new mounted node
        this.mountedVNode = node;
    }
};
export default VirtualDomMixin;
