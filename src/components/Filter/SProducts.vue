<template>
    <div class="container">
        <h1>Products</h1>
        <div class="flex wrap row">
            <s-product
                    v-for="product in value.products"
                    :key="product.id"
                    :product="product"
            ></s-product>
        </div>
        <div>{{value.nextCount}}</div>
        <button @click="$emit('update', value.nextCount)" v-if="value.nextCount > 0">{{value.nextText}}</button>
    </div>
</template>

<script>
    import SProduct from './SProduct';
    import {Vue, Prop, Component} from 'vue-property-decorator';

    export default @Component({
        name: "Products",
        components: {
            SProduct
        }
    })

    class Product extends Vue{
        @Prop() value;
    }
</script>

<style scoped>

</style>
