'use strict';

var awsService = require('../services/AwsService.js');
var parse = require('co-body');

module.exports = {
  /*
    get a specific user's userInfo
  */
  getUserInfo: function* (username){
    let params = {
        TableName : 'UserInfo',
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

  /*
    populate the UserInfo table - only for testing purpose during development
  */
  loadData: function* (){
    let toSave = [];
    let records = require('../mock/UserInfo');

    records.forEach(function(record){
      let item = {
        username: { S: record.username},
        nickname: { S: record.nickname},
        role: { S: record.role},
        introduction: { S: record.introduction},
        zipCode: { S: record.zipCode},
        city: { S: record.city},
        county: { S: record.county},
        address: { S: record.address},
        longitude: { S: record.longitude},
        latitude: { S: record.latitude},
        wechat: { S: record.wechat},
        weibo: { S: record.weibo},
        facebook: { S: record.facebook},
        isWechatPrivate: { BOOL: record.isWechatPrivate},
        isWeiboPrivate: { BOOL: record.isWeiboPrivate},
        isFacebookPrivate: { BOOL: record.isFacebookPrivate},
      };
      toSave.push(item);
    });

    var items = [];
    for(var i = 0; i < toSave.length; i++) {
      items[i] = {
        PutRequest: { Item: toSave[i] }
      }
    }

    let params = {
      RequestItems: {
          'UserInfo': items
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnItemCollectionMetrics: 'SIZE'
    };

    try{
      let response = yield awsService.batchWriteItem(params);
      this.body = 'ok';
      this.status = 200;
    }catch(ex){
      let error = {
        status: 'error',
        message: ex.message,
        code: ex.code
      }
      this.body = error;
      this.status = 400;
    }
  },

  /*
    list all records in UserInfo table - only for testing purpose during development
    reference: http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.04.html
  */
  list: function* (){
    let items = [];
    let hasMore = true;

    let params = {
        TableName: 'UserInfo',
        ProjectionExpression: "username, nickname, #role, introduction, zipCode, city, county, address, longitude, latitude, wechat, weibo, facebook, isWechatPrivate, isWeiboPrivate, isFacebookPrivate",
        ExpressionAttributeNames: {"#role": "role"}
    };

    try{
      while(hasMore){
        let response = yield awsService.scan(params);
        items = items.concat(response.data.Items);
        hasMore = typeof response.LastEvaluatedKey != 'undefined' ? true : false;
        params.ExclusiveStartKey = response.LastEvaluatedKey;
      }
      this.body = items;
      this.status = 200;
    }catch(ex){
      let error = {
        status: 'error',
        message: ex.message,
        code: ex.code
      }
      this.body = error;
      this.status = 400;
    }
  },
}
