<template>
<div class="bgColor">

    <div class="container">
        <section>
            <article>
                <aside>
                    <el-row>
                        <el-steps style="margin-top:10px;" :active="1">
                            <el-step title="生单成功"></el-step>
                            <el-step title="支付成功"></el-step>
                            <el-step title="出票结果" class="color3"></el-step>
                        </el-steps>
                    </el-row>
                    <el-row>
                        <!-- 退改规则 -->
                        <el-card class="box-card">
                        <header>客规 </header>
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
                        <!-- 航班信息 -->
                        <el-card class="box-card">
                        <header>航班信息</header>
                           <div class="range_info">
                              <flightInfo/>
                           </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 价格信息 -->
                        <el-card class="box-card">
                        <header>价格信息</header>
                            <div class="passenger_info">
                              <priceInfo/>
                            </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 乘客信息 -->
                        <el-card class="box-card">
                        <header>乘客信息</header>
                            <div class="order_search">
                              <passengersInfo></passengersInfo>
                            </div>
                        </el-card>
                    </el-row>
                    <el-row>
                        <!-- 联系人信息 -->
                        <el-card class="box-card">
                        <header>联系人信息</header>
                            <div class="contact_info">
                              <contactInfo :value="new Object()"></contactInfo>
                            </div>
                        </el-card>
                    </el-row>
                    <el-row>
        
                            <el-button type="primary" style="float:right;margin-bottom: 20px" :loading="isSubmit"
                                       @click="submitOrder" ref="submitBtn">{{!isSubmit ? '提交订单' : '正在生成订单...'}}
                            </el-button>
                   
                    </el-row>

                </aside>
            </article>
        </section>
    </div>
    
</div>
</template>

<script>
import contactInfo from "./contactInfo.vue";
import passengersInfo from "./passengersInfo.vue";

import flightInfo from "component/flightInfo.vue";
import priceInfo from "component/priceInfo.vue";
import refundRules from "component/refundRules.vue";

export default {
  data() {
    return {
      isSubmit: false,
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
    submitOrder() {
      this.isSubmit = true;
      setTimeout(() => {
        // window.location.href = "orderPay";
        this.$router.push({path:'/orderPay'})
      }, 2 * 1000);
    }
  },
  components: {
    contactInfo,
    flightInfo,
    passengersInfo,
    priceInfo,
    refundRules
  }
};
</script>
