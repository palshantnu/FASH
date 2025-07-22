import { ICurrencyList } from "../src/TappaymentsintegrationController";
export const myURL = "https://www.google.com";

const mockChargeRes = {
  id: "chg_TS02A0220231027w5JP2111081",
  object: "charge",
  live_mode: false,
  customer_initiated: true,
  api_version: "V2",
  method: "CREATE",
  status: "INITIATED",
  amount: 10,
  currency: "AED",
  threeDSecure: true,
  card_threeDSecure: false,
  save_card: false,
  product: "GOSELL",
  order: {},
  transaction: {
    timezone: "UTC+03:00",
    created: "1700562422097",
    url: "https://checkout.beta.tap.company/?mode=page&themeMode=&language=en&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NWM1YmM2OGNlNGY3NDhiNGMwYjVkNyJ9.G7Eyyw_oUSxA-dkqoRNb7PocMQ3eLlTr5HAy-S9L4xs",
    expiry: { period: 30, type: "MINUTE" },
    asynchronous: false,
    amount: 10,
    currency: "AED",
  },
  reference: { transaction: "txn_01", order: "ord_01" },
  response: { code: "100", message: "Initiated" },
  receipt: { email: true, sms: true },
  customer: {
    first_name: "test",
    last_name: "test",
    email: "test@test.com",
    phone: { country_code: "965", number: "51234567" },
  },
  merchant: { id: "26456997" },
  source: { object: "source", id: "src_card", on_file: false },
  redirect: { status: "PENDING", url: myURL },
  post: {
    status: "PENDING",
    url: "https://a61f-20-244-58-182.ngrok-free.app/bx_block_tappaymentsintegration/tappayment_checkout/tappayment_webhook",
  },
  activities: [
    {
      id: "activity_TS04A0220231027Pc662111643",
      object: "activity",
      created: 1700562422097,
      status: "INITIATED",
      currency: "AED",
      amount: 10,
      remarks: "charge - created",
    },
  ],
  auto_reversed: false,
};

const mockWebhookRetryRes = { success: false, reason: "retry" };

const mockWebhookRetry1Res = { success: false };

const mockWebhookRetry2Res = { success: false, reason: "failed" };

const mockWebhookCancelledRes = {
  id: 178,
  status: "CANCELLED",
  created_at: "2023-11-21T09:18:22.248Z",
  updated_at: "2023-11-21T09:18:22.248Z",
  charge_id: "chg_TS04A3120231217Yj6b2111435",
  merchant_id: "",
  order_id: null,
  amount: 10,
  currency: "AED",
  customer_id: "test@test.com",
  reason: "Cancelled",
};

const mockWebhookSuccessRes = {
  id: 160,
  status: "CAPTURED",
  created_at: "2023-11-21T08:57:24.201Z",
  updated_at: "2023-11-21T08:57:24.201Z",
  charge_id: "chg_TS05A4820231156a6NH2111596",
  merchant_id: "",
  order_id: "ord_hgiu5923856UAjA21MW10O140",
  amount: 10,
  currency: "AED",
  customer_id: "test@test.com",
  reason: "Captured",
  meta: {
    message: 'Congratulations, Your Order is placed, 25 Loyalty points on the way.'
}
};

const mockWebURlData = {
  WebUrl:
    "https://checkout.beta.tap.company/?mode=page&themeMode=&language=en&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NWM3NTgxN2ExYTUwNWJhNTg5YjEwNiJ9.PzbXWH779E2Y4yCi58gi6EWV2TSiPMC5PDkZcNoyJVg",
};

const navigationHandleData = {
  target: 607,
  url: `${myURL}?tap_id=chg_TS06A1120231225Hp6c2111971&data=1DC73C94A387809A680DBC3906BEE3A63958EDB74EABE627FFB46961B4C4CE937E7F752D799D7498E2D953F132882C2FB0AFABD69C28B78D7494F6251E61E1E324552904EE6FF65A3D717BF4E11ED1FBE33AF5214154E6365176AC8F078779B29D5B6FD2AE831DC093BE0CA656E5317117CCD042D122DA1B8973AD5F7040E6492F088BDC7E846992678D1AF566C7BE7E4BD019814D93E4FBB082327B2E0517A640C0B105C71C77247ABB0A95031514A8587404469A01956A6A8B488883601B532D6B429DCBCFC2AF80B4BEEC1DD4182F2ACC96DE42DF755694F395F3D5AF79D892CF3100FA697F0A`,
  title: "Tap Payments",
  canGoBack: true,
  loading: false,
  canGoForward: false,
  navigationType: "other",
};

const currencyList: ICurrencyList[] = [
  {
    currency: "AED",
    code: "AED",
  },
];

const mockChargeResponse = {
  id: "chg_TS06A5120230851j9XP1611994",
  object: "charge",
  live_mode: false,
  customer_initiated: true,
  api_version: "V2",
  method: "CREATE",
  status: "INITIATED",
  amount: 10,
  currency: "AED",
  threeDSecure: true,
  card_threeDSecure: false,
  save_card: false,
  product: "GOSELL",
  order: {},
  transaction: {
    timezone: "UTC+03:00",
    created: "1700124712009",
    url: "https://checkout.beta.tap.company/?mode=page&themeMode=&language=en&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NTVhZGY4N2ExYTUwNWJhNTg4ZGExNiJ9.2KbctjCeunzlPDbxNKOmilL4Nk68Ml4g7ad8LA5VOX0",
    expiry: {
      period: 30,
      type: "MINUTE",
    },
    asynchronous: false,
    amount: 10,
    currency: "AED",
  },
  reference: {
    transaction: "txn_01",
    order: "ord_01",
  },
  response: {
    code: "100",
    message: "Initiated",
  },
  receipt: {
    email: true,
    sms: true,
  },
  customer: {
    first_name: "test",
    last_name: "test",
    email: "test@test.com",
    phone: {
      country_code: "965",
      number: "51234567",
    },
  },
  merchant: {
    id: "26456997",
  },
  source: {
    object: "source",
    id: "src_card",
    on_file: false,
  },
  redirect: {
    status: "PENDING",
    url: "https://www.google.co.in/",
  },
  post: {
    status: "PENDING",
    url: "https://a61f-20-244-58-182.ngrok-free.app/bx_block_tappaymentsintegration/tappayment_checkout/tappayment_webhook",
  },
  activities: [
    {
      id: "activity_TS01A5220230851Dq951611900",
      object: "activity",
      created: 1700124712009,
      status: "INITIATED",
      currency: "AED",
      amount: 10,
      remarks: "charge - created",
    },
  ],
  auto_reversed: false,
  meta: {
    message: "Congratulations, Your Order is placed, 25 Loyalty points on the way."
}
};

const mockWebhookResponse = {
  success: false,
  reason: "retry",
};

const mockSuccessWebhookResponse = {
  id: "chg_TS02A3320231333Mq251611120",
};

const mockResponseUrl =
  "https://localhost:3000/TappaymentsIntegration?tap_id=chg_TS02A3320231333Mq251611120&data=1DC73C94A387809A680DBC3906BEE3A68856D1A90D5CE1238F9CA7396BB6CB7E443BC8F22BBEBF82BBE301E6EB597CD7B0AFABD69C28B78D517633B9B6C9D305FF5FD9E93DDB1A6AA1E7E2A702A58637C80F301EE58DF5BC9048B094A38AFB1AF8DE9B197956355338100D8D31D132F58D4ADF2EA2D170DC9A48E52A6AC9E2AD96220793A801EDBDFCB3778A94C1D0D8B54A5BD8065115B278755AEF1B774B9C3A5E95FCA8C996F3B723742E80C8FFAFE7B95BCDC6AF9C001BDECE3B738142E4150DF48481D6854C58271B87755CF54827BA6C72AF40B635226CBEADA5EB04F0C250C566BE739B3E";

const mockOrderResponse = {
  data: {
    id: "589",
    type: "order_seller",
    attributes: {
      order_number: "OD00000499",
      account: "Arnab Fash",
      order_item_count: 1,
      sub_total: "30.0",
      total: "94.4",
      status: "confirmed",
      placed_at: "2024-06-27T12:27:29.711Z",
      confirmed_at: "2024-06-27T12:28:01.272Z",
      in_transit_at: null,
      delivered_at: null,
      process_at: null,
      shipped_at: null,
      return_at: null,
      return_cancel_at: null,
      return_pick_at: null,
      cancelled_at: null,
      cancellation_reason: null,
      rejected_at: null,
      refunded_at: null,
      returned_at: null,
      deliver_by: null,
      order_status_id: 2,
      created_at: "2024-06-27T12:11:38.596Z",
      updated_at: "2024-06-27T12:28:01.281Z",
      order_deliver_date: null,
      order_deliver_time: null,
      delivery_addresses: {
        id: "259",
        type: "delivery_address",
        attributes: {
          name: "huhvv",
          country_code: "+965",
          phone_number: "22779660",
          contact_number: "+96522779660",
          street: "India Colony, Ahmedabad, Gujarat 380038, India",
          zip_code: "470475",
          area: "h",
          block: "h",
          city: "gyb",
          house_or_building_number: "g",
          address_name: "fghb",
          is_default: true,
          latitude: 33.755787,
          longitude: -116.359998,
        },
      },
      order_return_date: null,
      order_return_time: null,
      order_items: [
        {
          id: "890",
          type: "order_item_seller",
          attributes: {
            status: "confirmed",
            placed_at: "2024-06-27T12:27:29.840Z",
            confirmed_at: "2024-06-27T12:28:00.970Z",
            in_transit_at: null,
            delivered_at: null,
            cancelled_at: null,
            rejected_at: null,
            process_at: null,
            shipped_at: null,
            return_at: null,
            return_cancel_at: null,
            return_pick_at: null,
            quantity: 1,
            unit_price: "30.0",
            total_price: "30.0",
            reason_of_rejection: null,
            catalogue_name: "Wrinkle Resistant Formal Shirt",
            brand_name: "Hancock",
            catalogue_variant_color: "Black",
            catalogue_variant_sku: "HCS001",
            store_name: "Ambani Store",
            catalogue_variant_size: "Medium",
            catalogue_variant_front_image:
              "https://example.com/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWNIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--376576d361e9eef86819d0904f1e7ccedfa7b9f9/profile.jpg",
            catalogue_variant_back_image:
              "https://example.com/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWdIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b75f197efdcf6dbb2e7501112dab6eb5e418280c/profile.jpg",
            catalogue_variant_side_image: "",
            driver_name: null,
            driver_latitude: null,
            driver_longitude: null,
            driver_phone_number: null,
            otp: null,
          },
        },
      ],
      payment_detail: {
        id: 18,
        status: "CAPTURED",
        created_at: "2024-06-27T12:27:29.703Z",
        updated_at: "2024-06-27T12:29:19.798Z",
        charge_id: "chg_TS01A2220241526Db032706926",
        merchant_id: null,
        order_id: "OD00000499",
        amount: 94,
        currency: "KWD",
        customer_id: "cus_TS06A3420241333u6Z31505392",
        reason: "",
        account_id: 685,
        order_management_order_id: 589,
        refund_id: null,
        refund_amount: null,
        refund_reason: null,
        seller_order_id: null,
        last_four_card_digit: "0008",
        payment_type: "MASTERCARD",
        deleted: true,
      },
      buyer_latitude: null,
      buyer_longitude: null,
    },
  },
};

export {
  mockChargeRes,
  mockWebhookRetryRes,
  mockWebhookSuccessRes,
  mockWebhookRetry1Res,
  mockWebhookRetry2Res,
  mockWebhookCancelledRes,
  mockWebURlData,
  navigationHandleData,
  currencyList,
  mockChargeResponse,
  mockWebhookResponse,
  mockSuccessWebhookResponse,
  mockResponseUrl,
  mockOrderResponse
};
