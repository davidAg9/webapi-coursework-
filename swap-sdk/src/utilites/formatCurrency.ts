const formatter = Intl.NumberFormat("en", {notation: "compact", style:"currency",currency:"GHS"})



export function formatCurrency(num:number) : string {
    

    return formatter.format(num);
}