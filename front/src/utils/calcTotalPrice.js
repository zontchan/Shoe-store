export const calcTotalPrice = (items) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.amount + sum;
    }, 0);
}