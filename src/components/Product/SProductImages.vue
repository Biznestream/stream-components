<template>
    <ul class="list-product-images list-small-images list-unstyled">
        <li v-for="(item, index) in options" :key="item.id">
            <a class="img-overlay" href="" @click.prevent="selectImage(item.image, index)" :class="{active: index === selectedIndex}">
                <img :src="item.image" alt="Doosan GC15S-5" title="Doosan Treibgasstapler GC15S-5 neu kaufen" class="img-responsive">
            </a>
        </li>
    </ul>
</template>

<script>
    import { Vue, Component, Prop } from 'vue-property-decorator';

    export default @Component({
        name: "SProductImages"
    })

    class SProductImages extends Vue{
        @Prop() options;

        selectedIndex = 0;

        selectImage(image, index){
            this.selectedIndex = index;
            this.$emit('selectedImage', image)
        }
    }
</script>

<style scoped>

</style>
