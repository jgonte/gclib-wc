function getChildren(node: Node): Node[] {

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

export default function visitChildren(children: Node[], visit: Function): void {

    children.forEach(child => {

        visit(child);

        visitChildren(getChildren(child), visit);
    });
}