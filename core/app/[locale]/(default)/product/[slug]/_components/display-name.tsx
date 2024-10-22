import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';

import { DisplayNameFragment } from '~/client/fragments/display-name';

import { FragmentOf, graphql } from '~/client/graphql';



interface Props {
  product: FragmentOf<typeof DisplayNameFragment>;
}

export const  DisplayName = ({ product }: Props) => {


  const customFields = removeEdgesAndNodes(product.customFields);

  if (!customFields) {
    return null;
  }


  return (
    <>

{Boolean(customFields) &&
  customFields.slice(0,1).map((customField) => (
    <span key="{customField.value}">{customField.value}</span>
  ))}


    </>
  );
};



