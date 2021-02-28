import visitChildren from "../helpers/visitChildren";
import { ComponentMetadata, CustomPropertyDescriptor } from "../Interfaces";
import { childConnected, childDisconnected } from './ChildMixin';

const ContainerMixin = Base =>

    class Container extends Base {

        static state = {

            /**
             * The children elements that opted to register with this container
             */
            children: {
                value: []
            },
        };

        notifyChildren() {

            const {
                children
            } = this.state;

            const componentMetadata: ComponentMetadata = (this.constructor as any).componentMetadata;

            const properties: CustomPropertyDescriptor[] = Object.values(componentMetadata.properties)
                .filter(p => p.passToChildren === true);

            if (properties.length === 0) {

                return;
            }

            properties.forEach(p => {

                const propertyName = p.name;

                const attributeName = p.attribute;

                // Pass the property to the children
                visitChildren(children, child => {

                    if ((child as any).props?.hasOwnProperty(propertyName)) {

                        if ((child as any).props[propertyName] === p.value) { // A value different from the default one has not been set
    
                            child.setAttribute(attributeName, this.props[propertyName]);
                        }
                    }
                });
            });
        }

        nodeDidUpdate(node, nodeChanges) {

            if (super.nodeDidUpdate) {

                super.nodeDidUpdate(node, nodeChanges);
            }

            const {
                hasChildren,
                children
            } = this.getChildren(nodeChanges);

            if (hasChildren) {

                this.setChildren(children);
            }

            this.notifyChildren();
        }

        getChildren(nodeChanges) {

            const {
                inserted,
                moved
            } = nodeChanges;

            if (inserted.length === 0 &&
                moved.length === 0) {

                return {
                    hasChildren: false,
                    children: []
                };
            }

            return {
                hasChildren: true,
                children: [
                    ...inserted,
                    ...moved
                ]
            };
        }

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

            this.onChildAdded?.(child);

            this.notifyChild(child);
        }

        notifyChild(child: HTMLElement) {

            const componentMetadata: ComponentMetadata = (this.constructor as any).componentMetadata;

            const properties: CustomPropertyDescriptor[] = Object.values(componentMetadata.properties)
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

                        child.setAttribute(attributeName, this.props[propertyName]);
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
    }

export default ContainerMixin;