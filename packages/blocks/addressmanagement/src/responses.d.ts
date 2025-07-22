export type AddressResponse =
  | {
      data: Address[];
      meta: Meta;
    }
  | Meta;

export interface Address {
  id: string;
  type: string;
  attributes: AddressAttributes;
}

export interface AddressAttributes {
  name: string;
  country_code: string;
  phone_number: string;
  contact_number: string;
  street: string;
  zipcode: string;
  area: string;
  block: string;
  city: string;
  house_or_building_number: string;
  floor: null;
  address_name: string;
  is_default: boolean;
  latitude: number;
  longitude: number;
  is_default_1: boolean;
}

export interface Meta {
  message: string;
}
