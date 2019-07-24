<template>
  <div>
    Product
  </div>
</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

  export default @Component({
    name: "ProductPage",
    components: {
    }
  })
  class ProductPages extends Vue {
    mounted () {
      console.info(this.$route)
    }
  }
</script>
