<template>
  <div class="alert alert-danger" role="alert" v-show="error">
    {{ error }}
  </div>
</template>

<script lang="ts">
export default {
  props: ['error']
}
</script>

<style>
.alert {
  min-height: 50px;
}
</style>
