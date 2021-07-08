const childConnected = 'childConnected';

const childDisconnected = 'childDisconnected';

/**
 * Fires an event to register/unregister a child item within a parent container
 */
const ChildMixin = Base =>

    class Child extends Base {

        constructor(props, children) {

            super(props, children);   
        }
        
        nodeDidConnect(node: Node) {

            super.connectedCallback?.(node);

            // Emit an event for the container to register this child
            node.dispatchEvent(new CustomEvent(childConnected, {
                detail: { 
                    child: this
                },
                bubbles: true,
                composed: true
            }));
        }
    
        nodeWillDisconnect(node: Node) {
    
            super.nodeWillDisconnect?.(node);

            // Emit an event for the container to unregister this child
            node.dispatchEvent(new CustomEvent(childDisconnected, {
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