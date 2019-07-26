<template>
  <div class="accordion-heading-full product-attributes">
    <div class="panel-group">
      <slot name="tab" :toggle="toggleTab" :activeIndex="activeIndex"></slot>
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  export default @Component({
    name: "SProductAccordion",
    components: {
    }
  })
  class SProductAccordion extends Vue {

    activeIndex = 0;

    toggleTab(index){
      if(this.activeIndex === index){
        this.activeIndex = null
      } else {
        this.activeIndex = index;
      }
    }
  }
</script>
