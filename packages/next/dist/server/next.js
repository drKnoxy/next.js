"use strict";

// This file is used for when users run `require('next')`
module.exports = function (options) {
  if (options.dev) {
    var Server = require('./next-dev-server').default;

    return new Server(options);
  }

  var next = require('next-server');

  return next(options);
};