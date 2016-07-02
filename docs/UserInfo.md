# UserInfo Resource

### Table Definition
```javascript
var params = {  
    TableName : "UserInfo",  
    KeySchema: [       
      { AttributeName: "username", KeyType: "HASH" }  //Partition key    
    ],  
    AttributeDefinitions: [         
        { AttributeName: "county", AttributeType: "S" },
        { AttributeName: "city", AttributeType: "S" },
        { AttributeName: "username", AttributeType: "S" }
    ],  
    GlobalSecondaryIndexes: [
        {
            IndexName: "CountyIndex",
            KeySchema: [
                { AttributeName: "county", KeyType: "HASH" }  //Partition key  
            ],
            Projection: {
                "ProjectionType": "ALL"
            },
            ProvisionedThroughput: {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        },
        {
            IndexName: "CityIndex",
            KeySchema: [
                { AttributeName: "city", KeyType: "HASH" }  //Partition key  
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
