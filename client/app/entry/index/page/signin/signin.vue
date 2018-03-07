<template>
    <div id="signin">
        <section id="login">
            <article class="login-form">
                <aside class="form" id="loginAside">
                    <loginPanel @onSubmit="loginSubmit" :refreshCode="refreshNum"></loginPanel>
                </aside>
            </article>
        </section>
    </div>
</template>

<script>

    import loginPanel from "./signinPanel.vue";
    import requestAPIServiceAsync from "js/api";

    export default {
        data() {
            return {
                refreshNum: 1
            };
        },
        methods: {
            /**
             * 登录事件
             * */
            async loginSubmit(req) {

                try {

                    const res = await requestAPIServiceAsync("author/login.do", {
                        userName: req.userName,
                        password: req.userPassword,
                        securityCode: req.validateCode
                    });

                    this.$message({
                        
                        message: '登录成功',
                        type: 'success',
                        duration:1000

                    });

                    if (app1.$route.query && app1.$route.query.ref) {
                        this.$router.push({name: app1.$route.query.ref, replace: true});
                    }
                    else
                        this.$router.replace({name: "root"});

                } catch (error) {

                    switch (error.status) {
                        case 1:
                            this.$message.error(error.errorMsg || error.statusText);
                            break;
                        case  2:
                            this.$message({
                                message: error.errorMsg || error,
                                type: 'warning'
                            });
                            break;
                        default:
                            this.$message.error(error.errorMsg || error.statusText);
                            break;
                    }

                    this.refreshNum = Math.random();
                }
            }
        },
        components: {
            loginPanel
        }
    };
</script>

<style scoped>

    @media screen and (max-width: 1440px) {
        #signin {
            height: 540px !important;
        }

        #loginAside {
            margin-top: 88px !important;
        }
    }

    secton#login {
        height: 744px;
        padding-top: 70px;
    }

    #loginAside {
        margin-top: 128px;
    }

    #signin {
        background-image: url(../../../../img/feiji.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        height: 710px;
    }

    /* body{
      padding-left:300px;
    } */
    section#login article.login-form {
        width: 950px;
        margin: 0 auto;
    }

    section#login aside.form {
        float: right;
        width: 420px;
        box-shadow: 0px 5px 12px #ccc;
    }
</style>