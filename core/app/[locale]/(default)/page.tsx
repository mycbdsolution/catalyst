import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { ProductCardCarouselFragment } from '~/components/product-card-carousel/fragment';
import { Slideshow } from '~/components/slideshow';
import { Hero } from '~/components/hero';
import { LocaleType } from '~/i18n/routing';
import { Container } from '~/components/container';
import { BentoCards } from '~/components/bento-cards';

const HomePageQuery = graphql(
  `
    query HomePageQuery {
      site {
        newestProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        featuredProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
          bestSellingProducts(first: 4,hideOutOfStock: true) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
      }
    }
  `,
  [ProductCardCarouselFragment],
);

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const t = await getTranslations('Home');

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: HomePageQuery,
    customerId,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);
  const newestProducts = removeEdgesAndNodes(data.site.newestProducts);
  const topProducts = removeEdgesAndNodes(data.site.bestSellingProducts);

  return (
    <>
      <Hero />

      <Container>
      <div className="my-16">
      <ProductCardCarousel
          products={topProducts}
          showCart={false}
          showCompare={false}
          title="Top Sellers"
        />
        <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          title="New Arrivals"
        />
     
      </div>
      </Container>

      <BentoCards />

    </>
  );
}

export const runtime = 'edge';
