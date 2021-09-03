function getChildren(node) {
    const children = [];
    if (node instanceof HTMLSlotElement) {
        const childNodes = node.assignedNodes({ flatten: true });
        children.push(...childNodes);
    }
    else if (node instanceof HTMLElement) {
        // Add the nodes of the slots if any
        let slots = node.querySelectorAll('slot');
        slots.forEach(slot => {
            const childNodes = slot.assignedNodes({ flatten: true });
            children.push(...childNodes);
        });
        // Add the child nodes that are not in a slot
        let childNodes = Array.from(node.childNodes);
        children.push(...childNodes);
        if (node.shadowRoot === null) {
            return children;
        }
        // Do the same for the shadow root
        node = node.shadowRoot;
        // It seems that the slots from the shadowRoot and host are the same so we don't need to repeat the operation for the shadowRoot
        // Add the child nodes that are not in a slot
        childNodes = Array.from(node.childNodes);
        children.push(...childNodes);
    }
    return children;
}
export default function getAllChildren(node) {
    const children = [node];
    getChildren(node).forEach((child) => {
        children.push(...getAllChildren(child));
    });
    return children;
}
