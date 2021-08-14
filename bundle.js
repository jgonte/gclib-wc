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

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays$1() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var IntlProvider = (function (_super) {
    __extends$1(IntlProvider, _super);
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

function toTypeOf(typeFunction) {
    switch (typeFunction) {
        case String: return 'string';
        case Boolean: return 'boolean';
        case Number: return 'number';
        case BigInt: return 'bigint';
        default: return 'object';
    }
}
var DataField = (function () {
    function DataField(fieldDescriptor, subscriber) {
        this._observer = new Observer('onValueSet');
        this._fieldDescriptor = fieldDescriptor;
        if (fieldDescriptor.value !== undefined) {
            this.initialize(fieldDescriptor.value);
        }
        this._observer.subscribe(subscriber);
    }
    Object.defineProperty(DataField.prototype, "name", {
        get: function () {
            return this._fieldDescriptor.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataField.prototype, "isId", {
        get: function () {
            return this._fieldDescriptor.isId;
        },
        enumerable: false,
        configurable: true
    });
    DataField.prototype.initialize = function (value) {
        if (value !== undefined &&
            value != null &&
            typeof value !== toTypeOf(this._fieldDescriptor.type)) {
            value = this._fieldDescriptor.converter.fromString(value, this._fieldDescriptor.type);
        }
        this._value = value;
        this._initialValue = value;
    };
    Object.defineProperty(DataField.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            var oldValue = this._value;
            if (value !== undefined &&
                value != null &&
                typeof value !== toTypeOf(this._fieldDescriptor.type)) {
                value = this._fieldDescriptor.converter.fromString(value, this._fieldDescriptor.type);
            }
            this._value = value;
            this._observer.notify(this._fieldDescriptor, this._value, oldValue, this._initialValue);
        },
        enumerable: false,
        configurable: true
    });
    DataField.prototype.reset = function () {
        this.value = this._initialValue;
    };
    return DataField;
}());

var defaultValueConverter = {
    fromString: function (value, type) {
        switch (type) {
            case Boolean:
                return value !== 'false';
            case Number:
                return Number(value);
            case Date:
                return new Date(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    },
    toString: function (value, type) {
        switch (type) {
            case Boolean:
            case Number:
                return value.toString();
            case Date:
                return value.toISOString();
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    }
};

function getType(value) {
    var type = typeof value;
    switch (type) {
        case 'boolean': return Boolean;
        case 'number': return Number;
        case 'bigint': return BigInt;
        case 'string': return String;
        case 'object': {
            if (value instanceof Date) {
                return Date;
            }
            else {
                throw Error("Not implemented for type: '" + type + "'");
            }
        }
        default: throw Error("Not implemented for type: '" + type + "'");
    }
}
var DataRecordDescriptor = (function () {
    function DataRecordDescriptor() {
        this._fieldDescriptors = [];
    }
    Object.defineProperty(DataRecordDescriptor.prototype, "fieldDescriptors", {
        get: function () {
            return this._fieldDescriptors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataRecordDescriptor.prototype, "recordValidators", {
        get: function () {
            return this._recordValidators;
        },
        enumerable: false,
        configurable: true
    });
    DataRecordDescriptor.prototype.getFieldDescriptor = function (name) {
        var descriptors = this._fieldDescriptors.filter(function (d) { return d.name === name; });
        return descriptors.length > 0 ?
            descriptors[0] :
            undefined;
    };
    DataRecordDescriptor.prototype.fromModel = function (model) {
        var recordValidators = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            recordValidators[_i - 1] = arguments[_i];
        }
        for (var key in model) {
            if (model.hasOwnProperty(key)) {
                var _a = model[key], isId = _a.isId, type = _a.type, value = _a.value, converter = _a.converter;
                this.addFieldDescriptor({
                    name: key,
                    isId: isId !== null && isId !== void 0 ? isId : false,
                    type: type !== undefined ? type : value !== undefined ?
                        getType(value) : String,
                    value: value,
                    converter: converter || defaultValueConverter
                });
            }
        }
        this._recordValidators = recordValidators;
    };
    DataRecordDescriptor.prototype.addFieldDescriptor = function (fd) {
        if (fd.converter === undefined) {
            fd.converter = defaultValueConverter;
        }
        this._fieldDescriptors.push(fd);
    };
    DataRecordDescriptor.prototype.removeFieldDescriptor = function (fd) {
        var index = this._fieldDescriptors.indexOf(fd);
        if (index > -1) {
            this._fieldDescriptors.splice(index, 1);
        }
    };
    DataRecordDescriptor.prototype.getId = function (data, fcn) {
        var id = {};
        var idDescriptors = this._fieldDescriptors.filter(function (f) { return f.isId === true; });
        var length = idDescriptors.length;
        var hasUndefinedIdentifiers = false;
        if (length > 0) {
            for (var i = 0; i < length; ++i) {
                var descriptor = idDescriptors[i];
                var name_1 = descriptor.name;
                if (data.hasOwnProperty(name_1)) {
                    var value = fcn !== undefined ? fcn(data[name_1]) : data[name_1];
                    if (value === undefined) {
                        hasUndefinedIdentifiers = true;
                        break;
                    }
                    id[name_1] = value;
                }
                else {
                    id[name_1] = undefined;
                    hasUndefinedIdentifiers = true;
                    break;
                }
            }
            if (hasUndefinedIdentifiers) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var value = fcn !== undefined ? fcn(data[key]) : data[key];
                        id[key] = value;
                    }
                }
            }
        }
        else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = fcn !== undefined ? fcn(data[key]) : data[key];
                    id[key] = value;
                }
            }
        }
        return {
            value: id,
            noDescriptorsId: length === 0,
            hasUndefinedIdentifiers: length > 0 && hasUndefinedIdentifiers === true
        };
    };
    return DataRecordDescriptor;
}());

function areEqual(o1, o2) {
    var type1 = typeof o1;
    var type2 = typeof o2;
    if (type1 !== type2) {
        return false;
    }
    if (type1 == 'object') {
        if (Object.getOwnPropertyNames(o1).length !== Object.getOwnPropertyNames(o2).length) {
            return false;
        }
        for (var prop in o1) {
            if (o1.hasOwnProperty(prop)) {
                if (o2.hasOwnProperty(prop)) {
                    if (typeof o1[prop] === 'object') {
                        if (!areEqual(o1[prop], o2[prop])) {
                            return false;
                        }
                    }
                    else {
                        if (o1[prop] !== o2[prop]) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
    else {
        return o1 === o2;
    }
}

var DataRecord = (function () {
    function DataRecord(recordDescriptor) {
        var _this = this;
        this._fields = {};
        this._modifiedFields = {};
        this._data = undefined;
        this._recordDescriptor = recordDescriptor !== null && recordDescriptor !== void 0 ? recordDescriptor : new DataRecordDescriptor();
        this._recordDescriptor.fieldDescriptors.forEach(function (fd) { return _this._fields[fd.name] = new DataField(fd, _this); });
    }
    DataRecord.prototype.addField = function (fd) {
        this._recordDescriptor.addFieldDescriptor(fd);
        this._fields[fd.name] = new DataField(fd, this);
        return this._fields[fd.name];
    };
    DataRecord.prototype.getField = function (name) {
        return this._fields[name];
    };
    DataRecord.prototype.removeField = function (fd) {
        this._recordDescriptor.removeFieldDescriptor(fd);
        delete this._fields[fd.name];
    };
    DataRecord.prototype.initialize = function (data) {
        var _fields = this._fields;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (_fields.hasOwnProperty(key)) {
                    _fields[key].initialize(data[key]);
                }
                else {
                    console.warn("There is no field for property: '" + key + "' that was passed as data");
                }
            }
        }
        this._id = undefined;
        this._data = undefined;
        this._modifiedFields = {};
    };
    DataRecord.prototype.getData = function () {
        var _a = this, _data = _a._data, _fields = _a._fields;
        if (_data !== undefined) {
            return _data;
        }
        var data = {};
        for (var key in _fields) {
            if (_fields.hasOwnProperty(key)) {
                var value = _fields[key].value;
                if (value != undefined && value != null) {
                    data[key] = value;
                }
            }
        }
        this._data = data;
        return data;
    };
    Object.defineProperty(DataRecord.prototype, "id", {
        get: function () {
            var _fields = this._fields;
            if (this._id === undefined) {
                var idInfo = this._recordDescriptor.getId(_fields, function (f) { return f.value; });
                this._id = idInfo.value;
            }
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataRecord.prototype, "isModified", {
        get: function () {
            return Object.keys(this._modifiedFields).length > 0;
        },
        enumerable: false,
        configurable: true
    });
    DataRecord.prototype.setData = function (data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this._fields[key].value = data[key];
            }
        }
        this._id = undefined;
    };
    DataRecord.prototype.reset = function () {
        if (!this.isModified) {
            return;
        }
        var _fields = this._fields;
        for (var key in _fields) {
            if (_fields.hasOwnProperty(key)) {
                _fields[key].reset();
            }
        }
    };
    DataRecord.prototype.onValueSet = function (descriptor, value, oldValue, initialValue) {
        if (areEqual(value, oldValue)) {
            return;
        }
        var name = descriptor.name;
        var _a = this, _fields = _a._fields, _modifiedFields = _a._modifiedFields;
        if (!areEqual(value, initialValue)) {
            _modifiedFields[name] = _fields[name];
        }
        else {
            delete _modifiedFields[name];
        }
        this._data = undefined;
    };
    return DataRecord;
}());

((function () {
    function DataRecordSet(recordDescriptor) {
        this._records = {};
        this._addedRecords = {};
        this._modifiedRecords = {};
        this._removedRecords = {};
        this._data = undefined;
        this._recordDescriptor = recordDescriptor;
    }
    DataRecordSet.prototype.initialize = function (data) {
        this._records = {};
        for (var i = 0; i < data.length; ++i) {
            var dataRecord = new DataRecord(this._recordDescriptor);
            dataRecord.initialize(data[i]);
            this._records[JSON.stringify(dataRecord.id)] = dataRecord;
        }
        this._addedRecords = {};
        this._modifiedRecords = {};
        this._removedRecords = {};
        this._data = undefined;
    };
    DataRecordSet.prototype.getData = function () {
        var _a = this, _data = _a._data, _records = _a._records, _addedRecords = _a._addedRecords;
        if (_data !== undefined) {
            return _data;
        }
        var data = [];
        for (var key in _records) {
            data.push(_records[key].getData());
        }
        for (var key in _addedRecords) {
            data.push(_addedRecords[key].getData());
        }
        this._data = data;
        return data;
    };
    Object.defineProperty(DataRecordSet.prototype, "isModified", {
        get: function () {
            return Object.keys(this._addedRecords).length > 0 ||
                Object.keys(this._modifiedRecords).length > 0 ||
                Object.keys(this._removedRecords).length > 0;
        },
        enumerable: false,
        configurable: true
    });
    DataRecordSet.prototype.findById = function (id) {
        var strId = typeof id === 'string' ?
            id :
            JSON.stringify(id);
        var record = this._records[strId];
        if (record === undefined) {
            record = this._addedRecords[strId];
        }
        return record;
    };
    DataRecordSet.prototype.set = function (data) {
        var _a;
        var idInfo = (_a = this._recordDescriptor) === null || _a === void 0 ? void 0 : _a.getId(data);
        var value = idInfo.value; idInfo.noDescriptorsId; idInfo.hasUndefinedIdentifiers;
        var idStr = JSON.stringify(value);
        var record = this.findById(idStr);
        if (record !== undefined) {
            record.setData(data);
            if (record.isModified) {
                this._modifiedRecords[idStr] = record;
            }
            else {
                delete this._modifiedRecords[idStr];
            }
        }
        else {
            var removedRecord = this._removedRecords[idStr];
            if (removedRecord !== undefined) {
                delete this._removedRecords[idStr];
                this._records[idStr] = removedRecord;
            }
            else {
                var newRecord = new DataRecord(this._recordDescriptor);
                newRecord.id = value;
                newRecord.initialize(data);
                this._addedRecords[idStr] = newRecord;
            }
        }
        this._data = undefined;
    };
    DataRecordSet.prototype.update = function (oldData, newData) {
        var _a;
        var idInfo = (_a = this._recordDescriptor) === null || _a === void 0 ? void 0 : _a.getId(oldData);
        var value = idInfo.value; idInfo.noDescriptorsId; idInfo.hasUndefinedIdentifiers;
        var idStr = JSON.stringify(value);
        var record = this.findById(idStr);
        if (record !== undefined) {
            if (this._addedRecords[idStr] !== undefined) {
                record.initialize(newData);
                delete this._addedRecords[idStr];
                var newIdStr = JSON.stringify(record.id);
                this._addedRecords[newIdStr] = record;
            }
            else {
                record.setData(newData);
                delete this._records[idStr];
                var newIdStr = JSON.stringify(record.id);
                this._records[newIdStr] = record;
                if (record.isModified) {
                    this._modifiedRecords[newIdStr] = record;
                }
                else {
                    delete this._modifiedRecords[newIdStr];
                }
            }
        }
        this._data = undefined;
    };
    DataRecordSet.prototype.remove = function (data) {
        var _a;
        var idInfo = (_a = this._recordDescriptor) === null || _a === void 0 ? void 0 : _a.getId(data);
        var value = idInfo.value; idInfo.noDescriptorsId; idInfo.hasUndefinedIdentifiers;
        var idStr = JSON.stringify(value);
        var record = this.findById(idStr);
        if (record !== undefined) {
            if (this._addedRecords[idStr] !== undefined) {
                delete this._addedRecords[idStr];
            }
            else {
                delete this._records[idStr];
                this._removedRecords[idStr] = record;
            }
            this._data = undefined;
        }
    };
    DataRecordSet.prototype.reset = function () {
        if (!this.isModified) {
            return;
        }
        this._addedRecords = {};
        for (var key in this._removedRecords) {
            var removedRecord = this._removedRecords[key];
            delete this._removedRecords[key];
            this._records[key] = removedRecord;
        }
        for (var key in this._records) {
            var record = this._records[key];
            record.reset();
        }
        this._modifiedRecords = {};
        this._data = undefined;
    };
    DataRecordSet.prototype.commit = function (callback) {
        if (!this.isModified) {
            return;
        }
        var addedRecords = Object.values(this._addedRecords).map(function (r) { return r.getData(); });
        var modifiedRecords = Object.values(this._modifiedRecords).map(function (r) { return r.getData(); });
        var removedRecords = Object.values(this._removedRecords).map(function (r) { return r.getData(); });
        callback(addedRecords, modifiedRecords, removedRecords);
        this.initialize(this._data);
    };
    return DataRecordSet;
})());

function template(text, data) {
    var result = {
        keysNotInData: []
    };
    if (!data) {
        result.text = text;
        return result;
    }
    result.keysNotInData = Object.keys(data);
    function processMatch(match, offset, str) {
        var key = match
            .replace('{{', '')
            .replace('}}', '')
            .trim();
        if (data.hasOwnProperty(key)) {
            var index = result.keysNotInData.indexOf(key);
            if (index > -1) {
                result.keysNotInData.splice(index, 1);
            }
            return data[key];
        }
        else {
            return match;
        }
    }
    result.text = text.replace(/\{{\S+?\}}/g, processMatch);
    return result;
}

var Validator = (function () {
    function Validator(options) {
        this.message = options === null || options === void 0 ? void 0 : options.message;
    }
    Validator.prototype.emitErrors = function (context, data) {
        var result = template(this.message, data);
        context.errors.push(result.text);
    };
    Validator.prototype.emitWarnings = function (context, data) {
        var result = template(this.message, data);
        context.warnings.push(result.text);
    };
    return Validator;
}());

var SingleValueFieldValidator = (function (_super) {
    __extends$1(SingleValueFieldValidator, _super);
    function SingleValueFieldValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SingleValueFieldValidator;
}(Validator));

var RequiredValidator = (function (_super) {
    __extends$1(RequiredValidator, _super);
    function RequiredValidator(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        if (options.message === undefined) {
            options.message = '{{label}} is required';
        }
        _this = _super.call(this, options) || this;
        _this.allowEmpty = options.allowEmpty || false;
        return _this;
    }
    RequiredValidator.prototype.validate = function (context) {
        var label = context.label, value = context.value;
        var valid = !(value === undefined || value === null);
        if (valid === true && this.allowEmpty === false) {
            valid = value !== '';
        }
        if (!valid) {
            this.emitErrors(context, { label: label });
        }
        return valid;
    };
    return RequiredValidator;
}(SingleValueFieldValidator));

var RegexValidator = (function (_super) {
    __extends$1(RegexValidator, _super);
    function RegexValidator(options) {
        var _this = _super.call(this, options) || this;
        _this._regex = options.regex;
        return _this;
    }
    RegexValidator.prototype.validate = function (context) {
        var label = context.label, value = context.value;
        if (value === undefined) {
            return true;
        }
        var valid = this._regex.test(value);
        if (!valid) {
            this.emitErrors(context, { label: label });
        }
        return valid;
    };
    return RegexValidator;
}(SingleValueFieldValidator));

((function (_super) {
    __extends$1(EmailValidator, _super);
    function EmailValidator(options) {
        if (options === void 0) { options = {
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: '{{label}} is invalid'
        }; }
        return _super.call(this, options) || this;
    }
    return EmailValidator;
})(RegexValidator));

((function (_super) {
    __extends$1(RangeValidator, _super);
    function RangeValidator(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        if (options.message === undefined) {
            options.message = '{{label}} is not in range from :{{minValue}} to {{maxValue}}';
        }
        _this = _super.call(this, options) || this;
        _this.minValue = options.minValue;
        _this.maxValue = options.maxValue;
        return _this;
    }
    RangeValidator.prototype.validate = function (context) {
        var label = context.label, value = context.value;
        var _a = this, minValue = _a.minValue, maxValue = _a.maxValue;
        var valid = value >= minValue && value <= maxValue;
        if (!valid) {
            this.emitErrors(context, { label: label });
        }
        return valid;
    };
    return RangeValidator;
})(SingleValueFieldValidator));

((function (_super) {
    __extends$1(CustomSingleValueFieldValidator, _super);
    function CustomSingleValueFieldValidator(options) {
        var _this = _super.call(this, options) || this;
        _this.validateFcn = options.validateFcn;
        return _this;
    }
    CustomSingleValueFieldValidator.prototype.validate = function (context) {
        var label = context.label, value = context.value;
        var valid = this.validateFcn.call(this, value);
        if (!valid) {
            this.emitErrors(context, { label: label });
        }
        return valid;
    };
    return CustomSingleValueFieldValidator;
})(SingleValueFieldValidator));

var RecordValidator = (function (_super) {
    __extends$1(RecordValidator, _super);
    function RecordValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordValidator.prototype.getData = function (context) {
        var dataProvider = context.dataProvider;
        return dataProvider.getData();
    };
    return RecordValidator;
}(Validator));

((function (_super) {
    __extends$1(CompareValidator, _super);
    function CompareValidator(options) {
        var _this = _super.call(this, options) || this;
        _this._propertyToValidate = options.propertyToValidate;
        _this._propertyToCompare = options.propertyToCompare;
        _this._operator = options.operator;
        return _this;
    }
    CompareValidator.prototype.validate = function (context) {
        var _a = this, _propertyToValidate = _a._propertyToValidate, _propertyToCompare = _a._propertyToCompare, _operator = _a._operator;
        var data = this.getData(context);
        var valueToValidate = data[_propertyToValidate];
        var valueToCompare = data[_propertyToCompare];
        var valid = this._compare(valueToValidate, valueToCompare, _operator);
        if (!valid) {
            this.emitErrors(context, {
                propertyToValidate: _propertyToValidate,
                valueToValidate: valueToValidate,
                propertyToCompare: _propertyToCompare,
                valueToCompare: valueToCompare,
                operator: _operator
            });
        }
        return valid;
    };
    CompareValidator.prototype._compare = function (valueToValidate, valueToCompare, operator) {
        switch (operator) {
            case 1: return valueToValidate === valueToCompare;
            case 2: return valueToValidate !== valueToCompare;
            case 3: return valueToValidate > valueToCompare;
            case 4: return valueToValidate >= valueToCompare;
            case 5: return valueToValidate < valueToCompare;
            case 6: return valueToValidate <= valueToCompare;
            default: throw Error("Invalid comparison operator: " + operator);
        }
    };
    return CompareValidator;
})(RecordValidator));

((function (_super) {
    __extends$1(CustomRecordValidator, _super);
    function CustomRecordValidator(options) {
        var _this = _super.call(this, options) || this;
        _this.validateFcn = options.validateFcn;
        return _this;
    }
    CustomRecordValidator.prototype.validate = function (context) {
        var data = this.getData(context);
        var valid = this.validateFcn.call(this, data);
        if (!valid) {
            this.emitErrors(context, {});
        }
        return valid;
    };
    return CustomRecordValidator;
})(RecordValidator));

function deserializeXmlDocument(document) {
    var o = {};
    var childNodes = document.documentElement.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; ++i) {
        var childNode = childNodes[i];
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            o[childNode.nodeName] = childNode.childNodes[0].nodeValue;
        }
    }
    return o;
}

var Fetcher = (function () {
    function Fetcher(callbacks) {
        var onResponse = callbacks.onResponse, onError = callbacks.onError, onData = callbacks.onData;
        if (onResponse !== undefined) {
            this.onResponse = onResponse.bind(this);
        }
        if (onError !== undefined) {
            this.onError = onError.bind(this);
        }
        if (onData !== undefined) {
            this.onData = onData.bind(this);
        }
    }
    Fetcher.prototype.fetch = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, method, cors, authProvider, url, response, _b, _c, error_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = request.method, method = _a === void 0 ? 'GET' : _a, cors = request.cors, authProvider = request.authProvider;
                        url = this.buildUrl(request);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        _b = fetch;
                        _c = [url];
                        _d = {
                            method: method
                        };
                        return [4, this.buildHeaders(request)];
                    case 2: return [4, _b.apply(void 0, _c.concat([(_d.headers = _e.sent(),
                                _d.body = this.buildBody(request),
                                _d.mode = cors === false ? 'same-origin' : 'cors',
                                _d.credentials = authProvider !== undefined ? 'include' : undefined,
                                _d)]))];
                    case 3:
                        response = _e.sent();
                        if (!(response.status != 204)) return [3, 5];
                        return [4, this.processResponse(response)];
                    case 4: return [2, _e.sent()];
                    case 5: return [3, 7];
                    case 6:
                        error_1 = _e.sent();
                        this.handleError(error_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    Fetcher.prototype.buildUrl = function (request) {
        var url = request.url, params = request.params;
        var _a = template(url, params), text = _a.text, keysNotInData = _a.keysNotInData;
        var queryParams = keysNotInData
            .map(function (key) { return key + "=" + params[key]; })
            .join('&');
        return text.indexOf('?') > -1 ? text + "&" + queryParams : text + "?" + queryParams;
    };
    Fetcher.prototype.buildHeaders = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, key, headers, key, authHeader, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = request.headers || {};
                        for (key in requestHeaders) {
                            if (key.toLowerCase() === 'content-type') ;
                        }
                        headers = new Headers();
                        for (key in requestHeaders) {
                            if (requestHeaders.hasOwnProperty(key)) {
                                headers.append(key, requestHeaders[key]);
                            }
                        }
                        if (!(request.authProvider !== undefined)) return [3, 2];
                        return [4, request.authProvider.authorize()];
                    case 1:
                        authHeader = _a.sent();
                        if (authHeader != undefined) {
                            for (key in authHeader) {
                                if (authHeader.hasOwnProperty(key)) {
                                    headers.append(key, authHeader[key]);
                                }
                            }
                        }
                        _a.label = 2;
                    case 2: return [2, headers];
                }
            });
        });
    };
    Fetcher.prototype.buildBody = function (request) {
        var data = request.data;
        if (data === undefined) {
            return undefined;
        }
        var formData = new FormData();
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];
                if (typeof value === 'object') {
                    if (value.hasOwnProperty('name')) {
                        var name_1 = value.name, type = value.type, content = value.content;
                        var file = new File(__spreadArrays$1(content), name_1, {
                            type: type
                        });
                        formData.append(key, file);
                    }
                    else {
                        throw Error("Invalid form value: " + JSON.stringify(value));
                    }
                }
                else {
                    formData.append(key, value);
                }
            }
        }
        return formData;
    };
    Fetcher.prototype.processResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var error, data;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.onResponse) {
                            this.onResponse(response);
                        }
                        if (!(response.status > 299)) return [3, 2];
                        _a = {
                            status: response.status,
                            statusText: response.statusText
                        };
                        return [4, this.parseContent(response)];
                    case 1:
                        error = (_a.payload = _c.sent(),
                            _a);
                        this.handleError(error);
                        return [2];
                    case 2:
                        _b = {
                            headers: response.headers
                        };
                        return [4, this.parseContent(response)];
                    case 3:
                        data = (_b.payload = _c.sent(),
                            _b);
                        if (this.onData !== undefined) {
                            this.onData(data);
                        }
                        return [2, data];
                }
            });
        });
    };
    Fetcher.prototype.parseContent = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, content, document_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentType = response.headers.get('content-type');
                        return [4, response.text()];
                    case 1:
                        content = _a.sent();
                        if (contentType !== null) {
                            contentType = contentType.split(';')[0].trim();
                            switch (contentType) {
                                case 'application/json': return [2, JSON.parse(content)];
                                case 'application/xml': {
                                    document_1 = (new window.DOMParser()).parseFromString(content, "text/xml");
                                    return [2, deserializeXmlDocument(document_1)];
                                }
                                default: return [2, content];
                            }
                        }
                        else {
                            return [2, content];
                        }
                }
            });
        });
    };
    Fetcher.prototype.handleError = function (error) {
        if (this.onError !== undefined) {
            this.onError(error);
        }
        else {
            throw error;
        }
    };
    return Fetcher;
}());

var SelectUrlBuilder = (function () {
    function SelectUrlBuilder(cfg) {
        if (cfg === void 0) { cfg = {}; }
        this.selectProperty = cfg.selectProperty || "$select";
    }
    SelectUrlBuilder.prototype.build = function (cfg) {
        var url = cfg.url, select = cfg.select;
        var selectProperty = this.selectProperty;
        if (select !== undefined && select.length > 0) {
            var fieldList = selectProperty + "=" + select.join(',');
            return url.indexOf('?') > -1 ? url + "&" + fieldList : url + "?" + fieldList;
        }
        return url;
    };
    return SelectUrlBuilder;
}());

var SingleRecordLoader = (function (_super) {
    __extends$1(SingleRecordLoader, _super);
    function SingleRecordLoader(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.urlBuilder = new SelectUrlBuilder(cfg.urlBuilder);
        return _this;
    }
    SingleRecordLoader.prototype.load = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch(__assign(__assign({}, request), { url: this.urlBuilder.build(request) }))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return SingleRecordLoader;
}(Fetcher));

var CollectionUrlBuilder = (function (_super) {
    __extends$1(CollectionUrlBuilder, _super);
    function CollectionUrlBuilder(cfg) {
        if (cfg === void 0) { cfg = {}; }
        var _this = _super.call(this, cfg) || this;
        _this.topProperty = cfg.topProperty || "$top";
        _this.skipProperty = cfg.skipProperty || "$skip";
        _this.filterProperty = cfg.filterProperty || "$filter";
        _this.orderByProperty = cfg.orderByProperty || "$orderby";
        return _this;
    }
    CollectionUrlBuilder.prototype.build = function (cfg) {
        var qs = [];
        var top = cfg.top, skip = cfg.skip, filter = cfg.filter, orderBy = cfg.orderBy;
        var _a = this, topProperty = _a.topProperty, skipProperty = _a.skipProperty, filterProperty = _a.filterProperty, orderByProperty = _a.orderByProperty;
        var url = _super.prototype.build.call(this, cfg);
        if (top !== undefined) {
            qs.push(topProperty + "=" + top);
        }
        if (skip !== undefined && skip > 0) {
            qs.push(skipProperty + "=" + skip);
        }
        if (filter !== undefined) {
            qs.push(filterProperty + "=" + filter.build());
        }
        if (orderBy !== undefined && orderBy.length > 0) {
            qs.push(orderByProperty + "=" + orderBy.map(function (item) { return item.field + " " + item.order; }).join(', '));
        }
        if (qs.length > 0) {
            return url.indexOf('?') > -1 ? url + "&" + qs.join('&') : url + "?" + qs.join('&');
        }
        else {
            return url;
        }
    };
    return CollectionUrlBuilder;
}(SelectUrlBuilder));

var CollectionLoader = (function (_super) {
    __extends$1(CollectionLoader, _super);
    function CollectionLoader(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.urlBuilder = new CollectionUrlBuilder(cfg.urlBuilder);
        return _this;
    }
    CollectionLoader.prototype.load = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch(__assign(__assign({}, request), { url: this.urlBuilder.build(request) }))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CollectionLoader;
}(Fetcher));

var ComparisonOperators = {
    IsEqual: 'eq',
    IsNotEqual: 'ne',
    IsGreaterThan: 'gt',
    IsGreaterThanOrEqual: 'ge',
    IsLessThan: 'lt',
    IsLessThanOrEqual: 'le'
};

var LogicalOperators = {
    Not: 'not',
    And: 'and',
    Or: 'or'
};

var MultiValueOperators = {
    In: 'in',
    NotIn: 'not in'
};

var StringFunctions = {
    Contains: 'contains',
    StartsWith: 'startswith',
    EndsWith: 'endswith'
};

var ComparisonFilter = (function () {
    function ComparisonFilter(field, operator, value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
    ComparisonFilter.prototype.build = function () {
        if (this.field === undefined) {
            throw Error("Comparison filter with operator: '" + this.operator + "' requires a field.");
        }
        if (this.value === undefined) {
            throw new Error("Comparison filter for field: '" + this.field + "' requires a value.");
        }
        var value = typeof this.value === 'number' ? this.value : "'" + this.value + "'";
        return this.field + " " + this.operator + " " + value;
    };
    return ComparisonFilter;
}());
var IsEqualFilter = (function (_super) {
    __extends$1(IsEqualFilter, _super);
    function IsEqualFilter(field, value) {
        var _this = _super.call(this, field, 'eq', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsEqualFilter;
}(ComparisonFilter));
var IsNotEqualFilter = (function (_super) {
    __extends$1(IsNotEqualFilter, _super);
    function IsNotEqualFilter(field, value) {
        var _this = _super.call(this, field, 'ne', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsNotEqualFilter;
}(ComparisonFilter));
var IsGreaterThanFilter = (function (_super) {
    __extends$1(IsGreaterThanFilter, _super);
    function IsGreaterThanFilter(field, value) {
        var _this = _super.call(this, field, 'gt', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsGreaterThanFilter;
}(ComparisonFilter));
var IsGreaterOrEqualFilter = (function (_super) {
    __extends$1(IsGreaterOrEqualFilter, _super);
    function IsGreaterOrEqualFilter(field, value) {
        var _this = _super.call(this, field, 'ge', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsGreaterOrEqualFilter;
}(ComparisonFilter));
var IsLessThanFilter = (function (_super) {
    __extends$1(IsLessThanFilter, _super);
    function IsLessThanFilter(field, value) {
        var _this = _super.call(this, field, 'lt', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsLessThanFilter;
}(ComparisonFilter));
var IsLessOrEqualFilter = (function (_super) {
    __extends$1(IsLessOrEqualFilter, _super);
    function IsLessOrEqualFilter(field, value) {
        var _this = _super.call(this, field, 'le', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return IsLessOrEqualFilter;
}(ComparisonFilter));

var LogicalFilter = (function () {
    function LogicalFilter(operator, filters) {
        this.operator = operator;
        this.filters = filters;
    }
    LogicalFilter.prototype.build = function () {
        var filters = this.filters;
        if (!filters.length) {
            throw new Error("Operator: '" + this.operator + "' requires at least one child filter.");
        }
        return this.filters.map(function (item) { return item.build(); }).join(" " + this.operator + " ");
    };
    return LogicalFilter;
}());
var AndFilter = (function (_super) {
    __extends$1(AndFilter, _super);
    function AndFilter(filters) {
        var _this = _super.call(this, 'and', filters) || this;
        _this.filters = filters;
        return _this;
    }
    return AndFilter;
}(LogicalFilter));
var OrFilter = (function (_super) {
    __extends$1(OrFilter, _super);
    function OrFilter(filters) {
        var _this = _super.call(this, 'or', filters) || this;
        _this.filters = filters;
        return _this;
    }
    return OrFilter;
}(LogicalFilter));

var MultiValueFilter = (function () {
    function MultiValueFilter(field, operator, values) {
        this.field = field;
        this.operator = operator;
        this.values = values;
    }
    MultiValueFilter.prototype.build = function () {
        if (this.field === undefined) {
            throw Error('Multivalue filter requires a field name.');
        }
        var values = this.values.map(function (v) { return (typeof v === 'number' ? v : "'" + v + "'"); }).join(', ');
        return this.field + " " + this.operator + " (" + values + ")";
    };
    return MultiValueFilter;
}());
var InFilter = (function (_super) {
    __extends$1(InFilter, _super);
    function InFilter(field, values) {
        var _this = _super.call(this, field, 'in', values) || this;
        _this.field = field;
        _this.values = values;
        return _this;
    }
    return InFilter;
}(MultiValueFilter));
var NotInFilter = (function (_super) {
    __extends$1(NotInFilter, _super);
    function NotInFilter(field, values) {
        var _this = _super.call(this, field, 'not in', values) || this;
        _this.field = field;
        _this.values = values;
        return _this;
    }
    return NotInFilter;
}(MultiValueFilter));

var NotFilter = (function () {
    function NotFilter(filter) {
        this.filter = filter;
    }
    NotFilter.prototype.build = function () {
        if (this.filter === undefined) {
            throw Error("'Not' filter requires one child filter.");
        }
        var childFilter = this.filter.build();
        return "not " + childFilter;
    };
    return NotFilter;
}());

var StringFilter = (function () {
    function StringFilter(field, fcn, value) {
        this.field = field;
        this.fcn = fcn;
        this.value = value;
    }
    StringFilter.prototype.build = function () {
        if (!this.field) {
            throw new Error("String filter with function: '" + this.fcn + "' requires a field.");
        }
        if (!this.value) {
            throw new Error("String filter for field: '" + this.field + "' requires a value.");
        }
        return this.fcn + "(" + this.field + ", " + ("'" + this.value + "'") + ")";
    };
    return StringFilter;
}());
var ContainsStringFilter = (function (_super) {
    __extends$1(ContainsStringFilter, _super);
    function ContainsStringFilter(field, value) {
        var _this = _super.call(this, field, 'contains', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return ContainsStringFilter;
}(StringFilter));
var StartsWithStringFilter = (function (_super) {
    __extends$1(StartsWithStringFilter, _super);
    function StartsWithStringFilter(field, value) {
        var _this = _super.call(this, field, 'startswith', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return StartsWithStringFilter;
}(StringFilter));
var EndsWithStringFilter = (function (_super) {
    __extends$1(EndsWithStringFilter, _super);
    function EndsWithStringFilter(field, value) {
        var _this = _super.call(this, field, 'endswith', value) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    return EndsWithStringFilter;
}(StringFilter));

function createFilter(filter) {
    var operator = filter.operator.trim().toLowerCase();
    switch (operator) {
        case LogicalOperators.And:
            return new AndFilter(filter.filters.map(function (f) { return createFilter(f); }));
        case LogicalOperators.Or:
            return new OrFilter(filter.filters.map(function (f) { return createFilter(f); }));
        case LogicalOperators.Not:
            return new NotFilter(createFilter(filter.filter));
        case MultiValueOperators.In:
            {
                var values = typeof filter.values === 'function' ?
                    filter.values() :
                    filter.values;
                return new InFilter(filter.field, values);
            }
        case MultiValueOperators.NotIn:
            {
                var values = typeof filter.values === 'function' ?
                    filter.values() :
                    filter.values;
                return new NotInFilter(filter.field, values);
            }
        case ComparisonOperators.IsEqual:
            return new IsEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsNotEqual:
            return new IsNotEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsGreaterThan:
            return new IsGreaterThanFilter(filter.field, filter.value);
        case ComparisonOperators.IsGreaterThanOrEqual:
            return new IsGreaterOrEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsLessThan:
            return new IsLessThanFilter(filter.field, filter.value);
        case ComparisonOperators.IsLessThanOrEqual:
            return new IsLessOrEqualFilter(filter.field, filter.value);
        case StringFunctions.Contains:
            return new ContainsStringFilter(filter.field, filter.value);
        case StringFunctions.StartsWith:
            return new StartsWithStringFilter(filter.field, filter.value);
        case StringFunctions.EndsWith:
            return new EndsWithStringFilter(filter.field, filter.value);
        default: throw new Error("Unknown operator: '" + filter.operator + "' in filter.");
    }
}

var cache = {};
var resourceLoader = {
    get: function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var content, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = cache[path];
                        if (content !== undefined) {
                            return [2, content];
                        }
                        return [4, fetch(path)];
                    case 1:
                        response = _a.sent();
                        return [4, response.text()];
                    case 2:
                        content = _a.sent();
                        cache[path] = content;
                        return [2, content];
                }
            });
        });
    }
};

var Router = (function (_super) {
    __extends$1(Router, _super);
    function Router(routes) {
        var _this = _super.call(this, 'onRouteChanged') || this;
        _this.routes = [];
        _this.routes = routes;
        _this.onRouteChange = _this.onRouteChange.bind(_this);
        window.addEventListener('hashchange', _this.onRouteChange);
        return _this;
    }
    Router.prototype.initialize = function () {
        var currentPath = window.location.hash.substr(1);
        var route = this.routes.filter(function (r) { return r.path === currentPath; })[0];
        if (route === undefined) {
            route = this.routes.filter(function (r) { return r.default === true; })[0];
            window.location.hash = "#" + route.path;
        }
        else {
            this.notify(route);
        }
    };
    Router.prototype.onRouteChange = function (event) {
        var currentPath = window.location.hash.substr(1);
        var route = this.routes.filter(function (r) { return r.path === currentPath; })[0];
        this.notify(route);
    };
    Router.prototype.navigate = function (path) {
        if (path === undefined) {
            var route = this.routes.filter(function (r) { return r.default === true; })[0];
            window.location.hash = "#" + route.path;
        }
        else {
            var route = this.routes.filter(function (r) { return r.path === path; })[0];
            window.location.hash = route !== undefined ? "#" + route.path : '#/notFound';
        }
    };
    return Router;
}(Observer));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var oidcClient_min = createCommonjsModule(function (module, exports) {
!function t(e,r){module.exports=r();}(commonjsGlobal,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n});},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function e(){return t.default}:function e(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=22)}([function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i={debug:function t(){},info:function t(){},warn:function t(){},error:function t(){}},o=void 0,s=void 0;(e.Log=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.reset=function t(){s=3,o=i;},t.debug=function t(){if(s>=4){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.debug.apply(o,Array.from(r));}},t.info=function t(){if(s>=3){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.info.apply(o,Array.from(r));}},t.warn=function t(){if(s>=2){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.warn.apply(o,Array.from(r));}},t.error=function t(){if(s>=1){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.error.apply(o,Array.from(r));}},n(t,null,[{key:"NONE",get:function t(){return 0}},{key:"ERROR",get:function t(){return 1}},{key:"WARN",get:function t(){return 2}},{key:"INFO",get:function t(){return 3}},{key:"DEBUG",get:function t(){return 4}},{key:"level",get:function t(){return s},set:function t(e){if(!(0<=e&&e<=4))throw new Error("Invalid log level");s=e;}},{key:"logger",get:function t(){return o},set:function t(e){if(!e.debug&&e.info&&(e.debug=e.info),!(e.debug&&e.info&&e.warn&&e.error))throw new Error("Invalid logger");o=e;}}]),t}()).reset();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i={setInterval:function(t){function e(e,r){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t,e){return setInterval(t,e)})),clearInterval:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return clearInterval(t)}))},o=!1,s=null;e.Global=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t._testing=function t(){o=!0;},t.setXMLHttpRequest=function t(e){s=e;},n(t,null,[{key:"location",get:function t(){if(!o)return location}},{key:"localStorage",get:function t(){if(!o&&"undefined"!=typeof window)return localStorage}},{key:"sessionStorage",get:function t(){if(!o&&"undefined"!=typeof window)return sessionStorage}},{key:"XMLHttpRequest",get:function t(){if(!o&&"undefined"!=typeof window)return s||XMLHttpRequest}},{key:"timer",get:function t(){if(!o)return i}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.MetadataService=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(7);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=".well-known/openid-configuration";e.MetadataService=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.JsonService;if(s(this,t),!e)throw i.Log.error("MetadataService: No settings passed to MetadataService"),new Error("settings");this._settings=e,this._jsonService=new r(["application/jwk-set+json"]);}return t.prototype.resetSigningKeys=function t(){this._settings=this._settings||{},this._settings.signingKeys=void 0;},t.prototype.getMetadata=function t(){var e=this;return this._settings.metadata?(i.Log.debug("MetadataService.getMetadata: Returning metadata from settings"),Promise.resolve(this._settings.metadata)):this.metadataUrl?(i.Log.debug("MetadataService.getMetadata: getting metadata from",this.metadataUrl),this._jsonService.getJson(this.metadataUrl).then((function(t){i.Log.debug("MetadataService.getMetadata: json received");var r=e._settings.metadataSeed||{};return e._settings.metadata=Object.assign({},r,t),e._settings.metadata}))):(i.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings"),Promise.reject(new Error("No authority or metadataUrl configured on settings")))},t.prototype.getIssuer=function t(){return this._getMetadataProperty("issuer")},t.prototype.getAuthorizationEndpoint=function t(){return this._getMetadataProperty("authorization_endpoint")},t.prototype.getUserInfoEndpoint=function t(){return this._getMetadataProperty("userinfo_endpoint")},t.prototype.getTokenEndpoint=function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this._getMetadataProperty("token_endpoint",e)},t.prototype.getCheckSessionIframe=function t(){return this._getMetadataProperty("check_session_iframe",!0)},t.prototype.getEndSessionEndpoint=function t(){return this._getMetadataProperty("end_session_endpoint",!0)},t.prototype.getRevocationEndpoint=function t(){return this._getMetadataProperty("revocation_endpoint",!0)},t.prototype.getKeysEndpoint=function t(){return this._getMetadataProperty("jwks_uri",!0)},t.prototype._getMetadataProperty=function t(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i.Log.debug("MetadataService.getMetadataProperty for: "+e),this.getMetadata().then((function(t){if(i.Log.debug("MetadataService.getMetadataProperty: metadata recieved"),void 0===t[e]){if(!0===r)return void i.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property "+e);throw i.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property "+e),new Error("Metadata does not contain property "+e)}return t[e]}))},t.prototype.getSigningKeys=function t(){var e=this;return this._settings.signingKeys?(i.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings"),Promise.resolve(this._settings.signingKeys)):this._getMetadataProperty("jwks_uri").then((function(t){return i.Log.debug("MetadataService.getSigningKeys: jwks_uri received",t),e._jsonService.getJson(t).then((function(t){if(i.Log.debug("MetadataService.getSigningKeys: key set received",t),!t.keys)throw i.Log.error("MetadataService.getSigningKeys: Missing keys on keyset"),new Error("Missing keys on keyset");return e._settings.signingKeys=t.keys,e._settings.signingKeys}))}))},n(t,[{key:"metadataUrl",get:function t(){return this._metadataUrl||(this._settings.metadataUrl?this._metadataUrl=this._settings.metadataUrl:(this._metadataUrl=this._settings.authority,this._metadataUrl&&this._metadataUrl.indexOf(a)<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=a))),this._metadataUrl}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.UrlUtility=void 0;var n=r(0),i=r(1);e.UrlUtility=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.addQueryParam=function t(e,r,n){return e.indexOf("?")<0&&(e+="?"),"?"!==e[e.length-1]&&(e+="&"),e+=encodeURIComponent(r),e+="=",e+=encodeURIComponent(n)},t.parseUrlFragment=function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.Global;"string"!=typeof e&&(e=o.location.href);var s=e.lastIndexOf(r);s>=0&&(e=e.substr(s+1)),"?"===r&&(s=e.indexOf("#"))>=0&&(e=e.substr(0,s));for(var a,u={},c=/([^&=]+)=([^&]*)/g,h=0;a=c.exec(e);)if(u[decodeURIComponent(a[1])]=decodeURIComponent(a[2].replace(/\+/g," ")),h++>50)return n.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters",e),{error:"Response exceeded expected number of parameters"};for(var l in u)return u;return {}},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.JoseUtil=void 0;var n=r(26),i=function o(t){return t&&t.__esModule?t:{default:t}}(r(33));e.JoseUtil=(0, i.default)({jws:n.jws,KeyUtil:n.KeyUtil,X509:n.X509,crypto:n.crypto,hextob64u:n.hextob64u,b64tohex:n.b64tohex,AllowedSigningAlgs:n.AllowedSigningAlgs});},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.OidcClientSettings=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=r(0),s=r(23),a=r(6),u=r(24),c=r(2);function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var l=".well-known/openid-configuration",f="id_token",g="openid",d="client_secret_post";e.OidcClientSettings=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.authority,i=e.metadataUrl,o=e.metadata,l=e.signingKeys,p=e.metadataSeed,v=e.client_id,y=e.client_secret,m=e.response_type,_=void 0===m?f:m,S=e.scope,b=void 0===S?g:S,w=e.redirect_uri,F=e.post_logout_redirect_uri,E=e.client_authentication,x=void 0===E?d:E,A=e.prompt,k=e.display,P=e.max_age,C=e.ui_locales,T=e.acr_values,R=e.resource,I=e.response_mode,D=e.filterProtocolClaims,L=void 0===D||D,N=e.loadUserInfo,U=void 0===N||N,B=e.staleStateAge,O=void 0===B?900:B,j=e.clockSkew,M=void 0===j?300:j,H=e.clockService,V=void 0===H?new s.ClockService:H,K=e.userInfoJwtIssuer,q=void 0===K?"OP":K,J=e.mergeClaims,W=void 0!==J&&J,z=e.stateStore,Y=void 0===z?new a.WebStorageStateStore:z,G=e.ResponseValidatorCtor,X=void 0===G?u.ResponseValidator:G,$=e.MetadataServiceCtor,Q=void 0===$?c.MetadataService:$,Z=e.extraQueryParams,tt=void 0===Z?{}:Z,et=e.extraTokenParams,rt=void 0===et?{}:et;h(this,t),this._authority=r,this._metadataUrl=i,this._metadata=o,this._metadataSeed=p,this._signingKeys=l,this._client_id=v,this._client_secret=y,this._response_type=_,this._scope=b,this._redirect_uri=w,this._post_logout_redirect_uri=F,this._client_authentication=x,this._prompt=A,this._display=k,this._max_age=P,this._ui_locales=C,this._acr_values=T,this._resource=R,this._response_mode=I,this._filterProtocolClaims=!!L,this._loadUserInfo=!!U,this._staleStateAge=O,this._clockSkew=M,this._clockService=V,this._userInfoJwtIssuer=q,this._mergeClaims=!!W,this._stateStore=Y,this._validator=new X(this),this._metadataService=new Q(this),this._extraQueryParams="object"===(void 0===tt?"undefined":n(tt))?tt:{},this._extraTokenParams="object"===(void 0===rt?"undefined":n(rt))?rt:{};}return t.prototype.getEpochTime=function t(){return this._clockService.getEpochTime()},i(t,[{key:"client_id",get:function t(){return this._client_id},set:function t(e){if(this._client_id)throw o.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned."),new Error("client_id has already been assigned.");this._client_id=e;}},{key:"client_secret",get:function t(){return this._client_secret}},{key:"response_type",get:function t(){return this._response_type}},{key:"scope",get:function t(){return this._scope}},{key:"redirect_uri",get:function t(){return this._redirect_uri}},{key:"post_logout_redirect_uri",get:function t(){return this._post_logout_redirect_uri}},{key:"client_authentication",get:function t(){return this._client_authentication}},{key:"prompt",get:function t(){return this._prompt}},{key:"display",get:function t(){return this._display}},{key:"max_age",get:function t(){return this._max_age}},{key:"ui_locales",get:function t(){return this._ui_locales}},{key:"acr_values",get:function t(){return this._acr_values}},{key:"resource",get:function t(){return this._resource}},{key:"response_mode",get:function t(){return this._response_mode}},{key:"authority",get:function t(){return this._authority},set:function t(e){if(this._authority)throw o.Log.error("OidcClientSettings.set_authority: authority has already been assigned."),new Error("authority has already been assigned.");this._authority=e;}},{key:"metadataUrl",get:function t(){return this._metadataUrl||(this._metadataUrl=this.authority,this._metadataUrl&&this._metadataUrl.indexOf(l)<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=l)),this._metadataUrl}},{key:"metadata",get:function t(){return this._metadata},set:function t(e){this._metadata=e;}},{key:"metadataSeed",get:function t(){return this._metadataSeed},set:function t(e){this._metadataSeed=e;}},{key:"signingKeys",get:function t(){return this._signingKeys},set:function t(e){this._signingKeys=e;}},{key:"filterProtocolClaims",get:function t(){return this._filterProtocolClaims}},{key:"loadUserInfo",get:function t(){return this._loadUserInfo}},{key:"staleStateAge",get:function t(){return this._staleStateAge}},{key:"clockSkew",get:function t(){return this._clockSkew}},{key:"userInfoJwtIssuer",get:function t(){return this._userInfoJwtIssuer}},{key:"mergeClaims",get:function t(){return this._mergeClaims}},{key:"stateStore",get:function t(){return this._stateStore}},{key:"validator",get:function t(){return this._validator}},{key:"metadataService",get:function t(){return this._metadataService}},{key:"extraQueryParams",get:function t(){return this._extraQueryParams},set:function t(e){"object"===(void 0===e?"undefined":n(e))?this._extraQueryParams=e:this._extraQueryParams={};}},{key:"extraTokenParams",get:function t(){return this._extraTokenParams},set:function t(e){"object"===(void 0===e?"undefined":n(e))?this._extraTokenParams=e:this._extraTokenParams={};}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.WebStorageStateStore=void 0;var n=r(0),i=r(1);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.WebStorageStateStore=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.prefix,n=void 0===r?"oidc.":r,s=e.store,a=void 0===s?i.Global.localStorage:s;o(this,t),this._store=a,this._prefix=n;}return t.prototype.set=function t(e,r){return n.Log.debug("WebStorageStateStore.set",e),e=this._prefix+e,this._store.setItem(e,r),Promise.resolve()},t.prototype.get=function t(e){n.Log.debug("WebStorageStateStore.get",e),e=this._prefix+e;var r=this._store.getItem(e);return Promise.resolve(r)},t.prototype.remove=function t(e){n.Log.debug("WebStorageStateStore.remove",e),e=this._prefix+e;var r=this._store.getItem(e);return this._store.removeItem(e),Promise.resolve(r)},t.prototype.getAllKeys=function t(){n.Log.debug("WebStorageStateStore.getAllKeys");for(var e=[],r=0;r<this._store.length;r++){var i=this._store.key(r);0===i.indexOf(this._prefix)&&e.push(i.substr(this._prefix.length));}return Promise.resolve(e)},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.JsonService=void 0;var n=r(0),i=r(1);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.JsonService=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.Global.XMLHttpRequest,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;o(this,t),e&&Array.isArray(e)?this._contentTypes=e.slice():this._contentTypes=[],this._contentTypes.push("application/json"),n&&this._contentTypes.push("application/jwt"),this._XMLHttpRequest=r,this._jwtHandler=n;}return t.prototype.getJson=function t(e,r){var i=this;if(!e)throw n.Log.error("JsonService.getJson: No url passed"),new Error("url");return n.Log.debug("JsonService.getJson, url: ",e),new Promise((function(t,o){var s=new i._XMLHttpRequest;s.open("GET",e);var a=i._contentTypes,u=i._jwtHandler;s.onload=function(){if(n.Log.debug("JsonService.getJson: HTTP response received, status",s.status),200===s.status){var r=s.getResponseHeader("Content-Type");if(r){var i=a.find((function(t){if(r.startsWith(t))return !0}));if("application/jwt"==i)return void u(s).then(t,o);if(i)try{return void t(JSON.parse(s.responseText))}catch(t){return n.Log.error("JsonService.getJson: Error parsing JSON response",t.message),void o(t)}}o(Error("Invalid response Content-Type: "+r+", from URL: "+e));}else o(Error(s.statusText+" ("+s.status+")"));},s.onerror=function(){n.Log.error("JsonService.getJson: network error"),o(Error("Network Error"));},r&&(n.Log.debug("JsonService.getJson: token passed, setting Authorization header"),s.setRequestHeader("Authorization","Bearer "+r)),s.send();}))},t.prototype.postForm=function t(e,r,i){var o=this;if(!e)throw n.Log.error("JsonService.postForm: No url passed"),new Error("url");return n.Log.debug("JsonService.postForm, url: ",e),new Promise((function(t,s){var a=new o._XMLHttpRequest;a.open("POST",e);var u=o._contentTypes;a.onload=function(){if(n.Log.debug("JsonService.postForm: HTTP response received, status",a.status),200!==a.status){if(400===a.status)if(i=a.getResponseHeader("Content-Type"))if(u.find((function(t){if(i.startsWith(t))return !0})))try{var r=JSON.parse(a.responseText);if(r&&r.error)return n.Log.error("JsonService.postForm: Error from server: ",r.error),void s(new Error(r.error))}catch(t){return n.Log.error("JsonService.postForm: Error parsing JSON response",t.message),void s(t)}s(Error(a.statusText+" ("+a.status+")"));}else {var i;if((i=a.getResponseHeader("Content-Type"))&&u.find((function(t){if(i.startsWith(t))return !0})))try{return void t(JSON.parse(a.responseText))}catch(t){return n.Log.error("JsonService.postForm: Error parsing JSON response",t.message),void s(t)}s(Error("Invalid response Content-Type: "+i+", from URL: "+e));}},a.onerror=function(){n.Log.error("JsonService.postForm: network error"),s(Error("Network Error"));};var c="";for(var h in r){var l=r[h];l&&(c.length>0&&(c+="&"),c+=encodeURIComponent(h),c+="=",c+=encodeURIComponent(l));}a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),void 0!==i&&a.setRequestHeader("Authorization","Basic "+btoa(i)),a.send(c);}))},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SigninRequest=void 0;var n=r(0),i=r(3),o=r(13);e.SigninRequest=function(){function t(e){var r=e.url,s=e.client_id,a=e.redirect_uri,u=e.response_type,c=e.scope,h=e.authority,l=e.data,f=e.prompt,g=e.display,d=e.max_age,p=e.ui_locales,v=e.id_token_hint,y=e.login_hint,m=e.acr_values,_=e.resource,S=e.response_mode,b=e.request,w=e.request_uri,F=e.extraQueryParams,E=e.request_type,x=e.client_secret,A=e.extraTokenParams,k=e.skipUserInfo;if(function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!r)throw n.Log.error("SigninRequest.ctor: No url passed"),new Error("url");if(!s)throw n.Log.error("SigninRequest.ctor: No client_id passed"),new Error("client_id");if(!a)throw n.Log.error("SigninRequest.ctor: No redirect_uri passed"),new Error("redirect_uri");if(!u)throw n.Log.error("SigninRequest.ctor: No response_type passed"),new Error("response_type");if(!c)throw n.Log.error("SigninRequest.ctor: No scope passed"),new Error("scope");if(!h)throw n.Log.error("SigninRequest.ctor: No authority passed"),new Error("authority");var C=t.isOidc(u),T=t.isCode(u);S||(S=t.isCode(u)?"query":null),this.state=new o.SigninState({nonce:C,data:l,client_id:s,authority:h,redirect_uri:a,code_verifier:T,request_type:E,response_mode:S,client_secret:x,scope:c,extraTokenParams:A,skipUserInfo:k}),r=i.UrlUtility.addQueryParam(r,"client_id",s),r=i.UrlUtility.addQueryParam(r,"redirect_uri",a),r=i.UrlUtility.addQueryParam(r,"response_type",u),r=i.UrlUtility.addQueryParam(r,"scope",c),r=i.UrlUtility.addQueryParam(r,"state",this.state.id),C&&(r=i.UrlUtility.addQueryParam(r,"nonce",this.state.nonce)),T&&(r=i.UrlUtility.addQueryParam(r,"code_challenge",this.state.code_challenge),r=i.UrlUtility.addQueryParam(r,"code_challenge_method","S256"));var R={prompt:f,display:g,max_age:d,ui_locales:p,id_token_hint:v,login_hint:y,acr_values:m,resource:_,request:b,request_uri:w,response_mode:S};for(var I in R)R[I]&&(r=i.UrlUtility.addQueryParam(r,I,R[I]));for(var D in F)r=i.UrlUtility.addQueryParam(r,D,F[D]);this.url=r;}return t.isOidc=function t(e){return !!e.split(/\s+/g).filter((function(t){return "id_token"===t}))[0]},t.isOAuth=function t(e){return !!e.split(/\s+/g).filter((function(t){return "token"===t}))[0]},t.isCode=function t(e){return !!e.split(/\s+/g).filter((function(t){return "code"===t}))[0]},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.State=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=function s(t){return t&&t.__esModule?t:{default:t}}(r(14));function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.State=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.id,n=e.data,i=e.created,s=e.request_type;a(this,t),this._id=r||(0, o.default)(),this._data=n,this._created="number"==typeof i&&i>0?i:parseInt(Date.now()/1e3),this._request_type=s;}return t.prototype.toStorageString=function t(){return i.Log.debug("State.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type})},t.fromStorageString=function e(r){return i.Log.debug("State.fromStorageString"),new t(JSON.parse(r))},t.clearStaleState=function e(r,n){var o=Date.now()/1e3-n;return r.getAllKeys().then((function(e){i.Log.debug("State.clearStaleState: got keys",e);for(var n=[],s=function s(a){var c=e[a];u=r.get(c).then((function(e){var n=!1;if(e)try{var s=t.fromStorageString(e);i.Log.debug("State.clearStaleState: got item from key: ",c,s.created),s.created<=o&&(n=!0);}catch(t){i.Log.error("State.clearStaleState: Error parsing state for key",c,t.message),n=!0;}else i.Log.debug("State.clearStaleState: no item in storage for key: ",c),n=!0;if(n)return i.Log.debug("State.clearStaleState: removed item for key: ",c),r.remove(c)})),n.push(u);},a=0;a<e.length;a++){var u;s(a);}return i.Log.debug("State.clearStaleState: waiting on promise count:",n.length),Promise.all(n)}))},n(t,[{key:"id",get:function t(){return this._id}},{key:"data",get:function t(){return this._data}},{key:"created",get:function t(){return this._created}},{key:"request_type",get:function t(){return this._request_type}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.OidcClient=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(5),s=r(12),a=r(8),u=r(34),c=r(35),h=r(36),l=r(13),f=r(9);function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.OidcClient=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};g(this,t),e instanceof o.OidcClientSettings?this._settings=e:this._settings=new o.OidcClientSettings(e);}return t.prototype.createSigninRequest=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.response_type,o=r.scope,s=r.redirect_uri,u=r.data,c=r.state,h=r.prompt,l=r.display,f=r.max_age,g=r.ui_locales,d=r.id_token_hint,p=r.login_hint,v=r.acr_values,y=r.resource,m=r.request,_=r.request_uri,S=r.response_mode,b=r.extraQueryParams,w=r.extraTokenParams,F=r.request_type,E=r.skipUserInfo,x=arguments[1];i.Log.debug("OidcClient.createSigninRequest");var A=this._settings.client_id;n=n||this._settings.response_type,o=o||this._settings.scope,s=s||this._settings.redirect_uri,h=h||this._settings.prompt,l=l||this._settings.display,f=f||this._settings.max_age,g=g||this._settings.ui_locales,v=v||this._settings.acr_values,y=y||this._settings.resource,S=S||this._settings.response_mode,b=b||this._settings.extraQueryParams,w=w||this._settings.extraTokenParams;var k=this._settings.authority;return a.SigninRequest.isCode(n)&&"code"!==n?Promise.reject(new Error("OpenID Connect hybrid flow is not supported")):this._metadataService.getAuthorizationEndpoint().then((function(t){i.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint",t);var r=new a.SigninRequest({url:t,client_id:A,redirect_uri:s,response_type:n,scope:o,data:u||c,authority:k,prompt:h,display:l,max_age:f,ui_locales:g,id_token_hint:d,login_hint:p,acr_values:v,resource:y,request:m,request_uri:_,extraQueryParams:b,extraTokenParams:w,request_type:F,response_mode:S,client_secret:e._settings.client_secret,skipUserInfo:E}),P=r.state;return (x=x||e._stateStore).set(P.id,P.toStorageString()).then((function(){return r}))}))},t.prototype.readSigninResponseState=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i.Log.debug("OidcClient.readSigninResponseState");var o="query"===this._settings.response_mode||!this._settings.response_mode&&a.SigninRequest.isCode(this._settings.response_type),s=o?"?":"#",c=new u.SigninResponse(e,s);if(!c.state)return i.Log.error("OidcClient.readSigninResponseState: No state in response"),Promise.reject(new Error("No state in response"));r=r||this._stateStore;var h=n?r.remove.bind(r):r.get.bind(r);return h(c.state).then((function(t){if(!t)throw i.Log.error("OidcClient.readSigninResponseState: No matching state found in storage"),new Error("No matching state found in storage");return {state:l.SigninState.fromStorageString(t),response:c}}))},t.prototype.processSigninResponse=function t(e,r){var n=this;return i.Log.debug("OidcClient.processSigninResponse"),this.readSigninResponseState(e,r,!0).then((function(t){var e=t.state,r=t.response;return i.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response"),n._validator.validateSigninResponse(e,r)}))},t.prototype.createSignoutRequest=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.id_token_hint,o=r.data,s=r.state,a=r.post_logout_redirect_uri,u=r.extraQueryParams,h=r.request_type,l=arguments[1];return i.Log.debug("OidcClient.createSignoutRequest"),a=a||this._settings.post_logout_redirect_uri,u=u||this._settings.extraQueryParams,this._metadataService.getEndSessionEndpoint().then((function(t){if(!t)throw i.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned"),new Error("no end session endpoint");i.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint",t);var r=new c.SignoutRequest({url:t,id_token_hint:n,post_logout_redirect_uri:a,data:o||s,extraQueryParams:u,request_type:h}),f=r.state;return f&&(i.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist"),(l=l||e._stateStore).set(f.id,f.toStorageString())),r}))},t.prototype.readSignoutResponseState=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i.Log.debug("OidcClient.readSignoutResponseState");var o=new h.SignoutResponse(e);if(!o.state)return i.Log.debug("OidcClient.readSignoutResponseState: No state in response"),o.error?(i.Log.warn("OidcClient.readSignoutResponseState: Response was error: ",o.error),Promise.reject(new s.ErrorResponse(o))):Promise.resolve({state:void 0,response:o});var a=o.state;r=r||this._stateStore;var u=n?r.remove.bind(r):r.get.bind(r);return u(a).then((function(t){if(!t)throw i.Log.error("OidcClient.readSignoutResponseState: No matching state found in storage"),new Error("No matching state found in storage");return {state:f.State.fromStorageString(t),response:o}}))},t.prototype.processSignoutResponse=function t(e,r){var n=this;return i.Log.debug("OidcClient.processSignoutResponse"),this.readSignoutResponseState(e,r,!0).then((function(t){var e=t.state,r=t.response;return e?(i.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response"),n._validator.validateSignoutResponse(e,r)):(i.Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response"),r)}))},t.prototype.clearStaleState=function t(e){return i.Log.debug("OidcClient.clearStaleState"),e=e||this._stateStore,f.State.clearStaleState(e,this.settings.staleStateAge)},n(t,[{key:"_stateStore",get:function t(){return this.settings.stateStore}},{key:"_validator",get:function t(){return this.settings.validator}},{key:"_metadataService",get:function t(){return this.settings.metadataService}},{key:"settings",get:function t(){return this._settings}},{key:"metadataService",get:function t(){return this._metadataService}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.TokenClient=void 0;var n=r(7),i=r(2),o=r(0);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.TokenClient=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(s(this,t),!e)throw o.Log.error("TokenClient.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new r,this._metadataService=new a(this._settings);}return t.prototype.exchangeCode=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).grant_type=r.grant_type||"authorization_code",r.client_id=r.client_id||this._settings.client_id,r.client_secret=r.client_secret||this._settings.client_secret,r.redirect_uri=r.redirect_uri||this._settings.redirect_uri;var n=void 0,i=r._client_authentication||this._settings._client_authentication;return delete r._client_authentication,r.code?r.redirect_uri?r.code_verifier?r.client_id?r.client_secret||"client_secret_basic"!=i?("client_secret_basic"==i&&(n=r.client_id+":"+r.client_secret,delete r.client_id,delete r.client_secret),this._metadataService.getTokenEndpoint(!1).then((function(t){return o.Log.debug("TokenClient.exchangeCode: Received token endpoint"),e._jsonService.postForm(t,r,n).then((function(t){return o.Log.debug("TokenClient.exchangeCode: response received"),t}))}))):(o.Log.error("TokenClient.exchangeCode: No client_secret passed"),Promise.reject(new Error("A client_secret is required"))):(o.Log.error("TokenClient.exchangeCode: No client_id passed"),Promise.reject(new Error("A client_id is required"))):(o.Log.error("TokenClient.exchangeCode: No code_verifier passed"),Promise.reject(new Error("A code_verifier is required"))):(o.Log.error("TokenClient.exchangeCode: No redirect_uri passed"),Promise.reject(new Error("A redirect_uri is required"))):(o.Log.error("TokenClient.exchangeCode: No code passed"),Promise.reject(new Error("A code is required")))},t.prototype.exchangeRefreshToken=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).grant_type=r.grant_type||"refresh_token",r.client_id=r.client_id||this._settings.client_id,r.client_secret=r.client_secret||this._settings.client_secret;var n=void 0,i=r._client_authentication||this._settings._client_authentication;return delete r._client_authentication,r.refresh_token?r.client_id?("client_secret_basic"==i&&(n=r.client_id+":"+r.client_secret,delete r.client_id,delete r.client_secret),this._metadataService.getTokenEndpoint(!1).then((function(t){return o.Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint"),e._jsonService.postForm(t,r,n).then((function(t){return o.Log.debug("TokenClient.exchangeRefreshToken: response received"),t}))}))):(o.Log.error("TokenClient.exchangeRefreshToken: No client_id passed"),Promise.reject(new Error("A client_id is required"))):(o.Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed"),Promise.reject(new Error("A refresh_token is required")))},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.ErrorResponse=void 0;var n=r(0);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}e.ErrorResponse=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=r.error,a=r.error_description,u=r.error_uri,c=r.state,h=r.session_state;if(i(this,e),!s)throw n.Log.error("No error passed to ErrorResponse"),new Error("error");var l=o(this,t.call(this,a||s));return l.name="ErrorResponse",l.error=s,l.error_description=a,l.error_uri=u,l.state=c,l.session_state=h,l}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),e}(Error);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SigninState=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(9),s=r(4),a=function u(t){return t&&t.__esModule?t:{default:t}}(r(14));function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}e.SigninState=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.nonce,i=r.authority,o=r.client_id,u=r.redirect_uri,l=r.code_verifier,f=r.response_mode,g=r.client_secret,d=r.scope,p=r.extraTokenParams,v=r.skipUserInfo;c(this,e);var y=h(this,t.call(this,arguments[0]));if(!0===n?y._nonce=(0, a.default)():n&&(y._nonce=n),!0===l?y._code_verifier=(0, a.default)()+(0, a.default)()+(0, a.default)():l&&(y._code_verifier=l),y.code_verifier){var m=s.JoseUtil.hashString(y.code_verifier,"SHA256");y._code_challenge=s.JoseUtil.hexToBase64Url(m);}return y._redirect_uri=u,y._authority=i,y._client_id=o,y._response_mode=f,y._client_secret=g,y._scope=d,y._extraTokenParams=p,y._skipUserInfo=v,y}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),e.prototype.toStorageString=function t(){return i.Log.debug("SigninState.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,nonce:this.nonce,code_verifier:this.code_verifier,redirect_uri:this.redirect_uri,authority:this.authority,client_id:this.client_id,response_mode:this.response_mode,client_secret:this.client_secret,scope:this.scope,extraTokenParams:this.extraTokenParams,skipUserInfo:this.skipUserInfo})},e.fromStorageString=function t(r){return i.Log.debug("SigninState.fromStorageString"),new e(JSON.parse(r))},n(e,[{key:"nonce",get:function t(){return this._nonce}},{key:"authority",get:function t(){return this._authority}},{key:"client_id",get:function t(){return this._client_id}},{key:"redirect_uri",get:function t(){return this._redirect_uri}},{key:"code_verifier",get:function t(){return this._code_verifier}},{key:"code_challenge",get:function t(){return this._code_challenge}},{key:"response_mode",get:function t(){return this._response_mode}},{key:"client_secret",get:function t(){return this._client_secret}},{key:"scope",get:function t(){return this._scope}},{key:"extraTokenParams",get:function t(){return this._extraTokenParams}},{key:"skipUserInfo",get:function t(){return this._skipUserInfo}}]),e}(o.State);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function n(){return ("undefined"!=i&&null!==i&&void 0!==i.getRandomValues?o:s)().replace(/-/g,"")};var i="undefined"!=typeof window?window.crypto||window.msCrypto:null;function o(){return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return (t^i.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}))}function s(){return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return (t^16*Math.random()>>t/4).toString(16)}))}t.exports=e.default;},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.User=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.User=function(){function t(e){var r=e.id_token,n=e.session_state,i=e.access_token,o=e.refresh_token,s=e.token_type,a=e.scope,u=e.profile,c=e.expires_at,h=e.state;!function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id_token=r,this.session_state=n,this.access_token=i,this.refresh_token=o,this.token_type=s,this.scope=a,this.profile=u,this.expires_at=c,this.state=h;}return t.prototype.toStorageString=function t(){return i.Log.debug("User.toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,refresh_token:this.refresh_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})},t.fromStorageString=function e(r){return i.Log.debug("User.fromStorageString"),new t(JSON.parse(r))},n(t,[{key:"expires_in",get:function t(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}},set:function t(e){var r=parseInt(e);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r;}}},{key:"expired",get:function t(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function t(){return (this.scope||"").split(" ")}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.AccessTokenEvents=void 0;var n=r(0),i=r(46);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.AccessTokenEvents=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.accessTokenExpiringNotificationTime,n=void 0===r?60:r,s=e.accessTokenExpiringTimer,a=void 0===s?new i.Timer("Access token expiring"):s,u=e.accessTokenExpiredTimer,c=void 0===u?new i.Timer("Access token expired"):u;o(this,t),this._accessTokenExpiringNotificationTime=n,this._accessTokenExpiring=a,this._accessTokenExpired=c;}return t.prototype.load=function t(e){if(e.access_token&&void 0!==e.expires_in){var r=e.expires_in;if(n.Log.debug("AccessTokenEvents.load: access token present, remaining duration:",r),r>0){var i=r-this._accessTokenExpiringNotificationTime;i<=0&&(i=1),n.Log.debug("AccessTokenEvents.load: registering expiring timer in:",i),this._accessTokenExpiring.init(i);}else n.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration."),this._accessTokenExpiring.cancel();var o=r+1;n.Log.debug("AccessTokenEvents.load: registering expired timer in:",o),this._accessTokenExpired.init(o);}else this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel();},t.prototype.unload=function t(){n.Log.debug("AccessTokenEvents.unload: canceling existing access token timers"),this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel();},t.prototype.addAccessTokenExpiring=function t(e){this._accessTokenExpiring.addHandler(e);},t.prototype.removeAccessTokenExpiring=function t(e){this._accessTokenExpiring.removeHandler(e);},t.prototype.addAccessTokenExpired=function t(e){this._accessTokenExpired.addHandler(e);},t.prototype.removeAccessTokenExpired=function t(e){this._accessTokenExpired.removeHandler(e);},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0;var n=r(0);e.Event=function(){function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._callbacks=[];}return t.prototype.addHandler=function t(e){this._callbacks.push(e);},t.prototype.removeHandler=function t(e){var r=this._callbacks.findIndex((function(t){return t===e}));r>=0&&this._callbacks.splice(r,1);},t.prototype.raise=function t(){n.Log.debug("Event: Raising event: "+this._name);for(var e=0;e<this._callbacks.length;e++){var r;(r=this._callbacks)[e].apply(r,arguments);}},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SessionMonitor=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(19),s=r(1);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.SessionMonitor=function(){function t(e){var r=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.CheckSessionIFrame,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s.Global.timer;if(a(this,t),!e)throw i.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor"),new Error("userManager");this._userManager=e,this._CheckSessionIFrameCtor=n,this._timer=u,this._userManager.events.addUserLoaded(this._start.bind(this)),this._userManager.events.addUserUnloaded(this._stop.bind(this)),Promise.resolve(this._userManager.getUser().then((function(t){t?r._start(t):r._settings.monitorAnonymousSession&&r._userManager.querySessionStatus().then((function(t){var e={session_state:t.session_state};t.sub&&t.sid&&(e.profile={sub:t.sub,sid:t.sid}),r._start(e);})).catch((function(t){i.Log.error("SessionMonitor ctor: error from querySessionStatus:",t.message);}));})).catch((function(t){i.Log.error("SessionMonitor ctor: error from getUser:",t.message);})));}return t.prototype._start=function t(e){var r=this,n=e.session_state;n&&(e.profile?(this._sub=e.profile.sub,this._sid=e.profile.sid,i.Log.debug("SessionMonitor._start: session_state:",n,", sub:",this._sub)):(this._sub=void 0,this._sid=void 0,i.Log.debug("SessionMonitor._start: session_state:",n,", anonymous user")),this._checkSessionIFrame?this._checkSessionIFrame.start(n):this._metadataService.getCheckSessionIframe().then((function(t){if(t){i.Log.debug("SessionMonitor._start: Initializing check session iframe");var e=r._client_id,o=r._checkSessionInterval,s=r._stopCheckSessionOnError;r._checkSessionIFrame=new r._CheckSessionIFrameCtor(r._callback.bind(r),e,t,o,s),r._checkSessionIFrame.load().then((function(){r._checkSessionIFrame.start(n);}));}else i.Log.warn("SessionMonitor._start: No check session iframe found in the metadata");})).catch((function(t){i.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:",t.message);})));},t.prototype._stop=function t(){var e=this;if(this._sub=void 0,this._sid=void 0,this._checkSessionIFrame&&(i.Log.debug("SessionMonitor._stop"),this._checkSessionIFrame.stop()),this._settings.monitorAnonymousSession)var r=this._timer.setInterval((function(){e._timer.clearInterval(r),e._userManager.querySessionStatus().then((function(t){var r={session_state:t.session_state};t.sub&&t.sid&&(r.profile={sub:t.sub,sid:t.sid}),e._start(r);})).catch((function(t){i.Log.error("SessionMonitor: error from querySessionStatus:",t.message);}));}),1e3);},t.prototype._callback=function t(){var e=this;this._userManager.querySessionStatus().then((function(t){var r=!0;t?t.sub===e._sub?(r=!1,e._checkSessionIFrame.start(t.session_state),t.sid===e._sid?i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:",t.session_state):(i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:",t.session_state),e._userManager.events._raiseUserSessionChanged())):i.Log.debug("SessionMonitor._callback: Different subject signed into OP:",t.sub):i.Log.debug("SessionMonitor._callback: Subject no longer signed into OP"),r&&(e._sub?(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event"),e._userManager.events._raiseUserSignedOut()):(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event"),e._userManager.events._raiseUserSignedIn()));})).catch((function(t){e._sub&&(i.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event",t.message),e._userManager.events._raiseUserSignedOut());}));},n(t,[{key:"_settings",get:function t(){return this._userManager.settings}},{key:"_metadataService",get:function t(){return this._userManager.metadataService}},{key:"_client_id",get:function t(){return this._settings.client_id}},{key:"_checkSessionInterval",get:function t(){return this._settings.checkSessionInterval}},{key:"_stopCheckSessionOnError",get:function t(){return this._settings.stopCheckSessionOnError}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.CheckSessionIFrame=void 0;var n=r(0);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.CheckSessionIFrame=function(){function t(e,r,n,o){var s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];i(this,t),this._callback=e,this._client_id=r,this._url=n,this._interval=o||2e3,this._stopOnError=s;var a=n.indexOf("/",n.indexOf("//")+2);this._frame_origin=n.substr(0,a),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.width=0,this._frame.height=0,this._frame.src=n;}return t.prototype.load=function t(){var e=this;return new Promise((function(t){e._frame.onload=function(){t();},window.document.body.appendChild(e._frame),e._boundMessageEvent=e._message.bind(e),window.addEventListener("message",e._boundMessageEvent,!1);}))},t.prototype._message=function t(e){e.origin===this._frame_origin&&e.source===this._frame.contentWindow&&("error"===e.data?(n.Log.error("CheckSessionIFrame: error message from check session op iframe"),this._stopOnError&&this.stop()):"changed"===e.data?(n.Log.debug("CheckSessionIFrame: changed message from check session op iframe"),this.stop(),this._callback()):n.Log.debug("CheckSessionIFrame: "+e.data+" message from check session op iframe"));},t.prototype.start=function t(e){var r=this;if(this._session_state!==e){n.Log.debug("CheckSessionIFrame.start"),this.stop(),this._session_state=e;var i=function t(){r._frame.contentWindow.postMessage(r._client_id+" "+r._session_state,r._frame_origin);};i(),this._timer=window.setInterval(i,this._interval);}},t.prototype.stop=function t(){this._session_state=null,this._timer&&(n.Log.debug("CheckSessionIFrame.stop"),window.clearInterval(this._timer),this._timer=null);},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.TokenRevocationClient=void 0;var n=r(0),i=r(2),o=r(1);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a="access_token",u="refresh_token";e.TokenRevocationClient=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.XMLHttpRequest,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(s(this,t),!e)throw n.Log.error("TokenRevocationClient.ctor: No settings provided"),new Error("No settings provided.");this._settings=e,this._XMLHttpRequestCtor=r,this._metadataService=new a(this._settings);}return t.prototype.revoke=function t(e,r){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"access_token";if(!e)throw n.Log.error("TokenRevocationClient.revoke: No token provided"),new Error("No token provided.");if(o!==a&&o!=u)throw n.Log.error("TokenRevocationClient.revoke: Invalid token type"),new Error("Invalid token type.");return this._metadataService.getRevocationEndpoint().then((function(t){if(t){n.Log.debug("TokenRevocationClient.revoke: Revoking "+o);var s=i._settings.client_id,a=i._settings.client_secret;return i._revoke(t,s,a,e,o)}if(r)throw n.Log.error("TokenRevocationClient.revoke: Revocation not supported"),new Error("Revocation not supported")}))},t.prototype._revoke=function t(e,r,i,o,s){var a=this;return new Promise((function(t,u){var c=new a._XMLHttpRequestCtor;c.open("POST",e),c.onload=function(){n.Log.debug("TokenRevocationClient.revoke: HTTP response received, status",c.status),200===c.status?t():u(Error(c.statusText+" ("+c.status+")"));},c.onerror=function(){n.Log.debug("TokenRevocationClient.revoke: Network Error."),u("Network Error");};var h="client_id="+encodeURIComponent(r);i&&(h+="&client_secret="+encodeURIComponent(i)),h+="&token_type_hint="+encodeURIComponent(s),h+="&token="+encodeURIComponent(o),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(h);}))},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaPopupWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.CordovaPopupWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e;})),this.features=e.popupWindowFeatures||"location=no,toolbar=no,zoom=no",this.target=e.popupWindowTarget||"_blank",this.redirect_uri=e.startUrl,i.Log.debug("CordovaPopupWindow.ctor: redirect_uri: "+this.redirect_uri);}return t.prototype._isInAppBrowserInstalled=function t(e){return ["cordova-plugin-inappbrowser","cordova-plugin-inappbrowser.inappbrowser","org.apache.cordova.inappbrowser"].some((function(t){return e.hasOwnProperty(t)}))},t.prototype.navigate=function t(e){if(e&&e.url){if(!window.cordova)return this._error("cordova is undefined");var r=window.cordova.require("cordova/plugin_list").metadata;if(!1===this._isInAppBrowserInstalled(r))return this._error("InAppBrowser plugin not found");this._popup=cordova.InAppBrowser.open(e.url,this.target,this.features),this._popup?(i.Log.debug("CordovaPopupWindow.navigate: popup successfully created"),this._exitCallbackEvent=this._exitCallback.bind(this),this._loadStartCallbackEvent=this._loadStartCallback.bind(this),this._popup.addEventListener("exit",this._exitCallbackEvent,!1),this._popup.addEventListener("loadstart",this._loadStartCallbackEvent,!1)):this._error("Error opening popup window");}else this._error("No url provided");return this.promise},t.prototype._loadStartCallback=function t(e){0===e.url.indexOf(this.redirect_uri)&&this._success({url:e.url});},t.prototype._exitCallback=function t(e){this._error(e);},t.prototype._success=function t(e){this._cleanup(),i.Log.debug("CordovaPopupWindow: Successful response from cordova popup window"),this._resolve(e);},t.prototype._error=function t(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e));},t.prototype.close=function t(){this._cleanup();},t.prototype._cleanup=function t(){this._popup&&(i.Log.debug("CordovaPopupWindow: cleaning up popup"),this._popup.removeEventListener("exit",this._exitCallbackEvent,!1),this._popup.removeEventListener("loadstart",this._loadStartCallbackEvent,!1),this._popup.close()),this._popup=null;},n(t,[{key:"promise",get:function t(){return this._promise}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=r(10),o=r(5),s=r(6),a=r(37),u=r(38),c=r(16),h=r(2),l=r(48),f=r(49),g=r(19),d=r(20),p=r(18),v=r(1),y=r(15),m=r(50);e.default={Version:m.Version,Log:n.Log,OidcClient:i.OidcClient,OidcClientSettings:o.OidcClientSettings,WebStorageStateStore:s.WebStorageStateStore,InMemoryWebStorage:a.InMemoryWebStorage,UserManager:u.UserManager,AccessTokenEvents:c.AccessTokenEvents,MetadataService:h.MetadataService,CordovaPopupNavigator:l.CordovaPopupNavigator,CordovaIFrameNavigator:f.CordovaIFrameNavigator,CheckSessionIFrame:g.CheckSessionIFrame,TokenRevocationClient:d.TokenRevocationClient,SessionMonitor:p.SessionMonitor,Global:v.Global,User:y.User},t.exports=e.default;},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});e.ClockService=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.getEpochTime=function t(){return Promise.resolve(Date.now()/1e3|0)},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.ResponseValidator=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(0),o=r(2),s=r(25),a=r(11),u=r(12),c=r(4);function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var l=["nonce","at_hash","iat","nbf","exp","aud","iss","c_hash"];e.ResponseValidator=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.MetadataService,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s.UserInfoService,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:c.JoseUtil,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a.TokenClient;if(h(this,t),!e)throw i.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator"),new Error("settings");this._settings=e,this._metadataService=new r(this._settings),this._userInfoService=new n(this._settings),this._joseUtil=u,this._tokenClient=new l(this._settings);}return t.prototype.validateSigninResponse=function t(e,r){var n=this;return i.Log.debug("ResponseValidator.validateSigninResponse"),this._processSigninParams(e,r).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: state processed"),n._validateTokens(e,t).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: tokens validated"),n._processClaims(e,t).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: claims processed"),t}))}))}))},t.prototype.validateSignoutResponse=function t(e,r){return e.id!==r.state?(i.Log.error("ResponseValidator.validateSignoutResponse: State does not match"),Promise.reject(new Error("State does not match"))):(i.Log.debug("ResponseValidator.validateSignoutResponse: state validated"),r.state=e.data,r.error?(i.Log.warn("ResponseValidator.validateSignoutResponse: Response was error",r.error),Promise.reject(new u.ErrorResponse(r))):Promise.resolve(r))},t.prototype._processSigninParams=function t(e,r){if(e.id!==r.state)return i.Log.error("ResponseValidator._processSigninParams: State does not match"),Promise.reject(new Error("State does not match"));if(!e.client_id)return i.Log.error("ResponseValidator._processSigninParams: No client_id on state"),Promise.reject(new Error("No client_id on state"));if(!e.authority)return i.Log.error("ResponseValidator._processSigninParams: No authority on state"),Promise.reject(new Error("No authority on state"));if(this._settings.authority){if(this._settings.authority&&this._settings.authority!==e.authority)return i.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state"),Promise.reject(new Error("authority mismatch on settings vs. signin state"))}else this._settings.authority=e.authority;if(this._settings.client_id){if(this._settings.client_id&&this._settings.client_id!==e.client_id)return i.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state"),Promise.reject(new Error("client_id mismatch on settings vs. signin state"))}else this._settings.client_id=e.client_id;return i.Log.debug("ResponseValidator._processSigninParams: state validated"),r.state=e.data,r.error?(i.Log.warn("ResponseValidator._processSigninParams: Response was error",r.error),Promise.reject(new u.ErrorResponse(r))):e.nonce&&!r.id_token?(i.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response"),Promise.reject(new Error("No id_token in response"))):!e.nonce&&r.id_token?(i.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response"),Promise.reject(new Error("Unexpected id_token in response"))):e.code_verifier&&!r.code?(i.Log.error("ResponseValidator._processSigninParams: Expecting code in response"),Promise.reject(new Error("No code in response"))):!e.code_verifier&&r.code?(i.Log.error("ResponseValidator._processSigninParams: Not expecting code in response"),Promise.reject(new Error("Unexpected code in response"))):(r.scope||(r.scope=e.scope),Promise.resolve(r))},t.prototype._processClaims=function t(e,r){var n=this;if(r.isOpenIdConnect){if(i.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims"),r.profile=this._filterProtocolClaims(r.profile),!0!==e.skipUserInfo&&this._settings.loadUserInfo&&r.access_token)return i.Log.debug("ResponseValidator._processClaims: loading user info"),this._userInfoService.getClaims(r.access_token).then((function(t){return i.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint"),t.sub!==r.profile.sub?(i.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token"),Promise.reject(new Error("sub from user info endpoint does not match sub in id_token"))):(r.profile=n._mergeClaims(r.profile,t),i.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:",r.profile),r)}));i.Log.debug("ResponseValidator._processClaims: not loading user info");}else i.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");return Promise.resolve(r)},t.prototype._mergeClaims=function t(e,r){var i=Object.assign({},e);for(var o in r){var s=r[o];Array.isArray(s)||(s=[s]);for(var a=0;a<s.length;a++){var u=s[a];i[o]?Array.isArray(i[o])?i[o].indexOf(u)<0&&i[o].push(u):i[o]!==u&&("object"===(void 0===u?"undefined":n(u))&&this._settings.mergeClaims?i[o]=this._mergeClaims(i[o],u):i[o]=[i[o],u]):i[o]=u;}}return i},t.prototype._filterProtocolClaims=function t(e){i.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:",e);var r=Object.assign({},e);return this._settings._filterProtocolClaims?(l.forEach((function(t){delete r[t];})),i.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered",r)):i.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered"),r},t.prototype._validateTokens=function t(e,r){return r.code?(i.Log.debug("ResponseValidator._validateTokens: Validating code"),this._processCode(e,r)):r.id_token?r.access_token?(i.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token"),this._validateIdTokenAndAccessToken(e,r)):(i.Log.debug("ResponseValidator._validateTokens: Validating id_token"),this._validateIdToken(e,r)):(i.Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate"),Promise.resolve(r))},t.prototype._processCode=function t(e,r){var o=this,s={client_id:e.client_id,client_secret:e.client_secret,code:r.code,redirect_uri:e.redirect_uri,code_verifier:e.code_verifier};return e.extraTokenParams&&"object"===n(e.extraTokenParams)&&Object.assign(s,e.extraTokenParams),this._tokenClient.exchangeCode(s).then((function(t){for(var n in t)r[n]=t[n];return r.id_token?(i.Log.debug("ResponseValidator._processCode: token response successful, processing id_token"),o._validateIdTokenAttributes(e,r)):(i.Log.debug("ResponseValidator._processCode: token response successful, returning response"),r)}))},t.prototype._validateIdTokenAttributes=function t(e,r){var n=this;return this._metadataService.getIssuer().then((function(t){var o=e.client_id,s=n._settings.clockSkew;return i.Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ",s),n._settings.getEpochTime().then((function(a){return n._joseUtil.validateJwtAttributes(r.id_token,t,o,s,a).then((function(t){return e.nonce&&e.nonce!==t.nonce?(i.Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"))):t.sub?(r.profile=t,r):(i.Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))}))}))}))},t.prototype._validateIdTokenAndAccessToken=function t(e,r){var n=this;return this._validateIdToken(e,r).then((function(t){return n._validateAccessToken(t)}))},t.prototype._getSigningKeyForJwt=function t(e){var r=this;return this._metadataService.getSigningKeys().then((function(t){var n=e.header.kid;if(!t)return i.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));i.Log.debug("ResponseValidator._validateIdToken: Received signing keys");var o=void 0;if(n)o=t.filter((function(t){return t.kid===n}))[0];else {if((t=r._filterByAlg(t,e.header.alg)).length>1)return i.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));o=t[0];}return Promise.resolve(o)}))},t.prototype._getSigningKeyForJwtWithSingleRetry=function t(e){var r=this;return this._getSigningKeyForJwt(e).then((function(t){return t?Promise.resolve(t):(r._metadataService.resetSigningKeys(),r._getSigningKeyForJwt(e))}))},t.prototype._validateIdToken=function t(e,r){var n=this;if(!e.nonce)return i.Log.error("ResponseValidator._validateIdToken: No nonce on state"),Promise.reject(new Error("No nonce on state"));var o=this._joseUtil.parseJwt(r.id_token);return o&&o.header&&o.payload?e.nonce!==o.payload.nonce?(i.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"))):this._metadataService.getIssuer().then((function(t){return i.Log.debug("ResponseValidator._validateIdToken: Received issuer"),n._getSigningKeyForJwtWithSingleRetry(o).then((function(s){if(!s)return i.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var a=e.client_id,u=n._settings.clockSkew;return i.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ",u),n._joseUtil.validateJwt(r.id_token,s,t,a,u).then((function(){return i.Log.debug("ResponseValidator._validateIdToken: JWT validation successful"),o.payload.sub?(r.profile=o.payload,r):(i.Log.error("ResponseValidator._validateIdToken: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))}))}))})):(i.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token",o),Promise.reject(new Error("Failed to parse id_token")))},t.prototype._filterByAlg=function t(e,r){var n=null;if(r.startsWith("RS"))n="RSA";else if(r.startsWith("PS"))n="PS";else {if(!r.startsWith("ES"))return i.Log.debug("ResponseValidator._filterByAlg: alg not supported: ",r),[];n="EC";}return i.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ",n),e=e.filter((function(t){return t.kty===n})),i.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ",n,e.length),e},t.prototype._validateAccessToken=function t(e){if(!e.profile)return i.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token"),Promise.reject(new Error("No profile loaded from id_token"));if(!e.profile.at_hash)return i.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token"),Promise.reject(new Error("No at_hash in id_token"));if(!e.id_token)return i.Log.error("ResponseValidator._validateAccessToken: No id_token"),Promise.reject(new Error("No id_token"));var r=this._joseUtil.parseJwt(e.id_token);if(!r||!r.header)return i.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token",r),Promise.reject(new Error("Failed to parse id_token"));var n=r.header.alg;if(!n||5!==n.length)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n),Promise.reject(new Error("Unsupported alg: "+n));var o=n.substr(2,3);if(!o)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n,o),Promise.reject(new Error("Unsupported alg: "+n));if(256!==(o=parseInt(o))&&384!==o&&512!==o)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n,o),Promise.reject(new Error("Unsupported alg: "+n));var s="sha"+o,a=this._joseUtil.hashString(e.access_token,s);if(!a)return i.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:",s),Promise.reject(new Error("Failed to validate at_hash"));var u=a.substr(0,a.length/2),c=this._joseUtil.hexToBase64Url(u);return c!==e.profile.at_hash?(i.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash",c,e.profile.at_hash),Promise.reject(new Error("Failed to validate at_hash"))):(i.Log.debug("ResponseValidator._validateAccessToken: success"),Promise.resolve(e))},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.UserInfoService=void 0;var n=r(7),i=r(2),o=r(0),s=r(4);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.UserInfoService=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s.JoseUtil;if(a(this,t),!e)throw o.Log.error("UserInfoService.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new r(void 0,void 0,this._getClaimsFromJwt.bind(this)),this._metadataService=new u(this._settings),this._joseUtil=c;}return t.prototype.getClaims=function t(e){var r=this;return e?this._metadataService.getUserInfoEndpoint().then((function(t){return o.Log.debug("UserInfoService.getClaims: received userinfo url",t),r._jsonService.getJson(t,e).then((function(t){return o.Log.debug("UserInfoService.getClaims: claims received",t),t}))})):(o.Log.error("UserInfoService.getClaims: No token passed"),Promise.reject(new Error("A token is required")))},t.prototype._getClaimsFromJwt=function t(e){var r=this;try{var n=this._joseUtil.parseJwt(e.responseText);if(!n||!n.header||!n.payload)return o.Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT",n),Promise.reject(new Error("Failed to parse id_token"));var i=n.header.kid,s=void 0;switch(this._settings.userInfoJwtIssuer){case"OP":s=this._metadataService.getIssuer();break;case"ANY":s=Promise.resolve(n.payload.iss);break;default:s=Promise.resolve(this._settings.userInfoJwtIssuer);}return s.then((function(t){return o.Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:"+t),r._metadataService.getSigningKeys().then((function(s){if(!s)return o.Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));o.Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");var a=void 0;if(i)a=s.filter((function(t){return t.kid===i}))[0];else {if((s=r._filterByAlg(s,n.header.alg)).length>1)return o.Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));a=s[0];}if(!a)return o.Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var u=r._settings.client_id,c=r._settings.clockSkew;return o.Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ",c),r._joseUtil.validateJwt(e.responseText,a,t,u,c,void 0,!0).then((function(){return o.Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful"),n.payload}))}))}))}catch(t){return o.Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response",t.message),void reject(t)}},t.prototype._filterByAlg=function t(e,r){var n=null;if(r.startsWith("RS"))n="RSA";else if(r.startsWith("PS"))n="PS";else {if(!r.startsWith("ES"))return o.Log.debug("UserInfoService._filterByAlg: alg not supported: ",r),[];n="EC";}return o.Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ",n),e=e.filter((function(t){return t.kty===n})),o.Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ",n,e.length),e},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.AllowedSigningAlgs=e.b64tohex=e.hextob64u=e.crypto=e.X509=e.KeyUtil=e.jws=void 0;var n=r(27);e.jws=n.jws,e.KeyUtil=n.KEYUTIL,e.X509=n.X509,e.crypto=n.crypto,e.hextob64u=n.hextob64u,e.b64tohex=n.b64tohex,e.AllowedSigningAlgs=["RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"];},function(t,e,r){(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n={userAgent:!1},i={};
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(void 0===o)var o={};o.lang={extend:function t(e,r,i){if(!r||!e)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var o=function t(){};if(o.prototype=r.prototype,e.prototype=new o,e.prototype.constructor=e,e.superclass=r.prototype,r.prototype.constructor==Object.prototype.constructor&&(r.prototype.constructor=r),i){var s;for(s in i)e.prototype[s]=i[s];var a=function t(){},u=["toString","valueOf"];try{/MSIE/.test(n.userAgent)&&(a=function t(e,r){for(s=0;s<u.length;s+=1){var n=u[s],i=r[n];"function"==typeof i&&i!=Object.prototype[n]&&(e[n]=i);}});}catch(t){}a(e.prototype,i);}}};
/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var s,a,u,c,h,l,f,g,d,p,v,y=y||(s=Math,u=(a={}).lib={},c=u.Base=function(){function t(){}return {extend:function e(r){t.prototype=this;var n=new t;return r&&n.mixIn(r),n.hasOwnProperty("init")||(n.init=function(){n.$super.init.apply(this,arguments);}),n.init.prototype=n,n.$super=this,n},create:function t(){var e=this.extend();return e.init.apply(e,arguments),e},init:function t(){},mixIn:function t(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString);},clone:function t(){return this.init.prototype.extend(this)}}}(),h=u.WordArray=c.extend({init:function t(e,r){e=this.words=e||[],this.sigBytes=null!=r?r:4*e.length;},toString:function t(e){return (e||f).stringify(this)},concat:function t(e){var r=this.words,n=e.words,i=this.sigBytes,o=e.sigBytes;if(this.clamp(),i%4)for(var s=0;s<o;s++){var a=n[s>>>2]>>>24-s%4*8&255;r[i+s>>>2]|=a<<24-(i+s)%4*8;}else for(s=0;s<o;s+=4)r[i+s>>>2]=n[s>>>2];return this.sigBytes+=o,this},clamp:function t(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=s.ceil(r/4);},clone:function t(){var e=c.clone.call(this);return e.words=this.words.slice(0),e},random:function t(e){for(var r=[],n=0;n<e;n+=4)r.push(4294967296*s.random()|0);return new h.init(r,e)}}),l=a.enc={},f=l.Hex={stringify:function t(e){for(var r=e.words,n=e.sigBytes,i=[],o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;i.push((s>>>4).toString(16)),i.push((15&s).toString(16));}return i.join("")},parse:function t(e){for(var r=e.length,n=[],i=0;i<r;i+=2)n[i>>>3]|=parseInt(e.substr(i,2),16)<<24-i%8*4;return new h.init(n,r/2)}},g=l.Latin1={stringify:function t(e){for(var r=e.words,n=e.sigBytes,i=[],o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;i.push(String.fromCharCode(s));}return i.join("")},parse:function t(e){for(var r=e.length,n=[],i=0;i<r;i++)n[i>>>2]|=(255&e.charCodeAt(i))<<24-i%4*8;return new h.init(n,r)}},d=l.Utf8={stringify:function t(e){try{return decodeURIComponent(escape(g.stringify(e)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function t(e){return g.parse(unescape(encodeURIComponent(e)))}},p=u.BufferedBlockAlgorithm=c.extend({reset:function t(){this._data=new h.init,this._nDataBytes=0;},_append:function t(e){"string"==typeof e&&(e=d.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes;},_process:function t(e){var r=this._data,n=r.words,i=r.sigBytes,o=this.blockSize,a=i/(4*o),u=(a=e?s.ceil(a):s.max((0|a)-this._minBufferSize,0))*o,c=s.min(4*u,i);if(u){for(var l=0;l<u;l+=o)this._doProcessBlock(n,l);var f=n.splice(0,u);r.sigBytes-=c;}return new h.init(f,c)},clone:function t(){var e=c.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),u.Hasher=p.extend({cfg:c.extend(),init:function t(e){this.cfg=this.cfg.extend(e),this.reset();},reset:function t(){p.reset.call(this),this._doReset();},update:function t(e){return this._append(e),this._process(),this},finalize:function t(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function t(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function t(e){return function(t,r){return new v.HMAC.init(e,r).finalize(t)}}}),v=a.algo={},a);!function(t){var e,r=(e=y).lib,n=r.Base,i=r.WordArray;(e=e.x64={}).Word=n.extend({init:function t(e,r){this.high=e,this.low=r;}}),e.WordArray=n.extend({init:function t(e,r){e=this.words=e||[],this.sigBytes=null!=r?r:8*e.length;},toX32:function t(){for(var e=this.words,r=e.length,n=[],o=0;o<r;o++){var s=e[o];n.push(s.high),n.push(s.low);}return i.create(n,this.sigBytes)},clone:function t(){for(var e=n.clone.call(this),r=e.words=this.words.slice(0),i=r.length,o=0;o<i;o++)r[o]=r[o].clone();return e}});}(),function(){var t=y,e=t.lib.WordArray;t.enc.Base64={stringify:function t(e){var r=e.words,n=e.sigBytes,i=this._map;e.clamp(),e=[];for(var o=0;o<n;o+=3)for(var s=(r[o>>>2]>>>24-o%4*8&255)<<16|(r[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|r[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;4>a&&o+.75*a<n;a++)e.push(i.charAt(s>>>6*(3-a)&63));if(r=i.charAt(64))for(;e.length%4;)e.push(r);return e.join("")},parse:function t(r){var n=r.length,i=this._map;(o=i.charAt(64))&&(-1!=(o=r.indexOf(o))&&(n=o));for(var o=[],s=0,a=0;a<n;a++)if(a%4){var u=i.indexOf(r.charAt(a-1))<<a%4*2,c=i.indexOf(r.charAt(a))>>>6-a%4*2;o[s>>>2]|=(u|c)<<24-s%4*8,s++;}return e.create(o,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};}(),function(t){for(var e=y,r=(i=e.lib).WordArray,n=i.Hasher,i=e.algo,o=[],s=[],a=function t(e){return 4294967296*(e-(0|e))|0},u=2,c=0;64>c;){var h;t:{h=u;for(var l=t.sqrt(h),f=2;f<=l;f++)if(!(h%f)){h=!1;break t}h=!0;}h&&(8>c&&(o[c]=a(t.pow(u,.5))),s[c]=a(t.pow(u,1/3)),c++),u++;}var g=[];i=i.SHA256=n.extend({_doReset:function t(){this._hash=new r.init(o.slice(0));},_doProcessBlock:function t(e,r){for(var n=this._hash.words,i=n[0],o=n[1],a=n[2],u=n[3],c=n[4],h=n[5],l=n[6],f=n[7],d=0;64>d;d++){if(16>d)g[d]=0|e[r+d];else {var p=g[d-15],v=g[d-2];g[d]=((p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3)+g[d-7]+((v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10)+g[d-16];}p=f+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&h^~c&l)+s[d]+g[d],v=((i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22))+(i&o^i&a^o&a),f=l,l=h,h=c,c=u+p|0,u=a,a=o,o=i,i=p+v|0;}n[0]=n[0]+i|0,n[1]=n[1]+o|0,n[2]=n[2]+a|0,n[3]=n[3]+u|0,n[4]=n[4]+c|0,n[5]=n[5]+h|0,n[6]=n[6]+l|0,n[7]=n[7]+f|0;},_doFinalize:function e(){var r=this._data,n=r.words,i=8*this._nDataBytes,o=8*r.sigBytes;return n[o>>>5]|=128<<24-o%32,n[14+(o+64>>>9<<4)]=t.floor(i/4294967296),n[15+(o+64>>>9<<4)]=i,r.sigBytes=4*n.length,this._process(),this._hash},clone:function t(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});e.SHA256=n._createHelper(i),e.HmacSHA256=n._createHmacHelper(i);}(Math),function(){function t(){return n.create.apply(n,arguments)}for(var e=y,r=e.lib.Hasher,n=(o=e.x64).Word,i=o.WordArray,o=e.algo,s=[t(1116352408,3609767458),t(1899447441,602891725),t(3049323471,3964484399),t(3921009573,2173295548),t(961987163,4081628472),t(1508970993,3053834265),t(2453635748,2937671579),t(2870763221,3664609560),t(3624381080,2734883394),t(310598401,1164996542),t(607225278,1323610764),t(1426881987,3590304994),t(1925078388,4068182383),t(2162078206,991336113),t(2614888103,633803317),t(3248222580,3479774868),t(3835390401,2666613458),t(4022224774,944711139),t(264347078,2341262773),t(604807628,2007800933),t(770255983,1495990901),t(1249150122,1856431235),t(1555081692,3175218132),t(1996064986,2198950837),t(2554220882,3999719339),t(2821834349,766784016),t(2952996808,2566594879),t(3210313671,3203337956),t(3336571891,1034457026),t(3584528711,2466948901),t(113926993,3758326383),t(338241895,168717936),t(666307205,1188179964),t(773529912,1546045734),t(1294757372,1522805485),t(1396182291,2643833823),t(1695183700,2343527390),t(1986661051,1014477480),t(2177026350,1206759142),t(2456956037,344077627),t(2730485921,1290863460),t(2820302411,3158454273),t(3259730800,3505952657),t(3345764771,106217008),t(3516065817,3606008344),t(3600352804,1432725776),t(4094571909,1467031594),t(275423344,851169720),t(430227734,3100823752),t(506948616,1363258195),t(659060556,3750685593),t(883997877,3785050280),t(958139571,3318307427),t(1322822218,3812723403),t(1537002063,2003034995),t(1747873779,3602036899),t(1955562222,1575990012),t(2024104815,1125592928),t(2227730452,2716904306),t(2361852424,442776044),t(2428436474,593698344),t(2756734187,3733110249),t(3204031479,2999351573),t(3329325298,3815920427),t(3391569614,3928383900),t(3515267271,566280711),t(3940187606,3454069534),t(4118630271,4000239992),t(116418474,1914138554),t(174292421,2731055270),t(289380356,3203993006),t(460393269,320620315),t(685471733,587496836),t(852142971,1086792851),t(1017036298,365543100),t(1126000580,2618297676),t(1288033470,3409855158),t(1501505948,4234509866),t(1607167915,987167468),t(1816402316,1246189591)],a=[],u=0;80>u;u++)a[u]=t();o=o.SHA512=r.extend({_doReset:function t(){this._hash=new i.init([new n.init(1779033703,4089235720),new n.init(3144134277,2227873595),new n.init(1013904242,4271175723),new n.init(2773480762,1595750129),new n.init(1359893119,2917565137),new n.init(2600822924,725511199),new n.init(528734635,4215389547),new n.init(1541459225,327033209)]);},_doProcessBlock:function t(e,r){for(var n=(f=this._hash.words)[0],i=f[1],o=f[2],u=f[3],c=f[4],h=f[5],l=f[6],f=f[7],g=n.high,d=n.low,p=i.high,v=i.low,y=o.high,m=o.low,_=u.high,S=u.low,b=c.high,w=c.low,F=h.high,E=h.low,x=l.high,A=l.low,k=f.high,P=f.low,C=g,T=d,R=p,I=v,D=y,L=m,N=_,U=S,B=b,O=w,j=F,M=E,H=x,V=A,K=k,q=P,J=0;80>J;J++){var W=a[J];if(16>J)var z=W.high=0|e[r+2*J],Y=W.low=0|e[r+2*J+1];else {z=((Y=(z=a[J-15]).high)>>>1|(G=z.low)<<31)^(Y>>>8|G<<24)^Y>>>7;var G=(G>>>1|Y<<31)^(G>>>8|Y<<24)^(G>>>7|Y<<25),X=((Y=(X=a[J-2]).high)>>>19|($=X.low)<<13)^(Y<<3|$>>>29)^Y>>>6,$=($>>>19|Y<<13)^($<<3|Y>>>29)^($>>>6|Y<<26),Q=(Y=a[J-7]).high,Z=(tt=a[J-16]).high,tt=tt.low;z=(z=(z=z+Q+((Y=G+Y.low)>>>0<G>>>0?1:0))+X+((Y=Y+$)>>>0<$>>>0?1:0))+Z+((Y=Y+tt)>>>0<tt>>>0?1:0);W.high=z,W.low=Y;}Q=B&j^~B&H,tt=O&M^~O&V,W=C&R^C&D^R&D;var et=T&I^T&L^I&L,rt=(G=(C>>>28|T<<4)^(C<<30|T>>>2)^(C<<25|T>>>7),X=(T>>>28|C<<4)^(T<<30|C>>>2)^(T<<25|C>>>7),($=s[J]).high),nt=$.low;Z=K+((B>>>14|O<<18)^(B>>>18|O<<14)^(B<<23|O>>>9))+(($=q+((O>>>14|B<<18)^(O>>>18|B<<14)^(O<<23|B>>>9)))>>>0<q>>>0?1:0),K=H,q=V,H=j,V=M,j=B,M=O,B=N+(Z=(Z=(Z=Z+Q+(($=$+tt)>>>0<tt>>>0?1:0))+rt+(($=$+nt)>>>0<nt>>>0?1:0))+z+(($=$+Y)>>>0<Y>>>0?1:0))+((O=U+$|0)>>>0<U>>>0?1:0)|0,N=D,U=L,D=R,L=I,R=C,I=T,C=Z+(W=G+W+((Y=X+et)>>>0<X>>>0?1:0))+((T=$+Y|0)>>>0<$>>>0?1:0)|0;}d=n.low=d+T,n.high=g+C+(d>>>0<T>>>0?1:0),v=i.low=v+I,i.high=p+R+(v>>>0<I>>>0?1:0),m=o.low=m+L,o.high=y+D+(m>>>0<L>>>0?1:0),S=u.low=S+U,u.high=_+N+(S>>>0<U>>>0?1:0),w=c.low=w+O,c.high=b+B+(w>>>0<O>>>0?1:0),E=h.low=E+M,h.high=F+j+(E>>>0<M>>>0?1:0),A=l.low=A+V,l.high=x+H+(A>>>0<V>>>0?1:0),P=f.low=P+q,f.high=k+K+(P>>>0<q>>>0?1:0);},_doFinalize:function t(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes;return r[i>>>5]|=128<<24-i%32,r[30+(i+128>>>10<<5)]=Math.floor(n/4294967296),r[31+(i+128>>>10<<5)]=n,e.sigBytes=4*r.length,this._process(),this._hash.toX32()},clone:function t(){var e=r.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:32}),e.SHA512=r._createHelper(o),e.HmacSHA512=r._createHmacHelper(o);}(),function(){var t=y,e=(i=t.x64).Word,r=i.WordArray,n=(i=t.algo).SHA512,i=i.SHA384=n.extend({_doReset:function t(){this._hash=new r.init([new e.init(3418070365,3238371032),new e.init(1654270250,914150663),new e.init(2438529370,812702999),new e.init(355462360,4144912697),new e.init(1731405415,4290775857),new e.init(2394180231,1750603025),new e.init(3675008525,1694076839),new e.init(1203062813,3204075428)]);},_doFinalize:function t(){var e=n._doFinalize.call(this);return e.sigBytes-=16,e}});t.SHA384=n._createHelper(i),t.HmacSHA384=n._createHmacHelper(i);}();
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var m,_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function S(t){var e,r,n="";for(e=0;e+3<=t.length;e+=3)r=parseInt(t.substring(e,e+3),16),n+=_.charAt(r>>6)+_.charAt(63&r);for(e+1==t.length?(r=parseInt(t.substring(e,e+1),16),n+=_.charAt(r<<2)):e+2==t.length&&(r=parseInt(t.substring(e,e+2),16),n+=_.charAt(r>>2)+_.charAt((3&r)<<4)),"=";(3&n.length)>0;)n+="=";return n}function b(t){var e,r,n,i="",o=0;for(e=0;e<t.length&&"="!=t.charAt(e);++e)(n=_.indexOf(t.charAt(e)))<0||(0==o?(i+=R(n>>2),r=3&n,o=1):1==o?(i+=R(r<<2|n>>4),r=15&n,o=2):2==o?(i+=R(r),i+=R(n>>2),r=3&n,o=3):(i+=R(r<<2|n>>4),i+=R(15&n),o=0));return 1==o&&(i+=R(r<<2)),i}function w(t){var e,r=b(t),n=new Array;for(e=0;2*e<r.length;++e)n[e]=parseInt(r.substring(2*e,2*e+2),16);return n}function F(t,e,r){null!=t&&("number"==typeof t?this.fromNumber(t,e,r):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e));}function E(){return new F(null)}(F.prototype.am=function A(t,e,r,n,i,o){for(;--o>=0;){var s=e*this[t++]+r[n]+i;i=Math.floor(s/67108864),r[n++]=67108863&s;}return i},m=26),F.prototype.DB=m,F.prototype.DM=(1<<m)-1,F.prototype.DV=1<<m;F.prototype.FV=Math.pow(2,52),F.prototype.F1=52-m,F.prototype.F2=2*m-52;var P,C,T=new Array;for(P="0".charCodeAt(0),C=0;C<=9;++C)T[P++]=C;for(P="a".charCodeAt(0),C=10;C<36;++C)T[P++]=C;for(P="A".charCodeAt(0),C=10;C<36;++C)T[P++]=C;function R(t){return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)}function I(t,e){var r=T[t.charCodeAt(e)];return null==r?-1:r}function D(t){var e=E();return e.fromInt(t),e}function L(t){var e,r=1;return 0!=(e=t>>>16)&&(t=e,r+=16),0!=(e=t>>8)&&(t=e,r+=8),0!=(e=t>>4)&&(t=e,r+=4),0!=(e=t>>2)&&(t=e,r+=2),0!=(e=t>>1)&&(t=e,r+=1),r}function N(t){this.m=t;}function U(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t;}function B(t,e){return t&e}function O(t,e){return t|e}function j(t,e){return t^e}function M(t,e){return t&~e}function H(t){if(0==t)return -1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function V(t){for(var e=0;0!=t;)t&=t-1,++e;return e}function K(){}function q(t){return t}function J(t){this.r2=E(),this.q3=E(),F.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t;}N.prototype.convert=function W(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t},N.prototype.revert=function z(t){return t},N.prototype.reduce=function Y(t){t.divRemTo(this.m,null,t);},N.prototype.mulTo=function G(t,e,r){t.multiplyTo(e,r),this.reduce(r);},N.prototype.sqrTo=function X(t,e){t.squareTo(e),this.reduce(e);},U.prototype.convert=function $(t){var e=E();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&e.compareTo(F.ZERO)>0&&this.m.subTo(e,e),e},U.prototype.revert=function Q(t){var e=E();return t.copyTo(e),this.reduce(e),e},U.prototype.reduce=function Z(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var r=32767&t[e],n=r*this.mpl+((r*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[r=e+this.m.t]+=this.m.am(0,n,t,e,0,this.m.t);t[r]>=t.DV;)t[r]-=t.DV,t[++r]++;}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t);},U.prototype.mulTo=function tt(t,e,r){t.multiplyTo(e,r),this.reduce(r);},U.prototype.sqrTo=function et(t,e){t.squareTo(e),this.reduce(e);},F.prototype.copyTo=function rt(t){for(var e=this.t-1;e>=0;--e)t[e]=this[e];t.t=this.t,t.s=this.s;},F.prototype.fromInt=function nt(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0;},F.prototype.fromString=function it(t,e){var r;if(16==e)r=4;else if(8==e)r=3;else if(256==e)r=8;else if(2==e)r=1;else if(32==e)r=5;else {if(4!=e)return void this.fromRadix(t,e);r=2;}this.t=0,this.s=0;for(var n=t.length,i=!1,o=0;--n>=0;){var s=8==r?255&t[n]:I(t,n);s<0?"-"==t.charAt(n)&&(i=!0):(i=!1,0==o?this[this.t++]=s:o+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-o)-1)<<o,this[this.t++]=s>>this.DB-o):this[this.t-1]|=s<<o,(o+=r)>=this.DB&&(o-=this.DB));}8==r&&0!=(128&t[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),i&&F.ZERO.subTo(this,this);},F.prototype.clamp=function ot(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t;},F.prototype.dlShiftTo=function st(t,e){var r;for(r=this.t-1;r>=0;--r)e[r+t]=this[r];for(r=t-1;r>=0;--r)e[r]=0;e.t=this.t+t,e.s=this.s;},F.prototype.drShiftTo=function at(t,e){for(var r=t;r<this.t;++r)e[r-t]=this[r];e.t=Math.max(this.t-t,0),e.s=this.s;},F.prototype.lShiftTo=function ut(t,e){var r,n=t%this.DB,i=this.DB-n,o=(1<<i)-1,s=Math.floor(t/this.DB),a=this.s<<n&this.DM;for(r=this.t-1;r>=0;--r)e[r+s+1]=this[r]>>i|a,a=(this[r]&o)<<n;for(r=s-1;r>=0;--r)e[r]=0;e[s]=a,e.t=this.t+s+1,e.s=this.s,e.clamp();},F.prototype.rShiftTo=function ct(t,e){e.s=this.s;var r=Math.floor(t/this.DB);if(r>=this.t)e.t=0;else {var n=t%this.DB,i=this.DB-n,o=(1<<n)-1;e[0]=this[r]>>n;for(var s=r+1;s<this.t;++s)e[s-r-1]|=(this[s]&o)<<i,e[s-r]=this[s]>>n;n>0&&(e[this.t-r-1]|=(this.s&o)<<i),e.t=this.t-r,e.clamp();}},F.prototype.subTo=function ht(t,e){for(var r=0,n=0,i=Math.min(t.t,this.t);r<i;)n+=this[r]-t[r],e[r++]=n&this.DM,n>>=this.DB;if(t.t<this.t){for(n-=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB;n+=this.s;}else {for(n+=this.s;r<t.t;)n-=t[r],e[r++]=n&this.DM,n>>=this.DB;n-=t.s;}e.s=n<0?-1:0,n<-1?e[r++]=this.DV+n:n>0&&(e[r++]=n),e.t=r,e.clamp();},F.prototype.multiplyTo=function lt(t,e){var r=this.abs(),n=t.abs(),i=r.t;for(e.t=i+n.t;--i>=0;)e[i]=0;for(i=0;i<n.t;++i)e[i+r.t]=r.am(0,n[i],e,i,0,r.t);e.s=0,e.clamp(),this.s!=t.s&&F.ZERO.subTo(e,e);},F.prototype.squareTo=function ft(t){for(var e=this.abs(),r=t.t=2*e.t;--r>=0;)t[r]=0;for(r=0;r<e.t-1;++r){var n=e.am(r,e[r],t,2*r,0,1);(t[r+e.t]+=e.am(r+1,2*e[r],t,2*r+1,n,e.t-r-1))>=e.DV&&(t[r+e.t]-=e.DV,t[r+e.t+1]=1);}t.t>0&&(t[t.t-1]+=e.am(r,e[r],t,2*r,0,1)),t.s=0,t.clamp();},F.prototype.divRemTo=function gt(t,e,r){var n=t.abs();if(!(n.t<=0)){var i=this.abs();if(i.t<n.t)return null!=e&&e.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=E());var o=E(),s=this.s,a=t.s,u=this.DB-L(n[n.t-1]);u>0?(n.lShiftTo(u,o),i.lShiftTo(u,r)):(n.copyTo(o),i.copyTo(r));var c=o.t,h=o[c-1];if(0!=h){var l=h*(1<<this.F1)+(c>1?o[c-2]>>this.F2:0),f=this.FV/l,g=(1<<this.F1)/l,d=1<<this.F2,p=r.t,v=p-c,y=null==e?E():e;for(o.dlShiftTo(v,y),r.compareTo(y)>=0&&(r[r.t++]=1,r.subTo(y,r)),F.ONE.dlShiftTo(c,y),y.subTo(o,o);o.t<c;)o[o.t++]=0;for(;--v>=0;){var m=r[--p]==h?this.DM:Math.floor(r[p]*f+(r[p-1]+d)*g);if((r[p]+=o.am(0,m,r,v,0,c))<m)for(o.dlShiftTo(v,y),r.subTo(y,r);r[p]<--m;)r.subTo(y,r);}null!=e&&(r.drShiftTo(c,e),s!=a&&F.ZERO.subTo(e,e)),r.t=c,r.clamp(),u>0&&r.rShiftTo(u,r),s<0&&F.ZERO.subTo(r,r);}}},F.prototype.invDigit=function dt(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return (e=(e=(e=(e=e*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)>0?this.DV-e:-e},F.prototype.isEven=function pt(){return 0==(this.t>0?1&this[0]:this.s)},F.prototype.exp=function vt(t,e){if(t>4294967295||t<1)return F.ONE;var r=E(),n=E(),i=e.convert(this),o=L(t)-1;for(i.copyTo(r);--o>=0;)if(e.sqrTo(r,n),(t&1<<o)>0)e.mulTo(n,i,r);else {var s=r;r=n,n=s;}return e.revert(r)},F.prototype.toString=function yt(t){if(this.s<0)return "-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else {if(4!=t)return this.toRadix(t);e=2;}var r,n=(1<<e)-1,i=!1,o="",s=this.t,a=this.DB-s*this.DB%e;if(s-- >0)for(a<this.DB&&(r=this[s]>>a)>0&&(i=!0,o=R(r));s>=0;)a<e?(r=(this[s]&(1<<a)-1)<<e-a,r|=this[--s]>>(a+=this.DB-e)):(r=this[s]>>(a-=e)&n,a<=0&&(a+=this.DB,--s)),r>0&&(i=!0),i&&(o+=R(r));return i?o:"0"},F.prototype.negate=function mt(){var t=E();return F.ZERO.subTo(this,t),t},F.prototype.abs=function _t(){return this.s<0?this.negate():this},F.prototype.compareTo=function St(t){var e=this.s-t.s;if(0!=e)return e;var r=this.t;if(0!=(e=r-t.t))return this.s<0?-e:e;for(;--r>=0;)if(0!=(e=this[r]-t[r]))return e;return 0},F.prototype.bitLength=function bt(){return this.t<=0?0:this.DB*(this.t-1)+L(this[this.t-1]^this.s&this.DM)},F.prototype.mod=function wt(t){var e=E();return this.abs().divRemTo(t,null,e),this.s<0&&e.compareTo(F.ZERO)>0&&t.subTo(e,e),e},F.prototype.modPowInt=function Ft(t,e){var r;return r=t<256||e.isEven()?new N(e):new U(e),this.exp(t,r)},F.ZERO=D(0),F.ONE=D(1),K.prototype.convert=q,K.prototype.revert=q,K.prototype.mulTo=function Et(t,e,r){t.multiplyTo(e,r);},K.prototype.sqrTo=function xt(t,e){t.squareTo(e);},J.prototype.convert=function At(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=E();return t.copyTo(e),this.reduce(e),e},J.prototype.revert=function kt(t){return t},J.prototype.reduce=function Pt(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t);},J.prototype.mulTo=function Ct(t,e,r){t.multiplyTo(e,r),this.reduce(r);},J.prototype.sqrTo=function Tt(t,e){t.squareTo(e),this.reduce(e);};var Rt=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],It=(1<<26)/Rt[Rt.length-1];
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Dt(){this.i=0,this.j=0,this.S=new Array;}F.prototype.chunkSize=function Lt(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},F.prototype.toRadix=function Nt(t){if(null==t&&(t=10),0==this.signum()||t<2||t>36)return "0";var e=this.chunkSize(t),r=Math.pow(t,e),n=D(r),i=E(),o=E(),s="";for(this.divRemTo(n,i,o);i.signum()>0;)s=(r+o.intValue()).toString(t).substr(1)+s,i.divRemTo(n,i,o);return o.intValue().toString(t)+s},F.prototype.fromRadix=function Ut(t,e){this.fromInt(0),null==e&&(e=10);for(var r=this.chunkSize(e),n=Math.pow(e,r),i=!1,o=0,s=0,a=0;a<t.length;++a){var u=I(t,a);u<0?"-"==t.charAt(a)&&0==this.signum()&&(i=!0):(s=e*s+u,++o>=r&&(this.dMultiply(n),this.dAddOffset(s,0),o=0,s=0));}o>0&&(this.dMultiply(Math.pow(e,o)),this.dAddOffset(s,0)),i&&F.ZERO.subTo(this,this);},F.prototype.fromNumber=function Bt(t,e,r){if("number"==typeof e)if(t<2)this.fromInt(1);else for(this.fromNumber(t,r),this.testBit(t-1)||this.bitwiseTo(F.ONE.shiftLeft(t-1),O,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(e);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(F.ONE.shiftLeft(t-1),this);else {var n=new Array,i=7&t;n.length=1+(t>>3),e.nextBytes(n),i>0?n[0]&=(1<<i)-1:n[0]=0,this.fromString(n,256);}},F.prototype.bitwiseTo=function Ot(t,e,r){var n,i,o=Math.min(t.t,this.t);for(n=0;n<o;++n)r[n]=e(this[n],t[n]);if(t.t<this.t){for(i=t.s&this.DM,n=o;n<this.t;++n)r[n]=e(this[n],i);r.t=this.t;}else {for(i=this.s&this.DM,n=o;n<t.t;++n)r[n]=e(i,t[n]);r.t=t.t;}r.s=e(this.s,t.s),r.clamp();},F.prototype.changeBit=function jt(t,e){var r=F.ONE.shiftLeft(t);return this.bitwiseTo(r,e,r),r},F.prototype.addTo=function Mt(t,e){for(var r=0,n=0,i=Math.min(t.t,this.t);r<i;)n+=this[r]+t[r],e[r++]=n&this.DM,n>>=this.DB;if(t.t<this.t){for(n+=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB;n+=this.s;}else {for(n+=this.s;r<t.t;)n+=t[r],e[r++]=n&this.DM,n>>=this.DB;n+=t.s;}e.s=n<0?-1:0,n>0?e[r++]=n:n<-1&&(e[r++]=this.DV+n),e.t=r,e.clamp();},F.prototype.dMultiply=function Ht(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp();},F.prototype.dAddOffset=function Vt(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e];}},F.prototype.multiplyLowerTo=function Kt(t,e,r){var n,i=Math.min(this.t+t.t,e);for(r.s=0,r.t=i;i>0;)r[--i]=0;for(n=r.t-this.t;i<n;++i)r[i+this.t]=this.am(0,t[i],r,i,0,this.t);for(n=Math.min(t.t,e);i<n;++i)this.am(0,t[i],r,i,0,e-i);r.clamp();},F.prototype.multiplyUpperTo=function qt(t,e,r){--e;var n=r.t=this.t+t.t-e;for(r.s=0;--n>=0;)r[n]=0;for(n=Math.max(e-this.t,0);n<t.t;++n)r[this.t+n-e]=this.am(e-n,t[n],r,0,0,this.t+n-e);r.clamp(),r.drShiftTo(1,r);},F.prototype.modInt=function Jt(t){if(t<=0)return 0;var e=this.DV%t,r=this.s<0?t-1:0;if(this.t>0)if(0==e)r=this[0]%t;else for(var n=this.t-1;n>=0;--n)r=(e*r+this[n])%t;return r},F.prototype.millerRabin=function Wt(t){var e=this.subtract(F.ONE),r=e.getLowestSetBit();if(r<=0)return !1;var n=e.shiftRight(r);(t=t+1>>1)>Rt.length&&(t=Rt.length);for(var i=E(),o=0;o<t;++o){i.fromInt(Rt[Math.floor(Math.random()*Rt.length)]);var s=i.modPow(n,this);if(0!=s.compareTo(F.ONE)&&0!=s.compareTo(e)){for(var a=1;a++<r&&0!=s.compareTo(e);)if(0==(s=s.modPowInt(2,this)).compareTo(F.ONE))return !1;if(0!=s.compareTo(e))return !1}}return !0},F.prototype.clone=
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function zt(){var t=E();return this.copyTo(t),t},F.prototype.intValue=function Yt(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return -1}else {if(1==this.t)return this[0];if(0==this.t)return 0}return (this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},F.prototype.byteValue=function Gt(){return 0==this.t?this.s:this[0]<<24>>24},F.prototype.shortValue=function Xt(){return 0==this.t?this.s:this[0]<<16>>16},F.prototype.signum=function $t(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},F.prototype.toByteArray=function Qt(){var t=this.t,e=new Array;e[0]=this.s;var r,n=this.DB-t*this.DB%8,i=0;if(t-- >0)for(n<this.DB&&(r=this[t]>>n)!=(this.s&this.DM)>>n&&(e[i++]=r|this.s<<this.DB-n);t>=0;)n<8?(r=(this[t]&(1<<n)-1)<<8-n,r|=this[--t]>>(n+=this.DB-8)):(r=this[t]>>(n-=8)&255,n<=0&&(n+=this.DB,--t)),0!=(128&r)&&(r|=-256),0==i&&(128&this.s)!=(128&r)&&++i,(i>0||r!=this.s)&&(e[i++]=r);return e},F.prototype.equals=function Zt(t){return 0==this.compareTo(t)},F.prototype.min=function te(t){return this.compareTo(t)<0?this:t},F.prototype.max=function ee(t){return this.compareTo(t)>0?this:t},F.prototype.and=function re(t){var e=E();return this.bitwiseTo(t,B,e),e},F.prototype.or=function ne(t){var e=E();return this.bitwiseTo(t,O,e),e},F.prototype.xor=function ie(t){var e=E();return this.bitwiseTo(t,j,e),e},F.prototype.andNot=function oe(t){var e=E();return this.bitwiseTo(t,M,e),e},F.prototype.not=function se(){for(var t=E(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t},F.prototype.shiftLeft=function ae(t){var e=E();return t<0?this.rShiftTo(-t,e):this.lShiftTo(t,e),e},F.prototype.shiftRight=function ue(t){var e=E();return t<0?this.lShiftTo(-t,e):this.rShiftTo(t,e),e},F.prototype.getLowestSetBit=function ce(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+H(this[t]);return this.s<0?this.t*this.DB:-1},F.prototype.bitCount=function he(){for(var t=0,e=this.s&this.DM,r=0;r<this.t;++r)t+=V(this[r]^e);return t},F.prototype.testBit=function le(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)},F.prototype.setBit=function fe(t){return this.changeBit(t,O)},F.prototype.clearBit=function ge(t){return this.changeBit(t,M)},F.prototype.flipBit=function de(t){return this.changeBit(t,j)},F.prototype.add=function pe(t){var e=E();return this.addTo(t,e),e},F.prototype.subtract=function ve(t){var e=E();return this.subTo(t,e),e},F.prototype.multiply=function ye(t){var e=E();return this.multiplyTo(t,e),e},F.prototype.divide=function me(t){var e=E();return this.divRemTo(t,e,null),e},F.prototype.remainder=function _e(t){var e=E();return this.divRemTo(t,null,e),e},F.prototype.divideAndRemainder=function Se(t){var e=E(),r=E();return this.divRemTo(t,e,r),new Array(e,r)},F.prototype.modPow=function be(t,e){var r,n,i=t.bitLength(),o=D(1);if(i<=0)return o;r=i<18?1:i<48?3:i<144?4:i<768?5:6,n=i<8?new N(e):e.isEven()?new J(e):new U(e);var s=new Array,a=3,u=r-1,c=(1<<r)-1;if(s[1]=n.convert(this),r>1){var h=E();for(n.sqrTo(s[1],h);a<=c;)s[a]=E(),n.mulTo(h,s[a-2],s[a]),a+=2;}var l,f,g=t.t-1,d=!0,p=E();for(i=L(t[g])-1;g>=0;){for(i>=u?l=t[g]>>i-u&c:(l=(t[g]&(1<<i+1)-1)<<u-i,g>0&&(l|=t[g-1]>>this.DB+i-u)),a=r;0==(1&l);)l>>=1,--a;if((i-=a)<0&&(i+=this.DB,--g),d)s[l].copyTo(o),d=!1;else {for(;a>1;)n.sqrTo(o,p),n.sqrTo(p,o),a-=2;a>0?n.sqrTo(o,p):(f=o,o=p,p=f),n.mulTo(p,s[l],o);}for(;g>=0&&0==(t[g]&1<<i);)n.sqrTo(o,p),f=o,o=p,p=f,--i<0&&(i=this.DB-1,--g);}return n.revert(o)},F.prototype.modInverse=function we(t){var e=t.isEven();if(this.isEven()&&e||0==t.signum())return F.ZERO;for(var r=t.clone(),n=this.clone(),i=D(1),o=D(0),s=D(0),a=D(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),e?(i.isEven()&&o.isEven()||(i.addTo(this,i),o.subTo(t,o)),i.rShiftTo(1,i)):o.isEven()||o.subTo(t,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),e?(s.isEven()&&a.isEven()||(s.addTo(this,s),a.subTo(t,a)),s.rShiftTo(1,s)):a.isEven()||a.subTo(t,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),e&&i.subTo(s,i),o.subTo(a,o)):(n.subTo(r,n),e&&s.subTo(i,s),a.subTo(o,a));}return 0!=n.compareTo(F.ONE)?F.ZERO:a.compareTo(t)>=0?a.subtract(t):a.signum()<0?(a.addTo(t,a),a.signum()<0?a.add(t):a):a},F.prototype.pow=function Fe(t){return this.exp(t,new K)},F.prototype.gcd=function Ee(t){var e=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(e.compareTo(r)<0){var n=e;e=r,r=n;}var i=e.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)return e;for(i<o&&(o=i),o>0&&(e.rShiftTo(o,e),r.rShiftTo(o,r));e.signum()>0;)(i=e.getLowestSetBit())>0&&e.rShiftTo(i,e),(i=r.getLowestSetBit())>0&&r.rShiftTo(i,r),e.compareTo(r)>=0?(e.subTo(r,e),e.rShiftTo(1,e)):(r.subTo(e,r),r.rShiftTo(1,r));return o>0&&r.lShiftTo(o,r),r},F.prototype.isProbablePrime=function xe(t){var e,r=this.abs();if(1==r.t&&r[0]<=Rt[Rt.length-1]){for(e=0;e<Rt.length;++e)if(r[0]==Rt[e])return !0;return !1}if(r.isEven())return !1;for(e=1;e<Rt.length;){for(var n=Rt[e],i=e+1;i<Rt.length&&n<It;)n*=Rt[i++];for(n=r.modInt(n);e<i;)if(n%Rt[e++]==0)return !1}return r.millerRabin(t)},F.prototype.square=function Ae(){var t=E();return this.squareTo(t),t},Dt.prototype.init=function ke(t){var e,r,n;for(e=0;e<256;++e)this.S[e]=e;for(r=0,e=0;e<256;++e)r=r+this.S[e]+t[e%t.length]&255,n=this.S[e],this.S[e]=this.S[r],this.S[r]=n;this.i=0,this.j=0;},Dt.prototype.next=function Pe(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var Ce,Te,Re;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */function Ie(){!function t(e){Te[Re++]^=255&e,Te[Re++]^=e>>8&255,Te[Re++]^=e>>16&255,Te[Re++]^=e>>24&255,Re>=256&&(Re-=256);}((new Date).getTime());}if(null==Te){var De;if(Te=new Array,Re=0,void 0!==i&&(void 0!==i.msCrypto)){var Le=i.msCrypto;if(Le.getRandomValues){var Ne=new Uint8Array(32);for(Le.getRandomValues(Ne),De=0;De<32;++De)Te[Re++]=Ne[De];}}for(;Re<256;)De=Math.floor(65536*Math.random()),Te[Re++]=De>>>8,Te[Re++]=255&De;Re=0,Ie();}function Be(){if(null==Ce){for(Ie(),(Ce=function t(){return new Dt}()).init(Te),Re=0;Re<Te.length;++Re)Te[Re]=0;Re=0;}return Ce.next()}function Oe(){}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function je(t,e){return new F(t,e)}function Me(t,e,r){for(var n="",i=0;n.length<e;)n+=r(String.fromCharCode.apply(String,t.concat([(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i]))),i+=1;return n}function He(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null;}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Ve(t,e){this.x=e,this.q=t;}function Ke(t,e,r,n){this.curve=t,this.x=e,this.y=r,this.z=null==n?F.ONE:n,this.zinv=null;}function qe(t,e,r){this.q=t,this.a=this.fromBigInteger(e),this.b=this.fromBigInteger(r),this.infinity=new Ke(this,null,null);}Oe.prototype.nextBytes=function Je(t){var e;for(e=0;e<t.length;++e)t[e]=Be();},He.prototype.doPublic=function We(t){return t.modPowInt(this.e,this.n)},He.prototype.setPublic=function ze(t,e){if(this.isPublic=!0,this.isPrivate=!1,"string"!=typeof t)this.n=t,this.e=e;else {if(!(null!=t&&null!=e&&t.length>0&&e.length>0))throw "Invalid RSA public key";this.n=je(t,16),this.e=parseInt(e,16);}},He.prototype.encrypt=function Ye(t){var e=function r(t,e){if(e<t.length+11)throw "Message too long for RSA";for(var r=new Array,n=t.length-1;n>=0&&e>0;){var i=t.charCodeAt(n--);i<128?r[--e]=i:i>127&&i<2048?(r[--e]=63&i|128,r[--e]=i>>6|192):(r[--e]=63&i|128,r[--e]=i>>6&63|128,r[--e]=i>>12|224);}r[--e]=0;for(var o=new Oe,s=new Array;e>2;){for(s[0]=0;0==s[0];)o.nextBytes(s);r[--e]=s[0];}return r[--e]=2,r[--e]=0,new F(r)}(t,this.n.bitLength()+7>>3);if(null==e)return null;var n=this.doPublic(e);if(null==n)return null;var i=n.toString(16);return 0==(1&i.length)?i:"0"+i},He.prototype.encryptOAEP=function Ge(t,e,r){var n=function i(t,e,r,n){var i=br.crypto.MessageDigest,o=br.crypto.Util,s=null;if(r||(r="sha1"),"string"==typeof r&&(s=i.getCanonicalAlgName(r),n=i.getHashLength(s),r=function t(e){return Nr(o.hashHex(Ur(e),s))}),t.length+2*n+2>e)throw "Message too long for RSA";var a,u="";for(a=0;a<e-t.length-2*n-2;a+=1)u+="\0";var c=r("")+u+""+t,h=new Array(n);(new Oe).nextBytes(h);var l=Me(h,c.length,r),f=[];for(a=0;a<c.length;a+=1)f[a]=c.charCodeAt(a)^l.charCodeAt(a);var g=Me(f,h.length,r),d=[0];for(a=0;a<h.length;a+=1)d[a+1]=h[a]^g.charCodeAt(a);return new F(d.concat(f))}(t,this.n.bitLength()+7>>3,e,r);if(null==n)return null;var o=this.doPublic(n);if(null==o)return null;var s=o.toString(16);return 0==(1&s.length)?s:"0"+s},He.prototype.type="RSA",Ve.prototype.equals=function Xe(t){return t==this||this.q.equals(t.q)&&this.x.equals(t.x)},Ve.prototype.toBigInteger=function $e(){return this.x},Ve.prototype.negate=function Qe(){return new Ve(this.q,this.x.negate().mod(this.q))},Ve.prototype.add=function Ze(t){return new Ve(this.q,this.x.add(t.toBigInteger()).mod(this.q))},Ve.prototype.subtract=function tr(t){return new Ve(this.q,this.x.subtract(t.toBigInteger()).mod(this.q))},Ve.prototype.multiply=function er(t){return new Ve(this.q,this.x.multiply(t.toBigInteger()).mod(this.q))},Ve.prototype.square=function rr(){return new Ve(this.q,this.x.square().mod(this.q))},Ve.prototype.divide=function nr(t){return new Ve(this.q,this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))},Ke.prototype.getX=function ir(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))},Ke.prototype.getY=function or(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))},Ke.prototype.equals=function sr(t){return t==this||(this.isInfinity()?t.isInfinity():t.isInfinity()?this.isInfinity():!!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(F.ZERO)&&t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(F.ZERO))},Ke.prototype.isInfinity=function ar(){return null==this.x&&null==this.y||this.z.equals(F.ZERO)&&!this.y.toBigInteger().equals(F.ZERO)},Ke.prototype.negate=function ur(){return new Ke(this.curve,this.x,this.y.negate(),this.z)},Ke.prototype.add=function cr(t){if(this.isInfinity())return t;if(t.isInfinity())return this;var e=t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q),r=t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q);if(F.ZERO.equals(r))return F.ZERO.equals(e)?this.twice():this.curve.getInfinity();var n=new F("3"),i=this.x.toBigInteger(),o=this.y.toBigInteger(),s=(t.x.toBigInteger(),t.y.toBigInteger(),r.square()),a=s.multiply(r),u=i.multiply(s),c=e.square().multiply(this.z),h=c.subtract(u.shiftLeft(1)).multiply(t.z).subtract(a).multiply(r).mod(this.curve.q),l=u.multiply(n).multiply(e).subtract(o.multiply(a)).subtract(c.multiply(e)).multiply(t.z).add(e.multiply(a)).mod(this.curve.q),f=a.multiply(this.z).multiply(t.z).mod(this.curve.q);return new Ke(this.curve,this.curve.fromBigInteger(h),this.curve.fromBigInteger(l),f)},Ke.prototype.twice=function hr(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var t=new F("3"),e=this.x.toBigInteger(),r=this.y.toBigInteger(),n=r.multiply(this.z),i=n.multiply(r).mod(this.curve.q),o=this.curve.a.toBigInteger(),s=e.square().multiply(t);F.ZERO.equals(o)||(s=s.add(this.z.square().multiply(o)));var a=(s=s.mod(this.curve.q)).square().subtract(e.shiftLeft(3).multiply(i)).shiftLeft(1).multiply(n).mod(this.curve.q),u=s.multiply(t).multiply(e).subtract(i.shiftLeft(1)).shiftLeft(2).multiply(i).subtract(s.square().multiply(s)).mod(this.curve.q),c=n.square().multiply(n).shiftLeft(3).mod(this.curve.q);return new Ke(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(u),c)},Ke.prototype.multiply=function lr(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,r=t,n=r.multiply(new F("3")),i=this.negate(),o=this,s=this.curve.q.subtract(t),a=s.multiply(new F("3")),u=new Ke(this.curve,this.x,this.y),c=u.negate();for(e=n.bitLength()-2;e>0;--e){o=o.twice();var h=n.testBit(e);h!=r.testBit(e)&&(o=o.add(h?this:i));}for(e=a.bitLength()-2;e>0;--e){u=u.twice();var l=a.testBit(e);l!=s.testBit(e)&&(u=u.add(l?u:c));}return o},Ke.prototype.multiplyTwo=function fr(t,e,r){var n;n=t.bitLength()>r.bitLength()?t.bitLength()-1:r.bitLength()-1;for(var i=this.curve.getInfinity(),o=this.add(e);n>=0;)i=i.twice(),t.testBit(n)?i=r.testBit(n)?i.add(o):i.add(this):r.testBit(n)&&(i=i.add(e)),--n;return i},qe.prototype.getQ=function gr(){return this.q},qe.prototype.getA=function dr(){return this.a},qe.prototype.getB=function pr(){return this.b},qe.prototype.equals=function vr(t){return t==this||this.q.equals(t.q)&&this.a.equals(t.a)&&this.b.equals(t.b)},qe.prototype.getInfinity=function yr(){return this.infinity},qe.prototype.fromBigInteger=function mr(t){return new Ve(this.q,t)},qe.prototype.decodePointHex=function _r(t){switch(parseInt(t.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var e=(t.length-2)/2,r=t.substr(2,e),n=t.substr(e+2,e);return new Ke(this,this.fromBigInteger(new F(r,16)),this.fromBigInteger(new F(n,16)));default:return null}},
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
 */
Ve.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)},Ke.prototype.getEncoded=function(t){var e=function t(e,r){var n=e.toByteArrayUnsigned();if(r<n.length)n=n.slice(n.length-r);else for(;r>n.length;)n.unshift(0);return n},r=this.getX().toBigInteger(),n=this.getY().toBigInteger(),i=e(r,32);return t?n.isEven()?i.unshift(2):i.unshift(3):(i.unshift(4),i=i.concat(e(n,32))),i},Ke.decodeFrom=function(t,e){e[0];var r=e.length-1,n=e.slice(1,1+r/2),i=e.slice(1+r/2,1+r);n.unshift(0),i.unshift(0);var o=new F(n),s=new F(i);return new Ke(t,t.fromBigInteger(o),t.fromBigInteger(s))},Ke.decodeFromHex=function(t,e){e.substr(0,2);var r=e.length-2,n=e.substr(2,r/2),i=e.substr(2+r/2,r/2),o=new F(n,16),s=new F(i,16);return new Ke(t,t.fromBigInteger(o),t.fromBigInteger(s))},Ke.prototype.add2D=function(t){if(this.isInfinity())return t;if(t.isInfinity())return this;if(this.x.equals(t.x))return this.y.equals(t.y)?this.twice():this.curve.getInfinity();var e=t.x.subtract(this.x),r=t.y.subtract(this.y).divide(e),n=r.square().subtract(this.x).subtract(t.x),i=r.multiply(this.x.subtract(n)).subtract(this.y);return new Ke(this.curve,n,i)},Ke.prototype.twice2D=function(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var t=this.curve.fromBigInteger(F.valueOf(2)),e=this.curve.fromBigInteger(F.valueOf(3)),r=this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(t)),n=r.square().subtract(this.x.multiply(t)),i=r.multiply(this.x.subtract(n)).subtract(this.y);return new Ke(this.curve,n,i)},Ke.prototype.multiply2D=function(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,r=t,n=r.multiply(new F("3")),i=this.negate(),o=this;for(e=n.bitLength()-2;e>0;--e){o=o.twice();var s=n.testBit(e);s!=r.testBit(e)&&(o=o.add2D(s?this:i));}return o},Ke.prototype.isOnCurve=function(){var t=this.getX().toBigInteger(),e=this.getY().toBigInteger(),r=this.curve.getA().toBigInteger(),n=this.curve.getB().toBigInteger(),i=this.curve.getQ(),o=e.multiply(e).mod(i),s=t.multiply(t).multiply(t).add(r.multiply(t)).add(n).mod(i);return o.equals(s)},Ke.prototype.toString=function(){return "("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"},Ke.prototype.validate=function(){var t=this.curve.getQ();if(this.isInfinity())throw new Error("Point is at infinity.");var e=this.getX().toBigInteger(),r=this.getY().toBigInteger();if(e.compareTo(F.ONE)<0||e.compareTo(t.subtract(F.ONE))>0)throw new Error("x coordinate out of bounds");if(r.compareTo(F.ONE)<0||r.compareTo(t.subtract(F.ONE))>0)throw new Error("y coordinate out of bounds");if(!this.isOnCurve())throw new Error("Point is not on the curve.");if(this.multiply(t).isInfinity())throw new Error("Point is not a scalar multiple of G.");return !0};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var Sr=function(){var t=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),e=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),n={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function i(t,e,r){return e?n[e]:String.fromCharCode(parseInt(r,16))}var o=new String(""),s=Object.hasOwnProperty;return function(n,a){var u,c,h=n.match(t),l=h[0],f=!1;"{"===l?u={}:"["===l?u=[]:(u=[],f=!0);for(var g=[u],d=1-f,p=h.length;d<p;++d){var v;switch((l=h[d]).charCodeAt(0)){default:(v=g[0])[c||v.length]=+l,c=void 0;break;case 34:if(-1!==(l=l.substring(1,l.length-1)).indexOf("\\")&&(l=l.replace(e,i)),v=g[0],!c){if(!(v instanceof Array)){c=l||o;break}c=v.length;}v[c]=l,c=void 0;break;case 91:v=g[0],g.unshift(v[c||v.length]=[]),c=void 0;break;case 93:g.shift();break;case 102:(v=g[0])[c||v.length]=!1,c=void 0;break;case 110:(v=g[0])[c||v.length]=null,c=void 0;break;case 116:(v=g[0])[c||v.length]=!0,c=void 0;break;case 123:v=g[0],g.unshift(v[c||v.length]={}),c=void 0;break;case 125:g.shift();}}if(f){if(1!==g.length)throw new Error;u=u[0];}else if(g.length)throw new Error;if(a){u=function t(e,n){var i=e[n];if(i&&"object"===(void 0===i?"undefined":r(i))){var o=null;for(var u in i)if(s.call(i,u)&&i!==e){var c=t(i,u);void 0!==c?i[u]=c:(o||(o=[]),o.push(u));}if(o)for(var h=o.length;--h>=0;)delete i[o[h]];}return a.call(e,n,i)}({"":u},"");}return u}}();void 0!==br&&br||(e.KJUR=br={}),void 0!==br.asn1&&br.asn1||(br.asn1={}),br.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var e=t.toString(16);if("-"!=e.substr(0,1))e.length%2==1?e="0"+e:e.match(/^[0-7]/)||(e="00"+e);else {var r=e.substr(1).length;r%2==1?r+=1:e.match(/^[0-7]/)||(r+=2);for(var n="",i=0;i<r;i++)n+="f";e=new F(n,16).xor(t).add(F.ONE).toString(16).replace(/^-/,"");}return e},this.getPEMStringFromHex=function(t,e){return Mr(t,e)},this.newObject=function(t){var e=br.asn1,r=e.ASN1Object,n=e.DERBoolean,i=e.DERInteger,o=e.DERBitString,s=e.DEROctetString,a=e.DERNull,u=e.DERObjectIdentifier,c=e.DEREnumerated,h=e.DERUTF8String,l=e.DERNumericString,f=e.DERPrintableString,g=e.DERTeletexString,d=e.DERIA5String,p=e.DERUTCTime,v=e.DERGeneralizedTime,y=e.DERVisibleString,m=e.DERBMPString,_=e.DERSequence,S=e.DERSet,b=e.DERTaggedObject,w=e.ASN1Util.newObject;if(t instanceof e.ASN1Object)return t;var F=Object.keys(t);if(1!=F.length)throw new Error("key of param shall be only one.");var E=F[0];if(-1==":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":"+E+":"))throw new Error("undefined key: "+E);if("bool"==E)return new n(t[E]);if("int"==E)return new i(t[E]);if("bitstr"==E)return new o(t[E]);if("octstr"==E)return new s(t[E]);if("null"==E)return new a(t[E]);if("oid"==E)return new u(t[E]);if("enum"==E)return new c(t[E]);if("utf8str"==E)return new h(t[E]);if("numstr"==E)return new l(t[E]);if("prnstr"==E)return new f(t[E]);if("telstr"==E)return new g(t[E]);if("ia5str"==E)return new d(t[E]);if("utctime"==E)return new p(t[E]);if("gentime"==E)return new v(t[E]);if("visstr"==E)return new y(t[E]);if("bmpstr"==E)return new m(t[E]);if("asn1"==E)return new r(t[E]);if("seq"==E){for(var x=t[E],A=[],k=0;k<x.length;k++){var P=w(x[k]);A.push(P);}return new _({array:A})}if("set"==E){for(x=t[E],A=[],k=0;k<x.length;k++){P=w(x[k]);A.push(P);}return new S({array:A})}if("tag"==E){var C=t[E];if("[object Array]"===Object.prototype.toString.call(C)&&3==C.length){var T=w(C[2]);return new b({tag:C[0],explicit:C[1],obj:T})}return new b(C)}},this.jsonToASN1HEX=function(t){return this.newObject(t).getEncodedHex()};},br.asn1.ASN1Util.oidHexToInt=function(t){for(var e="",r=parseInt(t.substr(0,2),16),n=(e=Math.floor(r/40)+"."+r%40,""),i=2;i<t.length;i+=2){var o=("00000000"+parseInt(t.substr(i,2),16).toString(2)).slice(-8);if(n+=o.substr(1,7),"0"==o.substr(0,1))e=e+"."+new F(n,2).toString(10),n="";}return e},br.asn1.ASN1Util.oidIntToHex=function(t){var e=function t(e){var r=e.toString(16);return 1==r.length&&(r="0"+r),r},r=function t(r){var n="",i=new F(r,10).toString(2),o=7-i.length%7;7==o&&(o=0);for(var s="",a=0;a<o;a++)s+="0";i=s+i;for(a=0;a<i.length-1;a+=7){var u=i.substr(a,7);a!=i.length-7&&(u="1"+u),n+=e(parseInt(u,2));}return n};if(!t.match(/^[0-9.]+$/))throw "malformed oid string: "+t;var n="",i=t.split("."),o=40*parseInt(i[0])+parseInt(i[1]);n+=e(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);return n},br.asn1.ASN1Object=function(t){this.params=null,this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw new Error("this.hV is null or undefined");if(this.hV.length%2==1)throw new Error("value hex must be even length: n="+"".length+",v="+this.hV);var t=this.hV.length/2,e=t.toString(16);if(e.length%2==1&&(e="0"+e),t<128)return e;var r=e.length/2;if(r>15)throw "ASN.1 length too long to represent by 8x: n = "+t.toString(16);return (128+r).toString(16)+e},this.getEncodedHex=function(){return (null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return ""},this.setByParam=function(t){this.params=t;},null!=t&&null!=t.tlv&&(this.hTLV=t.tlv,this.isModified=!1);},br.asn1.DERAbstractString=function(t){br.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=Dr(this.s).toLowerCase();},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t;},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?this.setString(t):void 0!==t.str?this.setString(t.str):void 0!==t.hex&&this.setStringHex(t.hex));},o.lang.extend(br.asn1.DERAbstractString,br.asn1.ASN1Object),br.asn1.DERAbstractTime=function(t){br.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC=function(t){var e=t.getTime()+6e4*t.getTimezoneOffset();return new Date(e)},this.formatDate=function(t,e,r){var n=this.zeroPadding,i=this.localDateToUTC(t),o=String(i.getFullYear());"utc"==e&&(o=o.substr(2,2));var s=o+n(String(i.getMonth()+1),2)+n(String(i.getDate()),2)+n(String(i.getHours()),2)+n(String(i.getMinutes()),2)+n(String(i.getSeconds()),2);if(!0===r){var a=i.getMilliseconds();if(0!=a){var u=n(String(a),3);s=s+"."+(u=u.replace(/[0]+$/,""));}}return s+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=Pr(t);},this.setByDateValue=function(t,e,r,n,i,o){var s=new Date(Date.UTC(t,e-1,r,n,i,o,0));this.setByDate(s);},this.getFreshValueHex=function(){return this.hV};},o.lang.extend(br.asn1.DERAbstractTime,br.asn1.ASN1Object),br.asn1.DERAbstractStructured=function(t){br.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t;},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t);},this.asn1Array=new Array,void 0!==t&&void 0!==t.array&&(this.asn1Array=t.array);},o.lang.extend(br.asn1.DERAbstractStructured,br.asn1.ASN1Object),br.asn1.DERBoolean=function(t){br.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV=0==t?"010100":"0101ff";},o.lang.extend(br.asn1.DERBoolean,br.asn1.ASN1Object),br.asn1.DERInteger=function(t){br.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=br.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);},this.setByInteger=function(t){var e=new F(String(t),10);this.setByBigInteger(e);},this.setValueHex=function(t){this.hV=t;},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.bigint?this.setByBigInteger(t.bigint):void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex));},o.lang.extend(br.asn1.DERInteger,br.asn1.ASN1Object),br.asn1.DERBitString=function(t){if(void 0!==t&&void 0!==t.obj){var e=br.asn1.ASN1Util.newObject(t.obj);t.hex="00"+e.getEncodedHex();}br.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t;},this.setUnusedBitsAndHexValue=function(t,e){if(t<0||7<t)throw "unused bits shall be from 0 to 7: u = "+t;var r="0"+t;this.hTLV=null,this.isModified=!0,this.hV=r+e;},this.setByBinaryString=function(t){var e=8-(t=t.replace(/0+$/,"")).length%8;8==e&&(e=0);for(var r=0;r<=e;r++)t+="0";var n="";for(r=0;r<t.length-1;r+=8){var i=t.substr(r,8),o=parseInt(i,2).toString(16);1==o.length&&(o="0"+o),n+=o;}this.hTLV=null,this.isModified=!0,this.hV="0"+e+n;},this.setByBooleanArray=function(t){for(var e="",r=0;r<t.length;r++)1==t[r]?e+="1":e+="0";this.setByBinaryString(e);},this.newFalseArray=function(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=!1;return e},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t&&t.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(t):void 0!==t.hex?this.setHexValueIncludingUnusedBits(t.hex):void 0!==t.bin?this.setByBinaryString(t.bin):void 0!==t.array&&this.setByBooleanArray(t.array));},o.lang.extend(br.asn1.DERBitString,br.asn1.ASN1Object),br.asn1.DEROctetString=function(t){if(void 0!==t&&void 0!==t.obj){var e=br.asn1.ASN1Util.newObject(t.obj);t.hex=e.getEncodedHex();}br.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04";},o.lang.extend(br.asn1.DEROctetString,br.asn1.DERAbstractString),br.asn1.DERNull=function(){br.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500";},o.lang.extend(br.asn1.DERNull,br.asn1.ASN1Object),br.asn1.DERObjectIdentifier=function(t){br.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t;},this.setValueOidString=function(t){var e=function r(t){var e=function t(e){var r=e.toString(16);return 1==r.length&&(r="0"+r),r},r=function t(r){var n="",i=parseInt(r,10).toString(2),o=7-i.length%7;7==o&&(o=0);for(var s="",a=0;a<o;a++)s+="0";i=s+i;for(a=0;a<i.length-1;a+=7){var u=i.substr(a,7);a!=i.length-7&&(u="1"+u),n+=e(parseInt(u,2));}return n};try{if(!t.match(/^[0-9.]+$/))return null;var n="",i=t.split("."),o=40*parseInt(i[0],10)+parseInt(i[1],10);n+=e(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);return n}catch(t){return null}}(t);if(null==e)throw new Error("malformed oid string: "+t);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e;},this.setValueName=function(t){var e=br.asn1.x509.OID.name2oid(t);if(""===e)throw new Error("DERObjectIdentifier oidName undefined: "+t);this.setValueOidString(e);},this.setValueNameOrOid=function(t){t.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(t):this.setValueName(t);},this.getFreshValueHex=function(){return this.hV},this.setByParam=function(t){"string"==typeof t?this.setValueNameOrOid(t):void 0!==t.oid?this.setValueNameOrOid(t.oid):void 0!==t.name?this.setValueNameOrOid(t.name):void 0!==t.hex&&this.setValueHex(t.hex);},void 0!==t&&this.setByParam(t);},o.lang.extend(br.asn1.DERObjectIdentifier,br.asn1.ASN1Object),br.asn1.DEREnumerated=function(t){br.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=br.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);},this.setByInteger=function(t){var e=new F(String(t),10);this.setByBigInteger(e);},this.setValueHex=function(t){this.hV=t;},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex));},o.lang.extend(br.asn1.DEREnumerated,br.asn1.ASN1Object),br.asn1.DERUTF8String=function(t){br.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c";},o.lang.extend(br.asn1.DERUTF8String,br.asn1.DERAbstractString),br.asn1.DERNumericString=function(t){br.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12";},o.lang.extend(br.asn1.DERNumericString,br.asn1.DERAbstractString),br.asn1.DERPrintableString=function(t){br.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13";},o.lang.extend(br.asn1.DERPrintableString,br.asn1.DERAbstractString),br.asn1.DERTeletexString=function(t){br.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14";},o.lang.extend(br.asn1.DERTeletexString,br.asn1.DERAbstractString),br.asn1.DERIA5String=function(t){br.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16";},o.lang.extend(br.asn1.DERIA5String,br.asn1.DERAbstractString),br.asn1.DERVisibleString=function(t){br.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="1a";},o.lang.extend(br.asn1.DERVisibleString,br.asn1.DERAbstractString),br.asn1.DERBMPString=function(t){br.asn1.DERBMPString.superclass.constructor.call(this,t),this.hT="1e";},o.lang.extend(br.asn1.DERBMPString,br.asn1.DERAbstractString),br.asn1.DERUTCTime=function(t){br.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=Pr(this.s);},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=Pr(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{12}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date));},o.lang.extend(br.asn1.DERUTCTime,br.asn1.DERAbstractTime),br.asn1.DERGeneralizedTime=function(t){br.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.withMillis=!1,this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=Pr(this.s);},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=Pr(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{14}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date),!0===t.millis&&(this.withMillis=!0));},o.lang.extend(br.asn1.DERGeneralizedTime,br.asn1.DERAbstractTime),br.asn1.DERSequence=function(t){br.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++){t+=this.asn1Array[e].getEncodedHex();}return this.hV=t,this.hV};},o.lang.extend(br.asn1.DERSequence,br.asn1.DERAbstractStructured),br.asn1.DERSet=function(t){br.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var r=this.asn1Array[e];t.push(r.getEncodedHex());}return 1==this.sortFlag&&t.sort(),this.hV=t.join(""),this.hV},void 0!==t&&void 0!==t.sortflag&&0==t.sortflag&&(this.sortFlag=!1);},o.lang.extend(br.asn1.DERSet,br.asn1.DERAbstractStructured),br.asn1.DERTaggedObject=function(t){br.asn1.DERTaggedObject.superclass.constructor.call(this);var e=br.asn1;this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,r){this.hT=e,this.isExplicit=t,this.asn1Object=r,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=r.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1);},this.getFreshValueHex=function(){return this.hV},this.setByParam=function(t){null!=t.tag&&(this.hT=t.tag),null!=t.explicit&&(this.isExplicit=t.explicit),null!=t.tage&&(this.hT=t.tage,this.isExplicit=!0),null!=t.tagi&&(this.hT=t.tagi,this.isExplicit=!1),null!=t.obj&&(t.obj instanceof e.ASN1Object?(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)):"object"==r(t.obj)&&(this.asn1Object=e.ASN1Util.newObject(t.obj),this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)));},null!=t&&this.setByParam(t);},o.lang.extend(br.asn1.DERTaggedObject,br.asn1.ASN1Object);var br,wr,Fr,Er=new function(){};function xr(t){for(var e=new Array,r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return e}function Ar(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e}function kr(t){for(var e="",r=0;r<t.length;r++){var n=t[r].toString(16);1==n.length&&(n="0"+n),e+=n;}return e}function Pr(t){return kr(xr(t))}function Cr(t){return t=(t=(t=t.replace(/\=/g,"")).replace(/\+/g,"-")).replace(/\//g,"_")}function Tr(t){return t.length%4==2?t+="==":t.length%4==3&&(t+="="),t=(t=t.replace(/-/g,"+")).replace(/_/g,"/")}function Rr(t){return t.length%2==1&&(t="0"+t),Cr(S(t))}function Ir(t){return b(Tr(t))}function Dr(t){return qr(Gr(t))}function Lr(t){return decodeURIComponent(Jr(t))}function Nr(t){for(var e="",r=0;r<t.length-1;r+=2)e+=String.fromCharCode(parseInt(t.substr(r,2),16));return e}function Ur(t){for(var e="",r=0;r<t.length;r++)e+=("0"+t.charCodeAt(r).toString(16)).slice(-2);return e}function Br(t){return S(t)}function Or(t){var e=Br(t).replace(/(.{64})/g,"$1\r\n");return e=e.replace(/\r\n$/,"")}function jr(t){return b(t.replace(/[^0-9A-Za-z\/+=]*/g,""))}function Mr(t,e){return "-----BEGIN "+e+"-----\r\n"+Or(t)+"\r\n-----END "+e+"-----\r\n"}function Hr(t,e){if(-1==t.indexOf("-----BEGIN "))throw "can't find PEM header: "+e;return jr(t=void 0!==e?(t=t.replace(new RegExp("^[^]*-----BEGIN "+e+"-----"),"")).replace(new RegExp("-----END "+e+"-----[^]*$"),""):(t=t.replace(/^[^]*-----BEGIN [^-]+-----/,"")).replace(/-----END [^-]+-----[^]*$/,""))}function Vr(t){var e,r,n,i,o,s,a,u,c,h,l;if(l=t.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/))return u=l[1],e=parseInt(u),2===u.length&&(50<=e&&e<100?e=1900+e:0<=e&&e<50&&(e=2e3+e)),r=parseInt(l[2])-1,n=parseInt(l[3]),i=parseInt(l[4]),o=parseInt(l[5]),s=parseInt(l[6]),a=0,""!==(c=l[7])&&(h=(c.substr(1)+"00").substr(0,3),a=parseInt(h)),Date.UTC(e,r,n,i,o,s,a);throw "unsupported zulu format: "+t}function Kr(t){return ~~(Vr(t)/1e3)}function qr(t){return t.replace(/%/g,"")}function Jr(t){return t.replace(/(..)/g,"%$1")}function Wr(t){var e="malformed IPv6 address";if(!t.match(/^[0-9A-Fa-f:]+$/))throw e;var r=(t=t.toLowerCase()).split(":").length-1;if(r<2)throw e;var n=":".repeat(7-r+2),i=(t=t.replace("::",n)).split(":");if(8!=i.length)throw e;for(var o=0;o<8;o++)i[o]=("0000"+i[o]).slice(-4);return i.join("")}function zr(t){if(!t.match(/^[0-9A-Fa-f]{32}$/))throw "malformed IPv6 address octet";for(var e=(t=t.toLowerCase()).match(/.{1,4}/g),r=0;r<8;r++)e[r]=e[r].replace(/^0+/,""),""==e[r]&&(e[r]="0");var n=(t=":"+e.join(":")+":").match(/:(0:){2,}/g);if(null===n)return t.slice(1,-1);var i="";for(r=0;r<n.length;r++)n[r].length>i.length&&(i=n[r]);return (t=t.replace(i,"::")).slice(1,-1)}function Yr(t){var e="malformed hex value";if(!t.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/))throw e;if(8!=t.length)return 32==t.length?zr(t):t;try{return parseInt(t.substr(0,2),16)+"."+parseInt(t.substr(2,2),16)+"."+parseInt(t.substr(4,2),16)+"."+parseInt(t.substr(6,2),16)}catch(t){throw e}}function Gr(t){for(var e=encodeURIComponent(t),r="",n=0;n<e.length;n++)"%"==e[n]?(r+=e.substr(n,3),n+=2):r=r+"%"+Pr(e[n]);return r}function Xr(t){return !(t.length%2!=0||!t.match(/^[0-9a-f]+$/)&&!t.match(/^[0-9A-F]+$/))}function $r(t){return t.length%2==1?"0"+t:t.substr(0,1)>"7"?"00"+t:t}Er.getLblen=function(t,e){if("8"!=t.substr(e+2,1))return 1;var r=parseInt(t.substr(e+3,1));return 0==r?-1:0<r&&r<10?r+1:-2},Er.getL=function(t,e){var r=Er.getLblen(t,e);return r<1?"":t.substr(e+2,2*r)},Er.getVblen=function(t,e){var r;return ""==(r=Er.getL(t,e))?-1:("8"===r.substr(0,1)?new F(r.substr(2),16):new F(r,16)).intValue()},Er.getVidx=function(t,e){var r=Er.getLblen(t,e);return r<0?r:e+2*(r+1)},Er.getV=function(t,e){var r=Er.getVidx(t,e),n=Er.getVblen(t,e);return t.substr(r,2*n)},Er.getTLV=function(t,e){return t.substr(e,2)+Er.getL(t,e)+Er.getV(t,e)},Er.getTLVblen=function(t,e){return 2+2*Er.getLblen(t,e)+2*Er.getVblen(t,e)},Er.getNextSiblingIdx=function(t,e){return Er.getVidx(t,e)+2*Er.getVblen(t,e)},Er.getChildIdx=function(t,e){var r,n,i,o=Er,s=[];r=o.getVidx(t,e),n=2*o.getVblen(t,e),"03"==t.substr(e,2)&&(r+=2,n-=2),i=0;for(var a=r;i<=n;){var u=o.getTLVblen(t,a);if((i+=u)<=n&&s.push(a),a+=u,i>=n)break}return s},Er.getNthChildIdx=function(t,e,r){return Er.getChildIdx(t,e)[r]},Er.getIdxbyList=function(t,e,r,n){var i,o,s=Er;return 0==r.length?void 0!==n&&t.substr(e,2)!==n?-1:e:(i=r.shift())>=(o=s.getChildIdx(t,e)).length?-1:s.getIdxbyList(t,o[i],r,n)},Er.getIdxbyListEx=function(t,e,r,n){var i,o,s=Er;if(0==r.length)return void 0!==n&&t.substr(e,2)!==n?-1:e;i=r.shift(),o=s.getChildIdx(t,e);for(var a=0,u=0;u<o.length;u++){var c=t.substr(o[u],2);if("number"==typeof i&&!s.isContextTag(c)&&a==i||"string"==typeof i&&s.isContextTag(c,i))return s.getIdxbyListEx(t,o[u],r,n);s.isContextTag(c)||a++;}return -1},Er.getTLVbyList=function(t,e,r,n){var i=Er,o=i.getIdxbyList(t,e,r,n);return -1==o||o>=t.length?null:i.getTLV(t,o)},Er.getTLVbyListEx=function(t,e,r,n){var i=Er,o=i.getIdxbyListEx(t,e,r,n);return -1==o?null:i.getTLV(t,o)},Er.getVbyList=function(t,e,r,n,i){var o,s,a=Er;return -1==(o=a.getIdxbyList(t,e,r,n))||o>=t.length?null:(s=a.getV(t,o),!0===i&&(s=s.substr(2)),s)},Er.getVbyListEx=function(t,e,r,n,i){var o,s,a=Er;return -1==(o=a.getIdxbyListEx(t,e,r,n))?null:(s=a.getV(t,o),"03"==t.substr(o,2)&&!1!==i&&(s=s.substr(2)),s)},Er.getInt=function(t,e,r){null==r&&(r=-1);try{var n=t.substr(e,2);if("02"!=n&&"03"!=n)return r;var i=Er.getV(t,e);return "02"==n?parseInt(i,16):function o(t){try{var e=t.substr(0,2);if("00"==e)return parseInt(t.substr(2),16);var r=parseInt(e,16),n=t.substr(2),i=parseInt(n,16).toString(2);return "0"==i&&(i="00000000"),i=i.slice(0,0-r),parseInt(i,2)}catch(t){return -1}}(i)}catch(t){return r}},Er.getOID=function(t,e,r){null==r&&(r=null);try{return "06"!=t.substr(e,2)?r:function n(t){if(!Xr(t))return null;try{var e=[],r=t.substr(0,2),n=parseInt(r,16);e[0]=new String(Math.floor(n/40)),e[1]=new String(n%40);for(var i=t.substr(2),o=[],s=0;s<i.length/2;s++)o.push(parseInt(i.substr(2*s,2),16));var a=[],u="";for(s=0;s<o.length;s++)128&o[s]?u+=Qr((127&o[s]).toString(2),7):(u+=Qr((127&o[s]).toString(2),7),a.push(new String(parseInt(u,2))),u="");var c=e.join(".");return a.length>0&&(c=c+"."+a.join(".")),c}catch(t){return null}}(Er.getV(t,e))}catch(t){return r}},Er.getOIDName=function(t,e,r){null==r&&(r=null);try{var n=Er.getOID(t,e,r);if(n==r)return r;var i=br.asn1.x509.OID.oid2name(n);return ""==i?n:i}catch(t){return r}},Er.getString=function(t,e,r){null==r&&(r=null);try{return Nr(Er.getV(t,e))}catch(t){return r}},Er.hextooidstr=function(t){var e=function t(e,r){return e.length>=r?e:new Array(r-e.length+1).join("0")+e},r=[],n=t.substr(0,2),i=parseInt(n,16);r[0]=new String(Math.floor(i/40)),r[1]=new String(i%40);for(var o=t.substr(2),s=[],a=0;a<o.length/2;a++)s.push(parseInt(o.substr(2*a,2),16));var u=[],c="";for(a=0;a<s.length;a++)128&s[a]?c+=e((127&s[a]).toString(2),7):(c+=e((127&s[a]).toString(2),7),u.push(new String(parseInt(c,2))),c="");var h=r.join(".");return u.length>0&&(h=h+"."+u.join(".")),h},Er.dump=function(t,e,r,n){var i=Er,o=i.getV,s=i.dump,a=i.getChildIdx,u=t;t instanceof br.asn1.ASN1Object&&(u=t.getEncodedHex());var c=function t(e,r){return e.length<=2*r?e:e.substr(0,r)+"..(total "+e.length/2+"bytes).."+e.substr(e.length-r,r)};void 0===e&&(e={ommit_long_octet:32}),void 0===r&&(r=0),void 0===n&&(n="");var h,l=e.ommit_long_octet;if("01"==(h=u.substr(r,2)))return "00"==(f=o(u,r))?n+"BOOLEAN FALSE\n":n+"BOOLEAN TRUE\n";if("02"==h)return n+"INTEGER "+c(f=o(u,r),l)+"\n";if("03"==h){var f=o(u,r);if(i.isASN1HEX(f.substr(2))){var g=n+"BITSTRING, encapsulates\n";return g+=s(f.substr(2),e,0,n+"  ")}return n+"BITSTRING "+c(f,l)+"\n"}if("04"==h){f=o(u,r);if(i.isASN1HEX(f)){g=n+"OCTETSTRING, encapsulates\n";return g+=s(f,e,0,n+"  ")}return n+"OCTETSTRING "+c(f,l)+"\n"}if("05"==h)return n+"NULL\n";if("06"==h){var d=o(u,r),p=br.asn1.ASN1Util.oidHexToInt(d),v=br.asn1.x509.OID.oid2name(p),y=p.replace(/\./g," ");return ""!=v?n+"ObjectIdentifier "+v+" ("+y+")\n":n+"ObjectIdentifier ("+y+")\n"}if("0a"==h)return n+"ENUMERATED "+parseInt(o(u,r))+"\n";if("0c"==h)return n+"UTF8String '"+Lr(o(u,r))+"'\n";if("13"==h)return n+"PrintableString '"+Lr(o(u,r))+"'\n";if("14"==h)return n+"TeletexString '"+Lr(o(u,r))+"'\n";if("16"==h)return n+"IA5String '"+Lr(o(u,r))+"'\n";if("17"==h)return n+"UTCTime "+Lr(o(u,r))+"\n";if("18"==h)return n+"GeneralizedTime "+Lr(o(u,r))+"\n";if("1a"==h)return n+"VisualString '"+Lr(o(u,r))+"'\n";if("1e"==h)return n+"BMPString '"+Lr(o(u,r))+"'\n";if("30"==h){if("3000"==u.substr(r,4))return n+"SEQUENCE {}\n";g=n+"SEQUENCE\n";var m=e;if((2==(b=a(u,r)).length||3==b.length)&&"06"==u.substr(b[0],2)&&"04"==u.substr(b[b.length-1],2)){v=i.oidname(o(u,b[0]));var _=JSON.parse(JSON.stringify(e));_.x509ExtName=v,m=_;}for(var S=0;S<b.length;S++)g+=s(u,m,b[S],n+"  ");return g}if("31"==h){g=n+"SET\n";var b=a(u,r);for(S=0;S<b.length;S++)g+=s(u,e,b[S],n+"  ");return g}if(0!=(128&(h=parseInt(h,16)))){var w=31&h;if(0!=(32&h)){for(g=n+"["+w+"]\n",b=a(u,r),S=0;S<b.length;S++)g+=s(u,e,b[S],n+"  ");return g}f=o(u,r);if(Er.isASN1HEX(f)){var g=n+"["+w+"]\n";return g+=s(f,e,0,n+"  ")}return ("68747470"==f.substr(0,8)||"subjectAltName"===e.x509ExtName&&2==w)&&(f=Lr(f)),g=n+"["+w+"] "+f+"\n"}return n+"UNKNOWN("+h+") "+o(u,r)+"\n"},Er.isContextTag=function(t,e){var r,n;t=t.toLowerCase();try{r=parseInt(t,16);}catch(t){return -1}if(void 0===e)return 128==(192&r);try{return null!=e.match(/^\[[0-9]+\]$/)&&(!((n=parseInt(e.substr(1,e.length-1),10))>31)&&(128==(192&r)&&(31&r)==n))}catch(t){return !1}},Er.isASN1HEX=function(t){var e=Er;if(t.length%2==1)return !1;var r=e.getVblen(t,0),n=t.substr(0,2),i=e.getL(t,0);return t.length-n.length-i.length==2*r},Er.checkStrictDER=function(t,e,r,n,i){var o=Er;if(void 0===r){if("string"!=typeof t)throw new Error("not hex string");if(t=t.toLowerCase(),!br.lang.String.isHex(t))throw new Error("not hex string");r=t.length,i=(n=t.length/2)<128?1:Math.ceil(n.toString(16))+1;}if(o.getL(t,e).length>2*i)throw new Error("L of TLV too long: idx="+e);var s=o.getVblen(t,e);if(s>n)throw new Error("value of L too long than hex: idx="+e);var a=o.getTLV(t,e),u=a.length-2-o.getL(t,e).length;if(u!==2*s)throw new Error("V string length and L's value not the same:"+u+"/"+2*s);if(0===e&&t.length!=a.length)throw new Error("total length and TLV length unmatch:"+t.length+"!="+a.length);var c=t.substr(e,2);if("02"===c){var h=o.getVidx(t,e);if("00"==t.substr(h,2)&&t.charCodeAt(h+2)<56)throw new Error("not least zeros for DER INTEGER")}if(32&parseInt(c,16)){for(var l=o.getVblen(t,e),f=0,g=o.getChildIdx(t,e),d=0;d<g.length;d++){f+=o.getTLV(t,g[d]).length,o.checkStrictDER(t,g[d],r,n,i);}if(2*l!=f)throw new Error("sum of children's TLV length and L unmatch: "+2*l+"!="+f)}},Er.oidname=function(t){var e=br.asn1;br.lang.String.isHex(t)&&(t=e.ASN1Util.oidHexToInt(t));var r=e.x509.OID.oid2name(t);return ""===r&&(r=t),r},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.lang&&br.lang||(br.lang={}),br.lang.String=function(){},"function"==typeof t?(e.utf8tob64u=wr=function e(r){return Cr(t.from(r,"utf8").toString("base64"))},e.b64utoutf8=Fr=function e(r){return t.from(Tr(r),"base64").toString("utf8")}):(e.utf8tob64u=wr=function t(e){return Rr(qr(Gr(e)))},e.b64utoutf8=Fr=function t(e){return decodeURIComponent(Jr(Ir(e)))}),br.lang.String.isInteger=function(t){return !!t.match(/^[0-9]+$/)||!!t.match(/^-[0-9]+$/)},br.lang.String.isHex=function(t){return Xr(t)},br.lang.String.isBase64=function(t){return !(!(t=t.replace(/\s+/g,"")).match(/^[0-9A-Za-z+\/]+={0,3}$/)||t.length%4!=0)},br.lang.String.isBase64URL=function(t){return !t.match(/[+/=]/)&&(t=Tr(t),br.lang.String.isBase64(t))},br.lang.String.isIntegerArray=function(t){return !!(t=t.replace(/\s+/g,"")).match(/^\[[0-9,]+\]$/)},br.lang.String.isPrintable=function(t){return null!==t.match(/^[0-9A-Za-z '()+,-./:=?]*$/)},br.lang.String.isIA5=function(t){return null!==t.match(/^[\x20-\x21\x23-\x7f]*$/)},br.lang.String.isMail=function(t){return null!==t.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)};var Qr=function t(e,r,n){return null==n&&(n="0"),e.length>=r?e:new Array(r-e.length+1).join(n)+e};void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHAwithRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa"},this.CRYPTOJSMESSAGEDIGESTNAME={md5:y.algo.MD5,sha1:y.algo.SHA1,sha224:y.algo.SHA224,sha256:y.algo.SHA256,sha384:y.algo.SHA384,sha512:y.algo.SHA512,ripemd160:y.algo.RIPEMD160},this.getDigestInfoHex=function(t,e){if(void 0===this.DIGESTINFOHEAD[e])throw "alg not supported in Util.DIGESTINFOHEAD: "+e;return this.DIGESTINFOHEAD[e]+t},this.getPaddedDigestInfoHex=function(t,e,r){var n=this.getDigestInfoHex(t,e),i=r/4;if(n.length+22>i)throw "key is too short for SigAlg: keylen="+r+","+e;for(var o="0001",s="00"+n,a="",u=i-o.length-s.length,c=0;c<u;c+=2)a+="ff";return o+a+s},this.hashString=function(t,e){return new br.crypto.MessageDigest({alg:e}).digestString(t)},this.hashHex=function(t,e){return new br.crypto.MessageDigest({alg:e}).digestHex(t)},this.sha1=function(t){return this.hashString(t,"sha1")},this.sha256=function(t){return this.hashString(t,"sha256")},this.sha256Hex=function(t){return this.hashHex(t,"sha256")},this.sha512=function(t){return this.hashString(t,"sha512")},this.sha512Hex=function(t){return this.hashHex(t,"sha512")},this.isKey=function(t){return t instanceof He||t instanceof br.crypto.DSA||t instanceof br.crypto.ECDSA};},br.crypto.Util.md5=function(t){return new br.crypto.MessageDigest({alg:"md5",prov:"cryptojs"}).digestString(t)},br.crypto.Util.ripemd160=function(t){return new br.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"}).digestString(t)},br.crypto.Util.SECURERANDOMGEN=new Oe,br.crypto.Util.getRandomHexOfNbytes=function(t){var e=new Array(t);return br.crypto.Util.SECURERANDOMGEN.nextBytes(e),kr(e)},br.crypto.Util.getRandomBigIntegerOfNbytes=function(t){return new F(br.crypto.Util.getRandomHexOfNbytes(t),16)},br.crypto.Util.getRandomHexOfNbits=function(t){var e=t%8,r=new Array((t-e)/8+1);return br.crypto.Util.SECURERANDOMGEN.nextBytes(r),r[0]=(255<<e&255^255)&r[0],kr(r)},br.crypto.Util.getRandomBigIntegerOfNbits=function(t){return new F(br.crypto.Util.getRandomHexOfNbits(t),16)},br.crypto.Util.getRandomBigIntegerZeroToMax=function(t){for(var e=t.bitLength();;){var r=br.crypto.Util.getRandomBigIntegerOfNbits(e);if(-1!=t.compareTo(r))return r}},br.crypto.Util.getRandomBigIntegerMinToMax=function(t,e){var r=t.compareTo(e);if(1==r)throw "biMin is greater than biMax";if(0==r)return t;var n=e.subtract(t);return br.crypto.Util.getRandomBigIntegerZeroToMax(n).add(t)},br.crypto.MessageDigest=function(t){this.setAlgAndProvider=function(t,e){if(null!==(t=br.crypto.MessageDigest.getCanonicalAlgName(t))&&void 0===e&&(e=br.crypto.Util.DEFAULTPROVIDER[t]),-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(t)&&"cryptojs"==e){try{this.md=br.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[t].create();}catch(e){throw "setAlgAndProvider hash alg set fail alg="+t+"/"+e}this.updateString=function(t){this.md.update(t);},this.updateHex=function(t){var e=y.enc.Hex.parse(t);this.md.update(e);},this.digest=function(){return this.md.finalize().toString(y.enc.Hex)},this.digestString=function(t){return this.updateString(t),this.digest()},this.digestHex=function(t){return this.updateHex(t),this.digest()};}if(-1!=":sha256:".indexOf(t)&&"sjcl"==e){try{this.md=new sjcl.hash.sha256;}catch(e){throw "setAlgAndProvider hash alg set fail alg="+t+"/"+e}this.updateString=function(t){this.md.update(t);},this.updateHex=function(t){var e=sjcl.codec.hex.toBits(t);this.md.update(e);},this.digest=function(){var t=this.md.finalize();return sjcl.codec.hex.fromBits(t)},this.digestString=function(t){return this.updateString(t),this.digest()},this.digestHex=function(t){return this.updateHex(t),this.digest()};}},this.updateString=function(t){throw "updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.updateHex=function(t){throw "updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digest=function(){throw "digest() not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestString=function(t){throw "digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestHex=function(t){throw "digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},void 0!==t&&void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov&&(this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName));},br.crypto.MessageDigest.getCanonicalAlgName=function(t){return "string"==typeof t&&(t=(t=t.toLowerCase()).replace(/-/,"")),t},br.crypto.MessageDigest.getHashLength=function(t){var e=br.crypto.MessageDigest,r=e.getCanonicalAlgName(t);if(void 0===e.HASHLENGTH[r])throw "not supported algorithm: "+t;return e.HASHLENGTH[r]},br.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20},br.crypto.Mac=function(t){this.setAlgAndProvider=function(t,e){if(null==(t=t.toLowerCase())&&(t="hmacsha1"),"hmac"!=(t=t.toLowerCase()).substr(0,4))throw "setAlgAndProvider unsupported HMAC alg: "+t;void 0===e&&(e=br.crypto.Util.DEFAULTPROVIDER[t]),this.algProv=t+"/"+e;var r=t.substr(4);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(r)&&"cryptojs"==e){try{var n=br.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[r];this.mac=y.algo.HMAC.create(n,this.pass);}catch(t){throw "setAlgAndProvider hash alg set fail hashAlg="+r+"/"+t}this.updateString=function(t){this.mac.update(t);},this.updateHex=function(t){var e=y.enc.Hex.parse(t);this.mac.update(e);},this.doFinal=function(){return this.mac.finalize().toString(y.enc.Hex)},this.doFinalString=function(t){return this.updateString(t),this.doFinal()},this.doFinalHex=function(t){return this.updateHex(t),this.doFinal()};}},this.updateString=function(t){throw "updateString(str) not supported for this alg/prov: "+this.algProv},this.updateHex=function(t){throw "updateHex(hex) not supported for this alg/prov: "+this.algProv},this.doFinal=function(){throw "digest() not supported for this alg/prov: "+this.algProv},this.doFinalString=function(t){throw "digestString(str) not supported for this alg/prov: "+this.algProv},this.doFinalHex=function(t){throw "digestHex(hex) not supported for this alg/prov: "+this.algProv},this.setPassword=function(t){if("string"==typeof t){var e=t;return t.length%2!=1&&t.match(/^[0-9A-Fa-f]+$/)||(e=Ur(t)),void(this.pass=y.enc.Hex.parse(e))}if("object"!=(void 0===t?"undefined":r(t)))throw "KJUR.crypto.Mac unsupported password type: "+t;e=null;if(void 0!==t.hex){if(t.hex.length%2!=0||!t.hex.match(/^[0-9A-Fa-f]+$/))throw "Mac: wrong hex password: "+t.hex;e=t.hex;}if(void 0!==t.utf8&&(e=Dr(t.utf8)),void 0!==t.rstr&&(e=Ur(t.rstr)),void 0!==t.b64&&(e=b(t.b64)),void 0!==t.b64u&&(e=Ir(t.b64u)),null==e)throw "KJUR.crypto.Mac unsupported password type: "+t;this.pass=y.enc.Hex.parse(e);},void 0!==t&&(void 0!==t.pass&&this.setPassword(t.pass),void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov&&(this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName)));},br.crypto.Signature=function(t){var e=null;if(this._setAlgNames=function(){var t=this.algName.match(/^(.+)with(.+)$/);t&&(this.mdAlgName=t[1].toLowerCase(),this.pubkeyAlgName=t[2].toLowerCase(),"rsaandmgf1"==this.pubkeyAlgName&&"sha"==this.mdAlgName&&(this.mdAlgName="sha1"));},this._zeroPaddingOfSignature=function(t,e){for(var r="",n=e/4-t.length,i=0;i<n;i++)r+="0";return r+t},this.setAlgAndProvider=function(t,e){if(this._setAlgNames(),"cryptojs/jsrsa"!=e)throw new Error("provider not supported: "+e);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)){try{this.md=new br.crypto.MessageDigest({alg:this.mdAlgName});}catch(t){throw new Error("setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+t)}this.init=function(t,e){var r=null;try{r=void 0===e?Zr.getKey(t):Zr.getKey(t,e);}catch(t){throw "init failed:"+t}if(!0===r.isPrivate)this.prvKey=r,this.state="SIGN";else {if(!0!==r.isPublic)throw "init failed.:"+r;this.pubKey=r,this.state="VERIFY";}},this.updateString=function(t){this.md.updateString(t);},this.updateHex=function(t){this.md.updateHex(t);},this.sign=function(){if(this.sHashHex=this.md.digest(),void 0===this.prvKey&&void 0!==this.ecprvhex&&void 0!==this.eccurvename&&void 0!==br.crypto.ECDSA&&(this.prvKey=new br.crypto.ECDSA({curve:this.eccurvename,prv:this.ecprvhex})),this.prvKey instanceof He&&"rsaandmgf1"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);else if(this.prvKey instanceof He&&"rsa"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);else if(this.prvKey instanceof br.crypto.ECDSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else {if(!(this.prvKey instanceof br.crypto.DSA))throw "Signature: unsupported private key alg: "+this.pubkeyAlgName;this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}return this.hSign},this.signString=function(t){return this.updateString(t),this.sign()},this.signHex=function(t){return this.updateHex(t),this.sign()},this.verify=function(t){if(this.sHashHex=this.md.digest(),void 0===this.pubKey&&void 0!==this.ecpubhex&&void 0!==this.eccurvename&&void 0!==br.crypto.ECDSA&&(this.pubKey=new br.crypto.ECDSA({curve:this.eccurvename,pub:this.ecpubhex})),this.pubKey instanceof He&&"rsaandmgf1"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,t,this.mdAlgName,this.pssSaltLen);if(this.pubKey instanceof He&&"rsa"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);if(void 0!==br.crypto.ECDSA&&this.pubKey instanceof br.crypto.ECDSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);if(void 0!==br.crypto.DSA&&this.pubKey instanceof br.crypto.DSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);throw "Signature: unsupported public key alg: "+this.pubkeyAlgName};}},this.init=function(t,e){throw "init(key, pass) not supported for this alg:prov="+this.algProvName},this.updateString=function(t){throw "updateString(str) not supported for this alg:prov="+this.algProvName},this.updateHex=function(t){throw "updateHex(hex) not supported for this alg:prov="+this.algProvName},this.sign=function(){throw "sign() not supported for this alg:prov="+this.algProvName},this.signString=function(t){throw "digestString(str) not supported for this alg:prov="+this.algProvName},this.signHex=function(t){throw "digestHex(hex) not supported for this alg:prov="+this.algProvName},this.verify=function(t){throw "verify(hSigVal) not supported for this alg:prov="+this.algProvName},this.initParams=t,void 0!==t&&(void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov?this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]:this.provName=t.prov,this.algProvName=this.algName+":"+this.provName,this.setAlgAndProvider(this.algName,this.provName),this._setAlgNames()),void 0!==t.psssaltlen&&(this.pssSaltLen=t.psssaltlen),void 0!==t.prvkeypem)){if(void 0!==t.prvkeypas)throw "both prvkeypem and prvkeypas parameters not supported";try{e=Zr.getKey(t.prvkeypem);this.init(e);}catch(t){throw "fatal error to load pem private key: "+t}}},br.crypto.Cipher=function(t){},br.crypto.Cipher.encrypt=function(t,e,r){if(e instanceof He&&e.isPublic){var n=br.crypto.Cipher.getAlgByKeyAndName(e,r);if("RSA"===n)return e.encrypt(t);if("RSAOAEP"===n)return e.encryptOAEP(t,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return e.encryptOAEP(t,"sha"+i[1]);throw "Cipher.encrypt: unsupported algorithm for RSAKey: "+r}throw "Cipher.encrypt: unsupported key or algorithm"},br.crypto.Cipher.decrypt=function(t,e,r){if(e instanceof He&&e.isPrivate){var n=br.crypto.Cipher.getAlgByKeyAndName(e,r);if("RSA"===n)return e.decrypt(t);if("RSAOAEP"===n)return e.decryptOAEP(t,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return e.decryptOAEP(t,"sha"+i[1]);throw "Cipher.decrypt: unsupported algorithm for RSAKey: "+r}throw "Cipher.decrypt: unsupported key or algorithm"},br.crypto.Cipher.getAlgByKeyAndName=function(t,e){if(t instanceof He){if(-1!=":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(e))return e;if(null==e)return "RSA";throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: "+e}throw "getAlgByKeyAndName: not supported algorithm name: "+e},br.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA"};},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.ECDSA=function(t){var e=Error,n=F,i=Ke,o=br.crypto.ECDSA,s=br.crypto.ECParameterDB,a=o.getName,u=Er,c=u.getVbyListEx,h=u.isASN1HEX,l=new Oe;this.type="EC",this.isPrivate=!1,this.isPublic=!1,this.getBigRandom=function(t){return new n(t.bitLength(),l).mod(t.subtract(n.ONE)).add(n.ONE)},this.setNamedCurve=function(t){this.ecparams=s.getByName(t),this.prvKeyHex=null,this.pubKeyHex=null,this.curveName=t;},this.setPrivateKeyHex=function(t){this.isPrivate=!0,this.prvKeyHex=t;},this.setPublicKeyHex=function(t){this.isPublic=!0,this.pubKeyHex=t;},this.getPublicKeyXYHex=function(){var t=this.pubKeyHex;if("04"!==t.substr(0,2))throw "this method supports uncompressed format(04) only";var e=this.ecparams.keylen/4;if(t.length!==2+2*e)throw "malformed public key hex length";var r={};return r.x=t.substr(2,e),r.y=t.substr(2+e),r},this.getShortNISTPCurveName=function(){var t=this.curveName;return "secp256r1"===t||"NIST P-256"===t||"P-256"===t||"prime256v1"===t?"P-256":"secp384r1"===t||"NIST P-384"===t||"P-384"===t?"P-384":null},this.generateKeyPairHex=function(){var t=this.ecparams.n,e=this.getBigRandom(t),r=this.ecparams.G.multiply(e),n=r.getX().toBigInteger(),i=r.getY().toBigInteger(),o=this.ecparams.keylen/4,s=("0000000000"+e.toString(16)).slice(-o),a="04"+("0000000000"+n.toString(16)).slice(-o)+("0000000000"+i.toString(16)).slice(-o);return this.setPrivateKeyHex(s),this.setPublicKeyHex(a),{ecprvhex:s,ecpubhex:a}},this.signWithMessageHash=function(t){return this.signHex(t,this.prvKeyHex)},this.signHex=function(t,e){var r=new n(e,16),i=this.ecparams.n,s=new n(t.substring(0,this.ecparams.keylen/4),16);do{var a=this.getBigRandom(i),u=this.ecparams.G.multiply(a).getX().toBigInteger().mod(i);}while(u.compareTo(n.ZERO)<=0);var c=a.modInverse(i).multiply(s.add(r.multiply(u))).mod(i);return o.biRSSigToASN1Sig(u,c)},this.sign=function(t,e){var r=e,i=this.ecparams.n,o=n.fromByteArrayUnsigned(t);do{var s=this.getBigRandom(i),a=this.ecparams.G.multiply(s).getX().toBigInteger().mod(i);}while(a.compareTo(F.ZERO)<=0);var u=s.modInverse(i).multiply(o.add(r.multiply(a))).mod(i);return this.serializeSig(a,u)},this.verifyWithMessageHash=function(t,e){return this.verifyHex(t,e,this.pubKeyHex)},this.verifyHex=function(t,e,r){try{var s,a,u=o.parseSigHex(e);s=u.r,a=u.s;var c=i.decodeFromHex(this.ecparams.curve,r),h=new n(t.substring(0,this.ecparams.keylen/4),16);return this.verifyRaw(h,s,a,c)}catch(t){return !1}},this.verify=function(t,e,o){var s,a,u;if(Bitcoin.Util.isArray(e)){var c=this.parseSig(e);s=c.r,a=c.s;}else {if("object"!==(void 0===e?"undefined":r(e))||!e.r||!e.s)throw "Invalid value for signature";s=e.r,a=e.s;}if(o instanceof Ke)u=o;else {if(!Bitcoin.Util.isArray(o))throw "Invalid format for pubkey value, must be byte array or ECPointFp";u=i.decodeFrom(this.ecparams.curve,o);}var h=n.fromByteArrayUnsigned(t);return this.verifyRaw(h,s,a,u)},this.verifyRaw=function(t,e,r,i){var o=this.ecparams.n,s=this.ecparams.G;if(e.compareTo(n.ONE)<0||e.compareTo(o)>=0)return !1;if(r.compareTo(n.ONE)<0||r.compareTo(o)>=0)return !1;var a=r.modInverse(o),u=t.multiply(a).mod(o),c=e.multiply(a).mod(o);return s.multiply(u).add(i.multiply(c)).getX().toBigInteger().mod(o).equals(e)},this.serializeSig=function(t,e){var r=t.toByteArraySigned(),n=e.toByteArraySigned(),i=[];return i.push(2),i.push(r.length),(i=i.concat(r)).push(2),i.push(n.length),(i=i.concat(n)).unshift(i.length),i.unshift(48),i},this.parseSig=function(t){var e;if(48!=t[0])throw new Error("Signature not a valid DERSequence");if(2!=t[e=2])throw new Error("First element in signature must be a DERInteger");var r=t.slice(e+2,e+2+t[e+1]);if(2!=t[e+=2+t[e+1]])throw new Error("Second element in signature must be a DERInteger");var i=t.slice(e+2,e+2+t[e+1]);return e+=2+t[e+1],{r:n.fromByteArrayUnsigned(r),s:n.fromByteArrayUnsigned(i)}},this.parseSigCompact=function(t){if(65!==t.length)throw "Signature has the wrong length";var e=t[0]-27;if(e<0||e>7)throw "Invalid signature type";var r=this.ecparams.n;return {r:n.fromByteArrayUnsigned(t.slice(1,33)).mod(r),s:n.fromByteArrayUnsigned(t.slice(33,65)).mod(r),i:e}},this.readPKCS5PrvKeyHex=function(t){if(!1===h(t))throw new Error("not ASN.1 hex string");var e,r,n;try{e=c(t,0,["[0]",0],"06"),r=c(t,0,[1],"04");try{n=c(t,0,["[1]",0],"03");}catch(t){}}catch(t){throw new Error("malformed PKCS#1/5 plain ECC private key")}if(this.curveName=a(e),void 0===this.curveName)throw "unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1;},this.readPKCS8PrvKeyHex=function(t){if(!1===h(t))throw new e("not ASN.1 hex string");var r,n,i;try{c(t,0,[1,0],"06"),r=c(t,0,[1,1],"06"),n=c(t,0,[2,0,1],"04");try{i=c(t,0,[2,0,"[1]",0],"03");}catch(t){}}catch(t){throw new e("malformed PKCS#8 plain ECC private key")}if(this.curveName=a(r),void 0===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(i),this.setPrivateKeyHex(n),this.isPublic=!1;},this.readPKCS8PubKeyHex=function(t){if(!1===h(t))throw new e("not ASN.1 hex string");var r,n;try{c(t,0,[0,0],"06"),r=c(t,0,[0,1],"06"),n=c(t,0,[1],"03");}catch(t){throw new e("malformed PKCS#8 ECC public key")}if(this.curveName=a(r),null===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(n);},this.readCertPubKeyHex=function(t,r){if(!1===h(t))throw new e("not ASN.1 hex string");var n,i;try{n=c(t,0,[0,5,0,1],"06"),i=c(t,0,[0,5,1],"03");}catch(t){throw new e("malformed X.509 certificate ECC public key")}if(this.curveName=a(n),null===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(i);},void 0!==t&&void 0!==t.curve&&(this.curveName=t.curve),void 0===this.curveName&&(this.curveName="secp256r1"),this.setNamedCurve(this.curveName),void 0!==t&&(void 0!==t.prv&&this.setPrivateKeyHex(t.prv),void 0!==t.pub&&this.setPublicKeyHex(t.pub));},br.crypto.ECDSA.parseSigHex=function(t){var e=br.crypto.ECDSA.parseSigHexInHexRS(t);return {r:new F(e.r,16),s:new F(e.s,16)}},br.crypto.ECDSA.parseSigHexInHexRS=function(t){var e=Er,r=e.getChildIdx,n=e.getV;if(e.checkStrictDER(t,0),"30"!=t.substr(0,2))throw new Error("signature is not a ASN.1 sequence");var i=r(t,0);if(2!=i.length)throw new Error("signature shall have two elements");var o=i[0],s=i[1];if("02"!=t.substr(o,2))throw new Error("1st item not ASN.1 integer");if("02"!=t.substr(s,2))throw new Error("2nd item not ASN.1 integer");return {r:n(t,o),s:n(t,s)}},br.crypto.ECDSA.asn1SigToConcatSig=function(t){var e=br.crypto.ECDSA.parseSigHexInHexRS(t),r=e.r,n=e.s;if("00"==r.substr(0,2)&&r.length%32==2&&(r=r.substr(2)),"00"==n.substr(0,2)&&n.length%32==2&&(n=n.substr(2)),r.length%32==30&&(r="00"+r),n.length%32==30&&(n="00"+n),r.length%32!=0)throw "unknown ECDSA sig r length error";if(n.length%32!=0)throw "unknown ECDSA sig s length error";return r+n},br.crypto.ECDSA.concatSigToASN1Sig=function(t){if(t.length/2*8%128!=0)throw "unknown ECDSA concatinated r-s sig  length error";var e=t.substr(0,t.length/2),r=t.substr(t.length/2);return br.crypto.ECDSA.hexRSSigToASN1Sig(e,r)},br.crypto.ECDSA.hexRSSigToASN1Sig=function(t,e){var r=new F(t,16),n=new F(e,16);return br.crypto.ECDSA.biRSSigToASN1Sig(r,n)},br.crypto.ECDSA.biRSSigToASN1Sig=function(t,e){var r=br.asn1,n=new r.DERInteger({bigint:t}),i=new r.DERInteger({bigint:e});return new r.DERSequence({array:[n,i]}).getEncodedHex()},br.crypto.ECDSA.getName=function(t){return "2b8104001f"===t?"secp192k1":"2a8648ce3d030107"===t?"secp256r1":"2b8104000a"===t?"secp256k1":"2b81040021"===t?"secp224r1":"2b81040022"===t?"secp384r1":-1!=="|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(t)?"secp256r1":-1!=="|secp256k1|".indexOf(t)?"secp256k1":-1!=="|secp224r1|NIST P-224|P-224|".indexOf(t)?"secp224r1":-1!=="|secp384r1|NIST P-384|P-384|".indexOf(t)?"secp384r1":null},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.ECParameterDB=new function(){var t={},e={};function r(t){return new F(t,16)}this.getByName=function(r){var n=r;if(void 0!==e[n]&&(n=e[r]),void 0!==t[n])return t[n];throw "unregistered EC curve name: "+n},this.regist=function(n,i,o,s,a,u,c,h,l,f,g,d){t[n]={};var p=r(o),v=r(s),y=r(a),m=r(u),_=r(c),S=new qe(p,v,y),b=S.decodePointHex("04"+h+l);t[n].name=n,t[n].keylen=i,t[n].curve=S,t[n].G=b,t[n].n=m,t[n].h=_,t[n].oid=g,t[n].info=d;for(var w=0;w<f.length;w++)e[f[w]]=n;};},br.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field"),br.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field"),br.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field"),br.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]),br.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]),br.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]),br.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]),br.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]),br.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]),br.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);var Zr=function(){var t=function t(r,n,i){return e(y.AES,r,n,i)},e=function t(e,r,n,i){var o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=y.enc.Hex.parse(i),u={};u.key=s,u.iv=a,u.ciphertext=o;var c=e.decrypt(u,s,{iv:a});return y.enc.Hex.stringify(c)},r=function t(e,r,i){return n(y.AES,e,r,i)},n=function t(e,r,n,i){var o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=y.enc.Hex.parse(i),u=e.encrypt(o,s,{iv:a}),c=y.enc.Hex.parse(u.toString());return y.enc.Base64.stringify(c)},i={"AES-256-CBC":{proc:t,eproc:r,keylen:32,ivlen:16},"AES-192-CBC":{proc:t,eproc:r,keylen:24,ivlen:16},"AES-128-CBC":{proc:t,eproc:r,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:function t(r,n,i){return e(y.TripleDES,r,n,i)},eproc:function t(e,r,i){return n(y.TripleDES,e,r,i)},keylen:24,ivlen:8},"DES-CBC":{proc:function t(r,n,i){return e(y.DES,r,n,i)},eproc:function t(e,r,i){return n(y.DES,e,r,i)},keylen:8,ivlen:8}},o=function t(e){var r={},n=e.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));n&&(r.cipher=n[1],r.ivsalt=n[2]);var i=e.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));i&&(r.type=i[1]);var o=-1,s=0;-1!=e.indexOf("\r\n\r\n")&&(o=e.indexOf("\r\n\r\n"),s=2),-1!=e.indexOf("\n\n")&&(o=e.indexOf("\n\n"),s=1);var a=e.indexOf("-----END");if(-1!=o&&-1!=a){var u=e.substring(o+2*s,a-s);u=u.replace(/\s+/g,""),r.data=u;}return r},s=function t(e,r,n){for(var o=n.substring(0,16),s=y.enc.Hex.parse(o),a=y.enc.Utf8.parse(r),u=i[e].keylen+i[e].ivlen,c="",h=null;;){var l=y.algo.MD5.create();if(null!=h&&l.update(h),l.update(a),l.update(s),h=l.finalize(),(c+=y.enc.Hex.stringify(h)).length>=2*u)break}var f={};return f.keyhex=c.substr(0,2*i[e].keylen),f.ivhex=c.substr(2*i[e].keylen,2*i[e].ivlen),f},a=function t(e,r,n,o){var s=y.enc.Base64.parse(e),a=y.enc.Hex.stringify(s);return (0, i[r].proc)(a,n,o)};return {version:"1.0.0",parsePKCS5PEM:function t(e){return o(e)},getKeyAndUnusedIvByPasscodeAndIvsalt:function t(e,r,n){return s(e,r,n)},decryptKeyB64:function t(e,r,n,i){return a(e,r,n,i)},getDecryptedKeyHex:function t(e,r){var n=o(e),i=(n.cipher),u=n.ivsalt,c=n.data,h=s(i,r,u).keyhex;return a(c,i,h,u)},getEncryptedPKCS5PEMFromPrvKeyHex:function t(e,r,n,o,a){var u="";if(void 0!==o&&null!=o||(o="AES-256-CBC"),void 0===i[o])throw "KEYUTIL unsupported algorithm: "+o;void 0!==a&&null!=a||(a=function t(e){var r=y.lib.WordArray.random(e);return y.enc.Hex.stringify(r)}(i[o].ivlen).toUpperCase());var c=function t(e,r,n,o){return (0, i[r].eproc)(e,n,o)}(r,o,s(o,n,a).keyhex,a);u="-----BEGIN "+e+" PRIVATE KEY-----\r\n";return u+="Proc-Type: 4,ENCRYPTED\r\n",u+="DEK-Info: "+o+","+a+"\r\n",u+="\r\n",u+=c.replace(/(.{64})/g,"$1\r\n"),u+="\r\n-----END "+e+" PRIVATE KEY-----\r\n"},parseHexOfEncryptedPKCS8:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={},s=n(e,0);if(2!=s.length)throw "malformed format: SEQUENCE(0).items != 2: "+s.length;o.ciphertext=i(e,s[1]);var a=n(e,s[0]);if(2!=a.length)throw "malformed format: SEQUENCE(0.0).items != 2: "+a.length;if("2a864886f70d01050d"!=i(e,a[0]))throw "this only supports pkcs5PBES2";var u=n(e,a[1]);if(2!=a.length)throw "malformed format: SEQUENCE(0.0.1).items != 2: "+u.length;var c=n(e,u[1]);if(2!=c.length)throw "malformed format: SEQUENCE(0.0.1.1).items != 2: "+c.length;if("2a864886f70d0307"!=i(e,c[0]))throw "this only supports TripleDES";o.encryptionSchemeAlg="TripleDES",o.encryptionSchemeIV=i(e,c[1]);var h=n(e,u[0]);if(2!=h.length)throw "malformed format: SEQUENCE(0.0.1.0).items != 2: "+h.length;if("2a864886f70d01050c"!=i(e,h[0]))throw "this only supports pkcs5PBKDF2";var l=n(e,h[1]);if(l.length<2)throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+l.length;o.pbkdf2Salt=i(e,l[0]);var f=i(e,l[1]);try{o.pbkdf2Iter=parseInt(f,16);}catch(t){throw "malformed format pbkdf2Iter: "+f}return o},getPBKDF2KeyHexFromParam:function t(e,r){var n=y.enc.Hex.parse(e.pbkdf2Salt),i=e.pbkdf2Iter,o=y.PBKDF2(r,n,{keySize:6,iterations:i});return y.enc.Hex.stringify(o)},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function t(e,r){var n=Hr(e,"ENCRYPTED PRIVATE KEY"),i=this.parseHexOfEncryptedPKCS8(n),o=Zr.getPBKDF2KeyHexFromParam(i,r),s={};s.ciphertext=y.enc.Hex.parse(i.ciphertext);var a=y.enc.Hex.parse(o),u=y.enc.Hex.parse(i.encryptionSchemeIV),c=y.TripleDES.decrypt(s,a,{iv:u});return y.enc.Hex.stringify(c)},getKeyFromEncryptedPKCS8PEM:function t(e,r){var n=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(e,r);return this.getKeyFromPlainPrivatePKCS8Hex(n)},parsePlainPrivatePKCS8Hex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={algparam:null};if("30"!=e.substr(0,2))throw "malformed plain PKCS8 private key(code:001)";var s=n(e,0);if(3!=s.length)throw "malformed plain PKCS8 private key(code:002)";if("30"!=e.substr(s[1],2))throw "malformed PKCS8 private key(code:003)";var a=n(e,s[1]);if(2!=a.length)throw "malformed PKCS8 private key(code:004)";if("06"!=e.substr(a[0],2))throw "malformed PKCS8 private key(code:005)";if(o.algoid=i(e,a[0]),"06"==e.substr(a[1],2)&&(o.algparam=i(e,a[1])),"04"!=e.substr(s[2],2))throw "malformed PKCS8 private key(code:006)";return o.keyidx=r.getVidx(e,s[2]),o},getKeyFromPlainPrivatePKCS8PEM:function t(e){var r=Hr(e,"PRIVATE KEY");return this.getKeyFromPlainPrivatePKCS8Hex(r)},getKeyFromPlainPrivatePKCS8Hex:function t(e){var r,n=this.parsePlainPrivatePKCS8Hex(e);if("2a864886f70d010101"==n.algoid)r=new He;else if("2a8648ce380401"==n.algoid)r=new br.crypto.DSA;else {if("2a8648ce3d0201"!=n.algoid)throw "unsupported private key algorithm";r=new br.crypto.ECDSA;}return r.readPKCS8PrvKeyHex(e),r},_getKeyFromPublicPKCS8Hex:function t(e){var r,n=Er.getVbyList(e,0,[0,0],"06");if("2a864886f70d010101"===n)r=new He;else if("2a8648ce380401"===n)r=new br.crypto.DSA;else {if("2a8648ce3d0201"!==n)throw "unsupported PKCS#8 public key hex";r=new br.crypto.ECDSA;}return r.readPKCS8PubKeyHex(e),r},parsePublicRawRSAKeyHex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={};if("30"!=e.substr(0,2))throw "malformed RSA key(code:001)";var s=n(e,0);if(2!=s.length)throw "malformed RSA key(code:002)";if("02"!=e.substr(s[0],2))throw "malformed RSA key(code:003)";if(o.n=i(e,s[0]),"02"!=e.substr(s[1],2))throw "malformed RSA key(code:004)";return o.e=i(e,s[1]),o},parsePublicPKCS8Hex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={algparam:null},s=n(e,0);if(2!=s.length)throw "outer DERSequence shall have 2 elements: "+s.length;var a=s[0];if("30"!=e.substr(a,2))throw "malformed PKCS8 public key(code:001)";var u=n(e,a);if(2!=u.length)throw "malformed PKCS8 public key(code:002)";if("06"!=e.substr(u[0],2))throw "malformed PKCS8 public key(code:003)";if(o.algoid=i(e,u[0]),"06"==e.substr(u[1],2)?o.algparam=i(e,u[1]):"30"==e.substr(u[1],2)&&(o.algparam={},o.algparam.p=r.getVbyList(e,u[1],[0],"02"),o.algparam.q=r.getVbyList(e,u[1],[1],"02"),o.algparam.g=r.getVbyList(e,u[1],[2],"02")),"03"!=e.substr(s[1],2))throw "malformed PKCS8 public key(code:004)";return o.key=i(e,s[1]).substr(2),o}}}();Zr.getKey=function(t,e,r){var n=(v=Er).getChildIdx,i=(v.getV,v.getVbyList),o=br.crypto,s=o.ECDSA,a=o.DSA,u=He,c=Hr,h=Zr;if(void 0!==u&&t instanceof u)return t;if(void 0!==s&&t instanceof s)return t;if(void 0!==a&&t instanceof a)return t;if(void 0!==t.curve&&void 0!==t.xy&&void 0===t.d)return new s({pub:t.xy,curve:t.curve});if(void 0!==t.curve&&void 0!==t.d)return new s({prv:t.d,curve:t.curve});if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0===t.d)return (P=new u).setPublic(t.n,t.e),P;if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0!==t.p&&void 0!==t.q&&void 0!==t.dp&&void 0!==t.dq&&void 0!==t.co&&void 0===t.qi)return (P=new u).setPrivateEx(t.n,t.e,t.d,t.p,t.q,t.dp,t.dq,t.co),P;if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0===t.p)return (P=new u).setPrivate(t.n,t.e,t.d),P;if(void 0!==t.p&&void 0!==t.q&&void 0!==t.g&&void 0!==t.y&&void 0===t.x)return (P=new a).setPublic(t.p,t.q,t.g,t.y),P;if(void 0!==t.p&&void 0!==t.q&&void 0!==t.g&&void 0!==t.y&&void 0!==t.x)return (P=new a).setPrivate(t.p,t.q,t.g,t.y,t.x),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0===t.d)return (P=new u).setPublic(Ir(t.n),Ir(t.e)),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0!==t.p&&void 0!==t.q&&void 0!==t.dp&&void 0!==t.dq&&void 0!==t.qi)return (P=new u).setPrivateEx(Ir(t.n),Ir(t.e),Ir(t.d),Ir(t.p),Ir(t.q),Ir(t.dp),Ir(t.dq),Ir(t.qi)),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d)return (P=new u).setPrivate(Ir(t.n),Ir(t.e),Ir(t.d)),P;if("EC"===t.kty&&void 0!==t.crv&&void 0!==t.x&&void 0!==t.y&&void 0===t.d){var l=(k=new s({curve:t.crv})).ecparams.keylen/4,f="04"+("0000000000"+Ir(t.x)).slice(-l)+("0000000000"+Ir(t.y)).slice(-l);return k.setPublicKeyHex(f),k}if("EC"===t.kty&&void 0!==t.crv&&void 0!==t.x&&void 0!==t.y&&void 0!==t.d){l=(k=new s({curve:t.crv})).ecparams.keylen/4,f="04"+("0000000000"+Ir(t.x)).slice(-l)+("0000000000"+Ir(t.y)).slice(-l);var g=("0000000000"+Ir(t.d)).slice(-l);return k.setPublicKeyHex(f),k.setPrivateKeyHex(g),k}if("pkcs5prv"===r){var d,p=t,v=Er;if(9===(d=n(p,0)).length)(P=new u).readPKCS5PrvKeyHex(p);else if(6===d.length)(P=new a).readPKCS5PrvKeyHex(p);else {if(!(d.length>2&&"04"===p.substr(d[1],2)))throw "unsupported PKCS#1/5 hexadecimal key";(P=new s).readPKCS5PrvKeyHex(p);}return P}if("pkcs8prv"===r)return P=h.getKeyFromPlainPrivatePKCS8Hex(t);if("pkcs8pub"===r)return h._getKeyFromPublicPKCS8Hex(t);if("x509pub"===r)return on.getPublicKeyFromCertHex(t);if(-1!=t.indexOf("-END CERTIFICATE-",0)||-1!=t.indexOf("-END X509 CERTIFICATE-",0)||-1!=t.indexOf("-END TRUSTED CERTIFICATE-",0))return on.getPublicKeyFromCertPEM(t);if(-1!=t.indexOf("-END PUBLIC KEY-")){var y=Hr(t,"PUBLIC KEY");return h._getKeyFromPublicPKCS8Hex(y)}if(-1!=t.indexOf("-END RSA PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){var m=c(t,"RSA PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=t.indexOf("-END DSA PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){var _=i(R=c(t,"DSA PRIVATE KEY"),0,[1],"02"),S=i(R,0,[2],"02"),b=i(R,0,[3],"02"),w=i(R,0,[4],"02"),E=i(R,0,[5],"02");return (P=new a).setPrivate(new F(_,16),new F(S,16),new F(b,16),new F(w,16),new F(E,16)),P}if(-1!=t.indexOf("-END EC PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){m=c(t,"EC PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=t.indexOf("-END PRIVATE KEY-"))return h.getKeyFromPlainPrivatePKCS8PEM(t);if(-1!=t.indexOf("-END RSA PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var x=h.getDecryptedKeyHex(t,e),A=new He;return A.readPKCS5PrvKeyHex(x),A}if(-1!=t.indexOf("-END EC PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var k,P=i(R=h.getDecryptedKeyHex(t,e),0,[1],"04"),C=i(R,0,[2,0],"06"),T=i(R,0,[3,0],"03").substr(2);if(void 0===br.crypto.OID.oidhex2name[C])throw "undefined OID(hex) in KJUR.crypto.OID: "+C;return (k=new s({curve:br.crypto.OID.oidhex2name[C]})).setPublicKeyHex(T),k.setPrivateKeyHex(P),k.isPublic=!1,k}if(-1!=t.indexOf("-END DSA PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var R;_=i(R=h.getDecryptedKeyHex(t,e),0,[1],"02"),S=i(R,0,[2],"02"),b=i(R,0,[3],"02"),w=i(R,0,[4],"02"),E=i(R,0,[5],"02");return (P=new a).setPrivate(new F(_,16),new F(S,16),new F(b,16),new F(w,16),new F(E,16)),P}if(-1!=t.indexOf("-END ENCRYPTED PRIVATE KEY-"))return h.getKeyFromEncryptedPKCS8PEM(t,e);throw new Error("not supported argument")},Zr.generateKeypair=function(t,e){if("RSA"==t){var r=e;(s=new He).generate(r,"10001"),s.isPrivate=!0,s.isPublic=!0;var n=new He,i=s.n.toString(16),o=s.e.toString(16);return n.setPublic(i,o),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}if("EC"==t){var s,a,u=e,c=new br.crypto.ECDSA({curve:u}).generateKeyPairHex();return (s=new br.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),s.setPrivateKeyHex(c.ecprvhex),s.isPrivate=!0,s.isPublic=!1,(n=new br.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}throw "unknown algorithm: "+t},Zr.getPEM=function(t,e,r,n,i,o){var s=br,a=s.asn1,u=a.DERObjectIdentifier,c=a.DERInteger,h=a.ASN1Util.newObject,l=a.x509.SubjectPublicKeyInfo,f=s.crypto,g=f.DSA,d=f.ECDSA,p=He;function v(t){return h({seq:[{int:0},{int:{bigint:t.n}},{int:t.e},{int:{bigint:t.d}},{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.dmp1}},{int:{bigint:t.dmq1}},{int:{bigint:t.coeff}}]})}function m(t){return h({seq:[{int:1},{octstr:{hex:t.prvKeyHex}},{tag:["a0",!0,{oid:{name:t.curveName}}]},{tag:["a1",!0,{bitstr:{hex:"00"+t.pubKeyHex}}]}]})}function _(t){return h({seq:[{int:0},{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.g}},{int:{bigint:t.y}},{int:{bigint:t.x}}]})}if((void 0!==p&&t instanceof p||void 0!==g&&t instanceof g||void 0!==d&&t instanceof d)&&1==t.isPublic&&(void 0===e||"PKCS8PUB"==e))return Mr(F=new l(t).getEncodedHex(),"PUBLIC KEY");if("PKCS1PRV"==e&&void 0!==p&&t instanceof p&&(void 0===r||null==r)&&1==t.isPrivate)return Mr(F=v(t).getEncodedHex(),"RSA PRIVATE KEY");if("PKCS1PRV"==e&&void 0!==d&&t instanceof d&&(void 0===r||null==r)&&1==t.isPrivate){var S=new u({name:t.curveName}).getEncodedHex(),b=m(t).getEncodedHex(),w="";return w+=Mr(S,"EC PARAMETERS"),w+=Mr(b,"EC PRIVATE KEY")}if("PKCS1PRV"==e&&void 0!==g&&t instanceof g&&(void 0===r||null==r)&&1==t.isPrivate)return Mr(F=_(t).getEncodedHex(),"DSA PRIVATE KEY");if("PKCS5PRV"==e&&void 0!==p&&t instanceof p&&void 0!==r&&null!=r&&1==t.isPrivate){var F=v(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",F,r,n,o)}if("PKCS5PRV"==e&&void 0!==d&&t instanceof d&&void 0!==r&&null!=r&&1==t.isPrivate){F=m(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",F,r,n,o)}if("PKCS5PRV"==e&&void 0!==g&&t instanceof g&&void 0!==r&&null!=r&&1==t.isPrivate){F=_(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",F,r,n,o)}var E=function t(e,r){var n=x(e,r);return new h({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:n.pbkdf2Salt}},{int:n.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:n.encryptionSchemeIV}}]}]}]},{octstr:{hex:n.ciphertext}}]}).getEncodedHex()},x=function t(e,r){var n=y.lib.WordArray.random(8),i=y.lib.WordArray.random(8),o=y.PBKDF2(r,n,{keySize:6,iterations:100}),s=y.enc.Hex.parse(e),a=y.TripleDES.encrypt(s,o,{iv:i})+"",u={};return u.ciphertext=a,u.pbkdf2Salt=y.enc.Hex.stringify(n),u.pbkdf2Iter=100,u.encryptionSchemeAlg="DES-EDE3-CBC",u.encryptionSchemeIV=y.enc.Hex.stringify(i),u};if("PKCS8PRV"==e&&null!=p&&t instanceof p&&1==t.isPrivate){var A=v(t).getEncodedHex();F=h({seq:[{int:0},{seq:[{oid:{name:"rsaEncryption"}},{null:!0}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==e&&void 0!==d&&t instanceof d&&1==t.isPrivate){A=new h({seq:[{int:1},{octstr:{hex:t.prvKeyHex}},{tag:["a1",!0,{bitstr:{hex:"00"+t.pubKeyHex}}]}]}).getEncodedHex(),F=h({seq:[{int:0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:t.curveName}}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==e&&void 0!==g&&t instanceof g&&1==t.isPrivate){A=new c({bigint:t.x}).getEncodedHex(),F=h({seq:[{int:0},{seq:[{oid:{name:"dsa"}},{seq:[{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.g}}]}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}throw new Error("unsupported object nor format")},Zr.getKeyFromCSRPEM=function(t){var e=Hr(t,"CERTIFICATE REQUEST");return Zr.getKeyFromCSRHex(e)},Zr.getKeyFromCSRHex=function(t){var e=Zr.parseCSRHex(t);return Zr.getKey(e.p8pubkeyhex,null,"pkcs8pub")},Zr.parseCSRHex=function(t){var e=Er,r=e.getChildIdx,n=e.getTLV,i={},o=t;if("30"!=o.substr(0,2))throw "malformed CSR(code:001)";var s=r(o,0);if(s.length<1)throw "malformed CSR(code:002)";if("30"!=o.substr(s[0],2))throw "malformed CSR(code:003)";var a=r(o,s[0]);if(a.length<3)throw "malformed CSR(code:004)";return i.p8pubkeyhex=n(o,a[2]),i},Zr.getKeyID=function(t){var e=Zr,r=Er;"string"==typeof t&&-1!=t.indexOf("BEGIN ")&&(t=e.getKey(t));var n=Hr(e.getPEM(t)),i=r.getIdxbyList(n,0,[1]),o=r.getV(n,i).substring(2);return br.crypto.Util.hashHex(o,"sha1")},Zr.getJWKFromKey=function(t){var e={};if(t instanceof He&&t.isPrivate)return e.kty="RSA",e.n=Rr(t.n.toString(16)),e.e=Rr(t.e.toString(16)),e.d=Rr(t.d.toString(16)),e.p=Rr(t.p.toString(16)),e.q=Rr(t.q.toString(16)),e.dp=Rr(t.dmp1.toString(16)),e.dq=Rr(t.dmq1.toString(16)),e.qi=Rr(t.coeff.toString(16)),e;if(t instanceof He&&t.isPublic)return e.kty="RSA",e.n=Rr(t.n.toString(16)),e.e=Rr(t.e.toString(16)),e;if(t instanceof br.crypto.ECDSA&&t.isPrivate){if("P-256"!==(n=t.getShortNISTPCurveName())&&"P-384"!==n)throw "unsupported curve name for JWT: "+n;var r=t.getPublicKeyXYHex();return e.kty="EC",e.crv=n,e.x=Rr(r.x),e.y=Rr(r.y),e.d=Rr(t.prvKeyHex),e}if(t instanceof br.crypto.ECDSA&&t.isPublic){var n;if("P-256"!==(n=t.getShortNISTPCurveName())&&"P-384"!==n)throw "unsupported curve name for JWT: "+n;r=t.getPublicKeyXYHex();return e.kty="EC",e.crv=n,e.x=Rr(r.x),e.y=Rr(r.y),e}throw "not supported key object"},He.getPosArrayOfChildrenFromHex=function(t){return Er.getChildIdx(t,0)},He.getHexValueArrayOfChildrenFromHex=function(t){var e,r=Er.getV,n=r(t,(e=He.getPosArrayOfChildrenFromHex(t))[0]),i=r(t,e[1]),o=r(t,e[2]),s=r(t,e[3]),a=r(t,e[4]),u=r(t,e[5]),c=r(t,e[6]),h=r(t,e[7]),l=r(t,e[8]);return (e=new Array).push(n,i,o,s,a,u,c,h,l),e},He.prototype.readPrivateKeyFromPEMString=function(t){var e=Hr(t),r=He.getHexValueArrayOfChildrenFromHex(e);this.setPrivateEx(r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8]);},He.prototype.readPKCS5PrvKeyHex=function(t){var e=He.getHexValueArrayOfChildrenFromHex(t);this.setPrivateEx(e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]);},He.prototype.readPKCS8PrvKeyHex=function(t){var e,r,n,i,o,s,a,u,c=Er,h=c.getVbyListEx;if(!1===c.isASN1HEX(t))throw new Error("not ASN.1 hex string");try{e=h(t,0,[2,0,1],"02"),r=h(t,0,[2,0,2],"02"),n=h(t,0,[2,0,3],"02"),i=h(t,0,[2,0,4],"02"),o=h(t,0,[2,0,5],"02"),s=h(t,0,[2,0,6],"02"),a=h(t,0,[2,0,7],"02"),u=h(t,0,[2,0,8],"02");}catch(t){throw new Error("malformed PKCS#8 plain RSA private key")}this.setPrivateEx(e,r,n,i,o,s,a,u);},He.prototype.readPKCS5PubKeyHex=function(t){var e=Er,r=e.getV;if(!1===e.isASN1HEX(t))throw new Error("keyHex is not ASN.1 hex string");var n=e.getChildIdx(t,0);if(2!==n.length||"02"!==t.substr(n[0],2)||"02"!==t.substr(n[1],2))throw new Error("wrong hex for PKCS#5 public key");var i=r(t,n[0]),o=r(t,n[1]);this.setPublic(i,o);},He.prototype.readPKCS8PubKeyHex=function(t){var e=Er;if(!1===e.isASN1HEX(t))throw new Error("not ASN.1 hex string");if("06092a864886f70d010101"!==e.getTLVbyListEx(t,0,[0,0]))throw new Error("not PKCS8 RSA public key");var r=e.getTLVbyListEx(t,0,[1,0]);this.readPKCS5PubKeyHex(r);},He.prototype.readCertPubKeyHex=function(t,e){var r,n;(r=new on).readCertHex(t),n=r.getPublicKeyHex(),this.readPKCS8PubKeyHex(n);};var tn=new RegExp("[^0-9a-f]","gi");function en(t,e){for(var r="",n=e/4-t.length,i=0;i<n;i++)r+="0";return r+t}function rn(t,e,r){for(var n="",i=0;n.length<e;)n+=Nr(r(Ur(t+String.fromCharCode.apply(String,[(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i])))),i+=1;return n}function nn(t){for(var e in br.crypto.Util.DIGESTINFOHEAD){var r=br.crypto.Util.DIGESTINFOHEAD[e],n=r.length;if(t.substring(0,n)==r)return [e,t.substring(n)]}return []}function on(t){var e,r=Er,n=r.getChildIdx,i=r.getV,o=r.getTLV,s=r.getVbyList,a=r.getVbyListEx,u=r.getTLVbyList,c=r.getTLVbyListEx,h=r.getIdxbyList,l=r.getIdxbyListEx,f=r.getVidx,g=r.oidname,d=r.hextooidstr,p=on,v=Hr;try{e=br.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;}catch(t){}this.HEX2STAG={"0c":"utf8",13:"prn",16:"ia5","1a":"vis","1e":"bmp"},this.hex=null,this.version=0,this.foffset=0,this.aExtInfo=null,this.getVersion=function(){return null===this.hex||0!==this.version?this.version:"a003020102"!==u(this.hex,0,[0,0])?(this.version=1,this.foffset=-1,1):(this.version=3,3)},this.getSerialNumberHex=function(){return a(this.hex,0,[0,0],"02")},this.getSignatureAlgorithmField=function(){var t=c(this.hex,0,[0,1]);return this.getAlgorithmIdentifierName(t)},this.getAlgorithmIdentifierName=function(t){for(var r in e)if(t===e[r])return r;return g(a(t,0,[0],"06"))},this.getIssuer=function(){return this.getX500Name(this.getIssuerHex())},this.getIssuerHex=function(){return u(this.hex,0,[0,3+this.foffset],"30")},this.getIssuerString=function(){return p.hex2dn(this.getIssuerHex())},this.getSubject=function(){return this.getX500Name(this.getSubjectHex())},this.getSubjectHex=function(){return u(this.hex,0,[0,5+this.foffset],"30")},this.getSubjectString=function(){return p.hex2dn(this.getSubjectHex())},this.getNotBefore=function(){var t=s(this.hex,0,[0,4+this.foffset,0]);return t=t.replace(/(..)/g,"%$1"),t=decodeURIComponent(t)},this.getNotAfter=function(){var t=s(this.hex,0,[0,4+this.foffset,1]);return t=t.replace(/(..)/g,"%$1"),t=decodeURIComponent(t)},this.getPublicKeyHex=function(){return r.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyIdx=function(){return h(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyContentIdx=function(){var t=this.getPublicKeyIdx();return h(this.hex,t,[1,0],"30")},this.getPublicKey=function(){return Zr.getKey(this.getPublicKeyHex(),null,"pkcs8pub")},this.getSignatureAlgorithmName=function(){var t=u(this.hex,0,[1],"30");return this.getAlgorithmIdentifierName(t)},this.getSignatureValueHex=function(){return s(this.hex,0,[2],"03",!0)},this.verifySignature=function(t){var e=this.getSignatureAlgorithmField(),r=this.getSignatureValueHex(),n=u(this.hex,0,[0],"30"),i=new br.crypto.Signature({alg:e});return i.init(t),i.updateHex(n),i.verify(r)},this.parseExt=function(t){var e,o,a;if(void 0===t){if(a=this.hex,3!==this.version)return -1;e=h(a,0,[0,7,0],"30"),o=n(a,e);}else {a=Hr(t);var u=h(a,0,[0,3,0,0],"06");if("2a864886f70d01090e"!=i(a,u))return void(this.aExtInfo=new Array);e=h(a,0,[0,3,0,1,0],"30"),o=n(a,e),this.hex=a;}this.aExtInfo=new Array;for(var c=0;c<o.length;c++){var l={critical:!1},g=0;3===n(a,o[c]).length&&(l.critical=!0,g=1),l.oid=r.hextooidstr(s(a,o[c],[0],"06"));var d=h(a,o[c],[1+g]);l.vidx=f(a,d),this.aExtInfo.push(l);}},this.getExtInfo=function(t){var e=this.aExtInfo,r=t;if(t.match(/^[0-9.]+$/)||(r=br.asn1.x509.OID.name2oid(t)),""!==r)for(var n=0;n<e.length;n++)if(e[n].oid===r)return e[n]},this.getExtBasicConstraints=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("basicConstraints");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var n={extname:"basicConstraints"};if(e&&(n.critical=!0),"3000"===t)return n;if("30030101ff"===t)return n.cA=!0,n;if("30060101ff02"===t.substr(0,12)){var s=i(t,10),a=parseInt(s,16);return n.cA=!0,n.pathLen=a,n}throw new Error("hExtV parse error: "+t)},this.getExtKeyUsage=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("keyUsage");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var n={extname:"keyUsage"};return e&&(n.critical=!0),n.names=this.getExtKeyUsageString(t).split(","),n},this.getExtKeyUsageBin=function(t){if(void 0===t){var e=this.getExtInfo("keyUsage");if(void 0===e)return "";t=o(this.hex,e.vidx);}if(8!=t.length&&10!=t.length)throw new Error("malformed key usage value: "+t);var r="000000000000000"+parseInt(t.substr(6),16).toString(2);return 8==t.length&&(r=r.slice(-8)),10==t.length&&(r=r.slice(-16)),""==(r=r.replace(/0+$/,""))&&(r="0"),r},this.getExtKeyUsageString=function(t){for(var e=this.getExtKeyUsageBin(t),r=new Array,n=0;n<e.length;n++)"1"==e.substr(n,1)&&r.push(on.KEYUSAGE_NAME[n]);return r.join(",")},this.getExtSubjectKeyIdentifier=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("subjectKeyIdentifier");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var n={extname:"subjectKeyIdentifier"};e&&(n.critical=!0);var s=i(t,0);return n.kid={hex:s},n},this.getExtAuthorityKeyIdentifier=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("authorityKeyIdentifier");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var s={extname:"authorityKeyIdentifier"};e&&(s.critical=!0);for(var a=n(t,0),u=0;u<a.length;u++){var c=t.substr(a[u],2);if("80"===c&&(s.kid={hex:i(t,a[u])}),"a1"===c){var h=o(t,a[u]),l=this.getGeneralNames(h);s.issuer=l[0].dn;}"82"===c&&(s.sn={hex:i(t,a[u])});}return s},this.getExtExtKeyUsage=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("extKeyUsage");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var s={extname:"extKeyUsage",array:[]};e&&(s.critical=!0);for(var a=n(t,0),u=0;u<a.length;u++)s.array.push(g(i(t,a[u])));return s},this.getExtExtKeyUsageName=function(){var t=this.getExtInfo("extKeyUsage");if(void 0===t)return t;var e=new Array,r=o(this.hex,t.vidx);if(""===r)return e;for(var s=n(r,0),a=0;a<s.length;a++)e.push(g(i(r,s[a])));return e},this.getExtSubjectAltName=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("subjectAltName");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var n={extname:"subjectAltName",array:[]};return e&&(n.critical=!0),n.array=this.getGeneralNames(t),n},this.getExtIssuerAltName=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("issuerAltName");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var n={extname:"issuerAltName",array:[]};return e&&(n.critical=!0),n.array=this.getGeneralNames(t),n},this.getGeneralNames=function(t){for(var e=n(t,0),r=[],i=0;i<e.length;i++){var s=this.getGeneralName(o(t,e[i]));void 0!==s&&r.push(s);}return r},this.getGeneralName=function(t){var e=t.substr(0,2),r=i(t,0),n=Nr(r);return "81"==e?{rfc822:n}:"82"==e?{dns:n}:"86"==e?{uri:n}:"87"==e?{ip:Yr(r)}:"a4"==e?{dn:this.getX500Name(r)}:void 0},this.getExtSubjectAltName2=function(){var t,e,r,s=this.getExtInfo("subjectAltName");if(void 0===s)return s;for(var a=new Array,u=o(this.hex,s.vidx),c=n(u,0),h=0;h<c.length;h++)r=u.substr(c[h],2),t=i(u,c[h]),"81"===r&&(e=Lr(t),a.push(["MAIL",e])),"82"===r&&(e=Lr(t),a.push(["DNS",e])),"84"===r&&(e=on.hex2dn(t,0),a.push(["DN",e])),"86"===r&&(e=Lr(t),a.push(["URI",e])),"87"===r&&(e=Yr(t),a.push(["IP",e]));return a},this.getExtCRLDistributionPoints=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("cRLDistributionPoints");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var i={extname:"cRLDistributionPoints",array:[]};e&&(i.critical=!0);for(var s=n(t,0),a=0;a<s.length;a++){var u=o(t,s[a]);i.array.push(this.getDistributionPoint(u));}return i},this.getDistributionPoint=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=t.substr(r[i],2),a=o(t,r[i]);"a0"==s&&(e.dpname=this.getDistributionPointName(a));}return e},this.getDistributionPointName=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=t.substr(r[i],2),a=o(t,r[i]);"a0"==s&&(e.full=this.getGeneralNames(a));}return e},this.getExtCRLDistributionPointsURI=function(){var t=this.getExtInfo("cRLDistributionPoints");if(void 0===t)return t;for(var e=new Array,r=n(this.hex,t.vidx),i=0;i<r.length;i++)try{var o=Lr(s(this.hex,r[i],[0,0,0],"86"));e.push(o);}catch(t){}return e},this.getExtAIAInfo=function(){var t=this.getExtInfo("authorityInfoAccess");if(void 0===t)return t;for(var e={ocsp:[],caissuer:[]},r=n(this.hex,t.vidx),i=0;i<r.length;i++){var o=s(this.hex,r[i],[0],"06"),a=s(this.hex,r[i],[1],"86");"2b06010505073001"===o&&e.ocsp.push(Lr(a)),"2b06010505073002"===o&&e.caissuer.push(Lr(a));}return e},this.getExtAuthorityInfoAccess=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("authorityInfoAccess");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var i={extname:"authorityInfoAccess",array:[]};e&&(i.critical=!0);for(var u=n(t,0),c=0;c<u.length;c++){var h=a(t,u[c],[0],"06"),l=Lr(s(t,u[c],[1],"86"));if("2b06010505073001"==h)i.array.push({ocsp:l});else {if("2b06010505073002"!=h)throw new Error("unknown method: "+h);i.array.push({caissuer:l});}}return i},this.getExtCertificatePolicies=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("certificatePolicies");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var i={extname:"certificatePolicies",array:[]};e&&(i.critical=!0);for(var s=n(t,0),a=0;a<s.length;a++){var u=o(t,s[a]),c=this.getPolicyInformation(u);i.array.push(c);}return i},this.getPolicyInformation=function(t){var e={},r=s(t,0,[0],"06");e.policyoid=g(r);var i=l(t,0,[1],"30");if(-1!=i){e.array=[];for(var a=n(t,i),u=0;u<a.length;u++){var c=o(t,a[u]),h=this.getPolicyQualifierInfo(c);e.array.push(h);}}return e},this.getPolicyQualifierInfo=function(t){var e={},r=s(t,0,[0],"06");if("2b06010505070201"===r){var n=a(t,0,[1],"16");e.cps=Nr(n);}else if("2b06010505070202"===r){var i=u(t,0,[1],"30");e.unotice=this.getUserNotice(i);}return e},this.getUserNotice=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=o(t,r[i]);"30"!=s.substr(0,2)&&(e.exptext=this.getDisplayText(s));}return e},this.getDisplayText=function(t){var e={};return e.type={"0c":"utf8",16:"ia5","1a":"vis","1e":"bmp"}[t.substr(0,2)],e.str=Nr(i(t,0)),e},this.getExtCRLNumber=function(t,e){var r={extname:"cRLNumber"};if(e&&(r.critical=!0),"02"==t.substr(0,2))return r.num={hex:i(t,0)},r;throw new Error("hExtV parse error: "+t)},this.getExtCRLReason=function(t,e){var r={extname:"cRLReason"};if(e&&(r.critical=!0),"0a"==t.substr(0,2))return r.code=parseInt(i(t,0),16),r;throw new Error("hExtV parse error: "+t)},this.getExtOcspNonce=function(t,e){var r={extname:"ocspNonce"};e&&(r.critical=!0);var n=i(t,0);return r.hex=n,r},this.getExtOcspNoCheck=function(t,e){var r={extname:"ocspNoCheck"};return e&&(r.critical=!0),r},this.getExtAdobeTimeStamp=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("adobeTimeStamp");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical;}var i={extname:"adobeTimeStamp"};e&&(i.critical=!0);var s=n(t,0);if(s.length>1){var a=o(t,s[1]),u=this.getGeneralName(a);null!=u.uri&&(i.uri=u.uri);}if(s.length>2){var c=o(t,s[2]);"0101ff"==c&&(i.reqauth=!0),"010100"==c&&(i.reqauth=!1);}return i},this.getX500NameRule=function(t){for(var e=null,r=[],n=0;n<t.length;n++)for(var i=t[n],o=0;o<i.length;o++)r.push(i[o]);for(n=0;n<r.length;n++){var s=r[n],a=s.ds,u=s.value,c=s.type;if("prn"!=a&&"utf8"!=a&&"ia5"!=a)return "mixed";if("ia5"==a){if("CN"!=c)return "mixed";if(br.lang.String.isMail(u))continue;return "mixed"}if("C"==c){if("prn"==a)continue;return "mixed"}if(null==e)e=a;else if(e!==a)return "mixed"}return null==e?"prn":e},this.getX500Name=function(t){var e=this.getX500NameArray(t);return {array:e,str:this.dnarraytostr(e)}},this.getX500NameArray=function(t){for(var e=[],r=n(t,0),i=0;i<r.length;i++)e.push(this.getRDN(o(t,r[i])));return e},this.getRDN=function(t){for(var e=[],r=n(t,0),i=0;i<r.length;i++)e.push(this.getAttrTypeAndValue(o(t,r[i])));return e},this.getAttrTypeAndValue=function(t){var e={type:null,value:null,ds:null},r=n(t,0),i=s(t,r[0],[],"06"),o=s(t,r[1],[]),a=br.asn1.ASN1Util.oidHexToInt(i);return e.type=br.asn1.x509.OID.oid2atype(a),e.value=Nr(o),e.ds=this.HEX2STAG[t.substr(r[1],2)],e},this.readCertPEM=function(t){this.readCertHex(v(t));},this.readCertHex=function(t){this.hex=t,this.getVersion();try{h(this.hex,0,[0,7],"a3"),this.parseExt();}catch(t){}},this.getParam=function(){var t={};return t.version=this.getVersion(),t.serial={hex:this.getSerialNumberHex()},t.sigalg=this.getSignatureAlgorithmField(),t.issuer=this.getIssuer(),t.notbefore=this.getNotBefore(),t.notafter=this.getNotAfter(),t.subject=this.getSubject(),t.sbjpubkey=Mr(this.getPublicKeyHex(),"PUBLIC KEY"),this.aExtInfo.length>0&&(t.ext=this.getExtParamArray()),t.sighex=this.getSignatureValueHex(),t},this.getExtParamArray=function(t){null==t&&(-1!=l(this.hex,0,[0,"[3]"])&&(t=c(this.hex,0,[0,"[3]",0],"30")));for(var e=[],r=n(t,0),i=0;i<r.length;i++){var s=o(t,r[i]),a=this.getExtParam(s);null!=a&&e.push(a);}return e},this.getExtParam=function(t){var e=n(t,0).length;if(2!=e&&3!=e)throw new Error("wrong number elements in Extension: "+e+" "+t);var r=d(s(t,0,[0],"06")),i=!1;3==e&&"0101ff"==u(t,0,[1])&&(i=!0);var o=u(t,0,[e-1,0]),a=void 0;if("2.5.29.14"==r?a=this.getExtSubjectKeyIdentifier(o,i):"2.5.29.15"==r?a=this.getExtKeyUsage(o,i):"2.5.29.17"==r?a=this.getExtSubjectAltName(o,i):"2.5.29.18"==r?a=this.getExtIssuerAltName(o,i):"2.5.29.19"==r?a=this.getExtBasicConstraints(o,i):"2.5.29.31"==r?a=this.getExtCRLDistributionPoints(o,i):"2.5.29.32"==r?a=this.getExtCertificatePolicies(o,i):"2.5.29.35"==r?a=this.getExtAuthorityKeyIdentifier(o,i):"2.5.29.37"==r?a=this.getExtExtKeyUsage(o,i):"1.3.6.1.5.5.7.1.1"==r?a=this.getExtAuthorityInfoAccess(o,i):"2.5.29.20"==r?a=this.getExtCRLNumber(o,i):"2.5.29.21"==r?a=this.getExtCRLReason(o,i):"1.3.6.1.5.5.7.48.1.2"==r?a=this.getExtOcspNonce(o,i):"1.3.6.1.5.5.7.48.1.5"==r?a=this.getExtOcspNoCheck(o,i):"1.2.840.113583.1.1.9.1"==r&&(a=this.getExtAdobeTimeStamp(o,i)),null!=a)return a;var c={extname:r,extn:o};return i&&(c.critical=!0),c},this.findExt=function(t,e){for(var r=0;r<t.length;r++)if(t[r].extname==e)return t[r];return null},this.updateExtCDPFullURI=function(t,e){var r=this.findExt(t,"cRLDistributionPoints");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)if(null!=n[i].dpname&&null!=n[i].dpname.full)for(var o=n[i].dpname.full,s=0;s<o.length;s++){var a=o[i];null!=a.uri&&(a.uri=e);}},this.updateExtAIAOCSP=function(t,e){var r=this.findExt(t,"authorityInfoAccess");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)null!=n[i].ocsp&&(n[i].ocsp=e);},this.updateExtAIACAIssuer=function(t,e){var r=this.findExt(t,"authorityInfoAccess");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)null!=n[i].caissuer&&(n[i].caissuer=e);},this.dnarraytostr=function(t){return "/"+t.map((function(t){return function e(t){return t.map((function(t){return function e(t){return t.type+"="+t.value}(t)})).join("+")}(t)})).join("/")},this.getInfo=function(){var t,e,r,n=function t(e){return JSON.stringify(e.array).replace(/[\[\]\{\}\"]/g,"")},i=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];if(r+="    policy oid: "+o.policyoid+"\n",void 0!==o.array)for(var s=0;s<o.array.length;s++){var a=o.array[s];void 0!==a.cps&&(r+="    cps: "+a.cps+"\n");}}return r},o=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];try{void 0!==o.dpname.full[0].uri&&(r+="    "+o.dpname.full[0].uri+"\n");}catch(t){}try{void 0!==o.dname.full[0].dn.hex&&(r+="    "+on.hex2dn(o.dpname.full[0].dn.hex)+"\n");}catch(t){}}return r},s=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];void 0!==o.caissuer&&(r+="    caissuer: "+o.caissuer+"\n"),void 0!==o.ocsp&&(r+="    ocsp: "+o.ocsp+"\n");}return r};if(t="Basic Fields\n",t+="  serial number: "+this.getSerialNumberHex()+"\n",t+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n",t+="  issuer: "+this.getIssuerString()+"\n",t+="  notBefore: "+this.getNotBefore()+"\n",t+="  notAfter: "+this.getNotAfter()+"\n",t+="  subject: "+this.getSubjectString()+"\n",t+="  subject public key info: \n",t+="    key algorithm: "+(e=this.getPublicKey()).type+"\n","RSA"===e.type&&(t+="    n="+$r(e.n.toString(16)).substr(0,16)+"...\n",t+="    e="+$r(e.e.toString(16))+"\n"),null!=(r=this.aExtInfo)){t+="X509v3 Extensions:\n";for(var a=0;a<r.length;a++){var u=r[a],c=br.asn1.x509.OID.oid2name(u.oid);""===c&&(c=u.oid);var h="";if(!0===u.critical&&(h="CRITICAL"),t+="  "+c+" "+h+":\n","basicConstraints"===c){var l=this.getExtBasicConstraints();void 0===l.cA?t+="    {}\n":(t+="    cA=true",void 0!==l.pathLen&&(t+=", pathLen="+l.pathLen),t+="\n");}else if("keyUsage"===c)t+="    "+this.getExtKeyUsageString()+"\n";else if("subjectKeyIdentifier"===c)t+="    "+this.getExtSubjectKeyIdentifier().kid.hex+"\n";else if("authorityKeyIdentifier"===c){var f=this.getExtAuthorityKeyIdentifier();void 0!==f.kid&&(t+="    kid="+f.kid.hex+"\n");}else {if("extKeyUsage"===c)t+="    "+this.getExtExtKeyUsage().array.join(", ")+"\n";else if("subjectAltName"===c)t+="    "+n(this.getExtSubjectAltName())+"\n";else if("cRLDistributionPoints"===c)t+=o(this.getExtCRLDistributionPoints());else if("authorityInfoAccess"===c)t+=s(this.getExtAuthorityInfoAccess());else "certificatePolicies"===c&&(t+=i(this.getExtCertificatePolicies()));}}}return t+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n",t+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n"},"string"==typeof t&&(-1!=t.indexOf("-----BEGIN")?this.readCertPEM(t):br.lang.String.isHex(t)&&this.readCertHex(t));}He.prototype.sign=function(t,e){var r=function t(r){return br.crypto.Util.hashString(r,e)}(t);return this.signWithMessageHash(r,e)},He.prototype.signWithMessageHash=function(t,e){var r=je(br.crypto.Util.getPaddedDigestInfoHex(t,e,this.n.bitLength()),16);return en(this.doPrivate(r).toString(16),this.n.bitLength())},He.prototype.signPSS=function(t,e,r){var n=function t(r){return br.crypto.Util.hashHex(r,e)}(Ur(t));return void 0===r&&(r=-1),this.signWithMessageHashPSS(n,e,r)},He.prototype.signWithMessageHashPSS=function(t,e,r){var n,i=Nr(t),o=i.length,s=this.n.bitLength()-1,a=Math.ceil(s/8),u=function t(r){return br.crypto.Util.hashHex(r,e)};if(-1===r||void 0===r)r=o;else if(-2===r)r=a-o-2;else if(r<-2)throw new Error("invalid salt length");if(a<o+r+2)throw new Error("data too long");var c="";r>0&&(c=new Array(r),(new Oe).nextBytes(c),c=String.fromCharCode.apply(String,c));var h=Nr(u(Ur("\0\0\0\0\0\0\0\0"+i+c))),l=[];for(n=0;n<a-r-o-2;n+=1)l[n]=0;var f=String.fromCharCode.apply(String,l)+""+c,g=rn(h,f.length,u),d=[];for(n=0;n<f.length;n+=1)d[n]=f.charCodeAt(n)^g.charCodeAt(n);var p=65280>>8*a-s&255;for(d[0]&=~p,n=0;n<o;n++)d.push(h.charCodeAt(n));return d.push(188),en(this.doPrivate(new F(d)).toString(16),this.n.bitLength())},He.prototype.verify=function(t,e){var r=je(e=(e=e.replace(tn,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=nn(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return !1;var i=n[0];return n[1]==function t(e){return br.crypto.Util.hashString(e,i)}(t)},He.prototype.verifyWithMessageHash=function(t,e){if(e.length!=Math.ceil(this.n.bitLength()/4))return !1;var r=je(e,16);if(r.bitLength()>this.n.bitLength())return 0;var n=nn(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return !1;n[0];return n[1]==t},He.prototype.verifyPSS=function(t,e,r,n){var i=function t(e){return br.crypto.Util.hashHex(e,r)}(Ur(t));return void 0===n&&(n=-1),this.verifyWithMessageHashPSS(i,e,r,n)},He.prototype.verifyWithMessageHashPSS=function(t,e,r,n){if(e.length!=Math.ceil(this.n.bitLength()/4))return !1;var i,o=new F(e,16),s=function t(e){return br.crypto.Util.hashHex(e,r)},a=Nr(t),u=a.length,c=this.n.bitLength()-1,h=Math.ceil(c/8);if(-1===n||void 0===n)n=u;else if(-2===n)n=h-u-2;else if(n<-2)throw new Error("invalid salt length");if(h<u+n+2)throw new Error("data too long");var l=this.doPublic(o).toByteArray();for(i=0;i<l.length;i+=1)l[i]&=255;for(;l.length<h;)l.unshift(0);if(188!==l[h-1])throw new Error("encoded message does not end in 0xbc");var f=(l=String.fromCharCode.apply(String,l)).substr(0,h-u-1),g=l.substr(f.length,u),d=65280>>8*h-c&255;if(0!=(f.charCodeAt(0)&d))throw new Error("bits beyond keysize not zero");var p=rn(g,f.length,s),v=[];for(i=0;i<f.length;i+=1)v[i]=f.charCodeAt(i)^p.charCodeAt(i);v[0]&=~d;var y=h-u-n-2;for(i=0;i<y;i+=1)if(0!==v[i])throw new Error("leftmost octets not zero");if(1!==v[y])throw new Error("0x01 marker not found");return g===Nr(s(Ur("\0\0\0\0\0\0\0\0"+a+String.fromCharCode.apply(String,v.slice(-n)))))},He.SALT_LEN_HLEN=-1,He.SALT_LEN_MAX=-2,He.SALT_LEN_RECOVER=-2,on.hex2dn=function(t,e){if(void 0===e&&(e=0),"30"!==t.substr(e,2))throw new Error("malformed DN");for(var r=new Array,n=Er.getChildIdx(t,e),i=0;i<n.length;i++)r.push(on.hex2rdn(t,n[i]));return "/"+(r=r.map((function(t){return t.replace("/","\\/")}))).join("/")},on.hex2rdn=function(t,e){if(void 0===e&&(e=0),"31"!==t.substr(e,2))throw new Error("malformed RDN");for(var r=new Array,n=Er.getChildIdx(t,e),i=0;i<n.length;i++)r.push(on.hex2attrTypeValue(t,n[i]));return (r=r.map((function(t){return t.replace("+","\\+")}))).join("+")},on.hex2attrTypeValue=function(t,e){var r=Er,n=r.getV;if(void 0===e&&(e=0),"30"!==t.substr(e,2))throw new Error("malformed attribute type and value");var i=r.getChildIdx(t,e);2!==i.length||t.substr(i[0],2);var o=n(t,i[0]),s=br.asn1.ASN1Util.oidHexToInt(o);return br.asn1.x509.OID.oid2atype(s)+"="+Nr(n(t,i[1]))},on.getPublicKeyFromCertHex=function(t){var e=new on;return e.readCertHex(t),e.getPublicKey()},on.getPublicKeyFromCertPEM=function(t){var e=new on;return e.readCertPEM(t),e.getPublicKey()},on.getPublicKeyInfoPropOfCertPEM=function(t){var e,r,n=Er.getVbyList,i={};return i.algparam=null,(e=new on).readCertPEM(t),r=e.getPublicKeyHex(),i.keyhex=n(r,0,[1],"03").substr(2),i.algoid=n(r,0,[0,0],"06"),"2a8648ce3d0201"===i.algoid&&(i.algparam=n(r,0,[0,1],"06")),i},on.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"],void 0!==br&&br||(e.KJUR=br={}),void 0!==br.jws&&br.jws||(br.jws={}),br.jws.JWS=function(){var t=br.jws.JWS.isSafeJSONString;this.parseJWS=function(e,r){if(void 0===this.parsedJWS||!r&&void 0===this.parsedJWS.sigvalH){var n=e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(null==n)throw "JWS signature is not a form of 'Head.Payload.SigValue'.";var i=n[1],o=n[2],s=n[3],a=i+"."+o;if(this.parsedJWS={},this.parsedJWS.headB64U=i,this.parsedJWS.payloadB64U=o,this.parsedJWS.sigvalB64U=s,this.parsedJWS.si=a,!r){var u=Ir(s),c=je(u,16);this.parsedJWS.sigvalH=u,this.parsedJWS.sigvalBI=c;}var h=Fr(i),l=Fr(o);if(this.parsedJWS.headS=h,this.parsedJWS.payloadS=l,!t(h,this.parsedJWS,"headP"))throw "malformed JSON string for JWS Head: "+h}};},br.jws.JWS.sign=function(t,e,n,i,o){var s,a,u,c=br,h=c.jws.JWS,l=h.readSafeJSONString,f=h.isSafeJSONString,g=c.crypto,d=(g.ECDSA,g.Mac),p=g.Signature,v=JSON;if("string"!=typeof e&&"object"!=(void 0===e?"undefined":r(e)))throw "spHeader must be JSON string or object: "+e;if("object"==(void 0===e?"undefined":r(e))&&(a=e,s=v.stringify(a)),"string"==typeof e){if(!f(s=e))throw "JWS Head is not safe JSON string: "+s;a=l(s);}if(u=n,"object"==(void 0===n?"undefined":r(n))&&(u=v.stringify(n)),""!=t&&null!=t||void 0===a.alg||(t=a.alg),""!=t&&null!=t&&void 0===a.alg&&(a.alg=t,s=v.stringify(a)),t!==a.alg)throw "alg and sHeader.alg doesn't match: "+t+"!="+a.alg;var y=null;if(void 0===h.jwsalg2sigalg[t])throw "unsupported alg name: "+t;y=h.jwsalg2sigalg[t];var m=wr(s)+"."+wr(u),_="";if("Hmac"==y.substr(0,4)){if(void 0===i)throw "mac key shall be specified for HS* alg";var S=new d({alg:y,prov:"cryptojs",pass:i});S.updateString(m),_=S.doFinal();}else if(-1!=y.indexOf("withECDSA")){(w=new p({alg:y})).init(i,o),w.updateString(m);var b=w.sign();_=br.crypto.ECDSA.asn1SigToConcatSig(b);}else {var w;if("none"!=y)(w=new p({alg:y})).init(i,o),w.updateString(m),_=w.sign();}return m+"."+Rr(_)},br.jws.JWS.verify=function(t,e,n){var i,o=br,s=o.jws.JWS,a=s.readSafeJSONString,u=o.crypto,c=u.ECDSA,h=u.Mac,l=u.Signature;void 0!==r(He)&&(i=He);var f=t.split(".");if(3!==f.length)return !1;var g=f[0]+"."+f[1],d=Ir(f[2]),p=a(Fr(f[0])),v=null,y=null;if(void 0===p.alg)throw "algorithm not specified in header";if((y=(v=p.alg).substr(0,2),null!=n&&"[object Array]"===Object.prototype.toString.call(n)&&n.length>0)&&-1==(":"+n.join(":")+":").indexOf(":"+v+":"))throw "algorithm '"+v+"' not accepted in the list";if("none"!=v&&null===e)throw "key shall be specified to verify.";if("string"==typeof e&&-1!=e.indexOf("-----BEGIN ")&&(e=Zr.getKey(e)),!("RS"!=y&&"PS"!=y||e instanceof i))throw "key shall be a RSAKey obj for RS* and PS* algs";if("ES"==y&&!(e instanceof c))throw "key shall be a ECDSA obj for ES* algs";var m=null;if(void 0===s.jwsalg2sigalg[p.alg])throw "unsupported alg name: "+v;if("none"==(m=s.jwsalg2sigalg[v]))throw "not supported";if("Hmac"==m.substr(0,4)){if(void 0===e)throw "hexadecimal key shall be specified for HMAC";var _=new h({alg:m,pass:e});return _.updateString(g),d==_.doFinal()}if(-1!=m.indexOf("withECDSA")){var S,b=null;try{b=c.concatSigToASN1Sig(d);}catch(t){return !1}return (S=new l({alg:m})).init(e),S.updateString(g),S.verify(b)}return (S=new l({alg:m})).init(e),S.updateString(g),S.verify(d)},br.jws.JWS.parse=function(t){var e,r,n,i=t.split("."),o={};if(2!=i.length&&3!=i.length)throw "malformed sJWS: wrong number of '.' splitted elements";return e=i[0],r=i[1],3==i.length&&(n=i[2]),o.headerObj=br.jws.JWS.readSafeJSONString(Fr(e)),o.payloadObj=br.jws.JWS.readSafeJSONString(Fr(r)),o.headerPP=JSON.stringify(o.headerObj,null,"  "),null==o.payloadObj?o.payloadPP=Fr(r):o.payloadPP=JSON.stringify(o.payloadObj,null,"  "),void 0!==n&&(o.sigHex=Ir(n)),o},br.jws.JWS.verifyJWT=function(t,e,n){var i=br.jws,o=i.JWS,s=o.readSafeJSONString,a=o.inArray,u=o.includedArray,c=t.split("."),h=c[0],l=c[1],f=(Ir(c[2]),s(Fr(h))),g=s(Fr(l));if(void 0===f.alg)return !1;if(void 0===n.alg)throw "acceptField.alg shall be specified";if(!a(f.alg,n.alg))return !1;if(void 0!==g.iss&&"object"===r(n.iss)&&!a(g.iss,n.iss))return !1;if(void 0!==g.sub&&"object"===r(n.sub)&&!a(g.sub,n.sub))return !1;if(void 0!==g.aud&&"object"===r(n.aud))if("string"==typeof g.aud){if(!a(g.aud,n.aud))return !1}else if("object"==r(g.aud)&&!u(g.aud,n.aud))return !1;var d=i.IntDate.getNow();return void 0!==n.verifyAt&&"number"==typeof n.verifyAt&&(d=n.verifyAt),void 0!==n.gracePeriod&&"number"==typeof n.gracePeriod||(n.gracePeriod=0),!(void 0!==g.exp&&"number"==typeof g.exp&&g.exp+n.gracePeriod<d)&&(!(void 0!==g.nbf&&"number"==typeof g.nbf&&d<g.nbf-n.gracePeriod)&&(!(void 0!==g.iat&&"number"==typeof g.iat&&d<g.iat-n.gracePeriod)&&((void 0===g.jti||void 0===n.jti||g.jti===n.jti)&&!!o.verify(t,e,n.alg))))},br.jws.JWS.includedArray=function(t,e){var n=br.jws.JWS.inArray;if(null===t)return !1;if("object"!==(void 0===t?"undefined":r(t)))return !1;if("number"!=typeof t.length)return !1;for(var i=0;i<t.length;i++)if(!n(t[i],e))return !1;return !0},br.jws.JWS.inArray=function(t,e){if(null===e)return !1;if("object"!==(void 0===e?"undefined":r(e)))return !1;if("number"!=typeof e.length)return !1;for(var n=0;n<e.length;n++)if(e[n]==t)return !0;return !1},br.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none"},br.jws.JWS.isSafeJSONString=function(t,e,n){var i=null;try{return "object"!=(void 0===(i=Sr(t))?"undefined":r(i))||i.constructor===Array?0:(e&&(e[n]=i),1)}catch(t){return 0}},br.jws.JWS.readSafeJSONString=function(t){var e=null;try{return "object"!=(void 0===(e=Sr(t))?"undefined":r(e))||e.constructor===Array?null:e}catch(t){return null}},br.jws.JWS.getEncodedSignatureValueFromJWS=function(t){var e=t.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(null==e)throw "JWS signature is not a form of 'Head.Payload.SigValue'.";return e[1]},br.jws.JWS.getJWKthumbprint=function(t){if("RSA"!==t.kty&&"EC"!==t.kty&&"oct"!==t.kty)throw "unsupported algorithm for JWK Thumprint";var e="{";if("RSA"===t.kty){if("string"!=typeof t.n||"string"!=typeof t.e)throw "wrong n and e value for RSA key";e+='"e":"'+t.e+'",',e+='"kty":"'+t.kty+'",',e+='"n":"'+t.n+'"}';}else if("EC"===t.kty){if("string"!=typeof t.crv||"string"!=typeof t.x||"string"!=typeof t.y)throw "wrong crv, x and y value for EC key";e+='"crv":"'+t.crv+'",',e+='"kty":"'+t.kty+'",',e+='"x":"'+t.x+'",',e+='"y":"'+t.y+'"}';}else if("oct"===t.kty){if("string"!=typeof t.k)throw "wrong k value for oct(symmetric) key";e+='"kty":"'+t.kty+'",',e+='"k":"'+t.k+'"}';}var r=Ur(e);return Rr(br.crypto.Util.hashHex(r,"sha256"))},br.jws.IntDate={},br.jws.IntDate.get=function(t){var e=br.jws.IntDate,r=e.getNow,n=e.getZulu;if("now"==t)return r();if("now + 1hour"==t)return r()+3600;if("now + 1day"==t)return r()+86400;if("now + 1month"==t)return r()+2592e3;if("now + 1year"==t)return r()+31536e3;if(t.match(/Z$/))return n(t);if(t.match(/^[0-9]+$/))return parseInt(t);throw "unsupported format: "+t},br.jws.IntDate.getZulu=function(t){return Kr(t)},br.jws.IntDate.getNow=function(){return ~~(new Date/1e3)},br.jws.IntDate.intDate2UTCString=function(t){return new Date(1e3*t).toUTCString()},br.jws.IntDate.intDate2Zulu=function(t){var e=new Date(1e3*t);return ("0000"+e.getUTCFullYear()).slice(-4)+("00"+(e.getUTCMonth()+1)).slice(-2)+("00"+e.getUTCDate()).slice(-2)+("00"+e.getUTCHours()).slice(-2)+("00"+e.getUTCMinutes()).slice(-2)+("00"+e.getUTCSeconds()).slice(-2)+"Z"},e.SecureRandom=Oe,e.rng_seed_time=Ie,e.BigInteger=F,e.RSAKey=He;var sn=br.crypto.EDSA;e.EDSA=sn;var an=br.crypto.DSA;e.DSA=an;var un=br.crypto.Signature;e.Signature=un;var cn=br.crypto.MessageDigest;e.MessageDigest=cn;var hn=br.crypto.Mac;e.Mac=hn;var ln=br.crypto.Cipher;e.Cipher=ln,e.KEYUTIL=Zr,e.ASN1HEX=Er,e.X509=on,e.CryptoJS=y,e.b64tohex=b,e.b64toBA=w,e.stoBA=xr,e.BAtos=Ar,e.BAtohex=kr,e.stohex=Pr,e.stob64=function fn(t){return S(Pr(t))},e.stob64u=function gn(t){return Cr(S(Pr(t)))},e.b64utos=function dn(t){return Ar(w(Tr(t)))},e.b64tob64u=Cr,e.b64utob64=Tr,e.hex2b64=S,e.hextob64u=Rr,e.b64utohex=Ir,e.utf8tob64u=wr,e.b64utoutf8=Fr,e.utf8tob64=function pn(t){return S(qr(Gr(t)))},e.b64toutf8=function vn(t){return decodeURIComponent(Jr(b(t)))},e.utf8tohex=Dr,e.hextoutf8=Lr,e.hextorstr=Nr,e.rstrtohex=Ur,e.hextob64=Br,e.hextob64nl=Or,e.b64nltohex=jr,e.hextopem=Mr,e.pemtohex=Hr,e.hextoArrayBuffer=function yn(t){if(t.length%2!=0)throw "input is not even length";if(null==t.match(/^[0-9A-Fa-f]+$/))throw "input is not hexadecimal";for(var e=new ArrayBuffer(t.length/2),r=new DataView(e),n=0;n<t.length/2;n++)r.setUint8(n,parseInt(t.substr(2*n,2),16));return e},e.ArrayBuffertohex=function mn(t){for(var e="",r=new DataView(t),n=0;n<t.byteLength;n++)e+=("00"+r.getUint8(n).toString(16)).slice(-2);return e},e.zulutomsec=Vr,e.zulutosec=Kr,e.zulutodate=function _n(t){return new Date(Vr(t))},e.datetozulu=function Sn(t,e,r){var n,i=t.getUTCFullYear();if(e){if(i<1950||2049<i)throw "not proper year for UTCTime: "+i;n=(""+i).slice(-2);}else n=("000"+i).slice(-4);if(n+=("0"+(t.getUTCMonth()+1)).slice(-2),n+=("0"+t.getUTCDate()).slice(-2),n+=("0"+t.getUTCHours()).slice(-2),n+=("0"+t.getUTCMinutes()).slice(-2),n+=("0"+t.getUTCSeconds()).slice(-2),r){var o=t.getUTCMilliseconds();0!==o&&(n+="."+(o=(o=("00"+o).slice(-3)).replace(/0+$/g,"")));}return n+="Z"},e.uricmptohex=qr,e.hextouricmp=Jr,e.ipv6tohex=Wr,e.hextoipv6=zr,e.hextoip=Yr,e.iptohex=function bn(t){var e="malformed IP address";if(!(t=t.toLowerCase(t)).match(/^[0-9.]+$/)){if(t.match(/^[0-9a-f:]+$/)&&-1!==t.indexOf(":"))return Wr(t);throw e}var r=t.split(".");if(4!==r.length)throw e;var n="";try{for(var i=0;i<4;i++){n+=("0"+parseInt(r[i]).toString(16)).slice(-2);}return n}catch(t){throw e}},e.encodeURIComponentAll=Gr,e.newline_toUnix=function wn(t){return t=t.replace(/\r\n/gm,"\n")},e.newline_toDos=function Fn(t){return t=(t=t.replace(/\r\n/gm,"\n")).replace(/\n/gm,"\r\n")},e.hextoposhex=$r,e.intarystrtohex=function En(t){t=(t=(t=t.replace(/^\s*\[\s*/,"")).replace(/\s*\]\s*$/,"")).replace(/\s*/g,"");try{return t.split(/,/).map((function(t,e,r){var n=parseInt(t);if(n<0||255<n)throw "integer not in range 0-255";return ("00"+n.toString(16)).slice(-2)})).join("")}catch(t){throw "malformed integer array string: "+t}},e.strdiffidx=function t(e,r){var n=e.length;e.length>r.length&&(n=r.length);for(var i=0;i<n;i++)if(e.charCodeAt(i)!=r.charCodeAt(i))return i;return e.length!=r.length?n:-1},e.KJUR=br;var xn=br.crypto;e.crypto=xn;var An=br.asn1;e.asn1=An;var kn=br.jws;e.jws=kn;var Pn=br.lang;e.lang=Pn;}).call(this,r(28).Buffer);},function(t,e,r){(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var n=r(30),i=r(31),o=r(32);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=u.prototype:(null===t&&(t=new u(e)),t.length=e),t}function u(t,e,r){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return l(this,t)}return c(this,t,e,r)}function c(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return "undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function i(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?(t=e).__proto__=u.prototype:t=f(t,e);return t}(t,e,r,n):"string"==typeof e?function s(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!u.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|d(e,r),i=(t=a(t,n)).write(e,r);i!==n&&(t=t.slice(0,i));return t}(t,e,r):function c(t,e){if(u.isBuffer(e)){var r=0|g(e.length);return 0===(t=a(t,r)).length||e.copy(t,0,0,r),t}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return "number"!=typeof e.length||function n(t){return t!=t}(e.length)?a(t,0):f(t,e);if("Buffer"===e.type&&o(e.data))return f(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,e){if(h(e),t=a(t,e<0?0:0|g(e)),!u.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function f(t,e){var r=e.length<0?0:0|g(e.length);t=a(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function g(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function d(t,e){if(u.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return K(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return q(t).length;default:if(n)return K(t).length;e=(""+e).toLowerCase(),n=!0;}}function p(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return "";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return "";if((r>>>=0)<=(e>>>=0))return "";for(t||(t="utf8");;)switch(t){case"hex":return I(this,e,r);case"utf8":case"utf-8":return A(this,e,r);case"ascii":return T(this,e,r);case"latin1":case"binary":return R(this,e,r);case"base64":return x(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return D(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function v(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}function y(t,e,r,n,i){if(0===t.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return -1;r=t.length-1;}else if(r<0){if(!i)return -1;r=0;}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:m(t,e,r,n,i);if("number"==typeof e)return e&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):m(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function m(t,e,r,n,i){var o,s=1,a=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return -1;s=2,a/=2,u/=2,r/=2;}function c(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){var h=-1;for(o=r;o<a;o++)if(c(t,o)===c(e,-1===h?0:o-h)){if(-1===h&&(h=o),o-h+1===u)return h*s}else -1!==h&&(o-=o-h),h=-1;}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var l=!0,f=0;f<u;f++)if(c(t,o+f)!==c(e,f)){l=!1;break}if(l)return o}return -1}function _(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[r+s]=a;}return s}function S(t,e,r,n){return J(K(e,t.length-r),t,r,n)}function b(t,e,r,n){return J(function i(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function w(t,e,r,n){return b(t,e,r,n)}function F(t,e,r,n){return J(q(e),t,r,n)}function E(t,e,r,n){return J(function i(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)n=(r=t.charCodeAt(s))>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function x(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function A(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,s,a,u,c=t[i],h=null,l=c>239?4:c>223?3:c>191?2:1;if(i+l<=r)switch(l){case 1:c<128&&(h=c);break;case 2:128==(192&(o=t[i+1]))&&(u=(31&c)<<6|63&o)>127&&(h=u);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(u=(15&c)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(h=u);break;case 4:o=t[i+1],s=t[i+2],a=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(h=u);}null===h?(h=65533,l=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=l;}return function f(t){var e=t.length;if(e<=C)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=C));return r}(n)}e.Buffer=u,e.SlowBuffer=function k(t){+t!=t&&(t=0);return u.alloc(+t)},e.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function P(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return !1}}(),e.kMaxLength=s(),u.poolSize=8192,u._augment=function(t){return t.__proto__=u.prototype,t},u.from=function(t,e,r){return c(null,t,e,r)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(t,e,r){return function n(t,e,r,i){return h(e),e<=0?a(t,e):void 0!==r?"string"==typeof i?a(t,e).fill(r,i):a(t,e).fill(r):a(t,e)}(null,t,e,r)},u.allocUnsafe=function(t){return l(null,t)},u.allocUnsafeSlow=function(t){return l(null,t)},u.isBuffer=function t(e){return !(null==e||!e._isBuffer)},u.compare=function t(e,r){if(!u.isBuffer(e)||!u.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(e===r)return 0;for(var n=e.length,i=r.length,o=0,s=Math.min(n,i);o<s;++o)if(e[o]!==r[o]){n=e[o],i=r[o];break}return n<i?-1:i<n?1:0},u.isEncoding=function t(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},u.concat=function t(e,r){if(!o(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return u.alloc(0);var n;if(void 0===r)for(r=0,n=0;n<e.length;++n)r+=e[n].length;var i=u.allocUnsafe(r),s=0;for(n=0;n<e.length;++n){var a=e[n];if(!u.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(i,s),s+=a.length;}return i},u.byteLength=d,u.prototype._isBuffer=!0,u.prototype.swap16=function t(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<e;r+=2)v(this,r,r+1);return this},u.prototype.swap32=function t(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<e;r+=4)v(this,r,r+3),v(this,r+1,r+2);return this},u.prototype.swap64=function t(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<e;r+=8)v(this,r,r+7),v(this,r+1,r+6),v(this,r+2,r+5),v(this,r+3,r+4);return this},u.prototype.toString=function t(){var e=0|this.length;return 0===e?"":0===arguments.length?A(this,0,e):p.apply(this,arguments)},u.prototype.equals=function t(e){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===u.compare(this,e)},u.prototype.inspect=function t(){var r="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(r=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(r+=" ... ")),"<Buffer "+r+">"},u.prototype.compare=function t(e,r,n,i,o){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===n&&(n=e?e.length:0),void 0===i&&(i=0),void 0===o&&(o=this.length),r<0||n>e.length||i<0||o>this.length)throw new RangeError("out of range index");if(i>=o&&r>=n)return 0;if(i>=o)return -1;if(r>=n)return 1;if(this===e)return 0;for(var s=(o>>>=0)-(i>>>=0),a=(n>>>=0)-(r>>>=0),c=Math.min(s,a),h=this.slice(i,o),l=e.slice(r,n),f=0;f<c;++f)if(h[f]!==l[f]){s=h[f],a=l[f];break}return s<a?-1:a<s?1:0},u.prototype.includes=function t(e,r,n){return -1!==this.indexOf(e,r,n)},u.prototype.indexOf=function t(e,r,n){return y(this,e,r,n,!0)},u.prototype.lastIndexOf=function t(e,r,n){return y(this,e,r,n,!1)},u.prototype.write=function t(e,r,n,i){if(void 0===r)i="utf8",n=this.length,r=0;else if(void 0===n&&"string"==typeof r)i=r,n=this.length,r=0;else {if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(n)?(n|=0,void 0===i&&(i="utf8")):(i=n,n=void 0);}var o=this.length-r;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var s=!1;;)switch(i){case"hex":return _(this,e,r,n);case"utf8":case"utf-8":return S(this,e,r,n);case"ascii":return b(this,e,r,n);case"latin1":case"binary":return w(this,e,r,n);case"base64":return F(this,e,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,e,r,n);default:if(s)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),s=!0;}},u.prototype.toJSON=function t(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var C=4096;function T(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function I(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=V(t[o]);return i}function D(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function L(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function N(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function U(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i);}function B(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255;}function O(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function j(t,e,r,n,o){return o||O(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function M(t,e,r,n,o){return o||O(t,0,r,8),i.write(t,e,r,n,52,8),r+8}u.prototype.slice=function t(e,r){var n,i=this.length;if((e=~~e)<0?(e+=i)<0&&(e=0):e>i&&(e=i),(r=void 0===r?i:~~r)<0?(r+=i)<0&&(r=0):r>i&&(r=i),r<e&&(r=e),u.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,r)).__proto__=u.prototype;else {var o=r-e;n=new u(o,void 0);for(var s=0;s<o;++s)n[s]=this[s+e];}return n},u.prototype.readUIntLE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e],o=1,s=0;++s<r&&(o*=256);)i+=this[e+s]*o;return i},u.prototype.readUIntBE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e+--r],o=1;r>0&&(o*=256);)i+=this[e+--r]*o;return i},u.prototype.readUInt8=function t(e,r){return r||L(e,1,this.length),this[e]},u.prototype.readUInt16LE=function t(e,r){return r||L(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUInt16BE=function t(e,r){return r||L(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUInt32LE=function t(e,r){return r||L(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},u.prototype.readUInt32BE=function t(e,r){return r||L(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readIntLE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e],o=1,s=0;++s<r&&(o*=256);)i+=this[e+s]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*r)),i},u.prototype.readIntBE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=r,o=1,s=this[e+--i];i>0&&(o*=256);)s+=this[e+--i]*o;return s>=(o*=128)&&(s-=Math.pow(2,8*r)),s},u.prototype.readInt8=function t(e,r){return r||L(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},u.prototype.readInt16LE=function t(e,r){r||L(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt16BE=function t(e,r){r||L(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt32LE=function t(e,r){return r||L(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function t(e,r){return r||L(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readFloatLE=function t(e,r){return r||L(e,4,this.length),i.read(this,e,!0,23,4)},u.prototype.readFloatBE=function t(e,r){return r||L(e,4,this.length),i.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function t(e,r){return r||L(e,8,this.length),i.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function t(e,r){return r||L(e,8,this.length),i.read(this,e,!1,52,8)},u.prototype.writeUIntLE=function t(e,r,n,i){(e=+e,r|=0,n|=0,i)||N(this,e,r,n,Math.pow(2,8*n)-1,0);var o=1,s=0;for(this[r]=255&e;++s<n&&(o*=256);)this[r+s]=e/o&255;return r+n},u.prototype.writeUIntBE=function t(e,r,n,i){(e=+e,r|=0,n|=0,i)||N(this,e,r,n,Math.pow(2,8*n)-1,0);var o=n-1,s=1;for(this[r+o]=255&e;--o>=0&&(s*=256);)this[r+o]=e/s&255;return r+n},u.prototype.writeUInt8=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,1,255,0),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[r]=255&e,r+1},u.prototype.writeUInt16LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8):U(this,e,r,!0),r+2},u.prototype.writeUInt16BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=255&e):U(this,e,r,!1),r+2},u.prototype.writeUInt32LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[r+3]=e>>>24,this[r+2]=e>>>16,this[r+1]=e>>>8,this[r]=255&e):B(this,e,r,!0),r+4},u.prototype.writeUInt32BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=255&e):B(this,e,r,!1),r+4},u.prototype.writeIntLE=function t(e,r,n,i){if(e=+e,r|=0,!i){var o=Math.pow(2,8*n-1);N(this,e,r,n,o-1,-o);}var s=0,a=1,u=0;for(this[r]=255&e;++s<n&&(a*=256);)e<0&&0===u&&0!==this[r+s-1]&&(u=1),this[r+s]=(e/a>>0)-u&255;return r+n},u.prototype.writeIntBE=function t(e,r,n,i){if(e=+e,r|=0,!i){var o=Math.pow(2,8*n-1);N(this,e,r,n,o-1,-o);}var s=n-1,a=1,u=0;for(this[r+s]=255&e;--s>=0&&(a*=256);)e<0&&0===u&&0!==this[r+s+1]&&(u=1),this[r+s]=(e/a>>0)-u&255;return r+n},u.prototype.writeInt8=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,1,127,-128),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[r]=255&e,r+1},u.prototype.writeInt16LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8):U(this,e,r,!0),r+2},u.prototype.writeInt16BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=255&e):U(this,e,r,!1),r+2},u.prototype.writeInt32LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8,this[r+2]=e>>>16,this[r+3]=e>>>24):B(this,e,r,!0),r+4},u.prototype.writeInt32BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=255&e):B(this,e,r,!1),r+4},u.prototype.writeFloatLE=function t(e,r,n){return j(this,e,r,!0,n)},u.prototype.writeFloatBE=function t(e,r,n){return j(this,e,r,!1,n)},u.prototype.writeDoubleLE=function t(e,r,n){return M(this,e,r,!0,n)},u.prototype.writeDoubleBE=function t(e,r,n){return M(this,e,r,!1,n)},u.prototype.copy=function t(e,r,n,i){if(n||(n=0),i||0===i||(i=this.length),r>=e.length&&(r=e.length),r||(r=0),i>0&&i<n&&(i=n),i===n)return 0;if(0===e.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-r<i-n&&(i=e.length-r+n);var o,s=i-n;if(this===e&&n<r&&r<i)for(o=s-1;o>=0;--o)e[o+r]=this[o+n];else if(s<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<s;++o)e[o+r]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+s),r);return s},u.prototype.fill=function t(e,r,n,i){if("string"==typeof e){if("string"==typeof r?(i=r,r=0,n=this.length):"string"==typeof n&&(i=n,n=this.length),1===e.length){var o=e.charCodeAt(0);o<256&&(e=o);}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!u.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else "number"==typeof e&&(e&=255);if(r<0||this.length<r||this.length<n)throw new RangeError("Out of range index");if(n<=r)return this;var s;if(r>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(s=r;s<n;++s)this[s]=e;else {var a=u.isBuffer(e)?e:K(new u(e,i).toString()),c=a.length;for(s=0;s<n-r;++s)this[s+r]=a[s%c];}return this};var H=/[^+\/0-9A-Za-z-_]/g;function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function K(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320);}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r);}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128);}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128);}else {if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);}}return o}function q(t){return n.toByteArray(function e(t){if((t=function e(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(H,"")).length<2)return "";for(;t.length%4!=0;)t+="=";return t}(t))}function J(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}}).call(this,r(29));},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")();}catch(t){"object"==typeof window&&(r=window);}t.exports=r;},function(t,e,r){e.byteLength=function n(t){var e=f(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function i(t){var e,r,n=f(t),i=n[0],o=n[1],s=new u(function c(t,e,r){return 3*(e+r)/4-r}(0,i,o)),h=0,l=o>0?i-4:i;for(r=0;r<l;r+=4)e=a[t.charCodeAt(r)]<<18|a[t.charCodeAt(r+1)]<<12|a[t.charCodeAt(r+2)]<<6|a[t.charCodeAt(r+3)],s[h++]=e>>16&255,s[h++]=e>>8&255,s[h++]=255&e;2===o&&(e=a[t.charCodeAt(r)]<<2|a[t.charCodeAt(r+1)]>>4,s[h++]=255&e);1===o&&(e=a[t.charCodeAt(r)]<<10|a[t.charCodeAt(r+1)]<<4|a[t.charCodeAt(r+2)]>>2,s[h++]=e>>8&255,s[h++]=255&e);return s},e.fromByteArray=function o(t){for(var e,r=t.length,n=r%3,i=[],o=16383,a=0,u=r-n;a<u;a+=o)i.push(g(t,a,a+o>u?u:a+o));1===n?(e=t[r-1],i.push(s[e>>2]+s[e<<4&63]+"==")):2===n&&(e=(t[r-2]<<8)+t[r-1],i.push(s[e>>10]+s[e>>4&63]+s[e<<2&63]+"="));return i.join("")};for(var s=[],a=[],u="undefined"!=typeof Uint8Array?Uint8Array:Array,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=0,l=c.length;h<l;++h)s[h]=c[h],a[c.charCodeAt(h)]=h;function f(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return -1===r&&(r=e),[r,r===e?0:4-r%4]}function g(t,e,r){for(var n,i,o=[],a=e;a<r;a+=3)n=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),o.push(s[(i=n)>>18&63]+s[i>>12&63]+s[i>>6&63]+s[63&i]);return o.join("")}a["-".charCodeAt(0)]=62,a["_".charCodeAt(0)]=63;},function(t,e){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
e.read=function(t,e,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,h=-7,l=r?i-1:0,f=r?-1:1,g=t[e+l];for(l+=f,o=g&(1<<-h)-1,g>>=-h,h+=a;h>0;o=256*o+t[e+l],l+=f,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+t[e+l],l+=f,h-=8);if(0===o)o=1-c;else {if(o===u)return s?NaN:1/0*(g?-1:1);s+=Math.pow(2,n),o-=c;}return (g?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,l=h>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,g=n?0:o-1,d=n?1:-1,p=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+l>=1?f/u:f*Math.pow(2,1-l))*u>=2&&(s++,u/=2),s+l>=h?(a=0,s=h):s+l>=1?(a=(e*u-1)*Math.pow(2,i),s+=l):(a=e*Math.pow(2,l-1)*Math.pow(2,i),s=0));i>=8;t[r+g]=255&a,g+=d,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;t[r+g]=255&s,g+=d,s/=256,c-=8);t[r+g-d]|=128*p;};},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return "[object Array]"==r.call(t)};},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function n(t){var e=t.jws,r=t.KeyUtil,n=t.X509,o=t.crypto,s=t.hextob64u,a=t.b64tohex,u=t.AllowedSigningAlgs;return function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.parseJwt=function t(r){i.Log.debug("JoseUtil.parseJwt");try{var n=e.JWS.parse(r);return {header:n.headerObj,payload:n.payloadObj}}catch(t){i.Log.error(t);}},t.validateJwt=function e(o,s,u,c,h,l,f){i.Log.debug("JoseUtil.validateJwt");try{if("RSA"===s.kty)if(s.e&&s.n)s=r.getKey(s);else {if(!s.x5c||!s.x5c.length)return i.Log.error("JoseUtil.validateJwt: RSA key missing key material",s),Promise.reject(new Error("RSA key missing key material"));var g=a(s.x5c[0]);s=n.getPublicKeyFromCertHex(g);}else {if("EC"!==s.kty)return i.Log.error("JoseUtil.validateJwt: Unsupported key type",s&&s.kty),Promise.reject(new Error(s.kty));if(!(s.crv&&s.x&&s.y))return i.Log.error("JoseUtil.validateJwt: EC key missing key material",s),Promise.reject(new Error("EC key missing key material"));s=r.getKey(s);}return t._validateJwt(o,s,u,c,h,l,f)}catch(t){return i.Log.error(t&&t.message||t),Promise.reject("JWT validation failed")}},t.validateJwtAttributes=function e(r,n,o,s,a,u){s||(s=0),a||(a=parseInt(Date.now()/1e3));var c=t.parseJwt(r).payload;if(!c.iss)return i.Log.error("JoseUtil._validateJwt: issuer was not provided"),Promise.reject(new Error("issuer was not provided"));if(c.iss!==n)return i.Log.error("JoseUtil._validateJwt: Invalid issuer in token",c.iss),Promise.reject(new Error("Invalid issuer in token: "+c.iss));if(!c.aud)return i.Log.error("JoseUtil._validateJwt: aud was not provided"),Promise.reject(new Error("aud was not provided"));if(!(c.aud===o||Array.isArray(c.aud)&&c.aud.indexOf(o)>=0))return i.Log.error("JoseUtil._validateJwt: Invalid audience in token",c.aud),Promise.reject(new Error("Invalid audience in token: "+c.aud));if(c.azp&&c.azp!==o)return i.Log.error("JoseUtil._validateJwt: Invalid azp in token",c.azp),Promise.reject(new Error("Invalid azp in token: "+c.azp));if(!u){var h=a+s,l=a-s;if(!c.iat)return i.Log.error("JoseUtil._validateJwt: iat was not provided"),Promise.reject(new Error("iat was not provided"));if(h<c.iat)return i.Log.error("JoseUtil._validateJwt: iat is in the future",c.iat),Promise.reject(new Error("iat is in the future: "+c.iat));if(c.nbf&&h<c.nbf)return i.Log.error("JoseUtil._validateJwt: nbf is in the future",c.nbf),Promise.reject(new Error("nbf is in the future: "+c.nbf));if(!c.exp)return i.Log.error("JoseUtil._validateJwt: exp was not provided"),Promise.reject(new Error("exp was not provided"));if(c.exp<l)return i.Log.error("JoseUtil._validateJwt: exp is in the past",c.exp),Promise.reject(new Error("exp is in the past:"+c.exp))}return Promise.resolve(c)},t._validateJwt=function r(n,o,s,a,c,h,l){return t.validateJwtAttributes(n,s,a,c,h,l).then((function(t){try{return e.JWS.verify(n,o,u)?t:(i.Log.error("JoseUtil._validateJwt: signature validation failed"),Promise.reject(new Error("signature validation failed")))}catch(t){return i.Log.error(t&&t.message||t),Promise.reject(new Error("signature validation failed"))}}))},t.hashString=function t(e,r){try{return o.Util.hashString(e,r)}catch(t){i.Log.error(t);}},t.hexToBase64Url=function t(e){try{return s(e)}catch(t){i.Log.error(t);}},t}()};var i=r(0);t.exports=e.default;},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SigninResponse=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(3);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.SigninResponse=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#";o(this,t);var n=i.UrlUtility.parseUrlFragment(e,r);this.error=n.error,this.error_description=n.error_description,this.error_uri=n.error_uri,this.code=n.code,this.state=n.state,this.id_token=n.id_token,this.session_state=n.session_state,this.access_token=n.access_token,this.token_type=n.token_type,this.scope=n.scope,this.profile=void 0,this.expires_in=n.expires_in;}return n(t,[{key:"expires_in",get:function t(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}},set:function t(e){var r=parseInt(e);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r;}}},{key:"expired",get:function t(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function t(){return (this.scope||"").split(" ")}},{key:"isOpenIdConnect",get:function t(){return this.scopes.indexOf("openid")>=0||!!this.id_token}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SignoutRequest=void 0;var n=r(0),i=r(3),o=r(9);e.SignoutRequest=function t(e){var r=e.url,s=e.id_token_hint,a=e.post_logout_redirect_uri,u=e.data,c=e.extraQueryParams,h=e.request_type;if(function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!r)throw n.Log.error("SignoutRequest.ctor: No url passed"),new Error("url");for(var f in s&&(r=i.UrlUtility.addQueryParam(r,"id_token_hint",s)),a&&(r=i.UrlUtility.addQueryParam(r,"post_logout_redirect_uri",a),u&&(this.state=new o.State({data:u,request_type:h}),r=i.UrlUtility.addQueryParam(r,"state",this.state.id))),c)r=i.UrlUtility.addQueryParam(r,f,c[f]);this.url=r;};},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SignoutResponse=void 0;var n=r(3);e.SignoutResponse=function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=n.UrlUtility.parseUrlFragment(e,"?");this.error=i.error,this.error_description=i.error_description,this.error_uri=i.error_uri,this.state=i.state;};},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.InMemoryWebStorage=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.InMemoryWebStorage=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this._data={};}return t.prototype.getItem=function t(e){return i.Log.debug("InMemoryWebStorage.getItem",e),this._data[e]},t.prototype.setItem=function t(e,r){i.Log.debug("InMemoryWebStorage.setItem",e),this._data[e]=r;},t.prototype.removeItem=function t(e){i.Log.debug("InMemoryWebStorage.removeItem",e),delete this._data[e];},t.prototype.key=function t(e){return Object.getOwnPropertyNames(this._data)[e]},n(t,[{key:"length",get:function t(){return Object.getOwnPropertyNames(this._data).length}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.UserManager=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(10),s=r(39),a=r(15),u=r(45),c=r(47),h=r(18),l=r(8),f=r(20),g=r(11),d=r(4);function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}e.UserManager=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.SilentRenewService,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.SessionMonitor,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f.TokenRevocationClient,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:g.TokenClient,y=arguments.length>5&&void 0!==arguments[5]?arguments[5]:d.JoseUtil;p(this,e),r instanceof s.UserManagerSettings||(r=new s.UserManagerSettings(r));var m=v(this,t.call(this,r));return m._events=new u.UserManagerEvents(r),m._silentRenewService=new n(m),m.settings.automaticSilentRenew&&(i.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew"),m.startSilentRenew()),m.settings.monitorSession&&(i.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor"),m._sessionMonitor=new o(m)),m._tokenRevocationClient=new a(m._settings),m._tokenClient=new l(m._settings),m._joseUtil=y,m}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),e.prototype.getUser=function t(){var e=this;return this._loadUser().then((function(t){return t?(i.Log.info("UserManager.getUser: user loaded"),e._events.load(t,!1),t):(i.Log.info("UserManager.getUser: user not found in storage"),null)}))},e.prototype.removeUser=function t(){var e=this;return this.storeUser(null).then((function(){i.Log.info("UserManager.removeUser: user removed from storage"),e._events.unload();}))},e.prototype.signinRedirect=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="si:r";var r={useReplaceToNavigate:e.useReplaceToNavigate};return this._signinStart(e,this._redirectNavigator,r).then((function(){i.Log.info("UserManager.signinRedirect: successful");}))},e.prototype.signinRedirectCallback=function t(e){return this._signinEnd(e||this._redirectNavigator.url).then((function(t){return t.profile&&t.profile.sub?i.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinRedirectCallback: no sub"),t}))},e.prototype.signinPopup=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="si:p";var r=e.redirect_uri||this.settings.popup_redirect_uri||this.settings.redirect_uri;return r?(e.redirect_uri=r,e.display="popup",this._signin(e,this._popupNavigator,{startUrl:r,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinPopup: no sub")),t}))):(i.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured"),Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured")))},e.prototype.signinPopupCallback=function t(e){return this._signinCallback(e,this._popupNavigator).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinPopupCallback: no sub")),t})).catch((function(t){i.Log.error(t.message);}))},e.prototype.signinSilent=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r=Object.assign({},r),this._loadUser().then((function(t){return t&&t.refresh_token?(r.refresh_token=t.refresh_token,e._useRefreshToken(r)):(r.request_type="si:s",r.id_token_hint=r.id_token_hint||e.settings.includeIdTokenInSilentRenew&&t&&t.id_token,t&&e._settings.validateSubOnSilentRenew&&(i.Log.debug("UserManager.signinSilent, subject prior to silent renew: ",t.profile.sub),r.current_sub=t.profile.sub),e._signinSilentIframe(r))}))},e.prototype._useRefreshToken=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._tokenClient.exchangeRefreshToken(r).then((function(t){return t?t.access_token?e._loadUser().then((function(r){if(r){var n=Promise.resolve();return t.id_token&&(n=e._validateIdTokenFromTokenRefreshToken(r.profile,t.id_token)),n.then((function(){return i.Log.debug("UserManager._useRefreshToken: refresh token response success"),r.id_token=t.id_token||r.id_token,r.access_token=t.access_token,r.refresh_token=t.refresh_token||r.refresh_token,r.expires_in=t.expires_in,e.storeUser(r).then((function(){return e._events.load(r),r}))}))}return null})):(i.Log.error("UserManager._useRefreshToken: No access token returned from token endpoint"),Promise.reject("No access token returned from token endpoint")):(i.Log.error("UserManager._useRefreshToken: No response returned from token endpoint"),Promise.reject("No response returned from token endpoint"))}))},e.prototype._validateIdTokenFromTokenRefreshToken=function t(e,r){var n=this;return this._metadataService.getIssuer().then((function(t){return n.settings.getEpochTime().then((function(o){return n._joseUtil.validateJwtAttributes(r,t,n._settings.client_id,n._settings.clockSkew,o).then((function(t){return t?t.sub!==e.sub?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub"),Promise.reject(new Error("sub in id_token does not match current sub"))):t.auth_time&&t.auth_time!==e.auth_time?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time"),Promise.reject(new Error("auth_time in id_token does not match original auth_time"))):t.azp&&t.azp!==e.azp?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp"),Promise.reject(new Error("azp in id_token does not match original azp"))):!t.azp&&e.azp?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token"),Promise.reject(new Error("azp not in id_token, but present in original id_token"))):void 0:(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token"),Promise.reject(new Error("Failed to validate id_token")))}))}))}))},e.prototype._signinSilentIframe=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.redirect_uri||this.settings.silent_redirect_uri||this.settings.redirect_uri;return r?(e.redirect_uri=r,e.prompt=e.prompt||"none",this._signin(e,this._iframeNavigator,{startUrl:r,silentRequestTimeout:e.silentRequestTimeout||this.settings.silentRequestTimeout}).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinSilent: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinSilent: no sub")),t}))):(i.Log.error("UserManager.signinSilent: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},e.prototype.signinSilentCallback=function t(e){return this._signinCallback(e,this._iframeNavigator).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinSilentCallback: no sub")),t}))},e.prototype.signinCallback=function t(e){var r=this;return this.readSigninResponseState(e).then((function(t){var n=t.state;t.response;return "si:r"===n.request_type?r.signinRedirectCallback(e):"si:p"===n.request_type?r.signinPopupCallback(e):"si:s"===n.request_type?r.signinSilentCallback(e):Promise.reject(new Error("invalid response_type in state"))}))},e.prototype.signoutCallback=function t(e,r){var n=this;return this.readSignoutResponseState(e).then((function(t){var i=t.state,o=t.response;return i?"so:r"===i.request_type?n.signoutRedirectCallback(e):"so:p"===i.request_type?n.signoutPopupCallback(e,r):Promise.reject(new Error("invalid response_type in state")):o}))},e.prototype.querySessionStatus=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).request_type="si:s";var n=r.redirect_uri||this.settings.silent_redirect_uri||this.settings.redirect_uri;return n?(r.redirect_uri=n,r.prompt="none",r.response_type=r.response_type||this.settings.query_status_response_type,r.scope=r.scope||"openid",r.skipUserInfo=!0,this._signinStart(r,this._iframeNavigator,{startUrl:n,silentRequestTimeout:r.silentRequestTimeout||this.settings.silentRequestTimeout}).then((function(t){return e.processSigninResponse(t.url).then((function(t){if(i.Log.debug("UserManager.querySessionStatus: got signin response"),t.session_state&&t.profile.sub)return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ",t.profile.sub),{session_state:t.session_state,sub:t.profile.sub,sid:t.profile.sid};i.Log.info("querySessionStatus successful, user not authenticated");})).catch((function(t){if(t.session_state&&e.settings.monitorAnonymousSession&&("login_required"==t.message||"consent_required"==t.message||"interaction_required"==t.message||"account_selection_required"==t.message))return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user"),{session_state:t.session_state};throw t}))}))):(i.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},e.prototype._signin=function t(e,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signinStart(e,r,i).then((function(t){return n._signinEnd(t.url,e)}))},e.prototype._signinStart=function t(e,r){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.prepare(o).then((function(t){return i.Log.debug("UserManager._signinStart: got navigator window handle"),n.createSigninRequest(e).then((function(e){return i.Log.debug("UserManager._signinStart: got signin request"),o.url=e.url,o.id=e.state.id,t.navigate(o)})).catch((function(e){throw t.close&&(i.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window"),t.close()),e}))}))},e.prototype._signinEnd=function t(e){var r=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.processSigninResponse(e).then((function(t){i.Log.debug("UserManager._signinEnd: got signin response");var e=new a.User(t);if(n.current_sub){if(n.current_sub!==e.profile.sub)return i.Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ",e.profile.sub),Promise.reject(new Error("login_required"));i.Log.debug("UserManager._signinEnd: current user matches user returned from signin");}return r.storeUser(e).then((function(){return i.Log.debug("UserManager._signinEnd: user stored"),r._events.load(e),e}))}))},e.prototype._signinCallback=function t(e,r){i.Log.debug("UserManager._signinCallback");var n="query"===this._settings.response_mode||!this._settings.response_mode&&l.SigninRequest.isCode(this._settings.response_type)?"?":"#";return r.callback(e,void 0,n)},e.prototype.signoutRedirect=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="so:r";var r=e.post_logout_redirect_uri||this.settings.post_logout_redirect_uri;r&&(e.post_logout_redirect_uri=r);var n={useReplaceToNavigate:e.useReplaceToNavigate};return this._signoutStart(e,this._redirectNavigator,n).then((function(){i.Log.info("UserManager.signoutRedirect: successful");}))},e.prototype.signoutRedirectCallback=function t(e){return this._signoutEnd(e||this._redirectNavigator.url).then((function(t){return i.Log.info("UserManager.signoutRedirectCallback: successful"),t}))},e.prototype.signoutPopup=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="so:p";var r=e.post_logout_redirect_uri||this.settings.popup_post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return e.post_logout_redirect_uri=r,e.display="popup",e.post_logout_redirect_uri&&(e.state=e.state||{}),this._signout(e,this._popupNavigator,{startUrl:r,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then((function(){i.Log.info("UserManager.signoutPopup: successful");}))},e.prototype.signoutPopupCallback=function t(e,r){void 0===r&&"boolean"==typeof e&&(r=e,e=null);return this._popupNavigator.callback(e,r,"?").then((function(){i.Log.info("UserManager.signoutPopupCallback: successful");}))},e.prototype._signout=function t(e,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signoutStart(e,r,i).then((function(t){return n._signoutEnd(t.url)}))},e.prototype._signoutStart=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=this,n=arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.prepare(o).then((function(t){return i.Log.debug("UserManager._signoutStart: got navigator window handle"),r._loadUser().then((function(n){return i.Log.debug("UserManager._signoutStart: loaded current user from storage"),(r._settings.revokeAccessTokenOnSignout?r._revokeInternal(n):Promise.resolve()).then((function(){var s=e.id_token_hint||n&&n.id_token;return s&&(i.Log.debug("UserManager._signoutStart: Setting id_token into signout request"),e.id_token_hint=s),r.removeUser().then((function(){return i.Log.debug("UserManager._signoutStart: user removed, creating signout request"),r.createSignoutRequest(e).then((function(e){return i.Log.debug("UserManager._signoutStart: got signout request"),o.url=e.url,e.state&&(o.id=e.state.id),t.navigate(o)}))}))}))})).catch((function(e){throw t.close&&(i.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window"),t.close()),e}))}))},e.prototype._signoutEnd=function t(e){return this.processSignoutResponse(e).then((function(t){return i.Log.debug("UserManager._signoutEnd: got signout response"),t}))},e.prototype.revokeAccessToken=function t(){var e=this;return this._loadUser().then((function(t){return e._revokeInternal(t,!0).then((function(r){if(r)return i.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing"),t.access_token=null,t.refresh_token=null,t.expires_at=null,t.token_type=null,e.storeUser(t).then((function(){i.Log.debug("UserManager.revokeAccessToken: user stored"),e._events.load(t);}))}))})).then((function(){i.Log.info("UserManager.revokeAccessToken: access token revoked successfully");}))},e.prototype._revokeInternal=function t(e,r){var n=this;if(e){var o=e.access_token,s=e.refresh_token;return this._revokeAccessTokenInternal(o,r).then((function(t){return n._revokeRefreshTokenInternal(s,r).then((function(e){return t||e||i.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format"),t||e}))}))}return Promise.resolve(!1)},e.prototype._revokeAccessTokenInternal=function t(e,r){return !e||e.indexOf(".")>=0?Promise.resolve(!1):this._tokenRevocationClient.revoke(e,r).then((function(){return !0}))},e.prototype._revokeRefreshTokenInternal=function t(e,r){return e?this._tokenRevocationClient.revoke(e,r,"refresh_token").then((function(){return !0})):Promise.resolve(!1)},e.prototype.startSilentRenew=function t(){this._silentRenewService.start();},e.prototype.stopSilentRenew=function t(){this._silentRenewService.stop();},e.prototype._loadUser=function t(){return this._userStore.get(this._userStoreKey).then((function(t){return t?(i.Log.debug("UserManager._loadUser: user storageString loaded"),a.User.fromStorageString(t)):(i.Log.debug("UserManager._loadUser: no user storageString"),null)}))},e.prototype.storeUser=function t(e){if(e){i.Log.debug("UserManager.storeUser: storing user");var r=e.toStorageString();return this._userStore.set(this._userStoreKey,r)}return i.Log.debug("storeUser.storeUser: removing user"),this._userStore.remove(this._userStoreKey)},n(e,[{key:"_redirectNavigator",get:function t(){return this.settings.redirectNavigator}},{key:"_popupNavigator",get:function t(){return this.settings.popupNavigator}},{key:"_iframeNavigator",get:function t(){return this.settings.iframeNavigator}},{key:"_userStore",get:function t(){return this.settings.userStore}},{key:"events",get:function t(){return this._events}},{key:"_userStoreKey",get:function t(){return "user:"+this.settings.authority+":"+this.settings.client_id}}]),e}(o.OidcClient);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.UserManagerSettings=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=(r(0),r(5)),o=r(40),s=r(41),a=r(43),u=r(6),c=r(1),h=r(8);function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}e.UserManagerSettings=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.popup_redirect_uri,i=r.popup_post_logout_redirect_uri,g=r.popupWindowFeatures,d=r.popupWindowTarget,p=r.silent_redirect_uri,v=r.silentRequestTimeout,y=r.automaticSilentRenew,m=void 0!==y&&y,_=r.validateSubOnSilentRenew,S=void 0!==_&&_,b=r.includeIdTokenInSilentRenew,w=void 0===b||b,F=r.monitorSession,E=void 0===F||F,x=r.monitorAnonymousSession,A=void 0!==x&&x,k=r.checkSessionInterval,P=void 0===k?2e3:k,C=r.stopCheckSessionOnError,T=void 0===C||C,R=r.query_status_response_type,I=r.revokeAccessTokenOnSignout,D=void 0!==I&&I,L=r.accessTokenExpiringNotificationTime,N=void 0===L?60:L,U=r.redirectNavigator,B=void 0===U?new o.RedirectNavigator:U,O=r.popupNavigator,j=void 0===O?new s.PopupNavigator:O,M=r.iframeNavigator,H=void 0===M?new a.IFrameNavigator:M,V=r.userStore,K=void 0===V?new u.WebStorageStateStore({store:c.Global.sessionStorage}):V;l(this,e);var q=f(this,t.call(this,arguments[0]));return q._popup_redirect_uri=n,q._popup_post_logout_redirect_uri=i,q._popupWindowFeatures=g,q._popupWindowTarget=d,q._silent_redirect_uri=p,q._silentRequestTimeout=v,q._automaticSilentRenew=m,q._validateSubOnSilentRenew=S,q._includeIdTokenInSilentRenew=w,q._accessTokenExpiringNotificationTime=N,q._monitorSession=E,q._monitorAnonymousSession=A,q._checkSessionInterval=P,q._stopCheckSessionOnError=T,R?q._query_status_response_type=R:arguments[0]&&arguments[0].response_type?q._query_status_response_type=h.SigninRequest.isOidc(arguments[0].response_type)?"id_token":"code":q._query_status_response_type="id_token",q._revokeAccessTokenOnSignout=D,q._redirectNavigator=B,q._popupNavigator=j,q._iframeNavigator=H,q._userStore=K,q}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),n(e,[{key:"popup_redirect_uri",get:function t(){return this._popup_redirect_uri}},{key:"popup_post_logout_redirect_uri",get:function t(){return this._popup_post_logout_redirect_uri}},{key:"popupWindowFeatures",get:function t(){return this._popupWindowFeatures}},{key:"popupWindowTarget",get:function t(){return this._popupWindowTarget}},{key:"silent_redirect_uri",get:function t(){return this._silent_redirect_uri}},{key:"silentRequestTimeout",get:function t(){return this._silentRequestTimeout}},{key:"automaticSilentRenew",get:function t(){return this._automaticSilentRenew}},{key:"validateSubOnSilentRenew",get:function t(){return this._validateSubOnSilentRenew}},{key:"includeIdTokenInSilentRenew",get:function t(){return this._includeIdTokenInSilentRenew}},{key:"accessTokenExpiringNotificationTime",get:function t(){return this._accessTokenExpiringNotificationTime}},{key:"monitorSession",get:function t(){return this._monitorSession}},{key:"monitorAnonymousSession",get:function t(){return this._monitorAnonymousSession}},{key:"checkSessionInterval",get:function t(){return this._checkSessionInterval}},{key:"stopCheckSessionOnError",get:function t(){return this._stopCheckSessionOnError}},{key:"query_status_response_type",get:function t(){return this._query_status_response_type}},{key:"revokeAccessTokenOnSignout",get:function t(){return this._revokeAccessTokenOnSignout}},{key:"redirectNavigator",get:function t(){return this._redirectNavigator}},{key:"popupNavigator",get:function t(){return this._popupNavigator}},{key:"iframeNavigator",get:function t(){return this._iframeNavigator}},{key:"userStore",get:function t(){return this._userStore}}]),e}(i.OidcClientSettings);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.RedirectNavigator=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.RedirectNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.prepare=function t(){return Promise.resolve(this)},t.prototype.navigate=function t(e){return e&&e.url?(e.useReplaceToNavigate?window.location.replace(e.url):window.location=e.url,Promise.resolve()):(i.Log.error("RedirectNavigator.navigate: No url provided"),Promise.reject(new Error("No url provided")))},n(t,[{key:"url",get:function t(){return window.location.href}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.PopupNavigator=void 0;var n=r(0),i=r(42);e.PopupNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.prepare=function t(e){var r=new i.PopupWindow(e);return Promise.resolve(r)},t.prototype.callback=function t(e,r,o){n.Log.debug("PopupNavigator.callback");try{return i.PopupWindow.notifyOpener(e,r,o),Promise.resolve()}catch(t){return Promise.reject(t)}},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.PopupWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(3);e.PopupWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e;}));var o=e.popupWindowTarget||"_blank",s=e.popupWindowFeatures||"location=no,toolbar=no,width=500,height=500,left=100,top=100;";this._popup=window.open("",o,s),this._popup&&(i.Log.debug("PopupWindow.ctor: popup successfully created"),this._checkForPopupClosedTimer=window.setInterval(this._checkForPopupClosed.bind(this),500));}return t.prototype.navigate=function t(e){return this._popup?e&&e.url?(i.Log.debug("PopupWindow.navigate: Setting URL in popup"),this._id=e.id,this._id&&(window["popupCallback_"+e.id]=this._callback.bind(this)),this._popup.focus(),this._popup.window.location=e.url):(this._error("PopupWindow.navigate: no url provided"),this._error("No url provided")):this._error("PopupWindow.navigate: Error opening popup window"),this.promise},t.prototype._success=function t(e){i.Log.debug("PopupWindow.callback: Successful response from popup window"),this._cleanup(),this._resolve(e);},t.prototype._error=function t(e){i.Log.error("PopupWindow.error: ",e),this._cleanup(),this._reject(new Error(e));},t.prototype.close=function t(){this._cleanup(!1);},t.prototype._cleanup=function t(e){i.Log.debug("PopupWindow.cleanup"),window.clearInterval(this._checkForPopupClosedTimer),this._checkForPopupClosedTimer=null,delete window["popupCallback_"+this._id],this._popup&&!e&&this._popup.close(),this._popup=null;},t.prototype._checkForPopupClosed=function t(){this._popup&&!this._popup.closed||this._error("Popup window closed");},t.prototype._callback=function t(e,r){this._cleanup(r),e?(i.Log.debug("PopupWindow.callback success"),this._success({url:e})):(i.Log.debug("PopupWindow.callback: Invalid response from popup"),this._error("Invalid response from popup"));},t.notifyOpener=function t(e,r,n){if(window.opener){if(e=e||window.location.href){var s=o.UrlUtility.parseUrlFragment(e,n);if(s.state){var a="popupCallback_"+s.state,u=window.opener[a];u?(i.Log.debug("PopupWindow.notifyOpener: passing url message to opener"),u(e,r)):i.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener");}else i.Log.warn("PopupWindow.notifyOpener: no state found in response url");}}else i.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.");},n(t,[{key:"promise",get:function t(){return this._promise}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.IFrameNavigator=void 0;var n=r(0),i=r(44);e.IFrameNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.prepare=function t(e){var r=new i.IFrameWindow(e);return Promise.resolve(r)},t.prototype.callback=function t(e){n.Log.debug("IFrameNavigator.callback");try{return i.IFrameWindow.notifyParent(e),Promise.resolve()}catch(t){return Promise.reject(t)}},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.IFrameWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.IFrameWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e;})),this._boundMessageEvent=this._message.bind(this),window.addEventListener("message",this._boundMessageEvent,!1),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.width=0,this._frame.height=0,window.document.body.appendChild(this._frame);}return t.prototype.navigate=function t(e){if(e&&e.url){var r=e.silentRequestTimeout||1e4;i.Log.debug("IFrameWindow.navigate: Using timeout of:",r),this._timer=window.setTimeout(this._timeout.bind(this),r),this._frame.src=e.url;}else this._error("No url provided");return this.promise},t.prototype._success=function t(e){this._cleanup(),i.Log.debug("IFrameWindow: Successful response from frame window"),this._resolve(e);},t.prototype._error=function t(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e));},t.prototype.close=function t(){this._cleanup();},t.prototype._cleanup=function t(){this._frame&&(i.Log.debug("IFrameWindow: cleanup"),window.removeEventListener("message",this._boundMessageEvent,!1),window.clearTimeout(this._timer),window.document.body.removeChild(this._frame),this._timer=null,this._frame=null,this._boundMessageEvent=null);},t.prototype._timeout=function t(){i.Log.debug("IFrameWindow.timeout"),this._error("Frame window timed out");},t.prototype._message=function t(e){if(i.Log.debug("IFrameWindow.message"),this._timer&&e.origin===this._origin&&e.source===this._frame.contentWindow&&"string"==typeof e.data&&(e.data.startsWith("http://")||e.data.startsWith("https://"))){var r=e.data;r?this._success({url:r}):this._error("Invalid response from frame");}},t.notifyParent=function t(e){i.Log.debug("IFrameWindow.notifyParent"),(e=e||window.location.href)&&(i.Log.debug("IFrameWindow.notifyParent: posting url message to parent"),window.parent.postMessage(e,location.protocol+"//"+location.host));},n(t,[{key:"promise",get:function t(){return this._promise}},{key:"_origin",get:function t(){return location.protocol+"//"+location.host}}]),t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.UserManagerEvents=void 0;var n=r(0),i=r(16),o=r(17);e.UserManagerEvents=function(t){function e(r){!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,r));return i._userLoaded=new o.Event("User loaded"),i._userUnloaded=new o.Event("User unloaded"),i._silentRenewError=new o.Event("Silent renew error"),i._userSignedIn=new o.Event("User signed in"),i._userSignedOut=new o.Event("User signed out"),i._userSessionChanged=new o.Event("User session changed"),i}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),e.prototype.load=function e(r){var i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n.Log.debug("UserManagerEvents.load"),t.prototype.load.call(this,r),i&&this._userLoaded.raise(r);},e.prototype.unload=function e(){n.Log.debug("UserManagerEvents.unload"),t.prototype.unload.call(this),this._userUnloaded.raise();},e.prototype.addUserLoaded=function t(e){this._userLoaded.addHandler(e);},e.prototype.removeUserLoaded=function t(e){this._userLoaded.removeHandler(e);},e.prototype.addUserUnloaded=function t(e){this._userUnloaded.addHandler(e);},e.prototype.removeUserUnloaded=function t(e){this._userUnloaded.removeHandler(e);},e.prototype.addSilentRenewError=function t(e){this._silentRenewError.addHandler(e);},e.prototype.removeSilentRenewError=function t(e){this._silentRenewError.removeHandler(e);},e.prototype._raiseSilentRenewError=function t(e){n.Log.debug("UserManagerEvents._raiseSilentRenewError",e.message),this._silentRenewError.raise(e);},e.prototype.addUserSignedIn=function t(e){this._userSignedIn.addHandler(e);},e.prototype.removeUserSignedIn=function t(e){this._userSignedIn.removeHandler(e);},e.prototype._raiseUserSignedIn=function t(){n.Log.debug("UserManagerEvents._raiseUserSignedIn"),this._userSignedIn.raise();},e.prototype.addUserSignedOut=function t(e){this._userSignedOut.addHandler(e);},e.prototype.removeUserSignedOut=function t(e){this._userSignedOut.removeHandler(e);},e.prototype._raiseUserSignedOut=function t(){n.Log.debug("UserManagerEvents._raiseUserSignedOut"),this._userSignedOut.raise();},e.prototype.addUserSessionChanged=function t(e){this._userSessionChanged.addHandler(e);},e.prototype.removeUserSessionChanged=function t(e){this._userSessionChanged.removeHandler(e);},e.prototype._raiseUserSessionChanged=function t(){n.Log.debug("UserManagerEvents._raiseUserSessionChanged"),this._userSessionChanged.raise();},e}(i.AccessTokenEvents);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.Timer=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(1),s=r(17);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}e.Timer=function(t){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.timer,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;a(this,e);var s=u(this,t.call(this,r));return s._timer=n,s._nowFunc=i||function(){return Date.now()/1e3},s}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}(e,t),e.prototype.init=function t(e){e<=0&&(e=1),e=parseInt(e);var r=this.now+e;if(this.expiration===r&&this._timerHandle)i.Log.debug("Timer.init timer "+this._name+" skipping initialization since already initialized for expiration:",this.expiration);else {this.cancel(),i.Log.debug("Timer.init timer "+this._name+" for duration:",e),this._expiration=r;var n=5;e<n&&(n=e),this._timerHandle=this._timer.setInterval(this._callback.bind(this),1e3*n);}},e.prototype.cancel=function t(){this._timerHandle&&(i.Log.debug("Timer.cancel: ",this._name),this._timer.clearInterval(this._timerHandle),this._timerHandle=null);},e.prototype._callback=function e(){var r=this._expiration-this.now;i.Log.debug("Timer.callback; "+this._name+" timer expires in:",r),this._expiration<=this.now&&(this.cancel(),t.prototype.raise.call(this));},n(e,[{key:"now",get:function t(){return parseInt(this._nowFunc())}},{key:"expiration",get:function t(){return this._expiration}}]),e}(s.Event);},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.SilentRenewService=void 0;var n=r(0);e.SilentRenewService=function(){function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userManager=e;}return t.prototype.start=function t(){this._callback||(this._callback=this._tokenExpiring.bind(this),this._userManager.events.addAccessTokenExpiring(this._callback),this._userManager.getUser().then((function(t){})).catch((function(t){n.Log.error("SilentRenewService.start: Error from getUser:",t.message);})));},t.prototype.stop=function t(){this._callback&&(this._userManager.events.removeAccessTokenExpiring(this._callback),delete this._callback);},t.prototype._tokenExpiring=function t(){var e=this;this._userManager.signinSilent().then((function(t){n.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful");}),(function(t){n.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:",t.message),e._userManager.events._raiseSilentRenewError(t);}));},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaPopupNavigator=void 0;var n=r(21);e.CordovaPopupNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.prepare=function t(e){var r=new n.CordovaPopupWindow(e);return Promise.resolve(r)},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaIFrameNavigator=void 0;var n=r(21);e.CordovaIFrameNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);}return t.prototype.prepare=function t(e){e.popupWindowFeatures="hidden=yes";var r=new n.CordovaPopupWindow(e);return Promise.resolve(r)},t}();},function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});e.Version="1.11.5";}])}));
});

unwrapExports(oidcClient_min);
var oidcClient_min_1 = oidcClient_min.UserManager;

var OidcProvider = (function () {
    function OidcProvider(cfg) {
        this._userManager = new oidcClient_min_1(cfg);
    }
    OidcProvider.prototype.login = function () {
        this._userManager.signinRedirect();
    };
    OidcProvider.prototype.onLogin = function (success) {
        if (success == undefined) {
            success = function () { return window.location = "/"; };
        }
        this._userManager.signinRedirectCallback().then(function (user) {
            success();
        }).catch(function (e) {
            console.error(e);
        });
    };
    OidcProvider.prototype.logout = function () {
        this._userManager.signoutRedirect();
    };
    OidcProvider.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._userManager.getUser()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    OidcProvider.prototype.authorize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._userManager.getUser()];
                    case 1:
                        user = _a.sent();
                        if (user !== undefined) {
                            return [2, {
                                    "Authorization": "Bearer " + user.access_token
                                }];
                        }
                        return [2];
                }
            });
        });
    };
    return OidcProvider;
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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

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
        'onwheel',
        'onchange',
        'oninput',
        'onfocus',
        'onblur',
        'onload',
        'onunload'
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
            if (element.setProperty !== undefined) {
                element.setProperty(name, value);
            }
            else {
                element[name] = value.bind(element);
            }
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
            if (typeof value === 'object') {
                if (element.setProperty !== undefined) {
                    element.setProperty(name, value);
                }
                else {
                    value = JSON.stringify(value);
                    element.setAttribute(name, value);
                }
            }
            else {
                element.setAttribute(name, value);
            }
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
            var value = props[key];
            if (value !== false) {
                setAttribute(element, key, props[key]);
            }
        }
        return element;
    }
    else {
        throw new Error("createDOMElement is not implemented for name: " + JSON.stringify(name));
    }
}

var VirtualNode = (function () {
    function VirtualNode() {
    }
    return VirtualNode;
}());

var ElementNode = (function (_super) {
    __extends(ElementNode, _super);
    function ElementNode(name, props, children) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.props = props;
        _this.children = children;
        _this.isElement = true;
        return _this;
    }
    Object.defineProperty(ElementNode.prototype, "key", {
        get: function () {
            return this.props ? this.props.key : undefined;
        },
        enumerable: false,
        configurable: true
    });
    ElementNode.prototype.renderDom = function () {
        var _a = this, name = _a.name, props = _a.props, children = _a.children;
        var dom = createDOMElement(name, props);
        dom.component = this.component;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child !== null) {
                var c = child.component;
                var node = child.renderDom();
                if (c !== undefined && c.nodeWillConnect !== undefined) {
                    c.nodeWillConnect(node);
                }
                dom.appendChild(node);
                if (c !== undefined && c.nodeDidConnect !== undefined) {
                    c.nodeDidConnect(node);
                }
            }
        }
        this.dom = dom;
        return dom;
    };
    return ElementNode;
}(VirtualNode));

var TextNode = (function (_super) {
    __extends(TextNode, _super);
    function TextNode(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.isText = true;
        return _this;
    }
    TextNode.prototype.renderDom = function () {
        var dom = document.createTextNode(this.text.toString());
        this.dom = dom;
        return dom;
    };
    return TextNode;
}(VirtualNode));

var Fragment = (function () {
    function Fragment() {
    }
    return Fragment;
}());
var FragmentNode = (function (_super) {
    __extends(FragmentNode, _super);
    function FragmentNode(props, children) {
        var _this = _super.call(this) || this;
        _this.props = props;
        _this.children = children;
        _this.isFragment = true;
        return _this;
    }
    FragmentNode.prototype.renderDom = function () {
        var children = this.children;
        var dom = document.createDocumentFragment();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child !== null) {
                dom.appendChild(child.renderDom());
            }
        }
        this.dom = dom;
        return dom;
    };
    FragmentNode.prototype.prependChildNode = function (vNode) {
        this.children.unshift(vNode);
    };
    FragmentNode.prototype.appendChildNode = function (vNode) {
        this.children.push(vNode);
    };
    return FragmentNode;
}(VirtualNode));

var ComponentNode = (function (_super) {
    __extends(ComponentNode, _super);
    function ComponentNode(props, children) {
        var _this = _super.call(this) || this;
        _this.props = props;
        _this.children = children;
        _this.isComponent = true;
        return _this;
    }
    ComponentNode.prototype.renderDom = function () {
        var vNode = this.render();
        if (vNode === null) {
            return null;
        }
        var dom = vNode.renderDom();
        vNode.dom = dom;
        this.mountedVNode = vNode;
        dom.component = this;
        return dom;
    };
    return ComponentNode;
}(VirtualNode));

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
        if (child === null) {
            return;
        }
        if (child.isElement) {
            childrenNodes.push(child);
        }
        else if (child.isText) {
            childrenNodes.push(child);
        }
        else if (child.isFragment) {
            childrenNodes.push(child);
        }
        else if (Array.isArray(child)) {
            child.forEach(function (ch) { return childrenNodes.push(ch); });
        }
        else if (typeof child === 'object') {
            if (child.isComponent) {
                var vNode = child.render();
                if (vNode !== null) {
                    vNode.component = child;
                }
                childrenNodes.push(vNode);
            }
            else {
                throw new Error('Invalid object. It must extend ComponentNode');
            }
        }
        else {
            childrenNodes.push(new TextNode(child));
        }
    });
    if (typeof name === 'string') {
        return new ElementNode(name, attributes, childrenNodes);
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
                if (childNode === undefined) {
                    console.warn("Child is undefined. Parent: " + JSON.stringify(n) + ". Patch: " + JSON.stringify(patch));
                    childNode = n;
                }
                patch.patches.applyPatches(n, childNode, hooks, context);
            }
        }
        context.mergeOriginalElements(n);
        if (hooks === null || hooks === void 0 ? void 0 : hooks.nodeDidUpdate) {
            context.callDidUpdateForNodes(hooks === null || hooks === void 0 ? void 0 : hooks.nodeDidUpdate);
        }
    };
    ElementPatches.prototype.hasPatches = function () {
        return this.patches.length > 0 || this.childrenPatches.length > 0;
    };
    return ElementPatches;
}());

function setAttributes(element, props) {
    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            setAttribute(element, key, props[key]);
        }
    }
}

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
        if (typeof trackedListeners === 'undefined') {
            return;
        }
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
            element.className = newValue.trim();
        }
        else if (name === 'style') {
            if (typeof newValue === 'object') {
                newValue = getCSSStyle(newValue);
            }
            if (newValue.trim() === '') {
                element.removeAttribute(name);
            }
            else {
                element.setAttribute(name, newValue);
            }
        }
        else {
            if (element.setProperty !== undefined &&
                typeof newValue === 'object') {
                element.setProperty(name, newValue);
            }
            else {
                if (name === 'value' && element instanceof HTMLInputElement) {
                    element.value = newValue;
                }
                else {
                    element.setAttribute(name, newValue);
                }
            }
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
        if (newValue === undefined ||
            newValue === null ||
            newValue === "false") {
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
        var parentNode = options.parentNode, node = options.node, context = options.context;
        var oldValue = node.textContent || undefined;
        var newValue = this.value.text.toString();
        if (parentNode instanceof HTMLTextAreaElement) {
            parentNode.value = newValue;
        }
        else {
            node.textContent = newValue;
        }
        context.setNodeChanges(node, new NodeChanges({
            text: {
                oldValue: oldValue,
                newValue: newValue
            }
        }));
    };
    return SetTextPatch;
}());

function callHook(node, name, hooks) {
    if (hooks === void 0) { hooks = {}; }
    var component = node.component;
    if (component !== undefined &&
        component[name] !== undefined) {
        console.log("Calling hook: '" + name + "' of component: '" + component.constructor.name + "'");
        component[name](node);
    }
    else if (hooks[name] !== undefined) {
        console.log("Calling hook: '" + name + "' of element: '" + hooks.constructor.name + "'");
        hooks[name](node);
    }
}

var RemoveElementPatch = (function () {
    function RemoveElementPatch() {
    }
    RemoveElementPatch.prototype.applyPatch = function (options) {
        var parentNode = options.parentNode, node = options.node, context = options.context, hooks = options.hooks;
        callHook(node, 'nodeWillDisconnect', hooks);
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
        var insertedChildrenElements = [];
        var removedChildrenElements = [];
        var _a = this, index = _a.index, newNode = _a.newNode;
        var newChild = newNode.renderDom();
        var n = node instanceof DocumentFragment ?
            parentNode :
            node;
        var oldChild = n.children[index];
        if (oldChild) {
            context.setOriginalElement(oldChild, index);
            callHook(oldChild, 'nodeWillDisconnect', hooks);
            callHook(newChild, 'nodeWillConnect', hooks);
            n.replaceChild(newChild, oldChild);
            callHook(newChild, 'nodeDidConnect', hooks);
            removedChildrenElements.push(oldChild);
            insertedChildrenElements.push(newChild);
        }
        else {
            callHook(newChild, 'nodeWillConnect', hooks);
            n.appendChild(newChild);
            callHook(newChild, 'nodeDidConnect', hooks);
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
        var insertedChildrenElements = [];
        var fragment = document.createDocumentFragment();
        this.children.forEach(function (child) {
            if (child === null) {
                return;
            }
            var childElement = child.renderDom();
            insertedChildrenElements.push(childElement);
            callHook(childElement, 'nodeWillConnect', hooks);
            fragment.appendChild(childElement);
        });
        insertedChildrenElements.forEach(function (childElement) {
            callHook(childElement, 'nodeDidConnect', hooks);
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
        var movedChildrenElements = [];
        var _a = this, from = _a.from, to = _a.to, offset = _a.offset;
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
            callHook(originalElement, 'nodeWillDisconnect', hooks);
            callHook(movingChild, 'nodeWillConnect', hooks);
            n.replaceChild(movingChild, originalElement);
            callHook(movingChild, 'nodeDidConnect', hooks);
            movedChildrenElements.push(movingChild);
        }
        else {
            callHook(movingChild, 'nodeWillConnect', hooks);
            n.appendChild(movingChild);
            callHook(movingChild, 'nodeDidConnect', hooks);
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
        var newNode = this.newNode.renderDom();
        callHook(node, 'nodeWillDisconnect', hooks);
        callHook(newNode, 'nodeWillConnect', hooks);
        node.replaceWith(newNode);
        callHook(newNode, 'nodeDidConnect', hooks);
        (parentContext || context).setNodeChanges(parentNode, new NodeChanges({
            inserted: [newNode],
            removed: [node]
        }));
    };
    return ReplaceElementPatch;
}());

var SetElementPatch = (function () {
    function SetElementPatch(newNode) {
        this.newNode = newNode;
    }
    SetElementPatch.prototype.applyPatch = function (options) {
        var parentNode = options.parentNode, context = options.context, hooks = options.hooks;
        var props = this.newNode.props;
        var newNode = this.newNode.renderDom();
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
                for (var i = 0; i < childNodes.length; ++i) {
                    callHook(childNodes[i], 'nodeWillConnect', hooks);
                }
                parentNode.appendChild(newNode);
                for (var i = 0; i < childNodes.length; ++i) {
                    callHook(childNodes[i], 'nodeDidConnect', hooks);
                }
                context.setNodeChanges(parentNode, new NodeChanges({
                    inserted: childNodes
                }));
            }
        }
        else {
            callHook(newNode, 'nodeWillConnect', hooks);
            parentNode.appendChild(newNode);
            callHook(newNode, 'nodeDidConnect', hooks);
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
                    if (v === 'false') {
                        patches.push(new RemoveAttributePatch(k, oldValue));
                    }
                    else {
                        patches.push(new SetAttributePatch(k, oldValue, v));
                    }
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
    return node.isElement;
}
function isFragmentNode(node) {
    return node.isFragment;
}
function hasKeys(children) {
    if (children === void 0) { children = []; }
    var keys = new Set();
    var missingFirstKey = false;
    for (var i = 0; i < children.length; ++i) {
        var child = children[i];
        if (child === null) {
            return false;
        }
        if (isVirtualNode(child)) {
            var key = child.key;
            if (key !== undefined) {
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
            if (oldNode.isFragment) {
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
                newNode.dom = oldNode.dom;
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
                        if (isFragmentNode(oldChildren[0])) {
                            oldChildren = oldChildren[0].children;
                        }
                        if (isFragmentNode(newChildren[0])) {
                            newChildren = newChildren[0].children;
                        }
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
                    newNode.dom = oldNode.dom;
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
                if (newText.text === undefined) {
                    newText.text = '';
                }
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

function parseFromString(markup, type) {
    if (type === void 0) { type = 'xml'; }
    var mime = type === 'html' ? 'text/html' : 'application/xml';
    var wrappedMarkup = type === 'html' ?
        "<!DOCTYPE html>\n<html><body>" + markup + "</body></html>" :
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml>" + markup + "</xml>";
    var doc = new DOMParser().parseFromString(wrappedMarkup, mime);
    var tag = type === 'html' ? 'body' : 'xml';
    return doc.getElementsByTagName(tag)[0].childNodes;
}

function toVDom(node, options) {
    if (options === void 0) { options = {}; }
    if (node === null) {
        return null;
    }
    switch (node.nodeType) {
        case 1:
            {
                var element = node;
                var nodeName = element.nodeName.toLowerCase();
                if (nodeName === 'script' && !options.allowScripts) {
                    throw Error('Script elements are not allowed unless the allowScripts option is set to true');
                }
                var props = getProps(element.attributes);
                var children = getChildren$1(element.childNodes, options);
                return new ElementNode(nodeName, props, children);
            }
        case 3:
            {
                var text = node;
                var content = text.textContent || '';
                if (options.excludeTextWithWhiteSpacesOnly &&
                    /^\s*$/g.test(content)) {
                    return null;
                }
                return new TextNode(content);
            }
        default: return null;
    }
}
function getProps(attributes) {
    if (attributes === null) {
        return null;
    }
    var count = attributes.length;
    if (count == 0) {
        return null;
    }
    var props = {};
    for (var i = 0; i < attributes.length; i++) {
        var _a = attributes[i], name_1 = _a.name, value = _a.value;
        props[name_1] = value;
    }
    return props;
}
function getChildren$1(childNodes, options) {
    var vnodes = [];
    childNodes.forEach(function (childNode) {
        var vnode = toVDom(childNode, options);
        if (vnode != null) {
            vnodes.push(vnode);
        }
    });
    return vnodes;
}

function markupToVDom(markup, type, options) {
    if (type === void 0) { type = 'xml'; }
    if (options === void 0) { options = {}; }
    var nodes = parseFromString(markup, type);
    if (nodes === null) {
        return null;
    }
    return nodes.length > 1 ?
        new FragmentNode(null, Array.from(nodes)
            .map(function (n) { return toVDom(n, options); })
            .filter(function (n) { return n !== null; })) :
        toVDom(nodes[0], options);
}

function notifyNodeWillDisconnect(node) {
    var c = node.component !== undefined ?
        node.component :
        node;
    if (c.nodeWillDisconnect !== undefined) {
        c.nodeWillDisconnect(node);
    }
    var root = node.shadowRoot;
    var n = root !== undefined && root !== null ?
        root :
        node;
    if (n.childNodes !== undefined) {
        n.childNodes.forEach(function (child) { return notifyNodeWillDisconnect(child); });
    }
}

function getGlobalFunction(value) {
    const functionName = value.replace('()', '').trim();
    return window[functionName];
}

function createElementNode(o) {
    if (typeof o === 'string') {
        return markupToVDom(o.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
    }
    if (o.isElementNode === true) {
        return new ElementNode(o.name, o.props, o.children.map(c => createElementNode(c)));
    }
    else if (o.IsFragmentNode) {
        return new FragmentNode(o.props, o.children.map(c => createElementNode(c)));
    }
    else {
        return new TextNode(o.text);
    }
}

class OneOf {
    constructor(types) {
        this.types = types;
    }
    toProperty(value) {
        // First try a function since that can create any of the objects below
        if (value[value.length - 2] === '(' && value[value.length - 1] === ')' // The function by convention must end in ()
            && this.types.includes(Function)) {
            var fcn = getGlobalFunction(value);
            if (fcn !== undefined) {
                return fcn;
            }
        }
        if (this.types.includes(ElementNode)) {
            return createElementNode(value);
        }
        if (this.types.includes(Object) ||
            this.types.includes(Array)) {
            let o;
            try {
                o = JSON.parse(value);
            }
            catch (error) {
                // Try the other types below
            }
            if (o !== undefined) {
                if (!Array.isArray(o) &&
                    !this.types.includes(Object)) {
                    throw Error(`value: ${value} is not an array but there is no object type expected`);
                }
                if (Array.isArray(o) &&
                    !this.types.includes(Array)) {
                    throw Error(`value: ${value} is an array but there is no array type expected`);
                }
                return o;
            }
        }
        if (this.types.includes(Boolean)) {
            return value !== null && value !== 'false';
        }
        if (this.types.includes(Number)) {
            return value === null ? null : Number(value);
        }
        return value;
    }
}
function oneOf(...types) {
    return new OneOf(types);
}

const defaultPropertyValueConverter = {
    toProperty: (value, type) => {
        if (type instanceof OneOf) {
            return type.toProperty(value);
        }
        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Array:
                {
                    // All the properties that are not declared as Function accept a function as alternative by design
                    // The probing is as follows: 
                    // Test whether it is really an array
                    try {
                        return JSON.parse(value);
                    }
                    catch (error) { // Value is a string but not a JSON one, assume a function
                        return getGlobalFunction(value);
                    }
                }
            case ElementNode: {
                return createElementNode(value);
            }
            case Function: { // Extract the string and return the global function
                return getGlobalFunction(value);
            }
            case Object: // It can also be a string
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    return value;
                }
        }
        return value;
    },
    toAttribute: (value, type) => {
        switch (type) {
            case Boolean:
                return value ? 'true' : 'false';
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    }
};

function getComponentMetadata$1(ctor) {
    const metadata = {
        component: {},
        properties: {},
        state: {}
    };
    // Set the shadow property
    metadata.component.shadow = (ctor.component || {}).shadow === undefined ? true : ctor.component.shadow;
    // Merge the URL styles
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

const registry = {
    /** The URL of the styles requested to be loaded to avoid requesting the same style */
    requested: new Set(),
    /** The loaded styles */
    loaded: new Map(),
    /** The callbacks mapped to the specific URL */
    callbacksMap: new Map(),
    /** Request to load a style from a given URL */
    async load(url, callback) {
        const { requested, loaded, callbacksMap } = this;
        if (loaded.has(url)) { // The style has been already loaded for other type
            console.log(`Retrieving loaded style for URL: ${url}`);
            const style = loaded.get(url);
            callback(url, style);
            return;
        }
        // Add an entry to the map
        if (!callbacksMap.has(url)) {
            callbacksMap.set(url, []);
        }
        // Get the collection of callbacks
        const callbacks = callbacksMap.get(url);
        callbacks.push(callback);
        if (requested.has(url)) { // Requested by other type but not loaded yet
            // console.log(`This URL: ${url} has been already requested to load the style`);
            return; // Already requested
        }
        requested.add(url); // Flag it as already requested
        // Load the style
        const response = await fetch(url);
        const content = await response.body.getReader().read();
        const style = new TextDecoder("utf-8").decode(content.value);
        //     console.log(`Setting loaded style from URL: ${url} in the registry
        // ${style}
        //             `);
        loaded.set(url, style);
        callbacks.forEach(cb => {
            cb(url, style);
        });
    }
};
function loadStyles(ctor) {
    const { styleUrls } = ctor.componentMetadata.component;
    styleUrls.forEach(url => {
        registry.load(url, ctor.mergeStyle);
    });
}

const CustomElementMetadataInitializerMixin = Base => class CustomElementMetadataInitializer extends Base {
    constructor() {
        super();
        this.initialize();
    }
    initialize() {
        const { componentMetadata, style, styleLoadedObserver } = this.constructor;
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
        // Style
        if (styleLoadedObserver !== undefined && style === undefined) { // Requires style but it hasn't been loaded yet
            styleLoadedObserver.subscribe(this);
        }
    }
    initializeProperty(name, propertyDescriptor) {
        const { attribute, // The name of the HTML attribute mapped to the property
        type, // The type of the property
        value, // The default value of the property if no HTML attribute is provided
        mutable, // Whether the value of the property can be changed
        reflect, // Whether to reflect the change of the property in its mapped HTML attribute,
        options // The range to restrict the values
         } = propertyDescriptor;
        if (value !== undefined) { // Initialize the property to the default value if any
            this.props[name] = value;
        }
        if (mutable === true) { // Generate a setter
            const setter = function (newValue, callback) {
                const oldValue = this.props[name];
                if (oldValue === newValue) {
                    return;
                }
                this.validatePropertyOptions(name, newValue, options);
                // console.log(`Property: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                if (reflect) {
                    // This will trigger the attributeChangedCallback
                    this.setAttribute(attribute, defaultPropertyValueConverter.toAttribute(newValue, type));
                    if (typeof newValue === 'object') {
                        // Using JSON.serialize will wipe out any functions from the object
                        // Therefore after setting the attributes we set the new value as an object
                        this.setProperty(name, newValue);
                    }
                }
                else {
                    this.setProperty(name, newValue);
                }
                callback === null || callback === void 0 ? void 0 : callback(newValue);
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
            // console.log(`State: '${name}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
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
        this.componentMetadata = getComponentMetadata$1(this);
        const { styleUrls } = this.componentMetadata.component;
        if (styleUrls.length > 0) {
            // console.log(`Loading styles for type: ${this.name}`);
            this.loadedStylesTracker = this.loadedStylesTracker || // Inherited one
                {
                    loadedStyles: [],
                    pendingUrls: new Set()
                };
            // Populate the pending URLs to load
            styleUrls.forEach(styleUrl => {
                this.loadedStylesTracker.pendingUrls.add(styleUrl);
            });
            // Set up the observer
            this.styleLoadedObserver = new Observer('onStyleLoaded');
            this.mergeStyle = this.mergeStyle.bind(this);
            loadStyles(this);
        }
        // Collect the observed attributes
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
        if (newValue === oldValue) {
            return; // Nothing to update
        }
        const { name, type, options } = this.constructor.propertiesByAttribute[attributeName];
        this.validatePropertyOptions(name, newValue, options);
        // console.log(`attributeChangedCallback: '${attributeName}' of custom element: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
        // Update the internal property 
        this.props[name] = defaultPropertyValueConverter.toProperty(newValue, type);
        this.requestUpdate();
    }
    /**
     * Called when there is a style available to merge
     * @param url
     * @param style
     */
    static mergeStyle(url, style) {
        const { loadedStyles, pendingUrls } = this.loadedStylesTracker;
        loadedStyles.push(style);
        pendingUrls.delete(url);
        if (pendingUrls.size === 0) {
            this.style = loadedStyles.join('\n');
            this.styleLoadedObserver.notify();
            //delete this.loadedStylesTracker;
        }
    }
    validatePropertyOptions(name, newValue, options) {
        if (options !== undefined &&
            !options.includes(newValue)) {
            throw Error(`Value: [${newValue}] is not in the options of property: '${name}'. Options: [${options.join(', ')}] `);
        }
    }
};

/**
 * Connects the CustomElement or the FunctionalComponent to the virtual dom rendering cycle
 */
const VirtualDomMixin = Base => class VirtualDom extends Base {
    // The props and children are ignored for custom elements but they are needed for Functional Components
    // so they are included in the constructor
    constructor(props, children) {
        super(props, children);
        /**
         * Flag to avoid re-requesting update if it is alaready requested
         */
        this._isUpdating = false;
        if (this.nodeDidConnect !== undefined) {
            this.nodeDidConnect = this.nodeDidConnect.bind(this);
        }
        if (this.nodeWillConnect !== undefined) {
            this.nodeWillConnect = this.nodeWillConnect.bind(this);
        }
        if (this.nodeDidUpdate !== undefined) {
            this.nodeDidUpdate = this.nodeDidUpdate.bind(this);
        }
        if (this.nodeWillDisconnect !== undefined) {
            this.nodeWillDisconnect = this.nodeWillDisconnect.bind(this);
        }
    }
    /**
     * The root element of this component
     */
    get rootElement() {
        const dom = (this.mountedVNode || {}).dom;
        if (dom === undefined) {
            return dom;
        }
        // Once the document fragment is appended to its parent element. It looses all its children, so we need its parent element to apply the diff
        if (dom instanceof DocumentFragment) {
            return dom.parentElement || this.document;
        }
        return dom;
    }
    requestUpdate() {
        if (this._isUpdating) {
            return;
        }
        this._isUpdating = true;
        requestAnimationFrame(() => {
            this.update();
            this._isUpdating = false;
        });
    }
    update() {
        var _a, _b, _c, _d, _e;
        let node = this.render();
        if (node === undefined) {
            console.error('Undefined virtual node. Ensure that you return the node from the render function');
        }
        if (Array.isArray(node)) { // Wrap the array of nodes in a fragment
            node = new FragmentNode(null, node);
        }
        // Create a virtual text node if the type of node is any primitive
        const nodeType = typeof node;
        if (nodeType === 'string' ||
            nodeType === 'number' ||
            nodeType === 'boolean') {
            node = new TextNode(node);
        }
        // Modify the virtual node if necessary (i.e. add style) before diffing it, to keep it consistent with the mounted one
        if (this.onBeforeMount !== undefined) {
            node = this.onBeforeMount(node);
        }
        // Do the diffing
        const previousNode = this.mountedVNode;
        const patches = diff(previousNode, node);
        if (!patches.hasPatches()) {
            return false; // Nothing to mount   
        }
        if (previousNode === undefined) { // Will mount
            if (node !== null) {
                (_a = this.willMount) === null || _a === void 0 ? void 0 : _a.call(this);
            }
            // else { node === null
            //     Do nothing
            // }
            patches.applyPatches(this.document, undefined, this);
            if (node != null) {
                (_b = this.didMount) === null || _b === void 0 ? void 0 : _b.call(this);
            }
        }
        else { // previousNode !== undefined
            if (node === null) {
                (_c = this.willUnmount) === null || _c === void 0 ? void 0 : _c.call(this);
            }
            else { // node !== null
                (_d = this.willUpdate) === null || _d === void 0 ? void 0 : _d.call(// node !== null
                this);
            }
            patches.applyPatches(this.document, this.rootElement, this);
            if (node != null) {
                (_e = this.didUpdate) === null || _e === void 0 ? void 0 : _e.call(this);
            }
        }
        // Set the new mounted node
        this.mountedVNode = node;
    }
};

class CustomElement extends VirtualDomMixin(CustomElementMetadataInitializerMixin(HTMLElement)) {
    constructor() {
        super();
        const { componentMetadata } = this.constructor;
        if (componentMetadata.component.shadow === true) {
            this.attachShadow({ mode: 'open' });
        }
    }
    connectedCallback() {
        // Validate that all the required properties have been set
        const { componentMetadata } = this.constructor;
        const { properties } = componentMetadata;
        const requiredProperties = Object.values(properties).filter(p => p.required === true);
        const invalidAttributes = [];
        requiredProperties.forEach(property => {
            if (this.props[property.name] === undefined) {
                invalidAttributes.push(property.attribute);
            }
        });
        if (invalidAttributes.length > 0) {
            throw Error(`These attributes are required but are missing their values: [${invalidAttributes.join(', ')}]`);
        }
        this.requestUpdate();
    }
    requestUpdate() {
        const { style, styleLoadedObserver } = this.constructor;
        if (styleLoadedObserver !== undefined && style === undefined) {
            return; // Requires a style but the style hasn't been loaded or merged yet
        }
        super.requestUpdate();
    }
    onStyleLoaded() {
        // console.log(`Style loaded for component ${this.constructor.name} ... requesting update`);
        this.requestUpdate();
    }
    /**
     * The DOM document in which this component is updated
     */
    get document() {
        return this.shadowRoot !== null ?
            this.shadowRoot :
            this;
    }
    /**
     * Sets the property bypassing any serialization
     * @param attribute The name of the property
     * @param value The value of the property
     */
    setProperty(attribute, value) {
        // Get the mapped property
        const property = this.constructor.propertiesByAttribute[attribute];
        const name = property !== undefined ? property.name : attribute;
        const oldValue = this.props[name];
        if (oldValue === value) {
            return;
        }
        // console.log(`setProperty: '${name}' of custom element: [${this.constructor.name}] value: <${value}>`);
        if (typeof value === 'function') {
            this.props[name] = value.bind(this);
        }
        else {
            this.props[name] = value;
        }
        this.requestUpdate();
    }
    onBeforeMount(vnode) {
        if (vnode === null) {
            return vnode; // No style added to a null node
        }
        const style = this.constructor.style;
        if (style === undefined) {
            return vnode; // No style to add
        }
        // We need to append a style
        if (vnode.isElement ||
            vnode.isText) {
            // Create a fragment with the original node as a child so we can append the style
            vnode = new FragmentNode(null, [vnode]);
        }
        vnode.appendChildNode(h("style", null, style));
        return vnode;
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
        if (window.getAppConfig !== undefined) {
            const { auth, intl } = window.getAppConfig();
            if (auth !== undefined) {
                appCtrl.authProvider = new OidcProvider(auth);
            }
            if (intl !== undefined) {
                appCtrl.intlProvider = new IntlProvider(intl.lang, intl.data);
            }
        }
        // Attach a function to the window to get the app
        window.getApp = () => appCtrl;
        super.connectedCallback();
    }
    render() {
        return (h("slot", null));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-app`, App);

const VariantMixin = Base => { var _a; return _a = class Variant extends Base {
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
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/sizable/Sizable.css`
        ]
    },
    _a.properties = {
        size: {
            type: String,
            value: 'medium',
            mutable: true,
            reflect: true,
            passToChildren: true,
            options: ['large', 'medium', 'small']
        }
    },
    _a; };

const DirectionMixin = Base => { var _a; return _a = class Direction extends Base {
        getDir() {
            return this.dir || document.dir;
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/direction/Direction.css`
        ]
    },
    _a.properties = {
        /**
         * The direction of the element
         */
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
        const { name, size, variant } = this.props;
        return (h("svg", { role: "img", size: size, variant: variant, dir: this.getDir() },
            h("use", { href: `${_iconsPath}#${name}` })));
    }
}
Icon.component = {
    styleUrls: [
        `${assetsFolder}/icon/Icon.css`
    ]
};
Icon.properties = {
    /**
     * The name of the icon
     */
    name: {
        type: String,
        value: '',
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);

//@ts-ignore
class Text extends SizableMixin(VariantMixin(CustomElement)) {
    render() {
        const { intlKey, lang, size, variant, } = this.props;
        // let {
        //     value
        // } = this.props;
        let value;
        if (intlKey !== undefined) {
            value = appCtrl.intlProvider.getTranslation(lang, intlKey);
        }
        return (h(Fragment, { size: size, variant: variant }, value !== undefined ? value : (h("slot", null))));
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName === 'STYLE') {
            return;
        }
        const { intlKey } = this.props;
        if (intlKey !== undefined) {
            appCtrl.intlProvider.subscribe(this);
            // const value = appCtrl.intlProvider.getTranslation(this.lang, intlKey);
            // this.setValue(value);
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
    }
    nodeWillDisconnect(node) {
        if (node.tagName === 'STYLE') {
            return;
        }
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
    //shadow: false,
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
     * The language to translate to
     */
    lang: {
        type: String,
        mutable: true,
        reflect: true
    },
    // /** 
    //  * The value of the text
    //  */
    // value: {
    //     type: String,
    //     mutable: true,
    //     reflect: true
    // }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text`, Text);

/**
 * Displays a custom content
 */
class Display extends CustomElement {
    render() {
        const { content } = this.props;
        if (content === undefined) {
            return null;
        }
        return (h("span", null, content));
    }
}
Display.properties = {
    /**
     * The content of the display
     */
    content: {
        type: ElementNode,
        mutable: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-display`, Display);

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
function visitChildren(children, visit) {
    children.forEach(child => {
        visit(child);
        visitChildren(getChildren(child), visit);
    });
}

const childConnected = 'childConnected';
const childDisconnected = 'childDisconnected';
/**
 * Fires an event to register/unregister a child item within a parent container
 */
const ChildMixin = Base => class Child extends Base {
    constructor(props, children) {
        super(props, children);
    }
    nodeDidConnect(node) {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this, node);
        // Emit an event for the container to register this child
        node.dispatchEvent(new CustomEvent(childConnected, {
            detail: {
                child: this
            },
            bubbles: true,
            composed: true
        }));
    }
    nodeWillDisconnect(node) {
        var _a;
        (_a = super.nodeWillDisconnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
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

//@ts-ignore
class Alert extends SizableMixin(ContainerMixin(CustomElement)) {
    render() {
        const { type, size, closable, close } = this.props;
        return (h(Fragment, { class: "alert", type: type, size: size },
            this.renderIcon(),
            this.renderMessage(),
            closable === true ?
                (h("gcl-close-tool", { variant: this.getVariant(), size: size, close: close })) :
                null));
    }
    renderIcon() {
        const { showIcon, icon, size } = this.props;
        if (showIcon !== true) {
            return null;
        }
        return icon !== undefined ?
            { icon } :
            (h("gcl-icon", { name: this.getDefaultIcon(), variant: this.getVariant(), size: size }));
    }
    renderMessage() {
        const { message, size } = this.props;
        if (message === undefined) {
            return null;
        }
        if (message.isVirtualText) {
            return (h("gcl-text", { variant: this.getVariant(), size: size, style: "max-width: 80%;" }, message));
        }
        else { // ElementNode
            return message;
        }
    }
    getDefaultIcon() {
        const { type } = this.props;
        switch (type) {
            case "info": return "info-circle-fill";
            case "success": return "check-circle-fill";
            case "warning": return "exclamation-circle-fill";
            default: return "exclamation-circle-fill";
        }
    }
    getVariant() {
        const { type } = this.props;
        switch (type) {
            case "info": return "primary";
            case "success": return "success";
            case "warning": return "warning";
            default: return "danger";
        }
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
        value: 'info',
        options: ['info', 'success', 'warning', 'error']
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
        type: ElementNode
    },
    /**
     * Whether the alert has a close button
     */
    closable: {
        type: Boolean,
        value: true
    },
    /**
     * What action to execute when the alert has been closed
     */
    close: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-alert`, Alert);

// import { config } from "../../config";
const DisableableMixin = Base => { var _a; return _a = class Disableable extends Base {
    },
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/mixins/Disableable/Disableable.css`
    //     ]
    // };
    _a.properties = {
        /**
         * Whether the element is disabled
         */
        disabled: {
            type: Boolean,
            value: false
        }
    },
    _a; };

const HoverableMixin = Base => { var _a; return _a = class Hoverable extends Base {
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/Hoverable/Hoverable.css`
        ]
    },
    _a.properties = {
        /**
         * Whether the element is hoverable
         */
        hoverable: {
            type: Boolean,
            value: true
        }
    },
    _a; };

//@ts-ignore
class Button extends HoverableMixin(DisableableMixin(SizableMixin(VariantMixin(DirectionMixin(ContainerMixin(CustomElement)))))) {
    render() {
        const { type, click, size, variant, hoverable, disabled } = this.props;
        return (h("button", { type: type, size: size, variant: variant, dir: this.getDir(), hoverable: hoverable, disabled: disabled, 
            // class={this.getCSSClass()}
            onClick: disabled ? null : click },
            h("slot", null)));
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
    },
    /**
     * Callback when the button is clicked
     */
    click: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-button`, Button);

//@ts-ignore
class Header extends SizableMixin(CustomElement) {
    render() {
        return (h(Fragment, null,
            this.renderTitle(),
            this.renderTools()));
    }
    renderTitle() {
        const { title, size } = this.props;
        return title !== undefined ?
            title :
            (h("div", { part: "title", class: "title", size: size },
                h("slot", { name: "title" })));
    }
    renderTools() {
        const { tool, size } = this.props;
        return tool !== undefined ?
            tool :
            (h("div", { part: "tool", class: "tool", size: size },
                h("slot", { name: "tool" })));
    }
}
Header.component = {
    styleUrls: [
        `${config.assetsFolder}/header/Header.css`
    ]
};
Header.properties = {
    /**
     * The title of the header
     */
    title: {
        type: ElementNode
    },
    /**
     * The tools of the header
     */
    tools: {
        type: ElementNode
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-header`, Header);

//@ts-ignore
class Panel extends SizableMixin(DirectionMixin(CustomElement)) {
    render() {
        return (h(Fragment, { class: "panel" },
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()));
    }
    renderHeader() {
        const { header, size, direction } = this.props;
        return header !== undefined ?
            header :
            (h("div", { part: "header", class: "header", size: size, direction: direction },
                h("slot", { name: "header" })));
    }
    renderBody() {
        const { body, size, direction } = this.props;
        return body !== undefined ?
            body :
            (h("div", { part: "body", class: "body", size: size, direction: direction },
                h("slot", { name: "body" })));
    }
    renderFooter() {
        const { footer, size, direction } = this.props;
        return footer !== undefined ?
            footer :
            (h("div", { part: "footer", class: "footer", size: size, direction: direction },
                h("slot", { name: "footer" })));
    }
}
Panel.component = {
    styleUrls: [
        `${config.assetsFolder}/Panel/Panel.css`
    ]
};
Panel.properties = {
    /**
     * The header of the panel
     */
    header: {
        type: ElementNode
    },
    /**
     * The body of the panel
     */
    body: {
        type: ElementNode
    },
    /**
     * The footer of the panel
     */
    footer: {
        type: ElementNode
    },
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-panel`, Panel);

class Overlay extends CustomElement {
    render() {
        return (h(Fragment, { class: "center" },
            h("slot", null)));
    }
}
Overlay.component = {
    styleUrls: [
        `${config.assetsFolder}/overlay/Overlay.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-overlay`, Overlay);

const selectionChanged = 'selectionChanged';
/**
 * Allows a component to be selected when clicked
 */
const SelectableMixin = Base => { var _a; return _a = class Selectable extends Base {
        notifySelectionChanged(selection) {
            const { selectableValue } = this.props;
            this.dispatchEvent(new CustomEvent(selectionChanged, {
                detail: {
                    child: this,
                    selectableValue,
                    selected: selection || this.props.selected // Need to read it again since the property was updated
                },
                bubbles: true,
                composed: true
            }));
        }
    },
    _a.properties = {
        /**
         * Whether the component is selectable
         */
        selectable: {
            type: Boolean,
            value: true,
            reflect: true,
            passToChildren: true // Maybe the children are selectable too
        },
        /**
         * Whether the item is selected
         */
        selected: {
            type: Boolean,
            mutable: true,
            reflect: true,
            //passToChildren: true // Maybe the children want to show some UI that they were selected
        },
        /**
         * The value to select in the event
         */
        selectableValue: {
            attribute: 'selectable-value',
            type: Object
        }
    },
    _a; };

/**
 * Allows the component to call a handler when the selection has changed
 */
const SelectionHandlerMixin = Base => { var _a; return _a = class SelectionHandler extends Base {
        callSelectionChanged(selection) {
            const { selectionChanged } = this.props;
            if (selectionChanged !== undefined) {
                selectionChanged(selection || this.props.selection); // Re-read from the updated selection props
            }
        }
    },
    _a.properties = {
        /**
         * The handler to call when the selection has changed
         */
        selectionChanged: {
            attribute: 'selection-changed',
            type: Function
        }
    },
    _a; };

//@ts-ignore
class Tool extends SizableMixin(VariantMixin(CustomElement)) {
    render() {
        const { variant, size } = this.props;
        const { iconName, click } = this;
        const icon = typeof iconName === 'function' ?
            iconName() :
            iconName;
        return (h("gcl-button", { variant: variant, size: size, click: click },
            h("gcl-icon", { name: icon })));
    }
}

const dropChanged = 'dropChanged';
//@ts-ignore
class DropTool extends Tool {
    constructor() {
        super();
        this.iconName = () => {
            const { showing } = this.state;
            if (showing === undefined) {
                return 'chevron-down';
            }
            return showing === true ?
                'chevron-up' :
                'chevron-down';
        };
        this.click = () => {
            let { showing } = this.state;
            showing = !showing;
            this.updateShowing(showing);
        };
        this.updateShowing = this.updateShowing.bind(this);
    }
    hideContent() {
        this.updateShowing(false);
    }
    updateShowing(showing) {
        this.setShowing(showing);
        this.dispatchEvent(new CustomEvent(dropChanged, {
            detail: {
                showing,
                dropElement: this // To track the element in a container if needed
            },
            bubbles: true,
            composed: true
        }));
    }
}
DropTool.state = {
    showing: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-drop-tool`, DropTool);

// Manages hiding the dropdowns when clicked outside
let _shown;
const dropdownManager = {
    setShown(shown) {
        _shown = shown;
    },
    hideShown(target) {
        if (_shown !== undefined &&
            _shown !== target) {
            _shown.hide();
        }
    }
};
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    //dropdownManager.hideShown(event.target);
};

//@ts-ignore
class Dropdown extends SelectableMixin(SelectionHandlerMixin(CustomElement)) {
    constructor() {
        super();
        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(dropChanged, this.onDropChanged);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(dropChanged, this.onDropChanged);
    }
    onDropChanged(event) {
        const { showing } = event.detail;
        if (showing === true) { // Hide the contents of other showing dropdowns abd set this one as being shown
            dropdownManager.hideShown(this);
            dropdownManager.setShown(this);
        }
        this.setShowing(showing);
        event.stopPropagation();
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName !== 'DIV' &&
            node.className !== 'dropdown') {
            return;
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        const childNode = node.childNodes[0]; //gcl-row
        this.dropTool = Array.from(childNode.childNodes).filter(n => n.id === 'drop-tool')[0];
        const slots = node.querySelectorAll('slot');
        this.headerSlot = slots[0];
        const contentSlot = slots[1];
        if (contentSlot === undefined) {
            throw Error('The content slot must have a child');
        }
        this.contentNode = contentSlot.assignedNodes({ flatten: true })[0];
        // Set the handler when the selection changes
        this.contentNode.setProperty('selectionChanged', this.handleSelectionChanged);
        // Set any initial selection
        const selection = this.contentNode.props.selection;
        if ((selection === null || selection === void 0 ? void 0 : selection.length) > 0) {
            this.handleSelectionChanged(selection);
        }
    }
    async handleSelectionChanged(selection) {
        //this.setValue(value, this.onValueSet); // Update the current value
        //this.validate(value); // No need to validate again since this happens on input
        const { hideOnSelection } = this.props;
        const { showing } = this.state;
        if (showing === true &&
            hideOnSelection === true) {
            this.hide();
        }
        // Update the display of the header
        const header = this.headerSlot.assignedNodes({ flatten: true })[0];
        if (this.contentData === undefined) {
            this.contentData = await this.contentNode.getData();
            if (this.contentData.payload !== undefined) {
                this.contentData = this.contentData.payload;
            }
        }
        const recordId = this.contentNode.props.recordId;
        switch (selection.length) {
            case 0:
                {
                    const { emptyDisplay } = this.props;
                    if ('setContent' in header) {
                        header.setContent(emptyDisplay);
                    }
                }
                break;
            case 1:
                {
                    const records = this.contentData.filter(r => r[recordId] === selection[0]);
                    const record = records[0];
                    const { displayField } = this.props;
                    if (typeof displayField === 'function') {
                        if ("setContent" in header) {
                            let node = displayField(record);
                            if (typeof node === 'string') {
                                node = markupToVDom(node.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
                            }
                            header.setContent(node);
                        }
                    }
                    else {
                        const displayValue = record[displayField];
                        header.setContent(displayValue);
                    }
                    // header.setProperty('record', record);
                }
                break;
            default: // Multiple selection
                {
                    const records = this.contentData.filter(r => selection.includes(r[recordId]));
                    header.setProperty('record', records);
                }
        }
        this.notifySelectionChanged(selection);
        this.callSelectionChanged(selection);
    }
    render() {
        const { showing } = this.state;
        return (h("div", { tabindex: "0", class: "dropdown" },
            h("gcl-row", null,
                h("slot", { id: "header", name: "header" }),
                h("gcl-drop-tool", { id: "drop-tool" })),
            h("div", { class: `dropdown-content ${showing ? 'show' : ''}` },
                h("slot", { name: "content" }))));
    }
    hide() {
        this.dropTool.hideContent();
    }
}
Dropdown.component = {
    styleUrls: [
        `${config.assetsFolder}/dropdown/Dropdown.css`
    ]
};
Dropdown.properties = {
    hideOnSelection: {
        attribute: 'hide-on-selection',
        type: Boolean,
        value: true
    },
    /**
     * The name of the field of the record to display its value in the dropdown header
     */
    displayField: {
        attribute: 'display-field',
        type: oneOf(String, Function),
        value: 'description'
    },
    /**
     * The text to display when there is no selection in the dropdown
     */
    emptyDisplay: {
        attribute: 'empty-display',
        type: oneOf(String, Function),
        value: 'Please select'
    }
};
Dropdown.state = {
    showing: {
        value: false
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-dropdown`, Dropdown);

/**
 * Mixin that handles errors
 * @param Base
 */
const ErrorableMixin = Base => { var _a; return _a = class Errorable extends Base {
        constructor(props, children) {
            super(props, children);
        }
        renderError() {
            const { error } = this.state;
            if (error === undefined) {
                return null;
            }
            return (h("gcl-overlay", null,
                h("gcl-alert", { type: "error", message: this.getErrorMessage(), closable: true, style: { maxWidth: '90%' }, close: () => {
                        this.setError(undefined);
                    } })));
        }
        /**
         * Tries to guess where the error message from the server is
         * @returns The error message from the server
         */
        getErrorMessage() {
            const { error } = this.state;
            if (error instanceof Error) {
                return error.message;
            }
            else { // Try to find the message of error returned by the server
                if (error.payload !== undefined) {
                    if (typeof error.payload === 'string') {
                        return error.payload;
                    }
                    else {
                        const payload = JSON.parse(error.payload);
                        if (payload.errors !== undefined) {
                            return Object.values(payload.errors).join('\n');
                        }
                        else if (payload.title !== undefined) {
                            return payload.title;
                        }
                    }
                }
                else {
                    return error.statusText;
                }
            }
        }
    },
    _a.state = {
        error: {
            value: undefined
        }
    },
    _a; };

/**
 * Renders a component based on its data
 */
const DataMixin = Base => { var _a; return _a = class Data extends Base {
        constructor(props, children) {
            super(props, children);
        }
        async getData() {
            // If it is loadable (it has an URL to load from), then load it
            const { loadUrl } = this.props;
            if (loadUrl !== undefined) {
                this.data = await this.load();
                return this.data;
            }
            if (this.data !== undefined) { // Return the cached data if any
                return this.data;
            }
            const { data } = this.props;
            if (data === undefined) {
                return undefined;
            }
            if (typeof data === 'function') { // If it is a function then call it
                this.data = data();
            }
            else { // An array of records
                this.data = data;
            }
            return this.data;
        }
        renderData() {
            const { fields } = this.props;
            let data = this.data;
            if (data === undefined) { // The data has not been cached, load it
                this.getData().then(data => {
                    this.setData(data);
                    this.data = data;
                });
                return null;
            }
            // if (data === undefined) {
            //     return this.renderNoData();
            // }
            if (data.payload !== undefined) {
                data = data.payload;
            }
            if (data.length === 0) { // The data was provided but it was empty
                return this.renderEmptyData();
            }
            const { renderRecord } = this;
            if (renderRecord !== undefined) {
                return data.map((record, index) => {
                    const markup = renderRecord(record, index);
                    if (typeof markup === 'string') {
                        const vNode = markupToVDom(markup.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
                        if (this.wrapRecord !== undefined) {
                            return this.wrapRecord(record, index, vNode);
                        }
                        else {
                            return vNode;
                        }
                    }
                    else {
                        return markup;
                    }
                });
            }
            else if (fields !== undefined) {
                const fds = typeof fields === 'function' ?
                    fields() :
                    fields;
                return this.renderFields(fds, data);
            }
            else { // Show the user the data
                return JSON.stringify(data);
            }
        }
        // renderField(field: DataFieldDefinition, data: any) : ElementNode {
        //     const value = data[field.name];
        //     return (<gcl-text>{value}</gcl-text>);
        // }
        renderNoData() {
            return null;
        }
        renderEmptyData() {
            return 'There is no data to display';
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.bindRenderRecord();
        }
        bindRenderRecord() {
            // This method is optional since the component might not use the data but have hardcoded children
            const renderRecord = this.props.renderRecord || this.renderRecord;
            if (renderRecord !== undefined) {
                this.renderRecord = renderRecord.bind(this);
            }
        }
    },
    _a.properties = {
        /**
         * The data fed into the element
         */
        data: {
            type: oneOf(Function, Array),
            mutable: true
        },
        /**
         * The definition of the fields to translate from the data of the record to the item component to generate
         */
        fields: {
            type: Array // Array<DataFieldDefinition>
        },
        /**
         * The function to render the data item
         */
        renderRecord: {
            attribute: 'render-record',
            type: Function,
            // change: (host, value) => {
            //     if (value !== undefined) {
            //         host.renderRecord = value.bind(host);
            //     }
            //     else {
            //         host.renderRecord = null;
            //     }
            // }
        }
    },
    _a; };

const FilterableMixin = Base => { var _a; return _a = class Filterable extends Base {
        updateFilter(filter) {
            const f = createFilter(filter);
            this.setFilter(f);
            this.load();
        }
    },
    _a.state = {
        filter: {}
    },
    _a; };

const LoadableMixin = Base => { var _a; return _a = class Loadable extends Base {
        constructor(props, children) {
            super(props, children);
            this.onLoadData = this.onLoadData.bind(this);
            this.onLoadError = this.onLoadError.bind(this);
        }
        renderLoading() {
            const { loading } = this.state;
            if (loading === false) {
                return null;
            }
            return (h("gcl-overlay", null,
                h("gcl-alert", { closable: "false", type: "info", message: "...Loading" })));
        }
        // abstract initLoader();
        // abstract load();
        onLoadData(data) {
            this.setLoading(false);
            this.setData(data.payload);
        }
        onLoadError(error) {
            this.setLoading(false);
            this.setError(error);
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.initLoader();
        }
    },
    _a.properties = {
        /**
         * The URL to retrieve the data from
         */
        loadUrl: {
            attribute: 'load-url',
            type: String,
            //required: true Loading the form or other component might be optional
        },
        /**
         * Whether to load the data for the component when the component is connected
         */
        autoLoad: {
            attribute: 'auto-load',
            type: Boolean,
            value: true
        }
    },
    _a.state = {
        loading: {
            value: false
        }
    },
    _a; };

const PageableMixin$1 = Base => { var _a; return _a = class Pageable extends Base {
        paginate(pageIndex, pageSize) {
            this.setPageIndex(pageIndex);
            this.setPageSize(pageSize);
            this.load();
        }
    },
    _a.state = {
        pageIndex: {
            value: 1
        },
        pageSize: {
            value: 10
        }
    },
    _a; };

const sorterChanged = 'sorterChanged';
//@ts-ignore
class SorterTool extends Tool {
    constructor() {
        super(...arguments);
        this.iconName = () => {
            const { ascending } = this.state;
            if (ascending === undefined) {
                return 'arrow-down-up';
            }
            return ascending === true ?
                'arrow-up' :
                'arrow-down';
        };
        this.click = () => {
            let { ascending } = this.state;
            ascending = !ascending;
            this.setAscending(ascending);
            const { field } = this.props;
            this.dispatchEvent(new CustomEvent(sorterChanged, {
                detail: {
                    field,
                    ascending,
                    sorterElement: this // Send this element to track the current sorter
                },
                bubbles: true,
                composed: true
            }));
        };
    }
}
SorterTool.properties = {
    /**
     * The name of the field to sort
     */
    field: {
        type: String,
        required: true
    }
};
SorterTool.state = {
    ascending: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-sorter-tool`, SorterTool);

const SortableMixin = Base => { var _a; return _a = class Sortable extends Base {
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.addEventListener(sorterChanged, this.handleSorterChanged);
        }
        disconnectedCallback() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.removeEventListener(sorterChanged, this.handleSorterChanged);
        }
        handleSorterChanged(event) {
            const { field, ascending, sorterElement } = event.detail;
            if (this.sorterElement === undefined) {
                this.sorterElement = sorterElement;
            }
            else if (this.sorterElement !== sorterElement) {
                this.sorterElement.setAscending(undefined);
                this.sorterElement = sorterElement;
            }
            this.setSorters([
                {
                    field,
                    order: ascending === true ?
                        'asc' :
                        'desc'
                }
            ]);
            this.load();
            event.stopPropagation();
        }
    },
    _a.state = {
        sorters: []
    },
    _a; };

/**
 * Implements a mixin that loads a collection of records
 */
const CollectionLoadableMixin = Base => class CollectionLoadable extends PageableMixin$1(SortableMixin(FilterableMixin(LoadableMixin(Base)))) {
    async load() {
        const { loadUrl } = this.props;
        if (loadUrl === undefined) {
            console.warn(`Missing load URL`);
            return;
        }
        const { pageIndex, pageSize, filter, sorters } = this.state;
        this.setError(undefined);
        this.setLoading(true);
        if (this._loader === undefined) {
            this.initLoader();
        }
        else {
            return await this._loader.load({
                url: loadUrl,
                top: pageSize,
                skip: pageSize * (pageIndex - 1),
                filter,
                orderBy: sorters
            });
        }
    }
    initLoader() {
        const { loadUrl, autoLoad } = this.props;
        if (loadUrl !== undefined) {
            this._loader = new CollectionLoader({
                onData: this.onLoadData,
                onError: this.onLoadError
            });
            if (autoLoad === true) {
                this.load();
            }
        }
    }
};

/**
 * Packs the common used mixins in a loading a collection of records scenario
 */
const DataCollectionLoadableMixin = Base => class DataCollectionLoadable extends CollectionLoadableMixin(ErrorableMixin(DataMixin(Base))) {
};

//@ts-ignore
class Table extends DataCollectionLoadableMixin(CustomElement) {
    render() {
        const { caption, header, body, footer } = this.props;
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            h("table", null,
                caption || null,
                header || this.renderHeader(),
                body || this.renderBody(),
                footer || null)));
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
        return (h("tbody", null, this.renderData()));
    }
    renderRecord(record, i) {
        const { columns, rowClick, rowDoubleClick, cellClick } = this.props;
        return (h("tr", { onClick: () => rowClick && rowClick(record, i), onDblClick: () => rowDoubleClick && rowDoubleClick(record, i) }, columns.map((c, j) => {
            if (c.render) {
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, c.render(record)));
            }
            else {
                const value = record[c.name];
                return (h("td", { onClick: () => cellClick && cellClick(record, i, j) }, value));
            }
        })));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.bindRenderRecord();
        this.initLoader();
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
        type: ElementNode
    },
    /**
     * The header of the table
     */
    header: {
        type: ElementNode
    },
    /**
     * The body of the table
     */
    body: {
        type: ElementNode
    },
    /**
     * The footer of the table
     */
    footer: {
        type: ElementNode
    },
    /**
     * The definition of the columns of the table
     */
    columns: {
        type: Array // Array<TableColumnDefinition>
    },
    rowClick: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);

/**
 * Allows a component to be selected when clicked
 */
const SelectableOnClickMixin = Base => { var _a; return _a = class SelectableOnClick extends SelectableMixin(Base) {
        constructor() {
            super();
            this.toggleSelect = this.toggleSelect.bind(this);
        }
        nodeDidConnect(node) {
            var _a;
            (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
            const { selectable } = this.props;
            if (selectable === true) {
                node.addEventListener('click', this.toggleSelect);
            }
        }
        // attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        //     if (super.attributeChangedCallback) {
        //         super.attributeChangedCallback(attributeName, oldValue, newValue);
        //     }
        //     if (attributeName === "selectable") {
        //         if (newValue === "true" || newValue === "") {
        //             this.addEventListener('click', this.toggleSelect);
        //         }
        //         else { // newValue === "false"
        //             if (this.props.selected) { // Unselect if selected
        //                 this.setSelected(false);
        //                 this.dispatchEvent(new CustomEvent(selectionChanged, {
        //                     detail: {
        //                         child: this,
        //                         removed: this.props.value
        //                     },
        //                     bubbles: true,
        //                     composed: true
        //                 }));
        //             }
        //             this.removeEventListener('click', this.toggleSelect);
        //         }
        //     }
        // }
        toggleSelect() {
            const { selectable, selected } = this.props;
            if (!selectable) {
                return;
            }
            this.setSelected(!selected);
            this.notifySelectionChanged(undefined);
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/selectable/on-click/SelectableOnClick.css`
        ]
    },
    _a; };

class ListItem extends SelectableOnClickMixin(SizableMixin(ChildMixin(CustomElement))) {
    render() {
        const { size } = this.props;
        return (h("li", { size: size },
            h("slot", null)));
    }
}
ListItem.component = {
    styleUrls: [
        `${config.assetsFolder}/list/list-item/ListItem.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list-item`, ListItem);

const SelectionContainerMixin = Base => { var _a; return _a = 
//@ts-ignore
class SelectionContainer extends SelectionHandlerMixin(ContainerMixin(Base)) {
        connectedCallback() {
            super.connectedCallback();
            this.updateSelection = this.updateSelection.bind(this);
            const { selectable } = this.props;
            if (selectable === true) {
                this.addEventListener('selectionChanged', this.updateSelection);
            }
        }
        attributeChangedCallback(attributeName, oldValue, newValue) {
            var _a;
            (_a = super.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, attributeName, oldValue, newValue);
            if (attributeName === "selectable") {
                if (newValue === "true" || newValue === "") {
                    this.addEventListener('selectionChanged', this.updateSelection);
                }
                else { // newValue === "false"
                    this.removeEventListener('selectionChanged', this.updateSelection);
                }
            }
        }
        updateSelection(e) {
            const { multiple, selection } = this.props;
            const { child, selectableValue, selected } = e.detail;
            if (multiple !== undefined) { // Add values to the selection
                if (selected === true) {
                    this.setSelection([...selection, selectableValue]);
                }
                else {
                    const index = selection.indexOf(selectableValue);
                    selection.splice(index, 1);
                    this.setSelection(selection);
                }
            }
            else { // Replace the old selection with the new one
                const { selectedChild } = this.state;
                // Deselect previous selected child
                if (selectedChild !== undefined) {
                    selectedChild.setSelected(false);
                }
                if (selected === true) {
                    if (selectableValue !== undefined) {
                        this.setSelection([selectableValue]);
                    }
                    else {
                        this.setSelection(selection);
                    }
                    this.setSelectedChild(child);
                }
                else {
                    this.setSelection([]);
                    this.setSelectedChild(undefined);
                }
            }
            this.callSelectionChanged(this.props.selection); // Get the fresh selection from the props
        }
        onChildAdded(child) {
            var _a;
            (_a = super.onChildAdded) === null || _a === void 0 ? void 0 : _a.call(this, child);
            // If any of the values of the selection match the value of the child, then set the child as selected
            const { multiple, selectable } = this.props;
            const selection = this.props.selection || [];
            if (selectable !== true) {
                return;
            }
            const childProps = child.props || {};
            const selectableValue = childProps.selectableValue;
            if (selection.includes(selectableValue) &&
                child.setSelected !== undefined) {
                child.setSelected(true);
                if (multiple === undefined) { // Set the selected child for single selection model
                    this.setSelectedChild(child);
                }
            }
        }
    },
    _a.properties = {
        /**
         * Whether the container is selectable
         */
        selectable: {
            type: Boolean,
            value: true,
            reflect: true,
            passToChildren: true
        },
        /**
         * Whether we can process multiple selection (false by default)
         */
        multiple: {
            type: Boolean,
            reflect: true
        },
        /**
         * The selected item or items. It is an attribute since it can be passed through a property initally
         */
        selection: {
            type: Array,
            value: [],
            mutable: true,
            reflect: true
        },
        /**
         * The name of the property that identifies the record id
         */
        recordId: {
            attribute: 'record-id',
            type: String,
            value: 'id'
        }
    },
    _a.state = {
        /**
         * To track the current selected child for a single selection model
         */
        selectedChild: {
            value: undefined
        }
    },
    _a; };

class List extends SelectionContainerMixin(SizableMixin(DataCollectionLoadableMixin(CustomElement))) {
    render() {
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            h("ul", null, this.renderHeader()),
            h("ul", null, this.renderData())));
    }
    renderHeader() {
        const { fields } = this.props;
        if (fields === undefined) {
            return null;
        }
        const fds = typeof fields === 'function' ? fields() : fields;
        const children = fds.map(f => {
            const sorter = f.sortable !== false ?
                (h("gcl-sorter-tool", { field: f.name })) :
                null;
            return (h("span", { class: "list-cell", style: {
                    width: f.width || '100px'
                } },
                f.display,
                sorter));
        });
        return (h("gcl-list-item", { selectable: "false" }, children));
    }
    renderFields(fields, data) {
        const { recordId } = this.props;
        return data.map(record => {
            const value = record[recordId];
            const children = fields.map(f => {
                return (h("span", { class: "list-cell", style: {
                        width: f.width || '100px'
                    } }, record[f.name]));
            });
            return (h("gcl-list-item", { value: value }, children));
        });
    }
    /**
     * When there is no data provided to the component, render its children
     */
    renderNoData() {
        return (h("ul", null,
            h("slot", null)));
    }
}
List.component = {
    styleUrls: [
        `${config.assetsFolder}/list/List.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list`, List);

const TargetViewHolderMixin = Base => { var _a; return _a = class TargetViewHolder extends Base {
        /**
         * Called when the node and siblings have been connected
         */
        nodeDidConnect() {
            var _a;
            (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this);
            const { targetView } = this.props;
            if (typeof targetView === 'string') {
                this.targetView = document.getElementById(targetView);
            }
            else if (typeof targetView === 'function') {
                this.targetView = targetView();
            }
            else {
                this.targetView = targetView;
            }
            if (this.targetView === null) {
                throw Error(`Could not find target view with : ${targetView.toString()}`);
            }
        }
        nodeWillDisconnect() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.targetView = null;
        }
    },
    _a.properties = {
        /**
         * The id of the target view to act upon
         */
        targetView: {
            attribute: 'target-view',
            type: Object,
            required: true
        }
    },
    _a; };

/**
 * Pager component
 */
//@ts-ignore
class Pager extends TargetViewHolderMixin(SizableMixin(CustomElement)) {
    constructor() {
        super();
        this.goFirst = this.goFirst.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goLast = this.goLast.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }
    goFirst() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        pageIndex = 1;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goPrevious() {
        let { pageIndex, pageSize } = this.state;
        if (pageIndex == 1) {
            return;
        }
        --pageIndex;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goNext() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        ++pageIndex;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    goLast() {
        let { pageIndex, pageSize } = this.state;
        const { totalPages } = this.props;
        if (pageIndex === totalPages) {
            return;
        }
        pageIndex = totalPages;
        this.setPageIndex(pageIndex);
        this.targetView.paginate(pageIndex, pageSize);
    }
    render() {
        const { pageIndex } = this.state;
        const { totalPages, size } = this.props;
        return (h(Fragment, { "justify-content": "center" },
            h("gcl-button", { variant: "primary", size: size, onClick: this.goFirst, disabled: pageIndex === 1 },
                h("gcl-icon", { name: "chevron-double-left" })),
            h("gcl-button", { variant: "primary", size: size, onClick: this.goPrevious, disabled: pageIndex === 1 },
                h("gcl-icon", { name: "chevron-left" })),
            pageIndex,
            " of ",
            totalPages,
            h("gcl-button", { variant: "primary", size: size, onClick: this.goNext, disabled: pageIndex === totalPages },
                h("gcl-icon", { name: "chevron-right" })),
            h("gcl-button", { variant: "primary", size: size, onClick: this.goLast, disabled: pageIndex === totalPages },
                h("gcl-icon", { name: "chevron-double-right" })),
            this.renderSizeChanger()));
    }
    renderSizeChanger() {
        const { pageSizes } = this.props;
        if (pageSizes === undefined) {
            return null;
        }
        return (h("gcl-row", null,
            h("gcl-select", { data: pageSizes, style: { minWidth: '4rem', width: '4rem' }, change: this.changePageSize }),
            h("span", null, "/ Page")));
    }
    changePageSize(value) {
        const pageIndex = 1; // Reset to start
        this.setPageIndex(pageIndex);
        const pageSize = parseInt(value);
        this.setPageSize(pageSize);
        this.targetView.paginate(pageIndex, pageSize);
    }
}
Pager.component = {
    styleUrls: [
        `${config.assetsFolder}/pager/Pager.css`
    ]
};
Pager.properties = {
    /**
     * The total of pages
     */
    totalPages: {
        attribute: 'total-pages',
        type: Number,
        value: 1,
        required: true
    },
    pageSizes: {
        attribute: 'page-sizes',
        type: Array,
        value: ['10', '25', '50', '100']
    }
};
Pager.state = {
    pageIndex: {
        value: 1
    },
    pageSize: {
        value: 10
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-pager`, Pager);

const texts = {
    // Comparison operators
    'eq': 'Equals',
    'ne': 'Not equals',
    'gt': 'Greater than',
    'ge': 'Greater than or equals',
    'lt': 'Less than',
    'le': 'Less than or equals',
    // Logical operators
    'not': 'Not',
    'and': 'And',
    'or': 'Or',
    // String functions
    'contains': 'Contains',
    'startswith': 'Starts with',
    'endswith': 'Ends with'
};
const getText = operator => {
    const text = texts[operator];
    if (!text) {
        throw new Error(`Text not found for operator: '${operator}'`);
    }
    return text;
};
const filterChanged = 'filterChanged';
/**
 * Component to filter data requests of the target view
 */
class FilterField extends CustomElement {
    constructor() {
        super();
        this.operatorChanged = this.operatorChanged.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
    }
    render() {
        const { field, operators } = this.props;
        const select = (h("gcl-select", { slot: "after-label", name: "operator", "empty-option": {
                description: '--Select Operator--',
                code: ''
            }, data: this.operatorsToOptions(operators), change: this.operatorChanged }));
        this.fieldName = field.props['name'];
        field.props['input'] = this.valueChanged;
        field.children.push(select);
        return field;
    }
    operatorsToOptions(operators) {
        return operators.map(operator => {
            return {
                code: operator,
                description: getText(operator)
            };
        });
    }
    operatorChanged(operator) {
        this.operator = operator;
        const { fieldName, value } = this;
        if (value === undefined) {
            return; // Ignore when the operator has changed if there is no value to filter
        }
        this.dispatchEvent(new CustomEvent(filterChanged, {
            detail: {
                field: fieldName,
                operator,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
    valueChanged(value) {
        this.value = value;
        const { fieldName, operator } = this;
        if (operator === undefined) {
            return; // Ignore when the value has changed if there is no operator to filter
        }
        this.dispatchEvent(new CustomEvent(filterChanged, {
            detail: {
                field: fieldName,
                operator,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
}
FilterField.properties = {
    /**
     * The field to render
     */
    field: {
        type: ElementNode,
        required: true
    },
    /**
     * The operators of the filter
     */
    operators: {
        type: Array,
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-filter-field`, FilterField);

/**
 * Component to filter data requests of the target view
 */
class FilterPanel extends TargetViewHolderMixin(CustomElement) {
    constructor() {
        super(...arguments);
        /**
         * The collection of filters to create the query from
         */
        this.filters = [];
    }
    render() {
        return (h("div", null,
            h("slot", null)));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(filterChanged, this.handleFilterChanged);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(filterChanged, this.handleFilterChanged);
    }
    handleFilterChanged(event) {
        const { field, operator, value } = event.detail;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            const filter = this.getFilter(field, operator, value);
            this.targetView.updateFilter(filter);
        }, 1000);
        event.stopPropagation();
    }
    getFilter(field, operator, value) {
        if (field === undefined) {
            throw new Error('Field name is required.');
        }
        if (operator === undefined) {
            throw new Error('Operator is required.');
        }
        // Unique filters by field name for this component
        let selectedFilters = this.filters.filter(f => f.field === field);
        switch (selectedFilters.length) {
            case 0:
                { // Filter does not exist
                    if (value) {
                        this.filters.push({
                            field,
                            operator,
                            value
                        });
                    }
                }
                break;
            case 1:
                {
                    if (operator === undefined || value === undefined) { // Remove the filter by field name when the operator or the value are empty
                        const item = this.filters.find(f => f.field === field);
                        const index = this.filters.indexOf(item);
                        this.filters.splice(index, 1);
                    }
                    else { // Update the operator and value of existing filter
                        let filter = selectedFilters[0];
                        filter.operator = operator;
                        filter.value = value;
                    }
                }
                break;
            default: // Duplicate filter
                throw new Error(`Duplicate filters for field: '${field}'`);
        }
        // Update the filter to send to the server
        switch (this.filters.length) {
            case 0: return null;
            case 1: return this.filters[0];
            default:
                return {
                    operator: 'and',
                    filters: this.filters
                };
        }
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-filter-panel`, FilterPanel);

const ValidatableMixin = Base => { var _a; return _a = class Validatable extends Base {
    },
    _a.properties = {
        validators: {
            type: Array,
            mutable: true,
            value: []
        }
    },
    _a.state = {
        validationErrors: [],
        validationWarnings: []
    },
    _a; };

const renderWhenVisible = Symbol('renderWhenVisible');
const VisibleMixin = Base => { var _a; return _a = class Visible extends Base {
        render() {
            const { visible } = this.props;
            return visible === true ?
                this[renderWhenVisible]() :
                null;
        }
    },
    _a.properties = {
        /**
         * Whether the element is visible
         */
        visible: {
            type: Boolean,
            value: true,
            mutable: true,
            reflect: true
        }
    },
    _a; };

/**
 * Allows a component to be named
 */
const NamedMixin = Base => { var _a; return _a = class Named extends Base {
    },
    _a.properties = {
        /**
         * The name of the component
         */
        name: {
            type: String
        }
    },
    _a; };

const valueChanged = 'valueChanged';
/**
 * Allows a component to have a value
 */
const ValuedMixin = Base => { var _a; return _a = 
//@ts-ignore
class Valued extends NamedMixin(Base) {
        updateValue(value) {
            const { name } = this.props;
            this.setValue(value); // Update the current value
            this.dispatchEvent(new CustomEvent(valueChanged, {
                detail: {
                    name,
                    value
                },
                bubbles: true,
                composed: true
            }));
        }
    },
    _a.properties = {
        value: {
            type: oneOf(String, Object),
            mutable: true,
            reflect: true
        },
    },
    _a; };

const renderField = Symbol('renderField');
//@ts-ignore
class Field extends VisibleMixin(ValidatableMixin(SizableMixin(ChildMixin(ValuedMixin(CustomElement))))) {
    constructor() {
        super();
        this.onBlur = this.onBlur.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    [renderWhenVisible]() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h(Fragment, null,
            h("gcl-row", null,
                h("gcl-row", null,
                    h("slot", { name: "before-label" }),
                    this.renderLabel(),
                    h("slot", { name: "after-label" })),
                this[renderField]()),
            h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors })));
    }
    renderLabel() {
        const { label, name, size, required } = this.props;
        if (label === undefined) {
            return null;
        }
        if (label.isText) {
            return (h("label", { for: name, size: size, required: required }, label));
        }
        else { // ElementNode
            return label;
        }
    }
    hasRequiredValidator() {
        const { validators = [] } = this.props;
        return validators.filter(v => v instanceof RequiredValidator).length > 1;
    }
    // onValidationFailed(error: string): void {
    //     this.setError(error);
    // }
    // connectedCallback() {
    //     super.connectedCallback?.();
    //     let {
    //         validationFailedHandler
    //     } = this.props;
    //     if (validationFailedHandler === undefined) {
    //         this.setValidationFailedHandler(this);
    //     }
    // }
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'required') {
            if (newValue === "true") { // Add a required validator
                if (!this.hasRequiredValidator()) {
                    const { validators = [] } = this.props;
                    this.setValidators([...validators, new RequiredValidator()]);
                }
            }
            else { // remove any existing required validator
                if (this.hasRequiredValidator()) {
                    const { validators } = this.props;
                    const requiredValidator = validators.filter(v => v instanceof RequiredValidator)[0];
                    if (requiredValidator !== undefined) {
                        const index = validators.indexOf(requiredValidator);
                        validators.splice(index, 1);
                        this.setValidators([validators]);
                    }
                }
            }
        }
        super.attributeChangedCallback(attributeName, oldValue, newValue);
    }
    onBlur() {
        //this.validate();
    }
    /**
     * Validates a field against a given value
     * @param value The value to validate
     * @returns true is the value is valid, false otherwise
     */
    validate(value) {
        let { label } = this.props;
        const { name, validators } = this.props;
        // Extract the text of the label
        if (label === undefined) {
            label = name;
        }
        else if (label.isVirtualText) {
            label = label.text;
        }
        // Reset warnings and errors
        this.setValidationWarnings([]);
        this.setValidationErrors([]);
        const context = {
            errors: [],
            warnings: [],
            label,
            value
        };
        // Validate
        validators.forEach((validator) => validator.validate(context));
        // Show warnings and errors
        if (context.warnings.length > 0) {
            this.setValidationWarnings(context.warnings);
        }
        if (context.errors.length > 0) {
            this.setValidationErrors(context.errors);
            return false;
        }
        return true;
    }
    onInput(event) {
        // Retrieve the new value
        const target = event.target;
        const value = this.getNewValue(target);
        //this.setValue(value); // Do not update the current value, since it can keep changing
        const valid = this.validate(value); // Validate the field on input
        if (!valid) {
            return;
        }
        const { input } = this.props;
        if (input !== undefined) {
            input(value);
        }
    }
    onChange(event) {
        const { change } = this.props;
        // Retrieve the new value
        const target = event.target;
        const value = this.getNewValue(target);
        if (change !== undefined) {
            change(value);
        }
        else {
            this.updateValue(value);
        }
    }
    getNewValue(input) {
        let value;
        switch (input.type) {
            case 'file':
                {
                    const { files } = input;
                    if (files.length === 0) { // No files selected
                        return value;
                    }
                    if (input.multiple === true) {
                        value = Array.from(files).map(f => {
                            return {
                                name: f.name,
                                type: f.type,
                                size: f.size,
                                content: URL.createObjectURL(f)
                            };
                        });
                    }
                    else {
                        const f = files[0];
                        value = {
                            name: f.name,
                            type: f.type,
                            size: f.size,
                            content: URL.createObjectURL(f)
                        };
                    }
                }
                break;
            default:
                {
                    value = input.value;
                }
                break;
        }
        return value;
    }
}
Field.component = {
    styleUrls: [
        `${config.assetsFolder}/field/Field.css`
    ]
};
Field.properties = {
    label: {
        type: ElementNode
    },
    disabled: {
        type: Boolean,
        mutable: true,
        reflect: true
    },
    required: {
        type: Boolean,
        mutable: true,
        reflect: true
    },
    /**
     * Custom input handler
     */
    input: {
        type: Function
    },
    /**
     * Custom change handler
     */
    change: {
        type: Function
    }
};

//@ts-ignore
class TextField extends Field {
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/TextField/TextField.css`
    //     ]
    // };
    [renderField]() {
        const { name, value, size, 
        //required,
        disabled } = this.props;
        return (h("input", { type: "text", name: name, id: name, size: size, 
            //class={this.getCSSClass()}
            //required={required}
            // style={{ maxWidth, width }}
            value: value, onInput: this.onInput, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-text-field`, TextField);

//@ts-ignore
class TextArea extends Field {
    [renderField]() {
        const { name, value, rows, cols, size, 
        //required,
        disabled } = this.props;
        return (h("textarea", { name: name, id: name, rows: rows, cols: cols, 
            //class={this.getCSSClass()}
            size: size, 
            //required={required}
            // style={{ maxWidth, width }}
            // className={inputClass}
            onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }, value !== undefined ? value : null));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/TextField/TextField.css`
//     ]
// };
TextArea.properties = {
    rows: {
        type: Number
    },
    cols: {
        type: Number
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text-area`, TextArea);

function getComponentMetadata(ctor) {
    var _a;
    const metadata = {
        properties: {},
        state: {}
    };
    while (ctor !== undefined) {
        const { properties, state } = ctor;
        // Merge the property descriptors
        metadata.properties = Object.assign(Object.assign({}, metadata.properties), properties);
        // Merge the state descriptor
        metadata.state = Object.assign(Object.assign({}, metadata.state), state);
        ctor = (_a = Object.getPrototypeOf(ctor.prototype)) === null || _a === void 0 ? void 0 : _a.constructor;
    }
    return metadata;
}
/**
 * Mixin that initializes the properties for the component
 */
const ComponentMetadataInitializerMixin = Base => { var _a; return _a = class ComponentMetadataInitializer extends Base {
        constructor(props, children) {
            super(props, children);
            if (this.constructor.metadata === undefined) {
                this.constructor.metadata = getComponentMetadata(this.constructor);
            }
            const { properties, state } = this.constructor.metadata;
            // Properties
            this.props = props || {};
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
            const { attribute, //  The name of the JSX attribute mapped to the property       
            value, // The default value of the property if no attribute is set in the JSX
            mutable } = propertyDescriptor;
            if (this.props[name] === undefined) { // Property is not initialized
                if (attribute !== undefined && attribute !== name) {
                    const val = this.props[attribute]; // See if that attribute has a value set
                    if (val !== undefined) {
                        this.props[name] = val;
                        delete this.props[attribute];
                    }
                }
                if (this.props[name] === undefined && // The value was not set from the attribute
                    value !== undefined) { // It has a default value
                    this.props[name] = value;
                }
            }
            if (mutable === true) { // Generate a setter
                const setter = function (newValue, callback) {
                    const oldValue = this.props[name];
                    if (oldValue === newValue) {
                        return;
                    }
                    //TODO: Research if this validation is necessary for components
                    //this.validatePropertyOptions(name, newValue, options);
                    // console.log(`Property: '${name}' of component: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                    this.props[name] = newValue;
                    this.requestUpdate();
                    callback === null || callback === void 0 ? void 0 : callback();
                };
                var setterName = this.getSetterName(name);
                this[setterName] = setter.bind(this);
            }
        }
        initializeState(name, stateDescriptor) {
            const { value } = stateDescriptor;
            if (value !== undefined) { // Initialize the state to the default value if any
                this.state[name] = value;
            }
            const setter = function (newValue) {
                const oldValue = this.state[name];
                if (oldValue === newValue) {
                    return;
                }
                // console.log(`State: '${name}' of component: [${this.constructor.name}] changed values. Old: <${oldValue}>, new: <${newValue}>`);
                this.state[name] = newValue;
                this.requestUpdate();
            };
            var setterName = this.getSetterName(name);
            this[setterName] = setter.bind(this);
        }
        getSetterName(name) {
            return `set${name[0].toUpperCase()}${name.substring(1)}`;
        }
    },
    /** The merged properties from the ones declared in the component and the mixins */
    _a.metadata = undefined,
    _a; };

class Component extends VirtualDomMixin(ComponentMetadataInitializerMixin(ComponentNode)) {
    constructor(props, children) {
        super(props, children);
    }
    get document() {
        const { parent } = this.props;
        return parent.shadowRoot !== null ?
            parent.shadowRoot :
            parent;
    }
}

// The select component expect children of they option. It will ignore any other component
// Therefore, to output that, we need to extend Component instead of CustomElement
//@ts-ignore
class SelectOptions extends DataMixin(Component) {
    constructor(props, children) {
        super(props, children);
        this.bindRenderRecord();
    }
    render() {
        return (h(Fragment, null,
            this.renderEmptyOption(),
            this.renderData()));
    }
    renderEmptyOption() {
        const { valueProperty, displayProperty, emptyOption } = this.props;
        if (emptyOption === undefined) {
            return null;
        }
        return (h("option", { value: emptyOption[valueProperty] }, emptyOption[displayProperty]));
    }
    renderRecord(record, index) {
        const { valueProperty, displayProperty, selected, emptyOption, parent } = this.props;
        if (typeof record === 'object') { // Not a primitive
            const value = record[valueProperty];
            if (selected === undefined) {
                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {
                    parent.setValue(value); // Update the value in the parent
                    return (h("option", { value: value, selected: true }, record[displayProperty]));
                }
                else {
                    return (h("option", { value: value }, record[displayProperty]));
                }
            }
            else { // selected !== undefined
                const isSelected = Array.isArray(selected) ? selected.includes(value) : selected === value;
                return (h("option", { value: value, selected: isSelected }, record[displayProperty]));
            }
        }
        else { // Is a primitive
            if (selected === undefined) {
                // Select the first option if there is no selected value and no empty option
                if (emptyOption === undefined &&
                    index === 0) {
                    parent.setValue(record); // Update the value in the parent
                    return (h("option", { value: record, key: record, selected: true }, record));
                }
                else {
                    return (h("option", { value: record, key: record }, record));
                }
            }
            else { // selected !== undefined
                const isSelected = Array.isArray(selected) ? selected.includes(record) : selected === record;
                return (h("option", { value: record, key: record, selected: isSelected }, record));
            }
        }
    }
}
SelectOptions.properties = {
    /**
     * The name of the property to map the value of the option
     */
    valueProperty: {
        attribute: 'value-property',
        type: String,
        value: 'code'
    },
    displayProperty: {
        attribute: 'display-property',
        type: String,
        value: 'description'
    },
    emptyOption: {
        attribute: 'empty-option',
        type: Object
    },
    selected: {
        type: Object
    }
};

//@ts-ignore
class Select extends ErrorableMixin(CollectionLoadableMixin(Field)) {
    [renderField]() {
        const { name, value, size, 
        //required,
        disabled, style } = this.props;
        return (h("select", { name: name, id: name, style: style, value: value, size: size, onInput: this.onInput, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, disabled: disabled }, this.renderOptions()));
    }
    renderOptions() {
        const { valueProperty, displayProperty, emptyOption, options, data, value // The value of the select
         } = this.props;
        if (options === undefined) {
            if (data !== undefined) {
                return (h(SelectOptions, { "value-property": valueProperty, "display-property": displayProperty, "empty-option": emptyOption, data: data, parent: this, selected: value }));
            }
            else {
                return null; // No options and no data
            }
        }
        else { // Display the options
            if (emptyOption !== undefined) {
                // Prepend the empty option
                options.prependChildNode(h("option", { value: emptyOption[valueProperty] }, emptyOption[displayProperty]));
            }
            return options;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.initLoader();
    }
}
Select.properties = {
    emptyOption: {
        attribute: 'empty-option',
        type: Object
    },
    options: {
        type: ElementNode
    },
    style: {
        type: String
    },
    // Properties to pass through to the SelectOptions
    /**
     * The name of the property to map the value of the option
     */
    valueProperty: {
        attribute: 'value-property',
        type: String,
        value: 'code'
    },
    displayProperty: {
        attribute: 'display-property',
        type: String,
        value: 'description'
    },
    // We did not use the DataLoadingMixin becase we only use this property to pass through the SelectOptions component
    /**
     * The data fed into the element
     */
    data: {
        type: Array,
        mutable: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-select`, Select);

//@ts-ignore
class ComboBox extends Field {
    constructor() {
        super();
        this.handleSelection = this.handleSelection.bind(this);
    }
    handleSelection(selection) {
        let newValue;
        const { emptyValue, value } = this.props;
        switch (selection.length) {
            case 0:
                {
                    newValue = emptyValue;
                }
                break;
            case 1:
                {
                    newValue = selection[0];
                }
                break;
            default:
                {
                    newValue = selection;
                }
                break;
        }
        if (value !== newValue) {
            this.setValue(newValue);
        }
    }
    onValueSet(value) {
        console.log(value);
    }
    [renderField]() {
        const { 
        //name,
        value, loadUrl, autoLoad, size,
        //required,
        //disabled
         } = this.props;
        return (h("gcl-dropdown", { "selection-changed": this.handleSelection, "display-field": "description" },
            h("gcl-display", { id: "header", slot: "header" }),
            h("gcl-data-grid", { id: "content", slot: "content", "load-url": loadUrl, autoLoad: autoLoad, fields: this.getFields, size: size, selection: value === undefined ? value : [...value], "record-id": "description" })));
        // return (
        //     <input
        //         type="text"
        //         name={name}
        //         id={name}
        //         size={size} // Needed for the CSS to get the right size
        //         //class={this.getCSSClass()}
        //         //required={required}
        //         // style={{ maxWidth, width }}
        //         value={value}
        //         onInput={this.onInput}
        //         onChange={this.onChange}
        //         // onFocus={onFocus}
        //         onBlur={this.onBlur}
        //         // title={error}
        //         // ref={i => this.inputref = i}
        //         disabled={disabled}
        //     />
        // );
    }
    getFields() {
        return [
            {
                name: "description",
                display: "Gender",
                width: '100%'
            }
        ];
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/comboBox/ComboBox.css`
//     ]
// };
ComboBox.properties = {
    /**
     * The URL to retrieve the data from
     */
    loadUrl: {
        attribute: 'load-url',
        type: String,
        //required: true Loading the form or other component might be optional
    },
    /**
     * Whether to load the data for the component when the component is connected
     */
    autoLoad: {
        attribute: 'auto-load',
        type: Boolean,
        value: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-combo-box`, ComboBox);

//@ts-ignore
class HiddenField extends Field {
    render() {
        const { name, value, } = this.props;
        return (h("input", { type: "hidden", name: name, value: value }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-hidden-field`, HiddenField);

const MinMaxMixin = Base => { var _a; return _a = class MinMax extends Base {
    },
    _a.properties = {
        min: {
            type: String
        },
        max: {
            type: String
        }
    },
    _a; };

//@ts-ignore
class NumberField extends MinMaxMixin(Field) {
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/numberField/NumberField.css`
    //     ]
    // };
    [renderField]() {
        const { name, value, 
        //required,
        min, max, size, disabled } = this.props;
        return (h("input", { type: "number", name: name, id: name, min: min, max: max, size: size, 
            // class={this.getCSSClass()}
            //required={required}
            // style={{ maxWidth, width }}
            // className={inputClass}
            value: value, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-number-field`, NumberField);

//import { formatDate} from 'gclib-utils';
function formatDate(value) {
    const i = value.indexOf('T');
    return value.substr(0, i);
}
//@ts-ignore
class DateField extends MinMaxMixin(Field) {
    // static component = {
    //     styleUrls: [
    //         `${config.assetsFolder}/DateField/DateField.css`
    //     ]
    // };
    [renderField]() {
        const { name, value, min, max, size, 
        //required,
        disabled } = this.props;
        return (h("input", { type: "date", name: name, id: name, 
            //class={this.getCSSClass()}
            min: min, max: max, size: size, 
            //required={required}
            style: { minWidth: '150px' }, value: value !== undefined ? formatDate(value) : undefined, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, 
            // title={error}
            // ref={i => this.inputref = i}
            disabled: disabled }));
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-date-field`, DateField);

function formatSize(size) {
    if (size < 1024) {
        return size + 'bytes';
    }
    else if (size >= 1024 && size < 1048576) {
        return (size / 1024).toFixed(1) + 'KB';
    }
    else if (size >= 1048576) {
        return (size / 1048576).toFixed(1) + 'MB';
    }
}
//@ts-ignore
class FileField extends Field {
    constructor() {
        super();
        this.openFileDialog = this.openFileDialog.bind(this);
    }
    [renderField]() {
        const { name, 
        //value,
        accept, capture, multiple, size, 
        //required,
        disabled,
        //preview
         } = this.props;
        return (h("div", null,
            h("gcl-button", { variant: "primary", click: this.openFileDialog },
                h("gcl-icon", { name: "upload" }),
                h("gcl-text", null, "Click here to upload files")),
            this.renderFileList(),
            h("input", { type: "file", name: name, id: name, accept: accept, capture: capture, multiple: multiple, size: size, 
                //class={this.getCSSClass()}
                //required={required}
                style: { opacity: 0 }, onChange: this.onChange, 
                // onFocus={onFocus}
                onBlur: this.onBlur, 
                // title={error}
                // ref={i => this.inputref = i}
                disabled: disabled })));
    }
    openFileDialog() {
        const { name } = this.props;
        this.document.getElementById(name).click();
    }
    // nodeDidUpdate(node, nodeChanges) {
    //     super.nodeDidUpdate?.(node, nodeChanges);
    //     const {
    //         name,
    //         value
    //     } = this.props;
    //     if (node.id === name) { // It is our input field
    //         if (node.files.length === 0) {
    //             console.log('Input does have not any files');
    //             if (value !== undefined) {
    //                 if (Array.isArray(value)) {
    //                     // value.forEach(item => input.files.);
    //                 }
    //                 else {
    //                     const file = new File([...value.content], value.fileName, {
    //                         type: value.contentType
    //                     });
    //                     node.files.push(file);
    //                 }
    //             }
    //         }
    //     }
    // }
    // onValueSet() {
    //     const {
    //         name,
    //         value
    //     } = this.props;
    //     const input: HTMLInputElement = document.getElementById(name) as HTMLInputElement;
    //     if (input?.files?.length === 0) {
    //         console.log('Input does have not any files');
    //         if (value !== undefined) {
    //             if (Array.isArray(value)) {
    //                 // value.forEach(item => input.files.);
    //             }
    //         }
    //     }
    // }
    renderFileList() {
        const { preview, value, size } = this.props;
        if (preview === false) {
            return null;
        }
        if (value === undefined) {
            return null;
        }
        const data = Array.isArray(value) ? value : [value]; // Ensure it is an array
        return (h("gcl-list", { 
            // id="listWithData"
            size: size, 
            // selection='["c"]'
            // selectable
            // selectionChanged={this.showSelection}
            data: data, renderRecord: record => {
                const { name, size, content } = record;
                // The content can be either read from the server or selected from a File object
                const src = content.indexOf('blob:') === -1 ?
                    `data:image/jpeg;base64,${content}` :
                    content;
                return (h("gcl-list-item", { value: name },
                    h("gcl-text", { "intl-key": "name" }, "Name:"),
                    h("gcl-text", null, name),
                    h("gcl-text", { "intl-key": "size" }, "Size:"),
                    h("gcl-text", null, formatSize(size)),
                    h("img", { style: "width: 48px; height: 48px;", src: src })));
            } }));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/FileField/FileField.css`
//     ]
// };
FileField.properties = {
    accept: {
        type: String
    },
    capture: {
        type: Boolean,
        value: true
    },
    multiple: {
        type: Boolean
    },
    /** Whether to preview the files (that can be previewed) */
    preview: {
        type: Boolean
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-file-field`, FileField);

//@ts-ignore
class ValidationSummary extends SizableMixin(CustomElement) {
    render() {
        return (h(Fragment, null, [
            ...this.renderWarnings(),
            ...this.renderErrors()
        ]));
    }
    renderWarnings() {
        const { warnings, size } = this.props;
        if (warnings === undefined) {
            return null;
        }
        return warnings.map(warning => h("gcl-alert", { type: "warning", message: warning, size: size, closable: false }));
    }
    renderErrors() {
        const { errors, size } = this.props;
        if (errors === undefined) {
            return null;
        }
        return errors.map(error => h("gcl-alert", { type: "error", message: error, size: size, closable: false }));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/validationSummary/ValidationSummary.css`
//     ]
// };
ValidationSummary.properties = {
    /**
     * The errors to display
     */
    errors: {
        type: Array,
        value: []
    },
    /**
     * The warnings to display
     */
    warnings: {
        type: Array,
        value: []
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-validation-summary`, ValidationSummary);

/**
 * Implements a mixin that loads a single record
 */
const SingleLoadableMixin = Base => class SingleLoadable extends LoadableMixin(Base) {
    async load() {
        const { loadUrl } = this.props;
        this.setError(undefined);
        this.setLoading(true);
        return await this._loader.load({
            url: loadUrl
        });
    }
    initLoader() {
        const { loadUrl, autoLoad } = this.props;
        if (loadUrl !== undefined) {
            this._loader = new SingleRecordLoader({
                onData: this.onLoadData,
                onError: this.onLoadError
            });
            if (autoLoad === true) {
                this.load();
            }
        }
    }
};

/**
 * Packs the common used mixins in a loading a single record scenario
 */
const DataSingleLoadableMixin = Base => class DataSingleLoadable extends SingleLoadableMixin(ErrorableMixin(DataMixin(Base))) {
};

/**
 * Mixin to implement a component that can post data to a server
 * The derived/subclass must also implement ErrorableMixin
 * @param Base
 */
const SubmitableMixin = Base => { var _a; return _a = class Submitable extends Base {
        constructor(props, children) {
            super(props, children);
            this.submit = this.submit.bind(this);
            this.onSubmitData = this.onSubmitData.bind(this);
            this.onSubmitError = this.onSubmitError.bind(this);
        }
        renderSubmitting() {
            const { submitting } = this.state;
            if (submitting === false) {
                return null;
            }
            return (h("gcl-overlay", null,
                h("gcl-alert", { closable: "false", type: "info", message: "...Submitting" })));
        }
        submit() {
            const { submitUrl } = this.props;
            if (submitUrl === undefined) {
                console.error('A submit URL is required to submit the form');
                return;
            }
            const { _fetcher } = this;
            this.setError(undefined);
            this.setSubmitting(true);
            const data = this.getSubmitData(); // Overriden by the derived classes
            _fetcher.fetch({
                url: submitUrl,
                method: this.getMethod(data),
                data
            });
        }
        getMethod(data) {
            const { method, methodSelector } = this.props;
            if (method !== undefined) {
                return method; // The user set an specific method
            }
            if (methodSelector != undefined) {
                return methodSelector(data);
            }
            // Use conventions
            return data.id !== undefined ? 'put' : 'post';
        }
        initSubmitter() {
            const { submitUrl, } = this.props;
            if (submitUrl !== undefined) {
                this._fetcher = new Fetcher({
                    onData: this.onSubmitData,
                    onError: this.onSubmitError
                });
            }
        }
        onSubmitData(data) {
            this.setSubmitting(false);
            this.handleSubmitResponse(data.payload);
        }
        onSubmitError(error) {
            this.setSubmitting(false);
            this.setError(error);
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.initSubmitter();
        }
    },
    _a.properties = {
        /**
         * The URL to post the data to
         */
        submitUrl: {
            attribute: 'submit-url',
            type: String,
            required: true
        },
        method: {
            type: String,
            options: ['post', 'put']
        },
        methodSelector: {
            type: Function
        }
    },
    _a.state = {
        submitting: {
            value: false
        }
    },
    _a; };

//@ts-ignore
class Form extends SubmitableMixin(DataSingleLoadableMixin(ValidatableMixin(ContainerMixin(SizableMixin(CustomElement))))) {
    constructor() {
        super();
        this._record = new DataRecord();
        this.reset = this.reset.bind(this);
    }
    render() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h(Fragment, null,
            this.renderLoading(),
            this.renderError(),
            this.renderSubmitting(),
            h("form", { size: size },
                h("slot", null),
                h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors }),
                this.renderButtons())));
    }
    renderButtons() {
        return (h("div", null,
            h("gcl-button", { onClick: this.reset, variant: "secondary" }, "Reset"),
            h("gcl-button", { onClick: this.submit, variant: "primary" }, "Submit")));
    }
    submit() {
        if (this.validate()) {
            super.submit();
        }
    }
    validate() {
        const { validators } = this.props;
        const { children } = this.state;
        let valid = true;
        const context = {
            errors: [],
            warnings: []
        };
        validators.forEach((validator) => {
            if (!validator.validate(context)) ;
        });
        children.forEach((child) => {
            const { value } = child.props;
            if (!child.validate(value)) {
                valid = false;
            }
        });
        return valid;
    }
    reset() {
        this._record.reset();
        const data = this._record.getData();
        this.populateFields(data);
    }
    acceptChild(child) {
        return child instanceof Field; // Only accept fields
    }
    onChildAdded(child) {
        child.dataField = this._record.addField(child.props);
    }
    onChildRemoved(child) {
        this._record.removeField(child.props);
        child.dataField = undefined;
    }
    /** Called to retrieve the data to send the server */
    getSubmitData() {
        const data = this._record.getData();
        console.log(JSON.stringify(data));
        return data;
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(valueChanged, this.onValueChanged);
        // Pass the properties to the data record
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(valueChanged, this.onValueChanged);
    }
    onValueChanged(event) {
        const { name, value } = event.detail;
        console.log('valueChanged: ' + JSON.stringify(event.detail));
        this._record.setData({
            [name]: value
        });
        event.stopPropagation();
    }
    handleSubmitResponse(data) {
        console.log(JSON.stringify(data));
        this._record.setData(data);
    }
    onLoadData(data) {
        super.onLoadData(data);
        const { payload } = data;
        this._record.initialize(payload);
        this.populateFields(payload);
    }
    populateFields(data) {
        const { children } = this.state;
        const fieldsMap = new Map(children.map(child => [child.props.name, child]));
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const field = fieldsMap.get(key);
                if (field !== undefined) { // There might not be a field configured for the loaded value
                    field.setValue(data[key], field.onValueSet);
                }
            }
        }
    }
}
Form.component = {
    styleUrls: [
        `${config.assetsFolder}/form/Form.css`
    ]
};
Form.properties = {
    /** The validators of the form */
    validators: {
        type: Array,
        mutable: true,
        value: []
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);

const ActivatableMixin = Base => { var _a; return _a = class Activatable extends Base {
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/activatable/Activatable.css`
        ]
    },
    _a.properties = {
        /**
         * Whether the element is active
         */
        active: {
            type: Boolean,
            value: false,
            mutable: true,
            reflect: true
        }
    },
    _a; };

const linkClicked = 'linkClicked';
//@ts-ignore
class NavigationLink extends ActivatableMixin(SizableMixin(ChildMixin(CustomElement))) {
    render() {
        const { size, active } = this.props;
        return (h(Fragment, { size: size, active: active },
            h("slot", null)));
    }
    onLinkClicked() {
        this.setActive(true);
        this.dispatchEvent(new CustomEvent(linkClicked, {
            detail: {
                link: this
            },
            bubbles: true,
            composed: true
        }));
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener('click', this.onLinkClicked);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener('click', this.onLinkClicked);
    }
}
NavigationLink.component = {
    styleUrls: [
        `${config.assetsFolder}/navigation-link/NavigationLink.css`
    ]
};
NavigationLink.properties = {
    /**
     * The name of the path to append to the URL
     */
    to: {
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-link`, NavigationLink);

//@ts-ignore
class NavigationBar extends SizableMixin(ContainerMixin(CustomElement)) {
    constructor() {
        super();
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }
    render() {
        const { links, size, variant } = this.props;
        return (h(Fragment, { size: size, variant: variant }, links !== undefined ?
            this.renderLinks() :
            (h("slot", null))));
    }
    renderLinks() {
        const { links } = this.props;
        return links.map(link => h("gcl-nav-link", { path: link.path, view: link.view, size: link.size }, link.Label));
    }
    linkClicked(event) {
        var _a, _b;
        const link = event.detail.link;
        const { activeLink } = this.state;
        if (link !== activeLink) {
            (_b = (_a = this.props).linkClicked) === null || _b === void 0 ? void 0 : _b.call(_a, link);
            //link.setAttribute('active', true);
            activeLink === null || activeLink === void 0 ? void 0 : activeLink.setAttribute('active', false);
            this.setActiveLink(link);
            if (this.router !== undefined) {
                this.router.navigate(link.props.to);
            }
        }
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener(linkClicked, this.linkClicked);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeEventListener(linkClicked, this.linkClicked);
    }
    onChildAdded(child) {
        if (child.props.active === true) {
            this.setActiveLink(child);
        }
    }
    onRouteChanged(route, router) {
        // Save the router so we can navigate on click
        this.router = router;
        if (route === undefined) { // Not found route
            return;
        }
        if (!this.setActiveLinkFromRoute(route)) {
            this.route = route; // Save the route to retry on nodeDidConnect;
        }
    }
    nodeDidConnect() {
        var _a;
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this);
        if (this.route !== undefined) {
            this.setActiveLinkFromRoute(this.route);
            this.route = undefined;
        }
    }
    setActiveLinkFromRoute(route) {
        const { children, activeLink } = this.state;
        if ((children === null || children === void 0 ? void 0 : children.length) === 0) {
            return false;
        }
        const link = children.filter(l => l.props.to === route.path)[0];
        if (link === activeLink) {
            return; // The link is already active
        }
        link.setAttribute('active', true);
        activeLink === null || activeLink === void 0 ? void 0 : activeLink.setAttribute('active', false);
        this.setActiveLink(link);
        return true;
    }
}
NavigationBar.component = {
    //shadow: false,
    styleUrls: [
        `${config.assetsFolder}/navigation-bar/NavigationBar.css`
    ]
};
NavigationBar.properties = {
    links: {
        type: Array
    },
    linkClicked: {
        attribute: 'link-clicked',
        type: Function
    }
};
NavigationBar.state = {
    /**
     * To track the last active link to deactivate it when other is selected
     */
    activeLink: {
        value: undefined
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-nav-bar`, NavigationBar);

/**
 * Layout component to encapsulate flexbox functionality
 */
class LoginSection extends CustomElement {
    async connectedCallback() {
        super.connectedCallback();
        const authProvider = appCtrl.authProvider;
        if (authProvider !== undefined) {
            var user = await authProvider.getUser();
            if (user != null) {
                this.setUser(user);
            }
        }
    }
    render() {
        const authProvider = appCtrl.authProvider;
        if (authProvider === undefined) {
            return (h("span", null, "There is no auth provider configured"));
        }
        const { user } = this.state;
        if (user === undefined) {
            return (h("gcl-button", { variant: "primary", click: () => authProvider.login() },
                h("gcl-text", null, "Login"),
                h("gcl-icon", { name: "door-open" })));
        }
        else {
            const { given_name, middle_name, family_name } = user.profile;
            return (h("gcl-row", null,
                h("span", { style: { marginRight: '1rem' } },
                    "Welcome: ",
                    given_name,
                    " ",
                    middle_name,
                    " ",
                    family_name,
                    "!"),
                h("gcl-button", { variant: "primary", click: () => authProvider.logout() },
                    h("gcl-text", null, "Logout"),
                    h("gcl-icon", { name: "door-closed" }))));
        }
    }
}
LoginSection.state = {
    user: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-login-section`, LoginSection);

function createScriptNode(oldScript, newValue) {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.setAttribute('data-view', newValue); // Set the view attribute so we can remove it when other views are selected
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    return newScript;
}
class Content extends CustomElement {
    constructor() {
        super();
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }
    render() {
        return (h(Fragment, null));
    }
    async attributeChangedCallback(attributeName, oldValue, newValue) {
        var _a;
        (_a = super.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, attributeName, oldValue, newValue);
        if (attributeName === 'source' && oldValue !== newValue) {
            const content = await resourceLoader.get(newValue);
            const parser = new DOMParser();
            // Even though it is a fragment, it creates a full HTML document
            const { head, body } = parser.parseFromString(content, "text/html");
            // Clear any previous content
            while (this.document.firstChild) {
                notifyNodeWillDisconnect(this.document.firstChild);
                this.document.firstChild.remove();
            }
            // Remove any scripts with the data-view attributes set
            document.head.querySelectorAll('[data-view]').forEach(script => script.remove());
            document.body.querySelectorAll('[data-view]').forEach(script => script.remove());
            // Add any script that appears in the head
            Array.from(head.children).forEach(child => {
                if (child.tagName === 'SCRIPT') {
                    const newScript = createScriptNode(child, newValue);
                    document.head.appendChild(newScript);
                }
                // else { // Maybe CSS or Meta
                //     throw Error('Not implemented');
                // }
            });
            // Add the new content
            Array.from(body.children).forEach(child => {
                if (child.tagName === 'SCRIPT') {
                    const newScript = createScriptNode(child, newValue);
                    document.body.appendChild(newScript);
                }
                else { // Add it to this component
                    this.document.appendChild(child);
                }
            });
        }
    }
    onRouteChanged(route, router) {
        if (route === undefined) {
            const { notFound } = this.props;
            this.setSource(notFound);
        }
        else {
            this.setSource(route.view);
        }
    }
}
Content.component = {
    shadow: false // Do not create a shadow DOM for this component!
};
Content.properties = {
    /**
     * The source to set the content from
     */
    source: {
        type: String,
        mutable: true,
        reflect: true
    },
    /**
     * The source to load when the route does not exist
     */
    notFound: {
        attribute: 'not-found',
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);

//@ts-ignore
class CurrentYear extends CustomElement {
    render() {
        return new Date().getFullYear();
    }
}
//@ts-ignore
customElements.define(`${config.tagPrefix}-current-year`, CurrentYear);

function parseCssStyle(style) {
    const s = {};
    const parts = style.split(';');
    parts
        .filter(part => part !== '')
        .forEach(part => {
        const kvs = part.split(':');
        const key = toCamelCase(kvs[0].trim());
        const value = kvs[1].trim();
        s[key] = value;
    });
    return s;
}
function toCamelCase(s) {
    const exp = /-([a-z])/;
    while (exp.test(s)) {
        s = s.replace(exp, RegExp.$1.toUpperCase());
    }
    return s;
}

/**
 * Layout component to encapsulate flexbox row functionality
 */
//@ts-ignore
class Row extends CustomElement {
    render() {
        const { justifyContent, } = this.props;
        let { style } = this.props;
        if (typeof style === 'string') {
            style = parseCssStyle(style);
        }
        return (h(Fragment, { style: Object.assign(Object.assign({}, style), { justifyContent }) },
            h("slot", null)));
    }
}
Row.component = {
    styleUrls: [
        `${config.assetsFolder}/layout/row/Row.css`
    ]
};
Row.properties = {
    style: {
        type: Object
    },
    /**
     * The type of the alert
     */
    justifyContent: {
        attribute: 'justify-content',
        type: String,
        value: 'space-between',
        options: ['start', 'center', 'space-around', 'space-between', 'space-evenly']
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-row`, Row);

//@ts-ignore
class CloseTool extends SizableMixin(VariantMixin(CustomElement)) {
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        const { close } = this.props;
        this.addEventListener('click', close);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        const { close } = this.props;
        this.removeEventListener('click', close);
    }
    render() {
        const { variant, size } = this.props;
        return (h(Fragment, { variant: variant, size: size }, "\u00D7"));
    }
}
CloseTool.component = {
    styleUrls: [
        `${config.assetsFolder}/tool/close-tool/CloseTool.css`
    ]
};
CloseTool.properties = {
    /**
     * What action to execute when the tool has been closed
     */
    close: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-close-tool`, CloseTool);

//@ts-ignore
class SelectableRow extends SelectableOnClickMixin(HoverableMixin(SizableMixin(ChildMixin(CustomElement)))) {
    render() {
        const { value, size, selected, hoverable, } = this.props;
        const children = this.renderFields();
        return (h(Fragment, { value: value, hoverable: hoverable, size: size, selected: selected }, children));
    }
    renderFields() {
        return this.props.children;
    }
}
SelectableRow.component = {
    styleUrls: [
        `${config.assetsFolder}/selectable/row/SelectableRow.css`
    ]
};
SelectableRow.properties = {
    /**
     * The children nodes
     */
    children: {
        type: ElementNode,
        //required: true Not used by derived components
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-selectable-row`, SelectableRow);

//@ts-ignore
class DataCell extends 
// SelectableMixin(
//     ChildMixin(
SizableMixin(CustomElement) {
    render() {
        let { field, record } = this.props;
        const { size } = this.props;
        if (typeof field == 'function') {
            field = field();
        }
        if (typeof record == 'function') {
            record = record();
        }
        const value = record[field.name];
        if (field.render !== undefined) {
            const cell = field.render.call(this, record, field);
            if (typeof cell === 'string') {
                return markupToVDom(cell.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
            }
            else {
                return cell;
            }
        }
        else {
            return (h(Fragment, { size: size }, value));
        }
    }
}
DataCell.component = {
    styleUrls: [
        `${config.assetsFolder}/data/cell/DataCell.css`
    ]
};
DataCell.properties = {
    /**
     * The record to render the row from
     */
    record: {
        type: oneOf(Object, Function),
        required: true
    },
    /**
     * The descriptor of the fields to render the row
     */
    field: {
        type: oneOf(Object, Function),
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-cell`, DataCell);

//@ts-ignore
class DataRow extends SelectableRow {
    renderFields() {
        let { record, fields } = this.props;
        if (typeof record === 'function') {
            record = record();
        }
        if (fields === undefined) {
            return null;
        }
        if (typeof fields === 'function') {
            fields = fields();
        }
        return fields.map(field => {
            return (h("gcl-data-cell", { style: { width: field.width || '100px' }, field: field, record: record }));
        });
    }
}
DataRow.properties = {
    /**
     * The record to render the row from
     */
    record: {
        type: oneOf(Object, Function),
        required: true
    },
    /**
     * The descriptor of the fields to render the row
     */
    fields: {
        type: oneOf(Array, Function),
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-row`, DataRow);

/**
 * Allows a component to be pageable
 */
const PageableMixin = Base => { var _a; return _a = class Pageable extends Base {
        renderPager() {
            const { pageable, size } = this.props;
            if (pageable !== true) {
                return null;
            }
            return (h("gcl-pager", { "target-view": this, size: size, "total-pages": "5" }));
        }
    },
    _a.properties = {
        /**
         * Whether the element is pageable
         */
        pageable: {
            type: Boolean,
            value: true
        }
    },
    _a; };

//@ts-ignore
class DataGrid extends PageableMixin(DataCollectionLoadableMixin(SelectionContainerMixin(SizableMixin(CustomElement)))) {
    render() {
        return (h("div", { card: true, style: "background-color: white;" },
            h("div", null,
                this.renderLoading(),
                this.renderError()),
            h("div", { style: "background-color: var(--gcl-header-background-color);" }, this.renderHeader()),
            h("div", { class: "body" }, this.renderData()),
            h("div", { style: "background-color: var(--gcl-header-background-color);" }, this.renderPager())));
    }
    wrapRecord(record, index, children) {
        const { rowIsHoverable, recordId, size, selectable } = this.props;
        const value = record[recordId];
        return (h("gcl-selectable-row", { hoverable: rowIsHoverable, children: children, size: size, selectable: selectable, "selectable-value": value, key: value || index, index: index }));
    }
    renderHeader() {
        const { fields, size } = this.props;
        if (fields === undefined) {
            return null;
        }
        const fds = typeof fields === 'function' ? fields() : fields;
        const children = fds.map(f => {
            const sorter = f.sortable !== false ?
                (h("gcl-sorter-tool", { field: f.name, size: size })) :
                null;
            return (h("span", { style: {
                    width: f.width || '100px'
                } },
                f.display,
                sorter));
        });
        return (h("gcl-row", null, children));
    }
    renderFields(fields, data) {
        const { recordId, rowIsHoverable, size, selectable, } = this.props;
        return data.map((record, index) => {
            const value = record[recordId];
            return (h("gcl-data-row", { hoverable: rowIsHoverable, size: size, selectable: selectable, record: record, "selectable-value": value, key: value || index, index: index, fields: fields }));
        });
    }
    /**
     * When there is no data provided to the component, render its children
     */
    renderNoData() {
        return (h("ul", null,
            h("slot", null)));
    }
}
DataGrid.component = {
    styleUrls: [
        `${config.assetsFolder}/data/grid/DataGrid.css`
    ]
};
DataGrid.properties = {
    /**
     * The record to render the row from
     */
    rowIsHoverable: {
        attribute: 'row-is-hoverable',
        type: Boolean,
        value: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-grid`, DataGrid);

class MyTable extends CustomElement {
    render() {
        return (h("gcl-table", { caption: h("caption", null,
                h("gcl-text", { "intl-key": "goodMorning", lang: "fr", variant: "secondary" })), columns: [
                {
                    name: 'company',
                    title: 'Company',
                    renderLabel: () => (h("gcl-text", { "intl-key": "goodMorning", lang: "de", variant: "primary" }))
                },
                {
                    name: 'contact',
                    title: 'Contact'
                },
                {
                    name: 'country',
                    title: 'Country',
                    render: record => (h("span", { style: "color: green;" }, record.country))
                }
            ], data: [
                {
                    company: 'Alfreds Futterkiste',
                    contact: 'Maria Anders',
                    country: 'Germany'
                },
                {
                    company: 'Centro comercial Moctezuma',
                    contact: 'Francisco Chang',
                    country: 'Mexico'
                },
                {
                    company: 'Ernst Handel',
                    contact: 'Roland Mendel',
                    country: 'Austria'
                }
            ], 
            //rowClick={(record, i) => alert(`Row clicked! at row index: ${i} and record: ${JSON.stringify(record)}`)} // onXXX is only used for stantard HTML events
            rowDoubleClick: (record, i) => alert(`Row double clicked! at row index: ${i} and record: ${JSON.stringify(record)}`), 
            //cellClick={(record, i, j) => alert(`Cell clicked! at row index: ${i}, column index: ${j} and record: ${JSON.stringify(record)}`)} // onXXX is only used for stantard HTML events
            // header={
            //     <thead>
            //         <tr>
            //             <th>Company</th>
            //             <th>Contact</th>
            //             <th>Country</th>
            //         </tr>
            //     </thead>
            // }
            // body={
            //     <tbody>
            //         <tr>
            //             <td>Alfreds Futterkiste</td>
            //             <td>Maria Anders</td>
            //             <td>Germany</td>
            //         </tr>
            //         <tr>
            //             <td>Centro comercial Moctezuma</td>
            //             <td>Francisco Chang</td>
            //             <td>Mexico</td>
            //         </tr>
            //         <tr>
            //             <td>Ernst Handel</td>
            //             <td>Roland Mendel</td>
            //             <td>Austria</td>
            //         </tr>
            //         <tr>
            //             <td>Island Trading</td>
            //             <td>Helen Bennett</td>
            //             <td>UK</td>
            //         </tr>
            //         <tr>
            //             <td>Laughing Bacchus Winecellars</td>
            //             <td>Yoshi Tannamuri</td>
            //             <td>Canada</td>
            //         </tr>
            //         <tr>
            //             <td>Magazzini Alimentari Riuniti</td>
            //             <td>Giovanni Rovelli</td>
            //             <td>Italy</td>
            //         </tr>
            //     </tbody>
            // }
            footer: h("tfoot", null,
                h("tr", null,
                    h("td", null, "Sum"),
                    h("td", null, "$180"))) }));
    }
}
//@ts-ignore
customElements.define('my-table', MyTable);

class MyCounter extends CustomElement {
    constructor() {
        super();
        this.increment = this.increment.bind(this);
    }
    increment() {
        let { count } = this.props;
        this.setCount(++count);
    }
    render() {
        return (h("div", null,
            h("h4", null, "Counter"),
            this.props.count,
            h("gcl-button", { onClick: this.increment }, "Increment")));
    }
}
MyCounter.properties = {
    /**
     * The initial count
     */
    count: {
        type: Number,
        value: 0,
        mutable: true,
        reflect: true
    }
};
//@ts-ignore
customElements.define('my-counter', MyCounter);

export { Alert, App, Button, CloseTool, ComboBox, Content, CurrentYear, DataCell, DataGrid, DataRow, DateField, Display, DropTool, Dropdown, FileField, FilterField, FilterPanel, Form, Header, HiddenField, Icon, List, ListItem, LoginSection, MyCounter, MyTable, NavigationBar, NavigationLink, NumberField, OidcProvider, Overlay, Pager, Panel, Router, Row, Select, SelectableRow, SorterTool, Table, Text, TextArea, TextField, ValidationSummary, appCtrl };
