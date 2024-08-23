<script>
import fetchOptionsMixin from '@/mixins/fetchOptionsMixin';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
    mixins: [fetchOptionsMixin],

    data() {
        return {
            buyer: {
                id: '',
                citizenID: '',
                fullName: '',
                dateOfBirth: null,
                gender: ''
                // Add other fields as necessary
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
        async loadBuyer(CMI_ID) {
            try {
                if (CMI_ID == null) {
                    this.messenger = 'Không tìm thấy mã thụ lý, vui lòng quay về trang "Danh sách các đơn thụ lý" và chọn đơn xử lý!';
                } else {
                    const response = await axios.get(`http://localhost:8082/v4/api/fortest/${CMI_ID}/buyer`);
                    if (response != null) {
                        this.toast.add({ severity: 'success', summary: 'Success', detail: 'Tra tìm thành công!', life: 3000 });
                        this.buyer = response.data;
                    }
                }
            } catch (error) {
                console.error('Failed to load buyer:', error);
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching buyer data.', life: 3000 });
            }
        },
        submitForm() {
            // Handle form submission logic here
            console.log('Submitting form with data:', this.buyer);
        }
    },
    mounted() {
        this.toast = useToast();
        this.fetchData();
        this.CMI_ID = sessionStorage.getItem('CMI_ID');
        if (!this.CMI_ID || this.CMI_ID == '') {
            this.messenger = 'Không tìm thấy mã thụ lý, vui lòng quay về trang "Danh sách các đơn thụ lý" và chọn đơn xử lý!';
        } else {
            this.loadBuyer(this.CMI_ID);
        }
    }
};
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <Message v-if="messenger !== null" severity="error">{{ messenger }}</Message>
            <div class="card flex flex-col gap-4" v-if="messenger == null">
                <div class="font-semibold text-xl">Bên Mua Bảo Hiểm</div>

                <!-- Dynamic Selects -->
                <FloatLabel v-if="dynamicOptions['DOCUMENT_TYPE'] && dynamicOptions['DOCUMENT_TYPE'].length">
                    <label for="type_id">Loại giấy tờ</label>
                    <Select v-model="buyer.type_id" :options="dynamicOptions['DOCUMENT_TYPE']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="buyer">
                    <InputText id="fullName" v-model="buyer.fullName" />
                    <label for="fullName">Họ tên</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <DatePicker id="dob" v-model="buyer.dateOfBirth" dateFormat="mm/dd/yy" />
                    <label for="dob">Ngày tháng năm sinh</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['GENDER'] && dynamicOptions['GENDER'].length">
                    <label for="gender">Giới tính</label>
                    <Select v-model="buyer.gender" :options="dynamicOptions['GENDER']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="buyer">
                    <InputText id="address" v-model="buyer.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="issuingPlace" v-model="buyer.issuingPlace" />
                    <label for="issuingPlace">Nơi cấp</label>
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['NATIONALITY'] && dynamicOptions['NATIONALITY'].length">
                    <label for="nationality">Quốc tịch</label>
                    <Select v-model="buyer.nationality" :options="dynamicOptions['NATIONALITY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="visaNumber" v-model="buyer.visaNumber" />
                    <label for="visaNumber">Số thị thực nhập cảnh</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="insuranceRelationship" v-model="buyer.insuranceRelationship" />
                    <label for="insuranceRelationship">Quan hệ bảo hiểm</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="mobilePhone" v-model="buyer.mobilePhone" />
                    <label for="mobilePhone">Số điện thoại di động</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="email" v-model="buyer.email" />
                    <label for="email">Email</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="age" v-model="buyer.age" />
                    <label for="age">Tuổi</label>
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['EDUCATION'] && dynamicOptions['EDUCATION'].length">
                    <label for="education">Học lực</label>
                    <Select v-model="buyer.education" :options="dynamicOptions['EDUCATION']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MARITAL_STATUS'] && dynamicOptions['MARITAL_STATUS'].length">
                    <label for="maritalStatus">Tình trạng hôn nhân</label>
                    <Select v-model="buyer.maritalStatus" :options="dynamicOptions['MARITAL_STATUS']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MAJOR_CATEGORY'] && dynamicOptions['MAJOR_CATEGORY'].length">
                    <label for="majorCategory">Phân loại lớn</label>
                    <Select v-model="buyer.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['MEDIUM_CATEGORY'] && dynamicOptions['MEDIUM_CATEGORY'].length">
                    <label for="mediumCategory">Phân loại trung</label>
                    <Select v-model="buyer.mediumCategory" :options="dynamicOptions['MEDIUM_CATEGORY']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="dynamicOptions['MINOR_CATEGORY'] && dynamicOptions['MINOR_CATEGORY'].length">
                    <label for="minorCategory">Phân loại nhỏ</label>
                    <Select v-model="buyer.minorCategory" :options="dynamicOptions['MINOR_CATEGORY']" optionLabel="name" />
                </FloatLabel>
                <FloatLabel v-if="dynamicOptions['JOBS_TYPE'] && dynamicOptions['JOBS_TYPE'].length">
                    <label>Nghề nghiệp</label>
                    <Select v-model="buyer.minorCategory" :options="dynamicOptions['JOBS_TYPE']" optionLabel="name" />
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="companyName" v-model="buyer.companyName" />
                    <label for="companyName">Tên công ty</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="position" v-model="buyer.position" />
                    <label for="position">Chức vụ</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="jobDescription" v-model="buyer.jobDescription" />
                    <label for="jobDescription">Nội dung nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="monthlyIncome" v-model="buyer.monthlyIncome" />
                    <label for="monthlyIncome">Thu nhập tháng</label>
                </FloatLabel>
                <FloatLabel v-if="buyer">
                    <InputText id="postalCode" v-model="buyer.postalCode" />
                    <label for="postalCode">Mã vùng</label>
                </FloatLabel>
                <FloatLabel v-if="buyer">
                    <InputText id="companyPhone" v-model="buyer.companyPhone" />
                    <label for="companyPhone">Điện thoại công ty</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="branchNumber" v-model="buyer.branchNumber" />
                    <label for="branchNumber">Số máy nhánh</label>
                </FloatLabel>
                <!-- Repeat for other fields -->

                <Button label="Submit" icon="pi pi-check" @click="submitForm" />
            </div>
        </div>
    </Fluid>
</template>

<!-- 
<template>
    <Fluid class="flex flex-col">
        <div class="">
            <Message v-if="messenger !== null" severity="error">{{ messenger }}</Message>
            <div class="card flex flex-col gap-4" v-if="messenger == null">
                <div class="font-semibold text-xl">Bên Mua Bảo Hiểm</div>
                 <FloatLabel v-if="buyer">
                    <InputText id="id" v-model="buyer.id" />
                    <label for="id">Số CMND</label>
                </FloatLabel>
                <FloatLabel v-if="buyer">
                    <InputText id="citizenID" v-model="buyer.citizenID" />
                    <label for="citizenID">Số CCCD</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="fullName" v-model="buyer.fullName" />
                    <label for="fullName">Họ tên</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <DatePicker id="dob" v-model="buyer.dateOfBirth" dateFormat="mm/dd/yy" />
                    <label for="dob">Ngày tháng năm sinh</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="gender" v-model="buyer.gender" />
                    <label for="gender">Giới tính</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="address" v-model="buyer.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="issuingPlace" v-model="buyer.issuingPlace" />
                    <label for="issuingPlace">Nơi cấp</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="nationality" v-model="buyer.nationality" />
                    <label for="nationality">Quốc tịch</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="visaNumber" v-model="buyer.visaNumber" />
                    <label for="visaNumber">Số thị thực nhập cảnh</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="insuranceRelationship" v-model="buyer.insuranceRelationship" />
                    <label for="insuranceRelationship">Quan hệ bảo hiểm</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="mobilePhone" v-model="buyer.mobilePhone" />
                    <label for="mobilePhone">Số điện thoại di động</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="email" v-model="buyer.email" />
                    <label for="email">Email</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="age" v-model="buyer.age" />
                    <label for="age">Tuổi</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="education" v-model="buyer.education" />
                    <label for="education">Học lực</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="maritalStatus" v-model="buyer.maritalStatus" />
                    <label for="maritalStatus">Tình trạng hôn nhân</label>
                </FloatLabel>
                <FloatLabel>
                    <label for="profession">Nghề nghiệp</label>
                    <Select v-model="selectedJob" :options="options.JOBS" optionLabel="name" placeholder="Select JOBS" />
                    ${{ selectedJob }}
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="profession" v-model="buyer.profession" />
                    <label for="profession">Nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="majorCategory" v-model="buyer.majorCategory" />
                    <label for="majorCategory">Phân loại lớn</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="mediumCategory" v-model="buyer.mediumCategory" />
                    <label for="mediumCategory">Phân loại trung</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="minorCategory" v-model="buyer.minorCategory" />
                    <label for="minorCategory">Phân loại nhỏ</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="companyName" v-model="buyer.companyName" />
                    <label for="companyName">Tên công ty</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="position" v-model="buyer.position" />
                    <label for="position">Chức vụ</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="jobDescription" v-model="buyer.jobDescription" />
                    <label for="jobDescription">Nội dung nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="monthlyIncome" v-model="buyer.monthlyIncome" />
                    <label for="monthlyIncome">Thu nhập tháng</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="postalCode" v-model="buyer.postalCode" />
                    <label for="postalCode">Mã vùng</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="companyPhone" v-model="buyer.companyPhone" />
                    <label for="companyPhone">Điện thoại công ty</label>
                </FloatLabel>

                <FloatLabel v-if="buyer">
                    <InputText id="branchNumber" v-model="buyer.branchNumber" />
                    <label for="branchNumber">Số máy nhánh</label>
                </FloatLabel> 

                <Button label="Submit" icon="pi pi-check" @click="submitForm" />
            </div>
        </div>
    </Fluid>
</template> -->

<style scoped lang="scss">
/* Add your custom styles here */
</style>
