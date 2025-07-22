export interface ResponseStore {
    id: string;
    type: string;
    attributes: Attributes;
  }
  
  export interface Attributes {
    store_name: string;
    description: string;
    area: string;
    block: string;
    mall_name: string;
    floor: string;
    unit_number: number;
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
    image: string;
    email: string;
    contact_number: ContactNumber;
    expected_delivery_time: string;
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
  
  export interface Image {
    url: string;
}

export interface HireStylistCustomFormAttributes {
    stylist_id: number;
    gender: string;
    colour: string;
    detail: string;
    min_price: number;
    max_price: number;
    status: string;
    buyer_name: string;
    buyer_profile: string | null;
    stylist_name: string;
    stylist_profile: string | null;
    images: Image[];
    created_at: string;
}

export interface HireStylistCustomForm {
    id: string;
    type: string;
    attributes: HireStylistCustomFormAttributes;
}

export interface Meta {
    total_pages: number;
    current_page: number;
    total_record: number;
    prev_page: number | null;
    next_page: number | null;
}

export interface NewRequest {
    data: HireStylistCustomForm[];
    meta: Meta;
}

export interface Order {
  orders: {
    data: OrderData[];
  };
}

export interface OrderData {
  id: string;
  type: string;
  attributes: OrderAttributes;
}

export interface OrderAttributes {
  id: number;
  status: string;
  accept_order_upload_time: string | null;
  created_at: string;
  updated_at: string;
  status_humanize: string;
  estimated_arrival_time: string | null;
  order_items: OrderItem[];
  order_management_order: OrderManagement;
}

export interface OrderItem {
  id: string;
  type: string;
  attributes: OrderItemAttributes;
}

export interface OrderItemAttributes {
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
  stylist_full_name: string;
  stylist_id: number;
}

export interface OrderManagement {
  id: string;
  type: string;
  attributes: OrderManagementAttributes;
}

export interface OrderManagementAttributes {
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
  order_deliver_date: string;
  order_deliver_time: string;
  delivery_addresses: DeliveryAddress;
  order_return_date: string | null;
  order_return_time: string | null;
  returned_assign_at: string | null;
  refunded_cancel_at: string | null;
  reason_refunded_cancel: string | null;
  applied_discount: string;
  status_humanize: string;
  payment_detail: string | null;
  applied_coupon_code: string | null;
}

export interface DeliveryAddress {
  id: string;
  type: string;
  attributes: DeliveryAddressAttributes;
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
  city: string | null;
  house_or_building_number: string;
  address_name: string;
  is_default: boolean;
  latitude: number;
  longitude: number;
}
