import visitChildren from "../helpers/visitChildren";
import { childConnected, childDisconnected } from './ChildMixin';
const ContainerMixin = Base => { var _a; return _a = class Container extends Base {
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
            if (this.acceptChild !== undefined &&
                !this.acceptChild(child)) {
                return;
            }
            this.addChild(child);
        }
        onChildDisconnected(event) {
            const { child } = event.detail;
            this.removeChild(child);
        }
        addChild(child) {
            const { children } = this.state;
            this.setChildren([...children, child]);
            this.onChildAdded(child);
        }
        onChildAdded(child) {
            this.passPropsToChild(child);
        }
        /**
         * Passes the passToChildren properties to the children
         */
        passPropsToChild(child) {
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
                        if (child.setAttribute !== undefined) { // Custom element
                            child.setAttribute(attributeName, this.props[propertyName]);
                        }
                        else { // Component
                            child.props[propertyName] = this.props[propertyName];
                        }
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
        attributeChangedCallback(attributeName, oldValue, newValue) {
            var _a;
            (_a = super.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, attributeName, oldValue, newValue);
            // If any passtoChildren property has changed in the parent, then pass the new value to its children
            const { children } = this.state;
            const componentMetadata = this.constructor.componentMetadata;
            const property = Object.values(componentMetadata.properties)
                .filter(p => p.attribute === attributeName)[0];
            if (!property.passToChildren) {
                return;
            }
            const { name } = property;
            // Pass the property to the children
            visitChildren(children, child => {
                var _a;
                if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(name)) {
                    if (child.props[name] !== newValue) { // The value is different from the current one
                        child.setAttribute(attributeName, this.props[name]);
                    }
                }
            });
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
