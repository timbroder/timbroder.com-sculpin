"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _gatsbyLink = require("gatsby-link");

var _internals = require("./internals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$plugi = (0, _extends3.default)({}, _internals.defaultOptions, pluginOptions),
      feeds = _defaultOptions$plugi.feeds;

  var links = feeds.map(function (_ref2, i) {
    var output = _ref2.output;

    if (output.charAt(0) !== "/") {
      output = "/" + output;
    }

    return _react2.default.createElement("link", {
      key: "gatsby-plugin-feed-" + i,
      rel: "alternate",
      type: "application/rss+xml",
      href: "https://feeds.feedburner.com/timbroder"
    });
  });

  setHeadComponents(links);
};
