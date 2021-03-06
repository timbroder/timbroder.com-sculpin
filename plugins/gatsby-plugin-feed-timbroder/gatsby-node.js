"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _rss = require("rss");

var _rss2 = _interopRequireDefault(_rss);

var _lodash = require("lodash.merge");

var _lodash2 = _interopRequireDefault(_lodash);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _internals = require("./internals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = "./public";

// A default function to transform query data into feed entries.
var serialize = function serialize(_ref) {
  var _ref$query = _ref.query,
      site = _ref$query.site,
      allMarkdownRemark = _ref$query.allMarkdownRemark;
  return allMarkdownRemark.edges.map(function (edge) {
    return (0, _extends3.default)({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      url: site.siteMetadata.siteUrl + edge.node.fields.slug,
      guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
      custom_elements: [{ "content:encoded": edge.node.html }]
    });
  });
};

exports.onPostBuild = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2, pluginOptions) {
    var graphql = _ref2.graphql;

    var options, _loop, _iterator, _isArray, _i, _ref4, f;

    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            delete pluginOptions.plugins;

            /*
             * Run the site settings query to gather context, then
             * then run the corresponding feed for each query.
             */
            options = (0, _extends3.default)({}, _internals.defaultOptions, pluginOptions);

            if (!("query" in options)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return (0, _internals.runQuery)(graphql, options.query);

          case 5:
            options.query = _context2.sent;

          case 6:
            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(f) {
              var _options$f, setup, locals, feed, serializer, items, outputPath, outputDir;

              return _regenerator2.default.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!f.query) {
                        _context.next = 5;
                        break;
                      }

                      _context.next = 3;
                      return (0, _internals.runQuery)(graphql, f.query);

                    case 3:
                      f.query = _context.sent;


                      if (options.query) {
                        f.query = (0, _lodash2.default)(options.query, f.query);
                        delete options.query;
                      }

                    case 5:
                      _options$f = (0, _extends3.default)({}, options, f), setup = _options$f.setup, locals = (0, _objectWithoutProperties3.default)(_options$f, ["setup"]);
                      feed = new _rss2.default(setup(locals));
                      serializer = f.serialize && typeof f.serialize === "function" ? f.serialize : serialize;
                      items = serializer(locals);


                      items.forEach(function (i) {
                        return feed.item(i);
                      });

                      outputPath = _path2.default.join(publicPath, f.output);
                      outputDir = _path2.default.dirname(outputPath);

                      if (!_fs2.default.existsSync(outputDir)) {
                        _mkdirp2.default.sync(outputDir);
                      }
                      _context.next = 15;
                      return (0, _internals.writeFile)(outputPath, feed.xml());

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, undefined);
            });
            _iterator = options.feeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 8:
            if (!_isArray) {
              _context2.next = 14;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("break", 22);

          case 11:
            _ref4 = _iterator[_i++];
            _context2.next = 18;
            break;

          case 14:
            _i = _iterator.next();

            if (!_i.done) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("break", 22);

          case 17:
            _ref4 = _i.value;

          case 18:
            f = _ref4;
            return _context2.delegateYield(_loop(f), "t0", 20);

          case 20:
            _context2.next = 8;
            break;

          case 22:
            return _context2.abrupt("return", _promise2.default.resolve());

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();