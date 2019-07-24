<template>
  <div class="filter-container">

    <div class="filter-header" :class="{'has-filters': hasActiveFilters}" @click.prevent="toggleCollapse">
      <a href="" class="collapsed-button btn btn-primary">
        <span class="glyphicon" :class="{'glyphicon-chevron-up': !collapsed, 'glyphicon-chevron-down': collapsed}"></span>
      </a>
      <span class="h3" v-if="title">{{title}}</span>

      <a href="" v-for="filter in activeFilters" class="active-filter btn btn-primary" @click.prevent.stop="removeFilter(filter)">
        {{filter.title}}
        <span class="glyphicon glyphicon-remove"></span>
      </a>
    </div>

    <div class="products-filter" :class="{'collapse': collapsed}">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  import { Vue, Prop, Component } from 'vue-property-decorator';

  export default @Component({
    name: "SProductFilterContainer",
    components: {}
  })
  class SProductFilterContainer extends Vue {
    @Prop(String) title;
    @Prop({ type: Object, default: () => ({}) }) value;
    @Prop(Boolean) collapsed;
    @Prop(Array) filters;

    get hasActiveFilters(){
      return Object.keys(this.value).length > 0;
    }

    get activeFilters() {
      return Object.keys(this.value).filter(key => this.value[key] !== undefined).map(key => {
        return this.filters.find(filter => filter.name === key);
      })
    }

    toggleCollapse() {
      this.$emit('update:collapsed', !this.collapsed);
    }

    removeFilter(filter) {
      const newValue = { ...this.value };
      delete newValue[filter.name];

      this.$emit('input', newValue);
    }
  }
</script>
