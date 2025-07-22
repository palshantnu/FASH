export interface Root {
  current_user_role: string
  message: any
  data: Data
}

export interface Data {
  id: string
  type: string
  attributes: Attributes
  relationships: Relationships
}

export interface Attributes {
  wishlist: WishID
  id: number
  name: string
  accounts_chats: AccountsChat[]
  messages: Message[]
}

export interface AccountsChat {
  id: string
  type: string
  attributes: Attributes2
}

export interface Attributes2 {
  account_phone: string
  account_name: string
  role: string
  account_id: number
  muted: boolean
}

export interface Message {
  id: string
  type: string
  attributes: Attributes3
}

export interface Attributes3 {
  id: number
  message: any
  account_id: number
  chat_id: number
  created_at: string
  updated_at: string
  is_mark_read: boolean
  attachments: any
  role: string
}

export interface Relationships {
  accounts: Accounts
}

export interface Accounts {
  data: Daum[]
}

export interface Daum {
  id: string
  type: string
}

export interface Wishlist {
  wishlist_id: number
  wishlist_name: string
  catalogues: Catalogue[]
}

export interface Catalogue {
  catalogue_id: number
  catalogue_name: string
  images: string[]
}

export interface OrderRequest {
  order_request_id: number
  product_name: string
  gender: string
  size: string
  color: string
  product_quantity: number
  price_per_unit: string
  shipping_cost: string
  product_display_image_url: any,
  total_amount : any,
  status: string
}

export interface WishID {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface CartWithItemsResponse {
  data: {
    id: string;
    type: string;
    attributes: CartAttributes;
  };
}

export interface ApplyCouponResponse {
  error?: string;
  message: string;
  data?: {
    coupon: CartWithItemsResponse;
    message: string;
  };
}

export interface RemoveCouponResponse {
  error?: string;
  message: string;
  data?: CartWithItemsResponse;
}

export interface CartAttributes {
  id: number;
  order_number: string;
  title: string;
  amount: null;
  order_item_count: number;
  account_id: number;
  coupon_code_id: null;
  delivery_address_id: null | number;
  sub_total: string;
  total: string;
  status: string;
  custom_label: null;
  applied_discount: string;
  cancellation_reason: null;
  order_date: null;
  is_gift: boolean;
  placed_at: null | string;
  confirmed_at: null;
  in_transit_at: null;
  delivered_at: null;
  cancelled_at: null;
  refunded_at: null;
  source: null;
  shipment_id: null;
  delivery_charges: null;
  tracking_url: null;
  schedule_time: null;
  payment_failed_at: null;
  payment_pending_at: null;
  returned_at: null;
  tax_charges: string;
  deliver_by: null;
  tracking_number: null;
  is_error: boolean;
  delivery_error_message: null;
  order_status_id: number;
  is_group: boolean;
  is_availability_checked: boolean;
  shipping_charge: string;
  shipping_discount: string;
  shipping_net_amt: string;
  shipping_total: string;
  total_tax: number;
  created_at: string;
  updated_at: string;
  order_deliver_date: null;
  order_deliver_time: null;
  delivery_addresses: null | Address;
  order_return_date: null;
  order_return_time: null;
  razorpay_order_id: null;
  charged: null;
  invoice_id: null;
  invoiced: null;
  order_items: OrderItem[];
  payment_detail: null;
  applied_copon_code: string | null;
  estimated_delivery_time: string;
}

export interface OrderItem {
  id: string;
  type: string;
  attributes: OrderItemAttributes;
}

export interface OrderItemAttributes {
  quantity: number;
  unit_price: string;
  total_price: string;
  estimated_delivery_time: string;
  reason_of_rejection: null;
  catalogue_name: string;
  brand_name: string;
  catalogue_variant_color: string;
  catalogue_variant_sku: string;
  store_name: null | string | undefined;
  catalogue_id: number;
  catalogue_variant_size: string;
  catalogue_variant_front_image: string;
  catalogue_variant_back_image: string;
  catalogue_variant_side_image: string;
  stylist_full_name:string|null;
}

export interface Catalogue {
  id: string;
  type: string;
  attributes: CatalogueAttributes;
}

export interface CatalogueAttributes {
  name: string;
  brand: null;
  tags: unknown[];
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
  is_wishlist: null;
  product_number: null;
  primary_image: string;
  gender: string;
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
}

export interface CatalogueVariant {
  id: string;
  type: string;
  attributes: CatalogueVariantAttributes;
  store_info?: StoreInfo | null;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id: number;
  catalogue_variant_color: CatalogueVariantColor;
  catalogue_variant_size_id: number;
  catalogue_variant_size: CatalogueVariantColor;
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
  low_stock_threshold: number;
  is_listed: boolean;
  front_image: string;
  back_image: string;
  side_image: string;
}

export interface CatalogueVariantColor {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  image?: string;
}

export interface StoreInfo {
  id: string;
  type: string;
  attributes: {
    store_name: string;
    description: null;
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
    store_operating_hours: string;
    status: string;
    latitude: null;
    longitude: null;
    image: null;
    email: string;
    contact_number: {
      country_code: string;
      phone_number: string;
    };
    expected_delivery_time: string;
  };
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
  attributes: CatalogueVariantColor;
}

export interface OrderStatuses {
  order_number: string;
  placed_at: null;
  confirmed_at: null;
  in_transit_at: null;
  delivered_at: null;
  cancelled_at: null;
  refunded_at: null;
}

export type AddressResponse =
  | {
      data: Address[];
    }
  | {
      message: string;
    };

export interface Address {
  id: string;
  type: string;
  attributes: AddressAttributes;
}

export interface AddressAttributes {
  name: string;
  country_code: string;
  contact_number: string;
  phone_number: string;
  zipcode: string;
  zip_code: string;
  street: string;
  area: string;
  block: string;
  house_or_building_number: string;
  city: string;
  address_name: string;
  floor: null | string;
  is_default: boolean;
  latitude: number;
  longitude: number;
}

export interface ChargeCreateResponse {
  id: string;
  object: string;
  live_mode: boolean;
  customer_initiated: boolean;
  api_version: string;
  method: string;
  status: string;
  amount: number;
  currency: string;
  threeDSecure: boolean;
  card_threeDSecure: boolean;
  save_card: boolean;
  product: string;
  metadata: {
    order_id: string;
    order_number: string;
    account_id: string;
  };
  order: Order;
  transaction: Transaction;
  response: Response;
  receipt: Receipt;
  customer: Customer;
  merchant: {
    id: string;
  };
  source: Source;
  redirect: Post;
  post: Post;
  activities: {
    id: string;
    object: string;
    created: number;
    status: string;
    currency: string;
    amount: number;
    remarks: string;
    txn_id: string;
  }[];
  auto_reversed: boolean;
}

export interface Customer {
  id: string;
  first_name: string;
  email: string;
}

export interface Order {}

export interface Post {
  status: string;
  url: string;
}

export interface Receipt {
  email: boolean;
  sms: boolean;
}

export interface Response {
  code: string;
  message: string;
}

export interface Source {
  object: string;
  id: string;
  on_file: boolean;
}

export interface Transaction {
  timezone: string;
  created: string;
  url: string;
  expiry: Expiry;
  asynchronous: boolean;
  amount: number;
  currency: string;
}

export interface Expiry {
  period: number;
  type: string;
}

export interface ShippingAddress {
  id: number;
  country: string | null;
  latitude: number;
  longitude: number;
  address_name: string;
  addressble_id: number;
  addressble_type: string;
  address_type: string | null;
  created_at: string;
  updated_at: string;
  first_name: string | null;
  last_name: string | null;
  number: string | null;
  street: string;
  zipcode: string;
  area: string;
  block: string;
  city: string;
  house_or_building_number: string;
  floor: string | null;
  apartment_number: string | null;
  name: string;
  contact_number: string;
  is_default: boolean;
  country_code: string;
  phone_number: string;
}

export interface CartData {
  product_name: string;
  product_desc: string;
  status: string;
  gender: string;
  size: string;
  color: string;
  quantity: number;
  product_quantity: number;
  accept_through: string | null;
  accept_time: string | null;
  primary_display_image: string | null;
  primary_image: string | null;
  price_per_unit: string;
  shipping_cost: string;
  total_amount: string;
  sku: string | null;
  product_sourcing_request_id: string | null;
  stylist: string;
  buyer: string;
  estimated_arrival_time: string;
  payment_method: string | null;
  shipping_address: ShippingAddress[];
}