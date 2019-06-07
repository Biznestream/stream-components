import Vue from 'vue';
import SAttributeTypeSelector from './components/SAttributeTypeSelector';
import SAttributeDefaultEditor from './components/SAttributeDefaultEditor';
import SAttributeEditor from './components/SAttributeEditor';
import SAttributesCollector from './components/SAttributesCollector';
import CKEditor from '@ckeditor/ckeditor5-vue';

export {
  SAttributeTypeSelector,
  SAttributeDefaultEditor,
  SAttributeEditor,
  SAttributesCollector
};

export default function install(Vue) {
  Vue.use(CKEditor);

  Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
  Vue.component('SAttributeEditor', SAttributeEditor);
  Vue.component('SAttributesCollector', SAttributesCollector);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
