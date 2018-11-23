/**
 * @author monkeywang
 * Date: 17/11/9
 */
import Progress from './src/progress.vue';

Progress.install = function (Vue) {
  Vue.component(Progress.name, Progress);
};

export default Progress;
