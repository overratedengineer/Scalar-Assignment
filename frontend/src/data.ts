import { Product } from './context/CartContext';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Apple iPhone 15 Pro Max (Black Titanium, 256 GB)",
    category: "Mobiles",
    price: 159900,
    originalPrice: 159900,
    discount: 0,
    rating: 4.7,
    reviewsCount: 1254,
    images: ["https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/p/1/x/-original-imagtc2qaam3vmyv.jpeg?q=70"],
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.",
    specifications: {
      "Display": "6.7 inch Super Retina XDR Display",
      "Processor": "A17 Pro Chip",
      "Camera": "48MP + 12MP + 12MP | 12MP Front Camera",
      "Battery": "4422 mAh"
    },
    stockStatus: 'In Stock'
  },
  {
    id: "2",
    name: "SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)  (12 GB RAM)",
    category: "Mobiles",
    price: 129999,
    originalPrice: 129999,
    discount: 0,
    rating: 4.8,
    reviewsCount: 521,
    images: ["https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/w/x/-original-imagxdfxckv8x7zh.jpeg?q=70"],
    description: "Welcome to the era of AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.",
    specifications: {
      "Display": "6.8 inch Quad HD+ Display",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP + 50MP + 12MP + 10MP | 12MP Front Camera",
      "Battery": "5000 mAh"
    },
    stockStatus: 'In Stock'
  },
  {
    id: "3",
    name: "SONY WH-1000XM5 Bluetooth Headset",
    category: "Electronics",
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.6,
    reviewsCount: 342,
    images: ["https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/j/t/y/-original-imagg5jyymhqfvwv.jpeg?q=70"],
    description: "Industry-leading Noise Cancelling headphones with exceptional sound quality.",
    specifications: {
      "Type": "Wireless Over-ear",
      "Battery Life": "Up to 30 hours",
      "Noise Cancelling": "Yes"
    },
    stockStatus: 'In Stock'
  },
  {
    id: "4",
    name: "NIKON Z30 Mirrorless Camera Body Only",
    category: "Electronics",
    price: 52490,
    originalPrice: 62490,
    discount: 16,
    rating: 4.5,
    reviewsCount: 189,
    images: ["https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/d/a/j/z30-20-8-mirrorless-z30-nikon-original-imaghby6hmy3fzzj.jpeg?q=70"],
    description: "Compact and lightweight mirrorless vlogging camera.",
    specifications: {
      "Resolution": "20.9 MP",
      "Sensor": "APS-C",
      "Video": "4K at 30 fps"
    },
    stockStatus: 'In Stock'
  },
  {
    id: "5",
    name: "PUMA Running Shoes For Men",
    category: "Fashion",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.2,
    reviewsCount: 8546,
    images: ["https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/p/u/8/-original-imahfztx5mzzhhhm.jpeg?q=70"],
    description: "Comfortable and stylish running shoes for everyday use.",
    specifications: {
      "Color": "Black",
      "Outer Material": "Mesh",
      "Ideal For": "Men"
    },
    stockStatus: 'In Stock'
  },
  {
    id: "6",
    name: "ASUS Vivobook 15 Intel Core i5 12th Gen 1235U",
    category: "Electronics",
    price: 49990,
    originalPrice: 70990,
    discount: 29,
    rating: 4.3,
    reviewsCount: 2314,
    images: ["https://rukminim2.flixcart.com/image/312/312/xif0q/computer/q/o/i/-original-imagzht8cbfg48u2.jpeg?q=70"],
    description: "Powerful and thin laptop perfect for students and professionals.",
    specifications: {
      "Processor": "Intel Core i5 12th Gen",
      "RAM": "16 GB DDR4 PCIe NVMe",
      "Storage": "512 GB SSD",
      "Display": "15.6 inch FHD"
    },
    stockStatus: 'In Stock'
  }
];
