<template>
    <el-container >
        <el-header id="header">
            <myHeader></myHeader>
        </el-header>
        <el-container>
            <el-main>
                <el-row type="flex" justify="center">
                    <leftMenu></leftMenu>
                    <el-col :span="14" style="margin-left: 10px">

                        <transition name="el-fade-in">
                            <router-view></router-view>

                        </transition>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-footer id="footer">
            <myFooter></myFooter>
        </el-footer>
    </el-container>
</template>
<script>
    import myFooter from 'component/footer.vue'
    import myHeader from 'component/myHeader.vue'
    import leftMenu from 'component/menu'

    export default{
        name: 'app',
        components: {
            myFooter,
            myHeader,
            leftMenu
        }
    }
</script>
<style scoped>
    #header {
        background: #b90040;
    }
    #footer {
        background: #3F4553;
        width: 100%;
        padding: 20px 0 0 0 !important;
        height: 185px;
        padding-top: 3rem;
        padding-bottom: 3rem;
        clear: both;
    }
</style>