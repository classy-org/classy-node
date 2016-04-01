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

var Organizations = function (_Resource) {
  _inherits(Organizations, _Resource);

  function Organizations(Classy) {
    _classCallCheck(this, Organizations);

    /** Updates */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Organizations).call(this, Classy, {
      basic: ['retrieve'],
      lists: ['activity', 'analytics', 'campaigns', 'designations', 'engagement-settings', 'messages', 'recurring-donation-plans', 'supporters', 'transactions'],
      creates: ['campaigns', 'designations'],
      path: '/organizations'
    }));

    _this.updateEngagementSettings = _this.createMethod({
      method: 'PUT',
      path: '/{id}/engagement-settings'
    });

    /** Retrieves */
    _this.retrieveMailchimpList = _this.createMethod({
      method: 'GET',
      path: '/{id}/mailchimp-list'
    });

    _this.retrieveMailchimpListCategory = _this.createMethod({
      method: 'GET',
      path: '/{id}/mailchimp-list/{mailchimpListId}/mailchimp-category'
    });

    _this.retrievePlanFeatures = _this.createMethod({
      method: 'GET',
      path: '/{id}/plan-features'
    });

    _this.retrieveSecuritySettings = _this.createMethod({
      method: 'GET',
      path: '/{id}/security-settings'
    });

    /** Creates */
    _this.createMailchimpAccount = _this.createMethod({
      method: 'POST',
      path: '/{id}/mailchimp-account'
    });

    return _this;
  }

  return Organizations;
}(_ClassyResource2.default);

exports.default = Organizations;