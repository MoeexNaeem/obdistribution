/**
 * Options for the Wholesale Program application form. Values are the stored
 * codes; labels are shown in the UI. The zod schema derives its enums from the
 * `value`s here so the form and validation never drift.
 */

export const businessTypes = [
  { value: "retail-store", label: "Retail Store" },
  { value: "online-seller", label: "Online Seller" },
  { value: "distributor", label: "Distributor / Wholesaler" },
] as const;

export const storefrontOptions = [
  { value: "yes", label: "Yes — physical store" },
  { value: "no", label: "No — online only" },
] as const;

export const volumeOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-20k", label: "$5,000 – $20,000" },
  { value: "20k-plus", label: "$20,000+" },
] as const;

export const paymentMethods = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "ach", label: "ACH / Bank Transfer" },
  { value: "wire", label: "Wire Transfer" },
  { value: "net-terms", label: "Net Terms (30 days)" },
  { value: "other", label: "Other" },
] as const;

export const businessTypeValues = businessTypes.map((o) => o.value);
export const storefrontValues = storefrontOptions.map((o) => o.value);
export const volumeValues = volumeOptions.map((o) => o.value);
export const paymentValues = paymentMethods.map((o) => o.value);
