import Vue from 'vue';

import ExampleComponent from './components/ExampleComponent';

export {
  ExampleComponent
};

export default function install(Vue) {
  Vue.component('ExampleComponent', ExampleComponent);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}