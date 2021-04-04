import { VirtualText, VirtualNode, diff } from 'gclib-vdom';

/**
 * Connects the CustomElement or the FunctionalComponent to the virtual dom rendering cycle
 * @param Base 
 * @returns 
 */
const VirtualDomMixin = Base =>

    class VirtualDom extends Base {

        /**
         * Keep the virtual node to diff it for the next change
         */
        private _mountedNode: VirtualNode | VirtualText;

        /**
         * Flag to avoid re-requesting update if it is alaready requested
         */
        private _isUpdating: boolean = false;

        // The props and children are ignored for custom elements but they are needed for Functional Components
        // so they are included in the constructor
        constructor(props?: any, children?: any) {

            super(props, children);

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

            // Modify the virtual node if necessary (i.e. add style) before diffing it, to keep it consistent with the mounted one
            node = this.onBeforeMount(node);

            // Do the diffing
            const previousNode = this._mountedNode;

            const patches = diff(previousNode, node);

            if (!patches.hasPatches()) {

                return false; // Nothing to mount   
            }

            if (previousNode === undefined) { // Will mount

                if (node !== null) {

                    this.willMount?.();
                }
                // else { node === null

                //     Do nothing
                // }

                patches.applyPatches(this.document, undefined, this as any);

                if (node != null) {

                    this.didMount?.();
                }
            }
            else { // previousNode !== undefined

                if (node === null) {

                    this.willUnmount?.();
                }
                else { // node !== null

                    this.willUpdate?.();
                }

                patches.applyPatches(this.document, this.rootElement, this as any);

                if (node != null) {

                    this.didUpdate?.();
                }
            }

            // Set the new mounted node
            this._mountedNode = node;
        }
    };

export default VirtualDomMixin;