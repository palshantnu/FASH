export default function AlignSelfManage(languageSetCheck:string){
    if(languageSetCheck === 'ar')
    {
      return 'flex-end';
    }else{
      return 'flex-start';
    }
  }