import visitChildren from "../helpers/visitChildren";
import { ComponentMetadata, CustomPropertyDescriptor } from "../Interfaces";

const ContainerMixin = Base =>

    class Container extends Base {

        static state = {

            /**
             * The children elements of this container
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
    }

export default ContainerMixin;