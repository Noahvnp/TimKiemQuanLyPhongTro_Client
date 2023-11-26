export const formatPricePerMonth = (price) =>
  price < 1 ? `${price} đồng/tháng` : `${price} triệu/tháng`;

export const formatPrice = (price) =>
  price < Math.pow(10, 6)
    ? `${price / 1000}K`
    : `${price / Math.pow(10, 6)} triệu`;
