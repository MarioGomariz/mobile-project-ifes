import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart, Product } from '../../context/CartContext';

// Productos de ejemplo
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Tomate, mozzarella y albahaca fresca',
    price: 12000,
    emoji: '🍕',
    category: 'Pizza',
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    description: 'Pepperoni, mozzarella y salsa de tomate',
    price: 14000,
    emoji: '🍕',
    category: 'Pizza',
  },
  {
    id: '3',
    name: 'Hamburguesa Clásica',
    description: 'Carne, lechuga, tomate, cebolla y queso',
    price: 10000,
    emoji: '🍔',
    category: 'Hamburguesa',
  },
  {
    id: '4',
    name: 'Hamburguesa BBQ',
    description: 'Carne, bacon, cebolla caramelizada y salsa BBQ',
    price: 12000,
    emoji: '🍔',
    category: 'Hamburguesa',
  },
  {
    id: '5',
    name: 'Sushi Roll California',
    description: 'Cangrejo, aguacate, pepino y sésamo',
    price: 15000,
    emoji: '🍣',
    category: 'Sushi',
  },
  {
    id: '6',
    name: 'Sushi Roll Spicy Tuna',
    description: 'Atún picante, aguacate y mayonesa',
    price: 16000,
    emoji: '🍣',
    category: 'Sushi',
  },
  {
    id: '7',
    name: 'Ensalada César',
    description: 'Lechuga romana, pollo, crutones y parmesano',
    price: 9000,
    emoji: '🥗',
    category: 'Ensalada',
  },
  {
    id: '8',
    name: 'Ensalada Griega',
    description: 'Tomate, pepino, aceitunas, queso feta',
    price: 8000,
    emoji: '🥗',
    category: 'Ensalada',
  },
];

export default function Products() {
  const router = useRouter();
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    setSelectedCategory(id as string);
  }, [id]);

  const categories = ['Todos', 'Pizza', 'Hamburguesa', 'Sushi', 'Ensalada'];

  const filteredProducts = selectedCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    Alert.alert('¡Agregado!', `${product.name} agregado al carrito`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Productos</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.cartButtonText}>
            🛒 {getTotalItems() > 0 ? `(${getTotalItems()})` : '0'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productEmoji}>{product.emoji}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(product)}
              >
                <Text style={styles.addButtonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoriesScroll: {
    maxHeight: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#FF6B6B',
  },
  categoryChipText: {
    color: '#666',
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
    minHeight: 36,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
