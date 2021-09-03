import { config } from "../../components/config";
import CustomElement from "../customElement/CustomElement";

const childMounted = 'childMounted';

/**
 * Handles notifying the parent when the shadow root of its children have been mounted
 */
const MountedNotifierMixin = Base =>

    class MountedNotifier extends Base {

        // The members below can be set by the children elements before the constructor gets called
        // Therefore do not explicitly initialize them as shown below

        // Tracks the children that this element has will notify when mounted
        //private _childrenToMount: Set<CustomElement> = undefined; // Only create it if this element has children

        // The shared collection of functions to call when the element has its children mounted calling its children first
        //private _mountedCallbacks: Map<Node, Function> = undefined; // Only create it for the root element

        /**
         * Retrieves the parent up in the hierarchy that is a custom element
         * @returns The parent up in the hierarchy that is a custom element or null
         */
        private _getCustomParentElement(): CustomElement {

            let parent = this.parentNode;

            while (parent !== null) {

                const prefix = `${config.tagPrefix.toUpperCase()}-`;

                // Not ideal but in some cases the elements are parent elements and are referenced before they are initialized
                // as is in the case of slots and in other cases the children are referenced before they are initialized
                // so we don't have a way of knowing which one is one of ours
                // Setting CustomElement.IsCustomElement = true won't work for uninitalized elements, for example

                if (parent.tagName?.startsWith(prefix)) {  // It is one of our custom elements

                    break;
                }

                parent = parent.parentNode;
            }

            return parent;
        }

        /**
         * Retrieves the root parent up in the hierarchy that is a custom element
         * @returns The root parent up in the hierarchy that is a custom element or null
         */
        private _getRootCustomParentElement(): CustomElement {

            let parent = this.parentNode;

            let rootParent = null;

            while (parent !== null) {

                const prefix = `${config.tagPrefix.toUpperCase()}-`;

                if (parent.tagName?.startsWith(prefix)) {// It is one of our custom elements

                    rootParent = parent;
                }

                parent = parent.parentNode;
            }

            return rootParent;
        }

        private _hasChildren(): boolean {

            return this._childrenToMount !== undefined ||
                this.children.length > 0;
        }

        connectedCallback() {

            super.connectedCallback?.();

            const parent = this._getCustomParentElement();

            if (parent !== null) { // It has a parent custom element

                if (parent._childrenToMount === undefined) {

                    parent._childrenToMount = new Set<CustomElement>(); // Create the collection to monitor the children that need to be mounted in the parent
                }

                parent._childrenToMount.add(this as any); // Add it to the collection of children, the parent needs to monitor
            }
            else { // It is a root element

                this._mountedCallbacks = new Map<Node, Function>(); // Create the mounted callbacks collection in the root element
            }

            if (this._hasChildren()) { // Element has children

                if (this._childrenToMount === undefined) {

                    this._childrenToMount = new Set<CustomElement>(); // Create the collection to monitor the children that need to be mounted in the parent
                }

                this.addEventListener(childMounted, this.handleChildMounted);
            }

        }

        disconnectedCallback() {

            super.disconnectedCallback?.();

            if (this._hasChildren()) { // Element has children

                this.removeEventListener(childMounted, this.handleChildMounted);
            }
        }

        /**
         * Handles messages sent by the children that are mounted
         * @param event The child mounted event sent by a child element
         */
        handleChildMounted(event: CustomEvent) {

            const child = event.detail.child;

            if (this._childrenToMount.has(child)) {

                event.stopPropagation(); // Ensure it does not bubble up

                const parent = this._getRootCustomParentElement();

                const mountedCallbacks = parent === null ? // It is the root element
                    this._mountedCallbacks :
                    parent._mountedCallbacks

                if (child.mountedCallback !== undefined) {

                    mountedCallbacks.set(child, child.mountedCallback);
                }

                this._childrenToMount.delete(child);

                if (this._childrenToMount.size === 0) { // All its children were mounted

                    if (parent === null) { // Only call the callbacks if this is a root element

                        mountedCallbacks.forEach((callback, child) => callback.call(child)); // Call all the callbacks of the children

                        this.mountedCallback?.(); // Call the callback of this element too

                    }

                    this._dispatchChildMountedEvent();
                }
            }
        }

        _mountedCallback() {

            if (!this._hasChildren()) { // If the element has no children

                this._dispatchChildMountedEvent(); // Notify the parent that the child was mounted
            }
        }

        private _dispatchChildMountedEvent() {

            this.dispatchEvent(new CustomEvent(childMounted, { // Notify the parent as mounted
                detail: {
                    child: this
                },
                bubbles: true,
                composed: true
            }));

        }
    };

export default MountedNotifierMixin;