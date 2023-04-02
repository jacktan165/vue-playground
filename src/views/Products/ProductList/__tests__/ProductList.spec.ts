import { beforeEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import ProductList, { type ProductListProps } from '../ProductList.vue';
import server from '@/tests/mocks/server';
import {
  setupFailedProductHandlers,
  setupFirstPageProductHandlers,
  setupFailedSecondPageProductHandlers,
} from './msw/handlers';
import vueQueryPlugin from '@/tests/plugins/vueQueryPlugin';

const defaultProps: ProductListProps = {
  defaultLimits: 20,
};

const renderProductList = (props?: Partial<ProductListProps>) => {
  return mount(ProductList, {
    global: {
      plugins: [vueQueryPlugin],
    },
    props: {
      ...defaultProps,
      ...props,
    },
  });
};

describe('ProductList', () => {
  describe('error handling', () => {
    beforeEach(() => {});

    it.skip('should display an error message if failed to retrieve products', async () => {
      server.use(...setupFailedProductHandlers);

      const wrapper = renderProductList();

      await flushPromises();
      await flushPromises();
      await flushPromises();

      const productList = wrapper.get('[data-test="failedToLoadProductsMessage"]');

      expect(productList.text()).toEqual('Failed to load product');
    });

    it('should display an error message if failed to retrieve next products', async () => {
      server.use(...setupFirstPageProductHandlers, ...setupFailedSecondPageProductHandlers);

      const wrapper = renderProductList();

      await flushPromises();
      await flushPromises();
      await flushPromises();

      const nextButton = wrapper.get('[data-test="nextButton"]');
      nextButton.trigger('click');

      await flushPromises();
      await flushPromises();
      await flushPromises();

      const productList = wrapper.get('[data-test="failedToLoadProductsMessage"]');

      expect(productList.text()).toEqual('Failed to load product');
    });
  });
});
