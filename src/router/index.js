import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/listMain',
                    name: 'listMain',
                    component: () => import('@/views/ListMain.vue')
                },
                {
                    path: '/employee',
                    name: 'employee',
                    component: () => import('@/views/Employee.vue')
                },
                {
                    path: '/imageToText',
                    name: 'imageToText',
                    component: () => import('@/views/ImageToText.vue')
                },
                {
                    path: '/insured',
                    name: 'insured',
                    component: () => import('@/views/Insured.vue')
                },
                {
                    path: '/buyer',
                    name: 'buyer',
                    component: () => import('@/views/Buyer.vue')
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/views/Setting.vue')
                },
                {
                    path: '/dependents',
                    name: 'dependents',
                    component: () => import('@/views/Dependents.vue')
                },

                {
                    path: '/beneficiary',
                    name: 'beneficiary',
                    component: () => import('@/views/Beneficiary.vue')
                },
                // { label: 'Thông tin hợp đồng', icon: 'pi pi-fw pi-circle-off', to: '/contractInfo' },
                // { label: 'Thông tin khác', icon: 'pi pi-fw pi-circle-off', to: '/anotherPageInfo' },
                // { label: 'Tiểu sử gia đình', icon: 'pi pi-fw pi-circle-off', to: '/familyInfo' },
                // { label: 'Bằng chứng y tế', icon: 'pi pi-fw pi-circle-off', to: '/hospital' },
                // { label: 'Giấy tờ kèm theo', icon: 'pi pi-fw pi-circle-off', to: '/attachment' },
                // { label: 'Cam kết', icon: 'pi pi-fw pi-circle-off', to: '/commit' },
                // { label: 'Bảng câu hỏi tài chính', icon: 'pi pi-fw pi-circle-off', to: '/listQuestion' },
                // { label: 'Ký tên', icon: 'pi pi-fw pi-circle-off', to: '/uikit/formlayout' },
                // { label: 'Đính kèm hình ảnh', icon: 'pi pi-fw pi-circle-off', to: '/attachment-image' },
                // { label: 'Nghiệp vụ thẩm định', icon: 'pi pi-fw pi-circle-off', to: '/uikit/formlayout' },
                // { label: 'Kết quả', icon: 'pi pi-fw pi-circle-off', to: '/return' },
                {
                    path: '/contractInfo',
                    name: 'contractInfo',
                    component: () => import('@/views/ContractInfo.vue')
                },
                {
                    path: '/anotherPageInfo',
                    name: 'anotherPageInfo',
                    component: () => import('@/views/AnotherPageInfo.vue')
                },
                {
                    path: '/familyInfo',
                    name: 'familyInfo',
                    component: () => import('@/views/FamilyInfo.vue')
                },
                {
                    path: '/attachment',
                    name: 'attachment',
                    component: () => import('@/views/AttachmentPage.vue')
                },
                {
                    path: '/commit',
                    name: 'commit',
                    component: () => import('@/views/Commit.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
