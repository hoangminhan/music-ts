export const formatter = Intl.NumberFormat("en", { notation: "compact" });
// to B || M 
export const handleFormatNumber  = (number:number):string=>{
  return formatter.format(number)
}