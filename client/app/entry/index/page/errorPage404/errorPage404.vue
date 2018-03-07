<template>

		<div id="errorPage">
			<el-row style="height:500px;" class="errorPageRow">
				 <el-col :span="10" class="errorImg">
					 	<img src="../../../../img/san.png" alt="errorImg">

			</el-col>

				 <el-col :span="12" class="errorTable">
						<div class="errorTableDiv">
								<div>你的页面离家出走了!</div>
								<div> <a href="#">	返回上页</a></div>
								<div> <a href="#">	返回首页</a></div>
						</div>	
					
				 </el-col>
			</el-row>

		</div>

</template>



<style scoped>
#errorPage {
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: #d2f5f1;
  height: 700px;
}
.errorPageRow {
  height: 500px;
  padding: 100px;
}
.errorImg img {
  margin-left: 100px;
}
.errorImg img:hover {
  transition: rotate 2s;
  transform: rotate(30deg);
}
.errorTableDiv {
  width: 300px;
  height: 143px;
  padding: 20px 30px;
  border: 2px solid rgba(192, 237, 232, 07);
  background: #fff;
  margin-top: 100px;
  border-radius: 10px;
}
.errorTableDiv div:nth-child(1) {
  height: 80px;
  width: 260px;
  margin: 0 auto;
  border-bottom: 1px dashed #d2f5f1;
  line-height: 80px;
  color: #fa5555;
  font-size: 22px;
  font-weight: bolder;
  letter-spacing: 4px;
}
.errorTableDiv div:nth-child(2) {
  width: 100px;
  height: 60px;
  line-height: 60px;
  padding-left: 22px;
  float: left;
}
.errorTableDiv div:nth-child(3) {
  width: 100px;
  height: 60px;
  line-height: 60px;
  float: right;
}
.errorTableDiv div:nth-child(2) a,
.errorTableDiv div:nth-child(3) a {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: cornflowerblue;
  cursor: pointer;
  text-decoration: none;
}
</style>
