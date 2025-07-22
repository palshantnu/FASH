export interface UserDetailResponse {
  data: {
    id: string;
    type: string;
    attributes: UserAttributes;
  };
}

export interface UserAttributes {
  activated: boolean;
  country_code: string;
  email: string;
  first_name: string;
  full_phone_number: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  type: null;
  created_at: string;
  updated_at: string;
  device_id: null;
  unique_auth_id: string;
  id_proof: IDProof;
  license: IDProof;
  seller_status: string;
  approve_status: string;
}

export interface IDProof {
  name: string;
  record: Record;
}

export interface Record {
  id: number;
  first_name: string;
  last_name: string;
  full_phone_number: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  device_id: null;
  unique_auth_id: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  user_name: null;
  platform: null;
  user_type: null;
  app_language_id: null;
  last_visit_at: null;
  is_blacklisted: boolean;
  suspend_until: null;
  status: string;
  gender: null;
  date_of_birth: null;
  age: null;
  stripe_id: null;
  stripe_subscription_id: null;
  stripe_subscription_date: null;
  role: string;
  full_name: string;
  is_verified: null;
  share_token: null;
  approve_status: string;
  seller_status: string;
  notification: Notification;
  customer_id: null;
  wallet_amount: string;
}

export interface Notification {
  push_notification: EmailNotificationClass;
  email_notification: EmailNotificationClass;
}

export interface EmailNotificationClass {
  order_invoices: boolean;
  order_confirmations: boolean;
  delivery_confirmation: boolean;
  reviews_and_feedback_requests: boolean;
  refund_or_payment_complete: boolean;
  marketing_emails: boolean;
  product_stock_updates: boolean;
}
