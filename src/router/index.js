import { createRouter, createWebHashHistory } from "vue-router";
import{Toast} from 'vant';
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        
        {
            path: '/',
            component: ()=> import('../views/home/Home.vue')
        },
        {
            path: '/home',
            component: ()=> import('../views/home/Home.vue')
        },
        {
            path: '/order',
            component: ()=> import('../views/order/Order.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path: '/mine',
            component: ()=> import('../views/mine/Mine.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path: '/cart',
            component: ()=> import('../views/cart/Cart.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path:'/store',
            component: ()=>import('../views/store/Store.vue')
        },
        {
            path:'/createorder',
            component: ()=>import('../views/createOrder/createOrder.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path:'/address',
            component: ()=>import('../views/address/Address.vue'),
            meta: { 
                isAuth: true,
             }
        },{
            path:'/addressedit',
            component: ()=>import('../views/addressEdit/AddressEdit.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path:'/userinfoedit',
            component: ()=>import('../views/userinfoedit/UserInfoEdit.vue'),
            meta: { 
                isAuth: true,
             }
        },
        {
            path:'/login',
            component: ()=>import('../views/login/Login.vue')
        },
        {
            path:'/register',
            component: ()=>import('../views/register/Register.vue')
        }
    ]
});
//路由守卫
router.beforeEach((to, from, next) => {
    if(to.meta.isAuth){
        //一会登录了以后 会在localstorage里面存一个标识
        if(localStorage.isLogin === 'login'){
            next();
        }else{
            next('/login');
            Toast('请先登录');
        }
    }else{
        next();
    }
    
})
export default router;