const ContainerMixin = Base => { var _a; return _a = class Container extends Base {
        notifyChildren() {
            const { children } = this.state;
            const componentMetadata = this.constructor.componentMetadata;
            const properties = Object.values(componentMetadata.properties)
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
                    var _a;
                    const propertyName = p.name;
                    const attributeName = p.attribute;
                    if ((_a = childNode.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(propertyName)) {
                        if (childNode.props[propertyName] === p.value) { // A value different from the default one has not been set
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
            const { hasInsertedChildren, children } = this.getChildren(nodeChanges);
            if (hasInsertedChildren) {
                this.setChildren(children);
            }
            this.notifyChildren();
        }
    },
    _a.state = {
        /**
         * The children elements of this container
         */
        children: {
            value: []
        },
    },
    _a; };
export default ContainerMixin;
