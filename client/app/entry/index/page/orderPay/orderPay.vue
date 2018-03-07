<template>
    <div class="bgColor">
 <div class="container">
        <section>
            <article>
                <aside>
                    <el-row>
                        <el-steps :active="2">
                            <el-step title="生单"></el-step>
                            <el-step title="支付"></el-step>
                            <el-step title="支付结果" class="color2"></el-step>
                        </el-steps>
                    </el-row>
                    <el-row>
                        <!-- 航班信息 -->
                       
                        <el-card class="box-card">
                             <header>航班信息</header>
                        <div class="range_info">
                                <el-table
                                :data="flightInfoData"
                                style="width: 100%">
                                <el-table-column
                                    prop="word1"
                                    label="出发机场"
                                    width="160">
                                </el-table-column>
                                <el-table-column
                                    prop="word2"
                                    label="到达机场"
                                    width="160">
                                </el-table-column>
                                <el-table-column
                                    prop="word3"
                                    label="航空公司"
                                    width="120">
                                </el-table-column>
                                <el-table-column
                                    prop="word4"
                                    label="航班号"
                                    width="90">
                                </el-table-column>
                                <el-table-column
                                    prop="word5"
                                    label="舱位"
                                    width="70">
                                </el-table-column>
                                <el-table-column
                                    prop="word6"
                                    label="起飞时间"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="word7"
                                    label="到达时间"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="word8"
                                    label="飞行时长"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="word9"
                                    label="机型">
                                </el-table-column>
                                </el-table>
                        </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 乘客信息 -->
                            
                        <el-card class="box-card">
                            <header>乘客信息</header>
                              <div class="passenger_info">
                                        <el-table
                                        :data="passengersInfoData"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="word1"
                                            label="姓名"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word2"
                                            label="乘客类型"
                                            width="100"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word3"
                                            label="性别"
                                            width="80">
                                        </el-table-column>
                                        <el-table-column
                                            prop="word4"
                                            label="出生日期"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word5"
                                            label="国籍"
                                            width="80"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word6"
                                            label="证件类型"
                                            width="100">
                                        </el-table-column>
                                        <el-table-column
                                            prop="word7"
                                            label="证件号"
                                            width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word8"
                                            label="证件签发地"
                                            width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="word9"
                                            label="证件有效期">
                                        </el-table-column>
                                        </el-table>
                                    </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 联系人信息 -->
                   
                        <el-card class="box-card">  
                             <header>联系人信息</header>   
                             <div class="contact_info">
                                <el-table
                                :data="contactInfoData"
                                style="width: 100%">
                                <el-table-column
                                    prop="word1"
                                    label="联系人"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="word2"
                                    label="联系方式"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="word3"
                                    label="邮箱">
                                </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 退改规则 -->
                       
                        <el-card class="box-card">
                             <header>退改规则</header>
                              <div class="rule_info">
                                <el-form label-position="left"  class="demo-table-expand">
                                    <el-form-item label="退票规定">
                                        <span>{{ regulations.refundRegulations }}</span>
                                    </el-form-item>
                                    <el-form-item label="改期规定">
                                        <span>{{ regulations.changeRegulations }}</span>
                                    </el-form-item>
                                    <el-form-item label="行李额规定">
                                        <span>{{ regulations.baggageRegulations }}</span>
                                    </el-form-item>
                                    <el-form-item label="票本说明">
                                        <span>{{ regulations.ticketDescription }}</span>
                                    </el-form-item>
                                    <el-form-item label="其他说明">
                                        <span>{{ regulations.otherInstructions }}</span>
                                    </el-form-item>
                                </el-form>
                              </div>
                        </el-card>
                    </el-row>

                    <el-row>
                        <!-- 价格信息 -->
                     
                        <el-card class="box-card">
                               <header>价格信息</header>
                               <div class="priceInfo">
                                    <el-table
                                    :data="priceInfoData"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="date"
                                        label="乘客类型"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="人数"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="address"
                                        label="票面价">
                                    </el-table-column>
                                    <el-table-column
                                        prop="date"
                                        label="税费"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="返佣"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="address"
                                        label="单人结算价">
                                    </el-table-column>
                                    </el-table>
                                    <el-row>
                                    <el-col :span="20"> &nbsp;</el-col>
                                    <el-col :span="4">应付总金额:
                                        <span style="color:rgb(255,164,5);font-size:25px">￥6078</span>
                                    </el-col>
                                    </el-row>
                                </div>
                        </el-card>
                    </el-row>

                    <el-row>
                        <el-card class="box-card">
              
                           
                            <!-- <el-button type="info" style="float:right;margin-bottom: 20px"
                                       ref="submitBtn">取消订单
                            </el-button> -->
                            &nbsp;&nbsp;&nbsp;
                            <el-button type="primary" style="float:right;margin-bottom: 20px;margin-right: 20px"
                                       @click="commitOrderPay()"
                                       ref="submitBtn">支付订单
                            </el-button>

                                          <div class="timeInfo">
                                    <span>
                                        <label for="">生单时间: </label>
                                        <label for=""> 2017-10-27 14:13</label>
                                    </span>
                                    <br/>
                                    <span>
                                        <label for="">剩余支付时间:  </label>
                                        <label for="" style="color: red"> 26分13秒</label>
                                    </span>
                            </div>

                        </el-card>
                    </el-row>

                </aside>
            </article>
        </section>
    </div>
    </div>
   
</template>

<script>
export default {
  data() {
    return {
      flightInfoData: [
        {
          word1: "北京首都国际机场",
          word2: "吉隆坡国际机场",
          word3: "马来西亚航空",
          word4: "MH361",
          word5: "N舱",
          word6: "12月29日01:30",
          word7: "12月29日08:00",
          word8: "6h30m",
          word9: "A330"
        },
        {
          word1: "吉隆坡国际机场",
          word2: "新加坡樟宜机场",
          word3: "马来西亚航空",
          word4: "MH623",
          word5: "L舱",
          word6: "12月29日01:30",
          word7: "12月29日08:00",
          word8: "6h30m",
          word9: "737"
        },
        {
          word1: "北京首都国际机场",
          word2: "吉隆坡国际机场",
          word3: "马来西亚航空",
          word4: "MH624",
          word5: "L舱",
          word6: "01月07日 15:25",
          word7: "01月07日 16:25",
          word8: "1h",
          word9: "738"
        },
        {
          word1: "吉隆坡国际机场",
          word2: "北京首都国际机场",
          word3: "马来西亚航空",
          word4: "MH623",
          word5: "N舱",
          word6: "01月07日 18:20",
          word7: "01月08日 00:20",
          word8: "6h",
          word9: "A330"
        }
      ],

      passengersInfoData: [
        {
          word1: "LIN/QINGXUAN",
          word2: "成人",
          word3: "女",
          word4: "1989年01月01日",
          word5: "中国",
          word6: "护照",
          word7: "GB123456",
          word8: "中国",
          word9: "2023年05月01日"
        },
        {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        },
        {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        },
        {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        }
      ],
      contactInfoData: [
        {
          word1: "xxx",
          word2: "138-8888-8888",
          word3: "1398841@qq.com"
        }
      ],
      refundRulesData: {
        tpgd: "按航司规定执行",
        gqgd: "按航司规定执行",
        xlegd: "无",
        pbsm: "境外电子行程单",
        qtsm: "无"
      },
       refundRulesData:{
        tpgd:"按航司规定执行",
        gqgd:"按航司规定执行",
        xlegd:"无",
        pbsm:"境外电子行程单",
        qtsm:"无"
      },  
      priceInfoData: [
        {
          date: "1",
          name: "2",
          address: "3"
        },
        {
          date: "4",
          name: "5",
          address: "6"
        }
      ],
              regulations:{
                refundRegulations :"按航司规定执行",
                changeRegulations:"按航司规定执行",
                baggageRegulations:"无",
                ticketDescription:"境外电子行程单",
                otherInstructions:"无"
            }
    };
  },
  methods: {
    commitOrderPay() {

      this.$router.push({path: '/payResult'})
    }
  }
};
</script>


<style scoped>

#signup > article > aside {
  height: 100%;
  margin-top: 50px;
}



[v-cloak] {
  display: none;
}

input:disabled {
  color: #000000 !important;
  font-weight: lighter;
}

.color3 .el-step__head.is-wait,
.color3 .el-step__title.is-wait {
  color: #ff8247;
  border-color: #ff8247;
}
.green {
  color: #67c23a;
}
.red {
  color: red;
}
.orange {
  color: #ff8247;
}
.font-24 {
  font-size: 24px;
}
.request > span {
  display: inline-block;
  width: 115px;
  text-align: right;
  padding-right: 10px;
}


.demo-table-expand {
  margin-left: 20px;
}
.demo-table-expand label {
  width: 90px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.timeInfo {
  font-size: 14px;
  color: #878d99;
  float: right;
  margin-bottom: 20px;
}
</style>
