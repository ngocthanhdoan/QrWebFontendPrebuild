<script>
import fetchOptionsMixin from '@/mixins/fetchOptionsMixin';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

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
                branchNumber: '',
                relationShip: {}
            },
            buyer: {
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
                relationShip: {},
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
            dependents: [],
            toast: null,
            CMI_ID: null,
            selectedOptions: {},
            dynamicOptions: {},
            showQRBuyer: false,
            showQRInsured: false,
            fileInputRefBuyer: ref(null), // Reference to file input element for Buyer
            fileInputRefInsured: ref(null),
            loading: false,
            showImageBuyer: false,
            showImageInsure: false
        };
    },
    computed: {
        isCitizenIDBuyer() {
            return this.buyer.type_id.code === 'ID_CARD_1';
        },
        isCitizenIDInsured() {
            return this.insured.type_id.code === 'ID_CARD_1';
        }
    },
    methods: {
        async fetchData() {
            this.loading = true; // Set loading to true before starting API call
            try {
                const response = await axios.get('/v4/api/data');
                const prefixes = this.extractPrefixes(response.data);
                await Promise.all(prefixes.map((prefix) => this.fetchAuto(prefix)));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.loading = false; // Set loading to false when API call is complete
            }
        },
        extractPrefixes(data) {
            return [...new Set(data.map((item) => item.prefix))];
        },
        async fetchAuto(prefix) {
            this.loading = true; // Set loading to true before starting API call
            try {
                const response = await axios.get(`/v4/api/data/prefix/${prefix}`);
                this.dynamicOptions[prefix] = response.data.map((item) => ({
                    code: item.key,
                    name: item.value
                }));
                this.selectedOptions[prefix] = '';
            } catch (error) {
                console.error(`Error fetching options for prefix ${prefix}:`, error);
            } finally {
                this.loading = false; // Set loading to false when API call is complete
            }
        },
        calculateAge(dateOfBirth) {
            if (!dateOfBirth) return '';
            const birthDate = new Date(dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        updateAge() {
            this.insured.age = this.calculateAge(this.insured.dateOfBirth);
            this.buyer.age = this.calculateAge(this.buyer.dateOfBirth);
            this.dependents.forEach((dependent) => {
                dependent.age = this.calculateAge(dependent.dateOfBirth);
            });
        },
        validateForm() {
            const errors = [];
            if (!this.buyer.nationalID) errors.push('Số chứng minh nhân dân của bên mua bảo hiểm là bắt buộc.');
            if (!this.buyer.fullName) errors.push('Họ tên của bên mua bảo hiểm là bắt buộc.');
            if (!this.insured.nationalID) errors.push('Số chứng minh nhân dân của người được bảo hiểm là bắt buộc.');
            if (!this.insured.fullName) errors.push('Họ tên của người được bảo hiểm là bắt buộc.');

            // Validate email
            // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if (this.buyer.email && !emailPattern.test(this.buyer.email)) {
            //     errors.push('Email của bên mua bảo hiểm không hợp lệ.');
            // }

            // Validate phone number (example pattern, you may need to adjust)
            // const phonePattern = /^[0-9]{10,15}$/;
            // if (this.buyer.mobilePhone && !phonePattern.test(this.buyer.mobilePhone)) {
            //     errors.push('Số điện thoại của bên mua bảo hiểm không hợp lệ.');
            // }

            // Validate date format (example pattern for dd/mm/yyyy)
            // const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            // if (this.buyer.dateOfBirth && !datePattern.test(this.buyer.dateOfBirth)) {
            //     errors.push('Ngày sinh của bên mua bảo hiểm không hợp lệ.');
            // }

            // Validate dependents' data
            this.dependents.forEach((dependent, index) => {
                if (!dependent.nationalID) errors.push(`Số chứng minh nhân dân của người phụ thuộc ${index + 1} là bắt buộc.`);
                if (!dependent.fullName) errors.push(`Họ tên của người phụ thuộc ${index + 1} là bắt buộc.`);
            });

            return errors;
        },
        async submitForm() {
            const errors = this.validateForm();
            if (errors.length > 0) {
                errors.forEach((error) => this.toast.add({ severity: 'error', summary: 'Lỗi', detail: error, life: 3000 }));
                return;
            }

            console.log('Submitting form with data:', this.insured, this.dependents);
            this.insured.id = this.insured.nationalID;
            this.buyer.id = this.buyer.nationalID;
            var data = {
                id: this.uuidv4(),
                insured: this.insured,
                buyer: this.buyer,
                dependents: this.dependents
            };
            console.log(JSON.stringify(data));

            // Perform the API call to submit the form
            this.loading = true;
            try {
                const response = await axios.post('/v1/api/DataForTesting', data);
                if (response.data.status === 'success') {
                    this.toast.add({ severity: 'success', summary: 'Thành công', detail: response.data.message, life: 3000 });
                } else {
                    this.toast.add({ severity: 'error', summary: 'Lỗi', detail: response.data.message, life: 3000 });
                }
                console.log(response);
            } catch (error) {
                console.error('Error submitting form:', error);
                this.toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể gửi dữ liệu.', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        uuidv4() {
            return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16));
        },
        addDependent() {
            this.dependents.push({
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
                relationShip: {},
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
            });
        },
        removeDependent(index) {
            this.dependents.splice(index, 1);
        },
        onBuyerTypeChange() {
            this.showQRBuyer = this.isCitizenIDBuyer;
        },
        onInsuredTypeChange() {
            this.showQRInsured = this.isCitizenIDInsured;
        },
        formatDate(dateStr) {
            if (!dateStr || dateStr.length !== 8) return '';
            const day = dateStr.substring(0, 2);
            const month = dateStr.substring(2, 4);
            const year = dateStr.substring(4, 8);
            return `${day}/${month}/${year}`;
        },

        async handleFileUploadBuyer() {
            const fileInput = this.$refs.fileInputRefBuyer;

            if (!fileInput || fileInput.files.length === 0) {
                this.toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a file to upload.', life: 3000 });
                return;
            }

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            this.loading = true; // Set loading to true before starting API call

            try {
                const response = await axios.post('/api/process-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.status === 'success') {
                    this.updateFormWithResponse(response.data.detections[0].message, 'buyer');
                    this.toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
                } else if (response.data.status === 'warning') {
                    this.updateFormWithResponse(response.data.new_data, 'buyer');
                    this.toast.add({ severity: 'warn', summary: 'Warning', detail: response.data.message, life: 3000 });
                } else {
                    this.toast.add({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
                    this.showImageBuyer = false;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload file.', life: 3000 });
                this.showImageBuyer = false;
            } finally {
                this.loading = false; // Set loading to false when API call is complete
            }
        },

        // Xử lý quét mã QR của người được bảo hiểm
        async handleFileUploadInsured() {
            const fileInput = this.$refs.fileInputRefInsured;

            if (!fileInput || fileInput.files.length === 0) {
                this.toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a file to upload.', life: 3000 });
                this.showImageBuyer = false;
                this.showImageInsure = false;
                return;
            }

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            this.loading = true; // Set loading to true before starting API call

            try {
                const response = await axios.post('/api/process-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.status === 'success') {
                    this.updateFormWithResponse(response.data.detections[0].message, 'insured');
                    this.toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
                } else if (response.data.status === 'warning') {
                    this.updateFormWithResponse(response.data.new_data, 'insured');
                    this.toast.add({ severity: 'warn', summary: 'Warning', detail: response.data.message, life: 3000 });
                } else {
                    this.toast.add({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
                    this.showImageInsure = false;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                this.showImageInsure = false;
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload file.', life: 3000 });
            } finally {
                this.loading = false; // Set loading to false when API call is complete
            }
        },

        // Cập nhật form với dữ liệu từ phản hồi
        updateFormWithResponse(data, type) {
            console.log(data);
            const formattedDateOfBirth = this.formatDate(data.birth_date);
            var gender;
            if (data.gender == 'Nam') {
                gender = { code: 'MALE', name: 'Nam' };
            } else {
                gender = { code: 'FEMALE', name: 'Nữ' };
            }
            if (type === 'buyer') {
                this.buyer.nationalID = data.id_identity_card || '';
                this.buyer.citizenID = data.id_passport || '';
                this.buyer.fullName = data.fullname || '';
                this.buyer.dateOfBirth = formattedDateOfBirth || '';
                this.buyer.gender = gender || '';
                this.buyer.address = data.address || '';
                this.showImageBuyer = true;
            } else if (type === 'insured') {
                this.insured.nationalID = data.id_identity_card || '';
                this.insured.citizenID = data.id_passport || '';
                this.insured.fullName = data.fullname || '';
                this.insured.dateOfBirth = formattedDateOfBirth || '';
                this.insured.gender = gender || '';
                this.insured.address = data.address || '';
                this.showImageInsure = true;
            }
        }
    },
    watch: {
        'insured.dateOfBirth': 'updateAge',
        'buyer.dateOfBirth': 'updateAge',
        dependents: {
            handler() {
                this.updateAge();
            },
            deep: true
        },
        'buyer.type_id': 'onBuyerTypeChange',
        'insured.type_id': 'onInsuredTypeChange'
    },
    mounted() {
        this.toast = useToast();
        this.fetchData();
    }
};
</script>

<template>
    <div class="p-6">
        <!-- Form Bên Mua Bảo Hiểm -->
        <div class="card p-6 mb-6 w-full">
            <h2 class="text-xl font-semibold mb-4">Bên Mua Bảo Hiểm</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="dynamicOptions['DOCUMENT_TYPE'] && dynamicOptions['DOCUMENT_TYPE'].length" class="flex flex-col">
                    <label for="buyerDocumentType" class="mb-2">Loại giấy tờ</label>
                    <Select id="buyerDocumentType" v-model="buyer.type_id" :options="dynamicOptions['DOCUMENT_TYPE']" optionLabel="name" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerIdNumber" class="mb-2">Số chứng minh nhân dân</label>
                    <InputText id="buyerIdNumber" v-model="buyer.nationalID" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerCitizenID" class="mb-2">Số căn cước công dân</label>
                    <InputText id="buyerCitizenID" v-model="buyer.citizenID" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerFullName" class="mb-2">Họ tên</label>
                    <InputText id="buyerFullName" v-model="buyer.fullName" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerAddress" class="mb-2">Địa chỉ</label>
                    <InputText id="buyerAddress" v-model="buyer.address" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerBirthdate" class="mb-2">Ngày sinh</label>
                    <DatePicker id="buyerBirthdate" v-model="buyer.dateOfBirth" />
                </div>
                <div class="flex flex-col">
                    <label for="buyerAge" class="mb-2">Tuổi</label>
                    <InputText id="buyerAge" v-model="buyer.age" readonly="true" type="text" />
                </div>
                <div v-if="dynamicOptions['MAJOR_CATEGORY'] && dynamicOptions['MAJOR_CATEGORY'].length" class="flex flex-col">
                    <label for="buyerJob" class="mb-2">Nghề Nghiệp</label>
                    <Select id="buyerJob" v-model="buyer.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" />
                </div>
                <div v-if="dynamicOptions['GENDER'] && dynamicOptions['GENDER'].length" class="flex flex-col">
                    <label for="buyerGender" class="mb-2">Giới Tính</label>
                    <Select id="buyerGender" v-model="buyer.gender" :options="dynamicOptions['GENDER']" optionLabel="name" placeholder="Chọn giới tính" />
                </div>
                <div v-if="showQRBuyer" class="flex items-center mt-6">
                    <div>
                        <input type="file" ref="fileInputRefBuyer" @change="handleFileUploadBuyer" style="display: none" />
                        <Button id="btn1" label="Nhận diện nhanh thông tin qua mã QR CCCD" @click="$refs.fileInputRefBuyer.click()" />
                    </div>
                    <div v-if="showImageBuyer">
                        <Image :src="`/api/card-image/${buyer.citizenID}`" :alt="`${insured.buyer}`" width="250" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Người Được Bảo Hiểm -->
        <div class="card p-6 mt-8 w-full">
            <h2 class="text-xl font-semibold mb-4">Người Được Bảo Hiểm</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="dynamicOptions['DOCUMENT_TYPE'] && dynamicOptions['DOCUMENT_TYPE'].length" class="flex flex-col">
                    <label for="insuredDocumentType" class="mb-2">Loại giấy tờ</label>
                    <Select id="insuredDocumentType" v-model="insured.type_id" :options="dynamicOptions['DOCUMENT_TYPE']" optionLabel="name" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredIdNumber" class="mb-2">Số chứng minh nhân dân</label>
                    <InputText id="insuredIdNumber" v-model="insured.nationalID" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredCitizenID" class="mb-2">Số căn cước công dân</label>
                    <InputText id="insuredCitizenID" v-model="insured.citizenID" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredFullName" class="mb-2">Họ tên</label>
                    <InputText id="insuredFullName" v-model="insured.fullName" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredAddress" class="mb-2">Địa chỉ</label>
                    <InputText id="insuredAddress" v-model="insured.address" type="text" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredBirthdate" class="mb-2">Ngày sinh</label>
                    <DatePicker id="insuredBirthdate" v-model="insured.dateOfBirth" />
                </div>
                <div class="flex flex-col">
                    <label for="insuredAge" class="mb-2">Tuổi</label>
                    <InputText id="insuredAge" v-model="insured.age" readonly="true" type="text" />
                </div>
                <div v-if="dynamicOptions['MAJOR_CATEGORY'] && dynamicOptions['MAJOR_CATEGORY'].length" class="flex flex-col">
                    <label for="insuredJob" class="mb-2">Nghề Nghiệp</label>
                    <Select id="insuredJob" v-model="insured.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" />
                </div>
                <div class="flex flex-col md:flex-row gap-4 mt-6">
                    <div class="flex flex-col w-full md:w-1/2">
                        <label for="insuredGender" class="mb-2">Giới Tính</label>
                        <Select id="insuredGender" v-model="insured.gender" :options="dynamicOptions['GENDER']" optionLabel="name" placeholder="Chọn giới tính" />
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="insuredGender" class="mb-2">Người Phụ Thuộc</label>
                    <Button label="Thêm Người Phụ Thuộc" class="p-button-info" @click="addDependent" />
                </div>
                <div v-if="showQRInsured" class="flex flex-col">
                    <label for="insuredGender" class="mb-2">Nhập nhanh thông tin</label>
                    <input type="file" ref="fileInputRefInsured" @change="handleFileUploadInsured" style="display: none" />
                    <Button id="btn2" label="Nhận diện nhanh thông tin qua mã QR CCCD" @click="$refs.fileInputRefInsured.click()" />
                </div>
                <div v-if="showImageInsure">
                    <Image :src="`/api/card-image/${insured.citizenID}`" :alt="`${insured.citizenID}`" width="250" />
                </div>
            </div>
        </div>

        <!-- Form Người Phụ Thuộc -->
        <div class="card p-6 mt-8 w-full">
            <h2 class="text-xl font-semibold mb-4">Người Phụ Thuộc</h2>
            <div v-for="(dependent, index) in dependents" :key="index" class="bg-gray-100 p-4 rounded-lg mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-if="dynamicOptions['RELATIONSHIP'] && dynamicOptions['RELATIONSHIP'].length" class="flex flex-col">
                        <label for="insuredJob" class="mb-2">Loại đối tượng</label>
                        <Select id="insuredJob" v-model="insured.relationShip" :options="dynamicOptions['RELATIONSHIP']" optionLabel="name" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentIdNumber_' + index" class="mb-2">Số chứng minh nhân dân</label>
                        <InputText :id="'dependentIdNumber_' + index" v-model="dependent.nationalID" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentCitizenID_' + index" class="mb-2">Số căn cước công dân</label>
                        <InputText :id="'dependentCitizenID_' + index" v-model="dependent.citizenID" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentFullName_' + index" class="mb-2">Họ tên</label>
                        <InputText :id="'dependentFullName_' + index" v-model="dependent.fullName" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentAddress_' + index" class="mb-2">Địa chỉ</label>
                        <InputText :id="'dependentAddress_' + index" v-model="dependent.address" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentBirthdate_' + index" class="mb-2">Ngày sinh</label>
                        <DatePicker :id="'dependentBirthdate_' + index" v-model="dependent.dateOfBirth" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentAge_' + index" class="mb-2">Tuổi</label>
                        <InputText :id="'dependentAge_' + index" readonly="true" v-model="dependent.age" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentGender_' + index" class="mb-2">Giới Tính</label>
                        <Select :id="'dependentGender_' + index" v-model="dependent.gender" :options="dynamicOptions['GENDER']" optionLabel="name" placeholder="Chọn giới tính" />
                    </div>
                    <div class="flex flex-col">
                        <label :for="'dependentJob_' + index" class="mb-2">Nghề Nghiệp</label>
                        <Select :id="'dependentJob_' + index" v-model="dependent.majorCategory" :options="dynamicOptions['MAJOR_CATEGORY']" optionLabel="name" placeholder="Chọn nghề nghiệp" />
                    </div>
                    <div class="flex flex-col">
                        <label for="insuredGender" class="mb-2">Hành động</label>
                        <Button label="Xóa" class="p-button-danger" @click="removeDependent(index)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card p-6 mt-8 w-full">
            <h2 class="text-xl font-semibold mb-4">Hoàn thành thư giới thiệu</h2>
            <!-- Submit Button -->
            <div class="flex justify-start mt-4">
                <Button label="Xác nhận thông tin và gửi đi" @click="submitForm" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add styles here if needed */
</style>
