<script setup lang="ts">
export interface ProductListNavigationProps {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

withDefaults(defineProps<ProductListNavigationProps>(), {
  hasPreviousPage: false,
  hasNextPage: false,
});

defineEmits<{ (e: 'onPrevious'): void; (e: 'onNext'): void }>();
</script>

<template>
  <div :class="$style.navigation">
    <button
      :class="$style.navigation__previous"
      :disabled="!hasPreviousPage"
      @click="$emit('onPrevious')"
    >
      Previous
    </button>
    <button
      :class="$style.navigation__next"
      data-test="nextButton"
      :disabled="!hasNextPage"
      @click="$emit('onNext')"
    >
      Next
    </button>
  </div>
</template>

<style module lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 var(--pg-space-sm);
  margin-bottom: var(--pg-space-sm);

  &__previous {
    display: flex;
  }

  &__next {
    display: flex;
  }
}
</style>
