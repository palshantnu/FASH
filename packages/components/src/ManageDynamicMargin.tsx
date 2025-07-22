export default function ManageDynamicMargin(languageSetCheck:string,marginNumberAr:number|undefined,marginNumberEn:number|undefined){
    if(languageSetCheck === 'ar')
    {
      return marginNumberAr;
    }else{
      return marginNumberEn;
    }
}