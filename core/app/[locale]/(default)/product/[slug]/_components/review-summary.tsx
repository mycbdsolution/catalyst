import { useTranslations } from 'next-intl';
import { useId } from 'react';


import * as Tooltip from '@radix-ui/react-tooltip';

import { SiFacebook } from '@icons-pack/react-simple-icons';

import { FragmentOf, graphql } from '~/client/graphql';
import { Rating } from '~/components/ui/rating';
import { cn } from '~/lib/utils';

export const ReviewSummaryFragment = graphql(`
  fragment ReviewSummaryFragment on Product {
    reviewSummary {
      numberOfReviews
      averageRating
    }
  }
`);

interface Props {
  data: FragmentOf<typeof ReviewSummaryFragment>;
}

export const ReviewSummary = ({ data }: Props) => {
  const t = useTranslations('Product.Details.ReviewSummary');

  const summaryId = useId();

  const { numberOfReviews, averageRating } = data.reviewSummary;

  const hasNoReviews = numberOfReviews === 0;

  return (
    <div className="flex items-center gap-3">
      <p
        aria-describedby={summaryId}
        className={cn('flex flex-nowrap text-gold', hasNoReviews && 'text-gray-400')}
      >
      
      </p>

      <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
				<Tooltip.Trigger asChild>
                <p
                aria-describedby={summaryId}
                className={cn('flex flex-nowrap text-gold', hasNoReviews && 'text-gray-400')}
              >
                <Rating rating={averageRating} />
              </p>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
						sideOffset={5}
					>
				{averageRating}
						<Tooltip.Arrow className="fill-white" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
            </Tooltip.Provider>


      <div className="text-sm text-zinc-400" id={summaryId}>
        {!hasNoReviews && (
          <>
            <span className="sr-only">{t('rating')}</span>
            
            <span className="sr-only">{averageRating} {t('ratingRange')}</span>{' '}
          </>
        )}
         <span className="sr-only">{t('reviewsNumber')}</span>({numberOfReviews} reviews) 
      </div>
    </div>
  );
};
