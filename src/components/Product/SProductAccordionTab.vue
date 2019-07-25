<template>

  <div class="panel panel-default open">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a href="" class="accordion-toggle" @click.prevent="toggleOpen" accordion-transclude="heading"><span>{{tab.title}}</span></a>
      </h4>
    </div>
    <div ref="panel" class="panel-collapse collapse" :class="{in: active}">
      <transition>
        <div class="panel-body" v-if="active">
          <div class="row dl-leaders">
            <s-product-attribute
                    show-title
                    v-for="(item, index) in tab.attributes" :key="index"
                    :attribute="item"
            >
            </s-product-attribute>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
  import { Vue, Prop, Component } from 'vue-property-decorator';

  export default @Component({
    name: "SProductAccordion",
    components: {
    }
  })

  class SProductAccordion extends Vue {
    @Prop() tab;
    @Prop() active;

    toggleOpen(){
      this.$emit('toggleTab');
    }
  }
</script>

<style lang="scss">

  .panel-body{
    transition: all .9s ease;
    height: 100px;
    overflow: hidden;
  }

  .panel-body.v-enter, .panel-body.v-leave {
    height: 0;
    opacity: 0;
  }

</style>
