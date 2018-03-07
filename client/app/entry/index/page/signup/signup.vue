<template>
  <div class="container">
    <section id="signup">
      <article class="signup-form">
        <aside class="form">
          <el-row>
          <el-col :span="6"> &nbsp;</el-col>
            <el-col :span="12" >
              <signupPanel></signupPanel>
            </el-col>
            <el-col :span="6">&nbsp;</el-col>
          </el-row>
          
        </aside>       
      </article>
    </section>
  </div>
</template>

<script>
import signupPanel from "./signupPanel.vue";
export default {
  components: {
    signupPanel
  }
};
</script>

<style>
#signup > article > aside{
  height: 780px;
  margin-top: 50px;
}
</style>
