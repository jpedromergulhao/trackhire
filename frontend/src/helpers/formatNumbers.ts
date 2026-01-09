export const formatSalary = (price: number) => {
    return price.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
    });
};