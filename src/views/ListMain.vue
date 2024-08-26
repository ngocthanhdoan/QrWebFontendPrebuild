<script setup>
import { apiService } from '@/service/ApiService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();
const data = ref([]);
const filters = ref(null);
const loading = ref(false);
const selectedRowId = ref(null); // To store the ID of the selected row

async function loadResponseData() {
    try {
        const response = await apiService.fetchData('/DataForTesting', toast);
        if (response.returnCode === 0) {
            data.value = response.returnData;
            console.log(response.returnData);
        } else {
            toast.add({ severity: 'warn', summary: 'Warning', detail: response.msgDescs, life: 3000 });
        }
    } catch (error) {
        console.error('Failed to load data:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data.', life: 3000 });
    }
}

loadResponseData();

function initFilters() {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'insured.FullName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'buyer.FullName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'dependents.FullName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'insured.DateOfBirth': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'insured.Gender': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    };
}
initFilters();

function onRowClick(row) {
    selectedRowId.value = row; // Assuming 'id' is the identifier in your data
    console.log('Selected row ID:', JSON.stringify(selectedRowId.value.data.id));
    toast.add({ severity: 'success', summary: `Mã thụ lý: ${selectedRowId.value.data.id}`, detail: `Đã được nạp dữ liệu để thực hiện nhập CMI`, life: 6000 });
    sessionStorage.setItem('CMI_ID', selectedRowId.value.data.id);
}
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Customer Data</div>
        <DataTable
            :value="data"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters"
            filterDisplay="menu"
            :loading="loading"
            :filters="filters"
            showGridlines
            selectionMode="single"
            :selection="selectedRowId"
            @row-click="onRowClick"
        >
            <template #empty> No data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <Column field="buyer.fullName" header="Mã Thụ Lý" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Tên Bên Mua Bảo Hiểm" />
                </template>
            </Column>
            <Column field="buyer.fullName" header="Tên Bên Mua Bảo Hiểm" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.buyer.fullName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Tên Bên Mua Bảo Hiểm" />
                </template>
            </Column>
            <Column field="insured.fullName" header="Tên Người Được Bảo Hiểm" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.insured.fullName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Tên Người Được Bảo Hiểm" />
                </template>
            </Column>

            <Column field="dependents.fullName" header="Tên Người Phụ Thuộc" style="min-width: 12rem">
                <template #body="{ data }">
                    <div v-for="dep in data.dependents" :key="dep.id">{{ dep.fullName }}</div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Tên Người Phụ Thuộc" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
