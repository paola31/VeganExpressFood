import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import HomeView from '@/views/HomeView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import MainLayout from "@/layouts/MainLayout.vue";
import MenuStates from "@/views/MenuStates.vue";
import OrderStates from "@/views/OrderStates.vue";
import modifyTable from "@/components/ModifyTable.vue";
import ModifyTable from "@/components/ModifyTable.vue";


const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'home', component: HomeView },
            { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') },
            { path: 'login', name: 'login', component: () => import('@/views/Login.vue') },
            { path: 'register', name: 'register', component: () => import('@/views/UserRegister.vue') },
            { path: 'adminlogin', name: 'adminlogin', component: () => import('@/views/AdminLogin.vue') }
        ]
    },
    {
        path: '/user',
        component: UserLayout,
        children: [
            { path: 'dashboard', name: 'user-dashboard', component: () => import('@/views/UserDashboard.vue') },
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', name: 'admindashboard', component: AdminDashboard },
            { path: 'menustates', name: 'menustates', component: MenuStates },
            { path: 'orderstates', name: 'orderstates', component: OrderStates },
            { path: 'modifyState/:id', name: 'modifyState', component: ModifyTable },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router