
## Activity

### Creates
#### POST /activity/:id/comments
```javascript
classy.activity.createComment(activityId, options).then(data => {
  // do something with created entity
})
```

## Answers

### Basics
#### DELETE /answers/:id
```javascript
classy.answers.del(id, options).then(() => {
    // do something after del
})
```

## AppealSet

### Basics
#### GET /appeal-set/:id
```javascript
classy.appealSet.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /appeal-set/:id
```javascript
classy.appealSet.update(id, options).then(() => {
    // do something after update
})
```

## Assets

### Basics
#### GET /assets/:id
```javascript
classy.assets.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /assets/:id
```javascript
classy.assets.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /assets/:id/children
```javascript
classy.assets.listChildren(assetId, options).then(data => {
  // do something with list
})
```

### Custom
#### POST /assets/:id/process
```javascript
classy.assets.process(id, options).then(data => {
  // do something with custom response
})
```

#### POST /assets/url
```javascript
classy.assets.url(, options).then(data => {
  // do something with custom response
})
```

## Blocks

### Basics
#### POST /blocks/:id
```javascript
classy.blocks.create(id, options).then(() => {
    // do something after create
})
```

#### GET /blocks/:id
```javascript
classy.blocks.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /blocks/:id
```javascript
classy.blocks.update(id, options).then(() => {
    // do something after update
})
```

## CampaignCredentialSets

### Basics
#### GET /campaign-credential-sets/:id
```javascript
classy.campaignCredentialSets.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /campaign-credential-sets/:id
```javascript
classy.campaignCredentialSets.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /campaign-credential-sets/:id
```javascript
classy.campaignCredentialSets.del(id, options).then(() => {
    // do something after del
})
```

## Campaigns

### Basics
#### GET /campaigns/:id
```javascript
classy.campaigns.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /campaigns/:id
```javascript
classy.campaigns.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /campaigns/:id/activity
```javascript
classy.campaigns.listActivity(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/admins
```javascript
classy.campaigns.listAdmins(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/credential-sets
```javascript
classy.campaigns.listCredentialSets(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/donation-matching-plans
```javascript
classy.campaigns.listDonationMatchingPlans(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/ecards
```javascript
classy.campaigns.listEcards(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/faqs
```javascript
classy.campaigns.listFaqs(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/feed-items
```javascript
classy.campaigns.listFeedItems(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/fundraising-pages
```javascript
classy.campaigns.listFundraisingPages(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/fundraising-teams
```javascript
classy.campaigns.listFundraisingTeams(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/groups
```javascript
classy.campaigns.listGroups(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/messages
```javascript
classy.campaigns.listMessages(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/message-stats
```javascript
classy.campaigns.listMessageStats(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/posts
```javascript
classy.campaigns.listPosts(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/promo-codes
```javascript
classy.campaigns.listPromoCodes(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/updates
```javascript
classy.campaigns.listUpdates(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/stories
```javascript
classy.campaigns.listStories(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/questions
```javascript
classy.campaigns.listQuestions(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/registrations
```javascript
classy.campaigns.listRegistrations(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/recurring-donation-plans
```javascript
classy.campaigns.listRecurringDonationPlans(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/soft-credits
```javascript
classy.campaigns.listSoftCredits(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/ticket-types
```javascript
classy.campaigns.listTicketTypes(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/transactions
```javascript
classy.campaigns.listTransactions(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/designations
```javascript
classy.campaigns.listDesignations(campaignId, options).then(data => {
  // do something with list
})
```

#### GET /campaigns/:id/unassigned-designations
```javascript
classy.campaigns.listUnassignedDesignations(campaignId, options).then(data => {
  // do something with list
})
```

### Retrieves
#### GET /campaigns/:id/designations
```javascript
classy.campaigns.retrieveDesignation(campaignId, designationId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /campaigns/:id/credential-sets
```javascript
classy.campaigns.createCredentialSet(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/donation-matching-plans
```javascript
classy.campaigns.createDonationMatchingPlan(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/ecards
```javascript
classy.campaigns.createEcard(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/faqs
```javascript
classy.campaigns.createFaq(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/feed-items
```javascript
classy.campaigns.createFeedItem(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/fundraising-teams
```javascript
classy.campaigns.createFundraisingTeam(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/fundraising-pages
```javascript
classy.campaigns.createFundraisingPage(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/groups
```javascript
classy.campaigns.createGroup(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/messages
```javascript
classy.campaigns.createMessage(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/posts
```javascript
classy.campaigns.createPost(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/promo-codes
```javascript
classy.campaigns.createPromoCode(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/updates
```javascript
classy.campaigns.createUpdate(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/stories
```javascript
classy.campaigns.createStorie(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/questions
```javascript
classy.campaigns.createQuestion(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/ticket-types
```javascript
classy.campaigns.createTicketType(campaignId, options).then(data => {
  // do something with created entity
})
```

#### POST /campaigns/:id/transactions
```javascript
classy.campaigns.createTransaction(campaignId, options).then(data => {
  // do something with created entity
})
```

### Custom
#### POST /campaigns/:id/publish
```javascript
classy.campaigns.publish(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/unpublish
```javascript
classy.campaigns.unpublish(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/deactivate
```javascript
classy.campaigns.deactivate(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/reactivate
```javascript
classy.campaigns.reactivate(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/appeal-set
```javascript
classy.campaigns.createAppealSet(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/actions/mailchimp-subscribe
```javascript
classy.campaigns.createMailchimpSubscribeAction(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/appeal-set
```javascript
classy.campaigns.retrieveAppealSet(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/themes
```javascript
classy.campaigns.retrieveTheme(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/overview
```javascript
classy.campaigns.retrieveOverview(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/customUrl
```javascript
classy.campaigns.retrieveCustomUrl(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/feed-items/all
```javascript
classy.campaigns.listAllFeedItems(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/promo-codes/available
```javascript
classy.campaigns.listAvailablePromoCodes(id, options).then(data => {
  // do something with custom response
})
```

#### GET /campaigns/:id/promo-codes/unavailable
```javascript
classy.campaigns.listUnavailablePromoCodes(id, options).then(data => {
  // do something with custom response
})
```

#### POST /campaigns/:id/designations/:designationId
```javascript
classy.campaigns.addDesignation(id, designationId, options).then(data => {
  // do something with custom response
})
```

#### PUT /campaigns/:id/designations/:designationId
```javascript
classy.campaigns.updateDesignation(id, designationId, options).then(data => {
  // do something with custom response
})
```

#### DELETE /campaigns/:id/designations/:designationId
```javascript
classy.campaigns.deleteDesignation(id, designationId, options).then(data => {
  // do something with custom response
})
```

## Comments

### Basics
#### GET /comments/:id
```javascript
classy.comments.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /comments/:id
```javascript
classy.comments.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /comments/:id
```javascript
classy.comments.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /comments/:id/likes
```javascript
classy.comments.listLikes(commentId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /comments/:id/likes
```javascript
classy.comments.createLike(commentId, options).then(data => {
  // do something with created entity
})
```

## Dedications

### Basics
#### GET /dedications/:id
```javascript
classy.dedications.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /dedications/:id
```javascript
classy.dedications.update(id, options).then(() => {
    // do something after update
})
```

## Designations

### Basics
#### GET /designations/:id
```javascript
classy.designations.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /designations/:id
```javascript
classy.designations.update(id, options).then(() => {
    // do something after update
})
```

## DomainMasking

### Custom
## DonationMatchers

### Custom
## DonationMatchingPlans

### Basics
#### GET /donation-matching-plans/:id
```javascript
classy.donationMatchingPlans.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /donation-matching-plans/:id
```javascript
classy.donationMatchingPlans.update(id, options).then(() => {
    // do something after update
})
```

## Ecards

### Basics
#### GET /ecards/:id
```javascript
classy.ecards.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /ecards/:id
```javascript
classy.ecards.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /ecards/:id
```javascript
classy.ecards.del(id, options).then(() => {
    // do something after del
})
```

## Events

### Custom
#### POST /events/resend-receipt/:id
```javascript
classy.events.resendReceipt(id, options).then(data => {
  // do something with custom response
})
```

#### POST /events/resend-dedication/:id
```javascript
classy.events.resendDedication(id, options).then(data => {
  // do something with custom response
})
```

## Faqs

### Basics
#### GET /faqs/:id
```javascript
classy.faqs.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /faqs/:id
```javascript
classy.faqs.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /faqs/:id
```javascript
classy.faqs.update(id, options).then(() => {
    // do something after update
})
```

## FeedItems

### Basics
#### GET /feed-items/:id
```javascript
classy.feedItems.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /feed-items/:id
```javascript
classy.feedItems.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /feed-items/:id
```javascript
classy.feedItems.del(id, options).then(() => {
    // do something after del
})
```

### Lists
#### GET /feed-items/:id/comments
```javascript
classy.feedItems.listComments(feedItemId, options).then(data => {
  // do something with list
})
```

#### GET /feed-items/:id/likes
```javascript
classy.feedItems.listLikes(feedItemId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /feed-items/:id/comments
```javascript
classy.feedItems.createComment(feedItemId, options).then(data => {
  // do something with created entity
})
```

#### POST /feed-items/:id/likes
```javascript
classy.feedItems.createLike(feedItemId, options).then(data => {
  // do something with created entity
})
```

## FundraisingPages

### Basics
#### GET /fundraising-pages/:id
```javascript
classy.fundraisingPages.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /fundraising-pages/:id
```javascript
classy.fundraisingPages.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /fundraising-pages/:id
```javascript
classy.fundraisingPages.del(id, options).then(() => {
    // do something after del
})
```

### Lists
#### GET /fundraising-pages/:id/activity
```javascript
classy.fundraisingPages.listActivity(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/posts
```javascript
classy.fundraisingPages.listPosts(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/updates
```javascript
classy.fundraisingPages.listUpdates(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/stories
```javascript
classy.fundraisingPages.listStories(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/feed-items
```javascript
classy.fundraisingPages.listFeedItems(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/answers
```javascript
classy.fundraisingPages.listAnswers(fundraisingPageId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-pages/:id/soft-credits
```javascript
classy.fundraisingPages.listSoftCredits(fundraisingPageId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /fundraising-pages/:id/posts
```javascript
classy.fundraisingPages.createPost(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-pages/:id/updates
```javascript
classy.fundraisingPages.createUpdate(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-pages/:id/stories
```javascript
classy.fundraisingPages.createStorie(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-pages/:id/transfers
```javascript
classy.fundraisingPages.createTransfer(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-pages/:id/feed-items
```javascript
classy.fundraisingPages.createFeedItem(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-pages/:id/answers
```javascript
classy.fundraisingPages.createAnswer(fundraisingPageId, options).then(data => {
  // do something with created entity
})
```

### Custom
#### GET /fundraising-pages/:id/overview
```javascript
classy.fundraisingPages.retrieveOverview(id, options).then(data => {
  // do something with custom response
})
```

## FundraisingTeamPolicies

### Basics
#### GET /fundraising-team-policies/:id
```javascript
classy.fundraisingTeamPolicies.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /fundraising-team-policies/:id
```javascript
classy.fundraisingTeamPolicies.update(id, options).then(() => {
    // do something after update
})
```

## FundraisingTeams

### Basics
#### GET /fundraising-teams/:id
```javascript
classy.fundraisingTeams.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /fundraising-teams/:id
```javascript
classy.fundraisingTeams.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /fundraising-teams/:id
```javascript
classy.fundraisingTeams.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /fundraising-teams/:id/activity
```javascript
classy.fundraisingTeams.listActivity(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/fundraising-pages
```javascript
classy.fundraisingTeams.listFundraisingPages(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/posts
```javascript
classy.fundraisingTeams.listPosts(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/updates
```javascript
classy.fundraisingTeams.listUpdates(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/stories
```javascript
classy.fundraisingTeams.listStories(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/feed-items
```javascript
classy.fundraisingTeams.listFeedItems(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/subteams
```javascript
classy.fundraisingTeams.listSubteams(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/answers
```javascript
classy.fundraisingTeams.listAnswers(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

#### GET /fundraising-teams/:id/soft-credits
```javascript
classy.fundraisingTeams.listSoftCredits(fundraisingTeamId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /fundraising-teams/:id/posts
```javascript
classy.fundraisingTeams.createPost(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/updates
```javascript
classy.fundraisingTeams.createUpdate(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/stories
```javascript
classy.fundraisingTeams.createStorie(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/transfers
```javascript
classy.fundraisingTeams.createTransfer(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/feed-items
```javascript
classy.fundraisingTeams.createFeedItem(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/fundraising-pages
```javascript
classy.fundraisingTeams.createFundraisingPage(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

#### POST /fundraising-teams/:id/answers
```javascript
classy.fundraisingTeams.createAnswer(fundraisingTeamId, options).then(data => {
  // do something with created entity
})
```

### Custom
#### GET /fundraising-teams/:id/overview
```javascript
classy.fundraisingTeams.retrieveOverview(id, options).then(data => {
  // do something with custom response
})
```

#### GET /fundraising-teams/:id/feed-items/all
```javascript
classy.fundraisingTeams.listAllFeedItems(id, options).then(data => {
  // do something with custom response
})
```

## Groups

### Basics
#### PUT /groups/:id
```javascript
classy.groups.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /groups/:id
```javascript
classy.groups.del(id, options).then(() => {
    // do something after del
})
```

## Likes

### Basics
#### DELETE /likes/:id
```javascript
classy.likes.del(id, options).then(() => {
    // do something after del
})
```

## MailchimpAccounts

### Basics
#### PUT /mailchimp-accounts/:id
```javascript
classy.mailchimpAccounts.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /mailchimp-accounts/:id
```javascript
classy.mailchimpAccounts.del(id, options).then(() => {
    // do something after del
})
```

## Me

### Custom
## Member

### Basics
#### GET /member/:id
```javascript
classy.member.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

### Lists
#### GET /member/:id/organizations
```javascript
classy.member.listOrganizations(memberId, options).then(data => {
  // do something with list
})
```

#### GET /member/:id/fundraising-teams
```javascript
classy.member.listFundraisingTeams(memberId, options).then(data => {
  // do something with list
})
```

#### GET /member/:id/fundraising-pages
```javascript
classy.member.listFundraisingPages(memberId, options).then(data => {
  // do something with list
})
```

## Members

### Basics
#### GET /members/:id
```javascript
classy.members.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

### Lists
#### GET /members/:id/organizations
```javascript
classy.members.listOrganizations(memberId, options).then(data => {
  // do something with list
})
```

#### GET /members/:id/fundraising-teams
```javascript
classy.members.listFundraisingTeams(memberId, options).then(data => {
  // do something with list
})
```

#### GET /members/:id/fundraising-pages
```javascript
classy.members.listFundraisingPages(memberId, options).then(data => {
  // do something with list
})
```

#### GET /members/:id/campaign-credential-sets
```javascript
classy.members.listCampaignCredentialSets(memberId, options).then(data => {
  // do something with list
})
```

#### GET /members/:id/organization-credential-sets
```javascript
classy.members.listOrganizationCredentialSets(memberId, options).then(data => {
  // do something with list
})
```

#### GET /members/:id/recurring-donation-plans
```javascript
classy.members.listRecurringDonationPlans(memberId, options).then(data => {
  // do something with list
})
```

## MessageAttachments

### Basics
#### GET /message-attachments/:id
```javascript
classy.messageAttachments.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

### Custom
## MessageBlocks

### Basics
#### GET /message-blocks/:id
```javascript
classy.messageBlocks.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

### Custom
## Messages

### Basics
#### GET /messages/:id
```javascript
classy.messages.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /messages/:id
```javascript
classy.messages.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /messages/:id
```javascript
classy.messages.del(id, options).then(() => {
    // do something after del
})
```

### Lists
#### GET /messages/:id/recipients
```javascript
classy.messages.listRecipients(messageId, options).then(data => {
  // do something with list
})
```

#### GET /messages/:id/supporters
```javascript
classy.messages.listSupporters(messageId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /messages/:id/blocks
```javascript
classy.messages.createBlock(messageId, options).then(data => {
  // do something with created entity
})
```

#### POST /messages/:id/attachments
```javascript
classy.messages.createAttachment(messageId, options).then(data => {
  // do something with created entity
})
```

#### POST /messages/:id/recipients
```javascript
classy.messages.createRecipient(messageId, options).then(data => {
  // do something with created entity
})
```

### Custom
#### POST /messages/:id/send
```javascript
classy.messages.sendMessage(id, options).then(data => {
  // do something with custom response
})
```

#### POST /messages/:id/test
```javascript
classy.messages.sendTest(id, options).then(data => {
  // do something with custom response
})
```

#### PUT /messages/:id/blocks/:blockId
```javascript
classy.messages.updateBlocks(id, blockId, options).then(data => {
  // do something with custom response
})
```

#### DELETE /messages/:id/blocks/:blockId
```javascript
classy.messages.removeBlocks(id, blockId, options).then(data => {
  // do something with custom response
})
```

#### PUT /messages/:id/attachments/:attachmentId
```javascript
classy.messages.updateAttachments(id, attachmentId, options).then(data => {
  // do something with custom response
})
```

#### DELETE /messages/:id/attachments/:attachmentId
```javascript
classy.messages.removeAttachments(id, attachmentId, options).then(data => {
  // do something with custom response
})
```

#### PUT /messages/:id/recipients
```javascript
classy.messages.modifyRecipients(id, options).then(data => {
  // do something with custom response
})
```

#### POST /messages/:id/recipients/remove
```javascript
classy.messages.removeRecipients(id, options).then(data => {
  // do something with custom response
})
```

## MessageTemplates

### Basics
#### GET /message-templates/:id
```javascript
classy.messageTemplates.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

### Custom
## Oauth

### Custom
#### POST /oauth/auth
```javascript
classy.oauth.auth(, options).then(data => {
  // do something with custom response
})
```

## Organizations

### Basics
#### GET /organizations/:id
```javascript
classy.organizations.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### POST /organizations/:id
```javascript
classy.organizations.create(id, options).then(() => {
    // do something after create
})
```

### Lists
#### GET /organizations/:id/activity
```javascript
classy.organizations.listActivity(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/campaigns
```javascript
classy.organizations.listCampaigns(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/credential-sets
```javascript
classy.organizations.listCredentialSets(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/designations
```javascript
classy.organizations.listDesignations(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/engagement-settings
```javascript
classy.organizations.listEngagementSettings(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/fundraising-pages
```javascript
classy.organizations.listFundraisingPages(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/fundraising-teams
```javascript
classy.organizations.listFundraisingTeams(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/messages
```javascript
classy.organizations.listMessages(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/notifications
```javascript
classy.organizations.listNotifications(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/recurring-donation-plans
```javascript
classy.organizations.listRecurringDonationPlans(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/supporters
```javascript
classy.organizations.listSupporters(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/transactions
```javascript
classy.organizations.listTransactions(organizationId, options).then(data => {
  // do something with list
})
```

#### GET /organizations/:id/integrations
```javascript
classy.organizations.listIntegrations(organizationId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /organizations/:id/campaigns
```javascript
classy.organizations.createCampaign(organizationId, options).then(data => {
  // do something with created entity
})
```

#### POST /organizations/:id/credential-sets
```javascript
classy.organizations.createCredentialSet(organizationId, options).then(data => {
  // do something with created entity
})
```

#### POST /organizations/:id/designations
```javascript
classy.organizations.createDesignation(organizationId, options).then(data => {
  // do something with created entity
})
```

#### POST /organizations/:id/notifications
```javascript
classy.organizations.createNotification(organizationId, options).then(data => {
  // do something with created entity
})
```

#### POST /organizations/:id/messages
```javascript
classy.organizations.createMessage(organizationId, options).then(data => {
  // do something with created entity
})
```

#### POST /organizations/:id/supporters
```javascript
classy.organizations.createSupporter(organizationId, options).then(data => {
  // do something with created entity
})
```

### Custom
#### PUT /organizations/:id/branding
```javascript
classy.organizations.updateBranding(id, options).then(data => {
  // do something with custom response
})
```

#### PUT /organizations/:id/engagement-settings
```javascript
classy.organizations.updateEngagementSettings(id, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/mailchimp-account
```javascript
classy.organizations.retrieveMailchimpAccount(id, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/mailchimp-list
```javascript
classy.organizations.retrieveMailchimpList(id, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/mailchimp-list/:mailchimpListId/mailchimp-category
```javascript
classy.organizations.retrieveMailchimpListCategory(id, mailchimpListId, options).then(data => {
  // do something with custom response
})
```

#### POST /organizations/:id/mailchimp-subscribe
```javascript
classy.organizations.createMailchimpSubscribeAction(id, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/mailchimp-list/:mailchimpListId/mailchimp-category/:mailchimpCategoryId/mailchimp-interest
```javascript
classy.organizations.retrieveMailchimpListInterest(id, mailchimpListId, mailchimpCategoryId, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/plan-features
```javascript
classy.organizations.retrievePlanFeatures(id, options).then(data => {
  // do something with custom response
})
```

#### GET /organizations/:id/security-settings
```javascript
classy.organizations.retrieveSecuritySettings(id, options).then(data => {
  // do something with custom response
})
```

#### POST /organizations/:id/mailchimp-account
```javascript
classy.organizations.createMailchimpAccount(id, options).then(data => {
  // do something with custom response
})
```

#### POST /organizations/:id/members
```javascript
classy.organizations.createUnclaimedAccount(id, options).then(data => {
  // do something with custom response
})
```

## OrganizationCredentialSets

### Basics
#### GET /organization-credential-sets/:id
```javascript
classy.organizationCredentialSets.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /organization-credential-sets/:id
```javascript
classy.organizationCredentialSets.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /organization-credential-sets/:id
```javascript
classy.organizationCredentialSets.del(id, options).then(() => {
    // do something after del
})
```

## OrganizationNotifications

### Basics
#### GET /organization-notifications/:id
```javascript
classy.organizationNotifications.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /organization-notifications/:id
```javascript
classy.organizationNotifications.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /organization-notifications/:id
```javascript
classy.organizationNotifications.del(id, options).then(() => {
    // do something after del
})
```

## Ping

### Custom
## PolicyCheck

### Custom
#### GET /policy-check/campaign/:id/admin
```javascript
classy.policyCheck.campaignAdmin(id, options).then(data => {
  // do something with custom response
})
```

## Posts

### Basics
#### GET /posts/:id
```javascript
classy.posts.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /posts/:id
```javascript
classy.posts.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /posts/:id
```javascript
classy.posts.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /posts/:id/comments
```javascript
classy.posts.listComments(postId, options).then(data => {
  // do something with list
})
```

#### GET /posts/:id/likes
```javascript
classy.posts.listLikes(postId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /posts/:id/comments
```javascript
classy.posts.createComment(postId, options).then(data => {
  // do something with created entity
})
```

#### POST /posts/:id/likes
```javascript
classy.posts.createLike(postId, options).then(data => {
  // do something with created entity
})
```

## PromoCodes

### Basics
#### GET /promo-codes/:id
```javascript
classy.promoCodes.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /promo-codes/:id
```javascript
classy.promoCodes.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /promo-codes/:id/ticket-types
```javascript
classy.promoCodes.listTicketTypes(promoCodeId, options).then(data => {
  // do something with list
})
```

#### GET /promo-codes/:id/promo-code-configurations
```javascript
classy.promoCodes.listPromoCodeConfigurations(promoCodeId, options).then(data => {
  // do something with list
})
```

## PromoCodeConfigurations

### Basics
#### GET /promo-code-configurations/:id
```javascript
classy.promoCodeConfigurations.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /promo-code-configurations/:id
```javascript
classy.promoCodeConfigurations.del(id, options).then(() => {
    // do something after del
})
```

#### POST /promo-code-configurations/:id
```javascript
classy.promoCodeConfigurations.create(id, options).then(() => {
    // do something after create
})
```

## Updates

### Basics
#### GET /updates/:id
```javascript
classy.updates.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /updates/:id
```javascript
classy.updates.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /updates/:id
```javascript
classy.updates.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /updates/:id/comments
```javascript
classy.updates.listComments(updateId, options).then(data => {
  // do something with list
})
```

#### GET /updates/:id/likes
```javascript
classy.updates.listLikes(updateId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /updates/:id/comments
```javascript
classy.updates.createComment(updateId, options).then(data => {
  // do something with created entity
})
```

#### POST /updates/:id/likes
```javascript
classy.updates.createLike(updateId, options).then(data => {
  // do something with created entity
})
```

## Search

## Stories

### Basics
#### GET /stories/:id
```javascript
classy.stories.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### DELETE /stories/:id
```javascript
classy.stories.del(id, options).then(() => {
    // do something after del
})
```

#### PUT /stories/:id
```javascript
classy.stories.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /stories/:id/likes
```javascript
classy.stories.listLikes(storyId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /stories/:id/likes
```javascript
classy.stories.createLike(storyId, options).then(data => {
  // do something with created entity
})
```

## Questions

### Basics
#### GET /questions/:id
```javascript
classy.questions.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /questions/:id
```javascript
classy.questions.update(id, options).then(() => {
    // do something after update
})
```

#### DELETE /questions/:id
```javascript
classy.questions.del(id, options).then(() => {
    // do something after del
})
```

### Lists
#### GET /questions/:id/answers
```javascript
classy.questions.listAnswers(questionId, options).then(data => {
  // do something with list
})
```

## RecurringDonationPlans

### Basics
#### GET /recurring-donation-plans/:id
```javascript
classy.recurringDonationPlans.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /recurring-donation-plans/:id
```javascript
classy.recurringDonationPlans.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /recurring-donation-plans/:id/transactions
```javascript
classy.recurringDonationPlans.listTransactions(recurringDonationPlanId, options).then(data => {
  // do something with list
})
```

## Registrations

### Basics
#### GET /registrations/:id
```javascript
classy.registrations.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /registrations/:id
```javascript
classy.registrations.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /registrations/:id/answers
```javascript
classy.registrations.listAnswers(registrationId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /registrations/:id/answers
```javascript
classy.registrations.createAnswer(registrationId, options).then(data => {
  // do something with created entity
})
```

## SoftCreditTransfers

### Basics
#### GET /soft-credit-transfers/:id
```javascript
classy.softCreditTransfers.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### POST /soft-credit-transfers/:id
```javascript
classy.softCreditTransfers.create(id, options).then(() => {
    // do something after create
})
```

## Supporters

### Basics
#### GET /supporters/:id
```javascript
classy.supporters.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /supporters/:id
```javascript
classy.supporters.update(id, options).then(() => {
    // do something after update
})
```

### Custom
#### POST /supporters/:id/mailchimp-subscribe
```javascript
classy.supporters.createMailchimpSubscribeAction(id, options).then(data => {
  // do something with custom response
})
```

## TicketTypes

### Basics
#### GET /ticket-types/:id
```javascript
classy.ticketTypes.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /ticket-types/:id
```javascript
classy.ticketTypes.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /ticket-types/:id/promo-codes
```javascript
classy.ticketTypes.listPromoCodes(ticketTypeId, options).then(data => {
  // do something with list
})
```

#### GET /ticket-types/:id/promo-code-configurations
```javascript
classy.ticketTypes.listPromoCodeConfigurations(ticketTypeId, options).then(data => {
  // do something with list
})
```

## Transactions

### Basics
#### GET /transactions/:id
```javascript
classy.transactions.retrieve(id, options).then(() => {
    // do something after retrieve
})
```

#### PUT /transactions/:id
```javascript
classy.transactions.update(id, options).then(() => {
    // do something after update
})
```

### Lists
#### GET /transactions/:id/registrations
```javascript
classy.transactions.listRegistrations(transactionId, options).then(data => {
  // do something with list
})
```

#### GET /transactions/:id/items
```javascript
classy.transactions.listItems(transactionId, options).then(data => {
  // do something with list
})
```

#### GET /transactions/:id/acknowledgements
```javascript
classy.transactions.listAcknowledgements(transactionId, options).then(data => {
  // do something with list
})
```

#### GET /transactions/:id/answers
```javascript
classy.transactions.listAnswers(transactionId, options).then(data => {
  // do something with list
})
```

### Creates
#### POST /transactions/:id/dedications
```javascript
classy.transactions.createDedication(transactionId, options).then(data => {
  // do something with created entity
})
```

#### POST /transactions/:id/acknowledgements
```javascript
classy.transactions.createAcknowledgement(transactionId, options).then(data => {
  // do something with created entity
})
```

#### POST /transactions/:id/hard-credit-transfers
```javascript
classy.transactions.createHardCreditTransfer(transactionId, options).then(data => {
  // do something with created entity
})
```

## TransactionItems

### Basics
#### PUT /transaction-items/:id
```javascript
classy.transactionItems.update(id, options).then(() => {
    // do something after update
})
```

## Workflows

## WorkflowVersions
