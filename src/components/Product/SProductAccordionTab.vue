<template>

    <div class="panel panel-default" :class="{open: active}">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a href="" class="accordion-toggle" @click.prevent="toggleOpen" accordion-transclude="heading"><span>{{tab.title}}</span></a>
            </h4>
        </div>
        <transition
                name="slide"
        >
            <div ref="panel" v-if="active" class="panel-collapse collapse" :class="{in: active}">
                <div class="panel-body">
                    <div class="row dl-leaders">
                        <s-product-attribute
                                show-title
                                v-for="(item, index) in tab.attributes" :key="index"
                                :attribute="item"
                        >
                        </s-product-attribute>
                    </div>
                </div>
            </div>
        </transition>
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

<style lang="scss" scoped>

    .slide-enter-active, .slide-leave-active  {
        transition: all 750ms ease-in-out;
    }

    .slide-leave{

    }

    .slide-enter-to, .slide-leave {
        max-height: 100vh;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
        height: auto;
    }

</style>
