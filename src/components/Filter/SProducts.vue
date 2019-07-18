<template>
    <div class="container">
        <h1>Products <span v-if="value.products">{{value.products.length}}</span></h1>
        <div class="flex wrap row">
            <s-product
                    v-for="product in value.products"
                    :key="product.id"
                    :product="product"
            ></s-product>
        </div>
        <div>{{value.nextCount}}</div>
        <div ref="target">Load more</div>
        <button ref="button" @click="update" v-if="value.nextCount > 0">{{value.nextText}}</button>
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

        update(){
            this.$emit('update', this.value.nextCount);
        }

        observer = null;

        /*mounted(){
            this.observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.update();
                    }
                });
            }, this.options);
            this.observer.observe(this.$refs.target);
        }

        destroyed() {
            this.observer.disconnect();
        }*/
    }
</script>

<style scoped>

</style>
