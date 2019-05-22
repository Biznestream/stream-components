import Vue from 'vue';
import Vuetify from 'vuetify';

import SAttributeTypeSelector from './components/SAttributeTypeSelector';
import SAttributeDefaultEditor from './components/SAttributeDefaultEditor';

export {
  SAttributeTypeSelector,
  SAttributeDefaultEditor
};

export default function install(Vue) {
  Vue.use(Vuetify);

  Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
