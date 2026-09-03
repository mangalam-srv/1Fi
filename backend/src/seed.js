import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const createEMIPlans = (basePrice) => {
  const plans = [
    {
      tenure: 3,
      monthlyAmount: Math.round(basePrice / 3),
      interestRate: 0,
      cashback: 7500,
    },
    {
      tenure: 6,
      monthlyAmount: Math.round(basePrice / 6),
      interestRate: 0,
      cashback: 7500,
    },
    {
      tenure: 12,
      monthlyAmount: Math.round(basePrice / 12),
      interestRate: 0,
      cashback: 5000,
    },
    {
      tenure: 24,
      monthlyAmount: Math.round(basePrice / 24 * 1.05),
      interestRate: 0,
      cashback: 3000,
    },
    {
      tenure: 36,
      monthlyAmount: Math.round(basePrice / 36 * 1.105),
      interestRate: 10.5,
      cashback: 2000,
    },
    {
      tenure: 48,
      monthlyAmount: Math.round(basePrice / 48 * 1.105),
      interestRate: 10.5,
      cashback: 1500,
    },
    {
      tenure: 60,
      monthlyAmount: Math.round(basePrice / 60 * 1.105),
      interestRate: 10.5,
      cashback: 1000,
    },
  ];
  return plans;
};

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    description: 'The latest flagship iPhone with A19 Pro chip, ProMotion display, and advanced camera system.',
    variants: [
      {
        name: '256 GB',
        storage: '256 GB',
        color: 'Natural Titanium',
        price: 134900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(134900),
      },
      {
        name: '512 GB',
        storage: '512 GB',
        color: 'Blue Titanium',
        price: 154900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(154900),
      },
      {
        name: '1 TB',
        storage: '1 TB',
        color: 'White Titanium',
        price: 174900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(174900),
      },
    ],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    description: 'Ultimate Android flagship with S Pen, 200MP camera, and Galaxy AI.',
    variants: [
      {
        name: '256 GB',
        storage: '256 GB',
        color: 'Titanium Gray',
        price: 129999,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(129999),
      },
      {
        name: '512 GB',
        storage: '512 GB',
        color: 'Titanium Violet',
        price: 139999,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(139999),
      },
      {
        name: '1 TB',
        storage: '1 TB',
        color: 'Titanium Black',
        price: 159999,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(159999),
      },
    ],
  },
  {
    name: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    brand: 'Apple',
    description: 'Supercharged by M3 chip. Incredible performance in an incredibly thin design.',
    variants: [
      {
        name: '256 GB',
        storage: '256 GB',
        color: 'Space Gray',
        price: 114900,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(114900),
      },
      {
        name: '512 GB',
        storage: '512 GB',
        color: 'Starlight',
        price: 134900,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(134900),
      },
      {
        name: '1 TB',
        storage: '1 TB',
        color: 'Midnight',
        price: 154900,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        emiPlans: createEMIPlans(154900),
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products`);

    createdProducts.forEach((product) => {
      console.log(`\nProduct: ${product.name}`);
      product.variants.forEach((variant) => {
        console.log(`  Variant: ${variant.name} (${variant.color || variant.storage}) - ₹${variant.price.toLocaleString()}`);
        console.log(`  EMI Plans: ${variant.emiPlans.length} plans`);
        variant.emiPlans.forEach((plan) => {
          console.log(`    ${plan.tenure} months - ₹${plan.monthlyAmount.toLocaleString()}/month - ${plan.interestRate}% interest - ₹${plan.cashback.toLocaleString()} cashback`);
        });
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();