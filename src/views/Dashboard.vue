<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import { apiService } from '@/service/ApiService';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
// State for buyer
const buyerIdNumber = ref('');
const buyerCalendarValue = ref(null);
const buyerAge = ref('');
const buyerGender = ref(null);
const buyerJob = ref(null);
const buyerFullName = ref('');
const buyerAddress = ref('');

// State for insured
const insuredIdNumber = ref('');
const insuredCalendarValue = ref(null);
const insuredAge = ref('');
const insuredGender = ref(null);
const insuredJob = ref(null);
const insuredFullName = ref('');
const insuredAddress = ref('');
const dropdownItemsGender = [
    { name: 'Nam', code: '1' },
    { name: 'Nữ', code: '2' }
];

const dropdownItemsJob = ref([]);

// List to store dependents
const dependents = ref([]);

// Method to add a new dependent
function addDependent() {
    dependents.value.push({
        idNumber: '',
        calendarValue: null,
        age: '',
        gender: null,
        job: null
    });
}

// Method to remove a dependent
function removeDependent(index) {
    dependents.value.splice(index, 1);
}

// Copy information from buyer to insured
function copyInsuranceDetails() {
    insuredIdNumber.value = buyerIdNumber.value;
    insuredCalendarValue.value = buyerCalendarValue.value;
    insuredAge.value = buyerAge.value;
    insuredGender.value = buyerGender.value;
    insuredJob.value = buyerJob.value;
}
const toast = useToast();

async function loadJobs() {
    try {
        const data = await apiService.fetchData('/Jobs', toast);
        if (data.returnCode === 0) {
            dropdownItemsJob.value = data.returnData.map((job) => ({
                name: job.jobName,
                code: job.id
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
// Method to gather and send data
async function submitForm() {
    const data = {
        id: '1234567890', // Or generate a unique ID if needed
        insured: {
            id: 'insured1',
            NationalID: insuredIdNumber.value,
            CitizenID: 'CIT123456',
            FullName: insuredFullName.value,
            DateOfBirth: insuredCalendarValue.value,
            Gender: insuredGender.value,
            Address: insuredAddress.value
        },
        buyer: {
            id: 'buyer1',
            NationalID: buyerIdNumber.value,
            CitizenID: 'CIT987654',
            FullName: buyerFullName.value,
            DateOfBirth: buyerCalendarValue.value,
            Gender: buyerGender.value,
            Address: buyerAddress.value
        },
        dependents: dependents.value.map((dependent) => ({
            id: dependent.id,
            NationalID: dependent.NationalID,
            CitizenID: dependent.CitizenID,
            FullName: dependent.FullName,
            DateOfBirth: dependent.DateOfBirth,
            Gender: dependent.Gender,
            Address: dependent.Address
        }))
    };

    try {
        const response = await axios.post('/api/submit', data);
        console.log('Data submitted successfully:', response.data);
        // Handle success (e.g., show a success message)
    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error (e.g., show an error message)
    }
}
</script>

<template>
    <div>
        <!-- Form Bên Mua Bảo Hiểm -->
        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Bên Mua Bảo Hiểm</div>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-wrap gap-2">
                    <label for="buyerIdNumber">Số chứng minh nhân dân</label>
                    <InputText id="buyerIdNumber" v-model="buyerIdNumber" type="text" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label for="buyerFullName">Họ tên</label>
                    <InputText id="buyerFullName" v-model="buyerFullName" type="text" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label for="buyerAddress">Địa chỉ</label>
                    <InputText id="buyerAddress" v-model="buyerAddress" type="text" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label for="buyerBirthdate">Ngày sinh</label>
                    <DatePicker id="buyerBirthdate" v-model="buyerCalendarValue" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <label for="buyerAge">Tuổi</label>
                    <InputText id="buyerAge" v-model="buyerAge" type="text" />
                </div>

                <div class="flex flex-wrap gap-2">
                    <label for="buyerJob">Nghề Nghiệp {{ buyerJob }}</label>
                    <Select id="buyerJob" v-model="buyerJob" :options="dropdownItemsJob" optionLabel="name" placeholder="Chọn nghề nghiệp"></Select>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-wrap gap-2">
                    <label for="buyerGender">Giới Tính</label>
                    <Select id="buyerGender" v-model="buyerGender" :options="dropdownItemsGender" optionLabel="name" placeholder="Chọn giới tính"></Select>
                </div>
                <div class="flex flex-wrap gap-2">
                    <Button id="btn1" label="Nhập thông tin từ mã QR căn cước" @click="submitForm" />
                </div>
            </div>
        </div>

        <!-- Form Người Được Bảo Hiểm -->
        <div class="card flex flex-col gap-4 w-full mt-8">
            <div class="font-semibold text-xl">Người được bảo hiểm</div>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredIdNumber">Số chứng minh nhân dân</label>
                    <InputText id="insuredIdNumber" v-model="insuredIdNumber" type="text" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredBirthdate">Ngày sinh</label>
                    <DatePicker id="insuredBirthdate" v-model="insuredCalendarValue" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredAge">Tuổi</label>
                    <InputText id="insuredAge" v-model="insuredAge" type="text" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredGender">Giới Tính</label>
                    <Select id="insuredGender" v-model="insuredGender" :options="dropdownItemsGender" optionLabel="name" placeholder="Chọn giới tính" />
                </div>

                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredJob">Nghề Nghiệp</label>
                    <!-- <Select id="insuredJob" v-model="insuredJob" :options="dropdownItemsJob" optionLabel="name" placeholder="Chọn nghề nghiệp" /> -->
                    <Select id="insuredJob" v-model="insuredJob" :options="dropdownItemsJob" optionLabel="name" placeholder="Chọn nghề nghiệp"></Select>
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredFullName">Họ tên</label>
                    <InputText id="insuredFullName" v-model="insuredFullName" type="text" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label for="insuredAddress">Địa chỉ</label>
                    <InputText id="insuredAddress" v-model="insuredAddress" type="text" />
                </div>
            </div>
            <div class="flex items-center mt-4">
                <Button label="Sao chép thông tin từ bên mua bảo hiểm" @click="copyInsuranceDetails" />
            </div>
        </div>

        <!-- Form Người Phụ Thuộc -->
        <div class="card flex flex-col gap-4 w-full mt-8">
            <div class="font-semibold text-xl">Người phụ thuộc</div>
            <div v-for="(dependent, index) in dependents" :key="index" class="flex flex-col md:flex-row gap-4 mb-4">
                <div class="flex flex-wrap gap-2 w-full">
                    <label :for="'dependentIdNumber_' + index">Số chứng minh nhân dân</label>
                    <InputText :id="'dependentIdNumber_' + index" v-model="dependent.idNumber" type="text" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label :for="'dependentBirthdate_' + index">Ngày sinh</label>
                    <DatePicker :id="'dependentBirthdate_' + index" v-model="dependent.calendarValue" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label :for="'dependentAge_' + index">Tuổi</label>
                    <InputText :id="'dependentAge_' + index" v-model="dependent.age" type="text" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label :for="'dependentGender_' + index">Giới Tính</label>
                    <Select :id="'dependentGender_' + index" v-model="dependent.gender" :options="dropdownItemsGender" optionLabel="name" placeholder="Chọn giới tính" />
                </div>
                <div class="flex flex-wrap gap-2 w-full">
                    <label :for="'dependentJob_' + index">Nghề Nghiệp</label>
                    <Select :id="'dependentJob_' + index" v-model="dependent.job" :options="dropdownItemsJob" optionLabel="name" placeholder="Chọn nghề nghiệp" />
                </div>
                <div class="flex items-center">
                    <Button label="Xóa" class="p-button-danger" @click="removeDependent(index)" />
                </div>
            </div>
            <div class="flex items-center">
                <Button label="Thêm Người Phụ Thuộc" @click="addDependent" />
            </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-8">
            <Button label="Gửi đi" @click="submitForm" />
        </div>
    </div>
</template>
