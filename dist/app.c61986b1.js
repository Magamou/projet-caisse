// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Classes/transaction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction(name, type, montant, motif) {
    this.name = name;
    this.type = type;
    this.montant = montant;
    this.motif = motif;
  }

  Transaction.prototype.getTransaction = function () {
    return this;
  };

  Transaction.prototype.getName = function () {
    return this.name;
  };

  Transaction.prototype.getType = function () {
    return this.type;
  };

  Transaction.prototype.getMontant = function () {
    return this.montant;
  };

  Transaction.prototype.getMotif = function () {
    return this.motif;
  };

  return Transaction;
}();

exports.Transaction = Transaction;
},{}],"Classes/observable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caisse = void 0;

var Caisse =
/** @class */
function () {
  function Caisse(solde) {
    this.solde = solde;
    this.transactions = [];
    this.observers = []; // console.log("Caisse Works");

    this.notifyObserver();
  }

  Caisse.prototype.subscribe = function (observer) {
    this.observers.push(observer);
    this.notifyObserver();
  };

  Caisse.prototype.unsubscribe = function (observer) {
    this.observers = this.observers.filter(function (obs) {
      return obs !== observer;
    });
  };

  Caisse.prototype.notifyObserver = function () {
    var _this = this;

    this.observers.forEach(function (obs) {
      obs.update(_this.transactions);
    });
  };

  Caisse.prototype.addTransaction = function (trans) {
    this.transactions.push(trans); // console.log("Add Transaction", this.transactions);
  };

  return Caisse;
}();

exports.Caisse = Caisse;
},{}],"Classes/observer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Personal = exports.List = exports.solde_nbstrans_state = void 0;

var solde_nbstrans_state =
/** @class */
function () {
  function solde_nbstrans_state(view) {
    this.view = view;
    this.t_debit = 0;
    this.t_credit = 0;
    this.solde = 0;
  }

  solde_nbstrans_state.prototype.update = function (data) {
    var _this = this;

    console.log("Class: solde_nbtrans_sate--", data);
    this.solde = 0;
    this.t_credit = 0;
    this.t_debit = 0;
    data.forEach(function (obj) {
      if (obj.getType() === "Debit") {
        _this.t_debit += 1;
        _this.solde -= obj.getMontant();
      } else {
        _this.t_credit += 1;
        _this.solde += obj.getMontant();
      }
    });
    console.log("solde: ".concat(this.solde, "  tc:").concat(this.t_credit, "  td:").concat(this.t_debit));
    this.view.Render(this.solde, this.t_credit, this.t_debit);
  };

  return solde_nbstrans_state;
}();

exports.solde_nbstrans_state = solde_nbstrans_state;

var List =
/** @class */
function () {
  function List(view) {
    this.view = view;
  }

  List.prototype.update = function (data) {
    this.view.Render(data);
  };

  return List;
}();

exports.List = List;

var Personal =
/** @class */
function () {
  function Personal(view) {
    this.view = view;
    console.log("personalTrans work");
  }

  Personal.prototype.update = function (data) {
    this.uniqueName = Array.from(new Set(data.map(function (obj) {
      return obj.getName();
    })));
    console.log("Update personalTrans", this.uniqueName);
    this.view.Render(data, this.uniqueName);
  };

  return Personal;
}();

exports.Personal = Personal;
},{}],"view/s_nt_st.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewSts = void 0;

var viewSts =
/** @class */
function () {
  function viewSts() {
    this.soldeValue = document.querySelector('#solde-value');
    this.tdebit = document.querySelector('#totalDebit');
    this.tcredit = document.querySelector('#totalCredit');
    this.state = document.querySelector("#state-text");
  }

  viewSts.prototype.Render = function (solde, tc, td) {
    this.soldeValue.innerHTML = solde.toString();
    this.tcredit.innerHTML = tc.toString();
    this.tdebit.innerHTML = td.toString();
    this.state.className = solde > 0 ? 'crediteur' : 'debiteur';
  };

  return viewSts;
}();

exports.viewSts = viewSts;
},{}],"view/list.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrowList = void 0;

var DrowList =
/** @class */
function () {
  function DrowList() {}

  DrowList.prototype.Render = function (data) {
    var ul = document.querySelector("#liste");
    ul.innerHTML = "";
    data.forEach(function (obj) {
      ul.insertAdjacentHTML("beforeend", "\n                <li class=".concat(obj.getType() === "Debit" ? "debit" : "credit", ">\n                ").concat(obj.getMontant(), " F ont \xE9t\xE9 ").concat(obj.getType() === "Debit" ? "Retiré" : "Déposé", "\n                par ").concat(obj.getName(), " suite ").concat(obj.getMotif(), " </li>\n                "));
    });
  };

  return DrowList;
}();

exports.DrowList = DrowList;
},{}],"view/personnal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personalTable = void 0;

var personalTable =
/** @class */
function () {
  function personalTable() {}

  personalTable.prototype.Render = function (data, uniqueName) {
    var table = document.querySelector("#autor");
    table.innerHTML = "";

    var _loop_1 = function _loop_1(i) {
      var arr1 = data.filter(function (e) {
        return e.getName() === uniqueName[i];
      });
      var name = arr1[0].getName();
      var totalDebit = 0;
      var totalCredit = 0;
      arr1.forEach(function (e) {
        if (e.getType() === "Debit") {
          totalDebit += e.getMontant();
        } else {
          totalCredit += e.getMontant();
        }
      });
      console.log("name:".concat(name, " totalCredit:").concat(totalCredit, " totalDebit:").concat(totalDebit));
      table.insertAdjacentHTML("beforeend", "\n            <tr>\n                <td>".concat(name, "</td>\n                <td>").concat(totalDebit, "</td>\n                <td>").concat(totalCredit, "</td>\n            </tr>\n            "));
    };

    for (var i = 0; i < uniqueName.length; i++) {
      _loop_1(i);
    }
  }; //


  return personalTable;
}();

exports.personalTable = personalTable;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var transaction_1 = require("./Classes/transaction");

var observable_1 = require("./Classes/observable");

var observer_1 = require("./Classes/observer");

var s_nt_st_1 = require("./view/s_nt_st");

var list_1 = require("./view/list");

var personnal_1 = require("./view/personnal");

var htmlFullname = document.querySelector("#fullname");
var htmlType = document.querySelector("#type");
var htmlMontant = document.querySelector("#montant");
var htmlMotif = document.querySelector("#motif");
var button = document.querySelector("#valid");
var caisse = new observable_1.Caisse(0);
var snc = new observer_1.solde_nbstrans_state(new s_nt_st_1.viewSts());
var listTr = new observer_1.List(new list_1.DrowList());
var personal = new observer_1.Personal(new personnal_1.personalTable());
caisse.subscribe(snc);
caisse.subscribe(listTr);
caisse.subscribe(personal);
button.addEventListener("click", function (e) {
  var tr = new transaction_1.Transaction(htmlFullname.value, htmlType.value, +htmlMontant.value, htmlMotif.value);
  caisse.addTransaction(tr);
  caisse.notifyObserver();
});
},{"./Classes/transaction":"Classes/transaction.ts","./Classes/observable":"Classes/observable.ts","./Classes/observer":"Classes/observer.ts","./view/s_nt_st":"view/s_nt_st.ts","./view/list":"view/list.ts","./view/personnal":"view/personnal.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49777" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map