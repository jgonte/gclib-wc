const childConnected = 'childConnected';
const childDisconnected = 'childDisconnected';
/**
 * Fires an event to register/unregister a child item within a parent container
 */
const ChildMixin = Base => class Child extends Base {
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        // Emit an event for the container to register this child
        this.dispatchEvent(new CustomEvent(childConnected, {
            detail: {
                child: this
            },
            bubbles: true,
            composed: true
        }));
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        // Emit an event for the container to unregister this child
        this.dispatchEvent(new CustomEvent(childDisconnected, {
            detail: {
                child: this
            },
            bubbles: true,
            composed: true
        }));
    }
};
export { childConnected, childDisconnected };
export default ChildMixin;
