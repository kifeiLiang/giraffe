<template>
  <span class="k-breadcrumb-item">
    <span
      :class="['k-breadcrumb-link', to ? 'is-link' : '']"
      @click="toPath">
      <slot></slot>
    </span>
    <span class="k-breadcrumb-separator">{{separator}}</span>
  </span>
</template>
<script>
  export default {
    name: 'YBreadcrumbItem',
    props: {
      separator: { type: String, default: '>' },
      to: String,
      replace: Boolean,
    },
    methods: {
      toPath() {
        this.to && this.replace ? this.$router.replace({ path: this.replace }) : this.$router.push({ path: this.to })
      }
    }
  }
</script>
