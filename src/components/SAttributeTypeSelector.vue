<template>

    <v-select item-text="title" item-value="key"
        :value="value" @input="$emit('input', $event)" :items="ALL_ATTRIBUTE_TYPES"></v-select>

</template>
<script>
import { Vue, Component, Model } from 'vue-property-decorator';
import { ALL_ATTRIBUTE_TYPES } from '../constants';

export default @Component({
    name: 'SAttributeTypeSelector', // mandatory property to avoid minification problems
    components: {}
})
class SAttributeTypeSelector extends Vue {
    @Model('input') value;

    data() {
        return { ALL_ATTRIBUTE_TYPES };
    }
}
</script>
