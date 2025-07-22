export interface CategoriesSuccessResponse {
  data: Category[];
}

export interface Category {
  id: string;
  type: string;
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface StoresSuccessResponse {
  data: {
    data: StoreData[];
  };
  meta: StoreMeta;
}

export interface StoreData {
  id: string;
  type: "bussiness";
  attributes: StoreDataAttributes;
}

export interface StoreDataAttributes {
  store_name: string;
  description: string;
  area: string;
  block: string;
  mall_name: string;
  floor: string;
  unit_number: number | null;
  city: string;
  zipcode: string;
  driver_instruction: string;
  average_shipping_time: string;
  payment_mode: string[];
  store_operating_hours: Record<string, Day>;
  status: Status;
  latitude: number;
  longitude: number;
  is_open: boolean;
  available_variants: AvailableVariant[];
  image: string;
  email: string;
  contact_number: ContactNumber;
  expected_delivery_time: string;
}

export interface AvailableVariant {
  id: string;
  type: string;
  attributes: AvailableVariantAttributes;
}

export interface AvailableVariantAttributes {
  id: number;
  catalogue_id: number;
  product_name: string;
  product_description: string;
  sku: string;
  stock_qty: number;
  low_stock_threshold: number;
  is_listed: boolean;
  price: string;
  size: string;
  colour: string;
  gender: string;
  front_image: string;
  brand_name: string;
}

export interface ContactNumber {
  country_code: string;
  phone_number: string;
}

export enum Status {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}

export interface StoreOperatingHours {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

export interface Day {
  open: string;
  close: string;
  is_open: boolean;
}

export interface StoreMeta {
  total_pages: number;
  current_page: number;
  total_record: number;
  prev_page: null | number;
  next_page: null | number;
}

export interface SubCategorySuccessResponse {
  data: SubCategory[];
}

export interface SubCategory {
  id: string;
  type: string;
  attributes: SubCategoryAttributes;
}

export interface SubCategoryAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface SubSubCategorySuccessResponse {
  data: SubSubCategory[];
}

export interface SubSubCategory {
  id: string;
  type: string;
  attributes: SubSubCategoryAttributes;
}

export interface SubSubCategoryAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  image: string;
}
