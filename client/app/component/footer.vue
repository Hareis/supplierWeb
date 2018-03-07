<template>
    <footer>
        <div class="footer">
            <el-row>
                <el-col class="hotline1" :span="1">
                    <i class="iconfont  icon-kefu"></i>
                </el-col>
                <el-col :span="4" class="hotline">

                    <span style="padding:0;">联系客服QQ</span>
                    <span style="padding:0;">
                        <a target="_blank" id="QQTalk"
                           href="tencent://Message/?Uin=3003780770&amp;websiteName=q-zone.qq.com&amp;Menu=yes">3003780770</a>
                    </span>
                </el-col>
                <el-col :span="5" :offset="2">
                    <ul class="footer_ul">
                        <li>服务与支持</li>
                        <li>售前咨询</li>
                        <li>授权服务中心</li>

                    </ul>
                </el-col>
                <el-col :span="5">
                    <ul class="footer_ul">
                        <li>账号与支持</li>
                        <li>登录常见问题</li>
                        <li>充值付款</li>

                    </ul>
                </el-col>
                <el-col :span="5">
                    <ul class="footer_ul">
                        <li>其他</li>
                        <li>定价</li>
                        <li>客户案列</li>

                    </ul>
                </el-col>
            </el-row>

            <el-row class="law_info">
                <el-col :span="6">关于我们</el-col>
                <el-col :span="6">法律声明</el-col>
                <el-col :span="6">廉正举报</el-col>
                <el-col :span="6">友情链接</el-col>
                <el-col :span="24" style="margin-top:10px;">
                    <a href="http://www.miitbeian.gov.cn" target="_blank" id="miit">&copy;uhetrip.com  版权所有ICP证 : 渝ICP备17009232号</a>
                </el-col>
            </el-row>
        </div>

    </footer>

</template>

<script>

    export default {

        data() {
            return {}
        }
    }

</script>

<style scoped="">
    #QQTalk {
        float: right;
        display: block;
        width: 146px;
        height: 24px;
        text-decoration: none;
        color: white;
    }

    footer {
        background: #3F4553;
        width: 100%;
        padding: 20px 0 0 0 !important;
        height: 185px;
        padding-top: 3rem;
        padding-bottom: 3rem;
        clear: both;
    }

    .footer_con {
        height: 120px;
        border-bottom: 1px solid #646464;
    }

    .footer {
        width: 1140px;
        margin: 0 auto;
    }
</style>