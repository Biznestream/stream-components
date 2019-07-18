import Vue from 'vue';
import SAttributeTypeSelector from './components/Attribute/SAttributeTypeSelector';
import SAttributeDefaultEditor from './components/Attribute/SAttributeDefaultEditor';
import SAttributeEditor from './components/Attribute/SAttributeEditor';
import SAttributesEditor from './components/Attribute/SAttributesEditor';
import SProductFilter from './components/Filter/SProductFilter';
import SDropdown from './components/Filter/SDropdown';
import SProducts from './components/Filter/SProducts';
import SProduct from './components/Filter/SProduct';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export {
  SAttributeTypeSelector,
  SAttributeDefaultEditor,
  SAttributeEditor,
  SAttributesEditor,
  SProductFilter,
  SDropdown,
  SProducts,
  SProduct
};

export default function install(Vue) {
  Vue.use(CKEditor);
  Vue.use(SliderPlugin);

  Vue.component('VueSlider', VueSlider);
  Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
  Vue.component('SAttributeEditor', SAttributeEditor);
  Vue.component('SAttributesEditor', SAttributesEditor);
  Vue.component('SProductFilter', SProductFilter);
  Vue.component('SDropdown', SDropdown);
  Vue.component('SProducts', SProducts);
  Vue.component('SProduct', SProduct);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
