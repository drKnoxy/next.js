"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _path = require("path");

var _promisify = _interopRequireDefault(require("../lib/promisify"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _nanoid = _interopRequireDefault(require("nanoid"));

var _nextConfig = _interopRequireDefault(require("next-server/next-config"));

var _constants = require("next-server/constants");

var _webpack2 = _interopRequireDefault(require("./webpack"));

var access = (0, _promisify.default)(_fs.default.access);
var writeFile = (0, _promisify.default)(_fs.default.writeFile);

function generateBuildId(_x, _x2) {
  return _generateBuildId.apply(this, arguments);
}

function _generateBuildId() {
  _generateBuildId = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(generate, fallback) {
    var buildId;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return generate();

          case 2:
            buildId = _context2.sent;

            // If there's no buildId defined we'll fall back
            if (buildId === null) {
              buildId = fallback();
            }

            if (!(typeof buildId !== 'string')) {
              _context2.next = 6;
              break;
            }

            throw new Error('generateBuildId did not return a string. https://err.sh/zeit/next.js/generatebuildid-not-a-string');

          case 6:
            return _context2.abrupt("return", buildId.trim());

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _generateBuildId.apply(this, arguments);
}

function ensureProjectDirectoryIsWriteAble(_x3) {
  return _ensureProjectDirectoryIsWriteAble.apply(this, arguments);
}

function _ensureProjectDirectoryIsWriteAble() {
  _ensureProjectDirectoryIsWriteAble = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(dir) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return access(dir, (_fs.default.constants || _fs.default).W_OK);

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new Error('Build directory is not writeable. https://err.sh/zeit/next.js/build-dir-not-writeable');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 5]]);
  }));
  return _ensureProjectDirectoryIsWriteAble.apply(this, arguments);
}

function build(_x4) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(dir) {
    var conf,
        lambdas,
        config,
        lambdasOption,
        distDir,
        buildId,
        configs,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            conf = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
            lambdas = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
            config = (0, _nextConfig.default)(_constants.PHASE_PRODUCTION_BUILD, dir, conf);
            lambdasOption = config.lambdas ? config.lambdas : lambdas;
            distDir = (0, _path.join)(dir, config.distDir);
            _context4.next = 7;
            return generateBuildId(config.generateBuildId, _nanoid.default);

          case 7:
            buildId = _context4.sent;
            _context4.next = 10;
            return ensureProjectDirectoryIsWriteAble(dir);

          case 10:
            _context4.prev = 10;
            _context4.next = 13;
            return _promise.default.all([(0, _webpack2.default)(dir, {
              buildId: buildId,
              isServer: false,
              config: config,
              lambdas: lambdasOption
            }), (0, _webpack2.default)(dir, {
              buildId: buildId,
              isServer: true,
              config: config,
              lambdas: lambdasOption
            })]);

          case 13:
            configs = _context4.sent;
            _context4.next = 16;
            return runCompiler(configs);

          case 16:
            _context4.next = 18;
            return writeBuildId(distDir, buildId);

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](10);
            console.error("> Failed to build");
            throw _context4.t0;

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[10, 20]]);
  }));
  return _build.apply(this, arguments);
}

function runCompiler(compiler) {
  return new _promise.default(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(resolve, reject) {
      var webpackCompiler;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = _webpack.default;
              _context.next = 3;
              return compiler;

            case 3:
              _context.t1 = _context.sent;
              _context.next = 6;
              return (0, _context.t0)(_context.t1);

            case 6:
              webpackCompiler = _context.sent;
              webpackCompiler.run(function (err, stats) {
                if (err) {
                  var _console;

                  console.log((0, _objectSpread2.default)({}, err));

                  (_console = console).log.apply(_console, (0, _toConsumableArray2.default)(stats.errors));

                  return reject(err);
                }

                var buildFailed = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = (0, _getIterator2.default)(stats.stats), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var stat = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = (0, _getIterator2.default)(stat.compilation.errors), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var error = _step2.value;
                        buildFailed = true;
                        console.error('ERROR', error);
                        console.error('ORIGINAL ERROR', error.error);
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = (0, _getIterator2.default)(stat.compilation.warnings), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var warning = _step3.value;
                        console.warn('WARNING', warning);
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                if (buildFailed) {
                  return reject(new Error('Webpack errors'));
                }

                resolve();
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }());
}

function writeBuildId(_x7, _x8) {
  return _writeBuildId.apply(this, arguments);
}

function _writeBuildId() {
  _writeBuildId = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(distDir, buildId) {
    var buildIdPath;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            buildIdPath = (0, _path.join)(distDir, _constants.BUILD_ID_FILE);
            _context5.next = 3;
            return writeFile(buildIdPath, buildId, 'utf8');

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _writeBuildId.apply(this, arguments);
}