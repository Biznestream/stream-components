<template>
  <div class="accordion-heading-full product-attributes">
    <div class="panel-group">
      <slot></slot>
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

  }
</script>
