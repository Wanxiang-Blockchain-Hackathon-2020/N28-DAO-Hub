## 开发前阅读

> by xiaotian edit

尽量统一用yarn

1. 阅读vue nuxt文档
 - https://cn.vuejs.org/
 - https://nuxtjs.org/
2. 使用v-html需要进行xss过滤,可以参考项目的代码(因为关闭了eslint提示
  - https://eslint.vuejs.org/rules/no-v-html.html
  - https://github.com/vuejs/eslint-plugin-vue/issues/
3. 为了修复editor, 自己上传了一个npm包, mavon-editor -> mavon-editor-matataki
