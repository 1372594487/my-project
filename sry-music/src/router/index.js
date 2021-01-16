import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Recommend",
        component: () =>
            import( /* webpackChunkName: "about" */ "../views/Recommend.vue"),
        meta: {
            isShowNav: true,
            page: 0
        },
    },
    {
        path: "/hot",
        name: "Hot",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ "../views/Hot.vue"),
        meta: {
            isShowNav: true,
            page: 1
        },
    },

    {
        path: "/search",
        name: "Search",
        component: () =>
            import( /* webpackChunkName: "about" */ "../views/Search.vue"),
        meta: {
            isShowNav: true,
            page: 2
        },
    },

    {
        path: "/playlist",
        name: "PlayList",
        component: () =>
            import( /* webpackChunkName: "about" */ "../views/PlayList.vue"),
        meta:{
            page:3
        }
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to,from,next)=>{
    Vue.prototype.transition = 'aside-none'
    if(from.meta.page>to.meta.page){
        //后退 右滑
        Vue.prototype.transition = 'slide-right';
        // from.meta.keepAlive= true;
        // to.meta.keepAlive = true;
        console.log("后退 右滑");
    }else if(from.meta.page<to.meta.page){
        // 前进,左滑动
		Vue.prototype.transition = 'slide-left';
		// from.meta.keepAlive = true;
		// to.meta.keepAlive = true;
        console.log("前进,左滑动");
    }else{
        // 同一层级 无动画
        Vue.prototype.transition = 'alide=none';
        // from.meta.keepAlive = true;
        // to.meta.keepAlive = true;
        console.log("同层级");
    }
    next();
})

export default router;

