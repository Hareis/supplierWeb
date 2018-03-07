<template>
 <div>
     <div class="flightResults one_way">
    <el-row class="flightDetails_row">
       <el-col :span="1">
          <span class="trip">去程</span>
       </el-col>

       <el-col :span="3">
          <span>马来西亚航空</span>
          <span>MH623</span>
       </el-col>

       <el-col :span="2">
          <span>A330</span>
       </el-col>

       <el-col :span="2">
          <span>N舱</span>
       </el-col>

       <el-col :span="2">
          <span>12月29日</span>
          <br>
          <span>12月29日</span>
       </el-col>

       <el-col :span="2">
          <span>01:30</span>
          <br>
          <span>08:01</span>
       </el-col>

       <el-col :span="2">
          <span>PEK</span>
          <br>
          <span>KUL</span>
       </el-col>

       <el-col :span="2">
          <span>北京</span>
          <br>
          <span>吉隆坡</span>

       </el-col>

       <el-col :span="4">
          <span>首都国际机场</span>
          <br>
          <span>吉隆坡国际机场</span>
       </el-col>

       <el-col :span="2">
          <span>6h30m</span>
       </el-col>
    </el-row>
    <el-row>
              <el-col :span="8" :offset="8">
          <span class="turn_info">中转（吉隆坡机场）中转时间 3h50m</span>
       </el-col>
    </el-row>
    <el-row class="flightDetails_row">
       <el-col :span="1">
          <span class="trip">去程</span>
       </el-col>

       <el-col :span="3">
          <span>马来西亚航空</span>
          <span>MH361</span>
       </el-col>

       <el-col :span="2">
          <span>737</span>
       </el-col>

       <el-col :span="2">
          <span>L舱</span>
       </el-col>

       <el-col :span="2">
          <span>12月29日</span>
          <br>
          <span>12月29日</span>
       </el-col>

       <el-col :span="2">
          <span>11:50</span>
          <br>
          <span>12:55</span>
       </el-col>

       <el-col :span="2">
          <span>KUL</span>
          <br>
          <span>SIN</span>
       </el-col>

       <el-col :span="2">
          <span>吉隆坡</span>
          <br>
          <span>新加坡</span>

       </el-col>

       <el-col :span="4">
          <span>首都国际机场</span>
          <br>
          <span>樟宜机场</span>
       </el-col>

       <el-col :span="2">
          <span>1h5m</span>
       </el-col>
    </el-row>

    <div class="line_div"></div>
 </div>
 <div class="flightResults return_way">
    <el-row class="flightDetails_row">
       <el-col :span="1">
          <span class="trip">返程</span>
       </el-col>

       <el-col :span="3">
          <span>马来西亚航空</span>
          <span>MH624</span>
       </el-col>

       <el-col :span="2">
          <span>738</span>
       </el-col>

       <el-col :span="2">
          <span>L舱</span>
       </el-col>

       <el-col :span="2">
          <span>01月07日</span>
          <br>
          <span>01月07日</span>
       </el-col>

       <el-col :span="2">
          <span>15:20</span>
          <br>
          <span>16:21</span>
       </el-col>

       <el-col :span="2">
          <span>SIN</span>
          <br>
          <span>KUL</span>
       </el-col>

       <el-col :span="2">
          <span>新加坡</span>
          <br>
          <span>吉隆坡</span>
       </el-col>

       <el-col :span="4">
          <span>樟宜机场</span>
          <br>
          <span>吉隆坡国际机场</span>
       </el-col>

       <el-col :span="2">
          <span>1h08m</span>
       </el-col>
    </el-row>
    <!-- 转机 -->

    <el-row>
           <el-col :span="8" :offset="8">
          <span class="turn_info">中转（吉隆坡机场）中转时间 1h55m</span>
       </el-col>
    </el-row>


    <el-row class="flightDetails_row">
       <el-col :span="1">
          <span  class="trip">返程</span>
       </el-col>

       <el-col :span="3">
          <span>马来西亚航空</span>
          <span>MH624</span>
       </el-col>

       <el-col :span="2">
          <span>A330</span>
       </el-col>

       <el-col :span="2">
          <span>N舱</span>
       </el-col>

       <el-col :span="2">
          <span>01月07日</span>
          <br>
          <span>01月08日</span>
       </el-col>

       <el-col :span="2">
          <span>18:20</span>
          <br>
          <span>00:20</span>
       </el-col>

       <el-col :span="2">
          <span>KUL</span>
          <br>
          <span>PEK</span>
       </el-col>

       <el-col :span="2">
          <span>吉隆坡</span>
          <br>
          <span>北京</span>
       </el-col>

       <el-col :span="4">
          <span>吉隆坡国际机场</span>
          <br>
          <span>首都国际机场</span>
       </el-col>

       <el-col :span="2">
          <span>6h38m</span>
       </el-col>
    </el-row>
</div>
 </div>
</template>

<script>
export default {};
</script>

<style>

</style>
