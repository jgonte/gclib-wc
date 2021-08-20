import { TextNode, diff, FragmentNode, NodeChanges } from 'gclib-vdom';
import VirtualNode from 'gclib-vdom/dist/types/nodes/VirtualNode';

/**
 * Connects the CustomElement or the FunctionalComponent to the virtual dom rendering cycle
 */
const VirtualDomMixin = Base =>

    class VirtualDom extends Base {

        /**
         * Flag to avoid re-requesting update if it is alaready requested
         */
        private _isUpdating: boolean = false;

        /**
         * The new node being mounted/updated
         */
        private _mountingNode: VirtualNode;

        // The props and children are ignored for custom elements but they are needed for Functional Components
        // so they are included in the constructor
        constructor(props?: any, children?: any) {

            super(props, children);

            this.nodeWillConnect = this.nodeWillConnect.bind(this);

            this.nodeDidConnect = this.nodeDidConnect.bind(this);

            this.nodeDidUpdate = this.nodeDidUpdate.bind(this);

            this.nodeWillDisconnect = this.nodeWillDisconnect.bind(this);
        }

        nodeWillConnect(node: HTMLElement) {

            super.nodeWillConnect?.(node);

            if (node === this._mountingNode.dom &&
                this.elementWillConnect !== undefined) {

                console.log(`Calling elementWillConnect in element of type: ${this.constructor.name} and node id: ${node.id}`);

                this.elementWillConnect(node);
            }
        }

        nodeDidConnect(node: HTMLElement) {

            super.nodeDidConnect?.(node);

            if (node === this._mountingNode.dom &&
                this.elementDidConnect !== undefined) {

                console.log(`Calling elementDidConnect in element of type: ${this.constructor.name} and node id: ${node.id}`);

                this.elementDidConnect(node);
            }
        }

        nodeDidUpdate(node: HTMLElement, nodeChanges: NodeChanges) {

            super.nodeDidUpdate?.(node);

            if (node === this._mountingNode.dom &&
                this.elementDidUpdate !== undefined) {

                console.log(`Calling elementDidUpdate in element of type: ${this.constructor.name} and node id: ${node.id}`);

                this.elementDidUpdate(node, nodeChanges);
            }
        }

        nodeWillDisconnect(node: HTMLElement) {

            super.nodeWillDisconnect?.(node);

            if (node === this._mountingNode.dom &&
                this.elementWillDisconnect !== undefined) {

                console.log(`Calling elementWillDisconnect in element of type: ${this.constructor.name} and node id: ${node.id}`);

                this.elementWillDisconnect(node);
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

            // Once the document fragment is appended to its parent element. It looses all its children, 
            // so we need its parent element to apply the diff
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

            let node = this.render();

            if (node === undefined) {

                console.error('Undefined virtual node. Ensure that you return the node from the render function');
            }

            if (Array.isArray(node)) { // Wrap the array of nodes in a fragment

                node = new FragmentNode(null, node);
            }

            // Create a virtual text node if the type of node is any primitive
            const nodeType = typeof node;

            if (nodeType === 'string' ||
                nodeType === 'number' ||
                nodeType === 'boolean') {

                node = new TextNode(node);
            }

            this._mountingNode = node; // Set this so we can trigger the lifecycle of the element, but before we add styles

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

            if (previousNode === undefined) { // Mount

                patches.applyPatches(this.document, undefined, this as any);
            }
            else { // previousNode !== undefined

                patches.applyPatches(this.document, this.rootElement, this as any);
            }

            // Set the new mounted node
            this.mountedVNode = node;
        }
    };

export default VirtualDomMixin;