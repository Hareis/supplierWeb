<template>

    <textarea :placeholder="placeholderStr"
              contentEditable ="true"
              spellcheck="false"
              ref="rtPanle"
              v-model="tempInputText"
              id="rtPanleChange"
              style="  background-color: rgb(0, 0, 0);
                      font-size: 16px;
                      padding:5px 10px;
                      color: rgb(0, 231, 0);
                      overflow-y: scroll;" cols="30" rows="10">

    </textarea>


</template>

<script>
export default {
  props: ["value"],
    data(){
      return {
          tempInputText:'',
          placeholderStr:"请输入类似: \n\r"+
          " 1.ZHANG/SAN MSTR  \n\r" +
          " 2.LI/SI MR \n\r" +
          " 3.WANG/WU MR \n\r" +
          " 4.ZHAO/LIU MS KPWN9X    \n\r" +
          " 5.  NH922  V   SU17DEC  PVGNRT HK4   1015 1400      SEAME  2 1                 \n\r" +
          " 6.  NH075  B   SU17DEC  HNDCTS HK4   1800 1935      SEAME D2 D                 \n\r" +
          " 7.  NH068  B   FR22DEC  CTSHND HK4   1530 1710      SEAME  DD2                 \n\r" +
          " 8.  NH971  V   FR22DEC  HNDPVG HK4   1830 2110      SEAME  I 2                 \n\r" +
          " 9.CKG/T CKG/T 023-63605918/CKG LIAN FENG AIR SERVICE CO.,LTD/LIU BIN ABCDEFG   \n\r" +
          "10.13651757240-SYSTEM                                                           \n\r" +
          "11.021-51069999                                                                 \n\r" +
          "12.95010                                                                        \n\r" +
          "13.TL/1200/16DEC/CKG888                                                         \n\r" +
          "14.SSR ADTK 1E TO NH BY 22NOV 2359 CKG TIME ZONE OTHERWISE WILL BE XLD          \n\r" +
          "15.SSR DOCS NH HK1 P/CN/E45500000/CN/12JAN70/F/21SEP27/ZHANG/SAN/P4         \n\r" +
          "16.SSR DOCS NH HK1 P/CN/E05600000/CN/27SEP04/M/21SEP27/LI/SI/P3            \n\r" +
          "17.SSR DOCS NH HK1 P/CN/E61400000/CN/01MAR72/M/21SEP27/WANG/WU/P2             \n\r" +
          "18.SSR DOCS NH HK1 P/CN/E45500000/CN/27NOV09/M/21SEP27/ZHAO/LIU/P1           \n\r" +
          "19.SSR CHLD NH HK1 27NOV09/P1                                                   \n\r" +
          "20.SSR CTCM NH HK1 13888888888/P1"
      }
    },
  methods: {
    rtPanleChange() {
      this.$nextTick(() => this.$emit("input", this.tempInputText));
    }
  },
  watch: {
    value: function() {
       this.$nextTick(() =>  {
       if(!this.value)
          this.tempInputText='';
       });
    },
      tempInputText(){
          this.$nextTick(() =>this.rtPanleChange())
      }
  },
  mounted(){
    this.$refs["rtPanle"].innerText = this.value;
  }
};
</script>

<style scoped>

</style>
