export interface CatalogueDataSuccess {
  data?: {
    id: string;
    type: string;
    attributes: DataAttributes;
  };
  error?: string;
}

export interface OwnerAddProps {
    address: string;
    area: string|null;
    block: string;
    mall_name: string;
    floor: string;
    unit_number: number;
    city: string;
    zipcode: string;
}

export interface DataAttributes {
  name: string;
  name_arabic: string;
  description_arabic: string;
  gender_arabic: string;
  brand_name_arabic: string;
  material_arabic: string;
  fit_arabic: string;
  prodcut_care_arabic: string;
  fit_discription_arabic: string;
  brand: unkown | null;
  tags: unknown[];
  reviews: unknown[];
  sku: unkown | null;
  description: string;
  manufacture_date: unkown | null;
  length: unkown | null;
  breadth: unkown | null;
  height: unkown | null;
  stock_qty: unkown | null;
  availability: unkown | null;
  weight: unkown | null;
  price: unkown | null;
  recommended: unkown | null;
  on_sale: unkown | null;
  sale_price: unkown | null;
  discount: unkown | null;
  is_wishlist: boolean;
  product_number: unkown | null;
  primary_image: string;
  gender: string;
  brand_name: string;
  material: string;
  fit: string;
  prodcut_care: string;
  list_the_product: string;
  fit_discription: string;
  category: Category;
  sub_category: SubSubCategory;
  sub_sub_category: SubSubCategory;
  service: unkown | null;
  average_rating: number;
  catalogue_variants: CatalogueVariant[];
  catalogue_variants_with_store: CatalogueVariant[];
  owner_first_name: string;
  owner_last_name: string;
  owner_full_name: string;
  owner_address:OwnerAddProps|null;
  primary_price:string | null ;
  primary_main_price: string | null;
  primary_discounted_percentage: string | number | null;
}

export interface CatalogueVariant {
  id: string;
  type: string;
  attributes: CatalogueVariantAttributes;
  store_info?: StoreInfo;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id: number;
  catalogue_variant_color: VariantAttributes;
  catalogue_variant_size_id: number;
  catalogue_variant_size: VariantAttributes;
  loyalty_points_wil_credit: number | null,
  custom_pay:string | null;
  custom_lp:any | null;
  price: string;
  discounted_price:string;
  stock_qty: number;
  on_sale: unkown | null;
  sale_price: unkown | null;
  discount_price: unkown | null;
  length: unkown | null;
  breadth: unkown | null;
  height: unkown | null;
  created_at: string;
  updated_at: string;
  low_stock_threshold: number;
  is_listed: boolean;
  front_image: string;
  back_image: string;
  side_image: string;
  pair_it_with: PairWith[];
  sku:string;
}

export interface PairWith {
  id: string;
  type: string;
  attributes: PairWithAttributes;
}

export interface PairWithAttributes {
  id: number;
  catalogue_id: number;
  product_name: string;
  product_description: string;
  sku: string;
  stock_qty: number;
  low_stock_threshold: number;
  is_listed: boolean;
  price: string;
  discounted_percentage:string | null;
  discounted_price: string | null
  size: string;
  colour: string;
  gender: string;
  front_image: string;
  brand_name: string;
}

export interface VariantAttributes {
  id: number;
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

export interface FiltersPayload {
  backKey: string;
  filters: {
    sizes: number[];
    colors: number[];
    stores: number[];
    minPrice?: string;
    maxPrice?: string;
    sort: string;
    categories: string[];
    subCategory: string[];
  };
  from?: string;
}

export interface StoreInfoAttributes {
  store_name: string;
  description: string | null;
  address: string;
  area: string;
  block: string;
  mall_name: null;
  floor: string;
  unit_number: null;
  city: string;
  zipcode: string;
  driver_instruction: string;
  average_shipping_time: string;
  payment_mode: unknown[];
  store_operating_hours: Record<string, Day>;
  status: string;
  latitude: null;
  longitude: null;
  is_open: boolean;
  available_variants: AvailableVariant[];
  image: string | null;
  email: string;
  contact_number: ContactNumber;
  expected_delivery_time: string;
}

export interface StoreInfoAllAttributes {
  store_name: string;
  store_name_arabic:string;
  description: string | null;
  description_arabic:string;
  address_arabic:string;
  area: string;
  area_arabic:string;
  block: string;
  block_arabic:string;
  mall_name: null;
  mall_name_arabic:null|string;
  floor: string;
  floor_arabic:string;
  unit_number: null;
  city: string;
  city_arabic:string;
  zipcode: string;
  driver_instruction: string;
  driver_instruction_arabic:string;
  average_shipping_time: string;
  payment_mode: unknown[];
  store_operating_hours: Record<string, Day>;
  status: string;
  latitude: null;
  longitude: null;
  is_open: boolean;
  available_variants: AvailableVariant[];
  image: string | null;
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
}

export interface ContactNumber {
  country_code: string;
  phone_number: string;
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
  attributes: PurpleAttributes;
}

export interface PairedProductsNavigationPayload
  extends CatalogueVariantAttributes {
  catalogue: {
    name: string;
    id: string;
    brand_name: string;
  };
}

export interface MyStoreDetail {
  data: {
    id: string;
    type: string;
    attributes: StoreInfoAttributes;
  };
}


export interface MyStoreDetailAllData {
  data: {
    id: string;
    type: string;
    attributes: StoreInfoAllAttributes;
  };
}

export interface Day {
  open: string;
  close: string;
  is_open: boolean;
}

export interface CatalogueItem  {
  id: string;
  type: string;
  attributes: {
      store_name: string;
      image: string | null; 
  };
};

export interface Variant {
  id: number | null;
  catalogue_id: number | null;
  catalogue_variant_color_id: number;
  catalogue_variant_size_id: number;
  price: number;
  stock_qty: number;
  sku: string;
  is_listed: boolean;
  remove_front_image: string | null;
  remove_back_image: string | null;
  remove_side_image: string | null;
  variant_color: string;
  variant_size: string;
}

interface AddProductDetails {
  brand: string;
  category: string;
  fit: string;
  gender: string;
  isListed: string;
  material: string;
  productCare: string;
  productDescription: string;
  productName: string;
  subCategory: string;
  subSubCategory: string;

  productNameArabic:string;
  brandArabic: string;
  materialArabic: string;
  fitArabic: string;
  productCareArabic:string;
  productDescriptionArabic:string;
  genderAra:string;
}

interface ProductData {
  addProductDetails: AddProductDetails;
  variants: Variant[];
}

interface BusinessItem {
  id: string;
  type: string;
  attributes: {
      store_name: string;
      image: string;
  };
};

interface colorList{
  id:string,name:string
}


interface CatalogueListing {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    primary_image: string | null;
    primary_price: string;
    is_wishlist?: boolean;
  };
}

export interface BuyNowResponse {
  data?: {
    id: string;
    type: string;
    attributes: DataAttributes;
  };
  message?: string;
}