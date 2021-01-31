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

            // Pass the properties to the children
            children.forEach(childNode => {

                if (!(childNode instanceof HTMLElement)) {

                    return;
                }

                properties.forEach(p => {

                    const propertyName = p.name;

                    const attributeName = p.attribute;

                    if ((childNode as any).props?.hasOwnProperty(propertyName)) {

                        if ((childNode as any).props[propertyName] === p.value) { // A value different from the default one has not been set

                            childNode.setAttribute(attributeName, this.props[propertyName]);
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
                hasInsertedChildren,
                children
            } = this.getChildren(nodeChanges);

            if (hasInsertedChildren) {

                this.setChildren(children);
            }
            
            this.notifyChildren();
        }
    }

export default ContainerMixin;