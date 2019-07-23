<template>
  <div>
    <div class="product-filters-popup" ng-class="{'open': current.showFilterPopup}">

      <div class="row">

        <div class="product-filters-container">

          <div class="product-filter" v-for="(attribute, index) in filters" :key="index" v-if="!attribute.hidden">

            <template v-if="attribute.type === 'number'">

              <s-product-filter-range
                  @input="onFilter(attribute, $event)"
                  :options="attribute"
                  :values="currentData(attribute.name)"
                  :value="currentFilter[attribute.name]"></s-product-filter-range>

            </template>
            <template v-else>

              <s-product-filter-dropdown
                  @input="onFilter(attribute, $event)"
                  :options="attribute"
                  :value="currentFilter[attribute.name]"
              ></s-product-filter-dropdown>

            </template>

          </div>
          <!--div class="product-links-container">
              <ul class="product-links list-inline list-unstyled" ng-repeat="category in filterData.links">
                  <li><a href="" data-ng-click="filterWith(category.name, '')">{{'All'}}</a></li>
                  <li data-ng-repeat="link in category.links">
                      <a href="" data-ng-click="filterWith(category.name, link)">
                          {{link}}
                      </a>
                  </li>
              </ul>
          </div-->

        </div>
        <div class="product-buttons-container">
          <!--label>&nbsp;</label-->

          <button class="btn btn-primary btn-block" type="submit" @click="submitFilter">
                <span class="text-ellipsis">
                    <span v-if="filterCount">{{filterCount}}</span>
                    {{options.filterButtonCaption || 'Filter'}}
                </span>
          </button>
          <button class="btn btn-default btn-block" v-if="isCanReset" type="reset" @click="resetFilter">
            <span class="text-ellipsis">{{options.backButtonCaption || 'Reset'}}</span>
          </button>
        </div>
      </div>
    </div>
    {{currentFilter}}
  </div>
</template>

<script>
  import { Vue, Prop, Component, Emit, Watch } from 'vue-property-decorator';
  import SProductFilterDropdown from './SProductFilterDropdown';
  import SProductFilterRange from './SProductFilterRange';

  export default @Component({
    name: "SProductFilter",
    components: {
      SProductFilterDropdown,
      SProductFilterRange
    }
  })

  class SProductFilter extends Vue {
    @Prop(Object) options;
    @Prop() value;
    @Prop() values;
    @Prop(Array) filters;
    @Prop(Number) filterCount;

    currentFilter = {};

    get hasActiveFilters () {
      return Object.keys(this.currentFilter).length > 0;
    }

    get isCanReset () {
      return Object.keys(this.value || {}).length > 0;
    }

    get filterKeys () {
      return Object.keys(this.currentFilter);
    }

    onFilter (item, value) {
      const newValue = { ...this.currentFilter };
      newValue[item.name] = value;
      this.currentFilter = newValue;

      this.setCurrentFilter(this.currentFilter);
    }

    resetFilter () {
      this.currentFilter = {};
      this.submitFilter();
    }

    submitFilter() {
      this.setFilter(this.currentFilter);
    }

    currentData (name) {
      return this.values.find(el => el.name === name)
    }

    @Emit('filter')
    setCurrentFilter(filter) {
    }

    @Emit('input')
    setFilter(filter) {
    }

    @Watch('value')
    onValueChanged (val) {
      this.currentFilter = { ...val };
    }
  }
</script>
