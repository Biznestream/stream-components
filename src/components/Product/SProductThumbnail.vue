<template>
    <div class="" data-ng-show="!skinSettings.useFotorama">
        <a class="img-overlay img-overlay-icon main-image"
           itemprop="associatedMedia" itemscope=""
           itemtype="https://schema.org/ImageObject"
           :href="thumbnail"
           data-size="1024x768">
            <img itemprop="image" :src="thumbnail" alt="" title="BYD Gegengewichtstapler ECB16"
                                     class="img-responsive img-width-100">
            <link itemprop="url" :href="thumbnail">
            <meta itemprop="width" content="1024">
            <meta itemprop="height" content="768">
        </a>
    </div>
</template>

<script>
    import { Vue, Component, Prop } from 'vue-property-decorator';

    export default @Component({
        name: "SProductThumbnail"
    })

    class ProductThumbnail extends Vue{
        @Prop() thumbnail;
    }
</script>

<style scoped>

</style>
