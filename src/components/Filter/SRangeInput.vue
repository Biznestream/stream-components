<template>
    <div>
        <label class="flex justify-between">
            <span>{{options.title}}<span v-if="options.suffix">, {{options.suffix}}</span></span>
            <input type="checkbox" v-model="checked" @input="onChange($event)">
        </label>
        <div class="range-input flex justify-between" style="margin-bottom: 1em" v-if="sliderValue && sliderValue.length === 2">
            <input type="number" :value="sliderValue[0]" @input="onInput(0, $event)" :disabled="disabled">
            <input type="number" :value="sliderValue[1]" @input="onInput(1, $event)" :disabled="disabled">
        </div>
        <vue-slider
                ref="slider"
                :value="sliderValue"
                :min="options.range.min"
                :max="options.range.max"
                :tooltip="'none'"
                :enable-cross="false"
                :disabled="disabled"
                @change="onSliderChange"
                :process="process">
            <template v-slot:dot="{ value, focus }">
                <div :class="['custom-dot', { focus }]"></div>
            </template>
        </vue-slider>
        {{options}}
    </div>
</template>

<script>
    import {Vue, Prop, Component, Watch} from 'vue-property-decorator';
    import VueSlider from 'vue-slider-component';

    export default @Component ({
        name: "rangeInput",
        components: {
            VueSlider
        }
    })

    class SRangeInput extends Vue {
        @Prop(Object) options;
        @Prop() value;

        @Watch('value')
        switchCheckbox(newVal){
            if(!newVal){
                this.disabled = true;
                this.checked = false;
            }
        }

        disabled = true;
        checked = false;

        onChange(event){
            const checked = event.target.checked;
            this.disabled = !checked;
            if(!checked){
                this.$emit('input', undefined)
            } else {
                this.$emit('input', this.sliderValue)
            }
        }

        get sliderValue(){
            return this.value || [this.options.range.min, this.options.range.max]
        }

        process = dotsPos => [
            [dotsPos[0], dotsPos[1], {backgroundColor: '#d81d1d'}]
        ];

        onInput(index, ev){
            const newValue = [...this.sliderValue];
            newValue[index] = +ev.target.value;
            this.$emit('input', newValue);
        }

        debounce(f, ms) {
            let timer = null;
            return function (...args) {
                const onComplete = () => {
                    f.apply(this, args);
                    timer = null;
                };
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(onComplete, ms);
            };
        }

        getData(){
            this.$emit('input', this.$refs.slider.getValue());
        }

        onSliderChange = this.debounce(this.getData, 300);
    }
</script>

<style lang="scss">
    @import '~vue-slider-component/theme/antd.css';

    .vue-slider-disabled{
        .custom-dot{
            background-color: #f05454;
        }

        .vue-slider-process{
            background-color: #f05454!important;
        }
    }

    .custom-dot {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #d81d1d;
        transition: all .3s;
        cursor: pointer;
    }
</style>
