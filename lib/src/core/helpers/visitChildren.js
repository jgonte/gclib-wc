function getChildren(node) {
    if (node instanceof HTMLElement) {
        const slot = node.querySelector('slot');
        if (slot !== null) {
            return slot.assignedNodes({ flatten: true });
        }
        else {
            return Array.from(node.childNodes);
        }
    }
    else {
        return [];
    }
}
export default function visitChildren(children, visit) {
    children.forEach(child => {
        visit(child);
        visitChildren(getChildren(child), visit);
    });
}
