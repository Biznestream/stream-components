<template>
  <div>

    <div class="btn-toolbar" role="toolbar">
      <!--{% if productPage.productIndex %}
      <div class="btn-group btn-group-text">
        {{productPage.productIndex}}/{{productPage.productsCount}}
      </div>
      {% endif %}-->
      <div class="btn-group btn-group-text" v-if="products.products">
        <span data-test="index">{{index + 1}}</span><span>/{{products.products.length}}</span>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a href="" data-test="productBackward" id="productPageBackButton" type="button" class="btn btn-primary" @click.prevent.stop="switchProduct('start')">
          <span class="glyphicon glyphicon-backward"></span>
        </a>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a class="btn btn-primary" data-test="productPrevious" :disabled="index === 0" @click.prevent.stop="switchProduct('prev')">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
      </div>
      <div class="btn-group btn-group" role="group" v-if="products.products">
        <a class="btn btn-primary" data-test="productNext" :disabled="products.products.length - 1 === index" @click.prevent.stop="switchProduct('next')">
          <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  import { Vue, Component, Watch } from 'vue-property-decorator';

  export default @Component({
    name: "SProductNavigation",
    components: {
    }
  })
  class SProductNavigation extends Vue {
    index = 0;

    @Watch('$route')
    onRouteChange(route){
	  let currentIndex = this.products.products.findIndex(el => el.url === route.path);
	  currentIndex > -1 ? this.index = currentIndex : false;
    }

    async mounted(){
      await this.$store.dispatch('getProductsData');
      this.index = this.products.products.findIndex(el => el.url === this.$route.path);
    }

    get products(){
      return this.$store.getters.products
    }

    switchProduct(step){
      let url = '';
	  if(step === 'next' && this.products.products.length - 1 !== this.index) {
		url = this.products.products[this.index + 1].url;
	  } else if(step === 'prev' && this.index !== 0){
		url = this.products.products[this.index - 1].url;
      } else if(step === 'start' && this.index !== 0) {
        url = this.products.products[0].url;
      } else if(step !== 'next' && step !== 'prev'){
		url = { path: '/' }
      }
      const { route } = this.$router.resolve(url);
      const newRoute = { ...route };
      newRoute.query = this.$route.query;
      this.$router.push(newRoute);
    }
  }
</script>
