export interface WishlistResponse {
  data: Array<WishListItem>;
}

export interface WishListItem {
  id: string;
  type: string;
  attributes: WishlistAttributes;
}

export interface WishlistAttributes {
  favouriteable_id: number;
  favouriteable_type: string;
  wishlist_id: number;
  notes: null;
  created_at: string;
  updated_at: string;
  favouriteable: {
    data: {
      id: string;
      type: string;
      attributes: FavouriteableAttributes;
    };
  };
}

export interface FavouriteableAttributes {
  name: string;
  brand: null;
  sku: null;
  description: string;
  manufacture_date: null;
  stock_qty: null;
  availability: null;
  price: null;
  discount: null;
  is_wishlist: boolean;
  product_number: null;
  primary_image: string;
  primary_price: string;
  gender: string;
  brand_name: string;
  material: string;
  fit: string;
  prodcut_care: string;
  list_the_product: string;
  fit_discription: null;
  primary_size: Variant;
  primary_colour: Variant;
}

export interface Variant {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface YouMayAlsoLikeResponse {
  data: YouMayAlsoLike[];
  meta: Meta;
}

export interface YouMayAlsoLike {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    catalogue_variants: CatalogueVariant[];
    primary_image: string;
    primary_price: string;
    is_wishlist: boolean;
  };
}

export interface CatalogueVariant {
  id: string;
  type: CatalogueVariantType;
  attributes: CatalogueVariantAttributes;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id: number;
  catalogue_variant_color: CatalogueVariantColorClass;
  catalogue_variant_size_id: number;
  catalogue_variant_size: CatalogueVariantColorClass;
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
  deactivate: boolean;
  low_stock_threshold: number;
  is_listed: boolean;
  front_image: string;
  back_image: string;
  side_image: string;
  pair_it_with: PairItWith[];
}

export interface CatalogueVariantColorClass {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PairItWith {
  id: string;
  type: PairItWithType;
  attributes: PairItWithAttributes;
}

export interface PairItWithAttributes {
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
  gender: Gender;
  front_image: string;
  brand_name: string;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export enum PairItWithType {
  InventoryManagement = "inventory_management",
}

export enum CatalogueVariantType {
  CatalogueVariant = "catalogue_variant",
}

export interface Meta {
  total_pages: number;
  current_page: number;
  total_record: { [key: string]: number };
  prev_page: null;
  next_page: number;
}
