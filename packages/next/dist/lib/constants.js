"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PAGES_DIR = exports.NEXT_PROJECT_ROOT_NODE_MODULES = exports.NEXT_PROJECT_ROOT_DIST = exports.NEXT_PROJECT_ROOT = void 0;

var _path = require("path");

var NEXT_PROJECT_ROOT = (0, _path.join)(__dirname, '..', '..');
exports.NEXT_PROJECT_ROOT = NEXT_PROJECT_ROOT;
var NEXT_PROJECT_ROOT_DIST = (0, _path.join)(NEXT_PROJECT_ROOT, 'dist');
exports.NEXT_PROJECT_ROOT_DIST = NEXT_PROJECT_ROOT_DIST;
var NEXT_PROJECT_ROOT_NODE_MODULES = (0, _path.join)(NEXT_PROJECT_ROOT, 'node_modules');
exports.NEXT_PROJECT_ROOT_NODE_MODULES = NEXT_PROJECT_ROOT_NODE_MODULES;
var DEFAULT_PAGES_DIR = (0, _path.join)(NEXT_PROJECT_ROOT_DIST, 'pages');
exports.DEFAULT_PAGES_DIR = DEFAULT_PAGES_DIR;