// מודל עבור פריט בודד בתוך הזמנה
export interface OrderItem {
  orderItemId: number;
  productsId: number;
  orderId: number;
  quantity: number;
  // הגדלת ראש: אם הוספת בשרת פרטים נוספים ל-DTO כמו שם מוצר או מחיר, הוסיפי אותם גם כאן
}

export interface Order {
  orderId: number;
  orderDate: string; // ב-TS אנחנו מקבלים תאריך כמחרוזת מה-JSON
  orderSum: number;
  userId: number;
  orderStatus: string; // הסטטוסים שלנו: 'Paid', 'Shipped', 'Delivered'
  ordersItems: OrderItem[]; // רשימת הפריטים - שימי לב לשם המדויק כמו בשרת!
}