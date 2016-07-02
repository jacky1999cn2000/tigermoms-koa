# UserInfo Resource

### Table Definition
```javascript
var params = {  
    TableName : "UserInfo",  
    KeySchema: [         
      { AttributeName: "county", KeyType: "HASH" },  //Partition key  
      { AttributeName: "city", KeyType: "RANGE" }  //Sort key  
    ],  
    AttributeDefinitions: [         
        { AttributeName: "county", AttributeType: "S" },
        { AttributeName: "city", AttributeType: "S" },
        { AttributeName: "username", AttributeType: "S" }
    ],  
    GlobalSecondaryIndexes: [
        {
            IndexName: "UserNameIndex",
            KeySchema: [
                {AttributeName: "username", KeyType: "HASH"}
            ],
            Projection: {
                "ProjectionType": "ALL"
            },
            ProvisionedThroughput: {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        }
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
