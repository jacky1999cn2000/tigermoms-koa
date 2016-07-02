'use strict';

var awsService = require('../services/AwsService.js');
var parse = require('co-body');

module.exports = {
  /*
    check a specific user's existence
  */
  getUserInfo: function* (username){
    let params = {
        TableName : 'UserInfo',
        IndexName: 'UserNameIndex',
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username":username
        }
    };
    try{
      let response = yield awsService.query(params);
      let userinfo = response.data.Items[0] || {};
      this.body = userinfo;
      this.status = 200;
    }catch(ex){
      let error = {
        message: ex.message,
        code: ex.code
      }
      this.body = error;
      this.status = 400;
    }
  },
}
