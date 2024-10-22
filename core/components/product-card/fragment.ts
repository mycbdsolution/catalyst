import { PricingFragment } from '~/client/fragments/pricing';
import { DisplayNameFragment } from '~/client/fragments/display-name';
import { graphql } from '~/client/graphql';

import { AddToCartFragment } from './add-to-cart/fragment';

export const ProductCardFragment = graphql(
  `
    fragment ProductCardFragment on Product {
      entityId
      name
      defaultImage {
        altText
        url: urlTemplate(lossy: true)
      }
      path
      brand {
        name
        path
      }
      reviewSummary {
        numberOfReviews
        averageRating
      }
      ...AddToCartFragment
      ...PricingFragment
      ...DisplayNameFragment
    }
  `,
  [AddToCartFragment, PricingFragment, DisplayNameFragment],
);
