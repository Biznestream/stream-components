import Vue from 'vue';
import Vuetify from 'vuetify';
import SAttributeTypeSelector from './components/SAttributeTypeSelector';
import SAttributeDefaultEditor from './components/SAttributeDefaultEditor';
import SAttributeDefault from './components/SAttributeDefault';
import CKEditor from '@ckeditor/ckeditor5-vue';

export {
  SAttributeTypeSelector,
  SAttributeDefaultEditor,
  SAttributeDefault
};

export default function install(Vue) {
  Vue.use(Vuetify);
  Vue.use(CKEditor);

  Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
  Vue.component('SAttributeDefault', SAttributeDefault);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
