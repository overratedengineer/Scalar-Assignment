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
    { name: 'Mobiles', slug: 'mobiles', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/mobiles.svg' },
    { name: 'Electronics', slug: 'electronics', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/headohones.svg' },
    { name: 'Fashion', slug: 'fashion', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/fashion.svg' },
    { name: 'Home', slug: 'home', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/home-final.svg' },
    { name: 'Beauty', slug: 'beauty', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/beauty.svg' },
    { name: 'Appliances', slug: 'appliances', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/tv.svg' },
    { name: 'Toys, Baby', slug: 'toys-baby', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/toy.svg' },
    { name: 'Food & More', slug: 'food-more', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/food.svg' },
    { name: 'Auto Accessories', slug: 'auto-accessories', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-acc.svg' },
    { name: '2 Wheelers', slug: '2-wheelers', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-new.svg' },
    { name: 'Sports & Fitness', slug: 'sports-fitness', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/sport.svg' },
    { name: 'Books & More', slug: 'books-more', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/books.svg' },
    { name: 'Furniture', slug: 'furniture', iconUrl: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/furniture.svg' }
  ];

  const createdCategories = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { iconUrl: cat.iconUrl, name: cat.name },
      create: { name: cat.name, slug: cat.slug, iconUrl: cat.iconUrl }
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
    b('mobiles', 'Apple iPhone 15 Pro Max (Black Titanium, 256 GB)', 'Forged in titanium.', 159900, 159900, 'Apple', 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-15-pro-max.png', { 'Display': '6.7 inch' }),
    b('mobiles', 'SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)', 'Era of AI.', 129999, 134999, 'Samsung', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR7CcAjOwScLtqwozQ_PHn0JligXSyGNWaILmD27MJj1bq3oe7R1DQbsTQdC6nJkIuXruMSzxqwpsRcM9QBqBv-b0-WBGkN', { 'Display': '6.8 inch' }),
    
    // Electronics
    b('electronics', 'SONY WH-1000XM5 Bluetooth Headset', 'Noise Cancelling.', 29990, 34990, 'Sony', 'https://m.media-amazon.com/images/I/31IZif7WArL._SY300_SX300_QL70_FMwebp_.jpg', { 'Type': 'Over-ear' }),
    b('electronics', 'ASUS Vivobook 15 Intel Core i5 12th Gen', 'Thin laptop.', 49990, 70990, 'ASUS', 'https://m.media-amazon.com/images/I/41rbUjmLVQL._SY300_SX300_QL70_FMwebp_.jpg', { 'RAM': '16 GB' }),
    
    // Fashion
    b('fashion', 'PUMA Running Shoes For Men', 'Comfortable running shoes.', 2499, 4999, 'Puma', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/377048/16/sv01/fnd/IND/w/600/h/600/', { 'Color': 'Black' }),
    b('fashion', 'Wrangler Slim Fit Men Jeans', 'Everyday denim.', 1599, 2999, 'Wrangler', 'https://i5.walmartimages.com/seo/Wrangler-Men-s-Cowboy-Cut-Slim-Fit-Jean_31406a00-d322-4824-a1d3-cb0605cb23e3.d94c75873a84748dda14ed833f329e09.jpeg', { 'Fit': 'Slim' }),

    // Home
    b('home', 'Bombay Dyeing Cotton Double Bedsheet', 'Floral pattern.', 799, 1499, 'Bombay Dyeing', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSJzVCkEHYoqZHRkR8SYFNf3OS8puH8OKQ0xpyXk8GrNOBv1Ul2Ubj96Air0Sjbn4ZLz87e3LBgT4e3vuX7CZF-XVjlp4tjJmuPWp-mqcW5LQfTa3oYLn5-4Q', { 'Material': 'Cotton' }),
    b('home', 'Philips 9W LED Bulb', 'Energy efficient lighting.', 150, 200, 'Philips', 'https://m.media-amazon.com/images/I/41cLWZec7SL._SY300_SX300_QL70_FMwebp_.jpg', { 'Power': '9W' }),

    // Beauty
    b('beauty', 'LAKMÉ Absolute Perfect Radiance Skin Lightening Cream', 'Radiant skin instantly.', 299, 450, 'Lakme', 'https://m.media-amazon.com/images/I/31imvTIb8aS._SY300_SX300_QL70_FMwebp_.jpg', { 'Type': 'Cream' }),
    b('beauty', 'NIVEA Men Body Wash', 'Refreshing shower gel.', 199, 299, 'Nivea', 'https://m.media-amazon.com/images/I/81gFVEPgWRL._AC_UF1000,1000_QL80_.jpg', { 'For': 'Men' }),

    // Appliances
    b('appliances', 'SAMSUNG 183 L Direct Cool Single Door Refrigerator', 'Economical cooling.', 14990, 18990, 'Samsung', 'https://m.media-amazon.com/images/I/31uYyOBLX5L._SY445_SX342_QL70_FMwebp_.jpg', { 'Capacity': '183L' }),
    b('appliances', 'LG 7 kg Semi Automatic Top Load Washing Machine', 'Powerful washing.', 10990, 15990, 'LG', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTyeAwr_ybYLKGMqJDQ8Ek8nhQTa6Z5nmWIrKAilxD__kVN7K5zY1EjVz8911spql7jbm6s6tqVFC5sg41lBkU_nI7kF2zk', { 'Capacity': '7kg' }),

    // Toys, Baby
    b('toys, baby', 'LEGO Classic Creative Bricks', 'Build your imagination.', 1499, 1999, 'LEGO', 'https://m.media-amazon.com/images/I/61kSguqoV6L._AC_UF1000,1000_QL80_.jpg', { 'Pieces': '221' }),
    b('toys, baby', 'Himalaya Baby Massage Oil', 'Gentle on skin.', 250, 300, 'Himalaya', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQK5gudCsTUJM08TTiW_NkFnDA6fIV3AcaYNG4pLR6NSZYYEV5U8oAieY5Psi7apEKAMLbixqn3gf9uUUp-XJgbexXOKKGK2S2Z5tHjPcJQqFjWhbxmtX1cqpk', { 'Volume': '500ml' }),

    // Food & More
    b('food & more', 'Nescafe Classic Instant Coffee', 'Start your day right.', 350, 420, 'Nescafe', 'https://m.media-amazon.com/images/I/419L8UsQ31L._SY300_SX300_QL70_FMwebp_.jpg', { 'Type': 'Instant' }),
    b('food & more', 'Cadbury Dairy Milk Silk', 'Smooth chocolate.', 150, 175, 'Cadbury', 'https://m.media-amazon.com/images/I/61IuQF74qyL._SX679_.jpg', { 'Weight': '250g' }),

    // Auto Acc...
    b('auto acc...', 'Vega Crux Open Face Helmet', 'ISI Certified.', 1199, 1499, 'Vega', 'https://m.media-amazon.com/images/I/31OHU9bebcL._SY300_SX300_QL70_FMwebp_.jpg', { 'Type': 'Open Face' }),
    b('auto acc...', 'Portronics AUTO 12 Bluetooth Receiver', 'Handsfree calling.', 399, 999, 'Portronics', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRibmwTXr1j4ss9W-JVDAP5YeMQXsiC2epOBNRNSBIj5MoyjDKXMk2zid19tw_DA55OfdoRCFsGWK2oCcxaV9MIk5dH0w_vCsYhJOiTvqL8TVVRVXeofYMnfQ', { 'Connectivity': 'Bluetooth' }),

    // 2 Wheele...
    b('2 wheele...', 'Motul 7100 4T 10W-50 Engine Oil', 'Fully Synthetic.', 950, 1150, 'Motul', 'https://motulindia.com/motulcms/uploads/products/gallery/7100-4T-10w50-Pack.png', { 'Grade': '10W-50' }),
    b('2 wheele...', 'Bosch Two Wheeler Horn', 'Loud and clear.', 299, 450, 'Bosch', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT6Q9_-jlW0mM6D_apgwB6PmfaPQPsz2UGe3wHwDVzJD0XcenUq3uOxUsq6uZibl1UTAHCXjTywGx8iD9fZ-F8jDmGeDaJt', { 'Voltage': '12V' }),

    // Sports & ...
    b('sports & ...', 'Nivia Storm Football', 'Size 5.', 450, 650, 'Nivia', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTqrULWXPxuj1s3rAeLuCAOzllR5DyIPwnU0rJV4B5ZJvuLGGPQxH6wacdzfDqrZuzAyQ5sRHt2b2rN5Hahlq6SdnXTprEKSKQJ19cJzbzMumdaAzxitggm', { 'Size': '5' }),
    b('sports & ...', 'Yonex Mavis 350 Shuttlecock', 'Nylon shuttles.', 899, 1299, 'Yonex', 'https://m.media-amazon.com/images/I/41Xm1-7PeaL._SY300_SX300_QL70_FMwebp_.jpg', { 'Quantity': '6' }),

    // Books & ...
    b('books & ...', 'Atomic Habits by James Clear', 'Tiny changes, remarkable results.', 450, 799, 'Penguin', 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg', { 'Genre': 'Self Help' }),
    b('books & ...', 'The Psychology of Money', 'Timeless lessons on wealth.', 299, 399, 'Jaico', 'https://m.media-amazon.com/images/I/71XEsXS5RlL._AC_UF1000,1000_QL80_.jpg', { 'Genre': 'Finance' }),

    // Furniture
    b('furniture', 'Wakefit Orthopedic Memory Foam Mattress', 'Comfortable sleep.', 8990, 12990, 'Wakefit', 'https://m.media-amazon.com/images/I/41yXwmNjv8L._SY300_SX300_QL70_FMwebp_.jpg', { 'Size': 'Single' }),
    b('furniture', 'Green Soul Ergonomic Office Chair', 'Breathable mesh.', 5490, 9990, 'Green Soul', 'https://m.media-amazon.com/images/I/31a+Mbej2sL._SY300_SX300_QL70_FMwebp_.jpg', { 'Material': 'Mesh' }),
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