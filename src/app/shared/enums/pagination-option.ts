export enum PaginationOption {
  OPTION_2 = 2,
  OPTION_5 = 5,
  OPTION_10 = 10,
  OPTION_15 = 15,
  OPTION_20 = 20,
}

export const PaginationOptionMap = new Map();
PaginationOptionMap.set(PaginationOption.OPTION_2, `${PaginationOption.OPTION_2} items per page`);
PaginationOptionMap.set(PaginationOption.OPTION_5, `${PaginationOption.OPTION_5} items per page`);
PaginationOptionMap.set(PaginationOption.OPTION_10, `${PaginationOption.OPTION_10} items per page`);
PaginationOptionMap.set(PaginationOption.OPTION_15, `${PaginationOption.OPTION_15} items per page`);
PaginationOptionMap.set(PaginationOption.OPTION_20, `${PaginationOption.OPTION_20} items per page`);
