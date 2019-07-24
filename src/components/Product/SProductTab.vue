<template>
    <div class="product product-page">
        <h1>Title</h1>
        <div class="row">
            <div class="product-image col-lg-4 col-md-4 col-xs-12">
                <img v-for="(item, index) in images" @click="imageIndex = index" :src="item.image" :key="item.id" alt="image">
                <vue-pure-lightbox
                        style="width: 20em"
                        thumbnail="https://picsum.photos/id/0/600/450"
                        :images="images"
                ></vue-pure-lightbox>
            </div>
            <div class="product-tab col-lg-8 col-md-8 col-xs-12">
                <!--<ul class="accordion panel-group">
                    <li v-for="(item, index) in tab.attributes" @click="toggleItem(index)" :class="{active: isActive === index}">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <p class="accordion-toggle">{{item.type}}</p>
                            </h4>
                        </div>
                        <div class="panel">
                            <p v-if="isActive === index" class="accordion-item-details">{{item}}</p>
                        </div>
                    </li>
                </ul>-->
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <span class="accordion-toggle">Details</span>
                    </h4>
                    <div class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row dl-leaders">
                                <s-product-attribute  v-for="(item, index) in value.attributes" :attribute="item"></s-product-attribute>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{value}}
    </div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';
    import SProductAttribute from './SProductAttribute';

    export default @Component({
        name: "SProductTab",
        components: {
            SProductAttribute
        }
    })

    class ProductTab extends Vue{
        @Prop() value;

        isActive = null;
        imageIndex = null;

        toggleItem(index){
            this.isActive = index;
        }

        openModal(index){
            this.index = index;
        }

        images = [
            'https://picsum.photos/id/0/600/450',
            'https://picsum.photos/id/17/600/450',
            'https://picsum.photos/id/7/600/450',
        ]

        /*images = [
            {
                id: 1,
                name: 'notepad',
                image: 'https://picsum.photos/id/0/600/450'
            },
            {
                id: 2,
                name: 'road',
                image: 'https://picsum.photos/id/17/600/450'
            },
            {
                id: 3,
                name: 'meeting',
                image: 'https://picsum.photos/id/7/600/450'
            }
        ]*/
    }
</script>

<style scoped lang="scss">
    .product{
        width: 100%;

        .panel{
            color: #3e3b3b;
            background-color: #e6e6e6;
            border-color: transparent;
        }

        .accordion{
            padding: 0;
        }

        &-image{
            padding: 0 15px;
            box-sizing: border-box;
            height: auto;

            img{
                width: 100%;
                height: auto;
                cursor: pointer;
            }
        }

        .panel-heading{
            color: #3e3b3b;
            background-color: #dcdcdc;
            border-color: transparent;
        }

        &-tab{
            box-sizing: border-box;
        }

        .accordion-toggle {
            cursor: pointer;
            display: block;
            padding: 10px 15px;
            font-family: "Lato", sans-serif, "google";
            color: #ec1414;
            margin: -10px -15px;
        }
    }
</style>
