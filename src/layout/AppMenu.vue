<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Khu vực IT',
        items: [
            { label: '[Dev]_Cấu hình dữ liệu ', icon: 'pi pi-fw pi-cog', to: '/setting' },
            { label: '[Dev]_Đọc văn bản từ hình ảnh', icon: 'pi pi-fw pi-cog', to: '/imageToText' }
        ]
    },
    {
        label: 'Home',
        items: [
            { label: '	Thư giới thiệu sản phẩm', icon: 'pi pi-fw pi-circle-off', to: '/' },
            { label: '	Danh sách các đơn thụ lý', icon: 'pi pi-fw pi-circle-off', to: '/listMain' }
        ]
    },

    {
        label: 'Nhập hồ sơ yêu cầu bảo hiểm',
        items: [
            { label: 'Nhân viên tư vấn', icon: 'pi pi-fw pi-circle-off', to: '/employee' },
            { label: 'Bên mua bảo hiểm', icon: 'pi pi-fw pi-circle-off', to: '/buyer' },
            { label: 'Người được bảo hiểm', icon: 'pi pi-fw pi-circle-off', to: '/insured' },
            { label: 'Người phụ thuộc', icon: 'pi pi-fw pi-circle-off', to: '/dependents' },
            { label: 'Người thụ hưởng', icon: 'pi pi-fw pi-circle-off', to: '/beneficiary' },
            { label: 'Thông tin hợp đồng', icon: 'pi pi-fw pi-circle-off', to: '/contractInfo' },
            { label: 'Thông tin khác', icon: 'pi pi-fw pi-circle-off', to: '/anotherPageInfo' },
            { label: 'Tiểu sử gia đình', icon: 'pi pi-fw pi-circle-off', to: '/familyInfo' },
            { label: 'Bằng chứng y tế', icon: 'pi pi-fw pi-circle-off', to: '/hospital' },
            { label: 'Giấy tờ kèm theo', icon: 'pi pi-fw pi-circle-off', to: '/attachment' },
            { label: 'Cam kết', icon: 'pi pi-fw pi-circle-off', to: '/commit' },
            { label: 'Bảng câu hỏi tài chính', icon: 'pi pi-fw pi-circle-off', to: '/listQuestion' },
            { label: 'Ký tên', icon: 'pi pi-fw pi-circle-off', to: '/uikit/formlayout' },
            { label: 'Đính kèm hình ảnh', icon: 'pi pi-fw pi-circle-off', to: '/attachment-image' },
            { label: 'Nghiệp vụ thẩm định', icon: 'pi pi-fw pi-circle-off', to: '/uikit/formlayout' },
            { label: 'Kết quả', icon: 'pi pi-fw pi-circle-off', to: '/return' },
            { label: 'Form Layout', icon: 'pi pi-fw pi-circle-off', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
