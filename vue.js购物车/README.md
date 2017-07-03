## 笔记
- vue 声明式渲染 {{message}} ,双向绑定:一个文本框的值发生改变,数据绑定的值也会进行计算
- vue-resourse 可以像ajax一样跟后台交互,并且体验更好.(官方推荐vue-resourse变成axios)
- this.$http.get(".../...")  地址文件从html的引用位置开始

#### 如何使用vue.js
- 看到列表,v-for
- 数据展示需要补足(金额...),过滤器filter
- 表单之类的,v-model双向绑定
- 有操作的(单击...)跟交互的,v-on:click
- 有样式变化的,  b-bind:class
- 如果返回回来的数据里没有我们需要的值,局部:this.$set(item, "checked", true),全局:Vue.set
