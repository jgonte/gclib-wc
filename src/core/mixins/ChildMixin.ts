const childConnected = 'childConnected';

const childDisconnected = 'childDisconnected';

/**
 * Fires an event to register/unregister a child item within a parent container
 */
const ChildMixin = Base =>

    class Child extends Base {

        connectedCallback() {

            super.connectedCallback?.();

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
    
            super.disconnectedCallback?.();

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

export {
    
    childConnected,

    childDisconnected
}

export default ChildMixin;