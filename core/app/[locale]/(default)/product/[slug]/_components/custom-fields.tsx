import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { useFormatter, useTranslations } from 'next-intl';

import { FragmentOf, graphql } from '~/client/graphql';

export const CustomFieldsFragment = graphql(`
  fragment CustomFieldsFragment on Product {
     sku
    upc
     customFields {
        edges {
          node {
            entityId
            name
            value
          }
        }
      }
  }
`);

interface Props {
  product: FragmentOf<typeof CustomFieldsFragment>;
}

export const Specs = ({ product }: Props) => {
  const t = useTranslations('Product.Details');

  const customFields = removeEdgesAndNodes(product.customFields);

  if (!customFields) {
    return null;
  }


  return (
    <>
    <div>
    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
    {Boolean(product.sku) && (
            <div key={product.sku} className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">SKU</dt>
            <dd className="mt-2 text-sm text-gray-500">{product.sku}</dd>
          </div>
        
          )}

          {Boolean(product.upc) && (
      <div key={product.sku} className="border-t border-gray-200 pt-4">
      <dt className="font-medium text-gray-900">UPC</dt>
      <dd className="mt-2 text-sm text-gray-500">{product.upc}</dd>
      </div>



          )}
    
      
          {Boolean(customFields) &&
           customFields.slice(1, -1).map((customField) => (
            <div key={customField.entityId} className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">{customField.name}</dt>
            <dd className="mt-2 text-sm text-gray-500">{customField.value}</dd>
          </div>
            ))}

            </dl>
            </div>

    </>
  );
};




 