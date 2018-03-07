<template>
    <div class="container">
        <el-card class="box-card" id="pnr_box-card">
            <div slot="header" class="clearfix">
                <span><b>请输入完整的RT信息</b></span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div>
                <rtInfoPanel id="rtInfoPanle" v-model="rtInfoChange"></rtInfoPanel>


                <div style="width: 100%; margin-left: 148px; margin-top: 10px;">
                    <el-checkbox v-model="isNicePrice">优选报价客规条件筛选</el-checkbox>

                    <el-checkbox v-model="hasBaggage" v-if="isNicePrice">含免费行李额</el-checkbox>
                    <el-checkbox v-model="allowRefund" v-if="isNicePrice">允许退票</el-checkbox>
                    <el-checkbox v-model="allowChange" v-if="isNicePrice">允许改期</el-checkbox>

                </div>

            </div>

            <div class="submitDiv" style="clear:both">
                <el-button type="primary" :disabled="rtInfoChange.trim().length<1" @click="submit()"
                           v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="您的订单正在生成中，请稍等…">提交
                </el-button>
                <el-button type="info" @click="rtInfoChangeBtn">清空</el-button>
            </div>

        </el-card>
        <el-card class="box-card">
            <ul class="PnrTip">
                <li>1、此板块请粘贴使用Eterm系统提取的PNR信息，请确保Docs项完整。</li>
                <li>2、请确保PNR信息完整，包括航班信息，旅客信息，并确保OSI项备注有手机号码。</li>
                <li>3、请确保PNR中所含的航段是通过正常途径获得，因不正当手段获取低舱位导致产生的ADM单，将由采购商承担。</li>
                <li>4、请确保旅客信息为成人，或成人+儿童，平台暂不受理无成人陪伴儿童票及婴儿票。</li>
                <li>5、请确保此PNR为单程或往返航段，多段导入将于稍后上线，尽请关注。</li>
                <li>6、系统将根据导入的PNR提供优选报价，在选择时请注意优选报价的舱位及航司客规条件</li>
            </ul>
        </el-card>
        <el-dialog :visible.sync="dialogFormVisible" title="生单信息" size="large" id="orderDetailsShow"
                   :before-close="handleClose">
            <el-dialog
					width="50%"
					title="退改 政策"
					:visible.sync="refundChangePolicyDate"
					append-to-body>
                    等待接口
            </el-dialog>       
            <el-row>
                <el-col :span="10" class="sameCabinLowestPrice">
                    <div>指定舱位</div>
                    <div style="width:280px;">
                        <span v-if="routings[0].routing.cabinG=='F'">头等舱： </span>
                        <span v-if="routings[0].routing.cabinG=='C'">公务舱： </span>
                        <span v-if="routings[0].routing.cabinG=='S'">高端经济舱： </span>
                        <span v-if="routings[0].routing.cabinG=='Y'">经济舱： </span>
                        <span v-if="routings[0].routing.cabins!=undefined">{{routings[0].routing.cabins}}</span></div>


                </el-col>

                <el-col :span="10" :offset="3" class="sameCabinLowestPrice">
                    <div>优选舱位</div>
                    <div style="width:280px;" v-if="routings[1].routing.adultPrice!=null">
                        <span v-if="routings[1].routing.cabinG=='F'">头等舱： </span>
                        <span v-if="routings[1].routing.cabinG=='C'">公务舱： </span>
                        <span v-if="routings[1].routing.cabinG=='S'">高端经济舱： </span>
                        <span v-if="routings[1].routing.cabinG=='Y'">经济舱： </span>
                        <span v-if="routings[1].routing.cabins!=undefined">{{routings[1].routing.cabins}}</span></div>

                </el-col>
                <el-col :span="10" class="sameCabin choseNow">
                    <a @click="chosesameCabin" v-if="routings[0].routing.adultPrice!=null">
                        <div class="ticket_div">
                            <span>100%出票</span>
                        </div>

                        <div class="price_div">
                            <span>票价：{{routings[0].routing.adultPrice}}</span>
                            <span>税费：{{routings[0].routing.adultTax}}</span>
                        </div>
                        <div class="totalPrice_div">
                            <span>总价：{{(routings[0].routing.adultPrice) + (routings[0].routing.adultTax)}}</span>
                        </div>
                    </a>
                    <span class="sameCabinNull" v-else> 指定舱位已售完，可查看优选舱位报价。</span>
                </el-col>

                <el-col :span="10" :offset="3" class="lowestPrice">
                    <a @click="choselowestPrice" v-if="routings[1].routing.adultPrice!=null">
                        <div class="ticket_div">
                            <span>100%出票</span>
                        </div>
                        <div class="price_div">
                            <span>票价：{{routings[1].routing.adultPrice}}</span>
                            <span>税费：{{routings[1].routing.adultTax}}</span>
                        </div>
                        <div class="totalPrice_div">
                            <span>总价：{{(routings[1].routing.adultPrice) + (routings[1].routing.adultTax)}}</span>
                        </div>
                    </a>
                    <span class="sameCabinNull" v-else>当前行程已无更优价格</span>
                </el-col>
            </el-row>

            <el-form ref="form" :model="detalisData1" label-width="80px">
                <!--航班信息-->
                <el-card class="box-card">
                    <header>航班信息</header>
                    <div class="range_info">
                        <el-table ref="multipleTable"
                                  :data="detalisData1.segments"
                                  tooltip-effect="dark"
                                  style="width: 100%">
                            <el-table-column label="航司" width="60px">
                                <template scope="scope">
                                    <span>{{ scope.row.carrier }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="航班号">
                                <template scope="scope">
                                    <span>{{ scope.row.flightNumber }}</span>

                                </template>
                            </el-table-column>

                            <el-table-column label="出发机场">
                                <template scope="scope">
                                    <span>{{ scope.row.depAirport }}{{scope.row.depAirportCN}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达机场">
                                <template scope="scope">
                                    <span>{{ scope.row.arrAirport }}{{scope.row.arrAirportCN}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="起飞时间" width="180px">
                                <template scope="scope">
                                    <span>{{scope.row.depDatetime }}</span>
                                </template>
                            </el-table-column>


                            <el-table-column label="到达时间" width="180px">
                                <template scope="scope">
                                    <span>{{ scope.row.arrDatetime }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="飞行时长(min)" width="110px;">
                                <template scope="scope">
                                    <span>{{ scope.row.duration }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="舱等/舱位" width="100px">
                                <template scope="scope">
                                    <span>{{scope.row.cabinGradeCN}}/{{scope.row.cabin}}</span>
                                </template>
                            </el-table-column>


                        </el-table>
                    </div>
                </el-card>
                <!-- 乘客信息 -->
                <el-card class="box-card">
                    <header>乘客信息</header>

                    <div class="passenger_info">

                        <el-table ref="multipleTable" class="passengersCell"
                                  :data="passengers"
                                  tooltip-effect="dark"
                        >
                            <el-table-column label="姓名" width="190px">

                                <template scope="scope">
                                    <el-input v-model="scope.row.name" :minlength="3" :maxlength="27" size="small"
                                              id="booking_upper1" :disabled='detailHasChoose==false'
                                              @change="(scope.row.name) = (scope.row.name).toUpperCase()"


                                              placeholder="姓名拼音用/分割"></el-input>

                                </template>
                            </el-table-column>
                            <el-table-column label="乘客类型" width="90px">
                                <template scope="scope">

                                    <el-select v-model="scope.row.ageType" placeholder="" size="small"
                                               @change="changeAgeType(scope.row)" :disabled='detailHasChoose==false'>
                                        <el-option label="成人" :value="0"></el-option>
                                        <el-option label="儿童" :value="1"></el-option>
                                    </el-select>

                                </template>
                            </el-table-column>
                            <el-table-column label="性别" width="70px">
                                <template scope="scope">
                                    <el-select size="small" v-model="scope.row.gender" placeholder=""
                                               :disabled='detailHasChoose==false'>
                                        <el-option label="男" value="M"></el-option>
                                        <el-option label="女" value="F"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="出生日期" width="120px">
                                <template scope="scope">
                                    <el-date-picker id="pnrBirthday" size="small"
                                                    @change="checkBirthValidate(scope.row)"
                                                    :disabled='detailHasChoose==false'
                                                    class="pnrBirthday"
                                                    v-model="scope.row.birthday"
                                                    type="date"
                                                    value-format="yyyy-MM-dd"
                                                    placeholder="">
                                    </el-date-picker>


                                </template>
                            </el-table-column>
                            <el-table-column label="国籍" width="105px">
                                <template scope="scope">
                                    <country size="small" :maxlength="2" id="booking_upper2"
                                             :disabled='detailHasChoose==false'
                                             v-model="scope.row.nationality"></country>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型" width="125px">
                                <template scope="scope">
                                    <el-select size="small" v-model="scope.row.cardType" @change="cardTypeChange"
                                               placeholder="" :disabled='detailHasChoose==false'>
                                        <el-option v-for="(item,index) in cardTypes" :label="item.label"
                                                   :value="item.value" :key="index"></el-option>
                                    </el-select>

                                </template>
                            </el-table-column>
                            <el-table-column label="证件号" width="150px;">
                                <template scope="scope">

                                    <el-input v-model="scope.row.cardNum" size="small" :maxlength="19"
                                              :disabled='detailHasChoose==false'
                                              @change="(scope.row.cardNum)=(scope.row.cardNum).toUpperCase()"
                                              id="booking_upper4" placeholder=""></el-input>

                                </template>
                            </el-table-column>
                            <el-table-column label="证件签发地" width="105px">
                                <template scope="scope">
                                    <country size="small" :maxlength="2" id="booking_upper2"
                                             :disabled='detailHasChoose==false'
                                             v-model="scope.row.cardIssuePlace"></country>

                                </template>
                            </el-table-column>
                            <el-table-column label="证件有效期" width="120px">
                                <template scope="scope">

                                    <el-date-picker size="small" :disabled='detailHasChoose==false'
                                                    class="pnrBirthday"
                                                    @change="checkCardExpireValidate(scope.row)"
                                                    v-model="scope.row.cardExpired"
                                                    type="date"
                                                    value-format="yyyy-MM-dd"
                                                    placeholder="">

                                    </el-date-picker>
                                </template>
                            </el-table-column>
                        </el-table>

                    </div>
                </el-card>
                <!-- 联系人信息 -->
                <el-card class="box-card">
                    <header>订单信息</header>


                    <div class="order_search">
                        <el-row>
                            <el-col :span="8">
                                <span><label class="Required-icon">*</label>联系人:</span>
                                <el-input size="small" v-model="contact.name"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span><label class="Required-icon">*</label>联系方式:</span>
                                <el-input size="small" v-model="contact.mobile"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span><label class="Required-icon">*</label>邮箱:</span>
                                <el-input size="small" v-model="contact.email"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>地址:</span>
                                <el-input size="small" v-model="contact.address"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮编:</span>
                                <el-input size="small" v-model="contact.postcode"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <!--价格信息-->


                <el-card class="box-card" id="orderDetailsPrice">
                    <header>价格信息</header>
                    <el-row>
                        <el-col :span="4">
                            <span>乘客类型</span>
                        </el-col>
                        <el-col :span="4">


                            <span>人数(位)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>票面价(&yen;)</span>

                        </el-col>
                        <el-col :span="4">
                            <span>税费(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>返佣(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>单人结算价(&yen;)</span>
                        </el-col>
                    </el-row>

                    <el-row v-if="adultCount > 0">
                        <el-col :span="4">
                            <span>成人</span>
                        </el-col>

                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{adultCount}}</span>
                            <span v-else>-</span>
                        </el-col>

                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{detalisData1.adultPrice}}</span>


                            <span v-else>-</span>

                        </el-col>

                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{detalisData1.adultTax}}</span>
                            <span v-else>-</span>
                        </el-col>

                        <el-col :span="4">
                            <span>0</span>
                        </el-col>

                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{(detalisData1.adultPrice + detalisData1.adultTax)}}</span>
                            <span v-else>-</span>
                        </el-col>
                    </el-row>

                    <el-row v-if="childCount > '0'">
                        <el-col :span="4">
                            <span>儿童</span>
                        </el-col>
                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{childCount}}</span>
                            <span v-else>-</span>
                        </el-col>
                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{detalisData1.childPrice}}</span>
                            <span v-else>-</span>

                        </el-col>
                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{detalisData1.childTax}}</span>
                            <span v-else>-</span>
                        </el-col>
                        <el-col :span="4">
                            <span>0</span>
                        </el-col>
                        <el-col :span="4">
                            <span v-if="detailHasChoose">{{(detalisData1.childPrice + detalisData1.childTax)}}</span>
                            <span v-else>-</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col>
                            <div style="float:right;margin-right:50px;">
                                机票价格： <label v-if="detailHasChoose"
                                             style="font-size:30px;color:#ff8247">&yen;{{detalisData1.otaOrderPrice}}</label>
                                <label v-else>-</label>
                            </div>
                        </el-col>
                    </el-row>
                    <el-card class="box-card">
                        <header>客规</header>
                        <div class="rule_info" style="position:relative">

                            <el-form label-position="left" class="demo-table-expand">
                                <el-form-item label="退票规定:">
                                    <span>{{rule.refundCn}}</span>
                                </el-form-item>
                                <el-form-item label="改期规定:">
                                    <span>{{rule.changeCn}}</span>
                                </el-form-item>
                                <el-form-item label="行李额规定:">
                                    <span>{{rule.baggageCn}}</span>
                                </el-form-item>
                                <el-form-item label="票本说明:">
                                    <span>境外电子行程单</span>
                                </el-form-item>
                                <el-form-item label="其他说明:">
                                    <span>无</span>
                                </el-form-item>
                            </el-form>
                            <el-button class="policyBtn" @click="refundChangePolicy">退改政策</el-button>
                        </div>
                    </el-card>

                </el-card>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmCreateOrder()" :disabled='detailHasChoose==false'>确定下单
                </el-button>
                <el-button @click="dialogFormVisible = false" style="margin-right:5px;">关闭</el-button>

            </div>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="prepareToPay" size="large" id="orderDetailsShow">
            <el-dialog
					width="50%"
					title="退改 政策"
					:visible.sync="refundChangePolicyDate"
					append-to-body>
                    等待接口
            </el-dialog>
            <el-form ref="form" :data="detalisData1" label-width="80px">

                <el-card class="box-card" id="orderDetailsPrice">
                    <header>价格信息</header>
                    <el-row style="margin-left:63px;">
                        <el-col :span="4">
                            <span>乘客类型</span>
                        </el-col>
                        <el-col :span="4">
                            <span>人数(人)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>票面价(&yen;)</span>

                        </el-col>
                        <el-col :span="4">
                            <span>税费(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>返佣(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>单人结算价(&yen;)</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-left:63px;" v-if="adultCount > 0">
                        <el-col :span="4">
                            <b><span>成人</span></b>
                        </el-col>
                        <el-col :span="4">
                            <span>{{adultCount}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.adultPrice}}</span>

                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.adultTax}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>0</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{(detalisData1.adultPrice + detalisData1.adultTax) * (adultCount)}}</span>
                        </el-col>
                    </el-row>

                    <el-row v-if="childCount > '0'">
                        <el-col :span="4">
                            <span>儿童</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{childCount}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.childPrice}}</span>

                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.childTax}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>0</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{(detalisData1.childPrice + detalisData1.childTax) * (childCount)}}</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col>
                            <div style="float:right;margin-right:50px;">
                                机票价格： <label
                                    style="font-size:30px;color:#ff8247">&yen;{{(detalisData1.adultPrice +
                            detalisData1.adultTax) * adultCount + (detalisData1.childPrice + detalisData1.childTax)
                            * childCount}}</label>
                            </div>
                        </el-col>
                    </el-row>

                </el-card>

                <el-card class="box-card">
                    <header>航班信息</header>
                    <div class="range_info">

                        <el-table ref="multipleTable"
                                  :data="detalisData1.segments"
                                  tooltip-effect="dark"
                                  style="width: 100%">
                            <el-table-column label="航班号">
                                <template scope="scope">
                                    <span>{{ scope.row.flightNumber }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="舱等/舱位">
                                <template scope="scope">
                                    <span>{{scope.row.cabinGrade}}/{{ scope.row.cabin}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出发机场">
                                <template scope="scope">
                                    <span>{{ scope.row.depAirport }}{{scope.row.depAirportCN}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达机场">
                                <template scope="scope">
                                    <span>{{scope.row.arrAirport }}{{scope.row.arrAirportCN}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="起飞时间">
                                <template scope="scope">
                                    <span>{{ scope.row.depDatetime }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达时间">
                                <template scope="scope">
                                    <span>{{scope.row.arrDatetime}}</span>
                                </template>
                            </el-table-column>

                        </el-table>

                    </div>
                </el-card>

                <!-- 乘客信息 -->
                <el-card class="box-card">
                    <header>乘客信息</header>

                    <div class="passenger_info">

                        <el-table ref="multipleTable"
                                  :data="passengers"
                                  tooltip-effect="dark"
                                  style="width: 100%">

                            <el-table-column label="姓名">
                                <template scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="乘客类型">
                                <template scope="scope">
                                    <span>{{ scope.row.ageType == 0 ? '成人' : '儿童' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="性别" width="50">
                                <template scope="scope">
                                    <span>{{ scope.row.gender == 'M' ? '男' : '女' }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出生日期">
                                <template scope="scope">
                                    <span>{{ (scope.row.birthday).replace('T', ' ').substr(0, 10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型" width="80">
                                <template scope="scope">
                                    <label v-if="scope.row.cardType=='PP'">护照</label>
                                    <label v-if="scope.row.cardType=='GA'">港澳通行证</label>
                                    <label v-if="scope.row.cardType=='TW'">台湾通行证</label>
                                    <label v-if="scope.row.cardType=='TB'">台胞证</label>
                                    <label v-if="scope.row.cardType=='HX'">回乡证</label>
                                    <label v-if="scope.row.cardType=='HY'">国际海员证</label>
                                    <label v-if="scope.row.cardType=='OT'">其他</label>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件号" width="100">
                                <template scope="scope">
                                    <span>{{ scope.row.cardNum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件签发地" width="120">
                                <template scope="scope">
                                    <span>{{ getCountryNameByCode(scope.row.cardIssuePlace)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件有效期">
                                <template scope="scope">
                                    <span>{{ (scope.row.cardExpired).replace('T', ' ').substr(0, 10) }}</span>
                                </template>
                            </el-table-column>


                        </el-table>

                    </div>
                </el-card>

                <!-- 联系人信息 -->
                <el-card class="box-card">
                    <header>订单信息</header>


                    <div class="order_search">
                        <el-row>
                            <el-col :span="8">
                                <span>联系人:</span>
                                <el-input size="small" v-model="contact.name" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>联系方式:</span>
                                <el-input size="small" v-model="contact.mobile" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮箱:</span>
                                <el-input size="small" v-model="contact.email" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>地址:</span>
                                <el-input size="small" v-model="contact.address" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮编:</span>
                                <el-input size="small" v-model="contact.postcode" :disabled="true"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <header>客规</header>

                    <div class="rule_info" style="position:relative">

                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="退票规定:">
                                <span>{{rule.refundCn}}</span>
                            </el-form-item>
                            <el-form-item label="改期规定:">
                                <span>{{rule.changeCn}}</span>
                            </el-form-item>
                            <el-form-item label="行李额规定:">
                                <span>{{rule.baggageCn}}</span>
                            </el-form-item>
                            <el-form-item label="票本说明:">
                                <span>境外电子行程单</span>
                            </el-form-item>
                            <el-form-item label="其他说明:">
                                <span>无</span>
                            </el-form-item>
                        </el-form>
                        <el-button class="policyBtn" @click="refundChangePolicy">退改政策</el-button>
                    </div>
                </el-card>


            </el-form>
            <div slot="footer" class="dialog-footer" style="height:85px">


                <!-- <el-button style="margin-right: 5px;float: right;width: 84px;padding-left: 5px;padding-right: 5px;" @click="CancellationOrder">
                    取消订单
                </el-button> -->
                <el-button style="margin-right:5px;float:right;width:84px;" type="warning" v-if="haveRemainingTime"
                           :disabled="!haveRemainingTime" @click="jumpToPay()">支付
                </el-button>

                <div class="payTimehints" v-show="haveRemainingTime">
                    <span>生单时间：{{bookingDatetime}}</span>
                    <span style="color:#ff5452;">剩余支付时间：<label>{{remainingTimeStr}}</label></span>
                </div>


            </div>
        </el-dialog>
    </div>
</template>

<script>

    import rtInfoPanel from "./rtPNRInfoPanle.vue";
    import APIService from 'js/api'
    import country from "component/country";
    import countryJson from 'json/country.json';

    function getTimeStr(date1Str, date2) {
        var date1 = new Date(Date.parse(date1Str.replace(/-/g, '/')));
        date1.setMinutes(date1.getMinutes() + 30);
        var result = "";
        var seconds = parseInt((date1 - date2) / 1000);
        if (seconds <= 0) {
            return "";
        }
        var minute = parseInt(seconds / 60);
        var second = seconds - minute * 60;
        return (result = minute + "分" + second + "秒");
    }
    export default {
        data() {
            return {
                cardTypes: [
                    {
                        label: "护照",
                        value: "PP"
                    },
                    {
                        label: "港澳通行证",
                        value: "GA"
                    },
                    {
                        label: "台湾通行证",
                        value: "TW"
                    }, {
                        label: "台胞证",
                        value: "TB"
                    },
                    {
                        label: "回乡证",
                        value: "HX"
                    },
                    {
                        label: "国际海员证",
                        value: "HY"
                    },
                    {
                        label: "其他",
                        value: "OT"
                    }
                ],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                fullscreenLoading: false,
                fullscreenLoading1: false,
                rtInfoChange: '',
                prepareToPay: false,
                haveRemainingTime: true,
                dialogFormVisible: false,
                detalisData1: {},
                detailHasChoose: false,
                refundChangePolicyDate: false,
                remainingTimeStr: "",
                contact: {},
                bookingDatetime: null,
                rule: {},
                passengers: [
                    {
                        name: "",
                        ageType: 0,
                        gender: "M",
                        nationality: "",
                        cardType: "PP",
                        cardNum: "",
                        birthday: "",
                        cardIssuePlace: "",
                        cardExpired: "",
                        id: 1
                    }
                ],
                adultCount: 1,
                childCount: 0,
                routings: [{routing: {adultPrice: 0, adultTax: 0}}, {routing: {adultPrice: 0, adultTax: 0}}],
                isNicePrice: false,
                hasBaggage: false,
                allowRefund: false,
                allowChange: false,
                orderId: ''
            };
        },
        methods: {
            /**
             * 证件类型
             */
            cardTypeChange(e){

            },
            querySearch(queryString, cb) {
                var items = [
                    {value: "PP", label: "护照"},
                    {value: "GA", label: "港澳通行证"},
                    {value: "TW", label: "台湾通行证"},
                    {value: "TB", label: "台胞证"},
                    {value: "HX", label: "回乡证"},
                    {value: "HY", label: "国际海员证"},
                    {value: "OT", label: "其他"}
                ];
                var result = queryString ? items.filter(e => e.label.toLocaleLowerCase().indexOf(queryString) > -1) : items;
                cb(result);
            },
            /**@augments
             * 切换同舱或者低价数据源
             */
            changeDataSource(routingType) {

                var result = null;
                try {

                    var tempRouting = this.routings.filter(item => item.type == routingType);
                    if (tempRouting.length < 1) {
                        throw new Error("指定类型：" + (routingType === "sameCabin" ? "同舱" : "低价") + "不存在")
                    }

                    tempRouting = tempRouting[0];

                    //价格变化
                    this.detalisData1 = tempRouting.routing;
                    if (tempRouting.routing.adultPrice != null)
                        this.detailHasChoose = true;

                   
                    this.rule = this.detalisData1.rule;
                    this.detalisData1.otaOrderPrice = (this.detalisData1.adultPrice + this.detalisData1.adultTax) * this.adultCount
                        + (this.detalisData1.childPrice + this.detalisData1.childTax) * this.childCount

                    result = tempRouting;

                } catch (e) {
                    this.$message.error(e.message || e.stack);
                }
                return result;
            },

            /**
             * 验证乘客正确与否
             * @param psgItem 当前操作乘客
             * @param operatorType
             */
            validatePsger(psgItem, operatorType){

                let validate = false;
                try {

                    let adtCounts = 0, chdCount = 0;
                    this.passengers.forEach(psg => {
                        if (psg.ageType == 0) adtCounts++;
                        else if (psg.ageType == 1) chdCount++;
                    });

                    if (chdCount == this.passengers.length) {
                        if (operatorType == 2) {
                            psgItem.ageType = 0;
                        }
                        throw new Error("不可单独乘机：12周岁以下的乘客须由18周岁以上的同等舱位成人陪同登机");
                    }
                    if (chdCount / 2 > adtCounts) {
                        psgItem.ageType = 0;
                        throw new Error("每名成人最多允许携带两名儿童登机");
                    }

                    validate = true;

                } catch (error) {
                    this.$message.error(error.message);
                }
                return validate;
            },
            /**
             * 计算乘客数
             */
            calculatePsger(){
                let adtCounts = 0, chdCount = 0;
                this.passengers.forEach(psg => {
                    if (psg.ageType == 0) adtCounts++;
                    else if (psg.ageType == 1) chdCount++;
                });
                this.adultCount = adtCounts;
                this.childCount = chdCount;
            },
            changeAgeType(scope) {
                if (this.validatePsger(scope, 2)) {
                    this.calculatePsger();
                    this.checkBirthValidate(scope);
                }
            },

            getAllCountryList(){
                return countryJson.CountryInfoList;
            },
            getCountryNameByCode(queryString){

                let res = this.getAllCountryList().filter(e => e.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                if (res.length > 0) {
                    return res[0].ChName;
                } else {
                    return '未知'
                }
            },
            async submit() {
                passengers: [
                    {
                        name: "",
                        ageType: 0,
                        gender: "M",
                        nationality: "",
                        cardType: "PP",
                        cardNum: "",
                        birthday: "",
                        cardIssuePlace: "",
                        cardExpired: "",
                        id: 1
                    }
                ],
                    this.childCount = 0;
                this.adultCount = 1;
                this.contact.name = '';
                this.contact.email = '';
                this.contact.mobile = '';
                this.contact.address = '';
                this.contact.postcode = '';

                this.fullscreenLoading = true;
                try {


                    //获取后台返回的低价和同舱数据
                    const res = await  APIService("/PNRImport/bestBuy.do", {
                        RTContent: this.rtInfoChange,
                        hasBaggage: this.hasBaggage,
                        allowRefund: this.allowRefund,
                        allowChange: this.allowChange
                    });
                    this.contact = res.contact;
                    this.routings = res.routings;

                    var adultCount = 0
                    var childCount = 0
                    for (var i = 0; i < res.passengers.length; i++) {
                        var passenger = res.passengers[i]
                        if (passenger.birthday == undefined) passenger.birthday = ""
                        if (passenger.gender == undefined) passenger.gender = ""
                        if (passenger.cardType == undefined) passenger.cardType = ""
                        if (passenger.cardNum == undefined) passenger.cardNum = ""
                        if (passenger.cardExpired == undefined) passenger.cardExpired = ""
                        if (passenger.cardIssuePlace == undefined) passenger.cardIssuePlace = ""
                        if (passenger.nationality == undefined) passenger.nationality = ""
                        if (passenger.nationality == 'CHN') passenger.nationality = "CN"
                        if (passenger.cardIssuePlace == 'CHN') passenger.cardIssuePlace = "CN"

                        for (let item of this.cardTypes) {
                            if (item.value.indexOf(passenger.cardType) == 0) {
                                passenger.cardType = item.value;
                            }
                            break;
                        }

                        if (passenger.ageType == 0) adultCount++;
                        else childCount++;
                    }

                    this.adultCount = adultCount
                    this.childCount = childCount
                    this.passengers = res.passengers;


                    this.dialogFormVisible = true;


                    //判断同舱是否存在
                    if (this.routings[0].routing.fromSegments == null) {
                        tempRoutingItem = this.changeDataSource("lowestPrice");
                        if (tempRoutingItem == null) throw new Error("同舱不存在");
                    }
                    else {
                        var tempRoutingItem = this.changeDataSource("sameCabin");
                    }

                    //默认同舱


                } catch (e) {
                    this.$message.error(e.message || e.errorMsg || e.statusText);
                }
                this.fullscreenLoading = false;
                this.fullscreenLoading1 = false;
            },
            async confirmCreateOrder() {

                let _self = this;
                if (this.adultCount == '0') {
                    this.$message.error("不可单独乘机：12周岁以下的乘客须由18周岁以上的同等舱位成人陪同登机");

                    return;
                }


                if (this.contact.name == "" || this.contact.mobile == '' || this.contact.email == '') {
                    this.$message.error("请将联系人信息填写完整");
                    return;
                }
                //验证乘客联系方式
                if (!(/^((13[0-9]{1})|159|153|185|170|186|133|180|181|189|177|173|149|155|156|145|185|176|175|134135|150|151|152|157|158|159|182|183|184|187|188|147|178)+\d{8}$/.test(this.contact.mobile))) {
                    this.$message.error("联系方式不正确");
                    return;
                }
                if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.contact.email))) {
                    this.$message.error("邮箱格式不正确")
                    return;
                }

                for (var i = 0; i < this.passengers.length; i++) {
                    if (this.passengers[i].name == "") {
                        this.$message.error("第" + (i + 1) + "位的姓名没有填写");
                        return;
                    }
                    else {
                        if (this.passengers[i].name.indexOf("/") < 0) {
                            this.$message.error("第" + (i + 1) + "位的乘客姓与名大写拼音需要 / 分割");
                            return;
                        }
                    }
                    if (this.passengers[i].birthday == "") {
                        this.$message.error("第" + (i + 1) + "位的生日没有填写");
                        return;
                    }
                    if (this.passengers[i].nationality == "") {
                        this.$message.error("第" + (i + 1) + "位的国籍没有填写");
                        return;
                    }
                    if (this.passengers[i].cardNum == "") {
                        this.$message.error("第" + (i + 1) + "位的证件号没有填写");
                        return;
                    }
                    if (this.passengers[i].cardIssuePlace == "") {
                        this.$message.error("第" + (i + 1) + "位的证件签发地没有填写");
                        return;
                    }
                    if (this.passengers[i].cardExpired == "") {
                        this.$message.error("第" + (i + 1) + "位的证件有效期没有填写");
                        return;
                    }


                }


                this.fullscreenLoading = true;
                try {
                    var tempRTAnalysisInfo = {}
                    tempRTAnalysisInfo.contact = this.contact
                    tempRTAnalysisInfo.passengers = this.passengers.map(psg => {
                        if (psg.nationality != undefined && psg.nationality.trim().length > 2) {
                            let res = _self.getAllCountryList().filter(e => e.ThreeCode.toLowerCase().indexOf(psg.nationality.trim().toLowerCase()) === 0);
                            psg.nationality = res.length > 0 ? res.ShortEnName : psg.nationality;
                        }
                        if (psg.cardIssuePlace != undefined && psg.cardIssuePlace.trim().length > 2) {
                            let res = _self.getAllCountryList().filter(e => e.ThreeCode.toLowerCase().indexOf(psg.cardIssuePlace.trim().toLowerCase()) === 0);
                            psg.cardIssuePlace = res.length > 0 ? res.ShortEnName : psg.cardIssuePlace;
                        }
                        return psg;
                    });
                    tempRTAnalysisInfo.data = this.detalisData1.data
                    //this.tempRTAnalysisInfo.passengers=this.detalisData1.passengers

                    const res = await APIService("/PNRImport/booking.do", tempRTAnalysisInfo);
                    if (res.success) {
                        this.$message({
                            message: '生单成功！',
                            type: 'success'
                        });

                        this.bookingDatetime = res.bookingDatetime;
                        this.orderId = res.orderId;
                        this.haveRemainingTime = true;
                        this.hasRemain = true;
                        this.dialogFormVisible = false;
                        this.prepareToPay = true;
                    }
                    else {
                        this.$message.error("生单失败！");
                    }

                } catch (e) {
                    this.$message.error(e.errorMsg || e.statusText);
                }
                this.fullscreenLoading = false;

            },
            /**
             * 取消订单 */
            CancellationOrder(){
                this.prepareToPay = false;
            },
            async jumpToPay() {
                const loading = this.$loading({
                    lock: true,
                    text: "正在跳转支付页面...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                try {
                    var request = {
                        orderId: this.orderId
                    };

                    const res1 = await APIService("/booking/paycheck.do", request);
                    if (!res1.success) {

                        this.$message.error(res1.errorMsg);

                        return;
                    }
                    loading.close();

                    var changepayUrl = '/changePay?orderId=' + this.orderId
                    console.log(changepayUrl)
                    this.$router.push({path: changepayUrl});

                    // this.$router.push({path: "/changePay"});
                    // this.$router.push({name: "changePay",params:{orderID:this.orderId}});

                } catch (e) {
                    loading.close();
                    this.$message.error(e.errorMsg || e.statusText);

                }
            },
            handleClose(done) {
                this.$confirm("确定要关闭窗口吗？")
                    .then(_ => {
                        passengers: [
                            {
                                name: "",
                                ageType: 0,
                                gender: "M",
                                nationality: "",
                                cardType: "PP",
                                cardNum: "",
                                birthday: "",
                                cardIssuePlace: "",
                                cardExpired: "",
                                id: 1
                            }
                        ],
                            this.childCount = 0;
                        this.adultCount = 1;
                        this.contact.name = '';
                        this.contact.email = '';
                        this.contact.mobile = '';
                        this.contact.address = '';
                        this.contact.postcode = '';
                        done();
                    })
                    .catch(_ => {
                    });
            },

            /**
             * 退改政策退改政策
             */
            refundChangePolicy() {
                this.refundChangePolicyDate = true;
            },
            rtInfoChangeBtn() {
                this.rtInfoChange = '';
            },

            chosesameCabin() {

                $('.sameCabin').addClass('choseNow');
                $('.lowestPrice').removeClass('choseNow')
                this.routingType = "sameCabin";
                this.changeDataSource(this.routingType);
                console.log(this.detalisData1)

            },
            choselowestPrice() {
                $('.lowestPrice').addClass('choseNow');
                $('.sameCabin').removeClass('choseNow')
                this.routingType = "lowestPrice";
                this.changeDataSource(this.routingType);
                console.log(this.detalisData1)
            },
            /**
             *  验证出生日期是否与乘客类型一致
             * @param val
             */
            checkBirthValidate(item) {

                if (item.birthday == undefined || item.birthday.trim().length < 1) return;
                // debugger
                let isValidate = false;
                let limitMaxDate = new Date(item.birthday).getTime() + (12 * 365 * 24 * 60 * 60 * 1000);
                let limitMinDate = new Date(item.birthday).getTime() + (2 * 365 * 24 * 60 * 60 * 1000);
                let depDate = new Date(this.detalisData1.segments[0].depDatetime).getTime();

                let currentPsgIsAdult = depDate > limitMaxDate ? true : false;
                let currentPsgIsChild = depDate < limitMaxDate && depDate > limitMinDate ? true : false;

                if ((item.ageType == 0 && (currentPsgIsAdult || currentPsgIsChild)) || (item.ageType == 1 && currentPsgIsChild)) {
                    isValidate = true;
                }

                if (!isValidate) {
                    this.$message.error('乘客出生日期与乘客类型不匹配，请重新选择');
                    item.birthday = undefined;
                }
            },
            /**
             *  验证出生日期是否与乘客类型一致
             * @param val
             */
            checkCardExpireValidate(item) {
                if (item.cardExpired == undefined || item.cardExpired.trim().length < 1) return;

                let isValidate = false;
                let tempDate = new Date(item.cardExpired);
                tempDate.setMonth(tempDate.getMonth() - 6);
                let limitMinDate = tempDate.getTime();
                let depDate = new Date(this.detalisData1.segments[this.detalisData1.segments.length - 1].depDatetime).getTime();

                isValidate = depDate < limitMinDate ? true : false;


                if (!isValidate) {
                    this.$message.error('证件有效期不足6个月，请重新选择');
                    item.cardExpired = undefined;
                }
            },
        },

        components: {
            country,
            rtInfoPanel
        }
        ,
        created: function () {
            // `this` 指向 vm 实例
            this.intervalid1 = setInterval(() => {
                if (this.bookingDatetime != null && this.hasRemain) {
                    this.remainingTimeStr = getTimeStr(this.bookingDatetime, new Date());
                    if (this.remainingTimeStr == "") {
                        this.hasRemain = false;
                        this.haveRemainingTime = false;

                    }
                }
            }, 1000);
        }
    };


</script>

<style scoped>
    #rtPanleChange {
        background-color: rgb(0, 0, 0);
        font-size: 16px;
        color: rgb(0, 231, 0);
        overflow-y: scroll;
    }

    #orderDetailsShow .el-dialog {
        width: 1140px !important;
    }

    #orderDetailsShow .el-dialog .el-dialog__body {
        padding: 0 20px !important;
    }

    #rtInfoPanle {
        display: block;
        height: 420px;
        width: 800px;
        margin: 0 auto;
    }

    .box-card {
        margin-top: 20px;
    }

    .submitDiv {
        width: 340px;
        float: right;
        padding: 10px 0 20px 0;
    }

    .submitDiv button:nth-child(2) {
        margin-left: 38px;
    }

    #orderDetailsPrice .el-col-4 {
        text-align: center;
    }

    .passengersCell .el-input {
        width: 100% !important;
        padding-right: 10px !important;
    }

    .passengersCell .el-input__inner {
        padding-right: 10px !important;
    }

    .passengersCell .el-table__body-wrapper table .el-table__row td .cell {
        padding: 0 5px !important;
    }

    .el-input--suffix .el-input__inner {
        padding-right: 10px;
    }

    .el-table .cell {
        padding-left: 6px;
        padding-right: 6px;
    }

    .sameCabin, .lowestPrice {
        border: 3px solid #FFFAF1;
        height: 100px;
        cursor: pointer;
    }

    .sameCabin a {
        display: block !important;
        width: 100%;
        height: 100%;
    }

    .sameCabin a:hover {
        /* background: red; */
    }

    .sameCabin a:hover div {
        display: block !important;
        color: black;
    }

    .lowestPrice a:hover div {
        display: block !important;
        color: black;
    }

    .ticket_div {
        width: 150px;
        height: 100px;
        margin-left: 30px;
        float: left;
    }

    .ticket_div span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 100px;;
    }

    .price_div {
        width: 150px;
        height: 100px;
        float: left;
    }

    .price_div span:nth-child(1) {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 60px;
    }

    .price_div span:nth-child(2) {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .totalPrice_div {
        width: 120px;
        height: 100px;
        float: left;
    }

    .totalPrice_div span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 100px;
    }

    .sameCabinLowestPrice div {
        width: 100px;
        height: 30px;
        float: left;
        line-height: 30px;
        padding-left: 35px;
    }

    .choseNow {

        border: 3px solid #FFC471 !important;
        background: #FFFAF1;
    }

    .sameCabinNull {
        display: inline-block;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    #booking_upper1 {
        text-transform: uppercase !important;
    }

    #booking_upper2 {
        text-transform: uppercase !important;
    }

    #booking_upper3 {
        text-transform: uppercase !important;
    }

    .daxie input {
        text-transform: uppercase;
        color: red;
    }

    .payTimehints {
        width: 240px;
        height: 50px;
        float: right;
    }

    .payTimehints span {
        display: inline-block;
        width: 240px;
        font-size: 14px;
        text-align: left;
    }

    .ruleDiv span {
        display: block;
    }

    .el-input__prefix {
        display: none;
    }

    #orderDetailsShow .el-dialog__headerbtn {
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
    }

    .el-dialog__headerbtn > .el-dialog__close {
        width: 30px;
        height: 30px;
    }

    .Required-icon {
        color: #f56c6c;
        margin-right: 4px;
    }

    .policyBtn {
        position: absolute;
        right: 0;
        top: -26px;
    }

</style>
