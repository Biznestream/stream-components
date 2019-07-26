<template>
  <dl class="attribute has-value" itemprop="additionalProperty" itemscope="" itemtype="http://schema.org/PropertyValue">
    <dt v-if="showTitle && attribute.title" class="text-ellipsis" :class="`type-${attribute.type}`">{{attribute.title}}</dt>
    <dd :class="`type-${attribute.type + (attribute.format == 'rich text' ? ' rich-html' : '')}`">
      <template v-if="attribute.type === 'boolean'">
        <template v-if="attribute.value">&#10003;</template>
        <template v-else>&ndash;</template>
      </template>
      <template v-else-if="attribute.type === 'list'">
        <ul>
          <li v-for="(item, n) in items" :key="n">{{item}}</li>
        </ul>
      </template>
      <template v-else>
        <template v-if="attribute.format === 'rich text'">
          <span class="attribute-rich-text" v-html="attribute.value"></span>
        </template>
        <template v-if="attribute.format === 'youtube'">
          <div class="embed-responsive embed-responsive-16by9">
          <iframe class="youtube embed-responsive-item" :src="`//www.youtube.com/embed/${attribute.value}?rel=0`" frameborder="0" allowfullscreen></iframe>
          </div>
        </template>
        <template v-if="attribute.format === 'link'">
          <a :href="attribute.value" target="_blank">{{attribute.title}}</a>
        </template>
        <template v-else-if="attribute.link">
          <a :href="attribute.link">{{attribute.value}}</a>
        </template>
        <template v-else>
          <span class="tooltipped tooltipped-n" :aria-label="attribute.value" v-if="attribute.value">
            <span class="text-ellipsis">
              <span v-html="('' + attribute.value).replace(/\n/g,'<br>')"></span>
              <template v-if="attribute.suffix">&nbsp;{{attribute.suffix}}</template>
            </span>
          </span>
        </template>
      </template>
    </dd>
  </dl>
</template>

<script>
  import {Vue, Prop, Component} from 'vue-property-decorator';

  export default @Component({
    name: "SProductAttribute"
  })

  class SProductAttribute extends Vue{
    @Prop() attribute;
    @Prop(Boolean) showTitle;

    get items() {
      return (this.attribute.value || '').split('|');
    }
  }
</script>
