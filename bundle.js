var Observer = (function () {
    function Observer(callbackName) {
        if (callbackName === void 0) { callbackName = 'onNotify'; }
        this.callbackName = callbackName;
        this._subscribers = [];
    }
    Observer.prototype.subscribe = function (subscriber) {
        this._subscribers.push(subscriber);
    };
    Observer.prototype.unsubscribe = function (subscriber) {
        var index = this._subscribers.indexOf(subscriber);
        if (index > -1) {
            this._subscribers.splice(index, 1);
        }
    };
    Observer.prototype.notify = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.push(this);
        for (var _b = 0, _c = this._subscribers; _b < _c.length; _b++) {
            var subscriber = _c[_b];
            (_a = subscriber)[this.callbackName].apply(_a, args);
        }
    };
    return Observer;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var IntlProvider = (function (_super) {
    __extends(IntlProvider, _super);
    function IntlProvider(lang, data) {
        var _this = _super.call(this, 'onLanguageChanged') || this;
        _this.lang = lang;
        _this.data = data;
        return _this;
    }
    IntlProvider.prototype.setLanguage = function (lang) {
        if (this.lang !== lang) {
            this.lang = lang;
            this.notify();
        }
    };
    IntlProvider.prototype.getTranslation = function (lang, key) {
        var lng = lang || this.lang;
        var data = this.data[lng];
        if (!data) {
            console.error("Missing translations for language: [" + lang + "]. (key was [" + key + "]).");
            return "[" + key + "(L:" + lang + ")]";
        }
        var translation = data[key];
        if (!translation) {
            console.error("Missing translation key: [" + key + "] in language: [" + lang + "].");
            return "[(K:" + key + ")" + lang + "]";
        }
        return translation;
    };
    return IntlProvider;
}(Observer));

var AppCtrl = (function () {
    function AppCtrl() {
    }
    return AppCtrl;
}());
var appCtrl = new AppCtrl();

function isStandardEvent(name) {
    return [
        'onkeydown',
        'onkeypress',
        'onkeyup',
        'onclick',
        'ondblclick',
        'onmousedown',
        'onmousemove',
        'onmouseout',
        'onmouseover',
        'onmouseup',
        'onwheel'
    ].indexOf(name) > -1;
}

function getCSSClass(clsProps) {
    return Object.keys(clsProps).filter(function (k) { return clsProps[k] === true; }).join(' ');
}

function getCSSStyle(styleProps) {
    return Object.keys(styleProps).reduce(function (acc, key) { return (acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + styleProps[key] + ';'); }, '');
}

function setAttribute(element, name, value) {
    var _a;
    if (value === undefined || value === null) {
        return;
    }
    if (typeof value === 'function') {
        var names = name.split('_');
        var nameLower = names[0].toLowerCase();
        if (isStandardEvent(nameLower)) {
            var eventName = nameLower.slice(2);
            var useCapture = ((_a = names[1]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'capture';
            element.addEventListener(eventName, value, useCapture);
            element._trackedListeners = element._trackedListeners || {};
            (element._trackedListeners)[name] = {
                eventName: eventName,
                value: value,
                useCapture: useCapture
            };
        }
        else {
            element[name] = value.bind(element);
        }
    }
    else {
        if (name === 'class') {
            if (typeof value === 'object') {
                value = getCSSClass(value);
            }
            if (value.trim() !== '') {
                element.className = value;
            }
        }
        else if (name === 'style') {
            if (typeof value === 'object') {
                value = getCSSStyle(value);
            }
            if (value.trim() !== '') {
                element.setAttribute(name, value);
            }
        }
        else {
            element.setAttribute(name, value);
        }
    }
}

function isSvg(name) {
    return [
        'svg',
        'use',
        'path'
    ].indexOf(name) > -1;
}
function createDOMElement(name, props) {
    if (typeof name === 'string') {
        var key = void 0;
        var element = isSvg(name) ?
            document.createElementNS('http://www.w3.org/2000/svg', name) :
            document.createElement(name);
        for (key in props) {
            setAttribute(element, key, props[key]);
        }
        return element;
    }
    else {
        throw new Error("createDOMElement is not implemented for name: " + JSON.stringify(name));
    }
}

var VirtualNode = (function () {
    function VirtualNode(name, props, children) {
        this.name = name;
        this.props = props;
        this.children = children;
        this.isVirtualNode = true;
    }
    Object.defineProperty(VirtualNode.prototype, "key", {
        get: function () {
            return this.props ? this.props.key : undefined;
        },
        enumerable: false,
        configurable: true
    });
    VirtualNode.prototype.render = function () {
        var _a = this, name = _a.name, props = _a.props, children = _a.children;
        var element = createDOMElement(name, props);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child) {
                element.appendChild(child.render());
            }
        }
        this.element = element;
        return element;
    };
    return VirtualNode;
}());

var VirtualText = (function () {
    function VirtualText(text) {
        this.text = text;
    }
    VirtualText.prototype.render = function () {
        var element = document.createTextNode(this.text.toString());
        this.element = element;
        return element;
    };
    return VirtualText;
}());

var Fragment = (function () {
    function Fragment() {
    }
    return Fragment;
}());
var FragmentNode = (function () {
    function FragmentNode(props, children) {
        this.props = props;
        this.children = children;
        this.isFragmentNode = true;
    }
    FragmentNode.prototype.render = function () {
        var children = this.children;
        var documentFragment = document.createDocumentFragment();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child) {
                documentFragment.appendChild(child.render());
            }
        }
        this.element = documentFragment;
        return documentFragment;
    };
    FragmentNode.prototype.appendChildNode = function (vNode) {
        this.children.push(vNode);
    };
    return FragmentNode;
}());

function h(name, attributes) {
    if (attributes === void 0) { attributes = {}; }
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (Array.isArray(children[0])) {
        children = children[0];
    }
    var childrenNodes = [];
    children.forEach(function (child) {
        if (child === null) ;
        else if (child.isVirtualNode) {
            childrenNodes.push(child);
        }
        else if (child.isFragmentNode) {
            childrenNodes.push(child);
        }
        else if (typeof child === 'object') {
            throw new Error('Invalid object');
        }
        else {
            childrenNodes.push(new VirtualText(child));
        }
    });
    if (typeof name === 'string') {
        return new VirtualNode(name, attributes, childrenNodes);
    }
    else {
        if (name.name === 'Fragment') {
            return new FragmentNode(attributes, childrenNodes);
        }
        else {
            return new name(attributes, childrenNodes).render();
        }
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var NodeChanges = (function () {
    function NodeChanges(config) {
        if (config === void 0) { config = {}; }
        config = config || {};
        this.text = config.text;
        this.attributes = config.attributes || [];
        this.inserted = config.inserted || [];
        this.moved = config.moved || [];
        this.removed = config.removed || [];
    }
    NodeChanges.prototype.merge = function (from) {
        this.text = from.text;
        this.attributes = this.attributes.concat(from.attributes);
        this.inserted = this.inserted.concat(from.inserted);
        this.moved = this.moved.concat(from.moved);
        this.removed = Array.from(new Set(this.removed.concat(from.removed)));
    };
    return NodeChanges;
}());

var PatchingContext = (function () {
    function PatchingContext() {
        this._original = new Map();
        this._changedNodes = new Map();
    }
    PatchingContext.prototype.setOriginalElement = function (element, index) {
        this._original.set(index, element);
    };
    PatchingContext.prototype.getOriginalElement = function (index) {
        var element = this._original.get(index);
        if (element) {
            this._original.delete(index);
            this.unsetRemovedElement(element);
        }
        return element;
    };
    PatchingContext.prototype.unsetRemovedElement = function (element) {
        this._changedNodes.forEach(function (nodeChanges, node) {
            var index = nodeChanges.removed.indexOf(element);
            if (index > -1) {
                nodeChanges.removed.splice(index, 1);
            }
        });
    };
    PatchingContext.prototype.setNodeChanges = function (node, nodeChanges) {
        if (this._changedNodes.has(node)) {
            var changes = this._changedNodes.get(node);
            changes.merge(nodeChanges);
        }
        else {
            this._changedNodes.set(node, nodeChanges);
        }
    };
    PatchingContext.prototype.mergeOriginalElements = function (node) {
        var removed = Array.from(this._original.values());
        if (removed.length > 0) {
            this.setNodeChanges(node, new NodeChanges({
                removed: removed
            }));
        }
    };
    PatchingContext.prototype.callDidUpdateForNodes = function (nodeDidUpdate) {
        var _this = this;
        this._changedNodes.forEach(function (nodeChanges, node) {
            var nodes = __spreadArrays(nodeChanges.inserted, nodeChanges.moved);
            for (var i = 0; i < nodes.length; ++i) {
                _this.callDidUpdateForNode(nodes[i], nodeDidUpdate);
            }
            nodeDidUpdate(node, nodeChanges);
            _this._changedNodes.delete(node);
        });
    };
    PatchingContext.prototype.callDidUpdateForNode = function (node, nodeDidUpdate) {
        if (this._changedNodes.has(node)) {
            var nodeChanges = this._changedNodes.get(node);
            var nodes = __spreadArrays(nodeChanges.inserted, nodeChanges.moved);
            for (var i = 0; i < nodes.length; ++i) {
                this.callDidUpdateForNode(nodes[i], nodeDidUpdate);
            }
            this._changedNodes.delete(node);
        }
    };
    return PatchingContext;
}());

var ElementPatches = (function () {
    function ElementPatches(patches, childrenPatches) {
        this.patches = patches;
        this.childrenPatches = childrenPatches;
    }
    ElementPatches.prototype.applyPatches = function (parentNode, node, hooks, parentContext) {
        var context = new PatchingContext();
        for (var i = 0; i < this.patches.length; ++i) {
            this.patches[i].applyPatch({
                parentNode: parentNode,
                node: node,
                context: context,
                parentContext: parentContext,
                hooks: hooks
            });
        }
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        if (n !== undefined && n !== null) {
            for (var i = 0; i < this.childrenPatches.length; ++i) {
                var patch = this.childrenPatches[i];
                var childNode = n.childNodes[patch.index];
                patch.patches.applyPatches(n, childNode, hooks, context);
            }
        }
        context.mergeOriginalElements(n);
        if (hooks === null || hooks === void 0 ? void 0 : hooks.nodeDidUpdate) {
            context.callDidUpdateForNodes(hooks === null || hooks === void 0 ? void 0 : hooks.nodeDidUpdate);
        }
    };
    ElementPatches.prototype.hasPatches = function () {
        return this.patches.length || this.childrenPatches.length;
    };
    return ElementPatches;
}());

var ChildElementPatches = (function () {
    function ChildElementPatches(index, patches) {
        this.index = index;
        this.patches = patches;
    }
    return ChildElementPatches;
}());

var AddAttributePatch = (function () {
    function AddAttributePatch(name, value) {
        this.name = name;
        this.value = value;
    }
    AddAttributePatch.prototype.applyPatch = function (options) {
        var node = options.node, context = options.context;
        var _a = this, name = _a.name, value = _a.value;
        setAttribute(node, name, value);
        context.setNodeChanges(node, new NodeChanges({
            attributes: [{
                    key: name,
                    newValue: value
                }]
        }));
    };
    return AddAttributePatch;
}());

function removeAttribute(element, name) {
    var names = name.split('_');
    var nameLower = names[0].toLowerCase();
    if (isStandardEvent(nameLower)) {
        var trackedListeners = element._trackedListeners;
        var trackedListener = trackedListeners[name];
        var eventName = trackedListener.eventName, value = trackedListener.value, useCapture = trackedListener.useCapture;
        element.removeEventListener(eventName, value, useCapture);
        delete trackedListeners[name];
    }
    else {
        element.removeAttribute(name);
    }
}

var RemoveAttributePatch = (function () {
    function RemoveAttributePatch(name, oldValue) {
        this.name = name;
        this.oldValue = oldValue;
    }
    RemoveAttributePatch.prototype.applyPatch = function (options) {
        var node = options.node, context = options.context;
        removeAttribute(node, this.name);
        context.setNodeChanges(node, new NodeChanges({
            attributes: [{
                    key: this.name,
                    oldValue: this.oldValue
                }]
        }));
    };
    return RemoveAttributePatch;
}());

function replaceAttribute(element, name, newValue) {
    var names = name.split('_');
    var nameLower = names[0].toLowerCase();
    if (isStandardEvent(nameLower)) {
        var trackedListeners = element._trackedListeners;
        var trackedListener = trackedListeners[name];
        var eventName = trackedListener.eventName, value = trackedListener.value, useCapture = trackedListener.useCapture;
        element.removeEventListener(eventName, value, useCapture);
        element.addEventListener(eventName, newValue, useCapture);
        trackedListener.value = newValue;
    }
    else {
        if (name === 'class') {
            if (typeof newValue === 'object') {
                newValue = getCSSClass(newValue);
            }
            if (newValue.trim() !== '') {
                element.className = newValue;
            }
        }
        else if (name === 'style') {
            if (typeof newValue === 'object') {
                newValue = getCSSStyle(newValue);
            }
            if (newValue.trim() !== '') {
                element.setAttribute(name, newValue);
            }
        }
        else {
            element.setAttribute(name, newValue);
        }
    }
}

var SetAttributePatch = (function () {
    function SetAttributePatch(name, oldValue, newValue) {
        this.name = name;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    SetAttributePatch.prototype.applyPatch = function (options) {
        var node = options.node, context = options.context, parentNode = options.parentNode;
        var _a = this, name = _a.name, oldValue = _a.oldValue, newValue = _a.newValue;
        var n = node instanceof DocumentFragment ?
            parentNode.host :
            node;
        if (newValue === undefined || newValue === null) {
            removeAttribute(n, name);
        }
        else {
            replaceAttribute(n, name, newValue);
        }
        context.setNodeChanges(n, new NodeChanges({
            attributes: [{
                    key: name,
                    oldValue: oldValue,
                    newValue: newValue
                }]
        }));
    };
    return SetAttributePatch;
}());

var SetTextPatch = (function () {
    function SetTextPatch(value) {
        this.value = value;
    }
    SetTextPatch.prototype.applyPatch = function (options) {
        var node = options.node, context = options.context;
        var oldValue = node.textContent || undefined;
        var newValue = this.value.text.toString();
        node.textContent = newValue;
        context.setNodeChanges(node, new NodeChanges({
            text: {
                oldValue: oldValue,
                newValue: newValue
            }
        }));
    };
    return SetTextPatch;
}());

var RemoveElementPatch = (function () {
    function RemoveElementPatch() {
    }
    RemoveElementPatch.prototype.applyPatch = function (options) {
        var parentNode = options.parentNode, node = options.node, context = options.context, hooks = options.hooks;
        var nodeWillDisconnect = (hooks || {}).nodeWillDisconnect;
        if (nodeWillDisconnect) {
            nodeWillDisconnect(node);
        }
        parentNode.removeChild(node);
        context.setNodeChanges(parentNode, new NodeChanges({
            removed: [node]
        }));
    };
    return RemoveElementPatch;
}());

var RemoveChildrenPatch = (function () {
    function RemoveChildrenPatch() {
    }
    RemoveChildrenPatch.prototype.applyPatch = function (options) {
        var node = options.node, parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var nodeWillDisconnect = (hooks || {}).nodeWillDisconnect;
        var removedChildrenElements = [];
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        while (n.firstChild) {
            var child = n.firstChild;
            if (nodeWillDisconnect) {
                nodeWillDisconnect(child);
            }
            n.removeChild(child);
            removedChildrenElements.push(child);
        }
        context.setNodeChanges(n, new NodeChanges({
            removed: removedChildrenElements
        }));
    };
    return RemoveChildrenPatch;
}());

var SetChildPatch = (function () {
    function SetChildPatch(index, newNode) {
        this.index = index;
        this.newNode = newNode;
    }
    SetChildPatch.prototype.applyPatch = function (options) {
        var node = options.node, parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var _a = hooks || {}, nodeWillDisconnect = _a.nodeWillDisconnect, nodeWillConnect = _a.nodeWillConnect, nodeDidConnect = _a.nodeDidConnect;
        var insertedChildrenElements = [];
        var removedChildrenElements = [];
        var index = this.index;
        var newChild = this.newNode.render();
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        var oldChild = n.children[index];
        if (oldChild) {
            context.setOriginalElement(oldChild, index);
            if (nodeWillDisconnect) {
                nodeWillDisconnect(oldChild);
            }
            if (nodeWillConnect) {
                nodeWillConnect(newChild);
            }
            n.replaceChild(newChild, oldChild);
            if (nodeDidConnect) {
                nodeDidConnect(newChild);
            }
            removedChildrenElements.push(oldChild);
            insertedChildrenElements.push(newChild);
        }
        else {
            if (nodeWillConnect) {
                nodeWillConnect(newChild);
            }
            n.appendChild(newChild);
            if (nodeDidConnect) {
                nodeDidConnect(newChild);
            }
            insertedChildrenElements.push(newChild);
        }
        context.setNodeChanges(n, new NodeChanges({
            inserted: insertedChildrenElements,
            removed: removedChildrenElements
        }));
    };
    return SetChildPatch;
}());

var AddChildrenPatch = (function () {
    function AddChildrenPatch(children) {
        this.children = children;
    }
    AddChildrenPatch.prototype.applyPatch = function (options) {
        var node = options.node, context = options.context, hooks = options.hooks;
        var _a = hooks || {}, nodeWillConnect = _a.nodeWillConnect, nodeDidConnect = _a.nodeDidConnect;
        var insertedChildrenElements = [];
        var fragment = document.createDocumentFragment();
        this.children.forEach(function (child) {
            var childElement = child.render();
            insertedChildrenElements.push(childElement);
            if (nodeWillConnect) {
                nodeWillConnect(childElement);
            }
            fragment.appendChild(childElement);
            if (nodeDidConnect) {
                nodeDidConnect(childElement);
            }
        });
        node.appendChild(fragment);
        context.setNodeChanges(node, new NodeChanges({
            inserted: insertedChildrenElements
        }));
    };
    return AddChildrenPatch;
}());

var MoveChildPatch = (function () {
    function MoveChildPatch(from, to, offset) {
        this.from = from;
        this.to = to;
        this.offset = offset;
    }
    MoveChildPatch.prototype.applyPatch = function (options) {
        var node = options.node, parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var _a = hooks || {}, nodeWillDisconnect = _a.nodeWillDisconnect, nodeWillConnect = _a.nodeWillConnect, nodeDidConnect = _a.nodeDidConnect;
        var movedChildrenElements = [];
        var _b = this, from = _b.from, to = _b.to, offset = _b.offset;
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        var movingChild = context.getOriginalElement(from);
        if (!movingChild) {
            movingChild = n.children[from - offset];
        }
        var originalElement = n.children[to];
        if (originalElement) {
            context.setOriginalElement(originalElement, to);
            if (nodeWillDisconnect) {
                nodeWillDisconnect(originalElement);
            }
            if (nodeWillConnect) {
                nodeWillConnect(movingChild);
            }
            n.replaceChild(movingChild, originalElement);
            if (nodeDidConnect) {
                nodeDidConnect(movingChild);
            }
            movedChildrenElements.push(movingChild);
        }
        else {
            if (nodeWillConnect) {
                nodeWillConnect(movingChild);
            }
            n.appendChild(movingChild);
            if (nodeDidConnect) {
                nodeDidConnect(movingChild);
            }
            movedChildrenElements.push(movingChild);
        }
        context.setNodeChanges(n, new NodeChanges({
            moved: movedChildrenElements,
        }));
    };
    return MoveChildPatch;
}());

var RemoveChildrenRangePatch = (function () {
    function RemoveChildrenRangePatch(from, count) {
        this.from = from;
        this.count = count;
    }
    RemoveChildrenRangePatch.prototype.applyPatch = function (options) {
        var node = options.node, parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var nodeWillDisconnect = (hooks || {}).nodeWillDisconnect;
        var removedChildrenElements = [];
        var index = this.from;
        var to = this.from + this.count - 1;
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        for (var i = index; i <= to; ++i) {
            var child = n.children[index];
            if (child) {
                if (nodeWillDisconnect) {
                    nodeWillDisconnect(child);
                }
                n.removeChild(child);
                removedChildrenElements.push(child);
            }
        }
        context.setNodeChanges(n, new NodeChanges({
            removed: removedChildrenElements
        }));
    };
    return RemoveChildrenRangePatch;
}());

var OffsetManager = (function () {
    function OffsetManager() {
        this._movedFromIndexes = [];
    }
    OffsetManager.prototype.addRemoved = function (index) {
        this._movedFromIndexes.push(index);
    };
    OffsetManager.prototype.getOffset = function (index) {
        return this._movedFromIndexes.filter(function (i) { return i < index; }).length;
    };
    return OffsetManager;
}());

var ReplaceElementPatch = (function () {
    function ReplaceElementPatch(newNode) {
        this.newNode = newNode;
    }
    ReplaceElementPatch.prototype.applyPatch = function (options) {
        var parentNode = options.parentNode, node = options.node, parentContext = options.parentContext, context = options.context, hooks = options.hooks;
        var _a = hooks || {}, nodeWillDisconnect = _a.nodeWillDisconnect, nodeWillConnect = _a.nodeWillConnect, nodeDidConnect = _a.nodeDidConnect;
        var newNode = this.newNode.render();
        if (nodeWillDisconnect) {
            nodeWillDisconnect(node);
        }
        if (nodeWillConnect) {
            nodeWillConnect(newNode);
        }
        node.replaceWith(newNode);
        if (nodeDidConnect) {
            nodeDidConnect(newNode);
        }
        (parentContext || context).setNodeChanges(parentNode, new NodeChanges({
            inserted: [newNode],
            removed: [node]
        }));
    };
    return ReplaceElementPatch;
}());

function setAttributes(element, props) {
    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            setAttribute(element, key, props[key]);
        }
    }
}

var SetElementPatch = (function () {
    function SetElementPatch(newNode) {
        this.newNode = newNode;
    }
    SetElementPatch.prototype.applyPatch = function (options) {
        var parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var _a = hooks || {}, nodeWillConnect = _a.nodeWillConnect, nodeDidConnect = _a.nodeDidConnect;
        var props = this.newNode.props;
        var newNode = this.newNode.render();
        if (newNode instanceof DocumentFragment) {
            if (props !== undefined && props !== null) {
                if (parentNode instanceof ShadowRoot) {
                    setAttributes(parentNode.host, props);
                }
                else if (parentNode instanceof Document || parentNode instanceof DocumentFragment) {
                    throw new Error('Cannot apply properties to Document or DocumentFragment');
                }
                else {
                    setAttributes(parentNode, props);
                }
            }
            var childNodes = Array.from(newNode.childNodes);
            if (childNodes.length > 0) {
                if (nodeWillConnect) {
                    for (var i = 0; i < childNodes.length; ++i) {
                        nodeWillConnect(childNodes[i]);
                    }
                }
                parentNode.appendChild(newNode);
                if (nodeDidConnect) {
                    for (var i = 0; i < childNodes.length; ++i) {
                        nodeDidConnect(childNodes[i]);
                    }
                }
                context.setNodeChanges(parentNode, new NodeChanges({
                    inserted: childNodes
                }));
            }
        }
        else {
            if (nodeWillConnect) {
                nodeWillConnect(newNode);
            }
            parentNode.appendChild(newNode);
            if (nodeDidConnect) {
                nodeDidConnect(newNode);
            }
            context.setNodeChanges(parentNode, new NodeChanges({
                inserted: [newNode]
            }));
        }
    };
    return SetElementPatch;
}());

function diffAttributes(oldAttributes, newAttributes) {
    var patches = [];
    var oldAttributeNames = oldAttributes ?
        Object.keys(oldAttributes) :
        [];
    if (newAttributes) {
        for (var _i = 0, _a = Object.entries(newAttributes); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            var i = oldAttributeNames.indexOf(k);
            if (i > -1) {
                var oldValue = oldAttributes[k];
                if (v !== oldValue) {
                    patches.push(new SetAttributePatch(k, oldValue, v));
                }
                oldAttributeNames.splice(i, 1);
            }
            else {
                patches.push(new AddAttributePatch(k, v));
            }
        }
    }
    if (oldAttributeNames.length > 0) {
        for (var _c = 0, oldAttributeNames_1 = oldAttributeNames; _c < oldAttributeNames_1.length; _c++) {
            var k = oldAttributeNames_1[_c];
            var oldValue = oldAttributes[k];
            patches.push(new RemoveAttributePatch(k, oldValue));
        }
    }
    return patches;
}
function isUndefinedOrNull(o) {
    return typeof o === 'undefined' || o === null;
}
function isVirtualNode(node) {
    return node.isVirtualNode;
}
function isFragmentNode(node) {
    return node.isFragmentNode;
}
function hasKeys(children) {
    if (children === void 0) { children = []; }
    var keys = new Set();
    var missingFirstKey = false;
    for (var i = 0; i < children.length; ++i) {
        var child = children[i];
        if (isVirtualNode(child)) {
            var key = child.key;
            if (key) {
                if (missingFirstKey) {
                    throw new Error('Missing key at index: [0] in children collection.');
                }
                if (keys.has(key)) {
                    throw new Error("Duplicate key: " + key + " at index: [" + i + "] in children collection.");
                }
                keys.add(key);
            }
            else {
                if (i == 0) {
                    missingFirstKey = true;
                }
                else if (keys.size > 0) {
                    throw new Error("Missing key at index: [" + i + "] in children collection.");
                }
            }
        }
        else {
            if (i == 0) {
                missingFirstKey = true;
            }
            else if (keys.size > 0) {
                throw new Error("Not a virtual node at index: [" + i + "] in children collection.");
            }
        }
    }
    return keys.size > 0;
}
function diffKeyedChildren(oldChildren, newChildren) {
    var setOrMovedChildrenPatches = [];
    var childrenPatches = [];
    var offsetManager = new OffsetManager();
    var oldChildrenMap = new Map();
    for (var i = 0; i < oldChildren.length; ++i) {
        var oldChild = oldChildren[i];
        oldChildrenMap.set(oldChild.key, {
            node: oldChild,
            index: i
        });
    }
    for (var i = 0; i < newChildren.length; ++i) {
        var oldChildBySide = oldChildren[i];
        var newChild = newChildren[i];
        if (!isUndefinedOrNull(oldChildBySide)) {
            if (oldChildBySide.key !== newChild.key) {
                var indexedOldNode = oldChildrenMap.get(newChild.key);
                if (!isUndefinedOrNull(indexedOldNode)) {
                    var _a = indexedOldNode, node = _a.node, index = _a.index;
                    var fromOffset = offsetManager.getOffset(index);
                    setOrMovedChildrenPatches.push(new MoveChildPatch(index, i, fromOffset));
                    offsetManager.addRemoved(index);
                    var elemPatches = diff(node, newChild);
                    if (elemPatches.hasPatches()) {
                        childrenPatches.push(new ChildElementPatches(i, elemPatches));
                    }
                }
                else {
                    setOrMovedChildrenPatches.push(new SetChildPatch(i, newChild));
                }
            }
            else {
                var elemPatches = diff(oldChildBySide, newChild);
                if (elemPatches.hasPatches()) {
                    childrenPatches.push(new ChildElementPatches(i, elemPatches));
                }
            }
        }
        else {
            var indexedOldNode = oldChildrenMap.get(newChild.key);
            if (!isUndefinedOrNull(indexedOldNode)) {
                var _b = indexedOldNode, node = _b.node, index = _b.index;
                setOrMovedChildrenPatches.push(new MoveChildPatch(index, i, 0));
                var elemPatches = diff(node, newChild);
                if (elemPatches.hasPatches()) {
                    childrenPatches.push(new ChildElementPatches(i, elemPatches));
                }
            }
            else {
                setOrMovedChildrenPatches.push(new SetChildPatch(i, newChild));
            }
        }
        setOrMovedChildrenPatches.sort(function (p1, p2) {
            var to1 = typeof p1.index === 'undefined' ?
                p1.to :
                p1.index;
            var to2 = typeof p2.index === 'undefined' ?
                p2.to :
                p2.index;
            return to1 - to2;
        });
    }
    return [setOrMovedChildrenPatches, childrenPatches];
}
function diffNonKeyedChildren(oldChildren, newChildren) {
    var setChildrenPatches = [];
    var childrenPatches = [];
    for (var i = 0; i < newChildren.length; ++i) {
        var oldChild = oldChildren[i];
        var newChild = newChildren[i];
        if (isUndefinedOrNull(oldChild)) {
            setChildrenPatches.push(new SetChildPatch(i, newChild));
        }
        else {
            var childPatches = diff(oldChild, newChild);
            if (childPatches.hasPatches()) {
                childrenPatches.push(new ChildElementPatches(i, childPatches));
            }
        }
    }
    return [setChildrenPatches, childrenPatches];
}
function diff(oldNode, newNode) {
    var _a, _b, _c, _d;
    if (isUndefinedOrNull(newNode)) {
        if (isUndefinedOrNull(oldNode)) {
            return new ElementPatches([], []);
        }
        else {
            if (oldNode.isFragmentNode) {
                if (oldNode.children.length === 0) {
                    return new ElementPatches([], []);
                }
                else {
                    return new ElementPatches([new RemoveChildrenPatch()], []);
                }
            }
            else {
                return new ElementPatches([new RemoveElementPatch()], []);
            }
        }
    }
    if (isUndefinedOrNull(oldNode)) {
        return new ElementPatches([new SetElementPatch(newNode)], []);
    }
    if (isVirtualNode(newNode)) {
        if (isVirtualNode(oldNode)) {
            if (oldNode.name !== newNode.name) {
                return new ElementPatches([new ReplaceElementPatch(newNode)], []);
            }
            else {
                var oldChildren = oldNode.children;
                var newChildren = newNode.children;
                if (newChildren.length === 0) {
                    if (oldChildren.length === 0) {
                        return new ElementPatches(__spreadArrays(diffAttributes(oldNode.props, newNode.props)), []);
                    }
                    else {
                        return new ElementPatches(__spreadArrays(diffAttributes(oldNode.props, newNode.props), [
                            new RemoveChildrenPatch()
                        ]), []);
                    }
                }
                else {
                    if (oldChildren.length === 0) {
                        return new ElementPatches(__spreadArrays(diffAttributes(oldNode.props, newNode.props), [
                            new AddChildrenPatch(newChildren)
                        ]), []);
                    }
                    else {
                        var patches = void 0;
                        var childrenPatches = void 0;
                        if (hasKeys(newChildren)) {
                            _a = diffKeyedChildren(oldChildren, newChildren), patches = _a[0], childrenPatches = _a[1];
                        }
                        else {
                            _b = diffNonKeyedChildren(oldChildren, newChildren), patches = _b[0], childrenPatches = _b[1];
                        }
                        var removeChildrenPatches = [];
                        var childrenToRemoveCount = oldChildren.length - newChildren.length;
                        if (childrenToRemoveCount > 0) {
                            removeChildrenPatches.push(new RemoveChildrenRangePatch(newChildren.length, childrenToRemoveCount));
                        }
                        return new ElementPatches(__spreadArrays(diffAttributes(oldNode.props, newNode.props), patches, removeChildrenPatches), __spreadArrays(childrenPatches));
                    }
                }
            }
        }
        else if (isFragmentNode(oldNode)) {
            if (oldNode.children.length === 0) {
                return new ElementPatches([new SetElementPatch(newNode)], []);
            }
            else {
                return new ElementPatches([
                    new RemoveChildrenPatch(),
                    new SetElementPatch(newNode)
                ], []);
            }
        }
        else {
            return new ElementPatches([new ReplaceElementPatch(newNode)], []);
        }
    }
    else if (isFragmentNode(newNode)) {
        if (newNode.children.length === 0) {
            if (isVirtualNode(oldNode)) {
                return new ElementPatches([new RemoveElementPatch()], []);
            }
            else if (isFragmentNode(oldNode)) {
                if (oldNode.children.length === 0) {
                    return new ElementPatches([], []);
                }
                else {
                    return new ElementPatches([new RemoveChildrenPatch()], []);
                }
            }
            else {
                return new ElementPatches([new RemoveElementPatch()], []);
            }
        }
        else {
            if (isVirtualNode(oldNode)) {
                return new ElementPatches([
                    new RemoveElementPatch(),
                    new SetElementPatch(newNode)
                ], []);
            }
            else if (isFragmentNode(oldNode)) {
                var oldChildren = oldNode.children;
                if (oldChildren.length === 0) {
                    return new ElementPatches([new SetElementPatch(newNode)], []);
                }
                else {
                    newNode.element = oldNode.element;
                    var newChildren = newNode.children;
                    var patches = void 0;
                    var childrenPatches = void 0;
                    if (hasKeys(newChildren)) {
                        _c = diffKeyedChildren(oldChildren, newChildren), patches = _c[0], childrenPatches = _c[1];
                    }
                    else {
                        _d = diffNonKeyedChildren(oldChildren, newChildren), patches = _d[0], childrenPatches = _d[1];
                    }
                    var removeChildrenPatches = [];
                    var childrenToRemoveCount = oldChildren.length - newChildren.length;
                    if (childrenToRemoveCount > 0) {
                        removeChildrenPatches.push(new RemoveChildrenRangePatch(newChildren.length, childrenToRemoveCount));
                    }
                    return new ElementPatches(__spreadArrays(diffAttributes(oldNode.props, newNode.props), patches, removeChildrenPatches), __spreadArrays(childrenPatches));
                }
            }
            else {
                return new ElementPatches([
                    new RemoveElementPatch(),
                    new SetElementPatch(newNode)
                ], []);
            }
        }
    }
    else {
        if (isVirtualNode(oldNode)) {
            return new ElementPatches([new ReplaceElementPatch(newNode)], []);
        }
        else if (isFragmentNode(oldNode)) {
            if (oldNode.children.length === 0) {
                return new ElementPatches([new SetElementPatch(newNode)], []);
            }
            else {
                return new ElementPatches([
                    new RemoveChildrenPatch(),
                    new SetElementPatch(newNode)
                ], []);
            }
        }
        else {
            var oldText = oldNode;
            var newText = newNode;
            if (oldText.text !== newText.text) {
                return new ElementPatches([
                    new SetTextPatch(newText)
                ], []);
            }
            else {
                return new ElementPatches([], []);
            }
        }
    }
}

function mount(rootNode, currentNode, previousNode, node, hooks) {
    var patches = diff(previousNode, currentNode);
    patches.applyPatches(rootNode, node, hooks);
}

const defaultPropertyValueConverter = {
    toProperty: (value, type) => {
        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    },
    toAttribute: (value, type) => {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    }
};

function getComponentMetadata(ctor) {
    const metadata = {
        component: {},
        properties: {},
        state: {}
    };
    const set = new Set(); // To avoid URL duplicates
    while (ctor !== HTMLElement) {
        const { component, properties, state } = ctor;
        const urls = (component || {}).styleUrls || [];
        // Merge the style urls
        urls.forEach(url => {
            if (!set.has(url)) {
                set.add(url);
            }
        });
        // Merge the property descriptors
        metadata.properties = Object.assign(Object.assign({}, metadata.properties), properties);
        // Merge the state descriptor
        metadata.state = Object.assign(Object.assign({}, metadata.state), state);
        ctor = Object.getPrototypeOf(ctor.prototype).constructor;
    }
    metadata.component.styleUrls = Array.from(set);
    return metadata;
}

const MetadataInitializerMixin = Base => class MetadataInitializer extends Base {
    constructor() {
        super();
        this.initialize();
    }
    initialize() {
        const { componentMetadata } = this.constructor;
        const { properties, state } = componentMetadata;
        // Properties
        this.props = {};
        for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
                this.initializeProperty(name, properties[name]);
            }
        }
        // State
        this.state = {};
        for (var name in state) {
            if (state.hasOwnProperty(name)) {
                this.initializeState(name, state[name]);
            }
        }
    }
    initializeProperty(name, propertyDescriptor) {
        const { attribute, // The name of the HTML attribute mapped to the property
        type, // The type of the property
        value, // The default value of the property if no HTML attribute is provided
        mutable, // Whether the value of the property can be changed
        reflect // Whether to reflect the change of the property in its mapped HTML attribute
         } = propertyDescriptor;
        if (value !== undefined) { // Initialize the property to the default value if any
            this.props[name] = value;
        }
        if (mutable === true) { // Generate a setter
            const setter = function (val) {
                const oldValue = this.props[name];
                if (oldValue === val) {
                    return;
                }
                if (reflect) { // This will trigger the attributeChangedCallback
                    this.setAttribute(attribute, defaultPropertyValueConverter.toAttribute(val, type));
                }
                // else {
                //     this.props[name] = val;
                //     this.requestUpdate();
                // }
            };
            var setterName = this.getSetterName(name);
            this[setterName] = setter.bind(this);
        }
    }
    initializeState(name, stateDescriptor) {
        const { value // The default value of the state if no HTML attribute is provided
         } = stateDescriptor;
        if (value !== undefined) { // Initialize the state to the default value if any
            this.state[name] = value;
        }
        const setter = function (newValue) {
            const oldValue = this.state[name];
            if (oldValue === newValue) {
                return;
            }
            console.log(`State: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
            this.state[name] = newValue;
            this.requestUpdate();
        };
        var setterName = this.getSetterName(name);
        this[setterName] = setter.bind(this);
    }
    getSetterName(name) {
        return `set${name[0].toUpperCase()}${name.substring(1)}`;
    }
    static get observedAttributes() {
        this.componentMetadata = getComponentMetadata(this);
        const attributes = [];
        // To index the property descriptor by attribute name
        this.propertiesByAttribute = {};
        const { properties } = this.componentMetadata;
        for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
                const property = properties[name];
                property.name = name; // Add the name so it can be retrieved from the attribute in attributeChangedCallback
                if (property.attribute === undefined) { // Set the name of the attribute as same as the name of the property if no attributes were provided
                    property.attribute = name;
                }
                attributes.push(property.attribute);
                this.propertiesByAttribute[property.attribute] = property; // Index by attribute name
            }
        }
        return attributes;
    }
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (newValue == oldValue) {
            return; // Nothing to update
        }
        console.log(`Attribute: '${attributeName}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
        // Update the internal property
        const propDescriptor = this.constructor.propertiesByAttribute[attributeName];
        this.props[propDescriptor.name] = defaultPropertyValueConverter.toProperty(newValue, propDescriptor.type);
        this.requestUpdate();
    }
};

const VirtualDomComponentMixin = Base => class VirtualDomComponent extends Base {
    constructor() {
        super();
        if (this.nodeDidUpdate !== undefined) {
            this.nodeDidUpdate = this.nodeDidUpdate.bind(this);
        }
    }
    /**
 * The root element of this component
 */
    get rootElement() {
        const element = (this._mountedNode || {}).element;
        if (element === undefined) {
            return element;
        }
        // Once the document fragment is appended to its parent element. It looses all its children, so we need its parent element to apply the diff
        if (element instanceof DocumentFragment) {
            return element.parentElement || this.document;
        }
    }
    update() {
        let node = this.render();
        const nodeType = typeof node;
        const styleUrls = this.constructor.componentMetadata.component.styleUrls;
        const hasStyleUrls = styleUrls !== undefined;
        // If the node is a virtual one or a virtual text and there are styles,
        // then create a fragment node to hold the virtual node/text plus the style one(s)
        let requiresFragment = false;
        if (nodeType === 'string' ||
            nodeType === 'number' ||
            nodeType === 'boolean') {
            node = new VirtualText(node);
            if (hasStyleUrls) {
                requiresFragment = true;
            }
        }
        if (node !== null &&
            node.isVirtualNode &&
            hasStyleUrls) {
            requiresFragment = true;
        }
        if (requiresFragment) {
            node = new FragmentNode(null, [node]);
        }
        if (node !== null &&
            hasStyleUrls) {
            this.applyStyles(node, styleUrls);
        }
        mount(this.document, node, this._mountedNode, this.rootElement, this);
        this._mountedNode = node;
    }
};

class CustomElement extends VirtualDomComponentMixin(MetadataInitializerMixin(HTMLElement)) {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        console.log(`connectedCallback called for custom element: [${this.constructor.name}]`);
        this.requestUpdate();
    }
    requestUpdate() {
        console.log('Requesting update');
        if (this._isUpdating) {
            return;
        }
        requestAnimationFrame(() => {
            this._isUpdating = false;
            this.update();
        });
        this._isUpdating = true;
    }
    /**
     * The DOM document in which this component is updated
     */
    get document() {
        if (this.shadowRoot !== null) {
            return this.shadowRoot;
        }
        // Find the parent that has a shadow root
        let parent = this.parentElement;
        while (parent !== undefined) {
            if (parent.shadowRoot !== null) {
                return parent; // We are not returning the parent's shadow root!
            }
            parent = parent.parentElement;
        }
        return undefined;
    }
    applyStyles(vnode, styleUrls) {
        for (let i = 0; i < styleUrls.length; ++i) {
            vnode.appendChildNode(h("style", null, `@import '${styleUrls[i]}'`));
        }
    }
}

/**
 * General configuration settings for the components
 */
const config = {
    /**
     * The prefix of the tag of components
     */
    tagPrefix: 'gcl',
    /**
     * The folder where the assets files (css, svg, images, etc.) get copied to
     */
    assetsFolder: 'lib/components'
};

class App extends CustomElement {
    connectedCallback() {
        var intlProvider = new IntlProvider(
        /*lang*/
        'en', 
        /*data*/
        {
            'en': {
                'goodMorning': 'Good morning'
            },
            'de': {
                'goodMorning': 'Guten Morgen'
            },
            'fr': {
                'goodMorning': 'Bonjour'
            }
        });
        appCtrl.intlProvider = intlProvider;
        super.connectedCallback();
    }
    render() {
        return (h("slot", null));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-app`, App);

const VariantMixin = Base => { var _a; return _a = class Variant extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const { variant } = this.props;
            return Object.assign(Object.assign({}, cssClass), { [variant]: true });
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/variant/Variant.css`
        ]
    },
    _a.properties = {
        variant: {
            type: String,
            value: 'default',
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };

const SizableMixin = Base => { var _a; return _a = class Sizable extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const { size } = this.props;
            return Object.assign(Object.assign({}, cssClass), { [`size-${size}`]: true });
        }
    },
    _a.properties = {
        size: {
            type: String,
            value: 'medium',
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };

const DirectionMixin = Base => { var _a; return _a = class Direction extends Base {
        getCSSClass() {
            let cssClass;
            if (super.getCSSClass) {
                cssClass = super.getCSSClass();
            }
            const isRtl = this.dir === 'rtl' || document.dir === 'rtl';
            return Object.assign(Object.assign({}, cssClass), { 'rtl': this.props.flipRtl && isRtl });
        }
    },
    _a.properties = {
        flipRtl: {
            attribute: 'flip-rtl',
            type: Boolean,
            value: true,
            mutable: true,
            reflect: true,
            passToChildren: true
        }
    },
    _a; };

const { assetsFolder } = config;
//The path to the icons svg file
const _iconsPath = `${assetsFolder}/icon/assets/bootstrap-icons.svg`;
//@ts-ignore
class Icon extends SizableMixin(VariantMixin(DirectionMixin(CustomElement))) {
    render() {
        const { name } = this.props;
        return (h(Fragment, { class: this.getCSSClass() },
            h("svg", { role: "img" },
                h("use", { href: `${_iconsPath}#${name}` }))));
    }
}
Icon.component = {
    styleUrls: [
        `${assetsFolder}/icon/Icon.css`,
        `${assetsFolder}/mixins/sizable/Sizable-Icon.css`,
        `${assetsFolder}/mixins/direction/Direction-Icon.css`
    ]
};
Icon.properties = {
    name: {
        type: String,
        value: ''
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);

//@ts-ignore
class Text extends VariantMixin(CustomElement) {
    render() {
        const { value } = this.props;
        return (h(Fragment, { class: this.getCSSClass() }, value !== undefined ? value : (h("slot", null))));
    }
    connectedCallback() {
        const { intlKey } = this.props;
        if (intlKey !== undefined) {
            appCtrl.intlProvider.subscribe(this);
            const value = appCtrl.intlProvider.getTranslation(this.lang, intlKey);
            this.setValue(value);
        }
        super.connectedCallback();
    }
    disconnectedCallback() {
        const { intlKey } = this.props;
        if (intlKey) {
            appCtrl.intlProvider.unsubscribe(this);
        }
    }
    onLanguageChanged(provider) {
        this.setValue(provider.getTranslation(this.lang, this.intlKey));
    }
}
Text.component = {
    styleUrls: [
        `${config.assetsFolder}/text/Text.css`
    ]
};
Text.properties = {
    /**
     * The key to retrieve a localized value from an i18n provider
     */
    intlKey: {
        attribute: 'intl-key',
        type: String
    },
    /**
     * The value of the text
     */
    value: {
        type: String,
        mutable: true,
        reflect: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text`, Text);

class Alert extends CustomElement {
    render() {
        const { showIcon, message } = this.props;
        const { visible } = this.state;
        if (visible === false) {
            return null;
        }
        return (h(Fragment, { class: this.getCSSClass() },
            showIcon &&
                h("span", { class: "icon" }, this.getIcon()),
            h("span", { class: "message" }, message || '[Missing message]'),
            h("span", { class: "close-button", onClick: () => {
                    this.setVisible(false);
                } }, "\u00D7")));
    }
    getIcon() {
        const { type, icon } = this.props;
        if (icon) {
            return icon; // Return the configured icon
        }
        switch (type) {
            case "info": return (h("gcl-icon", { name: "info-circle-fill", variant: "primary" }));
            case "success": return (h("gcl-icon", { name: "check-circle-fill", variant: "success" }));
            case "warning": return (h("gcl-icon", { name: "exclamation-circle-fill", variant: "warning" }));
            default: return (h("gcl-icon", { name: "exclamation-circle-fill", variant: "danger" }));
        }
    }
    getCSSClass() {
        const { type } = this.props;
        const { visible } = this.state;
        return {
            //...super.getCSSClass(),
            'alert': true,
            'hidden': !visible,
            [type]: true
        };
    }
}
Alert.component = {
    styleUrls: [
        `${config.assetsFolder}/alert/Alert.css`
    ]
};
Alert.properties = {
    /**
     * The type of the alert
     */
    type: {
        type: String,
        value: 'info' // options: "info" | "success" | "warning" | "error"
    },
    /**
     * The icon of the alert
     */
    icon: {
        type: Icon
    },
    /**
     * Whether to show the icon
     */
    showIcon: {
        type: Boolean,
        value: true
    },
    /**
     * The message of the alert
     */
    message: {
        type: VirtualNode
    }
};
Alert.state = {
    visible: {
        value: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-alert`, Alert);

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

//@ts-ignore
class Button extends PassPropertiesToChildrenMixin(DirectionMixin(VariantMixin(CustomElement))) {
    render() {
        const { type } = this.props;
        return (h("button", { type: type, class: this.getCSSClass(), onClick: this.onclick },
            h("slot", null)));
    }
    getChildNodes(nodeChanges) {
        // Get the first inserted item which is the button component
        const button = nodeChanges.inserted.filter(b => b instanceof HTMLButtonElement)[0];
        const slot = button.querySelector('slot');
        if (slot !== null) {
            return slot.assignedNodes({ flatten: true });
        }
        return [];
    }
}
Button.component = {
    styleUrls: [
        `${config.assetsFolder}/button/Button.css`
    ]
};
Button.properties = {
    /**
     * The type of the button
     */
    type: {
        type: String,
        value: "button" // Options: "button" | "reset" | "submit"
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);

class Table extends CustomElement {
    render() {
        return (h("table", null,
            this.caption || null,
            this.header || this.renderHeader(),
            this.body || this.renderBody(),
            this.footer || null));
    }
    renderHeader() {
        const { columns } = this.props;
        return (h("thead", null,
            h("tr", null, columns.map(c => {
                if (typeof c.renderLabel !== 'undefined') {
                    return (h("th", null, c.renderLabel()));
                }
                else {
                    return (h("th", null, c.title));
                }
            }))));
    }
    renderBody() {
        const { data } = this.props;
        return (h("tbody", null, data.map((record, i) => {
            return this.renderRecord(record, i);
        })));
    }
    renderRecord(record, i) {
        const { rowClick, rowDoubleClick, cellClick } = this.props;
        return (h("tr", { onClick: () => rowClick && rowClick(record, i), onDblClick: () => rowDoubleClick && rowDoubleClick(record, i) }, this.columns.map((c, j) => {
            if (c.render) {
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, c.render(record)));
            }
            else {
                const value = record[c.name];
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, value));
            }
        })));
    }
}
Table.component = {
    styleUrls: [
        `${config.assetsFolder}/table/Table.css`
    ]
};
Table.properties = {
    /**
     * The caption of the table
     */
    caption: {
        type: VirtualNode
    },
    /**
     * The header of the table
     */
    header: {
        type: VirtualNode
    },
    /**
     * The body of the table
     */
    body: {
        type: VirtualNode
    },
    /**
     * The footer of the table
     */
    footer: {
        type: VirtualNode
    },
    /**
     * The definition of the columns of the table
     */
    columns: {
        type: Array // Array<TableColumnDefinition>
    },
    /**
     * The data fed into the table
     */
    data: {
        type: Array
    },
    rowClick: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);

export { Alert, App, Button, Icon, Table, Text };
