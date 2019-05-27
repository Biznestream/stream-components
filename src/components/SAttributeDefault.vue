<template>

    <div>
        <template v-if="type === DataTypes.SHORTTEXT_TYPE">

            <h1>{{value}}</h1>

        </template>

        <template v-if="type === DataTypes.PARAGRAPH_TYPE">

            <p>{{value}}</p>

        </template>

        <template v-else-if="type === DataTypes.RICHTEXT_TYPE">

            <div v-html="value"></div>

        </template>

        <template v-else-if="type === DataTypes.MULTISELECT_TYPE">

            <v-layout row wrap>
                <v-flex xs1 v-for="item in value || []">
                    <v-checkbox
                            :label="item.title"
                            :value="item.checked"
                    >
                    </v-checkbox>
                </v-flex>
            </v-layout>

        </template>

        <template v-else-if="type === DataTypes.DROPDOWN_TYPE">

            <div id="dropdown">
                <v-flex xs12 sm4>
                    <v-overflow-btn
                            :items="transformData.array"
                            :label="transformData.selected || ''"
                            target="#dropdown"
                    ></v-overflow-btn>
                </v-flex>
            </div>

        </template>

        <template v-else-if="type === DataTypes.DATETIME_TYPE || type === DataTypes.NUMBER_TYPE || type === DataTypes.DECIMAL_TYPE">

            <div>{{value}}</div>

        </template>

        <template v-else-if="type === DataTypes.LINK_TYPE">

            <div v-html="link"></div>

        </template>

        <template v-else-if="type === DataTypes.SWITCH_TYPE">

            <div>{{value}}</div>

        </template>

        <template v-else-if="type === DataTypes.IMAGE_TYPE || type === DataTypes.GALLERY_TYPE">



        </template>

    </div>

</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';
    import moment from 'moment';
    import * as DataTypes from '../constants';

    export default @Component({
        name: "SAttributeDefault",
        filters: {
            formatDate (date) {
                return moment(date).format('DD.MM.YYYY HH:mm');
            }
        }
    })

    class SAttributeDefault extends Vue {
        @Prop(String) type;
        @Prop() value;

        data () {
            return {
                DataTypes
            }
        }

        get transformData(){
            let selected;
            let array;
            if(typeof this.value === "object"){
                array = this.value.map(item => item.title);
                selected = this.value.filter(item => item.checked === true);
                selected.length > 0 ? selected = selected[0].title : selected = 'Select default value'
            }
            return {
                array,
                selected
            }
        }

        get link(){
            return `<a target="_blank" href="${this.value}">${this.value}</a>`;
        }
    }

</script>

<style scoped>

</style>
