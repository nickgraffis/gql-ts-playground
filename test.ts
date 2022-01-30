import { CoordinateObject, QueryGetBranchesByLocationArgs } from './graphqltest';
//@ts-ignore
import { estypes } from "@elastic/elasticsearch";
//@ts-ignore
import { connectToNmlsElasticSearch } from "./connection";
import { MarketInsightsFilters, Page } from "./graphqltest";
//@ts-ignore
import { paginate, buildFiltersQuery, geo_distance } from "./utils";
const { branchesIndex } = process.env

export async function getBranchesByLocation({
  coords,
  filters,
  userId,
  page
}: 
QueryGetBranchesByLocationArgs
& { userId: string }) {
  // TODO: Metric queue for analytics
  const body = {
    ...paginate(page),
    query: {
      bool: {
        filter: {
          bool: {
            must: [
              ...buildFiltersQuery(filters),
              geo_distance(coords, filters.distance || 5, 'mi'),
              {
                "bool": {
                  "filter": {
                    "term": {
                      "IsAuthorized": true
                    }
                  }
                }
              },
            ]
          }
        }
      }
    },
    sort: [
      {
        _geo_distance: {
          location: coords,
          order: 'asc',
          unit: 'mi',
        },
      },
    ]
  }
  const request: estypes.IndexRequest<any> = {
    index: branchesIndex || "",
    body
  }
  const esClientNmls = await connectToNmlsElasticSearch();
  const response = await esClientNmls.search<Branch>(request);
  const branches = response.body.hits.hits
  .map(a => ({ ...a._source, distance: a.sort?.length ? a.sort[0] : 0 }));

  return {
    branches,
    center: coords
  };
}