<script>
import fetchOptionsMixin from '@/mixins/fetchOptionsMixin';
import axios from 'axios';

export default {
    mixins: [fetchOptionsMixin],

    data() {
        return {
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
        clearCMI() {
            sessionStorage.setItem('CMI_ID', '');
        }
    },
    mounted() {
        // Optionally load data when component is mounted
        this.fetchData();
    }
};
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <h2>Select Examples</h2>

            <!-- Dynamically generated Select components -->
            <div v-for="(options, prefix) in dynamicOptions" :key="prefix">
                <Select v-model="selectedOptions[prefix]" :options="options" optionLabel="name" :placeholder="'MEMO :' + prefix" />
                <div class="card flex flex-col gap-4 w-full mt-8" v-if="selectedOptions[prefix]">
                    <pre><code>{{ selectedOptions[prefix] }}</code></pre>
                </div>
            </div>

            <Button label="Clear Cache CMI" @click="clearCMI" />

            <h2>DATA TESTING---</h2>
            <div class="card flex flex-col gap-4 w-full mt-8">
                <pre><code>
[
  {
    "id": "1234567890",
    "insured": {
      "id": "2453494545",
      "type_id": {
        "code": "ID_CARD",
        "name": "Chứng minh nhân dân"
      },
      "nationalID": "123456789",
      "citizenID": "987654321",
      "fullName": "Nguyễn Văn A",
      "dateOfBirth": "01/01/1990",
      "gender": {
        "code": "MALE",
        "name": "Nam"
      },
      "address": "123 Đường ABC, Quận 1, TP.HCM",
      "issuingPlace": "Công an TP.HCM",
      "nationality": {
        "code": "VN",
        "name": "Việt Nam"
      },
      "visaNumber": "VN123456",
      "insuranceRelationship": "Bảo hiểm sức khỏe",
      "mobilePhone": "0901234567",
      "email": "nguyen@example.com",
      "age": "34",
      "education": {
        "code": "BACHELOR",
        "name": "Cử nhân"
      },
      "maritalStatus": {
        "code": "SINGLE",
        "name": "Độc thân"
      },
      "profession": {
        "code": "ENGINEER",
        "name": "Kỹ sư"
      },
      "majorCategory": {
        "code": "IT",
        "name": "Công nghệ thông tin"
      },
      "mediumCategory": {
        "code": "SOFTWARE",
        "name": "Phần mềm"
      },
      "minorCategory": {
        "code": "DEVELOPER",
        "name": "Lập trình viên"
      },
      "companyName": "Công ty ABC",
      "position": "Giám đốc",
      "jobDescription": "Quản lý dự án",
      "monthlyIncome": "10000000",
      "postalCode": "700000",
      "companyPhone": "02812345678",
      "branchNumber": "123"
    },
    "buyer": {
      "id": "2453494545",
      "type_id": {
        "code": "ID_CARD",
        "name": "Chứng minh nhân dân"
      },
      "nationalID": "123456789",
      "citizenID": "987654321",
      "fullName": "Nguyễn Văn A",
      "dateOfBirth": "01/01/1990",
      "gender": {
        "code": "MALE",
        "name": "Nam"
      },
      "address": "123 Đường ABC, Quận 1, TP.HCM",
      "issuingPlace": "Công an TP.HCM",
      "nationality": {
        "code": "VN",
        "name": "Việt Nam"
      },
      "visaNumber": "VN123456",
      "insuranceRelationship": "Bảo hiểm sức khỏe",
      "mobilePhone": "0901234567",
      "email": "nguyen@example.com",
      "age": "34",
      "education": {
        "code": "BACHELOR",
        "name": "Cử nhân"
      },
      "maritalStatus": {
        "code": "SINGLE",
        "name": "Độc thân"
      },
      "profession": {
        "code": "ENGINEER",
        "name": "Kỹ sư"
      },
      "majorCategory": {
        "code": "IT",
        "name": "Công nghệ thông tin"
      },
      "mediumCategory": {
        "code": "SOFTWARE",
        "name": "Phần mềm"
      },
      "minorCategory": {
        "code": "DEVELOPER",
        "name": "Lập trình viên"
      },
      "companyName": "Công ty ABC",
      "position": "Giám đốc",
      "jobDescription": "Quản lý dự án",
      "monthlyIncome": "10000000",
      "postalCode": "700000",
      "companyPhone": "02812345678",
      "branchNumber": "123"
    },
    "dependents": null
  }
]
                </code></pre>
            </div>
        </div>
    </Fluid>
</template>
