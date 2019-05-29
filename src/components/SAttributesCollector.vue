<template>

    <div>
        <h2>Collector</h2>
        <div v-for="item in attributesArray">

            <template v-if="item.dataType === 'short-text'">

                <v-text-field
                    required
                    :value="item.value || item.default"
                    @input="$emit('input', $event)"
                ></v-text-field>

            </template>

            <template v-else-if="item.dataType === 'paragraph'">

                <v-textarea
                    required
                    :value="item.value || item.default"
                    @input="$emit('input', $event)"
                ></v-textarea>

            </template>

            <template v-else-if="item.dataType === 'dropdown'">

                <h1>Dropdown</h1>
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

            <template v-else-if="item.dataType === 'multiselect'">

                <v-layout row wrap>
                    <v-flex xs1 v-for="(item, index) in defaultValue || []">
                        <v-checkbox
                                :label="item.title"
                                :value="item.checked"
                                @change="changeHandler(index)"
                        >
                        </v-checkbox>
                    </v-flex>
                </v-layout>

            </template>

            <template v-else-if="item.dataType === 'richtext'">

                <ckeditor
                        :editor="editor"
                        :value="item.value || defaultValue "
                        @blur="onEditorBlur"
                        @ready="onEditorReady"
                        @input="onEditorInput($event)"
                        v-model="editorData"
                ></ckeditor>
                <div v-if="!valid" class="v-messages theme--light error--text mb-1 mt-1">
                    <div class="v-messages__wrapper">
                        <div class="v-messages__message">This field is required</div>
                    </div>
                </div>

            </template>

        </div>
    </div>

</template>

<script>
    import {Vue, Prop, Model, Component} from 'vue-property-decorator';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default @Component({
        name: "SAttributesCollector"
    })

    class SAttributesCollector extends Vue {
        @Model('input') value;
        @Prop(Object) attributes;
        @Prop() defaultValue;
        @Prop(String) type;
        @Prop(Boolean) required;

        data(){
            return {
                attributesArray: [],
                editor: ClassicEditor,
                valid: false
            }
        }

        changeHandler(index){
            let array = this.defaultValue.map(item => ({...item}));
            array[index].checked = !array[index].checked;
            console.log(array);
            this.$emit('input', [...array]);
        }

        get transformData(){
            let selected;
            let array;
            if(typeof this.defaultValue === "object"){
                array = this.defaultValue.map(item => item.title);
                selected = this.defaultValue.filter(item => item.checked === true);
                selected.length > 0 ? selected = selected[0].title : selected = 'Select default value'
            }
            return {
                array,
                selected
            }
        }

        mounted(){
            this.attributesArray.push(this.attributes)
        }

        onEditorBlur(){
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorReady(){
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorInput(event) {
            this.$emit('input', event);
            !event ? this.valid = false : this.valid = true
        }
    }
</script>

<style scoped>

</style>
