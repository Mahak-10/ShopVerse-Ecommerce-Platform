export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD",
     maximumFractionDigits: 2,
  }).format(amount || 0);
};

export const formatPriceCalculation = (quantity, price) => {
  const total = Number(quantity || 0) * Number(price || 0);
  return new Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD",
     maximumFractionDigits: 2,
  }).format(total);
};

export const formatRevenue = (value) => {
  if (value >= 1e9) {
     return "$" + (value / 1e9).toFixed(2) + " B";
  } else if (value >= 1e6) {
     return "$" + (value / 1e6).toFixed(2) + " M";
  } else if (value >= 1e3) {
     return "$" + (value / 1e3).toFixed(1) + " K";
  } else {
     return "$" + Number(value || 0).toFixed(2);
  }
};