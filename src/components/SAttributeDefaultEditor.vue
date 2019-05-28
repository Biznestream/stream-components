<template>

    <div>

        <template v-if="type === DataTypes.SHORTTEXT_TYPE">

            <v-text-field
                    :rules="required ? [emptyValidation()] : []"
                    :value="value" @input="$emit('input', $event)">
            </v-text-field>

        </template>
        <template v-else-if="type === DataTypes.PARAGRAPH_TYPE">

            <v-textarea
                    :rules="required ? [emptyValidation()] : []"
                    :value="value" @input="$emit('input', $event)"
            ></v-textarea>

        </template>

        <template v-else-if="type === DataTypes.RICHTEXT_TYPE">

            <ckeditor
                    :editor="editor"
                    :value="value"
                    @blur="onEditorBlur"
                    @ready="onEditorReady"
                    @input="onEditorInput($event)"
            ></ckeditor>
            <div v-if="!valid" class="v-messages theme--light error--text mb-1 mt-1">
                <div class="v-messages__wrapper">
                    <div class="v-messages__message">This field is required</div>
                </div>
            </div>

        </template>

        <template v-else-if="type === DataTypes.DROPDOWN_TYPE || type === DataTypes.MULTISELECT_TYPE">

            <div>
                <draggable class="p-4" v-model="attributeItems" :options="{group:'value'}" handle=".handle">
                    <v-layout row v-for="(item, index) in attributeItems">
                        <v-flex>
                            <v-list-tile-avatar style="cursor: ns-resize">
                                <v-icon class="handle">format_line_spacing</v-icon>
                            </v-list-tile-avatar>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    :value="item.title"
                                    :rules="required ? [emptyValidation()] : []"
                                    @input="editValue(index, $event)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-checkbox
                                    @change="changeHandler(index, $event)"
                                    :value="item.checked"
                                    v-if="type === DataTypes.MULTISELECT_TYPE">
                            </v-checkbox>
                            <v-radio-group v-model="selectedItemIndex" :mandatory="false" v-else>
                                <v-radio
                                        color="info"
                                        :value="index"
                                        @change="changeHandler(index, $event)"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-flex>
                        <v-flex>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1"
                                        @click="removeItem(index)">
                                    delete
                                </v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </draggable>
                <v-form ref="form">
                    <v-container class="container">
                        <v-text-field
                                v-model="name"
                                :rules="required ? [emptyValidation()] : []"
                                label="Item"
                                required
                        ></v-text-field>
                    </v-container>
                    <v-btn color="info" @click="addItem">Add</v-btn>
                </v-form>
            </div>

        </template>

        <template v-else-if="type === DataTypes.DATETIME_TYPE">

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
                                label="Picker in menu"
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

        <template v-else-if="type === DataTypes.NUMBER_TYPE">

            <v-text-field
                    label="Integer"
                    type="number"
                    @input="$emit('input', $event)"
                    :rules="required ? [emptyValidation() && numberValidation()] : []"
                    :value="value"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.DECIMAL_TYPE">

            <v-text-field
                    label="Integer"
                    type="number"
                    @input="$emit('input', $event)"
                    :rules="required ? [emptyValidation()] : []"
                    :value="value"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.LINK_TYPE">

            <v-text-field
                    :rules="required ? [emptyValidation() && urlValidation()] : []"
                    @input="$emit('input', $event)"
                    :value="value"
            ></v-text-field>

        </template>

        <template v-else-if="type === DataTypes.SWITCH_TYPE">

            <v-switch
                    :value="value"
                    @change="switchHandler($event)"
                    :label="`Selected: ${value.toString()}`"
            ></v-switch>

        </template>

        <template v-else-if="type === DataTypes.IMAGE_TYPE || type === DataTypes.GALLERY_TYPE">

            <v-btn icon @click="chooseFile">
                <v-icon>attach_file</v-icon>
                <input type="file"
                       :multiple="type === DataTypes.IMAGE_TYPE ? false : true"
                       ref="fileInput" @change="onFileChange">
            </v-btn>

        </template>

        <template v-else-if="type === DataTypes.SEPARATOR_TYPE">

            <hr>

        </template>

        <template v-else>

            <div class="error--text">No editor for type: {{type}}</div>

        </template>

    </div>

</template>
<style lang="scss" scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>
<script>
    import {Vue, Prop, Model, Watch, Component} from 'vue-property-decorator';
    import * as DataTypes from '../constants';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import draggable from 'vuedraggable';
    import sortBy from 'lodash/sortBy';
    import pick from 'lodash/pick';

    export default @Component({
        name: 'SAttributeDefaultEditor', // mandatory property to avoid minification problems
        components: {
            draggable
        }
    })
    class SAttributeDefaultEditor extends Vue {
        @Model('input') value;
        @Prop(String) type;
        @Prop(Boolean) required;

        data() {
            return {
                DataTypes,
                editor: ClassicEditor,
                name: '',
                date: '',
                array: [],
                menu: false,
                modal: false,
                switchItem: true,
                valid: false
            };
        }

        @Watch('type')
        trackValue(newVal, oldVal){
            let str = '<hr>';
            if(newVal === 'separator'){
                this.$emit('input', str)
            }
            if(newVal === 'switch' && typeof this.value !== 'boolean'){
                this.$emit('input', false)
            }
        }

        /*@Watch('switchItem')
        switchValue(newVal, oldVal){
            console.log(newVal);
            this.$emit('input', newVal);
        }*/

        switchHandler(event){
            console.log(event);
            this.$emit('input', event)
        }

        numberValidation(message = 'You can enter only integers') {
            return v => v.indexOf('.') > -1 ? message : false
        }

        urlValidation(message = 'You can enter only URL') {
            const reg = /^(ftp|http|https):\/\/[^ "]+$/;
            return v => reg.test(v) || message
        }

        get selectedItemIndex(){
            return this.value.findIndex(item => item.checked);
        }

        get attributeItems() {
            if (typeof this.value !== 'object') {
                return;
            }
            const ids = (this.value || []).map(attr => attr.title);
            return sortBy(this.value || [], attr => ids.indexOf(attr.title) === -1 ? 1000 : ids.indexOf(attr.title));
        }

        set attributeItems(val) {
            const attrs = val.map(attr => pick(attr, ['checked', 'title']));
            this.array = attrs;
            this.$emit('input', [...attrs]);
        }

        emptyValidation(message = 'This field is required.') {
            return v => !!v || message;
        }

        addItem() {
            const newItem = {
                checked: false,
                title: this.name
            };
            if (this.$refs.form.validate()) {
                this.array.push(newItem);
                this.$emit('input', [...this.array]);
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            }
        }

        editValue(index, event) {
            this.array[index].title = event;
            this.$emit('input', [...this.array])
        }

        removeItem(index) {
            this.array.splice(index, 1);
            this.$emit('input', [...this.array]);
        }

        changeHandler(index) {
            if (this.type === DataTypes.MULTISELECT_TYPE) {
                this.array[index].checked = !this.array[index].checked;
                this.$emit('input', [...this.array]);
            } else {
                this.array.forEach((elem, idx) => elem.checked = idx == index);
                this.array[index].checked = true;
                this.$emit('input', [...this.array])
            }
        }

        onEditorBlur() {
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorReady(){
            this.value.length > 0 ? this.valid = true : this.valid = false;
        }

        onEditorInput(event) {
            this.$emit('input', event);
            !event ? this.valid = false : this.valid = true
        }

        cancel() {
            this.date = '';
            this.menu = false;
        }

        save() {
            this.menu = false;
            this.$emit('input', this.date);
        }

        chooseFile() {
            this.$refs.fileInput.click();
        }

        onFileChange($event) {
            const files = $event.target.files || $event.dataTransfer.files;
            console.log(files);
            this.$emit('input', [...files]);
        }
    }
</script>
