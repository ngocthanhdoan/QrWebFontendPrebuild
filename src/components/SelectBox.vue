<script>
export default {
    name: 'SelectBox',
    props: {
        id: {
            type: String,
            default: () => `select-${Math.random().toString(36).substr(2, 9)}`
        },
        label: {
            type: String,
            default: 'Select an option'
        },
        placeholder: {
            type: String,
            default: 'Please select'
        },
        options: {
            type: Array,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            internalValue: this.value
        };
    },
    watch: {
        value(newVal) {
            this.internalValue = newVal;
        }
    },
    methods: {
        emitChange() {
            console.log('Emitting change with value:', this.internalValue); // Debugging
            console.log('ID:', this.id); // Debugging
            sessionStorage.setItem(this.id, this.internalValue);
            this.$emit('input', this.internalValue);
        }
    }
};
</script>

<template>
    <div>
        <label :for="id">{{ label }}</label>
        <select :id="id" v-model="internalValue" @change="emitChange">
            <option :value="''" disabled>{{ placeholder }}</option>
            <option v-for="item in options" :key="item.id" :value="item.id">
                {{ item.value }}
            </option>
        </select>
    </div>
</template>
