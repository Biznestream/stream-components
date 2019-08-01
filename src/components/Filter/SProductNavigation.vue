<template>
  <div>

    <div class="btn-toolbar" role="toolbar">
      <!--{% if productPage.productIndex %}
      <div class="btn-group btn-group-text">
        {{productPage.productIndex}}/{{productPage.productsCount}}
      </div>
      {% endif %}-->
      <div class="btn-group btn-group-text">
        {{index + 1}}/{{products.length}}
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a href="" id="productPageBackButton" type="button" class="btn btn-primary" @click.prevent.stop="switchProduct('start')">
          <span class="glyphicon glyphicon-backward"></span>
        </a>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a class="btn btn-primary" :disabled="index === 0" @click.prevent.stop="switchProduct('prev')">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
      </div>
      <div class="btn-group btn-group" role="group">
        <a class="btn btn-primary" :disabled="products.length - 1 === index" @click.prevent.stop="switchProduct('next')">
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
	  let currentIndex = this.products.findIndex(el => el.url === route.path);
	  currentIndex > -1 ? this.index = currentIndex : false;
    }

    async mounted(){
      await this.$store.dispatch('getProductsData');
      this.index = this.products.findIndex(el => el.url === this.$route.path);
    }

    get products(){
      return this.$store.getters.products
    }

    switchProduct(step){
      let url = '';
	  if(step === 'next' && this.products.length - 1 !== this.index) {
		url = this.products[this.index + 1].url;
	  } else if(step === 'prev' && this.index !== 0){
		url = this.products[this.index - 1].url;
      } else if(step === 'start' && this.index !== 0) {
        url = this.products[0].url;
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
