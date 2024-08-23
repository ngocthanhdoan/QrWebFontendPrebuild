// src/mixins/fetchOptionsMixin.js
import axios from 'axios';

export default {
    data() {
        return {
            options: {} // To store options for different prefixes
        };
    },
    methods: {
        async fetchOptions(prefix) {
            try {
                const response = await axios.get(`http://localhost:8082/v4/api/data/prefix/${prefix}`);
                console.log(`Data fetched for ${prefix}:`, response.data);

                // Use Vue's reactivity system to update options
                this.options = {
                    ...this.options,
                    [prefix]: response.data.map((item) => ({
                        name: item.value,
                        code: item.key
                    }))
                };

                console.log(`Loaded options for ${prefix}:`, this.options[prefix]); // Debugging
            } catch (error) {
                console.error(`Error fetching data for ${prefix}:`, error);
            }
        }
    }
};
