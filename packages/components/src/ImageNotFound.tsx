// Customizable Area Start
import {placeholderImage} from '../../blocks/categoriessubcategories/src/assets';
// Customizable Area End

export default function ImageNotFound(image:any){
    // Customizable Area Start
    if(image == null || image == '')
    {
      return placeholderImage;
    }else{
      return {uri:image};
    }
    // Customizable Area End
}

// Customizable Area Start
// Customizable Area End