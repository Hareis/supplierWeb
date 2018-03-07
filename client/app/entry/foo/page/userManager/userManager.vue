<template>
    <div>
        <div>
            <header>
                <h3>员工管理</h3>
            </header>
        </div>
        <div>
            <el-card>
                <el-tabs v-model="editableTabsValue" @tab-click="handleClick">
                    <el-tab-pane
                            :key="item.name"
                            v-for="(item, index) in editableTabs"
                            :label="item.title"
                            :name="item.name"
                    >

                        <component v-if="editableTabsValue==item.name"
                                   :is="currentView"
                                   :userType="item.userType"></component>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
        <div></div>
    </div>
</template>
<script>
    import userTable from  './userTable';
    export default {
        components: {
            userTable
        },
        data() {
            return {
                currentView: 'userTable',
                editableTabsValue: '1',
                editableTabs: [{
                    title: '全部',
                    name: '1',
                    content: 'Tab 1 content',
                    userType: 1
                }, {
                    title: '出票员',
                    name: '2',
                    content: 'Tab 2 content',
                    userType: 2
                }, {
                    title: '政策管理员',
                    name: '3',
                    content: 'Tab 3 content',
                    userType: 3
                }],
                tabIndex: 2
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
<style>

</style>