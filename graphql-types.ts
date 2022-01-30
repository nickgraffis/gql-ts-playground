export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Branch = {
  __typename?: 'Branch';
  BranchNMLSID?: Maybe<Scalars['String']>;
  City?: Maybe<Scalars['String']>;
  CompanyNMLSID?: Maybe<Scalars['String']>;
  Country?: Maybe<Scalars['String']>;
  IsAuthorized?: Maybe<Scalars['String']>;
  LocationNMLSID?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  PostalCode?: Maybe<Scalars['String']>;
  State?: Maybe<Scalars['String']>;
  Street?: Maybe<Scalars['String']>;
  Street2?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  individuals?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<CoordinateObject>;
  stats?: Maybe<Stats>;
  teamSize?: Maybe<Scalars['Int']>;
  trailing12?: Maybe<Trailing12>;
  unitCount?: Maybe<Scalars['Int']>;
  volume?: Maybe<Scalars['Int']>;
};

export type Company = {
  __typename?: 'Company';
  BusinessStructure?: Maybe<Scalars['String']>;
  City?: Maybe<Scalars['String']>;
  CompanyNMLSID?: Maybe<Scalars['String']>;
  Country?: Maybe<Scalars['String']>;
  DateFormed?: Maybe<Scalars['String']>;
  FiscalYearEnd?: Maybe<Scalars['String']>;
  FormedIn?: Maybe<Scalars['String']>;
  LocationNMLSID?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  PostalCode?: Maybe<Scalars['String']>;
  PrimaryFederalRegulator?: Maybe<Scalars['String']>;
  RegistrationStatus?: Maybe<Scalars['String']>;
  State?: Maybe<Scalars['String']>;
  StockSymbol?: Maybe<Scalars['String']>;
  Street?: Maybe<Scalars['String']>;
  Street2?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  individuals?: Maybe<Array<Maybe<Scalars['String']>>>;
  licenses?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<CoordinateObject>;
  no_of_licenses?: Maybe<Scalars['String']>;
  stats?: Maybe<Stats>;
  teamSize?: Maybe<Scalars['String']>;
  trailing12?: Maybe<Trailing12>;
  unitCount?: Maybe<Scalars['Int']>;
  volume?: Maybe<Scalars['Int']>;
  websites?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CoordinateObject = {
  __typename?: 'CoordinateObject';
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
};

export type LoanTypes = {
  __typename?: 'LoanTypes';
  FHA?: Maybe<Scalars['Int']>;
  HE?: Maybe<Scalars['Int']>;
  HELOC?: Maybe<Scalars['Int']>;
  USDA?: Maybe<Scalars['Int']>;
  VA?: Maybe<Scalars['Int']>;
  baloon?: Maybe<Scalars['Int']>;
  building?: Maybe<Scalars['Int']>;
  commercial?: Maybe<Scalars['Int']>;
  conventional?: Maybe<Scalars['Int']>;
  other?: Maybe<Scalars['Int']>;
  reverse?: Maybe<Scalars['Int']>;
  unknown?: Maybe<Scalars['Int']>;
};

export type MarketInsightsFilters = {
  branchCount?: InputMaybe<Scalars['Int']>;
  branchManager?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<Range>;
  companyTeamSize?: InputMaybe<Scalars['Int']>;
  companyVolume?: InputMaybe<Range>;
  conventional?: InputMaybe<Range>;
  distance?: InputMaybe<Scalars['Int']>;
  government?: InputMaybe<Range>;
  hasFilters?: InputMaybe<Scalars['Boolean']>;
  licenses?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  loanOriginator?: InputMaybe<Scalars['Boolean']>;
  purchase?: InputMaybe<Range>;
  refinance?: InputMaybe<Range>;
  revenue?: InputMaybe<Range>;
  teamSize?: InputMaybe<Scalars['Int']>;
  volume?: InputMaybe<Range>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCompany?: Maybe<Company>;
};


export type MutationAddCompanyArgs = {
  input?: InputMaybe<Scalars['String']>;
};

export type Page = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type ProductMix = {
  __typename?: 'ProductMix';
  conventional?: Maybe<Scalars['Int']>;
  government?: Maybe<Scalars['Int']>;
  nonConforming?: Maybe<Scalars['Int']>;
  other?: Maybe<Scalars['Int']>;
  per_conventional?: Maybe<Scalars['Int']>;
  per_government?: Maybe<Scalars['Int']>;
  per_nonConforming?: Maybe<Scalars['Int']>;
  per_other?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getBranchesByLocation?: Maybe<Array<Maybe<Branch>>>;
  getCompaniesByLocaiton?: Maybe<Array<Maybe<Company>>>;
  getCompaniesByName?: Maybe<Array<Maybe<Company>>>;
  getCompanyBranches?: Maybe<Array<Maybe<Branch>>>;
  getCompanyByNmlsId?: Maybe<Company>;
};


export type QueryGetBranchesByLocationArgs = {
  coords?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  filters?: InputMaybe<MarketInsightsFilters>;
  page?: InputMaybe<Page>;
};


export type QueryGetCompaniesByLocaitonArgs = {
  coords?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  filters?: InputMaybe<MarketInsightsFilters>;
  page?: InputMaybe<Page>;
};


export type QueryGetCompaniesByNameArgs = {
  filters?: InputMaybe<MarketInsightsFilters>;
  page?: InputMaybe<Page>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyBranchesArgs = {
  nmlsId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyByNmlsIdArgs = {
  nmlsId?: InputMaybe<Scalars['String']>;
};

export type Range = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

export type Stats = {
  __typename?: 'Stats';
  per_conventional?: Maybe<Scalars['Int']>;
  per_purchase?: Maybe<Scalars['Int']>;
};

export type Trailing12 = {
  __typename?: 'Trailing12';
  avgPerUnit?: Maybe<Scalars['Int']>;
  endMonth?: Maybe<Scalars['Int']>;
  endYear?: Maybe<Scalars['Int']>;
  loanTypes?: Maybe<LoanTypes>;
  period?: Maybe<Scalars['String']>;
  productMix?: Maybe<ProductMix>;
  totalUnits?: Maybe<Scalars['Int']>;
  transactionMix?: Maybe<TransactionMix>;
  volume?: Maybe<Scalars['Int']>;
};

export type TransactionMix = {
  __typename?: 'TransactionMix';
  REO?: Maybe<Scalars['Int']>;
  construction?: Maybe<Scalars['Int']>;
  equity?: Maybe<Scalars['Int']>;
  per_REO?: Maybe<Scalars['Int']>;
  per_construction?: Maybe<Scalars['Int']>;
  per_equity?: Maybe<Scalars['Int']>;
  per_purchase?: Maybe<Scalars['Int']>;
  purchase?: Maybe<Scalars['Int']>;
  refi?: Maybe<Scalars['Int']>;
  refinance?: Maybe<Scalars['Int']>;
};

export type GetBranchesByLocationQueryVariables = Exact<{
  coords?: InputMaybe<Array<InputMaybe<Scalars['Float']>> | InputMaybe<Scalars['Float']>>;
  filters?: InputMaybe<MarketInsightsFilters>;
  page?: InputMaybe<Page>;
}>;


export type GetBranchesByLocationQuery = { __typename?: 'Query', getBranchesByLocation?: Array<{ __typename?: 'Branch', id?: string | null | undefined } | null | undefined> | null | undefined };

export type AddCompanyMutationVariables = Exact<{
  input?: InputMaybe<Scalars['String']>;
}>;


export type AddCompanyMutation = { __typename?: 'Mutation', addCompany?: { __typename?: 'Company', id?: string | null | undefined } | null | undefined };
