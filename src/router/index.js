import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: () => import("@/views/actor/actorlist"),
            meta: {
                title: "黑白情怀",
                // 缓存首页
                keepAlive: true
            }
        },
        {
            path: "/home",
            component: () => import("@/views/home/home"),
            meta: {
                title: "黑白情怀",
                // 缓存首页
               // keepAlive: true
            }
        },
        {
            path: "/movielist",
            meta: {
                title: "黑白电影列表"
            },
            component: () => import("@/views/movielist/index")
        },
        {
            path: "/actor",
            meta: {
                title: "黑白电影列表"
            },
            component: () => import("@/views/actor/index")
        },
        {
            path: "/search",
            meta: {
                title: "搜索"
            },
            component: () => import("@/views/search/index")
        },
        {
            path: "/test",
            meta: {
                title: "测试"
            },
            component: () => import("@/views/test/index")
        },
        {
            path: "/my",
            component: () => import("@/views/my/index"),
            redirect: "/my/center",
            children: [
                {
                    path: "center",
                    meta: {
                        title: "个人中心"
                    },
                    component: () => import("@/views/my/children/center")
                },
                {
                    path: "set",
                    meta: {
                        title: "设置"
                    },
                    component: () => import("@/views/my/children/set")
                }
            ]
        },
        {
            path: "/login",
            component: () => import("@/views/login/index"),
            meta: {
                title: "登陆"
            }
        },
        {
            path: "*",
            component: () => import("@/components/NotFound")
        }
    ]
});

router.beforeEach((to, from, next) => {
    let { title, needLogin } = to.meta;
    let { isLogin } = store.state;
    document.title = title;

    if (needLogin && !isLogin) {
        next({
            path: "/login"
        });
    } else {
        next();
    }
});

export default router;
