# tigermoms-koa

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
