import { gql } from "apollo-angular";

export const query = gql`
  query getBranchesByLocation($coords: [Float],
    $filters: MarketInsightsFilters,
    $page: Page) {
    getBranchesByLocation(coords: $coords,
    filters: $filters,
    page: $page) {
      id
    }
  }
`

export const mutation = gql`
  mutation addCompany($input: String) {
    addCompany(input: $input) {
      id
    }
  } 
`