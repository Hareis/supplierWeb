/**
 * Created by tempus on 2018/3/1.
 */

import requestAPIServiceAsync from "js/api";

const routes = [
    {name: "signIn", path: '/', component: () => import('./../page/signIn/signIn.vue')},
    {
        name: "signIn", path: '/manager',
        component: () => import('./../page/pageSection/pageSection.vue'),
        children: [
            {name: "signIn", path: '', component: () => import('./../page/main/main.vue')},
            {
                name: "userManager",
                path: 'userManager',
                component: () => import('./../page/userManager/userManager.vue')
            },
            {
                name: "accountInfo",
                path: 'accountInfo',
                component: () => import('./../page/accountInfo/accountInfo.vue')
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'hash',
    routes
});


export  default  router;