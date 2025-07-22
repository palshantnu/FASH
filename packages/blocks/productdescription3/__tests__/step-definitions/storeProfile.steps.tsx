import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { Listener } from "../../../catalogue/__mock__/eventlistener"
import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import StoreProfile from "../../src/StoreProfile";
import { filter } from "../../../categoriessubcategories/src/assets";

const navigation = require("react-navigation");
const listener = new Listener();
const screenProps = {
    navigation: {
        addListener: listener.addEventListener,
        navigate: jest.fn(),
        goBack: jest.fn(),
        pop: jest.fn(),
        state: {
            params: {
                item: {
                    token :'dasndbhkb3b43q4jb3jb5'
                }
            }
        }
    },
    id: "storeProfile"
};

const catalogArray = {
        "data": [
            {
                "id": "306",
                "type": "catalogue_listing",
                "attributes": {
                    "name": "Mens shirt ",
                    "description": "None\n",
                    "catalogue_variants": [
                        {
                            "id": "475",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 475,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.018Z",
                                "updated_at": "2024-07-16T07:16:48.039Z",
                                "sku": "ksh",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTBPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c76e120297e6cb1c4ec68abd2c1a69c5197241b3/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTRPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--294cd963fa67295e48a4f6b561305b28f8bebf6a/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "476",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 476,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.040Z",
                                "updated_at": "2024-07-16T07:16:48.060Z",
                                "sku": "jddj",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaThPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bb1561ed2f5d92a7a0310a60f9b2428e16d0d134/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakFPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf067e9715ebd61279dd37ac8ceee1a2cdc93ddc/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "477",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 477,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.061Z",
                                "updated_at": "2024-07-16T07:16:48.078Z",
                                "sku": "dbdb",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakVPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--33567658f669ff94e1694fbbcad53c48a9d9fe8d/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaklPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--346577577f0dab7627b222be93f809e52ea5d49b/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "478",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 478,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.078Z",
                                "updated_at": "2024-07-16T07:16:48.097Z",
                                "sku": "bdsn",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b9002202943d4b71345a7db04a77895c85eac39a/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBalFPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e8994d1cc6fda64b24afc977cd66e986de24ca60/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "479",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 479,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.098Z",
                                "updated_at": "2024-07-16T07:16:48.115Z",
                                "sku": "bxsj",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBalVPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fdb3ecff10046f7f76141d643b1f45fe743c2d90/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBallPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce80a9655a8596d2c607b98072bf539512c7db65/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "480",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 480,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.115Z",
                                "updated_at": "2024-07-16T07:16:48.131Z",
                                "sku": "dbdbe",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40b4a6105051c145ca4edb3bc770dcdec336b436/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamdPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7ddde49b965bf8a648dc00f833ce94ef0b9d94ef/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "481",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 481,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.131Z",
                                "updated_at": "2024-07-16T07:16:48.153Z",
                                "sku": "xbdb",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamtPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c68f0e3961138ea755d5328cd854364afc2ddd98/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBam9PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6976e2daa460ea036dfb4ac3d5e47a77abf55e60/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "482",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 482,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.154Z",
                                "updated_at": "2024-07-16T07:16:48.170Z",
                                "sku": "dbd",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d0c4734e0d8e8a7f978fcfeecce1fe7f4b9f14ce/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBandPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9962335b3825aa1c48e121aef182aac037abb047/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "474",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 474,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 1,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:47.998Z",
                                "updated_at": "2024-07-16T09:25:02.426Z",
                                "sku": "KSU",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b73b057af2a4646eb4745ffdce79aba006e3ee43/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXdPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f80dd8ec36ed58175ee3a66b697d1de7cd547a20/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        }
                    ],
                    "primary_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTBPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c76e120297e6cb1c4ec68abd2c1a69c5197241b3/profile.jpg",
                    "primary_price": "35.0",
                    "is_wishlist": false,
                    "primary_discounted_percentage":"0"
                }
            },
            {
                "id": "306",
                "type": "catalogue_listing",
                "attributes": {
                    "name": "Mens shirt ",
                    "description": "None\n",
                    "catalogue_variants": [
                        {
                            "id": "475",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 475,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.018Z",
                                "updated_at": "2024-07-16T07:16:48.039Z",
                                "sku": "ksh",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTBPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c76e120297e6cb1c4ec68abd2c1a69c5197241b3/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTRPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--294cd963fa67295e48a4f6b561305b28f8bebf6a/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "476",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 476,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.040Z",
                                "updated_at": "2024-07-16T07:16:48.060Z",
                                "sku": "jddj",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaThPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bb1561ed2f5d92a7a0310a60f9b2428e16d0d134/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakFPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf067e9715ebd61279dd37ac8ceee1a2cdc93ddc/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "477",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 477,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.061Z",
                                "updated_at": "2024-07-16T07:16:48.078Z",
                                "sku": "dbdb",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakVPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--33567658f669ff94e1694fbbcad53c48a9d9fe8d/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaklPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--346577577f0dab7627b222be93f809e52ea5d49b/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "478",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 478,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.078Z",
                                "updated_at": "2024-07-16T07:16:48.097Z",
                                "sku": "bdsn",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b9002202943d4b71345a7db04a77895c85eac39a/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBalFPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e8994d1cc6fda64b24afc977cd66e986de24ca60/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "479",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 479,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 11,
                                "catalogue_variant_size": {
                                    "id": 11,
                                    "name": "XL",
                                    "created_at": "2024-03-29T11:17:59.975Z",
                                    "updated_at": "2024-03-29T11:17:59.975Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.098Z",
                                "updated_at": "2024-07-16T07:16:48.115Z",
                                "sku": "bxsj",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBalVPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fdb3ecff10046f7f76141d643b1f45fe743c2d90/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBallPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce80a9655a8596d2c607b98072bf539512c7db65/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "480",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 480,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.115Z",
                                "updated_at": "2024-07-16T07:16:48.131Z",
                                "sku": "dbdbe",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40b4a6105051c145ca4edb3bc770dcdec336b436/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamdPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7ddde49b965bf8a648dc00f833ce94ef0b9d94ef/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "481",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 481,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 12,
                                "catalogue_variant_color": {
                                    "id": 12,
                                    "name": "Black",
                                    "created_at": "2024-03-06T06:42:44.507Z",
                                    "updated_at": "2024-03-06T06:42:44.507Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.131Z",
                                "updated_at": "2024-07-16T07:16:48.153Z",
                                "sku": "xbdb",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamtPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c68f0e3961138ea755d5328cd854364afc2ddd98/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBam9PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6976e2daa460ea036dfb4ac3d5e47a77abf55e60/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "482",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 482,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 13,
                                "catalogue_variant_color": {
                                    "id": 13,
                                    "name": "Maroon",
                                    "created_at": "2024-03-27T09:19:36.201Z",
                                    "updated_at": "2024-03-27T09:19:36.201Z"
                                },
                                "catalogue_variant_size_id": 6,
                                "catalogue_variant_size": {
                                    "id": 6,
                                    "name": "M",
                                    "created_at": "2023-10-06T04:45:41.059Z",
                                    "updated_at": "2024-04-24T09:26:43.720Z"
                                },
                                "price": "35.0",
                                "stock_qty": 2,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:48.154Z",
                                "updated_at": "2024-07-16T07:16:48.170Z",
                                "sku": "dbd",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d0c4734e0d8e8a7f978fcfeecce1fe7f4b9f14ce/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBandPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9962335b3825aa1c48e121aef182aac037abb047/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        },
                        {
                            "id": "474",
                            "type": "catalogue_variant",
                            "attributes": {
                                "id": 474,
                                "catalogue_id": 306,
                                "catalogue_variant_color_id": 10,
                                "catalogue_variant_color": {
                                    "id": 10,
                                    "name": "Whiteee",
                                    "created_at": "2023-10-05T05:20:08.849Z",
                                    "updated_at": "2023-10-05T05:20:08.849Z"
                                },
                                "catalogue_variant_size_id": 10,
                                "catalogue_variant_size": {
                                    "id": 10,
                                    "name": "L",
                                    "created_at": "2024-03-29T11:16:18.686Z",
                                    "updated_at": "2024-03-29T11:16:18.686Z"
                                },
                                "price": "35.0",
                                "stock_qty": 1,
                                "on_sale": null,
                                "sale_price": null,
                                "discount_price": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "created_at": "2024-07-16T07:16:47.998Z",
                                "updated_at": "2024-07-16T09:25:02.426Z",
                                "sku": "KSU",
                                "deactivate": false,
                                "low_stock_threshold": 0,
                                "is_listed": true,
                                "front_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b73b057af2a4646eb4745ffdce79aba006e3ee43/profile.jpg",
                                "back_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXdPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f80dd8ec36ed58175ee3a66b697d1de7cd547a20/profile.jpg",
                                "side_image": "",
                                "pair_it_with": []
                            }
                        }
                    ],
                    "primary_image": "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTBPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c76e120297e6cb1c4ec68abd2c1a69c5197241b3/profile.jpg",
                    "primary_price": null,
                    "is_wishlist": false,
                }
            }
        ],
        "meta": {
            "total_pages": 1,
            "current_page": 1,
            "total_record": 1,
            "prev_page": null,
            "next_page": null
        }
}

const unitTest = {
    data: [
      {
        id: "4",
        type: "category",
        attributes: {
          id: 4,
          name: "category_3",
          created_at: "2020-10-07T06:56:28.270Z",
          updated_at: "2020-10-07T06:56:28.270Z",
          sub_categories: [
            {
              id: 4,
              name: "sub_category_1",
              created_at: "2020-10-07T06:57:11.436Z",
              updated_at: "2020-10-07T06:57:11.436Z"
            }
          ]
        }
      }
    ]
  }

const feature = loadFeature("./__tests__/features/storeprofile-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to storeprofile", ({ given, when, then }) => {
        let storeprofileWrapper: ShallowWrapper;
        let instancestoreprofile: StoreProfile;

        given("I am a User loading storeprofile", () => {
            storeprofileWrapper = shallow(<StoreProfile {...screenProps} />);
            instancestoreprofile = storeprofileWrapper.instance() as StoreProfile;
        });

        when('I navigate to the storeprofile Screen', () => {
            listener.simulateListener("willFocus");
            instancestoreprofile.callAfterGettingFilters(
                {
                    sizes: [1, 2],
                    colors: [1, 2],
                    stores: [1, 2],
                    minPrice: '10',
                    maxPrice: '100',
                    sort: 'price_asc',
                    categories: ['Cat1', 'Cat2'],
                    subCategory: ['SubCat1', 'SubCat2'],
                  }
            )
            instancestoreprofile = storeprofileWrapper.instance() as StoreProfile
            instancestoreprofile.setState({isloading :true})
        });

        then('I can load token with out errors', () => {
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );
        });

        then("I can get navigation payload with out errors", () => {
            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.storeIDMessage), "1");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
          
        });

        then('I can press a navigate to back screen', () => {
            let backButton = storeprofileWrapper.findWhere((node) => node.prop('testID') === 'goBckID');
            backButton.simulate('press');
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then('I can press a navigate to store description screen', () => {
            let storeDescription = storeprofileWrapper.findWhere((node) => node.prop('testID') === 'storeInfoBtnID');
            storeDescription.simulate('press',);
            expect(storeprofileWrapper).toBeTruthy();
        });

        then("I can load store api with out errors", () => {

            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                "data": [
                    {
                        "failed_login": "Data send"
                    }
                ]
            });
      
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
            instancestoreprofile.getShopListApiCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
            expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
            ); 
        }) 

        then("I can call store catalogue api with out errors", () => {

            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),catalogArray);
      
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
            instancestoreprofile.getcatalogListApiCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
            expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
            ); 
            instancestoreprofile.getcatalogList('', null);
            instancestoreprofile.getcatalogList('123', null);
            instancestoreprofile.getcatalogList('', "idjwij");
            instancestoreprofile.getcatalogList('jdwn', "dwjjdwni");
        }) 

        then('I can render catalogue flatlist with out errors',async()=>{
            const flatlist = storeprofileWrapper.findWhere(
                (node)=>node.prop("testID") === "productListId"
            )
            const item = catalogArray.data[0]
            let renderData = flatlist.renderProp("renderItem")({item:item,index:0})
            flatlist.renderProp("keyExtractor")({})
            expect(flatlist.exists()).toBe(true)

            let buttonComponent = renderData.findWhere(
                (node) => node.prop("testID") === "productListBtn"
              );
            buttonComponent.simulate("press");

            let buttonComponentWhislist = renderData.findWhere(
                (node) => node.prop("testID") === "productwishBtnID"
              );
            buttonComponentWhislist.simulate("press");
            expect(buttonComponentWhislist.exists()).toBe(true);
        })

        then("I am trying to catalogue search with out errors", () => {
            let textInputComponent = storeprofileWrapper.findWhere(
              (node) => node.prop("testID") === "searchTextID"
            );
            textInputComponent.simulate("changeText", "Product");
            textInputComponent.simulate("submitEditing");
            expect(textInputComponent.exists()).toBe(true);
        });

    });

    test("User navigates to storeprofile with out token", ({ given, when, then }) => {
        let storeprofileWrapper: ShallowWrapper;
        let instancestoreprofile: StoreProfile;

        given("I am a User loading storeprofile with out token", () => {
            storeprofileWrapper = shallow(<StoreProfile {...screenProps} />);
            instancestoreprofile = storeprofileWrapper.instance() as StoreProfile;
        });

        when('I navigate to the storeprofile Screen with out token', () => {
            instancestoreprofile = storeprofileWrapper.instance() as StoreProfile
            instancestoreprofile.setState({isloading :true})
        });

        then('I can load token empty with out errors', () => {
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "");
            runEngine.sendMessage("Unit Test", tokenMsg);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );
        });

        then("I can call store catalogue api with out errors", () => {

            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),catalogArray);
      
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
            instancestoreprofile.getcatalogListApiCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
            expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
            ); 
        }) 

        then('I can render catalogue flatlist with out errors',async()=>{
            const flatlist = storeprofileWrapper.findWhere(
                (node)=>node.prop("testID") === "productListId"
            )
            const item = catalogArray.data[1]
            let renderData = flatlist.renderProp("renderItem")({item:item,index:0})
            flatlist.renderProp("keyExtractor")({})
            expect(flatlist.exists()).toBe(true)

            let buttonComponent = renderData.findWhere(
                (node) => node.prop("testID") === "productListBtn"
              );
            buttonComponent.simulate("press");

            let buttonComponentWhislist = renderData.findWhere(
                (node) => node.prop("testID") === "productwishBtnID"
              );
            buttonComponentWhislist.simulate("press");
        })

        then("I am trying to catalogue search with out errors", () => {
            instancestoreprofile.addWishlistItem(1)
            instancestoreprofile.navigateToSignIn()
            let textInputComponent = storeprofileWrapper.findWhere(
              (node) => node.prop("testID") === "searchTextID"
            );
            textInputComponent.simulate("changeText", "");
            textInputComponent.simulate("submitEditing");
        });

        then("I can call store catalogue api with errors", () => {

            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),{
                'message':'Invalid Token'
            });
      
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
            instancestoreprofile.getcatalogListApiCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
            expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
            ); 
        }) 

        then("I can get navigation payload undefined", () => {
            instancestoreprofile.setState({localLanguage:'en'});
            instancestoreprofile.getshopdetailRequest()
            instancestoreprofile.componentWillUnmount();
            instancestoreprofile.capitalizeFirstLetter('Product')
            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.productIDMessage), "1");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
          
        });

    });
});
