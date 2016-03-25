import Resource from '../ClassyResource';

class CampaignCredentialSets extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update', 'del'],
      path: '/campaign-credential-sets'
    });

  }
}

export default CampaignCredentialSets;
