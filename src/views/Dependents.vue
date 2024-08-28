<script>
import fetchOptionsMixin from '@/mixins/fetchOptionsMixin';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
    mixins: [fetchOptionsMixin],

    data() {
        return {
            dependents: [],
            messenger: null,
            toast: null,
            CMI_ID: null,
            selectedOptions: {}, // Object to hold selected values for each prefix
            dynamicOptions: {} // Object to hold options for each prefix
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('/v4/api/data');
                const prefixes = this.extractPrefixes(response.data);
                await Promise.all(prefixes.map((prefix) => this.fetchAuto(prefix)));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        extractPrefixes(data) {
            return [...new Set(data.map((item) => item.prefix))];
        },
        async fetchAuto(prefix) {
            try {
                const response = await axios.get(`/v4/api/data/prefix/${prefix}`);
                this.dynamicOptions[prefix] = response.data.map((item) => ({
                    code: item.key,
                    name: item.value
                }));
                this.selectedOptions[prefix] = ''; // Initialize selected value
            } catch (error) {
                console.error(`Error fetching options for prefix ${prefix}:`, error);
            }
        },
        async loaddependents(CMI_ID) {
            try {
                if (CMI_ID == null) {
                    this.messenger = 'Không tìm thấy mã thụ lý, vui lòng quay về trang "Danh sách các đơn thụ lý" và chọn đơn xử lý!';
                } else {
                    const response = await axios.get(`/v4/api/fortest/${CMI_ID}/dependents`);
                    if (response != null) {
                        this.dependents = response.data;
                    } else {
                        this.messenger = 'Chưa có dữ liệu người phụ thuộc';
                    }
                }
            } catch (error) {
                console.error('Failed to load dependents:', error);
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching dependents data.', life: 3000 });
            }
        },
        async submitForm() {
            try {
                console.log(this.dependents);
                const response = await axios.put(`/v4/api/fortest/${this.CMI_ID}/dependents`, this.dependents);
                if (response.data) {
                    this.toast.add({ severity: 'success', summary: 'Thành công', detail: response.data.message, life: 3000 });
                } else {
                    this.toast.add({ severity: 'error', summary: 'Lỗi', detail: response.data.message, life: 3000 });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể gửi dữ liệu.', life: 3000 });
            }
        }
    },
    mounted() {
        this.toast = useToast();
        this.fetchData();
        this.CMI_ID = sessionStorage.getItem('CMI_ID');
        if (!this.CMI_ID || this.CMI_ID == '') {
            this.messenger = 'Không tìm thấy mã thụ lý, vui lòng quay về trang "Danh sách các đơn thụ lý" và chọn đơn xử lý!';
        } else {
            this.loaddependents(this.CMI_ID);
        }
    }
};
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <Message v-if="messenger !== null" severity="error">{{ messenger }}</Message>
            <div class="card flex flex-col gap-4" v-for="dependent in dependents" :key="dependent.id">
                <!-- v-if="messenger == null" -->
                <div class="font-semibold text-xl">Người Phụ Thuộc - {{ dependent.relationShip.name }}</div>
                <FloatLabel v-if="CMI_ID">
                    <InputText id="CMI_ID" v-model="CMI_ID" :readonly="true" />
                    <label for="CMI_ID">Mã thụ lý</label>
                </FloatLabel>
                <!-- Dynamic Selects -->
                <FloatLabel v-if="dynamicOptions['DOCUMENT_TYPE'] && dynamicOptions['DOCUMENT_TYPE'].length" readonly>
                    <label for="type_id">Loại giấy tờ</label>
                    <Select v-model="dependent.type_id" :options="dynamicOptions['DOCUMENT_TYPE']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="nationalID" v-model="dependent.citizenID" :readonly="true" />
                    <label for="nationalID">Số chứng minh</label>
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="nationalID" v-model="dependent.nationalID" :readonly="true" />
                    <label for="nationalID">Số Căn cước</label>
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="fullName" v-model="dependent.fullName" />
                    <label for="fullName">Họ tên</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <DatePicker id="dob" v-model="dependent.dateOfBirth" dateFormat="mm/dd/yy" />
                    <label for="dob">Ngày tháng năm sinh</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['GENDER'] && dynamicOptions['GENDER'].length">
                    <label for="gender">Giới tính</label>
                    <Select v-model="dependent.gender" :options="dynamicOptions['GENDER']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="address" v-model="dependent.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="issuingPlace" v-model="dependent.issuingPlace" />
                    <label for="issuingPlace">Nơi cấp</label>
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['NATIONALITY'] && dynamicOptions['NATIONALITY'].length">
                    <label for="nationality">Quốc tịch</label>
                    <Select v-model="dependent.nationality" :options="dynamicOptions['NATIONALITY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="visaNumber" v-model="dependent.visaNumber" />
                    <label for="visaNumber">Số thị thực nhập cảnh</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="mobilePhone" v-model="dependent.mobilePhone" />
                    <label for="mobilePhone">Số điện thoại di động</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="email" v-model="dependent.email" />
                    <label for="email">Email</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="age" v-model="dependent.age" />
                    <label for="age">Tuổi</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['EDUCATION'] && dynamicOptions['EDUCATION'].length">
                    <label for="education">Học lực {{ dependent.education }}</label>
                    <Select v-model="dependent.education" :options="dynamicOptions['EDUCATION']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MARITAL_STATUS'] && dynamicOptions['MARITAL_STATUS'].length">
                    <label for="maritalStatus">Tình trạng hôn nhân</label>
                    <Select v-model="dependent.maritalStatus" :options="dynamicOptions['MARITAL_STATUS']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MAJOR_CATEGORY'] && dynamicOptions['MAJOR_CATEGORY'].length">
                    <label for="majorCategory">Phân loại lớn</label>
                    <Select v-model="dependent.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['MEDIUM_CATEGORY'] && dynamicOptions['MEDIUM_CATEGORY'].length">
                    <label for="mediumCategory">Phân loại trung</label>
                    <Select v-model="dependent.mediumCategory" :options="dynamicOptions['MEDIUM_CATEGORY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MINOR_CATEGORY'] && dynamicOptions['MINOR_CATEGORY'].length">
                    <label for="minorCategory">Phân loại nhỏ</label>
                    <Select v-model="dependent.minorCategory" :options="dynamicOptions['MINOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="companyName" v-model="dependent.companyName" />
                    <label for="companyName">Tên công ty</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="position" v-model="dependent.position" />
                    <label for="position">Chức vụ</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="jobDescription" v-model="dependent.jobDescription" />
                    <label for="jobDescription">Nội dung nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="monthlyIncome" v-model="dependent.monthlyIncome" />
                    <label for="monthlyIncome">Thu nhập tháng</label>
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="postalCode" v-model="dependent.postalCode" />
                    <label for="postalCode">Mã vùng</label>
                </FloatLabel>
                <FloatLabel v-if="dependent">
                    <InputText id="companyPhone" v-model="dependent.companyPhone" />
                    <label for="companyPhone">Điện thoại công ty</label>
                </FloatLabel>

                <FloatLabel v-if="dependent">
                    <InputText id="branchNumber" v-model="dependent.branchNumber" />
                    <label for="branchNumber">Số máy nhánh</label>
                </FloatLabel>
                <!-- Repeat for other fields -->
            </div>
            <Button v-if="dependents.length > 0" label="Submit" icon="pi pi-check" @click="submitForm" />
        </div>
    </Fluid>
</template>

<style scoped lang="scss">
/* Add your custom styles here */
</style>
