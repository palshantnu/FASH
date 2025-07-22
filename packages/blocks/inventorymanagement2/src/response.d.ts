export interface InventorySuccessReponse {
  data: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  type: string;
  attributes: InventoryItemAttributes;
}

export interface InventoryItemAttributes {
  id: number;
  catalogue_id: number;
  product_name: string;
  product_description: string;
  sku: string;
  stock_qty: number;
  low_stock_threshold: number;
  is_listed: boolean;
  price:  number;
  dis_price:number;
  size: string;
  colour: string;
  gender: string;
  front_image: string;
  brand_name: string;
  discounted_percentage:number ;
  discounted_price:number;
}

export interface StatsResponse {
  total_products: number | string;
  out_of_stock: number | string;
  low_stock: number | string;
  unlisted: number | string;
}

export interface Filters {
  low_on_stock: boolean;
  out_of_stock: boolean;
  // in_stock: boolean;
  listed: boolean;
  unlisted: boolean;
}

export interface FiltersPayload {
  backKey: string;
  filters: {
    colors: number[];
    minPrice?: string;
    maxPrice?: string;
    categories: string[];
    subCategory: string[];
    subSubCategory: string[];
  };
}
