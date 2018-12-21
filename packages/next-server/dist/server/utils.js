"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInternalUrl = isInternalUrl;
exports.isBlockedPage = isBlockedPage;

var _constants = require("next-server/constants");

var internalPrefixes = [/^\/_next\//, /^\/static\//];

function isInternalUrl(url) {
  for (var _i = 0; _i < internalPrefixes.length; _i++) {
    var prefix = internalPrefixes[_i];

    if (prefix.test(url)) {
      return true;
    }
  }

  return false;
}

function isBlockedPage(pathname) {
  return _constants.BLOCKED_PAGES.indexOf(pathname) !== -1;
}