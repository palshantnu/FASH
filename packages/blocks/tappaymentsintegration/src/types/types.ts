export interface ChargeResponse {
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
  transaction: Transaction;
  reference: Reference;
  response: Response;
  receipt: Receipt;
  customer: Customer;
  merchant: Merchant;
  source: Source;
  redirect: Redirect;
  post: Post;
  activities: Activity[];
  auto_reversed: boolean;
  meta:{
    message:string;
    total_loyalty_points:number;
  },
  metadata: {
    order_id: string;
    order_number: string;
    account_id: string;
  };
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

export interface Reference {
  transaction: string;
  order: string;
}

export interface Response {
  code: string;
  message: string;
}

export interface Receipt {
  email: boolean;
  sms: boolean;
}

export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: Phone;
}

export interface Phone {
  country_code: string;
  number: string;
}

export interface Merchant {
  id: string;
}

export interface Source {
  object: string;
  id: string;
  on_file: boolean;
}

export interface Redirect {
  status: string;
  url: string;
}

export interface Post {
  status: string;
  url: string;
}

export interface Activity {
  id: string;
  object: string;
  created: number;
  status: string;
  currency: string;
  amount: number;
  remarks: string;
}

export interface WebhookResponse {
  id: number;
  sucess: boolean;
  reason: string;
  status: string;
}

export interface BuyerPaymentResponseProps {
  id:string;
  status: string;
  charge_id: string;
  merchant_id: null | string;
  order_id: string;
  amount: number;
  currency: string;
  customer_id: string;
  order_management_order_id: number;
  refund_id: null | string;
  refund_amount: null | string;
  last_four_card_digit: string;
  payment_type: string;
  deleted: boolean;
  created_at:string;
  url:string;
}
export interface OrderReponse {
  data: {
    id: string;
    type: string;
    attributes: OrderAttributes;
  };
}

export interface OrderAttributes {
  order_number: string;
  account: string;
  order_item_count: number;
  sub_total: string;
  total: string;
  status: string;
  placed_at: string;
  confirmed_at: string;
  in_transit_at: null;
  delivered_at: null;
  process_at: null;
  shipped_at: null;
  return_at: null;
  return_cancel_at: null;
  return_pick_at: null;
  cancelled_at: null;
  cancellation_reason: null;
  rejected_at: null;
  refunded_at: null;
  returned_at: null;
  deliver_by: null;
  order_status_id: number;
  created_at: string;
  updated_at: string;
  order_deliver_date: null;
  order_deliver_time: null;
  delivery_addresses: DeliveryAddresses;
  order_return_date: null;
  order_return_time: null;
  order_items: OrderItem[];
  payment_detail: PaymentDetail;
  buyer_latitude: null;
  buyer_longitude: null;
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

export interface OrderItem {
  id: string;
  type: string;
  attributes: OrderItemAttributes;
}

export interface OrderItemAttributes {
  status: string;
  placed_at: string;
  confirmed_at: string;
  in_transit_at: null;
  delivered_at: null;
  cancelled_at: null;
  rejected_at: null;
  process_at: null;
  shipped_at: null;
  return_at: null;
  return_cancel_at: null;
  return_pick_at: null;
  quantity: number;
  unit_price: string;
  total_price: string;
  reason_of_rejection: null;
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

export interface PaymentDetail {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  charge_id: string;
  merchant_id: null;
  order_id: string;
  amount: number;
  currency: string;
  customer_id: string;
}

export interface DriverBankMethodAttrProps {
  bank_name: string;
  account_holder_name: string;
  bank_code: string;
  account_number: string;
  iban: string;
  is_default: boolean;
}

export interface DriverBankMethodProps {
  id: string;
  type: string;
  attributes:DriverBankMethodAttrProps;
}
export interface EarningProps {
  showEarning:string;
  earningShowFilter:string;
  earningName :string;
  status:boolean;
  selectEarning:string;
}
