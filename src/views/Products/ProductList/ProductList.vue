<script setup lang="ts">
import useProducts from '@/apis/products/useProducts';
import { computed, ref } from 'vue';
import ProductListItem from './ProductListItem.vue';
import ProductListNavigation from './ProductListNavigation.vue';

export interface ProductListProps {
  defaultLimits?: number;
}

const props = withDefaults(defineProps<ProductListProps>(), { defaultLimits: 20 });

const page = ref(0);

const {
  data: productsResponse,
  isLoading: isLoadingProducts,
  // isFetching: isFetchingProducts,
  isError: isLoadingProductsFailed,
  fetchNextPage,
  fetchPreviousPage,
} = useProducts({ limit: props.defaultLimits });

const allProductsPages = computed(() => {
  return productsResponse.value?.pages[page.value];
});

const totalPages = computed(() => allProductsPages.value?.total || 0);

const fetchPreviousProducts = computed(() => async () => {
  if (page.value <= 0) {
    page.value = 0;
  } else {
    page.value -= 1;
  }

  await fetchPreviousPage.value();
});

const fetchNextProducts = computed(() => async () => {
  if (page.value * props.defaultLimits >= totalPages.value) {
    page.value = totalPages.value;
  } else {
    page.value += 1;
  }

  await fetchNextPage.value();
});

const products = computed(() => {
  return allProductsPages.value?.products;
});

const hasPreviousPage = computed(() => page.value > 0);

const hasNextPage = computed(
  () => page.value * props.defaultLimits < totalPages.value - props.defaultLimits,
);
</script>

<template>
  <div v-if="isLoadingProducts">Loading...</div>
  <div v-else-if="isLoadingProductsFailed" data-test="failedToLoadProductsMessage" role="alert">
    Failed to load product
  </div>
  <div v-else>
    <!-- <div v-if="isFetchingProducts">Fetching...</div> -->

    <product-list-navigation
      @on-previous="fetchPreviousProducts"
      @on-next="fetchNextProducts"
      :has-next-page="hasNextPage"
      :has-previous-page="hasPreviousPage"
    />

    <div :class="$style.products">
      <template v-for="product in products" :key="product?.id">
        <product-list-item :product="product" />
      </template>
    </div>
  </div>
</template>

<style module lang="scss">
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
</style>
