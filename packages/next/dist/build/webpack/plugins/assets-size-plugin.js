"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _zlib = require("zlib");

var _path = require("path");

var _promisify = _interopRequireDefault(require("../../../lib/promisify"));

var _constants = require("next-server/constants");

// Some parts of this file are licensed under the following :

/**
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var gzip = (0, _promisify.default)(_zlib.gzip); // This part is based on https://github.com/sindresorhus/pretty-bytes/blob/v5.1.0/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

var UNITS = ['B', 'kB', 'MB'];

var prettyBytes = function prettyBytes(number) {
  var exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);
  number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
  var unit = UNITS[exponent];
  return number + ' ' + unit;
};

var AssetsSizePlugin =
/*#__PURE__*/
function () {
  function AssetsSizePlugin(_ref) {
    var buildId = _ref.buildId,
        distDir = _ref.distDir;
    (0, _classCallCheck2.default)(this, AssetsSizePlugin);
    this.buildId = buildId;
    this.distDir = distDir ? (0, _path.relative)(process.cwd(), distDir) + '/' : '';
  }

  (0, _createClass2.default)(AssetsSizePlugin, [{
    key: "formatFilename",
    value: function formatFilename(rawFilename) {
      // add distDir
      var filename = this.distDir + rawFilename; // shorten buildId

      if (this.buildId) {
        filename = filename.replace(this.buildId + '/', this.buildId.substring(0, 4) + '****/');
      } // shorten hashes


      filename = filename.replace(/(.*[-.])([0-9a-f]{8,})(\.js|\.css)/, function (_, c1, hash, c2) {
        return c1 + hash.substring(0, 4) + '****' + c2;
      });
      return filename;
    }
  }, {
    key: "printAssetsSize",
    value: function () {
      var _printAssetsSize = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(assets) {
        var sizes, longestPrettySize, message, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref5, filename, prettySize, padding, formattedSize, formattedFilename;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _promise.default.all((0, _keys.default)(assets).filter(function (filename) {
                  return filename !== _constants.REACT_LOADABLE_MANIFEST && filename !== _constants.BUILD_MANIFEST;
                }).sort(function (a, b) {
                  // put pages at the top, then the rest
                  var _map = [a, b].map(function (x) {
                    return _constants.IS_BUNDLED_PAGE_REGEX.exec(x);
                  }),
                      _map2 = (0, _slicedToArray2.default)(_map, 2),
                      pa = _map2[0],
                      pb = _map2[1];

                  if (pa && !pb) return -1;
                  if (pb && !pa) return 1;
                  if (a > b) return 1;
                  return -1;
                }).map(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee(filename) {
                    var asset, size;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            asset = assets[filename];
                            _context.next = 3;
                            return gzip(asset.source());

                          case 3:
                            size = _context.sent.length;
                            return _context.abrupt("return", {
                              filename: filename,
                              prettySize: prettyBytes(size)
                            });

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 2:
                sizes = _context2.sent;
                // find longest prettySize string size
                longestPrettySize = Math.max.apply(Math, (0, _toConsumableArray2.default)(sizes.map(function (_ref3) {
                  var prettySize = _ref3.prettySize;
                  return prettySize.length;
                })));
                message = '\nBrowser assets sizes after gzip:\n\n';
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 8;

                for (_iterator = (0, _getIterator2.default)(sizes); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _ref5 = _step.value;
                  filename = _ref5.filename, prettySize = _ref5.prettySize;
                  padding = ' '.repeat(longestPrettySize - prettySize.length);
                  formattedSize = prettySize;
                  formattedFilename = this.formatFilename(filename);
                  message += "   ".concat(padding).concat(formattedSize, "  ").concat(formattedFilename, "\n");
                }

                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 16:
                _context2.prev = 16;
                _context2.prev = 17;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 19:
                _context2.prev = 19;

                if (!_didIteratorError) {
                  _context2.next = 22;
                  break;
                }

                throw _iteratorError;

              case 22:
                return _context2.finish(19);

              case 23:
                return _context2.finish(16);

              case 24:
                console.log(message);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 12, 16, 24], [17,, 19, 23]]);
      }));

      return function printAssetsSize(_x) {
        return _printAssetsSize.apply(this, arguments);
      };
    }()
  }, {
    key: "apply",
    value: function () {
      var _apply = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(compiler) {
        var _this = this;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                compiler.hooks.afterEmit.tapPromise('AssetsSizePlugin', function (compilation) {
                  return _this.printAssetsSize(compilation.assets).catch(console.error);
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function apply(_x3) {
        return _apply.apply(this, arguments);
      };
    }()
  }]);
  return AssetsSizePlugin;
}();

exports.default = AssetsSizePlugin;