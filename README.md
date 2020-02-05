# orange-theory

Orange Theory Membership

This is a tiny AWS SAM templated (IAC) POC for a simple member CRUD. A stand-alone Swagger.yaml file is included with integration to the main template (template.yaml) although this is not yet working as integrated. Also a Postman collection 'Orange-Theory-Membership' consisting of four AWS live calls (would need to be changed to your region/IAM user id) is included in the repo.

I've been influenced by AWS Serverless Evangelist Marcia Villaba (https://www.linkedin.com/in/marciavillalba/?originalSubdomain=fi) and her many YouTube videos (https://www.youtube.com/channel/UCSLIvjWJwLRQze9Pn4cectQ) and I borrowed her ideas on dynamoDB abstraction (although this is a general practice to wrap DB access layer). Likewise I'm using her code in the util.get helper files that enable mocking an event to kick off a lambda for unit testing. As mentioned, I've styled my code on her model although there are a lot of good SAM/serverless authors as well. One more, I was highly influenced by AWS Rick Houlihan's 2019 ReInvent deep dive on Advanced DynamoDB schema design and modeling (https://www.youtube.com/watch?v=HaEPXoXVf2k).

Note that I've stubbed out a GSI (global secondary index => VisitDate_Member_GSI) in the template.yaml dynamodb section as a next step -- that is, to track visits for a particular user - with the hash key (primary key) being the last visit 'visitDate'. This would also require a new lambda function 'recordMemberVisit' which would be entered with primary key of 'memberId' and sortKey of 'visitDate'. Then the above GSI would flip this and provide an O(1) fast get (dynamoDBManager.query...) of the member (hash key) and all visits for that member. The GSI enables the flip query - which would be 'for any date, who came into the studios (regarless of location/specific studio, etc.). 

I've included Postman live-testing snapshots of the four member APIs showing successful invocations to the deployed AWS stack.

One Note: I need to have package.json in the 'source' directory for SAM building (SAM build). Likewise I need to have it redeployed to the root (./) directory for Jest unit testing - clunky I know. Probably a way around this that I don't know as yet.

So: to build:
1. make sure package.json is in the ./source directory.
2. SAM build // ie, you need the AWS cli and the SAM cli
3. SAM deploy --guided // creates the package configuration file 'samconfig.toml'

To run it:
-- see Postman snapshots -- of course the region and userId will likely be different.

To test it:
1. move the package.json file into the root directory (./).
2. jest test
3. tests will run

So that's it -- lots more that could be done but of course this is only a POC. As for the GSI memtioned above, I'd envison several more at min such as one where the club/studioId is the hash/primary key with sort key of say 'visitDate' etc. Another might be 'memberType' although since only four types (as I read site literature), this could be uneven in terms of server clusters in terms of Read and Write Capacity Units -- could use the new Adapive Capacity to offset this perhaps). Also, whatever WCU number is set for the main table, there needs to be at least that set for each of the GSI's for the automatic eventual consistency writes that DynamoDB does. 

Just a few notes on thinking and method taken, next steps, etc. Also, I've left in the console.log statements sprinkled throughout as I was trying to get this out and didn't want to retest everything at the last minute -- so I would definitely remove all those prior to any PR creation of course.

Thanks Guys - this was a fun challenge!
Paul




