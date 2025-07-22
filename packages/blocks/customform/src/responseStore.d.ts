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

export interface RegisterType {
  name: string;
  value: string;
  showName:string;
  icon: ImageSourcePropType;
}

export interface VehicleType {
  name: string;
  value: string;
  icon: ImageSourcePropType;
  showName:string;
}

export interface CityType {
  name: string;
  value: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface ProductSourcingRequestAttributes {
  id: number;
  product_name: string;
  request_status: string;
  max_price: string;
  min_price: string;
  sizes: string[];
  description: string;
  gender: string;
  quantity: number;
  colours: string[];
  images: Image[];
  total_stylist_offer_requests: number;
  product_sourcing_stylist_prices: any[];
}

export interface ProductSourcingRequest {
  id: string;
  type: string;
  attributes: ProductSourcingRequestAttributes;
}

export interface ProductSourcingRequestData {
  data: ProductSourcingRequest[];
}

export interface ProductSourcingStylistPrice {
  id: number;
  request_id: number;
  account_id: number;
  quote_price: number;
  product_description: string | null;
  request_status: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSourcingRequestStylistAttributes {
  id: number;
  product_name: string;
  request_status: string;
  max_price: string | null;
  min_price: string | null;
  sizes: string[];
  description: string | null;
  gender: string | null;
  quantity: number | null;
  colours: string[];
  images: Image[];
  total_stylist_offer_requests: number;
  product_sourcing_stylist_prices: ProductSourcingStylistPrice[];
}

export interface ProductSourcingStylistRequest {
  id: string;
  type: string;
  attributes: ProductSourcingRequestStylistAttributes;
}

export interface ApiData {
  data: ProductSourcingStylistRequest[];
}


export interface ProductSourcingStylistResponse {
  id: number;
  request_id: number;
  account_id: number;
  quote_price: number;
  product_description: string;
  request_status: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  images: Image[];
}

export interface SourcingRequestStylistAttributes {
  id: number;
  product_name: string;
  request_status: string;
  buyer_id : number;
  max_price: string;
  min_price: string;
  sizes: string[];
  description: string;
  gender: string;
  quantity: number;
  colours: string[];
  images: Image[];
  product_sourcing_stylist_prices: ProductSourcingStylistResponse[];
}

export interface SourcingRequestStylistData {
  id: string;
  type: string;
  attributes: SourcingRequestStylistAttributes;
}

export interface SourcingRequestStylistResponse {
  data: SourcingRequestStylistData;
}


export interface MyBidsData {
  data: MyBidsDataStylistPrice[];
}

export interface MyBidsDataStylistPrice {
  id: string;
  type: string;
  attributes: ProductSourcingStylistPriceAttributes;
}

export interface ProductSourcingStylistPriceAttributes {
  id: number;
  request_id: number;
  account_id: number;
  quote_price: number;
  product_description: string;
  request_status: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  images: Image[];
  product_sourcing_request: MyBidsProductSourcingRequest;
}

export interface MyBidsProductSourcingRequest {
  id: number;
  product_name: string;
  sizes: string[];
  colours: string[];
  gender: string;
  min_price: string;
  max_price: string;
  quantity: number;
  request_status: string;
  description: string;
  created_at: string;
  updated_at: string;
  images: Image[];
}

interface OrderRequest {
  data: {
    id: string;
    type: string;
    attributes: {
      product_name: string;
      status: string;
      gender: string;
      size: string;
      color: string;
      quantity: number;
      product_quantity: number;
      price_per_unit: string;
      shipping_cost: string;
      product_display_image: {
        name: string;
        record: {
          id: number;
          product_name: string;
          gender: string;
          size: string;
          color: string;
          product_quantity: number;
          price_per_unit: string;
          shipping_cost: string;
          stylist_id: number;
          buyer_id: number;
          created_at: string;
          updated_at: string;
          status: string;
          quantity: number;
          request_id: number;
          accept_through: string;
        };
      };
      accept_through: string;
      sku: string | null;
      product_sourcing_request_id: number;
      stylist: string;
      buyer: string;
      payment_method: string | null;
      shipping_address: ShippingAddress[];
    };
  };
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
