<template>

    <div>
        <div v-for="(item, index) in dataArray">
            <SAttributeEditor
                    required
                    :val="item.value"
                    :type="item.dataType"
                    :default-value="item.default"
                    @input="$emit('input', [`${index}`, $event])"
            />
        </div>
    </div>

</template>

<script>
    import SAttributeEditor from './SAttributeEditor.vue'
    import {Vue, Prop, Model, Component} from 'vue-property-decorator';

    export default @Component({
        name: "SAttributesCollector",
        components: {
            SAttributeEditor
        },
    })

    class SAttributesCollector extends Vue {
        @Model('input') value;
        @Prop(Array) dataArray;
    }
</script>

<style scoped>

</style>
