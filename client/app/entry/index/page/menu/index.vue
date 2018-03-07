<template>

    <div style="width:200px;float:left;">
        <el-row>
            <el-col>
                <el-menu router
                         :default-active="$route.path"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/orderList" :route="{path:'/orderList'}">全部订单</el-menu-item>
                            <el-menu-item index="/refundOrderList" :route="{path:'/refundOrderList'}">退票订单
                            </el-menu-item>
                            <el-menu-item index="/disillusionedOrderList" :route="{path:'/disillusionedOrderList'}">废票订单
                            </el-menu-item>
                            <el-menu-item index="/changeOrderList" :route="{path:'/changeOrderList'}">改期订单
                            </el-menu-item>
                            <!--<el-menu-item index="1-4" :route="{path:'/orderList'}">航变订单</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">资产中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/balance">资金变动</el-menu-item>
                            <el-menu-item index="/prepayRecord">预付款管理</el-menu-item>
                            <el-menu-item index="/creditSettlement">授信结算</el-menu-item>
                            <el-menu-item index="/creditChange">授信变动</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                         <template slot="title">
                             <i class="el-icon-setting"></i>
                             <span slot="title">账户设置</span>
                         </template>  
                         <el-menu-item-group>
                            <el-menu-item index="/paySign">支付签约</el-menu-item>    
                         </el-menu-item-group>     
                    </el-submenu>    
                    <!--<el-submenu index="3">-->
                    <!--<template slot="title">-->
                    <!--<i class="el-icon-menu"></i>-->
                    <!--<span slot="title">账户设置</span>-->
                    <!--</template>-->
                    <!--<el-menu-item-group>-->
                    <!--<el-menu-item index="3-1">个人资料</el-menu-item>-->
                    <!--<el-menu-item index="3-2">账户安全</el-menu-item>-->
                    <!--<el-menu-item index="3-3">分销商账户管理</el-menu-item>-->
                    <!--<el-menu-item index="3-4">平台账户管理</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                    <!--</el-submenu>-->
                </el-menu>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>
    #container {
        padding: 0;
        margin: 0;
    }

    .container {
        max-width: 400px !important;
        margin: 0 auto;
        padding-bottom: 0;
        margin-top: 0;
        padding-top: 0;
    }
</style>