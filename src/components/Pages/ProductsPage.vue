<template>
  <div :class="`view-${viewStyle}`">

    <template v-if="viewStyle != 'table'">
      <div>
        <template v-for="product, index in products">
          <s-product :product="product" :key="index"></s-product>
        </template>
        <div class="col-xs-12 text-center" v-if="loading">
          Loading data...
          <br/>
          <br/>
        </div>
        <div class="col-xs-12">
          <a href="" class="btn btn-primary btn-block" @click.prevent="getProducts">{{data.nextText}}</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
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

    loading = false;

    products = [];

    viewStyle = 'grid';

    section = {};

    mounted () {
      console.info(this.$route);
      this.getProducts();
    }

    @Watch('query')
    onQueryChange () {
      console.info('watch', this.query);
      this.getProducts();
    }

    async getProducts() {
      this.loading = true;
      const params = {
        offset: 0,
        configuration_id: 619,
        section: 122761238,
        section_id: 122761238,
        ...this.query
      };

      const { data } = await axios.get('https://stapler-mieten.staplercenter-pieckert.de/api/products', { params });

      this.data = data.data;
      this.products = data.data.products;
      this.loading = false;
      this.$emit('products', this.products);
    }
  }
</script>

<style scoped>

</style>
