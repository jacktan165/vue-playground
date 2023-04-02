<script setup lang="ts">
import type { Product } from '@/apis/products/useProducts';

export interface ProductListItemProps {
  product: Product;
}

defineProps<ProductListItemProps>();
</script>

<template>
  <div :class="$style.product">
    <div :class="$style.product__header">
      <h1 :class="$style.product__title">{{ product?.title }}</h1>

      <div :class="$style.product__detailsContainer">
        <div :class="$style.product__rating">{{ product.rating }}</div>
        <div :class="$style.product__price">${{ product?.price }}</div>
      </div>
    </div>

    <div :class="$style.product__description">{{ product?.description }}</div>
  </div>
</template>

<style module lang="scss">
.product {
  display: flex;
  flex-direction: column;
  gap: var(--pg-space-md);
  padding: var(--pg-space-md);
  border: 1px solid var(--color-white);

  &__title {
    color: var(--color-text);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__detailsContainer {
    display: flex;
    align-items: center;
    gap: var(--pg-space-sm);
  }

  &__rating {
    display: flex;
    border-radius: 50%;
    padding: var(--pg-space-sm);
    border: 1px solid var(--color-white);
  }

  &__price {
    display: flex;
  }

  &__description {
    padding: var(--pg-space-md);
  }
}
</style>
