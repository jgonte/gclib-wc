/**
 * The following symbols allow for mixins to call the render method of the derived class that extends those mixins
 * For that, the derived class must import the symbol and implement that method using the symbol as the name of the method
 */
export const renderDerived = Symbol('renderDerived');
