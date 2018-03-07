<template>
  
     <div class="container">
             <div class="search_div">
                 <div class="confirm_berths">
                         <div class="loader">
                                
                                        <div class="loader-inner ball-clip-rotate-multiple">
                                
                                            <div></div>
                                    
                                            <div></div>
                                
                                        </div>
                                
                         </div>
                         <div class="loadingText">
                                <h4>正在确认舱位，请稍后......</h4>
                         </div>
              
                 </div>

                 <!-- <div class="confirm_berths">
                      <h4>正在确认价格，请稍后......</h4>  
                 </div> -->
                 
             </div>
     </div>

</template>

<style>

    #app{

    width:1140px;
    padding:0 !important;
    margin:0 auto;

    min-height:690px;

}
    .confirm_berths{
        width:100%;
        height:200px;
        padding:100px 0;    
    }
.search_div{
    width:800px;
    height:400px;

    margin:0 auto;

  
}
  h4{
        margin: 0 auto;
        text-align: center;
    }
.loader{
 width:100px;
 height:80px;
 
 position: absolute;
 left:50%;
 margin-left:-50px;

}
.loadingText{
    margin-top:80px;
    padding:40px;
}

.ball-clip-rotate-multiple {
    position: relative; }
    .ball-clip-rotate-multiple > div {
      -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
      position: absolute;
      left: 0px;
      top: 0px;
      border: 2px solid #67c23a;
      border-bottom-color: transparent;
      border-top-color: transparent;
      border-radius: 100%;
      height: 66px;
      width: 66px;
      -webkit-animation: rotate 1s 0s ease-in-out infinite;
              animation: rotate 1s 0s ease-in-out infinite; }
      .ball-clip-rotate-multiple > div:last-child {
        display: inline-block;
        top: 20px;
        left: 20px;
        width: 26px;
        height: 26px;
        -webkit-animation-duration: 0.5s;
                animation-duration: 0.5s;
        border-color: #67c23a transparent #67c23a transparent;
        -webkit-animation-direction: reverse;
                animation-direction: reverse; }
</style>


     
