<template>
    <div class="product-page" itemscope itemtype="http://schema.org/Product">
        <h1 itemprop="name">BYD Gegengewichtstapler ECB16</h1>
        <div>
            <div class="row">
                <div class="col-lg-4 col-md-4 col-xs-12" bz-gallery="" itemscope="" itemtype="http://schema.org/ImageGallery">
                    <s-product-thumbnail
                            :thumbnail="thumbnail"
                            :options="images"
                    >
                    </s-product-thumbnail>
                </div>
                <div class="col-lg-8 col-md-8 col-xs-12">
                    <s-product-images
                            :images="images"
                            @selectedImage="onImageSelect"
                    >
                    </s-product-images>
                    <s-product-accordion>
                        <template slot="tab" slot-scope="{ toggleTest, activeIndex }">
                            <s-product-accordion-tab
                                    :tab="tab"
                                    v-for="(tab, index) in product.tabs"
                                    :key="index"
                                    :active="index === activeIndex"
                                    @toggleTab="toggleTest(index)"
                            ></s-product-accordion-tab>
                        </template>
                    </s-product-accordion>
                    <!--<accordion class="accordion-heading-full product-attributes">-->
                    <!--</accordion>-->
                    <div class="form-widget"></div>
                </div>
            </div>
        </div>

        <!--<s-product-tab v-for="tab, index in product.tabs" :key="index" :tab="tab"></s-product-tab>-->
    </div>
</template>

<script>
    import { Vue, Component } from 'vue-property-decorator';
    import SProductAccordion from '../Product/SProductAccordion';
    import SProductAccordionTab from '../Product/SProductAccordionTab';
    import SProductThumbnail from '../Product/SProductThumbnail';
    import SProductImages from '../Product/SProductImages';

    export default @Component({
        name: "ProductPage",
        components: {
            SProductAccordion,
            SProductAccordionTab,
            SProductThumbnail,
            SProductImages
        }
    })

    class ProductPage extends Vue {
        product = {
            title: 'BYD Gegengewichtstapler ECB16',
            tabs: [
                {
                    title: 'Modellspezifikationen',
                    attributes: [
                        {
                        "id": 9338,
                        "category": 443,
                        "name": "engine_type",
                        "title": "Stapler Typ",
                        "suffix": "",
                        "type": "char",
                        "format": "",
                        "value": "Gegengewichtstapler"
                        },
                        {
                            "id": 13372,
                            "category": 443,
                            "name": "tragkraft",
                            "title": "Tragkraft",
                            "suffix": "kg",
                            "type": "number",
                            "format": "",
                            "value": 123
                        },
                        {
                            "id": 928,
                            "category": 443,
                            "name": "engine_type",
                            "title": "Stapler Typ",
                            "suffix": "",
                            "type": "char",
                            "format": "",
                            "value": "Gegengewichtstapler"
                        },
                        {
                            "id": 1334472,
                            "category": 443,
                            "name": "tragkraft",
                            "title": "Tragkraft",
                            "suffix": "kg",
                            "type": "number",
                            "format": "",
                            "value": 123
                        },
                        {
                            "id": 9338,
                            "category": 443,
                            "name": "engine_type",
                            "title": "Stapler Typ",
                            "suffix": "",
                            "type": "char",
                            "format": "",
                            "value": "Gegengewichtstapler"
                        },
                        {
                            "id": 13372,
                            "category": 443,
                            "name": "tragkraft",
                            "title": "Tragkraft",
                            "suffix": "kg",
                            "type": "number",
                            "format": "",
                            "value": 123
                        },
                        {
                            "id": 9218,
                            "category": 443,
                            "name": "engine_type",
                            "title": "Stapler Typ",
                            "suffix": "",
                            "type": "char",
                            "format": "",
                            "value": "Gegengewichtstapler"
                        },
                        {
                            "id": 12,
                            "category": 443,
                            "name": "tragkraft",
                            "title": "Tragkraft",
                            "suffix": "kg",
                            "type": "number",
                            "format": "",
                            "value": 123
                        }
                    ]
                },
                {
                    title: 'Mietgerät-Schnellinfo',
                    attributes: [{
                        "id": 3458,
                        "category": 443,
                        "name": "engine_type",
                        "title": "Stapler Typ",
                        "suffix": "",
                        "type": "char",
                        "format": "",
                        "value": "Gegengewichtstapler"
                    },
                        {
                            "id": 12172,
                            "category": 443,
                            "name": "tragkraft",
                            "title": "Tragkraft",
                            "suffix": "kg",
                            "type": "number",
                            "format": "",
                            "value": 123
                        }]
                }
            ]
        };

        thumbnail = 'https://www.fds-stapler.de/image/243781/Gegengewichtstapler+ECB16+18.jpg';

        images = [
            {
                id: 1,
                src: 'https://www.fds-stapler.de/image/243781/Gegengewichtstapler+ECB16+18.jpg'
            },
            {
                id: 2,
                src: 'https://www.fds-stapler.de/image/108313/GC15S-5-doosan.jpg'
            },
            {
                id: 3,
                src: 'https://www.fds-stapler.de/image/240187/GC15S-5.jpg'
            }
        ];

        onImageSelect(image){
            this.thumbnail = image;
        }

        mounted () {
            console.info(this.$route)
        }
    }
</script>
