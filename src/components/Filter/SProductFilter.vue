<template>
    <div class="container">
        <div class="filter-wrap flex">
            <div class="product-filters" v-for="(item, index) in list" :key="index">
                <div v-if="item.type === 'char'" class="select flex direction-column">
                    <s-dropdown
                            @input="onFilter(item, $event)"
                            :options="item"
                            :value="value[item.name] || currentFilter[item.name]"
                    ></s-dropdown>
                </div>
                <div v-if="item.type === 'number'" class="range-slider flex direction-column">
                    <s-range-input
                            @input="onFilter(item, $event)"
                            :options="item"
                            :value="value[item.name] || currentFilter[item.name]"
                    ></s-range-input>
                </div>
            </div>
        </div>
        <div>
            <button style="margin: .25rem" v-for="(item, i) in getKeys" @click="resetItem(item, i)" :key="i">{{item}}</button>
            <div>
                <button style="margin: .25rem" @click="$emit('input', currentFilter)">Submit</button>
                <button style="margin: .25rem" @click="resetFilter">Reset</button>
            </div>
        </div>
        <div>{{currentFilter}}</div>
        <button style="margin: .25rem" @click="showResult">Show results</button>
    </div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';
    import SDropdown from './SDropdown'
    import SRangeInput from './SRangeInput'

    export default @Component({
        name: "SProductFilter.vue",
        components: {
            SDropdown,
            SRangeInput
        }
    })

    class ProductFilter extends Vue {
        @Prop() value;
        @Prop() list;

        currentFilter = {};
        showButtons = false;
        showFilter = true;

        onFilter(item, value){
            const newValue = {...this.value};
            const copy = {...this.currentFilter};
            newValue[item.name] = value;
            this.currentFilter = Object.assign(copy, newValue);
            this.$emit('update', this.currentFilter);
        }

        resetFilter(){
            this.$emit('input', {});
            this.$emit('update', {});
            this.currentFilter = {};
            this.showButtons = false;
            this.showFilter = true;
        }

        showResult(){
            this.showButtons = true;
            this.showFilter = false;
        }

        resetItem(item){
            const newValue = {...this.currentFilter};
            delete newValue[item];
            //newValue[item] = undefined;
            this.showFilter = true;
            this.currentFilter = newValue;
            this.$emit('input', newValue);
            this.$emit('update', this.currentFilter);
        }

        get getKeys(){
            return Object.keys(this.currentFilter);
        }
    }
</script>

<style lang="scss">
    body{
        padding: 0;
        margin: 0;
    }

    .flex{
        display: flex;
    }

    .justify-around{
        justify-content: space-around;
    }

    .justify-between{
        justify-content: space-between;
    }

    .direction-column{
        flex-direction: column;
    }

    .container{
        max-width: 1140px;
        padding: 15px 0;
        width: 100%;
        margin: 0 auto;

        .product-filters{
            margin: 0 10px;
        }

        .select{
            width: 100%;
        }
    }

    .range-input{
        input{
            width: 48%;
        }
    }

</style>
