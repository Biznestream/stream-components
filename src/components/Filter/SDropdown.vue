<template>
    <div>
        <label>{{options.title}}</label>
        <select :value="setValue" @input="onInput($event)">
            <option
                    v-for="(val, i) in getValues"
                    :key="i"
                    :value="val"
            >
                {{val}}
            </option>
        </select>
    </div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';

    export default @Component ({
        name: "SDropdown.vue"
    })

    class Dropdown extends Vue {
        @Prop(Object) options;
        @Prop() value;

        onInput(ev){
            const value = ev.target.value;
            if(value === '...'){
                this.$emit('input', undefined)
            } else {
                this.$emit('input', value)
            }
        }

        get setValue(){
            return this.value ? this.value : '...'
        }

        get getValues(){
            const filterOption = {...this.options};
            const valuesArray = [...filterOption.values];
            valuesArray.unshift('...');
            return valuesArray;
        }
    }
</script>

<style scoped lang="scss">
    select{
        width: 100%;
    }
</style>
