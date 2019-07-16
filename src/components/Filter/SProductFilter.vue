<template>
    <div class="container">
        <div class="filter-wrap flex">
            <div class="product-filters" v-for="(item, index) in initialValues" :key="index">
                <div v-if="item.type === 'char'" class="select flex direction-column">
                    <s-dropdown
                            @input="onFilter(item, $event)"
                            :initial-values="item"
                            :value="currentFilter[item.name]"
                    ></s-dropdown>
                </div>
                <div v-if="item.type === 'number'" class="range-slider flex direction-column">
                    <s-range-input
                            @input="onFilter(item, $event)"
                            :initial-values="item"
                            :filter-values="currentData(item.name)"
                            :value="currentFilter[item.name]"
                    ></s-range-input>
                </div>
            </div>
        </div>
        <div>
            <button style="margin: .25rem" v-for="(item, i) in getKeys" @click="resetItem(item, i)" :key="i">{{item}}</button>
            <div>
                <button style="margin: .25rem" @click="showResult">Submit</button>
                <button style="margin: .25rem" @click="resetFilter">Reset</button>
                <p>Current filter: {{currentFilter}}</p>
            </div>
        </div>
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
        @Prop() filterValues;
        @Prop() initialValues;

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
            this.$emit('input', this.currentFilter)
        }

        resetItem(item){
            const newValue = {...this.currentFilter};
            delete newValue[item];
            this.showFilter = true;
            this.currentFilter = newValue;
            this.$emit('input', newValue);
            this.$emit('update', this.currentFilter);
        }

        get getKeys(){
            return Object.keys(this.currentFilter);
        }

        currentData(name){
            return this.filterValues.find(el => el.name === name)
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

    .wrap{
        flex-wrap: wrap;
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
        padding: 0 15px;
        width: 100%;
        //margin: 0 auto;
        margin-right: auto;
        margin-left: auto;

        .product-filters{
            margin: 0 10px;
        }

        .select{
            width: 100%;
        }
    }

    .row{
        margin-left: -15px;
        margin-right: -15px;
    }

    .range-input{
        input{
            width: 48%;
        }
    }

</style>
