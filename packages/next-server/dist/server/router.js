"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.route = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _pathMatch = _interopRequireDefault(require("./lib/path-match"));

var route = (0, _pathMatch.default)();
exports.route = route;

var Router =
/*#__PURE__*/
function () {
  function Router() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, Router);
    this.routes = routes;
  }

  (0, _createClass2.default)(Router, [{
    key: "add",
    value: function add(route) {
      this.routes.unshift(route);
    }
  }, {
    key: "match",
    value: function match(req, res, parsedUrl) {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return;
      }

      var pathname = parsedUrl.pathname;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var route = _step.value;
          var params = route.match(pathname);

          if (params) {
            return {
              v: function v() {
                return route.fn(req, res, params, parsedUrl);
              }
            };
          }
        };

        for (var _iterator = (0, _getIterator2.default)(this.routes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
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
    }
  }]);
  return Router;
}();

exports.default = Router;