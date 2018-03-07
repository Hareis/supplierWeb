<template>
<div class="bgColor">
  <div class="container">
    <section >
      <article>
        <aside>
          <el-steps style="margin-top:10px;">
                <el-step title="生单成功"></el-step>
                <el-step title="支付成功"></el-step>
                <el-step title="出票结果" class="color3"></el-step>
            </el-steps>
            <!--出票成功-->
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
            
            <!--出票失败-->
            <el-row style="margin-top:20px;display:none">
                <el-card class="box-card">
                    <el-col class="font-24" style="margin-bottom:10px;">
                        <i class="el-icon-warning" ></i>
                        <span class="red">出票失败</span>
                    </el-col>
                    <el-col :span="6" >
                        <div class="grid-content bg-purple request">
                            <span>订单总额：</span>
                            <label class="orange">￥<label v-text="orderTotalPrice" class="font-24"></label></label>
                        </div>
                    </el-col>
                    <el-col :span="6" style="margin-top:15px;">
                        <div class="grid-content bg-purple request">
                            <span>订单号：</span>
                            <label v-text="orderID" ></label>
                        </div>
                    </el-col>
                </el-card>
            </el-row>

             <!-- 订单信息 -->
           <el-row>
            <el-card class="box-card">
             <header>订单信息</header> 
            <div class="rule_info">
                <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="订单编码">
                            <span>{{ orderInfo.PNR }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <span>{{ orderInfo.status }}</span>
                        </el-form-item>
                        <el-form-item label="订单号">
                            <span>{{ orderInfo.orderID }}</span>
                        </el-form-item>
                        <el-form-item label="预订日期">
                            <span>{{ orderInfo.bookingDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="支付方式">
                            <span>{{ orderInfo.paymentMethod }}</span>
                        </el-form-item>
                        <el-form-item label="其他说明">
                            <span>{{ orderInfo.otherInstructions }}</span>
                        </el-form-item>
                    </el-form>

            </div>
        </el-card>
          </el-row>   
          
             <!-- 航班信息 -->
          <el-row>
            <el-card class="box-card">
                <header>航班信息</header>
                <div class="range_info">

                <el-table   ref="multipleTable"
                :data="chooseRefund_flight_Table"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                    <el-table-column type="selection"   width="40"></el-table-column>

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
          
             <!-- 乘客信息 -->
          <el-row>
            <el-card class="box-card">
                <header>乘客信息</header>
                <div class="passenger_info">

                <el-table   ref="multipleTable"
                :data="chooseRefund_passenger_Table"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   width="55"></el-table-column>

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
          
             <!-- 联系人信息 -->
          <el-row>
            <el-card class="box-card">
                <header>联系人信息</header>
            <div class="contact_info">
                <el-form ref="form" :model="form" :rules="rules"  :inline="true" >
                    <el-form-item label="联系人" prop="contactName">
                        <el-input size="small" v-model="form.contactName" ></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="contactNumber">
                        <el-input size="small" v-model="form.contactNumber" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input size="small" v-model="form.contactEmail" ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
          </el-row>
          
            <!-- 退改规则 -->
          <el-row> 
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

           <!-- <el-row>
            <el-card class="box-card">
              <el-button type="primary" :loading="true">加载中</el-button>
            </el-card>
          </el-row> -->
          <el-row>
              <el-col :span="4" :offset="20">
                  <el-button type="warning" @click="turnOrderList">返回订单列表</el-button>
              </el-col>
          </el-row>

          
        </aside>       
      </article>
    </section>
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
        payresult: {
          totalprice: '¥' + '6088',
          ticketNo: 'fuw170219095905089e9e7d',
          result: 1
        },
            orderTotalPrice:"6000",
            orderID:331308690054,
            radio: '1',
                textarea: '',
            orderInfo:{
                PNR:"8APT9O",
                status:"已出票",
                orderID:"331308690054",
                bookingDatetime:"2016-11-23 17:16",
                paymentMethod:"支付宝",
                otherInstructions:"无"
            },
            chooseRefund_flight_Table: [
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
                
            regulations:{
                refundRegulations :"按航司规定执行",
                changeRegulations:"按航司规定执行",
                baggageRegulations:"无",
                ticketDescription:"境外电子行程单",
                otherInstructions:"无"
            }
        }
    },
    methods:{
        turnOrderList:function(){

             this.$router.push({path:'/signin'})
        },
        handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            submitApplication(){
            this.$router.push({path:'/refundResult'})

            },
            Involuntary(){

            }
    }
};
</script>

<style>