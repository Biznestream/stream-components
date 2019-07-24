<template>

  <div class="panel panel-default open" ng-class="{'open': localCurrent.tabs[1]}"
       is-open="localCurrent.tabs[1]">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a href="" class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span>{{tab.title}}</span></a>
      </h4>
    </div>
    <div class="panel-collapse collapse in">
      <div class="panel-body">
        <div class="row dl-leaders">
          <s-product-attribute show-title
              v-for="(item, index) in tab.attributes" :key="index"
              :attribute="item"></s-product-attribute>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

  export default @Component({
    name: "SProductAccordion",
    components: {
    }
  })

  class SProductAccordion extends Vue {
    @Prop() tab;
  }
</script>
