-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, category, image_url, featured, available) VALUES
-- Pizzas
('Margherita', 'Salsa de tomate clásica, mozzarella fresca, albahaca', 12.99, 'pizza', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', true, true),
('Pepperoni', 'Pepperoni, mozzarella, salsa de tomate', 14.99, 'pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', true, true),
('Vegetariana', 'Verduras variadas, mozzarella, salsa de tomate', 13.99, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', true, true),
('Hawaiana', 'Jamón, piña, mozzarella, salsa de tomate', 15.99, 'pizza', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('BBQ Chicken', 'Pollo a la parrilla, salsa BBQ, cebolla roja, mozzarella', 16.99, 'pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Meat Lovers', 'Pepperoni, salchicha, tocino, jamón, mozzarella', 18.99, 'pizza', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),

-- Aperitivos
('Palitos de Ajo', 'Palitos recién horneados con mantequilla de ajo', 6.99, 'appetizer', 'https://images.unsplash.com/photo-1549775568-bdb5c8b4e2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Bruschetta', 'Pan tostado con tomates, albahaca, glaseado balsámico', 8.99, 'appetizer', 'https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Palitos de Mozzarella', 'Palitos de mozzarella crujientes con salsa marinara', 7.99, 'appetizer', 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Alitas de Pollo', 'Alitas de pollo picantes o suaves con salsa para mojar', 9.99, 'appetizer', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),

-- Ensaladas
('Ensalada César', 'Lechuga romana, crutones, queso parmesano, aderezo César', 8.99, 'salad', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Ensalada Griega', 'Verduras mixtas, tomates, pepinos, aceitunas, queso feta, vinagreta', 9.99, 'salad', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Ensalada Caprese', 'Mozzarella fresca, tomates, albahaca, glaseado balsámico', 10.99, 'salad', 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),

-- Postres
('Tiramisu', 'Postre italiano con sabor a café', 6.99, 'dessert', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Cannoli', 'Cáscaras de pasta crujiente rellenas de queso ricotta dulce', 5.99, 'dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Pastel de Chocolate', 'Rico pastel de chocolate con glaseado de chocolate', 7.99, 'dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),

-- Bebidas
('Refrescos', 'Sabores variados', 2.99, 'drink', 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Té Helado', 'Té helado recién preparado', 2.49, 'drink', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Limonada', 'Limonada refrescante', 2.99, 'drink', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true),
('Agua Embotellada', 'Agua con gas o sin gas', 1.99, 'drink', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', false, true);

-- Insertar testimonios de ejemplo
INSERT INTO testimonials (name, avatar_url, rating, comment, likes, dislikes) VALUES
('María González', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 5, '¡La mejor pizza de la ciudad! El servicio es excelente y la entrega siempre es rápida.', 15, 1),
('Carlos Rodríguez', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 4, 'Me encanta la variedad del menú. La pizza BBQ Chicken es mi favorita.', 12, 0),
('Ana Martínez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 5, 'Ingredientes frescos y sabor auténtico. Definitivamente volveré a ordenar.', 18, 2),
('Luis Fernández', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 4, 'Excelente relación calidad-precio. Las promociones son geniales.', 9, 1),
('Sofia López', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 5, 'Pizza Palace nunca decepciona. La Margherita es perfecta.', 14, 0);
