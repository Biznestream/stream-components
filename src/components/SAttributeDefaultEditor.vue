<template>

    <div>

        <template v-if="type === DataTypes.SHORTTEXT_TYPE">

            <v-text-field
                :rules="required ? [emptyValidation()] : []"
                :value="value" @input="$emit('input', $event)"></v-text-field>

        </template>
        <template v-else>

            <div class="error">No editor for type: {{type}}</div>

        </template>

    </div>

</template>
<style lang="scss" scoped>
    .error {
        color: red;
    }
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
