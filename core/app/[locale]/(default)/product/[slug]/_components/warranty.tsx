import { useTranslations } from 'next-intl';

import { FragmentOf, graphql } from '~/client/graphql';

export const WarrantyFragment = graphql(`
  fragment WarrantyFragment on Product {
    warranty
  }
`);

interface Props {
  product: FragmentOf<typeof WarrantyFragment>;
}

export const Warranty = ({ product }: Props) => {
  const t = useTranslations('Product.Warranty');

  if (!product.warranty) {
    return null;
  }

  return (
    <>
      <div className="prose prose-ul:mt-0 prose-li:mt-0 prose-li:mb-0" dangerouslySetInnerHTML={{ __html: product.warranty }} />
    </>
  );
};
