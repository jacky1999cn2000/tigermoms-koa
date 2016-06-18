'use strict';

var awsService = require('../services/awsService.js');
var parse = require('co-body');

module.exports = {

  signUp: function* (){
    let item = yield parse(this);

    console.log('item ',item);

    let params = {
      TableName: 'User',
      Item: item,
      ConditionExpression: 'attribute_not_exists(username)'
    };

    try{
      let response = yield awsService.put(params);
      this.body = item;
      this.status = 200;
    }catch(ex){
      let error;
      if(ex.code == 'ConditionalCheckFailedException'){
        error = {
          message: 'For site \'' + item.api_key + '\', an app named \'' + item.app_name + '\' already exists.'
        }
      }else{
        error = {
         message: ex.message,
         code: ex.code
       }
      }

      this.body = error;
      this.status = 400;
    }
  },

};
