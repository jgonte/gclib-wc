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

        private _isRootNode(node: HTMLElement) {

            if (node == undefined) {

                throw Error('Node cannot be undefined');
            }
             
            return node === this._mountingNode.dom || 
                node.firstChild === this._mountingNode.dom;
        }

        nodeWillConnect(node: HTMLElement) {

            super.nodeWillConnect?.(node);

            if (this._isRootNode(node) &&
                this.elementWillConnect !== undefined) {

                this.elementWillConnect(node);
            }
        }

        nodeDidConnect(node: HTMLElement) {

            super.nodeDidConnect?.(node);

            if (this._isRootNode(node) &&
                this.elementDidConnect !== undefined) {

                this.elementDidConnect(node);
            }
        }

        nodeDidUpdate(node: HTMLElement, nodeChanges: NodeChanges) {

            super.nodeDidUpdate?.(node);

            if (this._isRootNode(node) &&
                this.elementDidUpdate !== undefined) {

                this.elementDidUpdate(node, nodeChanges);
            }
        }

        nodeWillDisconnect(node: HTMLElement) {

            super.nodeWillDisconnect?.(node);

            if (this._isRootNode(node) &&
                this.elementWillDisconnect !== undefined) {

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

                this.willMountCallback?.();

                patches.applyPatches(this.document, undefined, this as any);

                this._mountedCallback(); // Internal callback to notify the element has been mounted
            }
            else { // previousNode !== undefined - Either will update or unmount

                // Peek at the patches to determine whether is an update or unmount
                //this.willUpdateCallback();

                patches.applyPatches(this.document, this.rootElement, this as any);
            }

            // Set the new mounted node
            this.mountedVNode = node;
        }

        // The "oficial" mounted callback
        mountedCallback() {

            console.log(`Calling mountedCallback for element ${this.constructor.name}`)
        }
    };

export default VirtualDomMixin;