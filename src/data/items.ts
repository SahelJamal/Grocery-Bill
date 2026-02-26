export interface GroceryItem {
  id: string;
  name: string;
  pricePerKg: number;
  category: string;
  image?: string; // Optional emoji or placeholder
}

export const GROCERY_ITEMS: GroceryItem[] = [
  { id: '5', name: 'Apples', pricePerKg: 180, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80' },
  { id: '6', name: 'Bananas', pricePerKg: 60, category: 'Fruits', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=400&q=80' },
  { id: '7', name: 'Oranges', pricePerKg: 100, category: 'Fruits', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80' },
  { id: '8', name: 'Rice (Basmati)', pricePerKg: 120, category: 'Grains', image: 'https://images.unsplash.com/photo-1591814448971-4881024836df?auto=format&fit=crop&w=400&q=80' },
  { id: '9', name: 'Wheat Flour', pricePerKg: 45, category: 'Grains', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
  { id: '10', name: 'Sugar', pricePerKg: 42, category: 'Pantry', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80' },
  { id: '12', name: 'Milk', pricePerKg: 70, category: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-125581cc258b?auto=format&fit=crop&w=400&q=80' },
  { id: '13', name: 'Sona Masoori Rice', pricePerKg: 60, category: 'Grains', image: 'https://images.unsplash.com/photo-1591814448971-4881024836df?auto=format&fit=crop&w=400&q=80' },
  { id: '14', name: 'Brown Rice', pricePerKg: 90, category: 'Grains', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80' },
  { id: '15', name: 'Poha (Flattened Rice)', pricePerKg: 50, category: 'Grains', image: 'https://images.unsplash.com/photo-1599307734110-388212553bc1?auto=format&fit=crop&w=400&q=80' },
  { id: '16', name: 'Besan (Gram Flour)', pricePerKg: 85, category: 'Grains', image: 'https://images.unsplash.com/photo-1594913366159-1832ffdf8e71?auto=format&fit=crop&w=400&q=80' },
  { id: '17', name: 'Maida (All Purpose Flour)', pricePerKg: 40, category: 'Grains', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
  { id: '18', name: 'Sooji / Rava (Semolina)', pricePerKg: 45, category: 'Grains', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80' },
  { id: '19', name: 'Bajra (Pearl Millet)', pricePerKg: 35, category: 'Grains', image: 'https://images.unsplash.com/photo-1596450543967-556e3c39dfcc?auto=format&fit=crop&w=400&q=80' },
  { id: '20', name: 'Jowar (Sorghum)', pricePerKg: 40, category: 'Grains', image: 'https://images.unsplash.com/photo-1596450543967-556e3c39dfcc?auto=format&fit=crop&w=400&q=80' },
  { id: '21', name: 'Ragi (Finger Millet)', pricePerKg: 45, category: 'Grains', image: 'https://images.unsplash.com/photo-1596450543967-556e3c39dfcc?auto=format&fit=crop&w=400&q=80' },
  { id: '22', name: 'Corn Flour', pricePerKg: 50, category: 'Grains', image: 'https://images.unsplash.com/photo-1594913366159-1832ffdf8e71?auto=format&fit=crop&w=400&q=80' },
  { id: '23', name: 'Sabudana (Tapioca Pearls)', pricePerKg: 80, category: 'Grains', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80' },
  { id: '24', name: 'Toor Dal / Arhar Dal', pricePerKg: 160, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '25', name: 'Moong Dal (Green Gram)', pricePerKg: 140, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '26', name: 'Masoor Dal (Red Lentil)', pricePerKg: 110, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '27', name: 'Urad Dal (Black Gram)', pricePerKg: 150, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '28', name: 'Chana Dal (Bengal Gram)', pricePerKg: 100, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '29', name: 'Rajma (Kidney Beans)', pricePerKg: 180, category: 'Grains', image: 'https://images.unsplash.com/photo-1551462147-37885acc3c41?auto=format&fit=crop&w=400&q=80' },
  { id: '30', name: 'Lobia (Black-eyed Peas)', pricePerKg: 120, category: 'Grains', image: 'https://images.unsplash.com/photo-1551462147-37885acc3c41?auto=format&fit=crop&w=400&q=80' },
  { id: '31', name: 'Moth Beans / Matki', pricePerKg: 130, category: 'Grains', image: 'https://images.unsplash.com/photo-1551462147-37885acc3c41?auto=format&fit=crop&w=400&q=80' },
  { id: '32', name: 'Kulthi Dal (Horse Gram)', pricePerKg: 90, category: 'Grains', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=400&q=80' },
  { id: '33', name: 'Safed Matar (White Peas)', pricePerKg: 85, category: 'Grains', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80' },
  { id: '34', name: 'Kabuli Chana (Chickpeas)', pricePerKg: 170, category: 'Grains', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80' },
  { id: '35', name: 'Kala Chana (Black Chickpeas)', pricePerKg: 110, category: 'Grains', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80' },
];
