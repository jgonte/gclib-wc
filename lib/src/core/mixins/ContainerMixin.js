import visitChildren from "../helpers/visitChildren";
const ContainerMixin = Base => { var _a; return _a = class Container extends Base {
        notifyChildren() {
            const { children } = this.state;
            const componentMetadata = this.constructor.componentMetadata;
            const properties = Object.values(componentMetadata.properties)
                .filter(p => p.passToChildren === true);
            if (properties.length === 0) {
                return;
            }
            properties.forEach(p => {
                const propertyName = p.name;
                const attributeName = p.attribute;
                // Pass the property to the children
                visitChildren(children, child => {
                    var _a;
                    if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(propertyName)) {
                        if (child.props[propertyName] === p.value) { // A value different from the default one has not been set
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
            const { hasChildren, children } = this.getChildren(nodeChanges);
            if (hasChildren) {
                this.setChildren(children);
            }
            this.notifyChildren();
        }
        getChildren(nodeChanges) {
            const { inserted, moved } = nodeChanges;
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
