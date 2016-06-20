# User Resource

### Table Definition
```javascript
var params = {  
    TableName : "User",  
    KeySchema: [         
        { AttributeName: "username", KeyType: "HASH" }  //Partition key  
    ],  
    AttributeDefinitions: [         
        { AttributeName: "username", AttributeType: "S" }
    ],  
    ProvisionedThroughput: {         
        ReadCapacityUnits: 1,   
        WriteCapacityUnits: 1  
    }  
};  

dynamodb.createTable(params, function(err, data) {  
    if (err)  
        console.log(JSON.stringify(err, null, 2));  
    else  
        console.log(JSON.stringify(data, null, 2));  
});
```

### RESTful API
* GET http://192.168.99.100:3002/user/loaddata/
  * Request
  ```javascript
    // N/A
  ```
  * Response
  ```javascript
    ok
  ```
* GET http://192.168.99.100:3002/user/list
  * Request
  ```javascript
    // N/A
  ```
  * Response
  ```javascript
  [
    {
      "password": "f6f2c2014af1d7f98f8f7000cb72fe9c09d99dd55a9b5dd3a62471d846f44911eefe8f7d7b0874ee72a8191bf332e043520123c1978fec1f807074b161b8d5fbfa4a401a968a8776ab24dd1d7b0f28f9",
      "username": "vivian@gmail.com"
    },
    {
      "password": "f6f2c2014af1d7f98f8f7000cb72fe9c09d99dd55a9b5dd3a62471d846f44911eefe8f7d7b0874ee72a8191bf332e043520123c1978fec1f807074b161b8d5fbfa4a401a968a8776ab24dd1d7b0f28f9",
      "username": "jacky@gmail.com"
    },
    {
      "password": "f6f2c2014af1d7f98f8f7000cb72fe9c09d99dd55a9b5dd3a62471d846f44911eefe8f7d7b0874ee72a8191bf332e043520123c1978fec1f807074b161b8d5fbfa4a401a968a8776ab24dd1d7b0f28f9",
      "username": "melody@gmail.com"
    }
    ...
  ]
  ```
* GET http://192.168.99.100:3002/user/check/username
  * Request
  ```javascript
    // N/A
  ```
  * Response
  ```javascript
  // user exists
  [
    {
      "password": "f6f2c2014af1d7f98f8f7000cb72fe9c09d99dd55a9b5dd3a62471d846f44911eefe8f7d7b0874ee72a8191bf332e043520123c1978fec1f807074b161b8d5fbfa4a401a968a8776ab24dd1d7b0f28f9",
      "username": "jacky@gmail.com"
    }
  ]

  // user doesn't exist
  []
  ```
* POST http://192.168.99.100:3002/user/signup/
  * Request
  ```javascript
  {
    "username":"may@gmail.com",
    "password":"111111"
  }
  ```
  * Response
  ```javascript
  // signup succeed
  {
    "username": "may@gmail.com"
  }

  // user already exists
  {
    "status": "error",
    "message": "用户 'may@gmail.com' 已存在."
  }
  ```
* POST http://192.168.99.100:3002/user/signin
  * Request
  ```javascript
  {
      "username":"jacky@gmail.com",
      "password":"111111"
  }
  ```
  * Response
  ```javascript
  // signup succeed
  {
    "username": "jacky@gmail.com"
  }

  // user didn't exists
  {
    "status": "error",
    "message": "用户 lily@gmail.com 不存在."
  }

  // password incorrect
  {
    "status": "error",
    "message": "密码不正确."
  }
  ```      
