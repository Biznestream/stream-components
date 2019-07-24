<template>
<div class="product-item">
  <span @click="openProduct(product.url)" style="cursor: pointer" class="thumbnail">
    <div class="product-image img-overlay img-overlay-container">
      <div class="overlay main-btn">
        <div class="btn btn-default" ng-if="product.url">
          <span>{{section.button_caption || 'Details'}}</span>
        </div>
      </div>

        <!--<img data-ng-if="product.image && localCurrent.viewStyle == 'grid'"-->
        <!--alt="{{product.image.alt|default:product.title}}" title="{{product.image.title|default:product.title}}"-->
        <!--class="img-responsive" src="" data-ng-src="{{imageNewUrl(product.image,section.imageTypes.grid)}}" />-->
        <!---->
        <!--<img data-ng-if="product.image && localCurrent.viewStyle == 'list'"-->
        <!--alt="{{product.image.alt|default:product.title}}" title="{{product.image.title|default:product.title}}"-->
        <!--class="img-responsive" src="" data-ng-src="{{imageNewUrl(product.image,section.imageTypes.list)}}" />-->

    </div>
    <div class="product-info">
      <div class="product-title tooltipped tooltipped-n" :aria-label="product.title">
        <span class="text-ellipsis h3">{{product.title}}</span>
      </div>
      <div class="product-attributes-container">
        <div class="product-attributes">
          <s-product-attribute show-title v-for="attribute in product.attributes" v-if="attribute.value !== null" :attribute="attribute"></s-product-attribute>

          <div class="btn btn-primary visible-xs visible-sm btn-details">
            <span>{{section.button_caption || 'Details'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </span>
</div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';
    import SProductAttribute from './SProductAttribute';

    export default @Component({
        name: "SProduct",
        components: {
            SProductAttribute
        }
    })
    class SProduct extends Vue{
        @Prop() product;

        section = {};

        openProduct(url) {
          const { route } = this.$router.resolve(url);
          const newRoute = { ...route };
          console.info(newRoute);
          newRoute.query = this.$route.query;
          this.$router.push(newRoute);
        }
    }
</script>
