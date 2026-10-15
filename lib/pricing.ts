// Single source of truth for pricing copy. Change the price here and it
// updates every badge, CTA and comparison on the site.

export const PRICE = 99;
export const CURRENCY = "₹";

export const formatINR = (amount: number) => `${CURRENCY}${amount.toLocaleString("en-IN")}`;

export const priceLabel = formatINR(PRICE);

/** What hiring a freelance editor typically costs per reel. */
export const EDITOR_PRICE = "₹500–2,000";
export const EDITOR_PRICE_FROM = "₹500+";

export const CTA_LABEL = `Edit my video · ${priceLabel}`;
export const MAKE_LABEL = `Make my reel for ${priceLabel}`;
export const GUARANTEE = "Pay only after you approve the plan.";
export const TRUST_LINE = `Clips under 1 minute · ${priceLabel} per reel · Pay only after you approve the plan`;
