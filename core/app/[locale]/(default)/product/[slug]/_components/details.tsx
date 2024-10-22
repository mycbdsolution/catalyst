import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { useFormatter, useTranslations } from 'next-intl';

import { Link } from '~/components/link';

import { PricingFragment } from '~/client/fragments/pricing';


import { ProductItemFragment } from '~/client/fragments/product-item';
import { FragmentOf, graphql } from '~/client/graphql';

import { DisplayName } from './display-name';
import { Warranty } from './warranty';

import { ProductForm } from './product-form';
import { ProductFormFragment } from './product-form/fragment';
import { ProductSchema, ProductSchemaFragment } from './product-schema';
import { ReviewSummary, ReviewSummaryFragment } from './review-summary';

export const DetailsFragment = graphql(
  `
    fragment DetailsFragment on Product {
      ...ReviewSummaryFragment
      ...ProductSchemaFragment
      ...ProductFormFragment
      ...ProductItemFragment
      entityId
      name
      sku
      upc
      minPurchaseQuantity
      maxPurchaseQuantity
      condition
      weight {
        value
        unit
      }
      availabilityV2 {
        description
      }
      customFields {
        edges {
          node {
            entityId
            name
            value
          }
        }
      }
      brand {
        name
        path
      }
      ...PricingFragment

    }
  `,
  [
    ReviewSummaryFragment,
    ProductSchemaFragment,
    ProductFormFragment,
    ProductItemFragment,
    PricingFragment,

  ],
);

interface Props {
  product: FragmentOf<typeof DetailsFragment>;
}

export const Details = ({ product }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();

  const customFields = removeEdgesAndNodes(product.customFields);


  const showPriceRange =
    product.prices?.priceRange.min.value !== product.prices?.priceRange.max.value;

  return (
    <div>
      {product.brand && (
       <Link href={product.brand?.path} className=" text-gray-300">
       <p className="mb-2 uppercase underline text-zinc-500">{product.brand.name}</p>
                     </Link>
      )}




      <h1 className="mb-4 text-4xl font-black lg:text-5xl"><DisplayName product={product} /></h1>

   

      <ReviewSummary data={product} />

      {product.prices && (
        <div className="my-6 text-2xl font-bold lg:text-3xl">
          {showPriceRange ? (
            <span>
              {format.number(product.prices.priceRange.min.value, {
                style: 'currency',
                currency: product.prices.price.currencyCode,
              })}{' '}
              -{' '}
              {format.number(product.prices.priceRange.max.value, {
                style: 'currency',
                currency: product.prices.price.currencyCode,
              })}
            </span>
          ) : (
            <>
              {product.prices.retailPrice?.value !== undefined && (
                <span>
                  {t('Prices.msrp')}:{' '}
                  <span className="line-through">
                    {format.number(product.prices.retailPrice.value, {
                      style: 'currency',
                      currency: product.prices.price.currencyCode,
                    })}
                  </span>
                  <br />
                </span>
              )}
              {product.prices.salePrice?.value !== undefined &&
              product.prices.basePrice?.value !== undefined ? (
                <>
                  <span>
                    {t('Prices.was')}:{' '}
                    <span className="line-through">
                      {format.number(product.prices.basePrice.value, {
                        style: 'currency',
                        currency: product.prices.price.currencyCode,
                      })}
                    </span>
                  </span>
                  <br />
                  <span>
                    {t('Prices.now')}:{' '}
                    {format.number(product.prices.price.value, {
                      style: 'currency',
                      currency: product.prices.price.currencyCode,
                    })}
                  </span>
                </>
              ) : (
                product.prices.price.value && ( 
                  <span>
                    {format.number(product.prices.price.value, {
                      style: 'currency',
                      currency: product.prices.price.currencyCode,
                    })}
                  </span>
                )
              )}
            </>
          )}
        </div>
      )}


      <Warranty product={product} />

      <ProductForm data={product} />

   
      <ProductSchema product={product} />
    </div>
  );
};
