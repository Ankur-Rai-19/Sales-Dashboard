const BASE_URL = 'https://fakestoreapi.com';

export const fetchTodaySales = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch today\'s sales data');
  const products = await response.json();

  // Simulate sales data for today
  const categories = products.reduce((acc, product) => {
    const category = product.category;
    const existing = acc.find(c => c.category === category);
    if (existing) {
      existing.salesAmount += product.price;
    } else {
      acc.push({ category, salesAmount: product.price });
    }
    return acc;
  }, []);

  return {
    products: products.map(p => ({
      name: p.title,
      category: p.category,
      quantitySold: Math.floor(Math.random() * 10) + 1,
      salesAmount: p.price
    })),
    categories
  };
};

export const fetchSalesComparison = async (date1, date2) => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch sales comparison data');
  const products = await response.json();

  // Simulate sales data for two dates
  const categories = products.reduce((acc, product) => {
    const category = product.category;
    const existing = acc.find(c => c.category === category);
    if (existing) {
      existing.date1Sales += product.price;
      existing.date2Sales += product.price * (Math.random() + 0.5);
    } else {
      acc.push({
        category,
        date1Sales: product.price,
        date2Sales: product.price * (Math.random() + 0.5)
      });
    }
    return acc;
  }, []);

  return {
    products: products.map(p => ({
      name: p.title,
      category: p.category,
      date1Sales: p.price,
      date2Sales: p.price * (Math.random() + 0.5),
    })),
    categories
  };
};
