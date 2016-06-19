'use strict'; 

var authService = require('../services/AuthService.js');
var awsService = require('../services/AwsService.js');
var parse = require('co-body');

module.exports = {
  /*
    check a specific user's existence
  */
  check: function* (username){
    let params = {
        TableName : 'User',
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username":username
        }
    };

    try{
      let response = yield awsService.query(params);
      let users = response.data.Items || [];
      this.body = users;
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
    user signup
  */
  signUp: function* (){
    let item = yield parse(this);
    item.password = authService.hashPassword(item.password);

    let params = {
      TableName: 'User',
      Item: item,
      ConditionExpression: 'attribute_not_exists(username)'
    };

    try{
      let response = yield awsService.put(params);
      delete item.password;
      this.body = item;
      this.status = 200;
    }catch(ex){
      let error;
      if(ex.code == 'ConditionalCheckFailedException'){
        error = {
          status: 'error',
          message: '用户 \'' + item.username + '\'' + ' 已存在.'
        }
      }else{
        error = {
         status: 'error',
         message: ex.message,
         code: ex.code
       }
      }
      this.body = error;
      this.status = 400;
    }
  },

  /*
    user signin
  */
  signIn: function* (){
    let item = yield parse(this);
    let error;

    let params = {
        TableName : 'User',
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username":item.username
        }
    };

    try{
      let response = yield awsService.query(params);
      let users = response.data.Items || [];

      if(users.length == 0){
        error = {
          status: 'error',
          message: '用户 ' + item.username + ' 不存在.'
        }
        this.body = error;
        this.status = 400;
      }else{
        let user = users[0];
        if(!authService.comparePassword(item.password,user.password)){
          error = {
            status: 'error',
            message: '密码不正确.'
          }
          this.body = error;
          this.status = 400;
        }else{
          delete user.password;
          this.body = user;
          this.status = 200;
        }
      }
    }catch(ex){
      error = {
        status: 'error',
        message: ex.message,
        code: ex.code
      }
      this.body = error;
      this.status = 400;
    }
  },

  /*
    populate the User table - only for testing purpose during development
  */
  loadData: function* (){
    let toSave = [];
    let records = require('../mock/User');

    records.forEach(function(record){
      let item = {
        username: { S: record.username},
        password: { S: record.password }
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
          'User': items
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
    list all records in User table - only for testing purpose during development
    reference: http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.04.html
  */
  list: function* (){
    let items = [];
    let hasMore = true;

    let params = {
        TableName: 'User',
        ProjectionExpression: "username, password"
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

};
