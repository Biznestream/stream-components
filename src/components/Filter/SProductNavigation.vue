<template>
  <div>

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

  </div>
</template>

<script>
  import { Vue, Prop, Component, Emit, Watch } from 'vue-property-decorator';

  export default @Component({
    name: "SProductNavigation",
    components: {
    }
  })
  class SProductNavigation extends Vue {

  }
</script>
