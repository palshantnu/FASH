export interface StylistCustomFormResponse {
  data: {
    id: string;
    type: string;
    attributes: AccountAttributes;
  };
  error?: string;
  errors?: any;
}

export interface AccountAttributes {
  status: number;
  preferred_language: string;
  location_info: string;
  address: string;
  contact_details: string | null;
  instagram: string;
  facebook: string;
  tiktok: string;
  pinterest: string;
  biography: string;
  year_of_experience: string;
  expertise: string;
  block: string;
  mall_name: string;
  floor: string;
  unit_number: null | string;
  city: string;
  zipcode: string;
  contact_number: string;
  google_pay: null | string;
  apple_pay: null | string;
  account_id: number;
  passport_status: null | string;
  moa_status: null | string;
  authorized_signature_status: null | string;
  commercial_license_status: null | string;
  business_bank_account_status: null | string;
  bank_detail: BankDetail;
  passport: null | string;
  authorized_signature: null | string;
  commercial_license: null | string;
  moa: null | string;
  business_bank_account: null | string;
  profile_picture: string;
}

export interface BankDetail {
  data: {
    id: string;
    type: string;
    attributes: BankAttributes;
  }[];
}

export interface BankAttributes {
  bank_name: null;
  account_holder_name: string;
  bank_code: null;
  account_number: string;
  iban: string;
  is_default: boolean;
}

export interface StylistListResponse {
  data: Stylist[];
  meta: StylistMeta;
}

export interface Stylist {
  id: string;
  type: Type;
  attributes: StylistAttributes;
}

export interface StylistAttributes {
  activated: boolean;
  country_code: null | string;
  email: string;
  first_name: null;
  full_phone_number: string;
  last_name: null;
  full_name: string;
  phone_number: null | string;
  type: null | string;
  created_at: string;
  updated_at: string;
  device_id: null;
  unique_auth_id: string;
  driver_status: string;
  seller_status: string;
  approve_status: string;
  language: string;
  currency: string;
  bio: null | string;
  profile_picture: null | string;
  is_favorite: boolean;
}

export interface StylistMeta {
  total_pages: number;
  current_page: number;
  total_record: number;
  prev_page: null;
  next_page: number;
}
