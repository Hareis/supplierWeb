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
                            <span>供应商系统管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/orderList" :route="{path:'/orderList'}">员工管理</el-menu-item>
                            <el-menu-item index="/refundOrderList" :route="{path:'/refundOrderList'}">ETERM配置管理
                            </el-menu-item>
                            <el-menu-item index="/disillusionedOrderList" :route="{path:'/disillusionedOrderList'}">支付签约
                            </el-menu-item>
                            <el-menu-item index="/changeOrderList" :route="{path:'/changeOrderList'}">账户信息
                            </el-menu-item>
                            <el-menu-item index="1-4" :route="{path:'/orderList'}">服务费设置</el-menu-item>
                            <el-menu-item index="1-5" :route="{path:'/orderList'}">工作时间设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">供应商订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/balance">全部订单</el-menu-item>
                            <el-menu-item index="/prepayRecord">退票订单</el-menu-item>
                            <el-menu-item index="/creditSettlement">废票订单</el-menu-item>
                            <el-menu-item index="/creditChange">改期订单</el-menu-item>
                            <el-menu-item index="/creditChange">航变订单</el-menu-item>
                            <el-menu-item index="/creditChange">自动清Q</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                         <template slot="title">
                             <i class="el-icon-setting"></i>
                             <span slot="title">供应商政策管理</span>
                         </template>  
                         <el-menu-item-group>
                            <el-menu-item index="/paySign">政策投放</el-menu-item>
                             <el-menu-item index="/paySign">运价设置</el-menu-item>
                         </el-menu-item-group>     
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/paySign">角色管理</el-menu-item>
                            <el-menu-item index="/paySign">管理员日志管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
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