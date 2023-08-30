import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () =>
    import ('@/page/Home.vue')
const start = () =>
    import ('@/components/start.vue')
const collection = () =>
    import ('@/components/collection.vue')
const note = () =>
    import ('@/components/note.vue')
const right = () =>
    import ('@/components/right.vue')
const main = () =>
    import ('@/components/main.vue')
const MyTree = () =>
    import ('@/components/MyTree.vue')
const userpage = () =>
    import ('@/page/userpage.vue')
const login = () =>
    import ('@/components/login.vue')
const register = () =>
    import ('@/components/register.vue')



//定义路由组件
const routes = [{
        path: '/userpage',
        component: userpage,
        children: [{
            path: 'login',
            component: login,
        }, {
            path: 'register',
            component: register
        }]
    },
    {
        path: '/home',
        component: Home,
        children: [{
            path: 'main',
            component: main,
            children: [{
                path: 'start',
                component: start,
            }, {
                path: 'collection',
                component: collection,
            }, {
                path: 'note',
                component: note,
            }, {
                path: 'MyTree',
                component: MyTree,
                children: [{
                    path: 'right',
                    component: right
                }]
            }]
        }],
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        console.log(to, from, 222)
        next('/userpage/login');
    } else {
        next();
    }
})

export default router;