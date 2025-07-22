export default function FlatListRowManage(languageSetCheck:string){
    if(languageSetCheck === 'ar')
    {
      return "rtl";
    }else{
      return "ltr";
    }
  }