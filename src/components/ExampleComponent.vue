<template>

    <div>Example <span v-text="value"></span></div>

</template>
<style lang="scss" scoped>
    div {
        color: red;
    }
</style>
<script>
import Vue from 'vue';
import { Model } from 'vue-property-decorator';
import Component from 'nuxt-class-component';

export default @Component({
    name: 'ExampleComponent', // mandatory property to avoid minification problems
    components: {}
})
class ExampleComponent extends Vue {
    @Model('input') value;
}
</script>
