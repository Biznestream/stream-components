<template>

    <div>
        <div v-for="(item, index) in val" :key="item.id">
            <SAttributeEditor
                    required
                    :val="item.value"
                    :type="item.dataType"
                    :default-value="item.defaultValue"
                    @input="getData([`${index}`, $event])"
            />
        </div>
    </div>

</template>

<script>
    import SAttributeEditor from './SAttributeEditor.vue'
    import {Vue, Prop, Model, Component} from 'vue-property-decorator/lib/vue-property-decorator';

    export default @Component({
        name: "SAttributesEditor.vue",
        components: {
            SAttributeEditor
        }
    })

    class SAttributesCollector extends Vue {
        @Model('input') value;
        @Prop(Array) val;

        getData(val){
            const newArray = [...this.val];
            newArray[val[0]].value = val[1];
            this.$emit('input', newArray);
        }
    }
</script>

<style scoped>

</style>
