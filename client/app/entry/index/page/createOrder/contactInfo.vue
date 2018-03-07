<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules"  :inline="true" label-width="80px">
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contactNumber">
        <el-input v-model="form.contactNumber"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.contactEmail"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
props:{
  value:{
    type: Object,
    required: true
  }
},
data(){
  return{
    form:{
      contactName:undefined,
      contactNumber:undefined,
      contactEmail:undefined
    },
    rules:{
      contactName:[
          { required: true, message: '请输入联系人', trigger: 'blur' }
      ],
      contactNumber:[
         { required: true, message: '请输入联系方式', trigger: 'blur' }
      ]
    }
  }
},
watch:{
  form:{
    handle(newValue,oldValue){
      this.$nextTick(function(){
        this.$refs["form"].validate((res)=>{
          if(res){
            this.$emit("input",this.form);
          }
        });
      })
    },
    deep:true
  }
}
}
</script>

<style scoped="">
.el-input{
  width: 200px;
}
</style>
