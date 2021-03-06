import { childConnected, childDisconnected } from './ChildMixin';
const ContainerMixin = Base => { var _a; return _a = class Container extends Base {
        // notifyChildren() {
        //     const {
        //         children
        //     } = this.state;
        //     const componentMetadata: ComponentMetadata = (this.constructor as any).componentMetadata;
        //     const properties: CustomPropertyDescriptor[] = Object.values(componentMetadata.properties)
        //         .filter(p => p.passToChildren === true);
        //     if (properties.length === 0) {
        //         return;
        //     }
        //     properties.forEach(p => {
        //         const propertyName = p.name;
        //         const attributeName = p.attribute;
        //         // Pass the property to the children
        //         visitChildren(children, child => {
        //             if ((child as any).props?.hasOwnProperty(propertyName)) {
        //                 if ((child as any).props[propertyName] === p.value) { // A value different from the default one has not been set
        //                     child.setAttribute(attributeName, this.props[propertyName]);
        //                 }
        //             }
        //         });
        //     });
        // }
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
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.addEventListener(childConnected, this.onChildConnected);
            this.addEventListener(childDisconnected, this.onChildDisconnected);
        }
        disconnectedCallback() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.removeEventListener(childConnected, this.onChildConnected);
            this.removeEventListener(childDisconnected, this.onChildDisconnected);
        }
        onChildConnected(event) {
            const { child } = event.detail;
            this.addChild(child);
        }
        onChildDisconnected(event) {
            const { child } = event.detail;
            this.removeChild(child);
        }
        addChild(child) {
            var _a;
            const { children } = this.state;
            this.setChildren([...children, child]);
            (_a = this.onChildAdded) === null || _a === void 0 ? void 0 : _a.call(this, child);
            this.notifyChild(child);
        }
        notifyChild(child) {
            const componentMetadata = this.constructor.componentMetadata;
            const properties = Object.values(componentMetadata.properties)
                .filter(p => p.passToChildren === true);
            if (properties.length === 0) {
                return;
            }
            properties.forEach(p => {
                var _a;
                const propertyName = p.name;
                const attributeName = p.attribute;
                // Pass the property to the child
                if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(propertyName)) {
                    if (child.props[propertyName] === p.value) { // A value different from the default one has not been set
                        child.setAttribute(attributeName, this.props[propertyName]);
                    }
                }
            });
        }
        removeChild(child) {
            var _a;
            let { children } = this.state;
            const index = children.indexOf(child);
            if (index > -1) {
                children = children.splice(index, 1);
                this.setChildren(children);
            }
            (_a = this.onChildRemoved) === null || _a === void 0 ? void 0 : _a.call(this, child);
        }
    },
    _a.state = {
        /**
         * The children elements that opted to register with this container
         */
        children: {
            value: []
        }
    },
    _a; };
export default ContainerMixin;
