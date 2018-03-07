<template>
    <div>

        <el-row>
            <el-col>
                
            <div class="grid-content bg-purple request">
                <span> <input type="radio"  value="0" v-model="refundTicket.isVoluntarily" @change="isVoluntarilyChange"> 自愿</span>
                <span> <input type="radio" value="1" v-model="refundTicket.isVoluntarily" @change="isVoluntarilyChange"> 非自愿</span>
                <el-select size="small" v-model="refundTicket.Involuntary" v-show="isShow">
                    <el-option label="非自愿" :value="1"></el-option>
                    <el-option label="不自愿" :value="2"></el-option>
                    <el-option label="其他" :value="3"></el-option>
                </el-select>
            </div>
            </el-col>
            <el-col>
                
            <div class="grid-content bg-purple request">
                <span style="vertical-align:top;">备注</span>
                <el-input type="textarea" v-model="refundTicket.remarks"></el-input>
            </div>
            </el-col>
            <el-col v-show="isShow">
                
            <div class="grid-content bg-purple request">
                <span style="vertical-align:top;">非自愿证明</span>
                <el-input type="textarea" v-model="refundTicket.involuntaryProof" ></el-input>
            </div>

            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    data() {
      return {
        refundTicket:{
                isVoluntarily :0,
                Involuntary :"XXX",
                remarks :"XXX",
                involuntaryProof :"XXX"
            },
            isShow:false
      }
    },
    methods:{
        isVoluntarilyChange:function(){

            if(this.refundTicket.isVoluntarily==1){
                this.isShow=true;
            }
            else{
                this.isShow=false;
            }

        }
    }
  }
</script>
