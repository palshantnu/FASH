export default function FlexConditionManage(languageSetCheck:string){
    if(languageSetCheck === 'ar')
    {
      return 'row-reverse';
    }else{
      return 'row';
    }
}