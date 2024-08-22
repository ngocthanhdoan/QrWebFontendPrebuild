<script setup>
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker'; // Assuming you have DatePicker for date fields

const form = ref({
    documentType: '',
    documentNumber: '',
    issueDate: '',
    issuingPlace: '',
    fullName: '',
    nationality: '',
    visaNumber: '',
    gender: '',
    insuranceRelationship: '',
    dob: '',
    mobilePhone: '',
    email: '',
    age: '',
    education: '',
    maritalStatus: '',
    permanentAddress: '',
    contactAddress: '',
    profession: '',
    majorCategory: '',
    mediumCategory: '',
    minorCategory: '',
    companyName: '',
    position: '',
    jobDescription: '',
    monthlyIncome: '',
    address: '',
    postalCode: '',
    companyPhone: '',
    branchNumber: ''
});

function submitForm() {
    console.log('Form data:', form.value);
    // Add your form submission logic here
}
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Customer Form</div>

                <FloatLabel>
                    <InputText id="documentType" v-model="form.documentType" />
                    <label for="documentType">Loại giấy tờ</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="documentNumber" v-model="form.documentNumber" />
                    <label for="documentNumber">Số</label>
                </FloatLabel>

                <FloatLabel>
                    <DatePicker id="issueDate" v-model="form.issueDate" dateFormat="mm/dd/yy" />
                    <label for="issueDate">Ngày cấp</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="issuingPlace" v-model="form.issuingPlace" />
                    <label for="issuingPlace">Nơi cấp</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="fullName" v-model="form.fullName" />
                    <label for="fullName">Họ tên (Viết chữ hoa)</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="nationality" v-model="form.nationality" />
                    <label for="nationality">Quốc Tịch</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="visaNumber" v-model="form.visaNumber" />
                    <label for="visaNumber">Số thị thực nhập cảnh</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="gender" v-model="form.gender" />
                    <label for="gender">Giới tính</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="insuranceRelationship" v-model="form.insuranceRelationship" />
                    <label for="insuranceRelationship">Quan hệ bảo hiểm</label>
                </FloatLabel>

                <FloatLabel>
                    <DatePicker id="dob" v-model="form.dob" dateFormat="mm/dd/yy" />
                    <label for="dob">Ngày tháng năm sinh</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="mobilePhone" v-model="form.mobilePhone" />
                    <label for="mobilePhone">Số điện thoại di động</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="email" v-model="form.email" />
                    <label for="email">Email</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="age" v-model="form.age" />
                    <label for="age">Tuổi</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="education" v-model="form.education" />
                    <label for="education">Học lực</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="maritalStatus" v-model="form.maritalStatus" />
                    <label for="maritalStatus">Tình trạng hôn nhân</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="permanentAddress" v-model="form.permanentAddress" />
                    <label for="permanentAddress">Địa chỉ thường trú</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="contactAddress" v-model="form.contactAddress" />
                    <label for="contactAddress">Địa chỉ liên lạc</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="profession" v-model="form.profession" />
                    <label for="profession">Nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="majorCategory" v-model="form.majorCategory" />
                    <label for="majorCategory">Phân loại lớn</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="mediumCategory" v-model="form.mediumCategory" />
                    <label for="mediumCategory">Phân loại trung</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="minorCategory" v-model="form.minorCategory" />
                    <label for="minorCategory">Phân loại nhỏ</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="companyName" v-model="form.companyName" />
                    <label for="companyName">Tên công ty</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="position" v-model="form.position" />
                    <label for="position">Chức vụ</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="jobDescription" v-model="form.jobDescription" />
                    <label for="jobDescription">Nội dung nghề nghiệp</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="monthlyIncome" v-model="form.monthlyIncome" />
                    <label for="monthlyIncome">Thu nhập tháng</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="address" v-model="form.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="postalCode" v-model="form.postalCode" />
                    <label for="postalCode">Mã vùng</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="companyPhone" v-model="form.companyPhone" />
                    <label for="companyPhone">Điện thoại công ty</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="branchNumber" v-model="form.branchNumber" />
                    <label for="branchNumber">Số máy nhánh</label>
                </FloatLabel>

                <Button label="Submit" icon="pi pi-check" @click="submitForm" />
            </div>
        </div>
    </Fluid>
</template>

<style scoped lang="scss">
/* Add your custom styles here */
</style>
