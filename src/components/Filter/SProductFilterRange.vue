<template>
  <div>
    <label class="filter-title tooltipped tooltipped-n"
           :class="{'filter-disabled': !checked}"
           :aria-label="`${options.title} ${(options.suffix ? ', ' + options.suffix : '')}`">
      <div class="c-input c-checkbox">
        <input type="checkbox" :checked="checked" @input="toggleEnabled"/>
        <div class="c-indicator"></div>
      </div>
      <span class="text-ellipsis">
          <span>{{options.title}}</span><!--
          --><span v-if="options.suffix">,&nbsp;{{options.suffix}}</span>
      </span>
    </label>
    <div class="input-group input-group-transparent" v-if="initialFilter && initialFilter.length === 2">
      <div class="onclick-inputs" v-if="!checked" @click="toggleEnabled"></div>
      <input class="form-control" type="number" :value="currentFilter[0] || initialFilter[0]"
             @input="onInput(0, $event)" :disabled="!checked">

      <span class="input-group-addon">-</span>

      <input class="form-control" type="number" :value="currentFilter[1] || initialFilter[1]"
             @input="onInput(1, $event)" :disabled="!checked">
    </div>

    <div class="product-filter-slider">
      <vue-slider
          ref="slider"
          :value="currentFilter || initialFilter"
          :min="options.range.min"
          :max="options.range.max"
          :tooltip="'none'"
          :enable-cross="false"
          :disabled="!checked"
          @change="onSliderChange"
          :process="vueSliderProcess">
        <template v-slot:dot="{ value, focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
    </div>
  </div>
</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
  import VueSlider from 'vue-slider-component';
  import { debounce } from '../../helpers/common';

  export default @Component({
    name: "SProductFilterRange",
    components: {
      VueSlider
    }
  })
  class SProductFilterRange extends Vue {
    @Prop(Object) options;
    @Prop() values;
    @Prop() value;
    @Prop(Boolean) enabled;

    checked = false;

    @Watch('value')
    switchCheckbox (newVal) {
      this.checked = newVal !== undefined;
    }

    vueSliderProcess = dotsPos => [
      [dotsPos[0], dotsPos[1], { backgroundColor: '#d81d1d' }]
    ];

    toggleEnabled () {
      this.checked = !this.checked;
      if (!this.checked) {
        this.$emit('input', undefined)
      } else {
        this.$emit('input', this.currentFilter || this.initialFilter);
      }
    }

    get initialFilter () {
      return this.value || [this.options.range.min, this.options.range.max]
    }

    get currentFilter () {
      if (this.values) {
        return this.value || [this.values.range.min, this.values.range.max]
      }
      return false
    }

    onInput (index, ev) {
      const newValue = [...this.initialFilter];
      newValue[index] = +ev.target.value;
      this.$emit('input', newValue);
    }

    getData () {
      this.$emit('input', this.$refs.slider.getValue());
    }

    onSliderChange = debounce(this.getData, 300);
  }
</script>
<style lang="scss">
  .vue-slider-rail {
    background-color: #a5ad9f;
    border-radius: 2px;
  }
  .vue-slider-disabled {
    .custom-dot {
      background-color: #a5ad9f;
    }

    .vue-slider-process {
      background-color: #a5ad9f !important;
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
