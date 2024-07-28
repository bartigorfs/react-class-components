import { Product } from '@api/api.models.ts'

export const ProductTestImageURL =
  'https://www.stockingaid.com/media/catalog/product/cache/50f0aa362b303c084d2c50d8b72cb0c1/t/e/test-page-steve-originals.jpg'

export const ProductTestImageURL2 = 'https://evek.one/4432-home_default/test.jpg'

export const ProductTest = {
  images: [ProductTestImageURL],
  thumbnail: ProductTestImageURL,
  title: 'Test Title',
  description: 'Test Description',
}

export const ProductsTestArray: Product[] = [
  {
    id: 1,
    title: 'Test Title 1',
    description: 'Test Description 1',
    category: 'string',
    price: 123,
    discountPercentage: 0,
    rating: 5,
    stock: 1,
    tags: ['1', '2', '3'],
    brand: 'Test',
    sku: '123',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [
      {
        rating: 5,
        comment: 'string',
        date: 'string',
        reviewerName: 'string',
        reviewerEmail: 'string',
      },
    ],
    returnPolicy: 'string',
    minimumOrderQuantity: 123,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [ProductTestImageURL],
    thumbnail: ProductTestImageURL,
  },
  {
    id: 2,
    title: 'Test Title 2',
    description: 'Test Description 2',
    category: 'string',
    price: 123,
    discountPercentage: 0,
    rating: 5,
    stock: 1,
    tags: ['1', '2', '3'],
    brand: 'Test',
    sku: '123',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [
      {
        rating: 5,
        comment: 'string',
        date: 'string',
        reviewerName: 'string',
        reviewerEmail: 'string',
      },
    ],
    returnPolicy: 'string',
    minimumOrderQuantity: 123,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [ProductTestImageURL2],
    thumbnail: ProductTestImageURL2,
  },
]
