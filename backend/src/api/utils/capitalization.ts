export const toCapitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const CheckState=(userState:string, schemeState:string):boolean=>{
   return userState===schemeState;
}