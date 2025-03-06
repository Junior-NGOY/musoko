export const SENDER_NAME = process.env.SENDER_NAME || "support";
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const USER_ROLES = ["Admin", "User"];
export const COLORS = ["Gold", "Green", "Red"];
export const THEMES = ["Light", "Dark", "System"];

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Musoko Website";
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Dépensez moins, profitez plus.";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "An E-Commerce website.";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9);
export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
);

export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`;

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: "PayPal",
    commission: 0,
    isDefault: true
  },
  {
    name: "Stripe",
    commission: 0,
    isDefault: true
  },
  {
    name: "Cash On Delivery",
    commission: 0,
    isDefault: true
  }
];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const AVAILABLE_DELIVERY_DATES = [
  {
    name: "Tomorrow",
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0
  },
  {
    name: "Next 3 Days",
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0
  },
  {
    name: "Next 5 Days",
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35
  }
];
export const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories", "Cameras"]
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Children", "Shoes", "Bags", "Jewelry"]
  },
  {
    name: "Home & Living",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting"]
  },
  {
    name: "Beauty & Health",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Personal Care"]
  },
  {
    name: "Sports & Outdoor",
    subcategories: ["Fitness", "Outdoor Recreation", "Sports Equipment", "Athletic Clothing"]
  },
  {
    name: "Books & Media",
    subcategories: ["Books", "Movies", "Music", "Games"]
  },
  {
    name: "Automotive",
    subcategories: ["Car Parts", "Car Electronics", "Tools", "Accessories"]
  },
  {
    name: "Toys & Games",
    subcategories: ["Action Figures", "Board Games", "Educational Toys", "Outdoor Toys"]
  },
  {
    name: "Garden & Tools",
    subcategories: ["Garden Tools", "Plants", "Outdoor Furniture", "Power Tools"]
  },
  {
    name: "Food & Beverages",
    subcategories: ["Snacks", "Beverages", "Cooking Ingredients", "Health Foods"]
  }
];
