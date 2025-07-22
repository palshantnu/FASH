export interface CatalogueSuccessResponse {
  data: Catalogue[];
  meta: CatalogueMeta;
}

export interface PlanList {
  id: string;
  type: string;
  attributes: PlanListAttributes;
}

export interface PlanListAttributes {
  name: string;
}

export interface Catalogue {
  id: string;
  type: string;
  attributes: CatalogueAttributes;
}

export interface CatalogueAttributes {
  name: string;
  brand: null;
  tags: Tags;
  reviews: unknown[];
  sku: null;
  description: string;
  manufacture_date: null;
  length: null;
  breadth: null;
  height: null;
  stock_qty: null;
  availability: null;
  weight: null;
  price: null;
  recommended: null;
  on_sale: null;
  sale_price: null;
  discount: null;
  is_wishlist: boolean;
  product_number: null;
  primary_image: string;
  primary_price: string;
  gender: Gender;
  brand_name: string;
  material: string;
  fit: string;
  prodcut_care: string;
  list_the_product: string;
  fit_discription: null;
  category: Category;
  sub_category: SubSubCategory;
  sub_sub_category: SubSubCategory;
  service: null;
  average_rating: number;
  catalogue_variants: CatalogueVariant[];
  catalogue_variants_with_store: CatalogueVariant[];
  is_wishlist?: boolean;
}

export interface CatalogueVariant {
  id: string;
  type: CatalogueVariantType;
  attributes: CatalogueVariantAttributes;
  store_info?: StoreInfo;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id: number;
  catalogue_variant_color: Variant;
  catalogue_variant_size_id: number;
  catalogue_variant_size: Variant;
  price: string;
  stock_qty: number;
  on_sale: null;
  sale_price: null;
  discount_price: null;
  length: null;
  breadth: null;
  height: null;
  created_at: string;
  updated_at: string;
  sku: string;
  low_stock_threshold: number;
  is_listed: boolean;
  front_image: string;
  back_image: string;
  side_image: string;
  pair_it_with: unknown[];
}

export interface Variant {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  image?: string;
}

export interface Datas {
  language: string;
  name: string;
  created_at: string;
  updated_at: string;
  image?: string;
}


export interface StoreInfo {
  id: string;
  type: string;
  attributes: StoreInfoAttributes;
}

export interface StoreInfoAttributes {
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
  store_operating_hours: StoreOperatingHours;
  status: string;
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
  type: AvailableVariantType;
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
  size: Size;
  colour: Colour;
  gender: Gender;
  front_image: string;
  brand_name: string;
}

export enum Colour {
  Black = "Black",
  Grey = "Grey",
  LimeGreen = "Lime Green",
  Whiteee = "Whiteee",
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export enum Size {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

export enum AvailableVariantType {
  InventoryManagement = "inventory_management",
}

export interface ContactNumber {
  country_code: string;
  phone_number: string;
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

export enum CatalogueVariantType {
  CatalogueVariant = "catalogue_variant",
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

export interface SubSubCategory {
  id: string;
  type: string;
  attributes: Variant;
}

export interface Tags {
  data: unknown[];
}

export interface CatalogueMeta {
  total_pages: number;
  current_page: number;
  total_record: number;
  prev_page: null | number;
  next_page: null | number;
}

export type FilterType =
  | "gender"
  | "price"
  | "size"
  | "color"
  | "category"
  | "sort"
  | "stores";

export interface SizesResponse {
  data: SizeData[];
}

export interface SizeData {
  id: string;
  type: string;
  attributes: SizeAttributes;
}

export interface SizeAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  selected: boolean;
}

export interface SortByAttributes {
  id: number;
  value: string;
  name: string;
  created_at: string;
  updated_at: string;
  selected: boolean;
}

export interface ColorsResponse {
  data: ColorType[];
}

export interface ColorType {
  id: string;
  type: string;
  attributes: ColorAttributes;
}

export interface ColorAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  selected: boolean;
}

export interface StoreResponse {
  data: StoreType[];
}

export interface StoreType {
  id: number;
  type: string;
  attributes: StoreAttributes;
}

export interface StoreAttributes {
  id: number;
  store_name: string;
  selected: boolean;
};

export interface CategoriesResponse {
  data: CategoryData[];
}

export interface CategoryData {
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
  selected: boolean;
}

export interface FiltersPayload {
  backKey: string;
  filters: {
    sizes: number[];
    colors: number[];
    stores: number[];
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    categories?: string[];
    subCategory?: string[];
  };
  from?: string;
}
