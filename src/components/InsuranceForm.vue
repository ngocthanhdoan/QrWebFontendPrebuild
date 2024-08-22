<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { InputText, Button, DatePicker, Select } from 'primevue';

const props = defineProps({
    title: String,
    idNumber: String,
    calendarValue: [String, Date],
    age: String,
    dropdownItemGender: Object,
    dropdownItemJob: Object,
    dropdownItemsGender: Array,
    dropdownItemsJob: Array
});

const emit = defineEmits(['update:idNumber', 'update:calendarValue', 'update:age', 'update:dropdownItemGender', 'update:dropdownItemJob']);

const onSearchClick = () => {
    emit('search');
};

const onQrCodeClick = () => {
    emit('qrCode');
};
</script>

<template>
    <div class="card flex flex-col gap-4 w-full">
        <div class="font-semibold text-xl">{{ title }}</div>

        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
                <label for="idNumber">Số chứng minh nhân dân</label>
                <InputText id="idNumber" :value="idNumber" @input="$emit('update:idNumber', $event)" type="text" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
                <label for="info">Thông tin</label>
                <Button label="Tra tìm" style="height: auto" @click="onSearchClick" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
                <label for="openQrBox">Tự động nhập thông tin (Upload/ Quét QRCode)</label>
                <Button id="openQrBox" label="chỉ áp dụng với CCCD có mã QRCode" @click="onQrCodeClick" />
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
                <label for="birthdate">Ngày sinh</label>
                <DatePicker id="birthdate" :showIcon="true" :showButtonBar="true" v-model="calendarValue" />
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
                <label for="age">Tuổi</label>
                <InputText id="age" :value="age" @input="$emit('update:age', $event)" type="text" />
            </div>

            <div class="flex flex-wrap gap-2 w-full">
                <label for="gender">Giới Tính</label>
                <Select id="gender" :value="dropdownItemGender" @input="$emit('update:dropdownItemGender', $event)" :options="dropdownItemsGender" optionLabel="name" placeholder="Chọn giới tính" class="w-full"></Select>
            </div>
            <div class="flex flex-wrap gap-2 w-full">
                <label for="job">Nghề Nghiệp</label>
                <Select id="job" :value="dropdownItemJob" @input="$emit('update:dropdownItemJob', $event)" :options="dropdownItemsJob" optionLabel="name" placeholder="Chọn nghề nghiệp" class="w-full"></Select>
            </div>
        </div>
    </div>
</template>
