<template>
    <div class="container" style="min-height:700px;">

        <el-card class="box-card">
            <div>
                <div>
                    <label>乘机人列表</label><br/>
                    <span>
                        <el-radio-group v-model="tempPsger" @change="psgerChange">
                              <el-radio :label="undefined" style="display: none;">item</el-radio>
                            <el-radio v-for="psger in detalisData1.passengers"
                                      :label="psger.cardNum">{{psger.name}}</el-radio>
                          </el-radio-group>
                    </span>
                </div>
                <div style="float: right;margin-bottom: 10px">
                    <el-button type="primary" :loading="isLoadingToPDF" :disabled="!selectPsger.hasOwnProperty('name')" @click="isLoadingToPDF=true;downloadItemPDF()">
                        下载PDF
                    </el-button>
                    <el-button type="primary" :loading="isLoadingToWord" :disabled="!selectPsger.hasOwnProperty('name')" @click="isLoadingToWord=true;downloadWord()">
                        下载Word
                    </el-button>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" v-if="selectPsger.hasOwnProperty('name')">
            <div slot="header" class="clearfix">
                <span>内容预览</span>
                <el-switch
                        style="float: right; padding: 3px 0"
                        v-model="pageSwitchType"
                        @change="languageTypeChange"
                        active-value="CN"
                        inactive-value="EN"
                        active-text="中文"
                        inactive-text="英文">
                </el-switch>
            </div>
            <div id="ItineraryPanel" style="padding:50px 20px 0 20px;">

                <div style="text-align: center;">
                    <h1 style="font-size:2.5rem">{{pageLanguageType.title}}</h1>
                </div>
                <div class="orderBaseInfo">
                    <div class="orderBaseInfoDiv"
                         :class="{ 'enClass':pageSwitchType === 'EN','cnClass':pageSwitchType === 'CN'}">
                        <span style="width:150px;">{{pageLanguageType.orderBaseInfo.cjr}}</span>
                        <span>{{selectPsger.name.toUpperCase()}}
                            <label v-if="pageSwitchType === 'EN'">  {{selectPsger.gender == 'M' ? 'MR' : 'MRS'}}</label>
                        </span>
                    </div>
                    <div class="orderBaseInfoDiv" style="margin-top:8px;"
                         :class="{ 'enClass':pageSwitchType === 'EN','cnClass':pageSwitchType === 'CN'}">
                        <span style="width:150px;">{{pageLanguageType.orderBaseInfo.yddbm}}</span>
                        <span>{{detalisData1.pnr}}</span>
                    </div>
                    <div class="orderBaseInfoDiv" style="margin-top:8px;"
                         :class="{ 'enClass':pageSwitchType === 'EN','cnClass':pageSwitchType === 'CN'}">
                        <span style="width:150px;">{{pageLanguageType.orderBaseInfo.hsdbm}}</span>
                        <span></span>
                    </div>
                </div>
                <div class="tripDetailTable" style="padding:10px 0">
                    <div class="header">{{pageLanguageType.tripDetail.header}}</div>
                    <table v-for="segment in detalisData1.segments">
                        <tbody>
                        <tr>
                            <td style="width:24%">{{pageLanguageType.tripDetail.rq}}</td>
                            <td style="width:24%">{{segment.depAirport}}</td>
                            <td style="width:24%">{{segment.arrAirport}}</td>
                            <td style="width:24%">{{pageLanguageType.tripDetail.fxsc}}</td>
                        </tr>
                        <tr class="secondTr">
                            <td>
                                {{pageSwitchType === 'EN' ? moment(segment.depDatetime).format('MMM DD') : moment(segment.depDatetime).format('MM月DD日').replace('0', '')}}
                            </td>
                            <td>
                                <span v-if="pageSwitchType === 'EN'">
                                     {{segment.depAirportEN}}
                                </span>
                                <span v-else> {{segment.depAirportCN}}</span>
                               </td>
                            <td>
                                <span v-if="pageSwitchType === 'EN'">
                                    {{segment.arrAirportEN}}
                                </span>
                                <span v-else>{{segment.arrAirportCN}}</span>
                                </td>
                            <td>
                                <div>
                                    <span v-if="pageSwitchType === 'EN'">
                                        {{segment.duration < 1 ? '0min(s)' : ( parseInt(segment.duration / 60) + 'hr(s) ' + (segment.duration % 60) + 'min(s)')}}
                                    </span>
                                    <span v-else>
                                        {{segment.duration < 1 ? '0分' : ( parseInt(segment.duration / 60) + '小时 ' + (segment.duration % 60) + '分')}}
                                    </span>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>{{pageLanguageType.tripDetail.hbh}}</td>
                            <td>{{pageLanguageType.tripDetail.qfsj}}</td>
                            <td>{{pageLanguageType.tripDetail.ddsj}}</td>
                            <td>{{pageLanguageType.tripDetail.jx}}</td>
                        </tr>
                        <tr class="secondTr">
                            <td>{{segment.flightNumber}}</td>
                            <td>{{moment(segment.depDatetime).format('HH:mm')}}</td>
                            <td>{{moment(segment.arrDatetime).format('HH:mm')}}</td>
                            <td>{{segment.aircraftCode}}</td>
                        </tr>
                        <tr class="secondTr">
                            <td></td>
                            <td style="font-size: 1.2rem;">
                                {{pageLanguageType.tripDetail.hzl}}：{{segment.depTerminal.length < 1 ? pageSwitchType === 'EN' ? 'Not Available' : '未知' : segment.depTerminal}}
                            </td>
                            <td style="font-size: 1.2rem;">
                                {{pageLanguageType.tripDetail.hzl}}：{{segment.arrTerminal.length < 1 ? pageSwitchType === 'EN' ? 'Not Available' : '未知' : segment.arrTerminal}}
                            </td>
                            <td style="font-size: 1.2rem;">{{pageLanguageType.tripDetail.jtcs}}：{{segment.stopTime}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="psgDetail">
                    <div class="header">{{pageLanguageType.psgDetail.header}}</div>
                    <table style="padding:20px 20px 20px 20px;">
                        <thead>
                        <tr>
                            <th style="width:15%">{{pageLanguageType.psgDetail.xm}}</th>
                            <th style="width:15%">{{pageLanguageType.psgDetail.cw}}</th>
                            <th style="width:15%">{{pageLanguageType.psgDetail.zjh}}</th>
                            <th style="width:15%">{{pageLanguageType.psgDetail.cdcw}}</th>
                            <th style="width:15%">{{pageLanguageType.psgDetail.zt}}</th>
                            <th style="width:15%">{{pageLanguageType.psgDetail.ph}}</th>
                        </tr>
                        </thead>
                        <tbody style="margin-top:6px;">
                        <tr>
                            <th>{{selectPsger.name}}</th>
                            <th>{{selectPsger.gender == 'M' ? 'MR' : 'MRS'}}</th>
                            <th>{{selectPsger.cardNum}}</th>
                            <th>
                                <span>
                                    <span v-if="pageSwitchType === 'EN'">
                                        <label v-if="detalisData1.segments[0]['cabinGradeCN']=='经济舱'">Economy</label>
                                        <label v-else-if="detalisData1.segments[0]['cabinGradeCN']=='商务舱'">Business</label>
                                        <label v-else-if="detalisData1.segments[0]['cabinGradeCN']=='头等舱'">Firstclass</label>
                                        <label v-else-if="detalisData1.segments[0]['cabinGradeCN']=='高端经济舱'">PREMIUM ECONOMY</label>
                                    </span>
                                    <span v-else>
                                          {{detalisData1.segments[0]['cabinGradeCN']}}
                                    </span>
                                </span>
                                /
                                <span>
                                    {{detalisData1.segments.map(function (e) {
                                    return e.cabin
                                }).join('/')}}
                                </span>
                            </th>
                            <th>{{pageSwitchType === 'EN' ? 'confirmed' : '已确认'}} </th>
                            <th>{{(pageSwitchType.tickets || []).map(function (e) {
                                return e.ticketNo;
                            }).join(',')}}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="contactInfo">
                    <div class="header">{{pageLanguageType.contactDetail.header}}</div>
                    <div class="contactInfoDiv" style="padding:20px 20px 20px 20px">
                        <div>
                            <span>{{pageLanguageType.contactDetail.xm}}</span>
                            <span style="width:600px;">{{detalisData1.contactName}}</span>
                        </div>
                        <div>
                            <span>{{pageLanguageType.contactDetail.dz}}</span>
                            <span style="width:600px;">{{detalisData1.contactAddress}}</span>
                        </div>
                        <div>
                            <span>{{pageLanguageType.contactDetail.lxfs}}</span>
                            <span style="width:600px;">{{detalisData1.contactMobile}}</span>
                        </div>
                        <div>
                            <span>{{pageLanguageType.contactDetail.dzyx}}</span>
                            <span style="width:600px;">{{detalisData1.contactEmail}}</span>
                        </div>
                        <div>
                            <span>{{pageLanguageType.contactDetail.yb}}</span>
                            <span style="width:600px;">{{detalisData1.contactPostcode}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" v-else>
            <div>
                请先选择乘客后进行预览!
            </div>
        </el-card>
    </div>
</template>
<script>
    import requestAPIServiceAsync from "js/api";
    import {getTargetBlobData} from './htmlToBlob';
    import FileSaver  from 'file-saver';

    const CNConfig = {
        title: '电子客票行程单',
        orderBaseInfo: {
            cjr: '乘机人',
            yddbm: '预定编码',
            hsdbm: '航司大编码'
        },
        tripDetail: {
            header: '航班行程',
            rq: '日期',
            fxsc: '飞行时间',
            hbh: '航班号',
            qfsj: '起飞时间',
            ddsj: '到达时间',
            jx: '机型',
            hzl: '航站楼',
            jtcs: '经停次数'
        },
        psgDetail: {
            header: '预定详情',
            xm: '姓名',
            cw: '称谓',
            zjh: '证件号',
            cdcw: '舱等/舱位',
            zt: '状态',
            ph: '票号'
        },
        contactDetail: {
            header: '联系人',
            xm: '姓名',
            dz: '地址',
            lxfs: '联系方式',
            dzyx: '电子邮箱',
            yb: '邮编'
        }

    };
    const ENConfig = {
        title: 'ITINERARY',
        orderBaseInfo: {
            cjr: 'PREPARED FOR',
            yddbm: 'REASERVATION CODE',
            hsdbm: 'AIRLINE RESERVATION CODE'
        },
        tripDetail: {
            header: 'FLIGHT ITINERARY',
            rq: 'Date',
            fxsc: 'Durations',
            hbh: 'Flight No.',
            qfsj: 'Departing At',
            ddsj: 'Arriving At',
            jx: 'Aircraft code',
            hzl: 'Terminal',
            jtcs: 'Stop(s)'
        },
        psgDetail: {
            header: 'BOOKING DETAILS',
            xm: 'Passenger Name',
            cw: 'MR/MRS',
            zjh: 'ID Number',
            cdcw: 'Class',
            zt: 'Status',
            ph: 'Ticket No.'
        },
        contactDetail: {
            header: 'CONTACT DETAILS',
            xm: 'Name',
            dz: 'Address',
            lxfs: 'Telephone',
            dzyx: 'Email',
            yb: 'Postcode'
        }
    };

    export default{
        data(){
            return {
                languageType: true,
                pageSwitchType: 'CN',
                pageLanguageType: CNConfig,
                isLoadingToPDF: false,
                isLoadingToWord: false,
                tempPsger: undefined,
                selectPsger: [],
                detalisData1: {
                    passengers: [],
                    segments: []
                }
            }
        },
        methods: {

            psgerChange(){

                let _self = this;
                _self.selectPsger = {};
                if (this.tempPsger != undefined && this.tempPsger.length > 0) {
                    let result = this.detalisData1.passengers.filter(function (e) {
                        return e.cardNum === _self.tempPsger;
                    });
                    _self.selectPsger = result.length > 0 ? result[0] : {};
                }
            },
            /**
             * 行程单类型切换
             */
            languageTypeChange(e){
                switch (e) {
                    case 'CN':
                        this.pageLanguageType = CNConfig;
                        break;
                    case 'EN':
                        this.pageLanguageType = ENConfig;
                        break;
                    default:
                        this.pageLanguageType = CNConfig;
                        break;
                }
            },
            /**
             * 下载PDF
             */
            async downloadItemPDF(){

                const _self = this;
                const html2canvasUtil = () => import('html2canvas');
                const jsPDFUtil = () => import('jspdf');

                let html2canvas = await  html2canvasUtil();
                let jsPDF = await jsPDFUtil();

                html2canvas(document.getElementById('ItineraryPanel'))
                    .then(function (canvas) {

                        //返回图片URL，参数：图片格式和清晰度(0-1)
                        let pageData = canvas.toDataURL('image/jpeg', 1.0);

                        //方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
                        let pdf = new jsPDF('', 'pt', 'a4');

                        //需要dataUrl格式
                        pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28 / canvas.width * canvas.height);

                        pdf.save(`行程单（${_self.selectPsger.name.replace('/', '.')}）.pdf`);

                        _self.isLoadingToPDF = false;

                    }).catch(function (error) {
                    _self.isLoadingToPDF = false;
                    _self.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                });

            },
            /**
             * 下载word文档
             */
            downloadWord(){
                const _self = this;
                try {
                    const tempBlobData = getTargetBlobData(document.getElementById('ItineraryPanel'));

                    let url = URL.createObjectURL(tempBlobData);
                    let link = document.createElement('A');
                    link.href = url;
                    link.download = `行程单（${_self.selectPsger.name.replace('/', '.')}）.doc`;
                    document.body.appendChild(link);
                    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, `行程单（${_self.selectPsger.name.replace('/', '.')}）.doc`);
                    else link.click();
                    document.body.removeChild(link);

                    _self.isLoadingToWord = false;
                } catch (error) {
                    _self.isLoadingToWord = false;
                    _self.$message.error(error.message || error.errorMsg || error.statusText);
                }

            },
            /**
             * 获取航班详情
             * @returns {Promise.<void>}
             */
            async getOrderDetail(){

                const res = await requestAPIServiceAsync("user/getOrderDetails.do", {orderId: this.$route.query['orderId']});
                if (res.hasOwnProperty('order') && res.order != undefined ) {
                    const item = res.order;
                    if (item.hasOwnProperty('tickets')) {
                        item.passengers.forEach(psger => {
                            item.tickets.forEach(ticketItem => {

                            })

                        })

                    }
                    this.detalisData1 = res.order;
                }
            }
        },
        async created(){
            this.moment = window.moment;
            await this.getOrderDetail()
        }
    }
</script>

<style lang="less" scoped>

    body {
        max-width: 1160px !important;
        margin: 0 auto;
    }

    .container {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 15px;
    }

    #ItineraryPanel {
        background-color: white;

    }

    table {
        border-top: 1px solid #CCC;
        width: 100%;
        text-align: left;
    }

    .header {
        height: 30px;
        color: #2d2f33;
        background: #ccc;
        font-size: 20px;

        line-height: 30px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
    }

    .orderBaseInfo {
        padding-left: 20px;
    }

    .orderBaseInfoDiv span {
        display: inline-block;
        width: 300px;
        text-align: left;
        font-size: 1.1rem;

    }

    .enClass span {
        display: inline-block;
        text-align: left;
        font-size: 1.1rem;
        width: 300px !important;
    }

    .contactInfo span {
        display: inline-block;
        width: 150px;
        text-align: left;
        font-size: 1.1rem;

    }

    .tripDetailTable table {
        padding: 20px 20px 20px 20px;

    }

    .psgDetail thead th {
        font-size: 1.1rem;
        font-weight: normal !important;
    }

    .psgDetail tbody th {
        font-size: 0.8rem;
        font-weight: normal !important;

    }

    .secondTr td {
        padding-left: 10px;
        font-size: 22px;
        font-weight: normal;
    }

</style>