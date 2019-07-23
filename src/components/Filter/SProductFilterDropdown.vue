<template>
  <div>
    <label class="filter-title tooltipped tooltipped-n"
           :aria-label="`${options.title} ${(options.suffix ? ', ' + options.suffix : '')}`">
          <span class="text-ellipsis">
              <span>{{options.title}}</span><!--
              --><span v-if="options.suffix">,&nbsp;{{options.suffix}}</span>
          </span>
    </label>
    <select class="form-control" :value="setValue" @input="onInput($event)">
      <option v-for="(val, i) in getValues" :key="i" :value="val">{{val}}</option>
    </select>
  </div>
</template>
<script>
  import { Vue, Prop, Component } from 'vue-property-decorator';

  export default @Component({
    name: "SProductFilterDropdown"
  })
  class SProductFilterDropdown extends Vue {
    @Prop(Object) options;
    @Prop() value;

    onInput (ev) {
      const value = ev.target.value;
      if (value === '...') {
        this.$emit('input', undefined)
      } else {
        this.$emit('input', value)
      }
    }

    get setValue () {
      return this.value ? this.value : '...'
    }

    get getValues () {
      const filterOption = { ...this.options };
      const valuesArray = [...filterOption.values];
      valuesArray.unshift('...');
      return valuesArray;
    }
  }
</script>
