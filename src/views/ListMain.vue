<script setup>
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { apiService } from '@/service/ApiService';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';

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
function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatGender(value) {
    return value === 'Nam' ? 'Male' : 'Female';
}

function onRowClick(row) {
    selectedRowId.value = row; // Assuming 'id' is the identifier in your data
    console.log('Selected row ID:', JSON.stringify(selectedRowId.value.data.id));
    toast.add({ severity: 'success', summary: 'Row Selected', detail: `Now Processing: ${selectedRowId.value.data.id}`, life: 3000 });
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

            <Column field="insured.FullName" header="Insured Full Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.insured.FullName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Insured Full Name" />
                </template>
            </Column>
            <Column field="buyer.FullName" header="Buyer Full Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.buyer.FullName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Buyer Full Name" />
                </template>
            </Column>
            <Column field="dependents.FullName" header="Dependents Full Name" style="min-width: 12rem">
                <template #body="{ data }">
                    <div v-for="dep in data.dependents" :key="dep.id">{{ dep.FullName }}</div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Dependents Full Name" />
                </template>
            </Column>
            <Column field="insured.DateOfBirth" header="Insured Date of Birth" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ formatDate(data.insured.DateOfBirth) }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="insured.Gender" header="Insured Gender" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ formatGender(data.insured.Gender) }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by Gender" />
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
