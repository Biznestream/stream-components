<template>
    <div class="product product-page">
        <h1>{{value.name}}</h1>
        <div class="row">
            <div class="product-image col-lg-4 col-md-4 col-xs-12">
                <img :src="value.image" alt="product">
            </div>
            <div class="product-tab col-lg-8 col-md-8 col-xs-12">
                <ul class="accordion panel-group" v-for="tab in value.tabs">
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
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';

    export default @Component({
        name: "SProductTab"
    })

    class ProductTab extends Vue{
        @Prop(Object) value;

        isActive = null;

        toggleItem(index){
            this.isActive = index;
        }
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

            img{
                width: 100%;
                height: auto;
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
    }
</style>
