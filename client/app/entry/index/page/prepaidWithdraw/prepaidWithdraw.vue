<template>
    <div id="orderList">
        <div class="container">
            <el-card>
                <header>授信变动管理</header>
            </el-card>
            <br>
            <el-card>
                <el-row :gutter="20" class="refund_search_row">
                    <el-col :span="8">

                        <div class="grid-content bg-purple request">
                            <span>代理商名称:</span>

                               <el-select v-model="value8" filterable placeholder="请选择">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>

                        </div>
                    </el-col>





                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>充值/提现状态:</span>
                            <el-select  v-model="orderquest.status" filterable placeholder="请选择">
                                <el-option label="待确认" value="0"></el-option>
                                <el-option label="已确认" value="1"></el-option>
                                <el-option label="驳回" value="2"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>充值/提前时间:</span>
                            <el-date-picker v-model="orderquest.datetime" type="daterange"
                                            class="timeChoose"
                                            placeholder="选择日期" size="small">

                            </el-date-picker>
                        </div>
                    </el-col>

                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>预付款流水号:</span>
                            <el-input size="small" v-model="orderquest.serialNumber"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8" :offset="16">
                        <div >
                            <el-button style="float: right;margin-right:35px;" @click="refundReset">导出</el-button>

                            <el-button style="float: right;margin-right:20px;" type="primary" @click="getQueryRefundBtn(true)">
                                查询
                            </el-button>
                        </div>

                    </el-col>
                </el-row>

            </el-card>
            <br>
            <el-card>
                <div class="passenger_info">

                    <el-table :data="tabledata1" type="expand" border style="width: 100%">

                        <el-table-column label="序号" width="40" type="index"></el-table-column>
                        <el-table-column label="代理商名称" prop="name"></el-table-column>
                        <el-table-column label="预付款流水号" prop="number"></el-table-column>
                        <el-table-column label="预付款变动类型" prop="type"></el-table-column>
                        <el-table-column label="账户金额" prop="account"></el-table-column>
                        <el-table-column label="充值/提现金额" prop="amount"></el-table-column>
                        <el-table-column label="充值/提现时间" prop="datetime"></el-table-column>
                        <el-table-column label="联系电话" prop="phone"></el-table-column>
                        <el-table-column label="充值/提现状态" prop="status"></el-table-column>
                        <el-table-column label="查看凭据" prop="type"></el-table-column>
                        <el-table-column label="确认/拒回时间" prop="datetime"></el-table-column>
                        <el-table-column label="是否拒回" prop="isRefused"></el-table-column>
                        <el-table-column label="拒回原因" prop="type"></el-table-column>
                        <el-table-column label="锁单人" prop="opName"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button type="text">确认充值</el-button>
                                <el-button type="text">拒回</el-button>
                                <el-button type="text">锁单</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>

                    <div class="block" style="float: right;margin: 15px 0;">

                        <el-pagination @current-change="handleCurrentChange"
                                       @size-change="handleSizeChange"
                                       :current-page="pageIndex"
                                       :page-size="pageSize"
                                       :page-sizes="[10, 20, 50, 100]"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="totalRows">
                        </el-pagination>
                    </div>

                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
import requestAPIServiceAsync from "js/api";
import APIService from "js/api";
export default {
  data() {
    return {
      orderquest: {
        name: undefined,
        type: undefined,
        value8: undefined,
        status: undefined,
        datetime: undefined,
        serialNumber: undefined
      }, 
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

      tabledata1: [{
          name:undefined
          ,type:undefined
          ,status:undefined
          ,account:undefined
          ,amount:undefined
          ,datetime:undefined
          ,phone:undefined
          ,number:undefined
          ,isRefused:undefined
          ,opName:undefined 
      }],
      pageIndex: 1,
      totalPages: 0,
      totalRows: 0,
      pageSize: 10
    };
  },
  methods: {
    refundReset: function() {
      this.orderquest = {
        flightStartAndEndDate: undefined,
        pnr: undefined,
        depcity: undefined,
        bookingStartAndEndDate: undefined,
        psgnername: undefined,
        arrcity: undefined,
        orderNo: undefined,
        ticketNo: undefined,
        orderstatus: undefined
      };
    },
    async getQueryRefundBtn(isBtn) {
      try {
        if (isBtn) {
          this.pageIndex = 1;
        }
        var queryObject = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };

        const res = await requestAPIServiceAsync(
          "user/getOrderList.do",
          queryObject
        );
        // console.log(res)
        var tabledata = res.orders;
        this.tabledata1 = tabledata;
        this.totalPages = res.totalPage;
        this.totalRows = res.totalRow;
      } catch (error) {
        this.$message.error(error.errorMsg || error.statusText);
      }
    },

    getOrderDetails: function(row) {
      this.detalisData1 = row;
      console.log(this.detalisData1);
      this.orderDetails = true;
    },



    /**立即支付 */
    async payment(row) {
      const loading = this.$loading({
        lock: true,
        text: "支付价格校验中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(row.userId);
      try {
        var request = {
          orderId: row.orderId
        };
        console.log(request);
        console.log(row);
        const res1 = await APIService("/booking/paycheck.do", request);
        if (!res1.success) {
          loading.close();
          this.$message.error(res1.errorMsg);
          return;
        }
        this.getQueryRefundBtn();
        loading.close();
        // this.$router.push({ path: "/changePay" });
        var changepayUrl=    '/changePay?orderId='+this.orderId
        console.log(changepayUrl)
        this.$router.push({path: changepayUrl});
      } catch (e) {
        loading.close();
        this.$message.error(e.errorMsg || e.statusText);
      }
    },



    /**
             *分页事件
             */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getQueryRefundBtn();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getQueryRefundBtn();
    },
    getRefundApplication: function() {
      this.$router.push({ path: "/refundApplication" });
    },
    getChangeApplication: function() {
      this.$router.push({ path: "/ChangeApplication" });
    }
  },
  mounted() {
    //this.getQueryRefundBtn();
  }
};
</script>


<style>
#orderList {
  min-height: 750px;
}

#orderDetailsShow .el-dialog {
  width: 1140px;
}

.refund_search_row .el-input {
  width: 200px;
}

.el-card__body {
  font-size: 10px;
}

.request > span {
  display: inline-block;
  width: 115px;
  text-align: right;
}

.grid-content,
.bg-purple {
  margin-top: 10px !important;
}

.refundStatus_btn {
  margin: 0 auto;
  width: 100px;
  text-align: center;
  background: #ffc145;
  color: #fff;
  border-radius: 8px;
}

#orderDetailsPrice .el-col-4 {
  text-align: center;
}

.timeChoose {
  width: 200px !important;
}
 .passenger_info > .el-table th {
    text-align: left;
    background: #ff9933;
    color: #fff;
}
</style>
