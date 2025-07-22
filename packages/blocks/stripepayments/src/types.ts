// Customizable Area Start
import React from "react";

interface Address {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
}

interface BillingDetails {
  address: Address;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
}

interface Checks {
  address_line1_check?: string | null;
  address_postal_code_check?: string | null;
  cvc_check: string;
}

interface Networks {
  available: string[];
  preferred?: boolean;
}

interface ThreeDSecureUsage {
  supported: boolean;
}

interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from?: Object;
  last4: string;
  networks: Networks;
  three_d_secure_usage: ThreeDSecureUsage;
  wallet?: Object;
}

interface Attributes {
  billing_details: BillingDetails;
  card: Card;
  customer: string;
  created: number;
}

export interface IPaymentMethod {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface ChangeEvent<T> extends React.ChangeEvent<T> {
  target: { rawValue: string } & EventTarget & T;
}
// Customizable Area End
