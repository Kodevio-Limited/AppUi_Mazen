import { MenuItem } from '@/types/app';

export const menuCategories = [
  { id: 'popular', label: '🔥 Popular', icon: '🔥' },
  { id: 'ramen', label: 'Ramen' },
  { id: 'gyoza', label: 'Gyoza' },
  { id: 'rice', label: 'Rice' },
  { id: 'drinks', label: 'Drinks' },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Shoyu Ramen',
    price: 15.99,
    description:
      'Rich creamy beef bone broth simmered 18 hours, thin noodles, chashu beef belly, soft-boiled egg, black garlic oil, nori.',
    image: '/images/food-ramen.png',
    category: 'ramen',
    isPopular: true,
    options: [
      {
        id: 'noodle',
        label: 'Noodle Texture',
        choices: [
          { id: 'soft', label: 'Soft' },
          { id: 'medium', label: 'Medium' },
          { id: 'firm', label: 'Firm' },
        ],
        selected: 'medium',
      },
      {
        id: 'extras',
        label: 'Add Extras',
        choices: [
          { id: 'egg', label: 'Extra Egg', priceModifier: 1.5 },
          { id: 'chashu', label: 'Extra Chashu', priceModifier: 3.0 },
          { id: 'corn', label: 'Corn', priceModifier: 0.5 },
        ],
        selected: 'egg',
      },
    ],
  },
  {
    id: '2',
    name: 'Tonkotsu Ramen',
    price: 16.99,
    description:
      'Creamy pork bone broth, wavy noodles, chashu pork belly, bamboo shoots, green onions, sesame seeds.',
    image: '/images/food-ramen.png',
    category: 'ramen',
    isPopular: true,
    options: [
      {
        id: 'noodle',
        label: 'Noodle Texture',
        choices: [
          { id: 'soft', label: 'Soft' },
          { id: 'medium', label: 'Medium' },
          { id: 'firm', label: 'Firm' },
        ],
        selected: 'medium',
      },
      {
        id: 'spice',
        label: 'Spice Level',
        choices: [
          { id: 'mild', label: 'Mild' },
          { id: 'medium', label: 'Medium' },
          { id: 'hot', label: 'Hot' },
        ],
        selected: 'mild',
      },
    ],
  },
  {
    id: '3',
    name: 'Pork Gyoza',
    price: 8.99,
    description:
      'Hand-folded dumplings filled with seasoned ground pork and cabbage, pan-fried to golden perfection.',
    image: '/images/food-gyoza.png',
    category: 'gyoza',
    isPopular: true,
    options: [
      {
        id: 'sauce',
        label: 'Dipping Sauce',
        choices: [
          { id: 'soy', label: 'Soy Vinegar' },
          { id: 'spicy', label: 'Spicy Miso' },
          { id: 'ponzu', label: 'Ponzu' },
        ],
        selected: 'soy',
      },
    ],
  },
  {
    id: '4',
    name: 'Veggie Gyoza',
    price: 7.99,
    description:
      'Pan-fried dumplings filled with tofu, mushrooms, and seasonal vegetables. Served with house dipping sauce.',
    image: '/images/food-gyoza.png',
    category: 'gyoza',
    options: [
      {
        id: 'sauce',
        label: 'Dipping Sauce',
        choices: [
          { id: 'soy', label: 'Soy Vinegar' },
          { id: 'ponzu', label: 'Ponzu' },
          { id: 'sesame', label: 'Sesame' },
        ],
        selected: 'soy',
      },
    ],
  },
  {
    id: '5',
    name: 'Chashu Rice Bowl',
    price: 12.99,
    description:
      'Steamed Japanese rice topped with braised chashu pork, soft-boiled egg, pickled ginger, and green onions.',
    image: '/images/food-bowl.png',
    category: 'rice',
    options: [
      {
        id: 'size',
        label: 'Bowl Size',
        choices: [
          { id: 'regular', label: 'Regular' },
          { id: 'large', label: 'Large', priceModifier: 2.0 },
        ],
        selected: 'regular',
      },
    ],
  },
  {
    id: '6',
    name: 'Salmon Sushi Platter',
    price: 19.99,
    description:
      '8-piece salmon sushi with soy sauce, wasabi, and pickled ginger. Made with premium grade salmon.',
    image: '/images/food-sushi.png',
    category: 'popular',
    isPopular: true,
    options: [
      {
        id: 'pieces',
        label: 'Pieces',
        choices: [
          { id: '8', label: '8 pieces' },
          { id: '12', label: '12 pieces', priceModifier: 5.0 },
        ],
        selected: '8',
      },
    ],
  },
  {
    id: '7',
    name: 'Mexican Tacos Platter',
    price: 13.99,
    description:
      'Three corn tortillas with grilled meat, guacamole, pico de gallo, jalapeños, and lime.',
    image: '/images/food-tacos.png',
    category: 'popular',
    isPopular: false,
    options: [
      {
        id: 'protein',
        label: 'Protein',
        choices: [
          { id: 'chicken', label: 'Chicken' },
          { id: 'beef', label: 'Beef' },
          { id: 'veggie', label: 'Veggie' },
        ],
        selected: 'chicken',
      },
    ],
  },
  {
    id: '8',
    name: 'Matcha Latte',
    price: 5.99,
    description: 'Premium Japanese matcha blended with steamed oat milk. Hot or iced.',
    image: '/images/food-bowl.png',
    category: 'drinks',
    options: [
      {
        id: 'temp',
        label: 'Temperature',
        choices: [
          { id: 'hot', label: 'Hot' },
          { id: 'iced', label: 'Iced' },
        ],
        selected: 'hot',
      },
    ],
  },
];

export const ACTIVE_TABLE = 'A08';
export const SERVICE_CHARGE_RATE = 0.1;
export const TIP_OPTIONS = [0, 10, 15, 20] as const;
