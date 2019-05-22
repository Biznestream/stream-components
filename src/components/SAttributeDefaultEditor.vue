<template>

    <div>

        <template v-if="type === DataTypes.SHORTTEXT_TYPE">

            <v-text-field
                :rules="required ? [emptyValidation()] : []"
                :value="value" @input="$emit('input', $event)"></v-text-field>

        </template>
        <template v-else-if="type === DataTypes.PARAGRAPH_TYPE">

            <v-textarea
                :rules="required ? [emptyValidation()] : []"
                :value="value" @input="$emit('input', $event)"></v-textarea>

        </template>
        <template v-else-if="type === DataTypes.RICHTEXT_TYPE">

        </template>
        <template v-else>

            <div class="error--text">No editor for type: {{type}}</div>

        </template>

    </div>

</template>
<style lang="scss" scoped>
</style>
<script>
import { Vue, Prop, Model, Component } from 'vue-property-decorator';
import * as DataTypes from '../constants';

export default @Component({
    name: 'SAttributeDefaultEditor', // mandatory property to avoid minification problems
    components: {}
})
class SAttributeDefaultEditor extends Vue {
    @Model('input') value;
    @Prop(String) type;
    @Prop(Boolean) required;

    data() {
        return { DataTypes };
    }

    emptyValidation(message = 'This field is required.') {
        return v => !!v || message;
    }
}
</script>
