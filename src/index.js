import Vue from 'vue';
// import SAttributeTypeSelector from './components/Attribute/SAttributeTypeSelector';
// import SAttributeDefaultEditor from './components/Attribute/SAttributeDefaultEditor';
// import SAttributeEditor from './components/Attribute/SAttributeEditor';
// import SAttributesEditor from './components/Attribute/SAttributesEditor';
import SProductFilter from './components/Filter/SProductFilter';
import SProductFilterContainer from './components/Filter/SProductFilterContainer';
import ProductsSection from './components/ProductsSection';
// import CKEditor from '@ckeditor/ckeditor5-vue';
import Sticky from 'vue-sticky-directive';
import ProductPage from './components/Pages/ProductPage';
import ProductsPage from './components/Pages/ProductsPage';

export {
  // SAttributeTypeSelector,
  // SAttributeDefaultEditor,
  // SAttributeEditor,
  // SAttributesEditor,
  SProductFilterContainer,
  SProductFilter,
  ProductPage,
  ProductsPage,
  ProductsSection
};

export default function install(Vue) {
  // Vue.use(CKEditor);
  Vue.use(Sticky);

  // Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  // Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
  // Vue.component('SAttributeEditor', SAttributeEditor);
  // Vue.component('SAttributesEditor', SAttributesEditor);
  Vue.component('SProductFilter', SProductFilter);
  Vue.component('SProductFilterContainer', SProductFilterContainer);
  Vue.component('ProductPage', ProductPage);
  Vue.component('ProductsPage', ProductsPage);
  Vue.component('ProductsSection', ProductsSection);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
