<template>
  <div :class="`view-${viewStyle}`">

    <template v-if="viewStyle != 'table'">
      <div>
        <template v-for="product, index in products.products">
          <s-product
                  :product="product"
                  :key="index"
          ></s-product>
        </template>
        <div class="col-xs-12 text-center" v-if="loading">
          Loading data...
          <br/>
          <br/>
        </div>
        <div class="col-xs-12">
          <a href="" class="btn btn-primary btn-block" @click.prevent="getProducts">{{products.nextText}}</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { Vue, Prop, Watch } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import SProduct from '../Product/SProduct';
  import { qsToFilter } from '../../helpers/common';

  export default @Component({
    name: "ProductsPage",
    components: {
      SProduct
    }
  })

  class ProductsPages extends Vue {
    @Prop() query;

    data = {};

    viewStyle = 'grid';

    section = {};

    mounted () {
      console.info(this.$route);
      //this.getProducts();
    }

    get products(){
    	return this.$store.getters.products
    }

    get loading(){
    	return this.$store.getters.loading
    }

    @Watch('query')
    onQueryChange () {
      console.info('watch', this.query);
    }
  }
</script>

<style scoped>

</style>
