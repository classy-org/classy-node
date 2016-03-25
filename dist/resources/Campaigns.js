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
      includeBasic: ['retrieve', 'update'],
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

    _this.deactivate = _this.createMethod({
      method: 'POST',
      path: '/{id}/deactivate'
    });

    /** Lists */
    _this.listActivity = _this.createMethod({
      method: 'GET',
      path: '/{id}/activity'
    });

    _this.listCredentialSets = _this.createMethod({
      method: 'GET',
      path: '/{id}/credential-sets'
    });

    _this.listEcards = _this.createMethod({
      method: 'GET',
      path: '/{id}/ecards'
    });

    _this.listFaqs = _this.createMethod({
      method: 'GET',
      path: '/{id}/faqs'
    });

    _this.listFundraisingTeams = _this.createMethod({
      method: 'GET',
      path: '/{id}/fundraising-teams'
    });

    _this.listQuestions = _this.createMethod({
      method: 'GET',
      path: '/{id}/questions'
    });

    _this.listRecurringDonationPlans = _this.createMethod({
      method: 'GET',
      path: '/{id}/recurring-donation-plans'
    });

    _this.listTransactions = _this.createMethod({
      method: 'GET',
      path: '/{id}/transactions'
    });

    _this.listTicketTypes = _this.createMethod({
      method: 'GET',
      path: '/{id}/ticket-types'
    });

    /** Creates */
    _this.createAppealSet = _this.createMethod({
      method: 'POST',
      path: '/{id}/appeal-set'
    });

    _this.createCredentialSet = _this.createMethod({
      method: 'POST',
      path: '/{id}/credential-sets'
    });

    _this.createEcard = _this.createMethod({
      method: 'POST',
      path: '/{id}/ecards'
    });

    _this.createFaq = _this.createMethod({
      method: 'POST',
      path: '/{id}/faqs'
    });

    _this.createQuestion = _this.createMethod({
      method: 'POST',
      path: '/{id}/questions'
    });

    _this.createTicketType = _this.createMethod({
      method: 'POST',
      path: '/{id}/ticket-types'
    });

    _this.createFundraisingPage = _this.createMethod({
      method: 'POST',
      path: '/{id}/fundraising-pages'
    });

    _this.createTransaction = _this.createMethod({
      method: 'POST',
      path: '/{id}/transactions'
    });

    /** Retrieves */
    _this.retrieveAppealSet = _this.createMethod({
      method: 'GET',
      path: '/{id}/appeal-set'
    });

    return _this;
  }

  return Campaigns;
}(_ClassyResource2.default);

exports.default = Campaigns;