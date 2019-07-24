<template>
  <div class="product-page" itemscope itemtype="http://schema.org/Product">
    <h1 itemprop="name">BYD Gegengewichtstapler ECB16</h1>


    <div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-xs-12" bz-gallery="" itemscope="" itemtype="http://schema.org/ImageGallery">
          <!---->
          <div class="" data-ng-show="!skinSettings.useFotorama">
            <a class="img-overlay img-overlay-icon main-image"
                                                                    itemprop="associatedMedia" itemscope=""
                                                                    itemtype="https://schema.org/ImageObject"
                                                                    href="https://www.fds-stapler.de/image/243781/Gegengewichtstapler+ECB16+18.jpg"
                                                                    ng-show="localCurrent.index == 0"
                                                                    data-size="1024x768"><img itemprop="image"
                                                                                              src="https://www.fds-stapler.de/image/243781/Gegengewichtstapler+ECB16+18.jpg"
                                                                                              alt=""
                                                                                              title="BYD Gegengewichtstapler ECB16"
                                                                                              class="img-responsive img-width-100">
            <link itemprop="url" href="https://www.fds-stapler.de/image/243781/Gegengewichtstapler+ECB16+18.jpg">
            <meta itemprop="width" content="1024">
            <meta itemprop="height" content="768">
          </a></div>
        </div>
        <div class="col-lg-8 col-md-8 col-xs-12">
          <s-product-accordion>
            <s-product-accordion-tab :tab="tab" v-for="(tab, index) in product.tabs" :key="index"></s-product-accordion-tab>
          </s-product-accordion>
          <!--<accordion class="accordion-heading-full product-attributes">-->
          <!--</accordion>-->
          <div class="form-widget"></div>
        </div>
      </div>
    </div>

    <!--<s-product-tab v-for="tab, index in product.tabs" :key="index" :tab="tab"></s-product-tab>-->
  </div>
</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
  import SProductTab from '../Product/SProductTab';
  import SProductAccordion from '../Product/SProductAccordion';
  import SProductAccordionTab from '../Product/SProductAccordionTab';

  export default @Component({
    name: "ProductPage",
    components: {
      SProductTab,
      SProductAccordion,
      SProductAccordionTab
    }
  })

  class ProductPage extends Vue {
    product = {
      title: 'BYD Gegengewichtstapler ECB16',
      tabs: [
        {
          title: 'Modellspezifikationen',
          attributes: [{
            "id": 9338,
            "category": 443,
            "name": "engine_type",
            "title": "Stapler Typ",
            "suffix": "",
            "type": "char",
            "format": "",
            "value": "Gegengewichtstapler"
          }, {
            "id": 13372,
            "category": 443,
            "name": "tragkraft",
            "title": "Tragkraft",
            "suffix": "kg",
            "type": "number",
            "format": "",
            "value": 123
          }
          ]
        }
      ]
    };

    mounted () {
      console.info(this.$route)
    }
  }
</script>
