import 'js/sys/siteLib.js'
import './index.scss'
import requestAPIServiceAsync from "js/api";
import leftMenu from "./page/menu";

let routes = [

    //#region 不需要layout的
    {name: "root", path: '/', redirect: '/orderList'},
    {name: "home", path: '/home', component: () => import('./page/home/home.vue')},
    {name: "about", path: '/about', component: () => import('./page/about/about.vue')},

    {name: "signin", path: '/signin', component: () => import('./page/signin/signin.vue')},
    {name: "signup", path: '/signup', component: () => import('./page/signup/signup.vue')},

    {name: "createOrder", path: '/createOrder', component: () => import('./page/createOrder/createOrder.vue')},
    {name: "errorPage404", path: '/errorPage404', component: () => import('./page/errorPage404/errorPage404')},
    {name: "some", path: '*', component: () => import('./page/errorPage404/errorPage404.vue')},
    {name: "search", path: '/search', component: () => import('./page/search/search.vue')},
    {
        name: "createOrderByRTPNR",
        path: '/createOrderByRTPNR',
        component: () => import('./page/createOrderByRTPNR/createOrderByRTPNR.vue')
    },
    {
        name: "travelItinerary",
        path: '/travelItinerary',
        component: () => import('./page/travelItinerary/travelItinerary.vue')
    },
    //#endregion

    //#region 需要layout的
    {name: "account", path: '/account', component: () => import('./page/account/account.vue')},
    {
        name: "applyChangeOrder",
        path: '/applyChangeOrder',
        component: () => import('./page/applyChangeOrder/applyChangeOrder.vue')
    },
    {name: "balance", path: '/balance', component: () => import('./page/balance/balance.vue')},
    {
        name: "changeApplication",
        path: '/changeApplication',
        component: () => import('./page/changeApplication/changeApplication.vue')
    },
    {
        name: "changeOrderList",
        path: '/changeOrderList',
        component: () => import('./page/changeOrderList/changeOrderList.vue')
    },
    {name: "changePay", path: '/changePay', component: () => import('./page/changePay/changePay.vue')},
    {
        name: "changePaySuccess",
        path: '/changePaySuccess',
        component: () => import('./page/changePaySuccess/changePaySuccess.vue')
    },
    {
        name: "changeResult",
        path: '/changeResult',
        component: () => import('./page/changeResult/changeResult.vue')
    },

    {
        name: "orderDetails",
        path: '/orderDetails',
        component: () => import('./page/orderDetails/orderDetails.vue')
    },
    {name: "orderList", path: '/orderList', component: () => import('./page/orderList/orderList.vue')},
    {name: "orderPay", path: '/orderPay', component: () => import('./page/orderPay/orderPay.vue')},
    {name: "payResult", path: '/payResult', component: () => import('./page/payResult/payResult.vue')},

    {
        name: "disillusionedApplication",
        path: '/disillusionedApplication',
        component: () => import('./page/disillusionedApplication/refundApplication.vue')
    },
    {
        name: "disillusionedCancel",
        path: '/disillusionedCancel',
        component: () => import('./page/disillusionedCancel/refundCancel.vue')
    },
    {
        name: "disillusionedResult",
        path: '/disillusionedResult',
        component: () => import('./page/disillusionedResult/refundResult.vue')
    },

    {
        name: "refundApplication",
        path: '/refundApplication',
        component: () => import('./page/refundApplication/refundApplication.vue')
    },
    {
        name: "refundCancel",
        path: '/refundCancel',
        component: () => import('./page/refundCancel/refundCancel.vue')
    },
    {
        name: "refundResult",
        path: '/refundResult',
        component: () => import('./page/refundResult/refundResult.vue')
    },

    {name: "searchWait", path: '/searchWait', component: () => import('./page/searchWait/searchWait.vue')},
    {
        name: "ticketResult",
        path: '/ticketResult',
        component: () => import('./page/ticketResult/ticketResult.vue')
    },
    {
        name: "creditChange",
        path: '/creditChange',
        component: () => import('./page/creditChange/creditChange.vue')
    },
    {
        name: "creditSettlement",
        path: '/creditSettlement',
        component: () => import('./page/creditSettlement/creditSettlement.vue')
    },
    {
        name: "prepaidWithdraw",
        path: '/prepaidWithdraw',
        component: () => import('./page/prepaidWithdraw/prepaidWithdraw.vue')
    },
    {name: "repaying", path: '/repaying', component: () => import('./page/repaying/repaying.vue')},
    {
        name: "prepayRecord",
        path: '/prepayRecord',
        component: () => import('./page/prepayRecord/prepayRecord.vue')
    },
    {name: "recharging", path: '/recharging', component: () => import('./page/recharging/recharging.vue')},
    {name: "withdrawing", path: '/withdrawing', component: () => import('./page/withdrawing/withdrawing.vue')},
    {
        name: "creditManagement",
        path: '/creditManagement',
        component: () => import('./page/creditManagement/creditManagement.vue')
    },
    {
        name: "refundOrderList",
        path: '/refundOrderList',
        component: () => import('./page/refundOrderList/refundOrderList.vue')
    },
    {
        name: "disillusionedOrderList",
        path: '/disillusionedOrderList',
        component: () => import('./page/disillusionedOrderList/refundOrderList.vue')
    },
    {name: "changedPay", path: '/changedPay', component: () => import('./page/changedPay/changedPay.vue')},

    {name: "paySign", path: '/paySign', component: () => import('./page/paySign/paySign.vue')}

    //#endregion


];

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
});

async function hasLogin() {

    try {
        const res = await requestAPIServiceAsync("/comm/now.do", {}, true);

        return res.success;

    } catch (error) {
        console.error(error);
        return false;
    }

}

router.beforeEach(async (to, from, next) => {

    console.log(`to ${to.name}`)
    document.title = to.name;

    //#region validate login

    if (window.app1 != undefined && !window.app1.hasLogin && to.name == "signin") {
        next();
    }
    else {

        var logined = await hasLogin();

        window.app1.hasLogin = logined;
        if (logined) {
            if (to.name === "signin")
                next('/');
            else
                next();
        }
        else {
            next({name: 'signin', query: {ref: to.name === 'signin' ? 'root' : to.name}}, () => {

                window.app1.$message({
                    message: '请先登录',
                    type: 'error'
                });

            });

        }

    }

    //#endregion

});

Vue.component('leftMenu', leftMenu);


Vue.directive('upperCase', {
    // 当被绑定的元素插入到 DOM 中时……
    componentUpdated: function (el) {

        if(el.value==undefined ||el.value.trim().length<1)return;
      // 聚焦元素
      el.value.toUpperCase();
    }
  })

window.app1 =
    new Vue(
        {
            data() {
                return {
                    hasLogin: false
                }
            },
            router
        }
    ).$mount('#app');


