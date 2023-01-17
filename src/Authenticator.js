
module.exports = function(event, region) {

  const { S3 } = require('aws-sdk');
  const { userRequest, getObjectContext } = event;
  const { outputRoute, outputToken } = getObjectContext;
  
  this.shibbolethTokenFound = () => {
    return Object
      .keys(userRequest.headers)
      .includes("ShibbolethToken");
  }

  this.getUnauthorizedResponse = async () => {
    const S3 = new S3({region: parms.region});

    return await s3.writeGetObjectResponse({
      RequestRoute: outputRoute,
      RequestToken: outputToken,
      StatusCode: 403,
      ErrorCode: "NoShibbolethTokenFound",
      ErrorMessage: "The request is not authorized.",
    }).promise();
  }
}