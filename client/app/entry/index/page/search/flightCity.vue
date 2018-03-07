<template>
    <div>

        <el-autocomplete popper-class="my-autocomplete city_three_code" size="small"

        v-model="words" ref="words" 
        :fetch-suggestions="remoteMethod"
        valueKey="label"
        label="value"
        :trigger-on-focus="false"
         placeholder="请输入内容" @select="handleSelect">
            <template slot-scope="props">
            <div v-if="props.item.data[7].length<1">
                <span>
                    <span class="left-ico">
                        <i v-if="props.item.data[6]=='city'" class="city-svg"></i>
                        <i v-else-if="props.item.data[6]=='country'" class="country-svg"></i>
                        <i v-else class="flight-svg"></i>
                    </span>
                    <span class="right-content">
                        <span style="font-size:1rem">
                            <b>{{props.item.data[1]}}</b>
                        </span>
                        <span>
                            <label>( {{props.item.data[9].length > 0 ? props.item.data[9] : 'Any'}} )</label>
                        </span>
                        <br/>
                        <span style="font-size: 12px; background-color: rgb(218,218,218); border-radius: 3px;">{{props.item.data[5]}}</span>
                    </span>
                </span>
            </div>

            </template>
        </el-autocomplete>
    </div>
</template>

<script>
import APIService  from "js/api";
export default {
  props: ["value", "placeholder"],
  data() {
    return {
      loading: false,
      words: undefined
    };
  },
  methods: {
    remoteMethod(query, cb) {
      
      var _self = this;
      if (
        query != undefined &&
        query != "" &&
        encodeURI(query.toString().trim()).length > 1
      ) {
        _self.loading = true;
        APIService.searchAirCode(query).then(
          function(res) {
            _self.loading = false;
            var res1 = res.map(function(item) {
              return {
                data: item,
                label: item[1] + "( " + item[9] + " )",
                value: item[9]
              };
            });

            cb(res1);
          },
          function(err) {
            console.log(err);
          }
        );
      }
    },
    handleSelect(item) {
        var res=Object.assign({},item);
        delete res["data"];
      this.$nextTick(() => this.$emit("input", res));
    }
  },
  watch: {
    value() {
      this.$nextTick(() => (this.words = this.value.label));
    }
  }
};
</script>

<style scoped lang="less">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }

  }
}
</style>