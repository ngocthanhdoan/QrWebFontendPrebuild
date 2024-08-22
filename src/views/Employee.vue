<script setup>
import { ref } from 'vue';
import { apiService } from '@/service/ApiService';
import { useToast } from 'primevue/usetoast';
//import axios from 'axios';
const toast = useToast();
const panelMenuitems = ref([null]);
async function loadJobs() {
    try {
        const data = await apiService.fetchData('/Employee', toast);
        if (data.returnCode === 0) {
            panelMenuitems.value = data.returnData.map((emp) => ({
                label: emp.fullName,
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Mã nhân viên  : ' + emp.id
                    },
                    {
                        label: 'Mã đơn vị        : ' + emp.divno
                    },
                    {
                        label: 'Tháng Làm Việc   : ' + emp.wkm
                    },
                    {
                        label: 'Tỉ lệ hoa hồng(%): ' + emp.discount
                    }
                ]
            }));
        } else {
            toast.add({ severity: 'warn', summary: 'Warning', detail: data.msgDescs, life: 3000 });
        }
    } catch (error) {
        console.error('Failed to load jobs:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching jobs.', life: 3000 });
    }
}

// Load jobs on component setup
loadJobs();
</script>

<template>
    <div class="card">
        <div class="card">
            <div class="font-semibold text-xl mb-4">Nhân Viên Tư Vấn</div>
            <PanelMenu :model="panelMenuitems" />
        </div>
    </div>
</template>
