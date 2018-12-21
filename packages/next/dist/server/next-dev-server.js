"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _nextServer = _interopRequireDefault(require("next-server/dist/server/next-server"));

var _path = require("path");

var _hotReloader = _interopRequireDefault(require("./hot-reloader"));

var _router = require("next-server/dist/server/router");

var _constants = require("next-server/constants");

var DevServer =
/*#__PURE__*/
function (_Server) {
  (0, _inherits2.default)(DevServer, _Server);

  function DevServer(options) {
    var _this;

    (0, _classCallCheck2.default)(this, DevServer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DevServer).call(this, options));
    _this.hotReloader = new _hotReloader.default(_this.dir, {
      config: _this.nextConfig,
      buildId: _this.buildId
    });
    _this.renderOpts.dev = true;
    return _this;
  }

  (0, _createClass2.default)(DevServer, [{
    key: "currentPhase",
    value: function currentPhase() {
      return _constants.PHASE_DEVELOPMENT_SERVER;
    }
  }, {
    key: "readBuildId",
    value: function readBuildId() {
      return 'development';
    }
  }, {
    key: "addExportPathMapRoutes",
    value: function () {
      var _addExportPathMapRoutes = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var _this2 = this;

        var exportPathMap, _loop, path;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.nextConfig.exportPathMap) {
                  _context2.next = 7;
                  break;
                }

                console.log('Defining routes from exportPathMap');
                _context2.next = 4;
                return this.nextConfig.exportPathMap({}, {
                  dev: true,
                  dir: this.dir,
                  outDir: null,
                  distDir: this.distDir,
                  buildId: this.buildId
                });

              case 4:
                exportPathMap = _context2.sent;

                _loop = function _loop(path) {
                  var _exportPathMap$path = exportPathMap[path],
                      page = _exportPathMap$path.page,
                      _exportPathMap$path$q = _exportPathMap$path.query,
                      query = _exportPathMap$path$q === void 0 ? {} : _exportPathMap$path$q; // We use unshift so that we're sure the routes is defined before Next's default routes

                  _this2.router.add({
                    match: (0, _router.route)(path),
                    fn: function () {
                      var _fn = (0, _asyncToGenerator2.default)(
                      /*#__PURE__*/
                      _regenerator.default.mark(function _callee(req, res, params, parsedUrl) {
                        var urlQuery, mergedQuery;
                        return _regenerator.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                urlQuery = parsedUrl.query;
                                (0, _keys.default)(urlQuery).filter(function (key) {
                                  return query[key] === undefined;
                                }).forEach(function (key) {
                                  return console.warn("Url defines a query parameter '".concat(key, "' that is missing in exportPathMap"));
                                });
                                mergedQuery = (0, _objectSpread2.default)({}, urlQuery, query);
                                _context.next = 5;
                                return _this2.render(req, res, page, mergedQuery, parsedUrl);

                              case 5:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      }));

                      return function fn(_x, _x2, _x3, _x4) {
                        return _fn.apply(this, arguments);
                      };
                    }()
                  });
                };

                // In development we can't give a default path mapping
                for (path in exportPathMap) {
                  _loop(path);
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function addExportPathMapRoutes() {
        return _addExportPathMapRoutes.apply(this, arguments);
      };
    }()
  }, {
    key: "prepare",
    value: function () {
      var _prepare = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "prepare", this).call(this);

              case 2:
                _context3.next = 4;
                return this.addExportPathMapRoutes();

              case 4:
                _context3.next = 6;
                return this.hotReloader.start();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function prepare() {
        return _prepare.apply(this, arguments);
      };
    }()
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.hotReloader.stop();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function close() {
        return _close.apply(this, arguments);
      };
    }()
  }, {
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(req, res, parsedUrl) {
        var _ref, finished;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.hotReloader.run(req, res, parsedUrl);

              case 2:
                _ref = _context5.sent;
                finished = _ref.finished;

                if (!finished) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return");

              case 6:
                return _context5.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "run", this).call(this, req, res, parsedUrl));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function run(_x5, _x6, _x7) {
        return _run.apply(this, arguments);
      };
    }()
  }, {
    key: "generateRoutes",
    value: function generateRoutes() {
      var _this3 = this;

      var routes = (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "generateRoutes", this).call(this); // In development we expose all compiled files for react-error-overlay's line show feature
      // We use unshift so that we're sure the routes is defined before Next's default routes

      routes.unshift({
        match: (0, _router.route)('/_next/development/:path*'),
        fn: function () {
          var _fn2 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee6(req, res, params) {
            var p;
            return _regenerator.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    p = _path.join.apply(void 0, [_this3.distDir].concat((0, _toConsumableArray2.default)(params.path || [])));
                    _context6.next = 3;
                    return _this3.serveStatic(req, res, p);

                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          return function fn(_x8, _x9, _x10) {
            return _fn2.apply(this, arguments);
          };
        }()
      });
      return routes;
    }
  }, {
    key: "renderToHTML",
    value: function () {
      var _renderToHTML = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(req, res, pathname, query) {
        var compilationErr;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getCompilationError(pathname);

              case 2:
                compilationErr = _context7.sent;

                if (!compilationErr) {
                  _context7.next = 6;
                  break;
                }

                res.statusCode = 500;
                return _context7.abrupt("return", this.renderErrorToHTML(compilationErr, req, res, pathname, query));

              case 6:
                _context7.prev = 6;
                _context7.next = 9;
                return this.hotReloader.ensurePage(pathname);

              case 9:
                _context7.next = 17;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](6);

                if (!(_context7.t0.code === 'ENOENT')) {
                  _context7.next = 16;
                  break;
                }

                res.statusCode = 404;
                return _context7.abrupt("return", this.renderErrorToHTML(null, req, res, pathname, query));

              case 16:
                if (!this.quiet) console.error(_context7.t0);

              case 17:
                return _context7.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "renderToHTML", this).call(this, req, res, pathname, query));

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[6, 11]]);
      }));

      return function renderToHTML(_x11, _x12, _x13, _x14) {
        return _renderToHTML.apply(this, arguments);
      };
    }()
  }, {
    key: "renderErrorToHTML",
    value: function () {
      var _renderErrorToHTML = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(err, req, res, pathname, query) {
        var compilationErr, out;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getCompilationError(pathname);

              case 2:
                compilationErr = _context8.sent;

                if (!compilationErr) {
                  _context8.next = 6;
                  break;
                }

                res.statusCode = 500;
                return _context8.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "renderErrorToHTML", this).call(this, compilationErr, req, res, pathname, query));

              case 6:
                _context8.prev = 6;
                _context8.next = 9;
                return (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "renderErrorToHTML", this).call(this, err, req, res, pathname, query);

              case 9:
                out = _context8.sent;
                return _context8.abrupt("return", out);

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](6);
                if (!this.quiet) console.error(_context8.t0);
                res.statusCode = 500;
                return _context8.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(DevServer.prototype), "renderErrorToHTML", this).call(this, _context8.t0, req, res, pathname, query));

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[6, 13]]);
      }));

      return function renderErrorToHTML(_x15, _x16, _x17, _x18, _x19) {
        return _renderErrorToHTML.apply(this, arguments);
      };
    }()
  }, {
    key: "setImmutableAssetCacheControl",
    value: function setImmutableAssetCacheControl(res) {
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
    }
  }, {
    key: "getCompilationError",
    value: function () {
      var _getCompilationError = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9(page) {
        var errors;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.hotReloader.getCompilationErrors(page);

              case 2:
                errors = _context9.sent;

                if (!(errors.length === 0)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return");

              case 5:
                return _context9.abrupt("return", errors[0]);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function getCompilationError(_x20) {
        return _getCompilationError.apply(this, arguments);
      };
    }()
  }]);
  return DevServer;
}(_nextServer.default);

exports.default = DevServer;