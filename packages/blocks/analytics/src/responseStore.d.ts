export interface ResponseStore {
    id: string;
    attributes: Attributes;
  }
  
  export interface Attributes {
    store_name: string;
    image: string|null;
  }

  export interface SalesRevenueGraphData
  {
    total_revenue:object
  }
  export interface SalesRevenueData {
    filter_range: string;
    average_order_value: string;
    average_unit_price:string;
    sales_volume: string;
    max_value:string;
    graph_data:SalesRevenueGraphData;
    sold_units: number;
    returned_units: number;
    price: string;
    image_url: string | null;
    name: string;
  }

  interface SalesVolumeProductProps {
    name: string;
    sold_units: number;
    returned_units: number;
    price: string;
    image_url: string | null;
  }

  export interface SalesVolumeData {
    filter_range: string;
    total_sold_units: number;
    sold_units: number;
    returned_units: number;
    products:SalesVolumeProductProps;
  }
  