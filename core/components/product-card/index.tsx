import { useFormatter } from 'next-intl';

import { ResultOf } from '~/client/graphql';
import { ProductCard as ComponentProductCard } from '~/components/ui/product-card';
import { pricesTransformer } from '~/data-transformers/prices-transformer';

import { AddToCart } from './add-to-cart';
import { ProductCardFragment } from './fragment';

interface Props {
  product: ResultOf<typeof ProductCardFragment>;
  imageSize?: 'tall' | 'wide' | 'square';
  imagePriority?: boolean;
  showCompare?: boolean;
  showCart?: boolean;
}

export const ProductCard = ({
  product,
  imageSize = 'square',
  imagePriority = false,
  showCart = true,
  showCompare = true,
}: Props) => {
  const format = useFormatter();

  const { name, entityId, defaultImage, brand, path, prices, customFields } = product;

  const price = pricesTransformer(prices, format);

  //const customFields = (product.customFields);

  const displayName = product.customFields?.edges?.find((edge) => edge?.node?.name === 'Display Name')?.node?.value;









  return (
    <ComponentProductCard
      addToCart={showCart && <AddToCart data={product} />}
      href={path}
      id={entityId.toString()}
      image={defaultImage ? { src: defaultImage.url, altText: defaultImage.altText } : undefined}
      imagePriority={imagePriority}
      imageSize={imageSize}
      name={displayName}
      price={price}
      showCompare={showCompare}
      subtitle={brand?.name}
    />
  );
};
