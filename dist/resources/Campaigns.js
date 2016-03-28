'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClassyResource = require('../ClassyResource');

var _ClassyResource2 = _interopRequireDefault(_ClassyResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Campaigns = function (_Resource) {
  _inherits(Campaigns, _Resource);

  function Campaigns(Classy) {
    _classCallCheck(this, Campaigns);

    /** Custom */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Campaigns).call(this, Classy, {
      basic: ['retrieve', 'update'],
      lists: ['activity', 'credential-sets', 'ecards', 'faqs', 'fundraising-teams', 'questions', 'recurring-donation-plans', 'transactions', 'ticket-types'],
      creates: ['appeal-sets', 'credential-sets', 'ecards', 'faqs', 'questions', 'ticket-types', 'fundraising-pages', 'transactions'],
      path: '/campaigns'
    }));

    _this.publish = _this.createMethod({
      method: 'POST',
      path: '/{id}/publish'
    });

    _this.unpublish = _this.createMethod({
      method: 'POST',
      path: '/{id}/unpublish'
    });

    /** Retrieves */
    _this.retrieveAppealSet = _this.createMethod({
      method: 'GET',
      path: '/{id}/appeal-set'
    });

    _this.retrieveTheme = _this.createMethod({
      method: 'GET',
      path: '/{id}/themes'
    });

    _this.retrieveOverview = _this.createMethod({
      method: 'GET',
      path: '/{id}/overview'
    });

    return _this;
  }

  return Campaigns;
}(_ClassyResource2.default);

exports.default = Campaigns;