import { productsUrl, type Product, type ProductsResponse } from '@/apis/products/useProducts';
import { rest, type DefaultBodyType, type MockedRequest, type RestHandler } from 'msw';

const mockedProduct1: Product = {
  id: 1,
  title: 'Product 1',
  description: 'Product 1 description',
  price: 10,
  discountPercentage: 0,
  rating: 5,
  stock: 1,
  images: [],
};

const mockedProduct2: Product = {
  id: 1,
  title: 'Product 2',
  description: 'Product 2 description',
  price: 10,
  discountPercentage: 0,
  rating: 5,
  stock: 1,
  images: [],
};

const mockedProduct3: Product = {
  id: 1,
  title: 'Product 3',
  description: 'Product 3 description',
  price: 10,
  discountPercentage: 0,
  rating: 5,
  stock: 1,
  images: [],
};

export const setupFirstPageProductHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(productsUrl, async (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit');
    const skip = req.url.searchParams.get('skip');

    console.log(limit);
    if (limit === '20' && skip === '0') {
      return res(
        ctx.json<ProductsResponse>({
          products: [mockedProduct1],
          total: 100,
          skip: 0,
          limit: 20,
        }),
      );
    }
  }),
];

export const setupFailedFirstPageProductHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(productsUrl, async (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit');
    const skip = req.url.searchParams.get('skip');

    if (limit === '20' && skip === '0') {
      return res(
        ctx.status(500),
        ctx.json({
          errorMessage: 'Server error',
        }),
      );
    }
  }),
];

export const setupSecondPageProductHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(productsUrl, async (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit');
    const skip = req.url.searchParams.get('skip');

    if (limit === '20' && skip === '20') {
      return res(
        ctx.json<ProductsResponse>({
          products: [mockedProduct1, mockedProduct2],
          total: 100,
          skip: 20,
          limit: 20,
        }),
      );
    }
  }),
];

export const setupFailedSecondPageProductHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(productsUrl, async (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit');
    const skip = req.url.searchParams.get('skip');

    if (limit === '20' && skip === '20') {
      return res(
        ctx.status(500),
        ctx.json({
          errorMessage: 'Server error',
        }),
      );
    }
  }),
];

export const setupFailedProductHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(productsUrl, async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        errorMessage: 'Server error',
      }),
    );
  }),
];
