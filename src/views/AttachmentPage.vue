<template>
    <Fluid>
        <div class="flex flex-col gap-8">
            <!-- Upload and Compare Section for Multiple People -->
            <div v-for="(person, index) in people" :key="index" class="flex flex-col md:flex-row gap-8 mb-8">
                <!-- Upload Section for a Person (Left Side) -->
                <div class="card flex-1 flex flex-col gap-4 p-4">
                    <div class="font-semibold text-xl">{{ index + 1 }}. Upload ID Cards for {{ person.type }}</div>
                    <div class="font-semibold text-xl">{{ person.fullName }}</div>

                    <!-- 2x2 Grid Layout for Upload and Images -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Front Side Upload -->
                        <div class="flex flex-col gap-2">
                            <label :for="'front-upload-' + index" class="font-medium">Upload Front Side</label>
                            <input :id="'front-upload-' + index" type="file" accept="image/*" @change="(event) => handleUpload(event, index, 'front')" class="border rounded p-2" />
                        </div>
                        <!-- Back Side Upload -->
                        <div class="flex flex-col gap-2">
                            <label :for="'back-upload-' + index" class="font-medium">Upload Back Side</label>
                            <input :id="'back-upload-' + index" type="file" accept="image/*" @change="(event) => handleUpload(event, index, 'back')" class="border rounded p-2" />
                        </div>
                        <!-- Front Side Image -->
                        <div class="flex items-center justify-center">
                            <div v-if="person.front" class="w-full h-auto">
                                <img :src="person.front" width="250" class="object-cover border rounded" />
                            </div>
                        </div>
                        <!-- Back Side Image -->
                        <div class="flex items-center justify-center">
                            <div v-if="person.back" class="w-full h-auto">
                                <img :src="person.back" width="250" class="object-cover border rounded" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Comparison Section for the Same Person (Right Side) -->
                <div class="card flex-1 flex flex-col gap-4 p-4">
                    <div class="font-semibold text-xl">Compare Data for {{ person.type }} {{ index + 1 }}</div>
                    <table class="min-w-full mt-4 border-separate border-spacing-2 border border-gray-300">
                        <thead>
                            <tr>
                                <th class="border border-gray-400 px-4 py-2">Field</th>
                                <th class="border border-gray-400 px-4 py-2">Old Data</th>
                                <th class="border border-gray-400 px-4 py-2">New Data</th>
                                <th class="border border-gray-400 px-4 py-2">Comparison</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(field, key) in comparisonData[index]" :key="key">
                                <td class="border border-gray-300 px-4 py-2">{{ key }}</td>
                                <td class="border border-gray-300 px-4 py-2">{{ field.oldData }}</td>
                                <td class="border border-gray-300 px-4 py-2">{{ field.newData }}</td>
                                <td class="border border-gray-300 px-4 py-2" v-html="compareFields(field.oldData, field.newData)"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Additional Section for Notes -->
            <div class="card flex flex-col gap-4 p-4">
                <div class="font-semibold text-xl">Notes</div>
                <div class="flex flex-col gap-2">
                    <label for="notes" class="font-medium">Notes</label>
                    <textarea id="notes" rows="6" v-model="notes" placeholder="Add any additional notes here" class="border rounded p-2"></textarea>
                </div>
            </div>

            <!-- Update Button -->
            <div class="card flex flex-col gap-4 p-4">
                <Button @click="validateUploads" class="btn btn-success" label="Cập Nhật" />
            </div>
        </div>
    </Fluid>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
    setup() {
        const toast = useToast();
        const people = ref([]);
        const oldData = ref([]);
        const comparisonData = ref([]);
        const notes = ref('');

        const handleUpload = async (event, index, side) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    people.value[index][side] = e.target.result;

                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                        const checkFront = await axios.post('/api/check-font', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });

                        if (checkFront.data.isFont) {
                            if (side === 'front') {
                                const response = await axios.post('/api/process-upload', formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                });

                                if (response.data.status === 'success') {
                                    updateFormWithResponse(response.data.detections[0].message, index);
                                    toast.add({ severity: 'success', summary: 'Upload Success', detail: 'File uploaded and processed successfully!', life: 3000 });
                                } else if (response.data.status === 'warning') {
                                    updateFormWithResponse(response.data.new_data, index);
                                    toast.add({ severity: 'warn', summary: 'Upload Warning', detail: 'File uploaded with warnings. Please check!', life: 3000 });
                                } else {
                                    removeFileAndImage(index, side);
                                    toast.add({ severity: 'error', summary: 'Upload Error', detail: 'Please select a clearer image for accurate information!', life: 5000 });
                                }
                            } else {
                                removeFileAndImage(index, side);
                                toast.add({ severity: 'error', summary: 'Upload Error', detail: 'Back image is not suitable, please choose another one!', life: 5000 });
                            }
                        } else {
                            if (side === 'front') {
                                removeFileAndImage(index, side);
                                toast.add({ severity: 'error', summary: 'Upload Error', detail: 'Please select a clearer image for accurate information!', life: 5000 });
                            }
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error);
                        removeFileAndImage(index, side);
                        toast.add({ severity: 'error', summary: 'Upload Failed', detail: 'Failed to upload the file. Please try again.', life: 3000 });
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        const removeFileAndImage = (index, side) => {
            people.value[index][side] = null;
            const fileInput = document.getElementById(`${side}-upload-${index}`);
            if (fileInput) {
                fileInput.value = '';
            }
        };

        const compareFields = (oldField, newField) => {
            return oldField === newField ? '<span class="text-green-500">Match</span>' : '<span class="text-red-500">Not Match</span>';
        };

        const validateUploads = () => {
            let allValid = true;
            for (let i = 0; i < people.value.length; i++) {
                const person = people.value[i];
                if (!person.front || !person.back) {
                    allValid = false;
                    toast.add({ severity: 'warn', summary: 'Incomplete Uploads', detail: `Please upload both front and back images for ${person.type} ${i + 1}.`, life: 5000 });
                }
            }
            if (allValid) {
                sendUpdatedData();
            }
        };

        const loadFormData = (data) => {
            const { insured, buyer, dependents } = data;

            oldData.value = [{ ...insured, type: 'Insured' }, { ...buyer, type: 'Buyer' }, ...dependents.map((dep) => ({ ...dep, type: 'Dependent' }))];

            people.value = [{ ...insured, type: 'Insured', front: null, back: null }, { ...buyer, type: 'Buyer', front: null, back: null }, ...dependents.map((dep) => ({ ...dep, type: 'Dependent', front: null, back: null }))];

            comparisonData.value = people.value.map((person) => ({
                NationalID: { oldData: person.nationalID, newData: '' },
                CitizenID: { oldData: person.citizenID, newData: '' },
                DateOfBirth: { oldData: formatDate(person.dateOfBirth), newData: '' },
                FullName: { oldData: person.fullName, newData: '' },
                Address: { oldData: person.address, newData: '' },
                Gender: { oldData: person.gender?.name || '', newData: '' }
            }));
        };

        const formatDate = (dateString) => {
            if (!dateString || dateString.length !== 8) {
                return dateString;
            }
            const day = dateString.slice(0, 2);
            const month = dateString.slice(2, 4);
            const year = dateString.slice(4);
            return `${day}/${month}/${year}`;
        };

        const updateFormWithResponse = (newData, index) => {
            const person = people.value[index];

            const updatedComparison = {
                NationalID: { oldData: oldData.value[index]?.nationalID || '', newData: newData.id_identity_card || person.nationalID },
                CitizenID: { oldData: oldData.value[index]?.citizenID || '', newData: newData.id_passport || person.citizenID },
                DateOfBirth: { oldData: oldData.value[index]?.dateOfBirth || '', newData: formatDate(newData.birth_date) || person.dateOfBirth },
                FullName: { oldData: oldData.value[index]?.fullName || '', newData: newData.fullname || person.fullName },
                Address: { oldData: oldData.value[index]?.address || '', newData: newData.address || person.address },
                Gender: { oldData: oldData.value[index]?.gender?.name || '', newData: newData.gender || person.gender?.name || '' }
            };

            comparisonData.value[index] = updatedComparison;
        };

        const sendUpdatedData = async () => {
            const updatedData = people.value.map((person, index) => {
                // Tìm dữ liệu cũ tương ứng với người này
                const oldPersonData = oldData.value.find((oldPerson) => oldPerson.id === person.id) || {};

                // Tạo đối tượng dữ liệu đã được cập nhật
                const updatedPersonData = {
                    ...oldPersonData,
                    ...comparisonData.value[index]?.newData // Thay thế các trường đã được cập nhật
                };

                // Chuyển đổi dữ liệu thành định dạng phù hợp để gửi

                return {
                    [person.type.toLowerCase()]: updatedPersonData
                };
            });
            console.log(JSON.stringify(updatedData));
            // Tạo đối tượng cuối cùng với cấu trúc mong muốn
            const formattedData = {
                insured: updatedData.find((item) => item.insured),
                buyer: updatedData.find((item) => item.buyer),
                dependents: updatedData
                    .filter((item) => item.dependents)
                    .map((item) => item.dependents)
                    .flat() // Giả sử tất cả các dependent nằm trong một đối tượng duy nhất
            };

            try {
                const response = await axios.post('/v1/api/DataForTesting', { updatedData: formattedData, notes: notes.value });
                if (response.data.status === 'success') {
                    toast.add({ severity: 'success', summary: 'Update Success', detail: 'Data updated successfully!', life: 3000 });
                } else {
                    toast.add({ severity: 'warn', summary: 'Update Warning', detail: 'Data update with warnings. Please check!', life: 3000 });
                }
            } catch (error) {
                console.error('Error updating data:', error);
                toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Failed to update data. Please try again.', life: 3000 });
            }
        };

        const loadbuyer = async (CMI_ID) => {
            try {
                if (!CMI_ID) {
                    toast.add({ severity: 'warn', summary: 'Missing ID', detail: 'CMI_ID is missing. Please provide a valid ID.', life: 3000 });
                } else {
                    const response = await axios.get(`/v4/api/fortest/${CMI_ID}`);
                    loadFormData(response.data);
                }
            } catch (error) {
                console.error('Failed to load buyer:', error);
                toast.add({ severity: 'error', summary: 'Data Load Error', detail: 'Failed to load data. Please try again later.', life: 3000 });
            }
        };

        // Simulate loading form data (replace with actual data fetching logic)
        const CMI_ID = sessionStorage.getItem('CMI_ID');
        if (CMI_ID) {
            loadbuyer(CMI_ID);
        }

        return {
            people,
            comparisonData,
            notes,
            handleUpload,
            compareFields,
            validateUploads,
            sendUpdatedData
        };
    }
};
</script>
