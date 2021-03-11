import { VirtualText, VirtualNode, FragmentNode, mount, h } from 'gclib-vdom';

const VirtualDomComponentMixin = Base =>

    class VirtualDomComponent extends Base {

        private _mountedNode: VirtualNode | VirtualText;

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

            const styleUrls = (this.constructor as any).componentMetadata.component.styleUrls;

            const hasStyleUrls = styleUrls.length > 0;

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

                node.appendChildNode(
                    <style>{(this.constructor as any).style}</style>
                )
            }

            mount(
                this.document,
                node,
                this._mountedNode,
                this.rootElement,
                this as any);

            this._mountedNode = node;
        }
    };

export default VirtualDomComponentMixin;