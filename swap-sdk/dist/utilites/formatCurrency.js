const formatter = Intl.NumberFormat("en", { notation: "compact", style: "currency", currency: "GHS" });
export function formatCurrency(num) {
    return formatter.format(num);
}
//# sourceMappingURL=formatCurrency.js.map