<template>
    <div>
        <el-autocomplete
                ref="autocompleteText"
                class="inline-input"
                popper-class="guoji"
                v-model="state1"
                valueKey="ChName"
                v-bind="_props"
                :fetch-suggestions="querySearch"
                @select="handleSelect">
            <template scope="scope">
                <el-row>
                    <el-col :span="12">{{ scope.item.ChName }}</el-col>
                    <el-col :span="12">{{ scope.item.EnName }}</el-col>
                </el-row>
            </template>
        </el-autocomplete>
    </div>
</template>
<script>
    import countryJson from 'json/country.json';

    export default {

        data() {
            return {
                countryList: [],
                state1: undefined
            }
        },
        props: ['value', 'maxlength', 'size', 'placeholder'],
        methods: {
            querySearch(queryString, cb) {

                let countryList = this.countryList;
                let results = queryString ? countryList.filter(this.createFilter(queryString)) : countryList;
                cb(results);
            },
            createFilter(queryString) {
                
                return (country) => {
                    return (
                        country.ChName.toLowerCase().indexOf(queryString.toLowerCase()) === 0 ||
                        country.EnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0 ||
                        country.PinYin.toLowerCase().replace(/\s+/g, "").indexOf(queryString.toLowerCase().replace(/\s+/g, "")) === 0 ||
                        country.CountryCode.replace(/\s+/g, "").indexOf(queryString.replace(/\s+/g, "")) === 0 ||
                        country.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0 ||
                        country.ThreeCode.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                    );
                };
            },
            handleSelect(item) {
                this.state1 = item.ChName;
                this.currentSelectValue = item.ShortEnName;
                this.$emit("input", this.currentSelectValue);
            }
        },
        watch: {
            value(newValue, oldValue) {
                if ( newValue != undefined && newValue !== this.currentSelectValue)
                    this.$nextTick(() => this.state1 = this.value);
            },
            state1(newValue, oldValue) {
                if (newValue == undefined || newValue.length < 1) {
                    this.$emit("input", '');
                }
            }
        },
        mounted() {
            var _self=this;
            this.countryList = countryJson.CountryInfoList;

            //默认初始值
            if (this.value != undefined && this.value.trim().length > 0) {
                this.$nextTick(() => this.querySearch(this.value, function (res) {
                    if (res.length > 0) {
                        _self.state1 = res[0].ChName
                    }

                }));
            }
        }
    }
</script>
<style>
    .guoji {
        width: 300px !important;
    }
</style>