import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            component: () => import("@/views/index/index"),
            meta: {
                title: "黑白电影百科",
                // 缓存首页
                keepAlive: true
            }
        },
        {
            path: "/index",
            component: () => import("@/views/movielist/index"),
            meta: {
                title: "黑白电影列表",
                // 缓存首页
                
            }
        },
     
        {
            path: "/index",
            component: () => import("@/views/detail/index"),
            meta: {
                title: "黑白电影详情",
                // 缓存首页

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
