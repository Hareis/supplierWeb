<template>

  <div>
    <!-- <ul class="indexList">
      <li v-for="(list,index) in indexList">
        <a :href="list.url">
          <div>{{list.title}} {{list.desc}}</div>
        </router-link>
      </li>
    </ul> -->

    <div style="padding:20px 0">
      <!-- <el-table :data="indexList">
        <el-table-column porp="title" label="頁面">
          <template scope="list">
            <a :href="list.row.url">
              <div>{{list.row.title}}</div>
            </router-link>
            <router-link :to="list.url">
            <div>{{list.title}}</div>
            <div>{{list.desc}}</div>
          </router-link>

          </template>
        </el-table-column>
        <el-table-column porp="desc" label="地址">
          <template scope="list">
            {{list.row.desc}}
          </template>
        </el-table-column>
      </el-table> -->
   
    <div style="text-align:center">
       <h4>
        页面列表
        <br/><br/>
       </h4>

    </div>
    <br/>
      <table class="el-table" >
        <tr>
            <th>页面
               
            </th>
            <th>访问地址</th>
            <th>功能点</th>
        </tr>
        <tr>
          <td >登录页面</td>
          <td ><router-link to="signin"> signin</router-link></td>
          <td>点击登录--> <router-link to="search">查询页面 search</router-link></td>
        </tr>
        <tr>
          <td>查询页面</td>
          <td><router-link to="search"> search</router-link> </td>
          <td>点击预定-->  <router-link to="createOrder">生单页面 createOrder</router-link></td>
        </tr>
        <tr>
          <td>生单页面</td>
          <td><router-link to="createOrder"> createOrder</router-link></td>
          <td>点击提交--> <router-link to="orderPay">支付页面 orderPay</router-link></td>
        </tr>
        <tr>
          <td> 支付页面 </td>
          <td> <router-link to="orderPay"> orderPay</router-link> </td>
        </tr>
        <tr>
          <td>支付结果页面 </td>
          <td><router-link to="payResult"> payResult</router-link> </td>
          <td>点击返回订单列表 --> <router-link to="orderList">订单列表 orderList</router-link></td>
        </tr>
        <tr>
          <td rowspan="3">订单列表页面</td>
          <td rowspan="3"><router-link to="orderList"> orderList</router-link> </td>
        </tr>
        <tr>
          <td>点击 改期 --> <router-link to="changeApplication">改期页面 changeApplication</router-link> </td>
        </tr>
        <tr>
          <td>点击 退票 --> <router-link to="refundApplication">退票页面 refundApplication</router-link> </td>
        </tr>
        <tr>
          <td>订单详情页面 </td>
          <td><router-link to="orderDetails"> orderDetails</router-link> </td>
          <td>点击 关闭  --> <router-link to="orderList">订单列表 orderList</router-link> </td>
        </tr>
        <tr>
          <td >出票结果页</td>
          <td ><router-link to="ticketResult"> ticketResult</router-link></td>
          <td>点击 返回订单列表 --> <router-link to="orderList">订单列表 orderList</router-link> </td>
        </tr>
        <tr>
          <td>退票申请页面 </td>
          <td><router-link to="refundApplication">refundApplication</router-link> </td>
          <td>点击 提交--> <router-link to="refundResult">退票结果页 refundResult</router-link></td>
        </tr>
        <tr>
          <td>退票结果页 </td>
          <td><router-link to="refundResult"> refundResult</router-link> </td>
          <td>点击 返回订单列表 --> <router-link to="orderList">订单列表 orderList</router-link> </td>
        </tr>
        <tr>
          <td>改期申请页面 </td>
          <td><router-link to="changeApplication"> changeApplication</router-link> </td>
          <td>点击 提交--> <router-link to="changeResult">改期结果页面 changeResult</router-link></td>
        </tr>
        <tr>
          <td>改期结果页面 </td>
          <td><router-link to="changeResult"> changeResult</router-link> </td>
          <td>点击 返回订单列表 --> <router-link to="orderList">订单列表 orderList</router-link> </td>
        </tr>
        <tr>
          <td>改期支付页面 </td>
          <td><router-link to="changePay"> changePay</router-link> </td>
          <td>支付完成 跳转 --> <router-link to="changePaySuccess">改期支付成功 changePaySuccess</router-link></td>
        </tr>
        <tr>
          <td >改期支付成功</td>
          <td><router-link to="changePaySuccess"> changePaySuccess</router-link></td>
          <td>点击 返回订单列表 --> <router-link to="orderList">订单列表 orderList</router-link> </td>
        </tr>
         <tr>
          <td >账户管理</td>
          <td><router-link to="changePaySuccess"> changePaySuccess</router-link></td>
          <td>点击导航链接 账户管理 --> <router-link to="account">账户管理 account</router-link> </td>
        </tr>
           <tr>
          <td >资金变动管理</td>
          <td><router-link to="changePaySuccess"> balance</router-link></td>
          <td>点击导航链接 资金变动管理--> <router-link to="balance">资金变动管理 balance</router-link> </td>
        </tr>
      </table>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      indexList: [
        {
          title: "登录页面",
          desc: "signin",
          url: "signin"
        },
        {
          title: "查询页面",
          desc: "search",
          url: "search"
        },
        {
          title: "生单页面",
          desc: "createOrder",
          url: "createOrder"
        },
        {
          title: "支付页面",
          desc: "orderPay",
          url: "orderPay"
        },
        {
          title: "支付结果页面",
          desc: "payResult",
          url: "payResult"
        },
        {
          title: "订单列表页面",
          desc: "orderList",
          url: "orderList"
        },
        {
          title: "订单详情页面",
          desc: "orderDetails",
          url: "orderDetails"
        },
        {
          title: "出票结果页",
          desc: "ticketResult",
          url: "ticketResult"
        },
        {
          title: "退票申请页面",
          desc: "refundApplication",
          url: "refundApplication"
        },
        {
          title: "退票结果页",
          desc: "refundResult",
          url: "refundResult"
        },
        {
          title: "改期申请页面",
          desc: "changeApplication",
          url: "changeApplication"
        },
        {
          title: "改期结果页面",
          desc: "changeResult",
          url: "changeResult"
        },
        {
          title: "改期支付页面",
          desc: "changePay",
          url: "changePay"
        },
        {
          title: "改期支付成功",
          desc: "changePaySuccess",
          url: "changePaySuccess"
        },
        {
          title: "账户管理",
          desc: "account",
          url: "account"
        },
        {
          title: "资金变动管理",
          desc: "balance",
          url: "balance"
        }
      ]
    };
  },
  methods: {
    searchClick(requestData) {
      console.log(requestData);
    }
  }
};
</script>

<style>
body {
  background-color: #fff;
}
.el-table {
  width: 80%;
  margin: auto;
}
.el-table td,
.el-table th {
  text-align: left;
  padding: 5px;
}
.indexList li {
  padding: 10px;
}

.el-table td a {
  color: blue;
}

.el-table td a:hover {
  color: blue;
}
</style>