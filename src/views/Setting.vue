<script setup>
import { ref } from 'vue';
import { fetchData, postData, putData, deleteData } from '@/service/DataPayLoad';

const data = ref([]);
const selectedItems = ref([]);
const currentItem = ref({ id: '', value: '', prefix: '', desc: '' });
const isEditing = ref(false);

async function loadData() {
    try {
        const response = await fetchData('DataSnapPayLoad');
        if (response.returnCode === 0) {
            data.value = response.returnData;
        } else {
            console.warn(response.msgDescs);
        }
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

function openAddForm() {
    isEditing.value = false;
    currentItem.value = {
        id: Date.now().toString(), // Generate a new ID
        value: '',
        prefix: '',
        desc: ''
    };
}

function openEditForm(item) {
    isEditing.value = true;
    currentItem.value = { ...item };
}

function cancelEdit() {
    currentItem.value = { id: '', value: '', prefix: '', desc: '' };
    isEditing.value = false;
}

async function saveItem() {
    try {
        if (isEditing.value && currentItem.value.id) {
            // Update existing item
            await putData(`DataSnapPayLoad/${currentItem.value.id}`, currentItem.value);
        } else {
            // Add new item
            await postData('DataSnapPayLoad', currentItem.value);
        }
        await loadData();
        cancelEdit();
    } catch (error) {
        console.error('Failed to save data:', error);
    }
}

async function deleteItem(item) {
    try {
        await deleteData(`DataSnapPayLoad/${item.id}`);
        await loadData();
        selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id !== item.id);
    } catch (error) {
        console.error('Failed to delete item:', error);
    }
}

async function deleteSelectedItems() {
    if (selectedItems.value.length > 0) {
        try {
            const deletePromises = selectedItems.value.map((item) => deleteData(`DataSnapPayLoad/${item.id}`));
            await Promise.all(deletePromises);
            await loadData();
            selectedItems.value = [];
        } catch (error) {
            console.error('Failed to delete items:', error);
        }
    } else {
        console.warn('No items selected for deletion.');
    }
}

function toggleSelection(item) {
    const index = selectedItems.value.findIndex((selectedItem) => selectedItem.id === item.id);
    if (index > -1) {
        selectedItems.value.splice(index, 1);
    } else {
        selectedItems.value.push(item);
    }
}

function toggleAll(event) {
    if (event.target.checked) {
        selectedItems.value = [...data.value];
    } else {
        selectedItems.value = [];
    }
}

function isSelected(item) {
    return selectedItems.value.some((selectedItem) => selectedItem.id === item.id);
}

function getallSelected() {
    return data.value.length > 0 && selectedItems.value.length === data.value.length;
}

loadData();
</script>

<template>
    <div>
        <div class="card flex flex-col gap-4">
            <div class="font-semibold text-xl mb-4">Data Management</div>

            <!-- Data Table -->
            <table class="p-datatable">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" @change="toggleAll" :checked="allSelected" />
                        </th>
                        <th>ID</th>
                        <th>Value</th>
                        <th>Prefix</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.id" @click="toggleSelection(item)" :class="{ selected: isSelected(item) }">
                        <td>
                            <input type="checkbox" :value="item" v-model="selectedItems" />
                        </td>
                        <td>{{ item.id }}</td>
                        <td>{{ item.value }}</td>
                        <td>{{ item.prefix }}</td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <button @click.stop="openEditForm(item)">Edit</button>
                            <button @click.stop="deleteItem(item)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Form for Add/Edit -->
            <div class="form-container">
                <div class="font-semibold text-xl mb-4">
                    {{ isEditing ? 'Edit Item' : 'Add New Item' }}
                </div>
                <div class="p-fluid">
                    <label>
                        ID:
                        <input type="text" v-model="currentItem.id" placeholder="ID" :readonly="isEditing" />
                    </label>
                    <label>
                        Value:
                        <input type="text" v-model="currentItem.value" placeholder="Value" />
                    </label>
                    <label>
                        Prefix:
                        <input type="text" v-model="currentItem.prefix" placeholder="Prefix" />
                    </label>
                    <label>
                        Description:
                        <input type="text" v-model="currentItem.desc" placeholder="Description" />
                    </label>
                    <button @click="saveItem">Save</button>
                    <button @click="cancelEdit">Cancel</button>
                </div>
            </div>

            <!-- Delete Selected Items Button -->
            <button v-if="selectedItems.length > 0" @click="deleteSelectedItems">Delete Selected</button>
        </div>
    </div>
</template>
