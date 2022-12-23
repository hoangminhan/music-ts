export const formatter = Intl.NumberFormat("en", { notation: "compact" });
export const handleFormatNumber  = (number:number):string=>{
  return formatter.format(number)
}