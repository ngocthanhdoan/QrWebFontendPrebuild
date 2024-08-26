<script>
import fetchOptionsMixin from '@/mixins/fetchOptionsMixin';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
    mixins: [fetchOptionsMixin],

    data() {
        return {
            insured: {
                id: '',
                type_id: {},
                nationalID: '',
                citizenID: '',
                fullName: '',
                dateOfBirth: '',
                gender: {},
                address: '',
                issuingPlace: '',
                nationality: {},
                visaNumber: '',
                insuranceRelationship: '',
                mobilePhone: '',
                email: '',
                age: '',
                education: {},
                maritalStatus: {},
                profession: {},
                majorCategory: {},
                mediumCategory: {},
                minorCategory: {},
                companyName: '',
                position: '',
                jobDescription: '',
                monthlyIncome: '',
                postalCode: '',
                companyPhone: '',
                branchNumber: ''
            },
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
                const response = await axios.get('http://localhost:8082/v4/api/data');
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
                const response = await axios.get(`http://localhost:8082/v4/api/data/prefix/${prefix}`);
                this.dynamicOptions[prefix] = response.data.map((item) => ({
                    code: item.key,
                    name: item.value
                }));
                this.selectedOptions[prefix] = ''; // Initialize selected value
            } catch (error) {
                console.error(`Error fetching options for prefix ${prefix}:`, error);
            }
        },
        async loadinsured(CMI_ID) {
            try {
                if (CMI_ID == null) {
                    this.messenger = 'Không tìm thấy mã thụ lý, vui lòng quay về trang "Danh sách các đơn thụ lý" và chọn đơn xử lý!';
                } else {
                    const response = await axios.get(`http://localhost:8082/v4/api/fortest/${CMI_ID}/insured`);
                    if (response != null) {
                        this.toast.add({ severity: 'success', summary: 'Success', detail: 'Tra tìm thành công!', life: 3000 });
                        this.insured = response.data;
                    }
                }
            } catch (error) {
                console.error('Failed to load insured:', error);
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching insured data.', life: 3000 });
            }
        },
        async submitForm() {
            try {
                console.log(this.insured);
                const response = await axios.put(`http://localhost:8082/v4/api/fortest/${this.CMI_ID}/insured`, this.insured);
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
            this.loadinsured(this.CMI_ID);
        }
    }
};
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <Message v-if="messenger !== null" severity="error">{{ messenger }}</Message>
            <div class="card flex flex-col gap-4" v-if="messenger == null">
                <div class="font-semibold text-xl">Người được bảo hiểm</div>
                <FloatLabel v-if="CMI_ID">
                    <InputText id="CMI_ID" v-model="CMI_ID" :readonly="true" />
                    <label for="CMI_ID">Mã thụ lý</label>
                </FloatLabel>
                <!-- Dynamic Selects -->
                <FloatLabel v-if="dynamicOptions['DOCUMENT_TYPE'] && dynamicOptions['DOCUMENT_TYPE'].length" readonly>
                    <label for="type_id">Loại giấy tờ</label>
                    <Select v-model="insured.type_id" :options="dynamicOptions['DOCUMENT_TYPE']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="nationalID" v-model="insured.citizenID" :readonly="true" />
                    <label for="nationalID">Số chứng minh</label>
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="nationalID" v-model="insured.nationalID" :readonly="true" />
                    <label for="nationalID">Số Căn cước</label>
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="fullName" v-model="insured.fullName" />
                    <label for="fullName">Họ tên</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <DatePicker id="dob" v-model="insured.dateOfBirth" dateFormat="mm/dd/yy" />
                    <label for="dob">Ngày tháng năm sinh</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['GENDER'] && dynamicOptions['GENDER'].length">
                    <label for="gender">Giới tính</label>
                    <Select v-model="insured.gender" :options="dynamicOptions['GENDER']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="address" v-model="insured.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="issuingPlace" v-model="insured.issuingPlace" />
                    <label for="issuingPlace">Nơi cấp</label>
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['NATIONALITY'] && dynamicOptions['NATIONALITY'].length">
                    <label for="nationality">Quốc tịch</label>
                    <Select v-model="insured.nationality" :options="dynamicOptions['NATIONALITY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="visaNumber" v-model="insured.visaNumber" />
                    <label for="visaNumber">Số thị thực nhập cảnh</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="insuranceRelationship" v-model="insured.insuranceRelationship" />
                    <label for="insuranceRelationship">Quan hệ bảo hiểm</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="mobilePhone" v-model="insured.mobilePhone" />
                    <label for="mobilePhone">Số điện thoại di động</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="email" v-model="insured.email" />
                    <label for="email">Email</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="age" v-model="insured.age" />
                    <label for="age">Tuổi</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['EDUCATION'] && dynamicOptions['EDUCATION'].length">
                    <label for="education">Học lực {{ insured.education }}</label>
                    <Select v-model="insured.education" :options="dynamicOptions['EDUCATION']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MARITAL_STATUS'] && dynamicOptions['MARITAL_STATUS'].length">
                    <label for="maritalStatus">Tình trạng hôn nhân</label>
                    <Select v-model="insured.maritalStatus" :options="dynamicOptions['MARITAL_STATUS']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MAJOR_CATEGORY'] && dynamicOptions['MAJOR_CATEGORY'].length">
                    <label for="majorCategory">Phân loại lớn</label>
                    <Select v-model="insured.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['MEDIUM_CATEGORY'] && dynamicOptions['MEDIUM_CATEGORY'].length">
                    <label for="mediumCategory">Phân loại trung</label>
                    <Select v-model="insured.mediumCategory" :options="dynamicOptions['MEDIUM_CATEGORY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MINOR_CATEGORY'] && dynamicOptions['MINOR_CATEGORY'].length">
                    <label for="minorCategory">Phân loại nhỏ</label>
                    <Select v-model="insured.minorCategory" :options="dynamicOptions['MINOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="companyName" v-model="insured.companyName" />
                    <label for="companyName">Tên công ty</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="position" v-model="insured.position" />
                    <label for="position">Chức vụ</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="jobDescription" v-model="insured.jobDescription" />
                    <label for="jobDescription">Nội dung nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="monthlyIncome" v-model="insured.monthlyIncome" />
                    <label for="monthlyIncome">Thu nhập tháng</label>
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="postalCode" v-model="insured.postalCode" />
                    <label for="postalCode">Mã vùng</label>
                </FloatLabel>
                <FloatLabel v-if="insured">
                    <InputText id="companyPhone" v-model="insured.companyPhone" />
                    <label for="companyPhone">Điện thoại công ty</label>
                </FloatLabel>

                <FloatLabel v-if="insured">
                    <InputText id="branchNumber" v-model="insured.branchNumber" />
                    <label for="branchNumber">Số máy nhánh</label>
                </FloatLabel>
                <!-- Repeat for other fields -->

                <Button label="Submit" icon="pi pi-check" @click="submitForm" />
            </div>
        </div>
    </Fluid>
</template>

<style scoped lang="scss">
/* Add your custom styles here */
</style>
