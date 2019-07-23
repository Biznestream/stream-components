<template>
    <div class="product-wrap">
        <div class="product-attributes-container flex wrap justify-between">
            <p style="margin-left: -10px">Name: {{product.title}}</p>
            <div class="attribute">
                <p class="bold">Kategorie</p>
                <p>{{product.Category}}</p>
            </div>
            <div class="attribute">
                <p class="bold">Antrieb</p>
                <p>{{product.Antrieb}}</p>
            </div>
            <div class="attribute">
                <p class="bold">max. Tragkraft</p>
                <p>{{product.Tragkraft}} kg</p>
            </div>
            <div class="attribute">
                <p class="bold">max. Hubhöhe</p>
                <p>{{product.Hubhohe}} mm</p>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';

    export default @Component({
        name: "Product"
    })

    class Product extends Vue{
        @Prop() product;
    }
</script>

<style lang="scss">
    .product-wrap{
        padding: 0 15px;
        //flex-basis: 25%;
        width: 25%;
        box-sizing: border-box;

        p{
            margin-bottom: 5px;
            margin-top: 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &:hover{
            .product-attributes-container{
                transition: .4s;
                background: #e6e6e6;
            }
        }
    }

    .product-attributes-container{
        background: #fff;
        padding: 0 10px;
        overflow: hidden;
        transition: .4s;

        .attribute{
            flex-basis: 50%;
            margin-left: -10px;
            margin-right: -10px;
        }
    }

    .bold{
        font-weight: bold;
    }
</style>
