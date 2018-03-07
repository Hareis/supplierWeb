## v1.3.0 - 2018-2-2 by 陆俊杰
* [Feature]
 1. 增加文本报价功能
 2. 下载标准电子行程单功能
 3. 往返航班排序
 4. 订单状态-对应功能
 5. 改期方案页面增加上传图片功能
 6. 退款中状态修改
 7. 生单页面不自动保存信息
 8. 退费的服务费手续费字段混淆
 9. shopping增加查询结果日志

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无


## v1.2.0 - 2018-1-31 by 陆俊杰
* [Feature]
 1. 更新gov地址

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

## v1.1.0 - 2018-1-25 by 陆俊杰
* [Feature]
 1. 授信管理
 2. 预付款管理
 3. 资金变动管理
 4. 退废管理
 5. 改期管理
 6. 退票退款接口更新调试
 7. 预付款、授信支付流程修改

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

## v1.0.3 - 2017-12-22 by 陆俊杰
* [Feature]
 1. 额度申请前获取订单金额和支付方式信息
 2. 支付额度申请(支付/收款接口)
 3. 获取支付url接口
 4. 获取支付状态接口
 5. 通知出票

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

## v1.0.2 - 2017-12-15
* [Feature]
 1. PNR导入的内容CID改成B2BRT20171123
 2. 申请预存款和预存款信息展示页面
 3. 切换loggingService到正式和demo环境

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

## v1.0.1 - 2017-12-14
* [Feature]
 1. 所有接口切换至北京
 2. 增加Mock接口功能

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

## v1.0.0 - 2017-11-29
### Feature
 1. 用户登录相关
 2. PNR导入
 3. shoppingList查询
 4. 预定校验
 5. 生单
 6. 支付前校验
 7. 获取用户订单列表

* [BugFix]
 1. 无
 
* [Configuration]
 1. 无

### Dependency 
- node v8.9.0+
- npm v5.4.2+
- cnpm 5.1.1( npm install -g cnpm --registry=https://registry.npm.taobao.org)
- python v2.7.10+
- gcc v4.8+
- node-gyp v3.6.2+ (cnpm install node-gyp -g)
- pm2 v2.8.0+ (cnpm install -g pm2)
- pm2-intercom (pm2 install pm2-intercom)

### Configuration Production
- 在包目录中
- 安装:sh ./install-prd.sh (会自动设置为linux启动项)
- 卸载:sh ./uninstall.sh
- 更新包:不要删除原有文件,直接把新包的内容覆盖进去(无需重新安装,无需执行其他脚本,pm2会自动watch)
- 查看运行情况:pm2 monit
- 查看安装错误:tail -f ~/.pm2/pm2.log
- 重启容器:pm2 restart BuyerWeb
- 暂停,启动容器:pm2 stop BuyerWeb ; pm2 start BuyerWeb 
- 查看 pm2-intercom 是否加载成功: pm2 list

### Configuration On Staging
- 部署启动

```
    ssh root@119.84.8.43 -p 13198       
    docker  attach  buyer-web-dev       
    cd ~/ShanghaiDevTeam_Staging/demo or dev/BuyerWeb/      
    (ps -ef|grep env=dev|grep -v grep|cut -c 9-15|xargs kill -9) or demo
```

- 获取发布包 方式1 (服务器源代码打包)  

```
  cd tools/pack     
  git checkout dev or demo      
  git pull      
  cnpm install      
  npm run pack-demo or dev     
```
    
- 获取发布包 方式2 (本地打包后上传)    

```
  cd ~/ShanghaiDevTeam_Staging/BuyerWeb/        
  cd tools/pack     
  cnpm install      
  npm run pack-demo     
  scp -r -P 13198  ~/project/uhetrip/BuyerWeb/dist  root@119.84.8.43:/root/ShanghaiDevTeam_Staging/BuyerWeb/        
```

- 直接运行方式     

```
  cd ~/ShanghaiDevTeam_Staging/dev or demo/BuyerWeb/    
  
  (ps -ef|grep env=dev|grep -v grep|cut -c 9-15|xargs kill -9)&&(cd dist/server/&&cnpm install&&nohup npm run dev > ../../devApp.log 2>../../devError.log &)

  (ps -ef|grep env=demo|grep -v grep|cut -c 9-15|xargs kill -9)&&(cd dist/server/&&cnpm install&&nohup npm run demo > ../../demoApp.log 2>../../demoError.log &)

``` 

- 部署启动部分Demo需要启动MockServer    

  
```
    cnpm install json-server -g   

    cd ~/ShanghaiDevTeam_Staging/BuyerWeb/
    git checkout dev or demo
    git pull
    
    nohup json-server ./server/mock/OrderService1.json -r ./server/mock/OrderService1Route.js -w --middlewares ./server/mock/middleware-1.js --port 3002 > mocklog.log &
    
    测试一下:curl http://127.0.0.1:3002/ota/paycheck/v1

```

- 更新包步骤    

```
    *** dev 环境其他同理 , eg:dev 替换成 demo ***
    ssh root@119.84.8.43 -p 13198       
    docker  attach  buyer-web-dev
    cd ~/ShanghaiDevTeam_Staging/dev/BuyerWeb/
    ps -ef|grep env=dev|grep -v grep|cut -c 9-15|xargs kill -9
    cd tools/pack     
    git pull
    git checkout dev
    cnpm install      
    npm run pack-dev    
    cd ~/ShanghaiDevTeam_Staging/dev/BuyerWeb/
    cd dist/server/&&cnpm install&&nohup npm run dev > ../../devApp.log 2>../../devError.log & 
    #tail -f dist/server/appLog/buyerweb-dev.log.2017-12-13
    ctrl+p,q
```
