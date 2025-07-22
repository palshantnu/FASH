export default function LowerCaseReplace(planName:string){
    return planName.toString().toLowerCase().replace(/ /g, "_");
}