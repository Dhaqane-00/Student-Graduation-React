import { GetApplyQuickFilterFn } from '@mui/x-data-grid';

export const getApplyQuickFilterFnProductField: GetApplyQuickFilterFn<any, unknown> = (
  value: string,
) => {
  return (cellValue: any) => {
    return (
      cellValue.title.toLowerCase().includes(value.toLowerCase()) ||
      cellValue.subtitle.toLowerCase().includes(value.toLowerCase())
    );
  };
};
export const getApplyQuickFilterFnPriceField: GetApplyQuickFilterFn<any, unknown> = (value) => {
  return (cellValue) => {
    return `$${cellValue}`.includes(value);
  };
};
export const getApplyQuickFilterFnAdsSpentField: GetApplyQuickFilterFn<any, unknown> = (value) => {
  return (cellValue: any) => {
    return `$${cellValue.toFixed(3)}`.includes(value);
  };
};
