export interface RefundRejectResponse {
  data?: {
    id: string;
    type: string;
    attributes: {
      id: string;
      status: "refunded_cancel";
      order_items: Array<unknown>;
    };
  };
  error?: string;
  message?: string;
}

export interface InitiateRefundResponse extends RefundRejectResponse {}

export interface ReturnRejectResponse {
  data?: {
    id: string;
    type: string;
    attributes: {
      id: string;
      status: "return_rejected";
      order_items: Array<unknown>;
    };
  };
  error?: string;
  message?: string;
}

export interface OrderListResponse {
  orders?: Orders;
  error?: string;
}

export interface Orders {
  data: OrderData[];
}

export interface OrderData {
  id: string;
  type: string;
  attributes: OrderAttributes;
}

export interface OrderAttributes {
  id: number;
  status: string;
  accept_order_upload_time: null;
  order_items: OrderItem[];
  order_management_order: OrderManagementOrder;
}

export interface OrderItem {
  id: string;
  type: string;
  attributes: OrderItemAttributes;
}

export interface OrderItemAttributes {
  status: string;
  placed_at: string;
  confirmed_at: string;
  in_transit_at: string;
  delivered_at: string;
  cancelled_at: null;
  rejected_at: null;
  process_at: string;
  shipped_at: null;
  return_at: string;
  return_cancel_at: null;
  return_pick_at: string;
  return_placed_at: string;
  return_confirmed_at: string;
  return_reject_at: null;
  returned_assign_at: null;
  quantity: number;
  unit_price: string;
  total_price: string;
  reason_of_rejection: null;
  reason_of_return: string;
  refunded_cancel_at: null;
  reason_refunded_cancel: null;
  refunded_at: null;
  catalogue_name: string;
  brand_name: string;
  catalogue_variant_color: string;
  catalogue_variant_sku: string;
  store_name: string;
  catalogue_variant_size: string;
  catalogue_variant_front_image: string;
  catalogue_variant_back_image: string;
  catalogue_variant_side_image: string;
  driver_name: null;
  driver_latitude: null;
  driver_longitude: null;
  driver_phone_number: null;
  otp: null;
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
  returned_assign_at: null;
  refunded_cancel_at: null;
  reason_refunded_cancel: null;
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
  city: string;
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
