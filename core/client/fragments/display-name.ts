
import { graphql } from '../graphql';

export const DisplayNameFragment = graphql(`
 fragment DisplayNameFragment on Product {
   customFields(first: 1) {
      edges {
        node {
        name
          value
        }
      }
    }
   
  }
`);

