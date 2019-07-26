<template>

  <div class="section product-section">

    <div class="product-filter-outer container" sticky-container id="filter">

      <div v-sticky>

        <s-product-filter-container :title="sectionOptions.title"
                                    :collapsed.sync="filterCollapsed"
                                    :filters="sectionOptions.attributes"
                                    v-model="filter" @input="onFilterUpdate($event, false)">

          <s-product-filter v-model="filter"
                            :options="sectionOptions"
                            :filters="sectionOptions.attributes"
                            :values="currentFilterValues"
                            :filter-count="filterCount"
                            @input="onFilterUpdate"
                            @filter="getFilterData"
          ></s-product-filter>

        </s-product-filter-container>

        <s-product-navigation></s-product-navigation>
      </div>

      <div class="current-product-view list-view-null">
        <router-view></router-view>
      </div>
    </div>

  </div>

</template>

<script>
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
  import SProductNavigation from './Filter/SProductNavigation';
  import { filterToParams, qsToFilter } from '../helpers/common';

  export default @Component({
    name: "ProductsSection",
    components: {
      SProductNavigation
    }
  })
  class ProductsSection extends Vue {
    filterCollapsed = false;

    filter = {};

    sectionOptions = {};

    currentFilterValues = [];

    filterCount = 0;

    async mounted () {
      await this.getFilterData();
      this.onQueryChange();
    }

    onFilterUpdate(val, collapse = true) {
      this.filter = val;
      this.filterCollapsed = collapse;
      const query = filterToParams(val, this.sectionOptions.attributes, this.filter, true);

      const newRoute = { ...this.$route };
      newRoute.name = 'page';
      newRoute.query = query;
      this.$router.push(newRoute);
    }

    getFilterData (val) {
      if (val) {
        return axios.get('https://stapler-mieten.staplercenter-pieckert.de/api/configuration/619/filter?', {
          params: this.transformObject(val)
        })
          .then(res => {
            this.currentFilterValues = res.data.attributes;
          })
          .catch(error => console.error(error))
      } else {
        return axios.get('https://stapler-mieten.staplercenter-pieckert.de/api/configuration/619/filter?offset=0&section=122761238')
          .then(res => {
            this.sectionOptions = res.data
          })
          .catch(error => console.error(error))
      }
    }

    transformObject (obj) {
      const newKeys = Object.keys(obj).map(item => {
        return `f${item}`
      });
      const oldKeys = Object.keys(obj);
      let newData = {};
      for (let i in newKeys) {
        newData[newKeys[i]] = obj[oldKeys[i]];
        obj[newKeys[i]] = obj[oldKeys[i]];
        delete obj[newKeys[i]]
      }
      for (const key in newData) {
        if (Array.isArray(newData[key])) {
          newData[key] = newData[key][0] + '-' + newData[key][1]
        }
      }
      return newData;
    }

    @Watch('$route.query')
    onQueryChange () {
      this.filter = qsToFilter(this.$route.query, this.sectionOptions.attributes, {}, true);
    }
  }
</script>
