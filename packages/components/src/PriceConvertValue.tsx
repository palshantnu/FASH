export default function PriceConvertValue(value: string|null,localCurrency:string){
    if (value === null) {
      return localCurrency+"0";
    } else {
      return localCurrency+value;
    }
}