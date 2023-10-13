export function getDiscountedPrice(originalPrice:number, discountPercentage: number) {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
      return "N/A";
    }
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
  
    return discountedPrice;
  }