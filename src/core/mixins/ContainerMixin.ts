import visitChildren from "../helpers/visitChildren";
import { CustomElementMetadata, CustomElementPropertyDescriptor } from "../customElement/Interfaces";
import { childConnected, childDisconnected } from './ChildMixin';

const ContainerMixin = Base =>

    class Container extends Base {

        static state = {

            /**
             * The children elements that opted to register with this container
             */
            children: {
                value: []
            }
        };
        
        constructor() {

            super();

            this.addSlottedChildren = this.addSlottedChildren.bind(this);
        }

        addSlottedChildren(event) {

            const children = event.target.assignedElements();

            children.forEach(child => this.addChild(child));
        }

        didMount() {

            if (this.shadowRoot === null) {

                return;
            }

            // Add the listener to listen for changes in the slot
            const slot = this.shadowRoot.querySelector('slot');

            if (slot === null) {

                return; // There is no slot to get the children from
            }

            const children = slot.assignedElements();

            if (children.length > 0) { // The children have been already loaded

                children.forEach(child => this.addChild(child));
            }
            else { // Listen for any change in the slot

                slot.addEventListener('slotchange', this.addSlottedChildren);
            }
        }

        willUnmount() {

            if (this.shadowRoot === null) {

                return;
            }

            // Remove the listener to listen for changes in the slot
            const slot = this.shadowRoot.querySelector('slot');

            if (slot !== null) {

                slot.removeEventListener('slotchange', this.addSlottedChildren);
            }
        }

        // nodeDidUpdate(node, nodeChanges) {

        //     if (super.nodeDidUpdate) {

        //         super.nodeDidUpdate(node, nodeChanges);
        //     }

        //     const {
        //         hasChildren,
        //         children
        //     } = this.getChildren(nodeChanges);

        //     if (hasChildren) {

        //         this.setChildren(children);
        //     }

        //     this.notifyChildren();
        // }

        // getChildren(nodeChanges) {

        //     const {
        //         inserted,
        //         moved
        //     } = nodeChanges;

        //     if (inserted.length === 0 &&
        //         moved.length === 0) {

        //         return {
        //             hasChildren: false,
        //             children: []
        //         };
        //     }

        //     return {
        //         hasChildren: true,
        //         children: [
        //             ...inserted,
        //             ...moved
        //         ]
        //     };
        // }

        connectedCallback() {

            super.connectedCallback?.();

            this.addEventListener(childConnected, this.onChildConnected);

            this.addEventListener(childDisconnected, this.onChildDisconnected);
        }

        disconnectedCallback() {

            super.disconnectedCallback?.();

            this.removeEventListener(childConnected, this.onChildConnected);

            this.removeEventListener(childDisconnected, this.onChildDisconnected);
        }

        onChildConnected(event: CustomEvent) {

            const {
                child
            } = event.detail;

            if (this.acceptChild !== undefined &&
                !this.acceptChild(child)) {

                return;
            }

            this.addChild(child);
        }

        onChildDisconnected(event: CustomEvent) {

            const {
                child
            } = event.detail;

            this.removeChild(child);
        }

        addChild(child: HTMLElement) {

            const {
                children
            } = this.state;

            this.setChildren([...children, child]);

            this.onChildAdded(child);
        }

        onChildAdded(child: HTMLElement) {

            this.passPropsToChild(child);
        }

        /** 
         * Passes the passToChildren properties to the children
         */
        passPropsToChild(child: HTMLElement) {

            const componentMetadata: CustomElementMetadata = (this.constructor as any).componentMetadata;

            const properties: CustomElementPropertyDescriptor[] = Object.values(componentMetadata.properties)
                .filter(p => p.passToChildren === true);

            if (properties.length === 0) {

                return;
            }

            properties.forEach(p => {

                const propertyName = p.name;

                const attributeName = p.attribute;

                // Pass the property to the child
                if ((child as any).props?.hasOwnProperty(propertyName)) {

                    if ((child as any).props[propertyName] === p.value) { // A value different from the default one has not been set

                        if ((child as any).setAttribute !== undefined) { // Custom element

                            child.setAttribute(attributeName, this.props[propertyName]);
                        }
                        else { // Component

                            (child as any).props[propertyName] = this.props[propertyName];
                        }
                    }
                }
            });
        }

        removeChild(child: HTMLElement) {

            let {
                children
            } = this.state;

            const index = children.indexOf(child);

            if (index > -1) {

                children = children.splice(index, 1);

                this.setChildren(children);
            }

            this.onChildRemoved?.(child);
        }

        attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

            super.attributeChangedCallback?.(attributeName, oldValue, newValue);

            // If any passtoChildren property has changed in the parent, then pass the new value to its children
            const {
                children
            } = this.state;

            const componentMetadata: CustomElementMetadata = (this.constructor as any).componentMetadata;

            const property: CustomElementPropertyDescriptor = Object.values(componentMetadata.properties)
                .filter(p => p.attribute === attributeName)[0];

            if (!property.passToChildren) {

                return;
            }

            const {
                name
            } = property;

            // Pass the property to the children
            visitChildren(children, child => {

                if ((child as any).props?.hasOwnProperty(name)) {

                    if ((child as any).props[name] !== newValue) { // The value is different from the current one

                        child.setAttribute(attributeName, this.props[name]);
                    }
                }
            });
        }
    }

export default ContainerMixin;