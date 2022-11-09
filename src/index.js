import { initMixin } from './init'
/**
 * Vue 构造函数
 * @param options 为传入的对象,如:{data:{},computed:{},methods:{}}
 */
function Vue(options) {
  this._init(options)
}
initMixin(Vue)

export default Vue
