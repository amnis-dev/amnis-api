/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BaseQueryFn,
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

export type OmitFromUnion<T, K extends keyof T> = T extends any
  ? Omit<T, K>
  : never

export type EndpointBuilder<
  BaseQuery extends BaseQueryFn,
  TagTypes extends string,
  ReducerPath extends string
> = {
  query<ResultType, QueryArg>(
    definition: OmitFromUnion<QueryDefinition<QueryArg, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>
  ): QueryDefinition<QueryArg, BaseQuery, TagTypes, ResultType, ReducerPath>;
  mutation<ResultType, QueryArg>(
    definition: OmitFromUnion<MutationDefinition<QueryArg, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>
  ): MutationDefinition<QueryArg, BaseQuery, TagTypes, ResultType, ReducerPath>;
};
