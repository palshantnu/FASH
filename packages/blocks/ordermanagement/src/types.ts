// Customizable Area Start
export interface AccountAttributes {
  activated: boolean;
  email: string;
  first_name: string;
  full_phone_number: string;
  last_name: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  unique_auth_id: string;
}

export interface Account {
  id: string;
  type: string;
  attributes: AccountAttributes;
}

export interface OrderStatuses {
  order_number: string;
  placed_at?: Date;
  confirmed_at?: Date;
  in_transit_at?: Date;
  delivered_at?: Date;
  cancelled_at?: Date;
  refunded_at?: Date;
}

export interface Category {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface SubCategory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Brand {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  currency: string;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id?: number;
  catalogue_variant_size_id?: number;
  price: string;
  stock_qty?: number;
  on_sale?: boolean;
  sale_price: string;
  discount_price: string;
  length?: number;
  breadth?: number;
  height?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CatalogueVariant {
  id: string;
  type: string;
  attributes: CatalogueVariantAttributes;
}

export interface CatalogueAttributes {
  category: Category;
  sub_category: SubCategory;
  brand: Brand;
  name: string;
  sku: string;
  description: string;
  manufacture_date: Date;
  length: number;
  breadth: number;
  height: number;
  stock_qty: number;
  availability: string;
  weight: string;
  price: number;
  recommended: boolean;
  on_sale: boolean;
  average_rating: number;
  catalogue_variants: CatalogueVariant[];
}

export interface Catalogue {
  id: string;
  type: string;
  attributes: CatalogueAttributes;
}

export interface OrderItemAttributes {
  id: number;
  order_management_order_id: number;
  quantity: number;
  unit_price: string;
  total_price: string;
  status: string;
  catalogue_id: number;
  catalogue_variant_id: number;
  order_status_id: number;
  reason_of_return: string;
  manage_placed_status: boolean;
  manage_cancelled_status: boolean;
  created_at: Date;
  updated_at: Date;
  order_statuses: OrderStatuses;
  catalogue: Catalogue;
  driver_name: string;
  otp: string;
  driver_latitude: number;
  driver_longitude: number;
}

export interface OrderItem {
  id: string;
  type: "order_item";
  attributes: OrderItemAttributes;
}
export interface NewOrder {
  id: string;
  type: "order";
  attributes: any;
}

export interface OrderItem1 {
  id: number;
  attributes: OrderItemAttributes;
}

export interface OrderStatusListAttribute {
  order_items: OrderItem1[];
  order_deliver_time: string;
}

export interface OrderAttributes {
  id: number;
  order_number: string;
  account_id: number;
  sub_total: string;
  total: string;
  status: string;
  applied_discount: string;
  order_status_id: number;
  is_group: boolean;
  reason_of_return: string;
  is_availability_checked: boolean;
  shipping_charge: string;
  shipping_discount: string;
  shipping_net_amt: string;
  shipping_total: string;
  total_tax: number;
  created_at: Date;
  updated_at: Date;
  account: Account;
  order_items: OrderItem[];
  delivery_addresses: Address["attributes"][];
}

export interface Order {
  id: string;
  type: "order";
  attributes: OrderAttributes;
}

export interface Address {
  id: string;
  type: string;
  attributes: {
    id: number;
    account_id: number;
    address: string;
    name: string;
    flat_no: string;
    zip_code: string;
    phone_number: string;
    deleted_at: null | string;
    latitude: null | number | string;
    longitude: null | number | string;
    residential: boolean;
    city: null | string;
    state_code: null | string;
    country_code: null | string;
    state: null | string;
    country: null | string;
    address_line_2: null | string;
    address_type: null | string;
    address_for: string;
    is_default: false;
    landmark: null | string;
    created_at: string;
    updated_at: string;
  };
}

export interface TextFields {
  name: string;
  value: string;
  placeholder: string;
  testId: string;
}

export interface OrderDetailsSellerTypes {
  id: number;
  title: string;
  brand: string;
  size: string;
  color: string;
  quantity: number;
  productCode: string;
  price: string;
  image: string;
}

type Errors =
  | [
      {
        message: string;
      }
    ]
  | null;
interface ResponseJson {
  data: [];
  errors: Errors;
  error: string;
  meta: { message: string };
}

export interface CountResponseJson {
  data: {};
  orders: {
    data: [];
  };
  errors: Errors;
  error: string;
  meta: { message: string };
  total_orders: number;
  total_shipped_orders: number;
  total_delivered_orders: number;
  total_rejected_orders: number;
  total_process_orders: number;
  total_in_process_orders: number;
  total_new_orders: number;
  total_return_request: number;
  total_return_in_process: number;
  total_return_under_process: number;
  total_refunded: number;
  total_return_refund_orders: number;
}

export interface ListReturnRefundOrderResponse {
  data?: SellerOrderSellerSeller[];
  error?: string;
}

export interface OrderItemAttributesSeller {
  quantity: number;
  unit_price: string;
  total_price: string;
  estimated_delivery_time: string;
  reason_of_rejection: string | null;
  reason_of_return:string | null;
  catalogue_name: string;
  catalogue:{attributes:{name:string}};
  catalogue_variant:{attributes:{front_image:string|null}}
  brand_name: string;
  catalogue_variant_color: string;
  catalogue_variant_sku: string;
  store_name: string | null;
  catalogue_variant_size: string;
  catalogue_variant_front_image: string;
  catalogue_variant_back_image: string;
  catalogue_variant_side_image: string;
  driver_name: string;
  return_type: string;
  otp: string;
}

export interface OrderItemSeller {
  id: string;
  type: string;
  attributes: OrderItemAttributesSeller;
}

export interface DeliveryAddressAttributes {
  name: string;
  country_code: string;
  phone_number: string;
  contact_number: string;
  street: string;
  zip_code: string;
  area: string;
  block: string;
  city: string;
  house_or_building_number: string;
  address_name: string;
  is_default: boolean;
  latitude: number;
  longitude: number;
}

export interface DeliveryAddress {
  id: string;
  type: string;
  attributes: DeliveryAddressAttributes;
}

export interface OrderManagementOrderAttributesSeller {
  order_number: string;
  account: string;
  sub_total: string;
  total: string;
  status: string;
  placed_at: string;
  confirmed_at: string | null;
  in_transit_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  refunded_at: string | null;
  returned_at: string | null;
  reason_of_return: string | null;
  deliver_by: string | null;
  order_status_id: number;
  created_at: string;
  updated_at: string;
  order_deliver_date: string | null;
  order_deliver_time: string | null;
  delivery_addresses: DeliveryAddress | null;
  order_return_date: string | null;
  order_return_time: string | null;
  payment_detail: {
    payment_type: string
  };
  applied_coupon_code?: string | null;
  applied_discount?: string | null;
}

export interface OrderManagementOrderSeller {
  id: string;
  type: string;
  attributes: OrderManagementOrderAttributesSeller;
}

export interface SellerOrderSellerAttributesSeller {
  id: number;
  status: string;
  accept_order_upload_time: string | null;
  order_items: OrderItemSeller[];
  estimated_arrival_time?: string | null;
  order_management_order: OrderManagementOrderSeller;
}

export interface SellerOrderSellerSeller {
  id: string;
  type: string;
  attributes: SellerOrderSellerAttributesSeller;
}

export interface DataSeller {
  data: SellerOrderSellerSeller[];
}

export interface AcceptReturnResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      status: string;
      accept_order_upload_time: null;
      order_items: Array<{
        id: string;
        type: string;
        attributes: {
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
          placed_at: string;
          confirmed_at: string;
          in_transit_at: string;
          delivered_at: string;
          cancelled_at: null;
          refunded_at: null;
          manage_placed_status: boolean;
          manage_cancelled_status: boolean;
          created_at: string;
          updated_at: string;
          reason_of_rejection: null;
          rejected_at: null;
          accept_order_upload_time: null;
          item_return_date: string;
          item_return_time: string;
          order_statuses: null;
          catalogue: Catalogue;
          catalogue_variant: CatalogueVariant;
        };
      }>;
      order_management_order: {};
      customer_name: string;
    };
  };
  message?: string;
  error?: string;
}

export interface SearchResponse {
  orders?: {
    data: OrderData[];
  };
  error?: string;
  message?: string;
}

export interface OrderData {
  id: string;
  type: string;
  attributes: OrderDataAttributes;
}

export interface OrderDataAttributes {
  id: number;
  status: string;
  accept_order_upload_time: null;
  status_humanize: string;
  order_items: OrderDataOrderItem[];
  order_management_order: OrderManagementOrder;
}

export interface OrderDataOrderItem {
  id: string;
  type: string;
  attributes: OrderDataOrderItemAttributes;
}

export interface OrderDataOrderItemAttributes {
  status: string;
  placed_at: string;
  confirmed_at: string;
  in_transit_at: string;
  delivered_at: string;
  cancelled_at: null;
  rejected_at: null;
  process_at: string;
  shipped_at: null;
  return_at: null;
  return_cancel_at: null;
  return_pick_at: string;
  return_placed_at: string;
  return_confirmed_at: string;
  return_reject_at: null;
  returned_assign_at: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  reason_of_rejection: null;
  reason_of_return: string;
  refunded_cancel_at: null;
  reason_refunded_cancel: null;
  refunded_at: null;
  status_humanize: string;
  catalogue_name: string;
  brand_name: string;
  catalogue_variant_color: string;
  catalogue_variant_sku: string;
  store_name: string;
  catalogue_variant_size: string;
  catalogue_variant_front_image: string;
  catalogue_variant_back_image: string;
  catalogue_variant_side_image: string;
  driver_name: string;
  driver_latitude: number;
  driver_longitude: number;
  driver_phone_number: string;
  otp: null | string;
}

export interface OrderManagementOrder {
  id: string;
  type: string;
  attributes: OrderManagementOrderAttributes;
}

export interface OrderManagementOrderAttributes {
  order_number: string;
  account: string;
  sub_total: string;
  total: string;
  status: string;
  placed_at: string;
  confirmed_at: string;
  in_transit_at: string;
  delivered_at: string;
  cancelled_at: null;
  refunded_at: null;
  returned_at: null;
  deliver_by: null;
  order_status_id: number;
  created_at: string;
  updated_at: string;
  order_deliver_date: null;
  order_deliver_time: null;
  delivery_addresses: DeliveryAddresses;
  order_return_date: string;
  order_return_time: string;
  returned_assign_at: string;
  refunded_cancel_at: null;
  reason_refunded_cancel: null;
  status_humanize: string;
  payment_detail: PaymentDetail;
}

export interface DeliveryAddresses {
  id: string;
  type: string;
  attributes: DeliveryAddressesAttributes;
}

export interface DeliveryAddressesAttributes {
  name: string;
  country_code: string;
  phone_number: string;
  contact_number: string;
  street: string;
  zip_code: string;
  area: string;
  block: string;
  city: null;
  house_or_building_number: string;
  address_name: string;
  is_default: boolean;
  latitude: number;
  longitude: number;
}

export interface PaymentDetail {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  charge_id: string;
  merchant_id: null;
  order_id: string;
  amount: string;
  currency: string;
  customer_id: string;
  reason: string;
  account_id: number;
  order_management_order_id: number;
  refund_id: null;
  refund_amount: string;
  refund_reason: null;
  seller_order_id: null;
  last_four_card_digit: string;
  payment_type: string;
  deleted: boolean;
}

export interface DeliveryAddressNew {
  id: string;
  type: string;
  attributes: {
    name: string;
    country_code: string;
    phone_number: string;
    contact_number: string;
    street: string;
    zip_code: string;
    area: string;
    block: string;
    city: string | null;
    house_or_building_number: string;
    address_name: string;
    is_default: boolean;
    latitude: number;
    longitude: number;
  };
}

export interface PaymentDetailNew {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  charge_id: string;
  merchant_id: string | null;
  order_id: string;
  amount: string;
  currency: string;
  customer_id: string;
  reason: string;
  account_id: number;
  order_management_order_id: number;
  refund_id: string | null;
  refund_amount: string;
  refund_reason: string | null;
  seller_order_id: string | null;
  last_four_card_digit: string;
  payment_type: string;
  deleted: boolean;
}

export interface OrderManagementOrderNew {
  id: string;
  type: string;
  attributes: {
    order_number: string;
    account: string;
    sub_total: string;
    total: string;
    status: string;
    placed_at: string;
    confirmed_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    cancelled_at: string | null;
    refunded_at: string | null;
    returned_at: string | null;
    deliver_by: string | null;
    order_status_id: number;
    created_at: string;
    updated_at: string;
    order_deliver_date: string | null;
    order_deliver_time: string | null;
    delivery_addresses: DeliveryAddressNew;
    order_return_date: string | null;
    order_return_time: string | null;
    returned_assign_at: string | null;
    refunded_cancel_at: string | null;
    reason_refunded_cancel: string | null;
    status_humanize: string;
    payment_detail: PaymentDetailNew;
  };
}

export interface OrderItemSellerNew {
  id: string;
  type: string;
  attributes: {
    status: string;
    placed_at: string;
    confirmed_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    cancelled_at: string | null;
    rejected_at: string | null;
    process_at: string | null;
    shipped_at: string | null;
    return_at: string | null;
    return_cancel_at: string | null;
    return_pick_at: string | null;
    return_placed_at: string | null;
    return_confirmed_at: string | null;
    return_reject_at: string | null;
    returned_assign_at: string | null;
    quantity: number;
    unit_price: string;
    total_price: string;
    reason_of_rejection: string | null;
    reason_of_return: string | null;
    refunded_cancel_at: string | null;
    reason_refunded_cancel: string | null;
    refunded_at: string | null;
    return_type: string | null;
    status_humanize: string;
    catalogue_name: string;
    brand_name: string;
    catalogue_variant_color: string;
    catalogue_variant_sku: string;
    catalogue_variant_size: string;
    catalogue_variant_front_image: string;
    catalogue_variant_back_image: string;
    catalogue_variant_side_image: string;
    driver_name: string | null;
    driver_latitude: number | null;
    driver_longitude: number | null;
    driver_phone_number: string | null;
    otp: string | null;
    store_name: string;
  };
}

export interface SellerOrderSellerNew {
  id: string;
  type: string;
  attributes: {
    id: number;
    status: string;
    order_wait_time:number;
    accept_order_upload_time: string | null;
    created_at: string;
    updated_at: string;
    status_humanize: string;
    estimated_arrival_time: string | null;
    order_items: OrderItemSellerNew[];
    order_management_order: OrderManagementOrderNew;
  };
}

export interface ProductSourcingOrdersList {
  data: PSOrderRequest[];
}

export interface PSOrderRequest {
  id: string;
  type: string;
  attributes: PSOrderAttributes;
}

interface PSOrderAttributes {
  product_name: string;
  status: string;
  gender: string;
  size: string;
  color: string;
  quantity: number;
  product_quantity: number;
  price_per_unit: string;
  shipping_cost: string;
  product_display_image: string | null;
  accept_through: string;
  sku: string | null;
  product_sourcing_request_id: number;
  stylist: string;
  buyer: string;
  payment_method: string | null;
  shipping_address: ShippingAddress[];
  primary_image:string|null
}

interface ShippingAddress {
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
  city: string | null;
  house_or_building_number: string;
  floor: string | null;
  apartment_number: string | null;
  name: string;
  contact_number: string;
  is_default: boolean;
  country_code: string;
  phone_number: string;
}


// Customizable Area End
