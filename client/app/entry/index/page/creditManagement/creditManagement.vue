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

                    <el-col :span="8" :offset="16">
                        <div >
                            <el-button style="float: right;margin-right:35px;" @click="refundReset">导出</el-button>

                            <el-button style="float: right;margin-right:20px;" type="primary" @click="searchBtn(true)">
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
                        <el-table-column label="是否开启授信" prop="name"></el-table-column>
                        <el-table-column label="授信总额" prop="number"></el-table-column>
                        <el-table-column label="当前剩余额度" prop="type"></el-table-column>
                        <el-table-column label="结算方式" prop="account"></el-table-column>
                        <el-table-column label="结算截止时间" prop="amount"></el-table-column>
                        <el-table-column label="额度不足通知邮箱" prop="datetime"></el-table-column>
                        <el-table-column label="额度不足通知手机" prop="phone"></el-table-column>
                        <el-table-column label="授信不结算日期" prop="status"></el-table-column>
                        <el-table-column label="授信不结算星期" prop="type"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button type="text" @click="modify">修改</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column>
                              <template scope="scope">
                                   <el-button @click="check">查看</el-button>
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
         <el-dialog title="授信设置" :visible.sync="creditSetting" size="large" id="orderDetailsShow">
                <el-form ref="credit" :model="creditSettingTable" label-width="80px">
                        <el-form-item label="代理商名称">
                            <el-input v-model="credit.name"></el-input>
                        </el-form-item>

                        <el-form-item label="是否开启授信">
                            <el-radio-group v-model="credit.enable">
                            <el-radio label="开启" value="true"></el-radio>
                            <el-radio label="关闭" value="false"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                         <el-form-item label="授信总额">
                            <el-input v-model="credit.creditLine"></el-input>
                        </el-form-item>

                        <el-form-item label="结算截止日期">
                             T+ <el-select v-model="credit.billHour">
                                    el-
                                </el-select>    
                        </el-form-item>
                        
                       

                        
                    
                </el-form>    
        </el-dialog>
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
        creditSettingTable:{
            name:"",
        },

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
      pageSize: 10,
      creditSettingL: false,

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
    async searchBtn(isBtn) {
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


// 查看按钮
    check(){

    },

    modify() {
            this.creditSettingL = true;
            //debugger;
        
    },



    /**
             *分页事件
             */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.searchBtn();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchBtn();
    },
    getRefundApplication: function() {
      this.$router.push({ path: "/refundApplication" });
    },
    getChangeApplication: function() {
      this.$router.push({ path: "/ChangeApplication" });
    }
  },
  mounted() {
    //this.searchBtn();
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
