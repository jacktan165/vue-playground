import { useInfiniteQuery } from 'vue-query';

export interface Product {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

export interface ProductsResponse {
  products?: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface UseProductsProps {
  limit?: number;
}

export const productsUrl = 'https://dummyjson.com/products';

const fetchProducts =
  ({ limit = 10 }: UseProductsProps) =>
  async ({ pageParam = 0 }: { pageParam?: number }) => {
    return fetch(`${productsUrl}?skip=${pageParam}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
  };

const useProducts = ({ limit = 10 }: UseProductsProps = {}) => {
  const query = useInfiniteQuery<ProductsResponse, Error>(
    ['products', limit],
    fetchProducts({ limit }),
    {
      keepPreviousData: true,
      getPreviousPageParam: (previousPage) => {
        if (previousPage.skip === undefined || previousPage.limit === undefined) {
          return undefined;
        }

        const isFirstPage = previousPage.skip - previousPage.limit <= 0;

        if (isFirstPage) {
          return undefined;
        }

        return previousPage.skip - previousPage.limit;
      },
      getNextPageParam: (lastPage) => {
        if (
          lastPage.skip === undefined ||
          lastPage.limit === undefined ||
          lastPage.total === undefined
        ) {
          return undefined;
        }

        const isLastPage = lastPage.skip >= lastPage.total - lastPage.limit;

        if (isLastPage) {
          return undefined;
        }

        return lastPage.skip + lastPage.limit;
      },
    },
  );

  return query;
};

export default useProducts;
