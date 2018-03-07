**Content-Type**

    application/json
    
**cnpm install json-server -g**

LoggingService    
```  
json-server ./server/mock/LoggingService1.json -r ./server/mock/LoggingService1Route.js -w --middlewares ./server/mock/middleware-1.js  --port 3000
```

DBService      
```
json-server ./server/mock/DBService1.json -r ./server/mock/DBService1Route.js -w --middlewares ./server/mock/middleware-1.js --port 3001
```

OrderService       
```
json-server ./server/mock/OrderService1.json -r ./server/mock/OrderService1Route.js -w --middlewares ./server/mock/middleware-1.js --port 3002
```

AccountingService
```
json-server ./server/mock/AccountingService1.json -r ./server/mock/AccountingService1Route.js -w --middlewares ./server/mock/middleware-1.js --port 3003
```

refundService
```
json-server ./server/mock/refundService.json -r ./server/mock/refundServiceRoute.js -w --middlewares ./server/mock/middleware-1.js --port 13000
```