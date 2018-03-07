<template>
<div class="bgColor">
  <div class="container">

    <el-row>
      <el-col>
        <el-button type="warning" style="float: right;width:90px;" @click="close">关闭</el-button>
      </el-col>
    </el-row>

     <el-row>
        <br>
        <el-card>
            <div class="paysuccess" v-if="payresult.result==1">
                <i class="el-icon-success"></i>
                出票成功
            </div>
            <div v-else class="payfail">
                <i class="el-icon-error"></i>
                订单取消
            </div>
            <br>
            <el-row>
                <el-col :span="5">
                    订单总额：<label v-text="payresult.totalprice" class="money"></label>
                </el-col>
                <el-col :span="19">
                    订单号: <label v-text="payresult.ticketNo" style="margin-top:6px"></label>
                </el-col>
            </el-row>
    
        </el-card>
    </el-row>
    <el-row>
      <!-- 订单信息 -->
      <el-card class="box-card">
        <header>订单信息</header> 
        <div class="order_search">
          <el-row >
              <el-col :span="8">
                  <span>订单号:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>预定时间:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>支付方式:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>PNR:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>支付时间:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>支付金额:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8" >
                  <span>订单状态:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8">
                  <span>出票时间:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
              <el-col :span="8">
                  <span>支付流水号:</span>
                  <el-input size="small"  v-model="orderInfo.word"></el-input>
              </el-col>
          </el-row>
      </div>
      </el-card>
    </el-row>
    <el-row>
      <!-- 航班信息 -->
      <el-card class="box-card">
        <header>航班信息</header>
        <div class="range_info">
          
                <el-table   ref="multipleTable"
                :data="chooseChange_flight_Table"
                tooltip-effect="dark"
                style="width: 100%">
                    <el-table-column label="航班号" prop="hbh">
                    </el-table-column>

                    <el-table-column label="出发机场" prop="cfjc">
                    </el-table-column>

                    <el-table-column label="到达机场" prop="ddjc">
                    </el-table-column>

                    <el-table-column label="起飞时间" prop="qfsj">
                    </el-table-column>

                    <el-table-column label="到达时间" prop="ddsj">
                    </el-table-column>

                    <el-table-column label="飞行时长" prop="fxsc">
                    </el-table-column>

                    <el-table-column label="去程/回程" prop="qchc">
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
          
              <el-table   ref="multipleTable"
              :data="chooseRefund_passenger_Table"
              tooltip-effect="dark"
              style="width: 100%">

                  <el-table-column label="姓名" prop="xm">
                  </el-table-column>
                  <el-table-column label="乘客类型" prop="cklx" width="80" >
                  </el-table-column>
                  <el-table-column label="性别" prop="xb"  width="50">
                  </el-table-column>

                  <el-table-column label="出生日期" prop="csrq">
                  </el-table-column>
                  <el-table-column label="国籍" prop="gj" width="80">
                  </el-table-column>
                  <el-table-column label="证件类型" prop="zjlx" width="80">
                  </el-table-column>
                  <el-table-column label="证件号" prop="zjh" width="100">
                  </el-table-column>
                  <el-table-column label="证件签发地" prop="zjqfd" width="120">
                  </el-table-column>
                  <el-table-column label="证件有效期" prop="zjyxq">
                  </el-table-column>
                  <el-table-column label="票号" prop="ph">

                  </el-table-column>

              </el-table>

          </div>
      </el-card>
    </el-row>
    <el-row>
      <!-- 联系人信息 -->
      <el-card class="box-card">
        <header>联系人信息</header>
        <div class="passenger_info">
          <el-table
          :data="tableData"
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
        <header>客规</header>
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
        <div class="passenger_info">
          <el-table :data="priceInfo" 
          ref="multipleTable"
          style="width:100%">
            <el-table-column label="乘客类型" prop="psgnertype"></el-table-column>
            <el-table-column label="人数" prop="psgnum"></el-table-column>
            <el-table-column label="票面价" prop="price"></el-table-column>
            <el-table-column label="税费" prop="tax"></el-table-column>
            <el-table-column label="返佣" prop="brokerage"></el-table-column>
            <el-table-column label="单人结算价" prop="totalprice"></el-table-column>
          </el-table>
          <el-row>
              <el-col>
                  <div  style="float:right;margin-right:50px;">
                      机票价格： <label style="font-size:30px;color:#ff8247">¥{{total}}</label>
                  </div>
              </el-col>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="warning" style="float: right;width:90px;" @click="close">关闭</el-button>
      </el-col>
    </el-row>
    <br>
  </div>
</div>
</template>

<script>

  export default {
    data() {
      return {
      tableData: [        
        {
          word1: "xxx",
          word2: "138-8888-8888",
          word3: "1398841@qq.com"
        }
      ],
          orderInfo: {
              word: undefined
          },
        payresult: {
          totalprice: '¥' + '6088',
          ticketNo: 'fuw170219095905089e9e7d',
          result: 1
        },
        radio: '1',
        textarea: '',
        chooseChange_flight_Table: [
            {
                hbh: 'MH361',
                cfjc: '北京首都国际机场',
                ddjc: '吉隆坡国际机场',
                qfsj: '12月29日 01:30',
                ddsj: '12月29日 08:30',
                fxsc: '6h30m',
                qchc: '去程'
            }
            ,{
                hbh: 'MH623',
                cfjc: '吉隆坡国际机场',
                ddjc: '新加坡樟宜机场',
                qfsj: '12月29日 11:50',
                ddsj: '12月29日 12:58',
                fxsc: '1h03m',
                qchc: '去程'
            }
            ,{
                hbh: 'MH624',
                cfjc: '新加坡樟宜机场',
                ddjc: '吉隆坡国际机场',
                qfsj: '01月07日 15:25',
                ddsj: '01月07日 16:28',
                fxsc: '1h08m',
                qchc: '回程'
            }

            ,{
                hbh: 'MH624',
                cfjc: '吉隆坡国际机场',
                ddjc: '北京首都国际机场',
                qfsj: '01月07日 18:20',
                ddsj: '01月08日 00:38',
                fxsc: '6h33m',
                qchc: '回程'
            }
        ],
        chooseRefund_passenger_Table:[
            {
                xm: 'LiuBei',
                cklx: '成人',
                xb: '男',
                csrq: '1980年09月01日',
                gj: '中国大陆',
                zjlx: '身份证',
                zjh: '3204214231234432234',
                zjqfd: '江苏苏州',
                zjyxq: '2028年10月11日',
                ph: '0-21210231'
            }
        ],
          form:{
            contactName:undefined,
            contactNumber:undefined,
            contactEmail:undefined
        },
        rules:{
            contactName:[
                { required: true, message: '请输入联系人', trigger: 'blur' }
            ],
            contactNumber:[
                { required: true, message: '请输入联系方式', trigger: 'blur' }
            ]
        },
          refundTicket:{
            isVoluntarily :0,
            Involuntary :"XXX",
            remarks :"XXX",
            involuntaryProof :"XXX"
        },
        isShow:false,
        priceInfo:[
            {
              psgnertype:"成人",
              psgnum:2,
              price:"¥1950",
              tax:"¥150",
              brokerage:"¥50",
              totalprice:"¥1950",
            },
             {
              psgnertype:"儿童",
              psgnum:1,
              price:"¥1650",
              tax:"¥150",
              brokerage:"¥50",
              totalprice:"¥1750",
            }
        ],
        total:5000,
          regulations:{
              refundRegulations :"按航司规定执行",
              changeRegulations:"按航司规定执行",
              baggageRegulations:"无",
              ticketDescription:"境外电子行程单",
              otherInstructions:"无"
          }
      }
    },
    methods: {
      close: function () {

    this.$router.push({path:'/home'})

      }
    }
  } 
</script>