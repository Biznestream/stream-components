<template>

    <div>
        <h2>Collector</h2>
        <div v-for="item in attributesArray">

            <template v-if="item.dataType === 'short-text'">

                <v-text-field
                    required
                    :placeholder="item.default"
                    :value="item.value || ''"
                    :rules="required ? [emptyValidation()] : []"
                    @input="$emit('input', $event)"
                ></v-text-field>

            </template>

            <template v-else-if="item.dataType === 'paragraph'">

                <v-textarea
                    required
                    :placeholder="item.default"
                    :value="item.value || ''"
                    :rules="required ? [emptyValidation()] : []"
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
                                @change="changeHandler(index, $event)"
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

            <template v-else-if="item.dataType === 'datetime'">

                <v-layout row wrap>
                    <v-flex xs11 sm5>
                        <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="menu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                max-width="290px"
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    :label="defaultValue"
                                    prepend-icon="event"
                                    readonly
                                    :value="value"
                            ></v-text-field>
                            <v-date-picker v-model="date" no-title scrollable actions>
                                <template>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="save">OK</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>

            </template>

            <template v-else-if="item.dataType === 'number'">
                <h4>Number</h4>

                <v-text-field
                        label="Integer"
                        type="number"
                        @input="$emit('input', $event)"
                        :rules="required ? [emptyValidation() && numberValidation()] : []"
                        :value="item.value || defaultValue"
                ></v-text-field>

            </template>

            <template v-else-if="item.dataType === 'decimal'">
                <h4>Decimal</h4>

                <v-text-field
                        label="Integer"
                        type="number"
                        @input="$emit('input', $event)"
                        :rules="required ? [emptyValidation()] : []"
                        :value="item.value || defaultValue"
                ></v-text-field>

            </template>

            <template v-else-if="item.dataType === 'link'">

                <div v-html="link"></div>

                <v-text-field
                        :rules="required ? [emptyValidation() && urlValidation()] : []"
                        @input="$emit('input', $event)"
                        :value="item.value || defaultValue"
                ></v-text-field>

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
        @Prop(Boolean) required;
        @Prop() attributeValue;

        data(){
            return {
                attributesArray: [],
                editor: ClassicEditor,
                valid: false,
                menu: false,
                date: ''
            }
        }

        changeHandler(index, event){
            let array = this.defaultValue.map(item => ({...item}));
            array[index].checked = event;
            console.log(array);
            console.log(event);
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

        get editorData(){
            return this.defaultValue
        }

        set editorData(val){
            return val
        }

        mounted(){
            this.attributesArray.push(this.attributes)
        }

        onEditorBlur(){
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorReady(){
            return (this.value || this.defaultValue) ? this.valid = true : this.valid = false
        }

        onEditorInput(event) {
            this.$emit('input', event);
            !event ? this.valid = false : this.valid = true
        }

        emptyValidation(message = 'This field is required.') {
            return v => !!v || message;
        }

        numberValidation(message = 'You can enter only integers') {
            return v => v.indexOf('.') > -1 ? message : false
        }

        urlValidation(message = 'You can enter only URL') {
            const reg = /^(ftp|http|https):\/\/[^ "]+$/;
            return v => reg.test(v) || message
        }

        cancel() {
            this.date = '';
            this.menu = false;
        }

        save() {
            this.menu = false;
            this.$emit('input', this.date);
        }
    }
</script>

<style scoped>

</style>
