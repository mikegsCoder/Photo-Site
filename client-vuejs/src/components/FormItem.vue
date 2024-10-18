<script setup>
import { computed } from 'vue';

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  v$: {
    type: Object,
  },
});

const hasErrors = computed(() => {
  if (props.v$) {
    return props.v$[props.field]?.$errors.length;
  }
  return 0;
});
</script>

<template>
<div :class="hasErrors ? 'has-errors' : ''">
  <span>
    <label :for="field">{{ label }}</label>
    <slot />
  </span>
  <ul v-if="hasErrors" class="error-msg">
    <li v-for="error in v$[field].$errors" :key="error.$uid">
      <p class="error">{{ error.$message }}</p>
    </li>
  </ul>
</div>
</template>

<style scoped>
.has-errors :deep(input),
.has-errors :deep(select),
.has-errors :deep(textarea) {
  border-color: red !important;
}

p.error {
  text-align: center;
  border-radius: 0.3em;
  color: red;
  padding-top: 0;
  font-size: large;
}
</style>
