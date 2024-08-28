<script>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
export default {
    data() {
        return {
            file: null,
            response: null,
            toast: null
        };
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0];
        },
        async uploadImage() {
            if (!this.file) {
                //alert('Please select a file first.');
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'Vui lòng chọn file!', life: 3000 });
                return;
            }

            const formData = new FormData();
            formData.append('file', this.file);

            try {
                const response = await axios.post('/api/process-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.response = response.data;
            } catch (error) {
                console.error('Error uploading the image:', error);
                this.response = 'Error uploading the image';
                // this.toast.add({ severity: 'error', summary: 'Error', detail: 'Vui lòng chọn file!', life: 3000 });
            }
        }
    },
    mounted() {
        this.toast = useToast();
    }
};
</script>

<template>
    <Fluid class="flex flex-col">
        <div class="">
            <h2>Upload Image</h2>
            <input type="file" @change="handleFileChange" />
            <br />
            <Button label="Upload" @click="uploadImage" />

            <h2>Result</h2>
            <div class="card flex flex-col gap-4 w-full mt-8">
                <pre><code>{{ response }}</code></pre>
            </div>
        </div></Fluid
    >
</template>
