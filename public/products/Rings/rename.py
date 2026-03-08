import random

# הגדרות בסיס
base_path = r"C:\Users\eli7p\Desktop\Images\Ring"
category_id = 100
num_products = 11

# יצירת משפטי ה-SQL
sql_statements = []

for i in range(1, num_products + 1):
    # יצירת שמות הקבצים והנתיבים
    img_url = f"{base_path}\\Ring{i}_a.webp"
    img_url2 = f"{base_path}\\Ring{i}_b.webp"
    
    # שם המוצר
    product_name = f"Ring{i}"
    
    # הגדרת צבע (זהב ל-10 ו-11, כסף לכל השאר)
    color = "זהב" if i >= 10 else "כסף"
    
    # מחיר רנדומלי
    price = random.randint(150, 400)
    
    # בניית השאילתה (ללא ProductsID כי הוא מתמספר לבד)
    sql = (
        f"INSERT INTO Products (CategoryID, ProductsName, ProductsDescreption, Price, ImgUrl, ImgUrl2, Color, Material, Quantity, IsActive) "
        f"VALUES ({category_id}, '{product_name}', 'תיאור עבור {product_name}', {price}, '{img_url}', '{img_url2}', '{color}', 'מתכת', 10, 1) ;"
    )
    sql_statements.append(sql)

# כתיבה לקובץ SQL
output_file = "insert_products.sql"
with open(output_file, "w", encoding="utf-8") as f:
    for statement in sql_statements:
        f.write(statement + "\n")

print(f"הקובץ {output_file} נוצר בהצלחה עם {num_products} מוצרים.")