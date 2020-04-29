function DOMParser(options) {
    this.options = options || {
        locator: {}
    };
}

DOMParser.prototype.parseFromString = function(source, mimeType) {
    var options = this.options;
    var sax = new XMLReader();
    var domBuilder = options.domBuilder || new DOMHandler();
    //contentHandler and LexicalHandler
        var errorHandler = options.errorHandler;
    var locator = options.locator;
    var defaultNSMap = options.xmlns || {};
    var isHTML = /\/x?html?$/.test(mimeType);
    //mimeType.toLowerCase().indexOf('html') > -1;
        var entityMap = isHTML ? htmlEntity.entityMap : {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'"
    };
    if (locator) {
        domBuilder.setDocumentLocator(locator);
    }
    sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
    sax.domBuilder = options.domBuilder || domBuilder;
    if (isHTML) {
        defaultNSMap[""] = "http://www.w3.org/1999/xhtml";
    }
    defaultNSMap.xml = defaultNSMap.xml || "http://www.w3.org/XML/1998/namespace";
    if (source) {
        sax.parse(source, defaultNSMap, entityMap);
    } else {
        sax.errorHandler.error("invalid doc source");
    }
    return domBuilder.doc;
};

function buildErrorHandler(errorImpl, domBuilder, locator) {
    if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
            return domBuilder;
        }
        errorImpl = domBuilder;
    }
    var errorHandler = {};
    var isCallback = errorImpl instanceof Function;
    locator = locator || {};
    function build(key) {
        var fn = errorImpl[key];
        if (!fn && isCallback) {
            fn = errorImpl.length == 2 ? function(msg) {
                errorImpl(key, msg);
            } : errorImpl;
        }
        errorHandler[key] = fn && function(msg) {
            fn("[xmldom " + key + "]\t" + msg + _locator(locator));
        } || function() {};
    }
    build("warning");
    build("error");
    build("fatalError");
    return errorHandler;
}

function DOMHandler() {
    this.cdata = false;
}

function position(locator, node) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
}

DOMHandler.prototype = {
    startDocument: function startDocument() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
            this.doc.documentURI = this.locator.systemId;
        }
    },
    startElement: function startElement(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
            var namespaceURI = attrs.getURI(i);
            var value = attrs.getValue(i);
            var qName = attrs.getQName(i);
            var attr = doc.createAttributeNS(namespaceURI, qName);
            this.locator && position(attrs.getLocator(i), attr);
            attr.value = attr.nodeValue = value;
            el.setAttributeNode(attr);
        }
    },
    endElement: function endElement(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
    },
    startPrefixMapping: function startPrefixMapping(prefix, uri) {},
    endPrefixMapping: function endPrefixMapping(prefix) {},
    processingInstruction: function processingInstruction(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
    },
    ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
    characters: function characters(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
            if (this.cdata) {
                var charNode = this.doc.createCDATASection(chars);
            } else {
                var charNode = this.doc.createTextNode(chars);
            }
            if (this.currentElement) {
                this.currentElement.appendChild(charNode);
            } else if (/^\s*$/.test(chars)) {
                this.doc.appendChild(charNode);
            }
            this.locator && position(this.locator, charNode);
        }
    },
    skippedEntity: function skippedEntity(name) {},
    endDocument: function endDocument() {
        this.doc.normalize();
    },
    setDocumentLocator: function setDocumentLocator(locator) {
        if (this.locator = locator) {
            locator.lineNumber = 0;
        }
    },
    comment: function comment(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
    },
    startCDATA: function startCDATA() {
        this.cdata = true;
    },
    endCDATA: function endCDATA() {
        this.cdata = false;
    },
    startDTD: function startDTD(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
            var dt = impl.createDocumentType(name, publicId, systemId);
            this.locator && position(this.locator, dt);
            appendElement(this, dt);
        }
    },
    warning: function warning(error) {
        console.warn("[xmldom warning]\t" + error, _locator(this.locator));
    },
    error: function error(_error) {
        console.error("[xmldom error]\t" + _error, _locator(this.locator));
    },
    fatalError: function fatalError(error) {
        console.error("[xmldom fatalError]\t" + error, _locator(this.locator));
        throw error;
    }
};

function _locator(l) {
    if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
    }
}

function _toString(chars, start, length) {
    if (typeof chars == "string") {
        return chars.substr(start, length);
    } else {
        if (chars.length >= start + length || start) {
            return new java.lang.String(chars, start, length) + "";
        }
        return chars;
    }
}

"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
    DOMHandler.prototype[key] = function() {
        return null;
    };
});

function appendElement(hander, node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}

var htmlEntity = require("./entities");

var XMLReader = require("./sax").XMLReader;

var DOMImplementation = exports.DOMImplementation = require("./dom").DOMImplementation;

exports.XMLSerializer = require("./dom").XMLSerializer;

exports.DOMParser = DOMParser;