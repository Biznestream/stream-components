<template>
    <div class="" data-ng-show="!skinSettings.useFotorama">
        <a class="img-overlay img-overlay-icon main-image" @click.prevent="openGallery"
           itemprop="associatedMedia" itemscope=""
           itemtype="https://schema.org/ImageObject"
           :href="thumbnail"
           data-size="1024x768">
            <img data-test="thumbnail" itemprop="image" :src="thumbnail" alt="" title="BYD Gegengewichtstapler ECB16"
                                     class="img-responsive img-width-100">
            <link itemprop="url" :href="thumbnail">
            <meta itemprop="width" content="1024">
            <meta itemprop="height" content="768">
        </a>
        <light-box
            :images="options"
            :showLightBox="false"
            :showThumbs="false"
            ref="lightbox"
        ></light-box>
    </div>
</template>

<script>
    import LightBox from 'vue-image-lightbox';
    import { Vue, Component, Prop } from 'vue-property-decorator';

    export default @Component({
        name: "SProductThumbnail",
        components: {
            LightBox
        }
    })

    class ProductThumbnail extends Vue{
        @Prop() thumbnail;
        @Prop() options;

        openGallery(){
            const index = this.options.findIndex(item => item.src === this.thumbnail);
            this.$refs.lightbox.showImage(index);
        }
    }
</script>

<style scoped>

</style>
