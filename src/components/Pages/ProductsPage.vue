<template>
  <div :class="`view-${viewStyle}`">


    <div class="btn-toolbar" role="toolbar">
      <!--{% if productPage.productIndex %}
      <div class="btn-group btn-group-text">
        {{productPage.productIndex}}/{{productPage.productsCount}}
      </div>
      {% endif %}-->
      <div class="btn-group btn-group btn-group-back" role="group">
        <a href="" id="productPageBackButton" type="button" class="btn btn-primary">
          <span class="glyphicon glyphicon-backward"></span>
        </a>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a class="btn btn-primary">
        <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
      </div>
      <div class="btn-group btn-group" role="group">
        <a class="btn btn-primary">
        <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    </div>

    <template v-if="viewStyle != 'table'">
      <div infinite-scroll="loadMore()" infinite-scroll-distance="1" infinite-scroll-disabled='current.infiniteScrollDisabled || loading || loaded'>
        <template v-for="product, index in products">
          <s-product :product="product" :key="index"></s-product>
        </template>
        <div class="col-xs-12 text-center" data-ng-if='loading'>
          Loading data...
          <br/>
          <br/>
        </div>
        <div class="col-xs-12" ng-if="!loaded && current.infiniteScrollDisabled && productsData.nextText">
          <a href="" class="btn btn-primary btn-block" ng-click="loadMore()" ng-bind="productsData.nextText"></a>
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

    products = [];

    viewStyle = 'grid';

    section = {};

    mounted () {
      console.info(this.query);
      this.getProducts();
    }

    @Watch('query')
    onQueryChange () {
      console.info('watch', this.query);
      this.getProducts();
    }

    async getProducts() {
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
    }
  }
</script>

<style scoped>

</style>
