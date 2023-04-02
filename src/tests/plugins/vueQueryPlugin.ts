import type { Plugin } from 'vue';
import { VUE_QUERY_CLIENT, QueryClient } from 'vue-query';

const vueQueryPlugin: Plugin = {
  install: (app, options) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retryDelay: 1,
          retry: 0,
        },
      },
      ...options,
    });
    app.provide(VUE_QUERY_CLIENT, queryClient);
  },
};

export default vueQueryPlugin;
