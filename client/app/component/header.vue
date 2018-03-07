<template>
    <div>
        <el-row style="background: #b90040;">
            <el-col :span="16" :offset="4" style="min-width: 960px;max-width: 1140px;padding: 0;">
                <el-row>
                    <el-col :span="5">
                        <el-menu class="el-menu-demo"
                                 style="border-bottom: 0;"
                                 default-active="1"
                                 text-color="#fff"
                                 background-color="#b90040"
                                 @select="handleSelect"
                                 mode="horizontal">
                            <el-menu-item index="/" :disabled="true" id="UhetripLogo">Uhetrip</el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="19" v-if="hasLogin">
                        <el-menu :default-active="activeIndex"
                                 style="border-bottom: 0;"
                                 background-color="#b90040"
                                 text-color="#ffd04b"
                                 active-text-color="#fff"
                                 class="el-menu-demo"
                                 mode="horizontal"
                                 @select="handleSelect">
                            <el-menu-item index="/search">航班预定</el-menu-item>
                            <el-menu-item index="/createOrderByRTPNR">PNR导入</el-menu-item>
                            <el-menu-item index="/orderList">管理中心</el-menu-item>


                            <el-submenu index="4" style="float: right">
                                <template slot="title">我的工作台</template>
                                <!--<el-menu-item index="4-1">修改密码</el-menu-item>-->
                                <el-menu-item index="4-2">退出登录</el-menu-item>
                            </el-submenu>
                            <div style="float: right">
                                <a href="tencent://Message/?Uin=3003780770&amp;websiteName=q-zone.qq.com&amp;Menu=yes"
                                   id="QQTalk">
                                    <img border="0" src="../img/btn_wpa_qq.png"
                                         style=" margin-top: 17px;    border-radius: 2px;" alt="点击这里给我发消息"
                                         title="点击这里给我发消息"/>
                                </a>
                            </div>

                        </el-menu>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>


<script>
    $(document).ready(function () {
        $("#UhetripLogo").click(function (event) {
            event.preventDefault();
        });
    });


    import requestAPIServiceAsync from "js/api";


    export default {
        data() {
            return {
                env: window.webpack_env,
                activeIndex: '',
                hasLogin: false
            };
        },
        methods: {

            async userHasLogin() {

                try {

                    const res = await
                        requestAPIServiceAsync("/comm/now.do", {}, true);
                    return res.success;

                } catch (error) {
                    console.error(error);
                    return false;
                }

            },
            handleSelect(key) {
                //debugger
                let url = '';
                switch (key) {
                    case "/search":
                        url = '/search';
                        break;
                    case "/createOrderByRTPNR":
                        url = '/createOrderByRTPNR';
                        break;
                    case "/orderList":
                        url = '/orderList';
                        break;
                    case "4-2":
                        this.logout('/signin');
                        return false;
                    default:
                        url = '/orderList';
                        break;
                }
                if (url.length > 0)
                    this.handleClick(url);
            }
            ,
            handleClick(url) {
                try {
                    window.app1.$router.push({path: url});
                } catch (error) {
                    window.app1.$message('跳转出错,请刷新页面后重试');
                }
            },
            async logout(url) {
                try {
                    const res = await
                        requestAPIServiceAsync("author/logout.do", {});
                    window.app1.hasLogin = false;
                    if (res.success) {
                        window.app1.$router.replace({path: url});
                    }
                    else {
                        window.app1.$message('退出失败:' + res.errorMsg);
                    }
                } catch (error) {
                    window.app1.$message('退出失败');
                }
            }
        },
        async created() {

            const _self = this;
            const tempRes = await  this.userHasLogin();
            if (tempRes) {
                this.hasLogin = true;
            }
            window.app1.$watch('hasLogin', function (newVal) {

                _self.hasLogin = newVal;
            });
            window.app1.$watch('$route', function (newVal) {
                switch (window.location.pathname) {
                    case '/search':
                        _self.activeIndex = '/search';
                        break;
                    case '/createOrderByRTPNR':
                        _self.activeIndex = '/createOrderByRTPNR';
                        break;
                    default:
                        _self.activeIndex = '/orderList';
                        break;
                }
            });


        },
    }
</script>

<style scoped>
    #QQTalk {
        float: right;
        height: 60px;
        line-height: 60px;
        vertical-align: middle;
        display: table-cell;
        color: rgb(255, 208, 75);
        text-decoration: none;
    }

    li.el-menu-item.is-active {
        background-color: #760A0F;
        border-bottom-color: #760A0F;
        color: #fff;
    }

    #UhetripLogo:hover {
        background: rgb(185, 0, 64) !important;
    }

    #UhetripLogo.is-active {
        background: rgb(185, 0, 64) !important;
        border: none;
    }
</style>