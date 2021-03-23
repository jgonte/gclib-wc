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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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

var DataRecordSet = (function () {
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
        var value = idInfo.value, noDescriptorsId = idInfo.noDescriptorsId, hasUndefinedIdentifiers = idInfo.hasUndefinedIdentifiers;
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
        var value = idInfo.value, noDescriptorsId = idInfo.noDescriptorsId, hasUndefinedIdentifiers = idInfo.hasUndefinedIdentifiers;
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
        var value = idInfo.value, noDescriptorsId = idInfo.noDescriptorsId, hasUndefinedIdentifiers = idInfo.hasUndefinedIdentifiers;
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
}());

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
    __extends(SingleValueFieldValidator, _super);
    function SingleValueFieldValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SingleValueFieldValidator;
}(Validator));

var RequiredValidator = (function (_super) {
    __extends(RequiredValidator, _super);
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
    __extends(RegexValidator, _super);
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

var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator(options) {
        if (options === void 0) { options = {
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: '{{label}} is invalid'
        }; }
        return _super.call(this, options) || this;
    }
    return EmailValidator;
}(RegexValidator));

var RangeValidator = (function (_super) {
    __extends(RangeValidator, _super);
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
}(SingleValueFieldValidator));

var CustomSingleValueFieldValidator = (function (_super) {
    __extends(CustomSingleValueFieldValidator, _super);
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
}(SingleValueFieldValidator));

var RecordValidator = (function (_super) {
    __extends(RecordValidator, _super);
    function RecordValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordValidator.prototype.getData = function (context) {
        var dataProvider = context.dataProvider;
        return dataProvider.getData();
    };
    return RecordValidator;
}(Validator));

var CompareValidator = (function (_super) {
    __extends(CompareValidator, _super);
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
}(RecordValidator));

var CustomRecordValidator = (function (_super) {
    __extends(CustomRecordValidator, _super);
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
}(RecordValidator));

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
                    case 4:
                        _e.sent();
                        _e.label = 5;
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
                            if (key.toLowerCase() === 'content-type') {
                                requestHeaders[key];
                            }
                        }
                        headers = new Headers();
                        for (key in requestHeaders) {
                            if (requestHeaders.hasOwnProperty(key)) {
                                headers.append(key, requestHeaders[key]);
                            }
                        }
                        if (!request.authProvider) return [3, 2];
                        return [4, request.authProvider.authorize()];
                    case 1:
                        authHeader = _a.sent();
                        if (authHeader) {
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
                    if (value.hasOwnProperty('fileName')) {
                        var fileName = value.fileName, contentType = value.contentType, content = value.content;
                        var file = new File(__spreadArrays(content), fileName, {
                            type: contentType
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
            var error, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.onResponse) {
                            this.onResponse(response);
                        }
                        if (!(response.status > 299)) return [3, 2];
                        _b = {
                            status: response.status,
                            statusText: response.statusText
                        };
                        return [4, this.parseContent(response)];
                    case 1:
                        error = (_b.payload = _d.sent(),
                            _b);
                        this.handleError(error);
                        return [2];
                    case 2:
                        if (!(this.onData !== undefined)) return [3, 4];
                        _a = this.onData;
                        _c = {
                            headers: response.headers
                        };
                        return [4, this.parseContent(response)];
                    case 3:
                        _a.apply(this, [(_c.payload = _d.sent(),
                                _c)]);
                        _d.label = 4;
                    case 4: return [2];
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

var SingleItemLoader = (function (_super) {
    __extends(SingleItemLoader, _super);
    function SingleItemLoader(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.urlBuilder = new SelectUrlBuilder(cfg.urlBuilder);
        return _this;
    }
    SingleItemLoader.prototype.load = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch(__assign(__assign({}, request), { url: this.urlBuilder.build(request) }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return SingleItemLoader;
}(Fetcher));

var CollectionUrlBuilder = (function (_super) {
    __extends(CollectionUrlBuilder, _super);
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
    __extends(CollectionLoader, _super);
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
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return CollectionLoader;
}(Fetcher));

function formatDate(date, format, options) {
    if (options === void 0) { options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    }; }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    switch (format) {
        default: return date.toLocaleDateString(undefined, options);
    }
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
        this.isVirtualText = true;
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
    FragmentNode.prototype.prependChildNode = function (vNode) {
        this.children.unshift(vNode);
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
        if (child === null) {
            return;
        }
        if (child.isVirtualNode) {
            childrenNodes.push(child);
        }
        else if (child.isVirtualText) {
            childrenNodes.push(child);
        }
        else if (child.isFragmentNode) {
            childrenNodes.push(child);
        }
        else if (Array.isArray(child)) {
            child.forEach(function (ch) { return childrenNodes.push(ch); });
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

function __spreadArrays$1() {
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
            var nodes = __spreadArrays$1(nodeChanges.inserted, nodeChanges.moved);
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
            var nodes = __spreadArrays$1(nodeChanges.inserted, nodeChanges.moved);
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
                        return new ElementPatches(__spreadArrays$1(diffAttributes(oldNode.props, newNode.props)), []);
                    }
                    else {
                        return new ElementPatches(__spreadArrays$1(diffAttributes(oldNode.props, newNode.props), [
                            new RemoveChildrenPatch()
                        ]), []);
                    }
                }
                else {
                    if (oldChildren.length === 0) {
                        return new ElementPatches(__spreadArrays$1(diffAttributes(oldNode.props, newNode.props), [
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
                        return new ElementPatches(__spreadArrays$1(diffAttributes(oldNode.props, newNode.props), patches, removeChildrenPatches), __spreadArrays$1(childrenPatches));
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
                    return new ElementPatches(__spreadArrays$1(diffAttributes(oldNode.props, newNode.props), patches, removeChildrenPatches), __spreadArrays$1(childrenPatches));
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

function mount(rootNode, currentNode, previousNode, node, hooks) {
    var patches = diff(previousNode, currentNode);
    patches.applyPatches(rootNode, node, hooks);
}

function createVirtualNode(o) {
    if (typeof o === 'string') {
        return new VirtualText(o);
    }
    if (o.isVirtualNode === true) {
        return new VirtualNode(o.name, o.props, o.children.map(c => createVirtualNode(c)));
    }
    else if (o.IsFragmentNode) {
        return new FragmentNode(o.props, o.children.map(c => createVirtualNode(c)));
    }
    else {
        return new VirtualText(o.text);
    }
}

const defaultPropertyValueConverter = {
    toProperty: (value, type) => {
        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Array:
                return JSON.parse(value);
            case VirtualNode: {
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    // Value is a string but not a JSON one, do nothing
                }
                return createVirtualNode(value);
            }
            case Function: { // Extract the string and return the global function
                const functionName = value.replace('()', '').trim();
                return window[functionName];
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

function getComponentMetadata(ctor) {
    const metadata = {
        component: {},
        properties: {},
        state: {}
    };
    // Set the shadow prpoerty
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

const MetadataInitializerMixin = Base => class MetadataInitializer extends Base {
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
                callback === null || callback === void 0 ? void 0 : callback();
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
        this.componentMetadata = getComponentMetadata(this);
        const { styleUrls } = this.componentMetadata.component;
        if (styleUrls.length > 0) {
            // console.log(`Loading styles for type: ${this.name}`);
            this.loadedStylesTracker = {
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
            delete this.loadedStylesTracker;
        }
    }
    validatePropertyOptions(name, newValue, options) {
        if (options !== undefined &&
            !options.includes(newValue)) {
            throw Error(`Value: [${newValue}] is not in the options of property: '${name}'. Options: [${options.join(', ')}] `);
        }
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
        if (node === undefined) {
            console.error('Undefined virtual node. Ensure that you return the node from the render function');
        }
        const nodeType = typeof node;
        const styleUrls = this.constructor.componentMetadata.component.styleUrls;
        const hasStyleUrls = styleUrls.length > 0;
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
            node.appendChildNode(h("style", null, this.constructor.style));
        }
        mount(this.document, node, this._mountedNode, this.rootElement, this);
        this._mountedNode = node;
    }
};

class CustomElement extends VirtualDomComponentMixin(MetadataInitializerMixin(HTMLElement)) {
    constructor() {
        super();
        this._isUpdating = false;
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
        if (this._isUpdating) {
            return;
        }
        this._isUpdating = true;
        requestAnimationFrame(() => {
            this.update();
            this._isUpdating = false;
        });
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
        const { value, size, variant } = this.props;
        return (h(Fragment, { size: size, variant: variant }, value !== undefined ? value : (h("slot", null))));
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

const ContainerMixin = Base => { var _a; return _a = class Container extends Base {
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
                        child.setAttribute(attributeName, this.props[propertyName]);
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
                    if (child.props[name] === newValue) { // A value different from the default one has not been set
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
        const { type, size } = this.props;
        return (h(Fragment, { class: "alert", type: type, size: size },
            this.renderIcon(),
            this.renderMessage(),
            this.renderCloseButton()));
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
            return (h("gcl-text", { variant: this.getVariant(), size: size }, message));
        }
        else { // VirtualNode
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
    renderCloseButton() {
        const { closable, close, size } = this.props;
        if (closable !== true) {
            return null;
        }
        return (h("span", { class: "close-button", onClick: () => close === null || close === void 0 ? void 0 : close() },
            h("gcl-text", { variant: this.getVariant(), size: size }, "\u00D7")));
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
        type: VirtualNode
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

//@ts-ignore
class Button extends SizableMixin(VariantMixin(DirectionMixin(ContainerMixin(CustomElement)))) {
    render() {
        const { type, click, size, variant } = this.props;
        return (h("button", { type: type, size: size, variant: variant, dir: this.getDir(), 
            // class={this.getCSSClass()}
            onClick: click },
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
        type: VirtualNode
    },
    /**
     * The tools of the header
     */
    tools: {
        type: VirtualNode
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
        type: VirtualNode
    },
    /**
     * The body of the panel
     */
    body: {
        type: VirtualNode
    },
    /**
     * The footer of the panel
     */
    footer: {
        type: VirtualNode
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

/**
 * The following symbols allow for mixins to call the render method of the derived class that extends those mixins
 * For that, the derived class must import the symbol and implement that method using the symbol as the name of the method
 */
const renderDerived = Symbol('renderDerived');

const renderError = Symbol('renderError');
/**
 * Mixin that handles errors
 * @param Base
 */
const ErrorableMixin = Base => { var _a; return _a = class Errorable extends Base {
        [renderError]() {
            return (h(Fragment, null,
                h("gcl-overlay", null,
                    h("gcl-alert", { type: "error", message: this.getErrorMessage(), closable: true, close: () => {
                            this.setError(undefined);
                        } })),
                this[renderDerived]()));
        }
        getErrorMessage() {
            const { error } = this.state;
            if (error instanceof Error) {
                return error.message;
            }
            else { // Try to find the message of error returned by the server
                if (error.payload !== undefined) {
                    const payload = JSON.parse(error.payload);
                    if (payload.errors !== undefined) {
                        return Object.values(payload.errors).join('\n');
                    }
                    else if (payload.title !== undefined) {
                        return payload.title;
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
 * Render when the data property has been passed to the element
 */
const renderData = Symbol('renderData');
/**
 * Render when the data property has been passed to the element but it is an empty array
 */
const renderEmptyData = Symbol('renderEmptyData');
/**
 * Render when no data property has been passed to the element
 */
const renderNoData = Symbol('renderNoData');
const DataLoadableMixin = Base => { var _a; return _a = class DataLoadable extends Base {
        render() {
            const { data } = this.props;
            return data !== undefined ?
                this[renderData]() :
                // The derived components must implement this method to allow to display their children if no data was provided
                this[renderNoData]();
        }
        [renderData]() {
            const { data, renderData: renderRecord } = this.props;
            if (data.length === 0) { // The data was provided but it was empty
                return this[renderEmptyData]();
            }
            if (renderRecord !== undefined) {
                return (h(Fragment, null, data.map(record => renderRecord(record))));
            }
            else { // Show the user the data
                return JSON.stringify(data);
            }
        }
        [renderEmptyData]() {
            return 'There is no data to display';
        }
    },
    _a.properties = {
        /**
         * The data fed into the element
         */
        data: {
            type: Array,
            mutable: true
        },
        /**
         * The function to render the data item
         */
        renderData: {
            type: Function
        }
    },
    _a; };

const AsyncDataLoadableMixin = Base => { var _a; return _a = 
//@ts-ignore
class AsyncDataLoadable extends ErrorableMixin(DataLoadableMixin(Base)) {
        constructor() {
            super();
            this.loadsCollection = true; // Internal configuration
            this.onLoadData = this.onLoadData.bind(this);
            this.onLoadError = this.onLoadError.bind(this);
        }
        render() {
            const { loading } = this.state;
            if (loading === true) {
                const { renderLoading } = this.props;
                if (renderLoading !== undefined) {
                    return renderLoading();
                }
                else {
                    return (h(Fragment, null,
                        h("gcl-overlay", null,
                            h("gcl-alert", { closable: "false", type: "info", message: "...Loading" })),
                        super.render()));
                }
            }
            else {
                return super.render();
            }
        }
        load() {
            const { loadUrl } = this.props;
            this.setError(undefined);
            this.setLoading(true);
            this._loader.load({
                url: loadUrl
            });
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            const { loadUrl, autoLoad } = this.props;
            if (loadUrl !== undefined) {
                this._loader = this.loadsCollection === true ?
                    new CollectionLoader({
                        onData: this.onLoadData,
                        onError: this.onLoadError
                    }) :
                    new SingleItemLoader({
                        onData: this.onLoadData,
                        onError: this.onLoadError
                    });
                if (autoLoad === true) {
                    this.load();
                }
            }
        }
        onLoadData(data) {
            this.setLoading(false);
            this.setData(data.payload);
        }
        onLoadError(error) {
            this.setLoading(false);
            this.setError(error);
        }
    },
    _a.properties = {
        /**
         * The URL to retrieve the data from
         */
        loadUrl: {
            attribute: 'load-url',
            type: String,
        },
        /**
         * Whether to load the data for the component when the component is connected
         */
        autoLoad: {
            type: Boolean,
            value: true
        },
        /**
         * To render a custom loading if wanted
         */
        renderLoading: {
            type: Function
        }
    },
    _a.state = {
        loading: {
            value: false
        }
    },
    _a; };

//@ts-ignore
class Table extends AsyncDataLoadableMixin(CustomElement) {
    render() {
        const { caption, header, body, footer } = this.props;
        return (h("table", null,
            caption || null,
            header || this.renderHeader(),
            body || this.renderBody(),
            footer || null));
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
    rowClick: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-table`, Table);

/**
 * Allows a component to be selectable
 * @param Base
 */
const SelectableMixin = Base => { var _a; return _a = class Selectable extends ContainerMixin(Base) {
        constructor() {
            super();
            this.toggleSelect = this.toggleSelect.bind(this);
        }
        attributeChangedCallback(attributeName, oldValue, newValue) {
            if (super.attributeChangedCallback) {
                super.attributeChangedCallback(attributeName, oldValue, newValue);
            }
            if (attributeName === "selectable") {
                if (newValue === "true" || newValue === "") {
                    this.addEventListener('click', this.toggleSelect);
                }
                else { // newValue === "false"
                    if (this.props.selected) { // Unselect if selected
                        this.setSelected(false);
                        this.dispatchEvent(new CustomEvent('selectionChanged', {
                            detail: {
                                child: this,
                                removed: this.props.value
                            },
                            bubbles: true,
                            composed: true
                        }));
                    }
                    this.removeEventListener('click', this.toggleSelect);
                }
            }
        }
        toggleSelect() {
            const { selectable, selected, value } = this.props;
            if (!selectable) {
                return;
            }
            this.setSelected(!selected);
            this.dispatchEvent(new CustomEvent('selectionChanged', {
                detail: this.props.selected ? // Need to read again since the property was updated
                    {
                        child: this,
                        added: value
                    } :
                    {
                        child: this,
                        removed: value
                    },
                bubbles: true,
                composed: true
            }));
        }
    },
    _a.component = {
        styleUrls: [
            `${config.assetsFolder}/mixins/selectable/Selectable.css`
        ]
    },
    _a.properties = {
        /**
         * Whether the item is selectable
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
            passToChildren: true // Maybe the children want to show some UI that they were selected
        },
        /**
         * The value to select in the event
         */
        value: {
            type: Object
        }
    },
    _a; };

class ListItem extends SelectableMixin(SizableMixin(ChildMixin(CustomElement))) {
    render() {
        const { size } = this.props;
        return (h("li", { size: size },
            h("slot", null)));
    }
}
ListItem.component = {
    styleUrls: [
        `${config.assetsFolder}/list/listItem/ListItem.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-list-item`, ListItem);

const SelectionContainerMixin = Base => { var _a; return _a = 
//@ts-ignore
class SelectionContainer extends ContainerMixin(Base) {
        constructor() {
            super();
            this.updateSelection = this.updateSelection.bind(this);
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
            const { multiple, selection, selectionChanged } = this.props;
            const { added, removed, child } = e.detail;
            if (multiple !== undefined) { // Add values to the selection
                if (added != undefined) {
                    this.setSelection([...selection, added]);
                }
                else if (removed != undefined) {
                    const index = selection.indexOf(removed);
                    selection.splice(index, 1);
                    this.setSelection(selection);
                }
            }
            else { // Replace the old selected value with the new selected one
                const { selectedChild } = this.state;
                // Deselect previous selected attribute
                if (selectedChild !== undefined) {
                    selectedChild.setAttribute("selected", "false");
                }
                if (added != undefined) {
                    this.setSelection([added]);
                    this.setSelectedChild(child);
                }
                else if (removed != undefined) {
                    this.setSelection([]);
                    this.setSelectedChild(undefined);
                }
            }
            if (selectionChanged !== undefined) {
                selectionChanged(this.props.selection); // Re-read from the updated selection props
            }
        }
        onChildAdded(child) {
            var _a, _b;
            (_a = super.onChildAdded) === null || _a === void 0 ? void 0 : _a.call(this, child);
            // If any of the values of the selection match the value of the child, then set the child as selected
            const { multiple, selection } = this.props;
            if (selection.indexOf((_b = child.props) === null || _b === void 0 ? void 0 : _b.value) > -1 &&
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
         * The callback when the selection is changed
         */
        selectionChanged: {
            type: Function
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

class List extends SelectionContainerMixin(SizableMixin(AsyncDataLoadableMixin(CustomElement))) {
    /**
     * When there is no data provided to the component, render its children
     */
    [renderNoData]() {
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

const renderField = Symbol('renderField');
//@ts-ignore
class Field extends VisibleMixin(ValidatableMixin(SizableMixin(ChildMixin(CustomElement)))) {
    constructor() {
        super();
        this.onBlur = this.onBlur.bind(this);
    }
    [renderWhenVisible]() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h(Fragment, null,
            h("div", { class: "field" },
                this.renderLabel(),
                this[renderField]()),
            h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors })));
    }
    renderLabel() {
        const { label, name, size, required } = this.props;
        if (label === undefined) {
            return null;
        }
        if (label.isVirtualText) {
            return (h("label", { for: name, size: size, required: required }, label));
        }
        else { // VirtualNode
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
}
Field.component = {
    styleUrls: [
        `${config.assetsFolder}/Field/Field.css`
    ]
};
Field.properties = {
    name: {
        type: String
    },
    isId: {
        attribute: 'is-id',
        type: Boolean,
        value: false
    },
    type: {
        type: Function
    },
    label: {
        type: VirtualNode
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
    }
};

const valueChanged = 'valueChanged';
//@ts-ignore
class SingleValueField extends Field {
    constructor() {
        super();
        this.onInput = this.onInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onInput(event) {
        // Retrieve the new value
        const input = event.target;
        const value = this.getNewValue(input);
        //this.setValue(value); // Do not update the current value, since it can keep changing
        this.validate(value); // Validate the field on input
    }
    onChange(event) {
        const { name } = this.props;
        // Retrieve the new value
        const input = event.target;
        const value = this.getNewValue(input);
        this.setValue(value, this.onValueSet); // Update the current value
        //this.validate(value); // No need to validate again since this happens on input
        this.dispatchEvent(new CustomEvent(valueChanged, {
            detail: {
                name,
                value
            },
            bubbles: true,
            composed: true
        }));
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
SingleValueField.properties = {
    value: {
        type: Object,
        mutable: true,
        reflect: true
    }
};

//@ts-ignore
class TextField extends SingleValueField {
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
class TextArea extends SingleValueField {
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

//@ts-ignore
class Select extends AsyncDataLoadableMixin(SingleValueField) {
    [renderField]() {
        const { name, value, size, 
        //required,
        disabled } = this.props;
        return (h("select", { name: name, id: name, 
            // style={{ maxWidth, width }}
            value: value, size: size, onInput: this.onInput, onChange: this.onChange, 
            // onFocus={onFocus}
            onBlur: this.onBlur, disabled: disabled }, this.renderOptions()));
    }
    renderOptions() {
        const { emptyOption, options, data, valueProperty, displayProperty } = this.props;
        if (options !== undefined) {
            if (emptyOption !== undefined) {
                // Prepend the empty option
                const { label, value } = emptyOption;
                options.prependChildNode(h("option", { value: value }, label));
            }
            return options;
        }
        if (data !== undefined) {
            return (h(Fragment, null, data.map(item => h("option", { value: item[valueProperty] }, item[displayProperty]))));
        }
        return null; // No options to render
    }
}
Select.properties = {
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
    options: {
        type: VirtualNode
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-select`, Select);

//@ts-ignore
class HiddenField extends SingleValueField {
    [renderField]() {
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
class NumberField extends MinMaxMixin(SingleValueField) {
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
function formatDate$1(value) {
    const i = value.indexOf('T');
    return value.substr(0, i);
}
//@ts-ignore
class DateField extends MinMaxMixin(SingleValueField) {
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
            style: { minWidth: '150px' }, value: value !== undefined ? formatDate$1(value) : undefined, onChange: this.onChange, 
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
class FileField extends SingleValueField {
    constructor() {
        super();
        this.openFileDialog = this.openFileDialog.bind(this);
    }
    [renderField]() {
        const { name, 
        //value,
        accept, capture, multiple, size, 
        //required,
        disabled, } = this.props;
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
            data: data, renderData: record => {
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

const renderSubmitting = Symbol('renderSubmitting');
/**
 * Mixin to implement a component that can post data to a server
 * The derived/subclass must also implement ErrorableMixin
 * @param Base
 */
const AsyncDataSubmitableMixin = Base => { var _a; return _a = class AsyncDataSubmitable extends Base {
        constructor() {
            super();
            this.submit = this.submit.bind(this);
            this.onSubmitData = this.onSubmitData.bind(this);
            this.onSubmitError = this.onSubmitError.bind(this);
        }
        [renderSubmitting]() {
            const { submitting } = this.state;
            if (submitting === true) {
                return (h(Fragment, null,
                    h("gcl-overlay", null,
                        h("gcl-alert", { closable: "false", type: "info", message: "...Submitting" })),
                    this[renderDerived]()));
            }
            else {
                return this[renderDerived]();
            }
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
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
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
class Form extends AsyncDataSubmitableMixin(AsyncDataLoadableMixin(ErrorableMixin(ValidatableMixin(ContainerMixin(SizableMixin(CustomElement)))))) {
    constructor() {
        super();
        this._record = new DataRecord();
        this.reset = this.reset.bind(this);
    }
    render() {
        const { error, submitting } = this.state;
        if (error !== undefined) {
            return this[renderError]();
        }
        if (submitting === true) {
            return this[renderSubmitting]();
        }
        return this[renderDerived]();
    }
    [renderDerived]() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h("form", { size: size },
            h("slot", null),
            h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors }),
            this.renderButtons()));
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
        this.loadsCollection = false;
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
                field.setValue(data[key], field.onValueSet);
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

class MyListSingleSelection extends CustomElement {
    render() {
        return (h("gcl-list", { selection: '["a"]', selectable: true, selectionChanged: this.showSelection },
            h("gcl-list-item", { value: "a" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "en" })),
            h("gcl-list-item", { value: "b" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "fr" })),
            h("gcl-list-item", { value: "c" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "de" }))));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-single-selection', MyListSingleSelection);

class MyListMultipleSelection extends CustomElement {
    render() {
        return (h("gcl-list", { size: "large", selection: '["a", "c"]', selectable: true, multiple: true, selectionChanged: this.showSelection },
            h("gcl-list-item", { value: "a" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "en" })),
            h("gcl-list-item", { value: "b" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "fr" })),
            h("gcl-list-item", { value: "c" },
                h("gcl-icon", { name: "alarm-fill" }),
                h("gcl-text", { "intl-key": "goodMorning", lang: "de" }))));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-multiple-selection', MyListMultipleSelection);

class MyListSingleSelectionLoadData extends CustomElement {
    render() {
        return (h("gcl-list", { id: "listWithData", size: "small", selection: '["c"]', selectable: true, selectionChanged: this.showSelection, data: [
                {
                    value: 'a',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'en'
                },
                {
                    value: 'b',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'fr'
                },
                {
                    value: 'c',
                    iconName: 'alarm-fill',
                    textKey: 'goodMorning',
                    lang: 'de'
                }
            ], renderData: record => {
                const { value, iconName, textKey, lang } = record;
                return (h("gcl-list-item", { value: value },
                    h("gcl-icon", { name: iconName }),
                    h("gcl-text", { "intl-key": textKey, lang: lang })));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-single-selection-load-data', MyListSingleSelectionLoadData);

class MyListSingleSelectionLoadEmptyData extends CustomElement {
    render() {
        return (h("gcl-list", { id: "listWithEmptyData", size: "small", selection: '["c"]', selectable: true, selectionChanged: this.showSelection, data: [
            // Empty
            ], renderData: record => {
                const { value, iconName, textKey, lang } = record;
                return (h("gcl-list-item", { value: value },
                    h("gcl-icon", { name: iconName }),
                    h("gcl-text", { "intl-key": textKey, lang: lang })));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('my-list-single-selection-load-empty-data', MyListSingleSelectionLoadEmptyData);

/**
 * Shows a contacts list populated from a back end
 */
class ContactsList extends CustomElement {
    render() {
        return (h("gcl-list", { id: "contactsList", "load-url": "http://localhost:60314/api/contacts", size: "medium", selection: '[2]', selectable: true, selectionChanged: this.showSelection, renderData: record => {
                const { id, name, dateOfBirth, reputation, description, avatar } = record;
                return (h("gcl-list-item", { value: id },
                    h("gcl-text", null,
                        "Name: ",
                        name),
                    h("gcl-text", null,
                        "Date of Birth: ",
                        formatDate(dateOfBirth)),
                    h("gcl-text", null,
                        "Reputation: ",
                        reputation),
                    h("gcl-text", null,
                        "Description: ",
                        description),
                    h("img", { style: "width: 64px; height: 64px; border-radius: 50%;", src: `data:image/jpeg;base64,${avatar.content}` })));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('contacts-list', ContactsList);

/**
 * Shows a contact form populated and submitable to a back end
 */
class ContactForm extends CustomElement {
    render() {
        return (h("gcl-form", { id: "contactForm", "load-url": "http://localhost:60314/api/contacts/1", "submit-url": "http://localhost:60314/api/contacts/", size: "medium" },
            h("gcl-hidden-field", { name: "id", "is-id": "true" }),
            h("gcl-text-field", { label: "Name", name: "name", required: true }),
            h("gcl-select", { label: "Genre", name: "genre", "empty-option": {
                    label: '--Please choose an option--',
                    value: ''
                }, 
                // options={
                //     <Fragment>
                //         <option value="male">Male</option>
                //         <option value="female">Female</option>
                //     </Fragment>
                // }
                data: [
                    {
                        code: 'm',
                        description: 'Male'
                    },
                    {
                        code: 'f',
                        description: 'Female'
                    }
                ] }),
            h("gcl-date-field", { label: "Date of Birth", name: "dateOfBirth" }),
            h("gcl-number-field", { label: "Reputation", name: "reputation", min: "1", max: "10" }),
            h("gcl-text-area", { label: "Description", name: "description", rows: "5", cols: "30" }),
            h("gcl-file-field", { label: "Avatar", name: "avatar" })));
    }
}
//@ts-ignore
customElements.define('contact-form', ContactForm);

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
            h("gcl-button", { click: this.increment }, "Increment")));
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

export { Alert, App, Button, ContactForm, ContactsList, DateField, FileField, Form, Header, HiddenField, Icon, List, ListItem, MyCounter, MyListMultipleSelection, MyListSingleSelection, MyListSingleSelectionLoadData, MyListSingleSelectionLoadEmptyData, MyTable, NumberField, Overlay, Panel, Select, Table, Text, TextArea, TextField, ValidationSummary };
