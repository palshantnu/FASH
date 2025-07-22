export interface CartResponses {
  data?: {
    id: string;
    type: string;
    attributes: {
      id: number;
      order_number: string;
      title: string;
      amount: null;
      order_item_count: number;
      account_id: number;
      coupon_code_id: null;
      delivery_address_id: null;
      sub_total: string;
      total: string;
      status: string;
      custom_label: null;
      applied_discount: string;
      cancellation_reason: null;
      order_date: null;
      is_gift: boolean;
      placed_at: null;
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
      delivery_addresses: unknown[];
      order_return_date: null;
      order_return_time: null;
      razorpay_order_id: null;
      charged: null;
      invoice_id: null;
      invoiced: null;
      order_items: {
        id: string;
        type: string;
        attributes: OrderItemAttributes;
      }[];
    };
  };
  message?: string;
}

export interface NewOrder {
  id: string;
  type: string;
  attributes: any;
}

export interface OrderItemAttributes {
  id: number;
  order_management_order_id: number;
  variant_availability: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  old_unit_price: null;
  status: string;
  catalogue_id: number;
  catalogue_variant_id: number;
  order_status_id: number;
  placed_at: null;
  confirmed_at: null;
  in_transit_at: null;
  delivered_at: null;
  cancelled_at: null;
  refunded_at: null;
  manage_placed_status: boolean;
  manage_cancelled_status: boolean;
  created_at: string;
  updated_at: string;
  reason_of_rejection: null;
  rejected_at: null;
  estimated_delivery_time: string;
  order_statuses: OrderStatuses;
  catalogue: Catalogue;
  catalogue_variant: CatalogueVariant;
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
  pair_it_with: unknown[];
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
  attributes: StoreInfoAttributes;
}

export interface StoreInfoAttributes {
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
  available_variants: AvailableVariant[];
  image: null;
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
