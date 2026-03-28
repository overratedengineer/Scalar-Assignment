import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Seeding database with expanded categories & products...');

  // 1. Create a demo user
  const passwordHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@flipkart.com' },
    update: {},
    create: {
      email: 'demo@flipkart.com',
      name: 'Demo User',
      passwordHash,
      phone: '9876543210'
    }
  });
  console.log(`✅ Demo User created: ${demoUser.email}`);

  // 2. Create Categories
  const categoriesData = [
    { name: 'Mobiles', slug: 'mobiles' },
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home', slug: 'home' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Appliances', slug: 'appliances' },
    { name: 'Toys, Baby', slug: 'toys, baby' },
    { name: 'Food & More', slug: 'food & more' },
    { name: 'Auto Acc...', slug: 'auto acc...' },
    { name: '2 Wheele...', slug: '2 wheele...' },
    { name: 'Sports & ...', slug: 'sports & ...' },
    { name: 'Books & ...', slug: 'books & ...' },
    { name: 'Furniture', slug: 'furniture' }
  ];

  const createdCategories = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug }
    });
    createdCategories[cat.slug] = createdCat;
  }
  console.log('✅ Categories created');

  // Helper macro to build products easily
  const b = (catSlug, name, description, price, mrp, brand, image, specs) => ({
    categoryId: createdCategories[catSlug].id,
    name, description, price, mrp,
    stockQty: 50, brand, rating: 4.5, ratingCount: Math.floor(Math.random() * 5000),
    images: [image],
    specs
  });

  // 3. Create Products (At least 2 per category)
  const productsData = [
    // Mobiles
    b('mobiles', 'Apple iPhone 15 Pro Max (Black Titanium, 256 GB)', 'Forged in titanium.', 159900, 159900, 'Apple', 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/p/1/x/-original-imagtc2qaam3vmyv.jpeg?q=70', { 'Display': '6.7 inch' }),
    b('mobiles', 'SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)', 'Era of AI.', 129999, 134999, 'Samsung', 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/w/x/-original-imagxdfxckv8x7zh.jpeg?q=70', { 'Display': '6.8 inch' }),
    
    // Electronics
    b('electronics', 'SONY WH-1000XM5 Bluetooth Headset', 'Noise Cancelling.', 29990, 34990, 'Sony', 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/j/t/y/-original-imagg5jyymhqfvwv.jpeg?q=70', { 'Type': 'Over-ear' }),
    b('electronics', 'ASUS Vivobook 15 Intel Core i5 12th Gen', 'Thin laptop.', 49990, 70990, 'ASUS', 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/q/o/i/-original-imagzht8cbfg48u2.jpeg?q=70', { 'RAM': '16 GB' }),
    
    // Fashion
    b('fashion', 'PUMA Running Shoes For Men', 'Comfortable running shoes.', 2499, 4999, 'Puma', 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/p/u/8/-original-imahfztx5mzzhhhm.jpeg?q=70', { 'Color': 'Black' }),
    b('fashion', 'Wrangler Slim Fit Men Jeans', 'Everyday denim.', 1599, 2999, 'Wrangler', 'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/y/y/m/32-wruni0734-wrangler-original-imahfjvydfgyzzhw.jpeg?q=70', { 'Fit': 'Slim' }),

    // Home
    b('home', 'Bombay Dyeing Cotton Double Bedsheet', 'Floral pattern.', 799, 1499, 'Bombay Dyeing', 'https://rukminim2.flixcart.com/image/612/612/xif0q/bedsheet/h/a/d/dsbb013-1-dsbb013-flat-bombay-dyeing-original-imagpzzhhmff2z9g.jpeg?q=70', { 'Material': 'Cotton' }),
    b('home', 'Philips 9W LED Bulb', 'Energy efficient lighting.', 150, 200, 'Philips', 'https://rukminim2.flixcart.com/image/612/612/xif0q/bulb/p/x/g/-original-imahf32w9pzzxzhv.jpeg?q=70', { 'Power': '9W' }),

    // Beauty
    b('beauty', 'LAKMÉ Absolute Perfect Radiance Skin Lightening Cream', 'Radiant skin instantly.', 299, 450, 'Lakme', 'https://rukminim2.flixcart.com/image/612/612/xif0q/face-wash/v/n/q/-original-imaghfhwqvhzx5hy.jpeg?q=70', { 'Type': 'Cream' }),
    b('beauty', 'NIVEA Men Body Wash', 'Refreshing shower gel.', 199, 299, 'Nivea', 'https://rukminim2.flixcart.com/image/612/612/xif0q/body-wash/n/z/a/500-pure-impact-shower-gel-with-purifying-micro-particles-body-original-imahfgz3zvzwzzgz.jpeg?q=70', { 'For': 'Men' }),

    // Appliances
    b('appliances', 'SAMSUNG 183 L Direct Cool Single Door Refrigerator', 'Economical cooling.', 14990, 18990, 'Samsung', 'https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/y/k/b/-original-imagwhrbyfzm8qhj.jpeg?q=70', { 'Capacity': '183L' }),
    b('appliances', 'LG 7 kg Semi Automatic Top Load Washing Machine', 'Powerful washing.', 10990, 15990, 'LG', 'https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/d/r/q/-original-imagpzbzjzhyzqhz.jpeg?q=70', { 'Capacity': '7kg' }),

    // Toys, Baby
    b('toys, baby', 'LEGO Classic Creative Bricks', 'Build your imagination.', 1499, 1999, 'LEGO', 'https://rukminim2.flixcart.com/image/612/612/xif0q/block-construction/b/b/x/-original-imagu9vzjhzfhzhc.jpeg?q=70', { 'Pieces': '221' }),
    b('toys, baby', 'Himalaya Baby Massage Oil', 'Gentle on skin.', 250, 300, 'Himalaya', 'https://rukminim2.flixcart.com/image/612/612/xif0q/baby-care-combo/h/h/z/-original-imagr9z3kzfzvhzw.jpeg?q=70', { 'Volume': '500ml' }),

    // Food & More
    b('food & more', 'Nescafe Classic Instant Coffee', 'Start your day right.', 350, 420, 'Nescafe', 'https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/a/n/z/-original-imagg2yhzzgzqhyj.jpeg?q=70', { 'Type': 'Instant' }),
    b('food & more', 'Cadbury Dairy Milk Silk', 'Smooth chocolate.', 150, 175, 'Cadbury', 'https://rukminim2.flixcart.com/image/612/612/xif0q/chocolate/w/m/h/-original-imagttzvzzhxzyhm.jpeg?q=70', { 'Weight': '250g' }),

    // Auto Acc...
    b('auto acc...', 'Vega Crux Open Face Helmet', 'ISI Certified.', 1199, 1499, 'Vega', 'https://rukminim2.flixcart.com/image/612/612/xif0q/helmet/l/n/u/crux-black-open-face-crux-open-face-vega-original-imagrzwzvszhqzj2.jpeg?q=70', { 'Type': 'Open Face' }),
    b('auto acc...', 'Portronics AUTO 12 Bluetooth Receiver', 'Handsfree calling.', 399, 999, 'Portronics', 'https://rukminim2.flixcart.com/image/612/612/xif0q/car-bluetooth-device/p/y/c/-original-imagu5yvzqzymzgj.jpeg?q=70', { 'Connectivity': 'Bluetooth' }),

    // 2 Wheele...
    b('2 wheele...', 'Motul 7100 4T 10W-50 Engine Oil', 'Fully Synthetic.', 950, 1150, 'Motul', 'https://rukminim2.flixcart.com/image/612/612/xif0q/engine-oil/2/m/1/-original-imags3yzwzzhhzhc.jpeg?q=70', { 'Grade': '10W-50' }),
    b('2 wheele...', 'Bosch Two Wheeler Horn', 'Loud and clear.', 299, 450, 'Bosch', 'https://rukminim2.flixcart.com/image/612/612/xif0q/vehicle-horn/y/x/h/symphony-horn-for-all-bikes-and-scooters-bosch-original-imaggz2hzxhyyyhx.jpeg?q=70', { 'Voltage': '12V' }),

    // Sports & ...
    b('sports & ...', 'Nivia Storm Football', 'Size 5.', 450, 650, 'Nivia', 'https://rukminim2.flixcart.com/image/612/612/xif0q/ball/t/n/h/storm-5-400-5-1-1-football-nivia-original-imagzzzzzzzzzzzz.jpeg?q=70', { 'Size': '5' }),
    b('sports & ...', 'Yonex Mavis 350 Shuttlecock', 'Nylon shuttles.', 899, 1299, 'Yonex', 'https://rukminim2.flixcart.com/image/612/612/xif0q/shuttle-cock/z/m/y/-original-imagzzyzxzyzyzyz.jpeg?q=70', { 'Quantity': '6' }),

    // Books & ...
    b('books & ...', 'Atomic Habits by James Clear', 'Tiny changes, remarkable results.', 450, 799, 'Penguin', 'https://rukminim2.flixcart.com/image/612/612/kufuikw0/book/x/s/w/atomic-habits-original-imag7jczzzzzzzzz.jpeg?q=70', { 'Genre': 'Self Help' }),
    b('books & ...', 'The Psychology of Money', 'Timeless lessons on wealth.', 299, 399, 'Jaico', 'https://rukminim2.flixcart.com/image/612/612/knyxqq80/book/q/u/8/the-psychology-of-money-original-imag2frzzzzzzzzz.jpeg?q=70', { 'Genre': 'Finance' }),

    // Furniture
    b('furniture', 'Wakefit Orthopedic Memory Foam Mattress', 'Comfortable sleep.', 8990, 12990, 'Wakefit', 'https://rukminim2.flixcart.com/image/612/612/xif0q/bed-mattress/h/q/5/6-72-30-single-orthopedic-memory-foam-mattress-wmomf72306-original-imagzzzzzzzzzzzz.jpeg?q=70', { 'Size': 'Single' }),
    b('furniture', 'Green Soul Ergonomic Office Chair', 'Breathable mesh.', 5490, 9990, 'Green Soul', 'https://rukminim2.flixcart.com/image/612/612/xif0q/office-study-chair/v/m/q/-original-imagzzzzzzzzzzzz.jpeg?q=70', { 'Material': 'Mesh' }),
  ];

  for (const prodData of productsData) {
    const existing = await prisma.product.findFirst({ where: { name: prodData.name } });
    if (!existing) {
      const product = await prisma.product.create({
        data: {
          categoryId: prodData.categoryId,
          name: prodData.name,
          description: prodData.description,
          price: prodData.price,
          mrp: prodData.mrp,
          stockQty: prodData.stockQty,
          brand: prodData.brand,
          rating: prodData.rating,
          ratingCount: prodData.ratingCount,
          images: {
            create: prodData.images.map((url, i) => ({ url, displayOrder: i }))
          },
          specs: {
            create: Object.entries(prodData.specs).map(([key, value]) => ({ specKey: key, specValue: value }))
          }
        }
      });
      console.log(`✅ Product created: ${product.name}`);
    }
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });