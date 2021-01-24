const PassPropertiesToChildrenMixin = Base => class PassPropertiesToChildren extends Base {
    nodeDidUpdate(node, nodeChanges) {
        if (super.nodeDidUpdate) {
            super.nodeDidUpdate(node, nodeChanges);
        }
        const componentMetadata = this.constructor.componentMetadata;
        const properties = Object.values(componentMetadata.properties)
            .filter(p => p.passToChildren === true);
        if (properties.length === 0) {
            return;
        }
        const childNodes = this.getChildNodes(nodeChanges);
        // Pass the properties to the children
        childNodes.forEach(childNode => {
            if (!(childNode instanceof HTMLElement)) {
                return;
            }
            properties.forEach(p => {
                const propertyName = p.name;
                const attributeName = p.attribute;
                if (childNode.props.hasOwnProperty(propertyName)) {
                    if (childNode.props[propertyName] === p.value) { // A value different from the default one has not been set
                        childNode.setAttribute(attributeName, this.props[propertyName]);
                    }
                }
            });
        });
    }
};
export default PassPropertiesToChildrenMixin;
