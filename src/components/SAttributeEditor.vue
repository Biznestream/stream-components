<template>

    <div>
        <template v-if="type === DataTypes.SHORTTEXT_TYPE">

            <v-text-field
                    :value="value"
                    :placeholder="defaultValue"
                    :rules="required ? [emptyValidation()] : []"
                    label="Short text"
                    @input="$emit('input', $event)"
                    required
            ></v-text-field>

        </template>

        <template v-if="type === DataTypes.PARAGRAPH_TYPE">

            <v-textarea
                    :value="value"
                    :placeholder="defaultValue"
                    :rules="required ? [emptyValidation()] : []"
                    label="Paragraph"
                    @input="$emit('input', $event)"
                    required
            ></v-textarea>

        </template>

        <template v-else-if="type === DataTypes.RICHTEXT_TYPE">

            <ckeditor
                    :editor="editor"
                    :value="defaultValue"
                    @blur="editorValidation"
                    @ready="editorValidation"
                    @input="onEditorInput($event)"
                    v-model="editorData"
            ></ckeditor>
            <div v-if="!valid" class="v-messages theme--light error--text mb-1 mt-1">
                <div class="v-messages__wrapper">
                    <div class="v-messages__message">This field is required</div>
                </div>
            </div>

        </template>

        <template v-else-if="type === DataTypes.MULTISELECT_TYPE">

            <v-layout row wrap>
                <v-flex xs1 v-for="(item, index) in val || defaultValue" :key="index">
                    <v-checkbox
                            :label="item.title"
                            :input-value="item.checked"
                            @change="changeHandler(index)"
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

        <template v-else-if="type === DataTypes.DATETIME_TYPE">

            <v-layout row wrap>
                <v-flex xs11 sm5>
                    <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="date"
                                    :label="defaultValue"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <template>
                                <v-spacer></v-spacer>
                                <v-btn text @click="cancel">Cancel</v-btn>
                                <v-btn text @click="save">OK</v-btn>
                            </template>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>

        </template>

        <template v-else-if="type === DataTypes.NUMBER_TYPE">

            <v-text-field
                    label="Integer"
                    required
                    type="number"
                    @input="$emit('input', $event)"
                    :rules="required ? [emptyValidation() && numberValidation()] : []"
                    :placeholder="defaultValue"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.DECIMAL_TYPE">

            <v-text-field
                    label="Decimal"
                    required
                    type="number"
                    @input="$emit('input', $event)"
                    :rules="required ? [emptyValidation()] : []"
                    :placeholder="defaultValue"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.LINK_TYPE">

            <v-text-field
                    :rules="required ? [emptyValidation() && urlValidation()] : []"
                    @input="$emit('input', $event)"
                    :placeholder="defaultValue"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.SWITCH_TYPE">

            <v-switch
                    :true-value="defaultValue"
                    :label="`Selected: ${defaultValue.toString()}`"
                    @change="switchHandler($event)"
            ></v-switch>

        </template>

        <template v-else-if="type === DataTypes.IMAGE_TYPE || type === DataTypes.GALLERY_TYPE">



        </template>

        <template v-else-if="type === DataTypes.SEPARATOR_TYPE">

            <div v-html="value"></div>

        </template>

    </div>

</template>

<script>
    import {Vue, Prop, Model, Component} from 'vue-property-decorator';
    import moment from 'moment';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import * as DataTypes from '../constants';

    export default @Component({
        name: "SAttributeEditor.vue",
        filters: {
            formatDate (date) {
                return moment(date).format('DD.MM.YYYY HH:mm');
            }
        }
    })

    class SAttributeDefault extends Vue {
        @Model('input') value;
        @Prop(String) type;
        @Prop(Boolean) required;
        @Prop() val;
        @Prop() defaultValue;

        data () {
            return {
                DataTypes,
                date: '',
                switchItem: true,
                editor: ClassicEditor,
                menu: false,
                valid: false
            }
        }

        get formattedValue () {
            switch(this.type){
                case DataTypes.MULTISELECT_TYPE:
                case DataTypes.DROPDOWN_TYPE:
                    return Array.isArray(this.value) ? this.value : [];
                default:
                    return this.value || this.defaultValue || ''
            }
        }

        editorValidation() {
            this.valid = this.formattedValue.length > 0
        }

        /*onEditorBlur() {
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorReady(){
            return this.defaultValue ? this.valid = true : this.valid = false;
        }*/

        get editorData(){
            return this.defaultValue
        }

        set editorData(val){
            return val
        }

        onEditorInput(event){
            this.$emit('input', event);
            !event ? this.valid = false : this.valid = true
        }

        switchHandler(event){
            this.$emit('input', event)
        }

        changeHandler(index){
            if(!this.val){
                let array = this.defaultValue.map(item => ({...item}));
                array[index].checked = !array[index].checked;
                this.$emit('input', array);
            } else {
                let array = [...this.val];
                array[index].checked = !array[index].checked;
                this.$emit('input', array);
            }
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

        emptyValidation(message = 'This field is required.') {
            return v => !!v || message;
        }

        cancel() {
            this.date = '';
            this.menu = false;
        }

        save() {
            this.menu = false;
            this.$refs.menu.save(this.date);
            this.$emit('input', this.date);
        }

        urlValidation(message = 'You can enter only URL') {
            const reg = /^(ftp|http|https):\/\/[^ "]+$/;
            return v => reg.test(v) || message
        }

        numberValidation(message = 'You can enter only integers') {
            return v => v ? (v.indexOf('.') > -1 ? message : false) : message
        }
    }

</script>

<style scoped>

</style>
