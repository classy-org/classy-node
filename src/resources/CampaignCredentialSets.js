import Resource from '../ClassyResource';

class CampaignCredentialSets extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update', 'del'],
      path: '/campaign-credential-sets'
    });

  }
}

export default CampaignCredentialSets;
