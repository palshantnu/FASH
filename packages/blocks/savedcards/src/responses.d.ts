export interface RetriveCustomerResponse {
  object: string;
  live_mode: boolean;
  created: string;
  merchant_id: string;
  payment_agreements: unknwon[];
  id: string;
  first_name: string;
  email: string;
}

export interface CreateCustomerResponse {
  customer_id: string;
}

export interface TokenizedCard {
  token: string;
  token_currency: null;
  card_exp_month: string;
  card_first_six: string;
  trx_mode: "TOKENIZE";
  order_number: string;
  transaction_number: string;
  card_last_four: string;
  save_card: string;
  card_object: "card";
  sdk_result: "SUCCESS";
  card_exp_year: string;
}

export interface AuthorizeCardResponse {
  error?: string;
  id: string;
  object: string;
  customer_initiated: boolean;
  authorize_debit: boolean;
  live_mode: boolean;
  api_version: string;
  method: string;
  status: string;
  amount: number;
  currency: string;
  threeDSecure: boolean;
  save_card: boolean;
  product: string;
  transaction: Transaction;
  response: Response;
  card: Card;
  receipt: Receipt;
  customer: Customer;
  source: Source;
  redirect: Post;
  post: Post;
  auto: Auto;
  merchant: Merchant;
}

export interface Auto {
  status: string;
  type: string;
  time: number;
}

export interface Card {
  object: string;
  first_six: string;
  first_eight: string;
  last_four: string;
  name: string;
  expiry: CardExpiry;
}

export interface CardExpiry {
  month: string;
  year: string;
}

export interface Customer {
  id: string;
  first_name: string;
  email: string;
}

export interface Merchant {
  country: string;
  id: string;
}

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
  expiry: TransactionExpiry;
  asynchronous: boolean;
  amount: number;
  currency: string;
}

export interface TransactionExpiry {
  period: number;
  type: string;
}

export interface ListCardResponse {
  object: string;
  has_more: boolean;
  live_mode: boolean;
  data: CardData[];
}

export interface CardData {
  id: string;
  created: number;
  object: string;
  address: Address;
  customer: string;
  funding: string;
  fingerprint: string;
  brand: string;
  scheme: string;
  name: string;
  exp_month: number;
  exp_year: number;
  last_four: string;
  first_six: string;
  first_eight: string;
}

export interface Address {}
