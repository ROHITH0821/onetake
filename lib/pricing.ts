// Single source of truth for pricing copy. Change the price here and it
// updates every badge, CTA and comparison on the site.

export const PRICE = 99;
export const CURRENCY = "₹";

export const formatINR = (amount: number) => `${CURRENCY}${amount.toLocaleString("en-IN")}`;

export const priceLabel = formatINR(PRICE);

/** What hiring a freelance editor typically costs per reel. */
export const EDITOR_PRICE = "₹500–2,000";
export const EDITOR_PRICE_FROM = "₹500+";

/** Re-editing a reel that has already been delivered. */
export const REEDIT_PRICE = 79;
export const reeditLabel = formatINR(REEDIT_PRICE);

export const CTA_LABEL = `Edit my video for ${priceLabel}`;
/** Short form for tight spaces (very small phones). */
export const CTA_SHORT = `Edit for ${priceLabel}`;
export const MAKE_LABEL = `Make my reel for ${priceLabel}`;
export const GUARANTEE = "Pay only after you approve the plan.";
export const TRUST_LINE = `Clips under 1 minute · ${priceLabel} per reel · Pay only after you approve the plan`;
