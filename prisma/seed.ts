import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

import prisma from "../src/lib/prisma";

import {
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  RentalRequestStatus,
  Role,
} from "./generated/prisma/enums";

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // =========================
  // Users
  // =========================
  const [landlord1, landlord2, tenant1, tenant2, admin] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Noman Ahmed",
        email: "noman@gmail.com",
        password,
        role: Role.LANDLORD,
      },
    }),
    prisma.user.create({
      data: {
        name: "Rimy Akter",
        email: "rimy@gmail.com",
        password,
        role: Role.LANDLORD,
      },
    }),
    prisma.user.create({
      data: {
        name: "Rakib Hasan",
        email: "rakib@gmail.com",
        password,
        role: Role.TENANT,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sakib Khan",
        email: "sakib@gmail.com",
        password,
        role: Role.TENANT,
      },
    }),
    prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password,
        role: Role.ADMIN,
      },
    }),
  ]);

  console.log("✅ Users created");

  // =========================
  // Categories
  // =========================
  const apartment = await prisma.category.create({
    data: {
      name: "Apartment",
      description: "Modern apartment",
      icon: "apartment.png",
    },
  });

  const house = await prisma.category.create({
    data: {
      name: "House",
      description: "Independent house",
      icon: "house.png",
    },
  });

  const studio = await prisma.category.create({
    data: {
      name: "Studio",
      description: "Studio apartment",
      icon: "studio.png",
    },
  });

  console.log("✅ Categories created");

  // =========================
  // Properties
  // =========================
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: "Luxury Apartment in Gulshan",
        description: "Fully furnished luxury apartment.",
        price: 35000,
        bedrooms: 3,
        bathrooms: 2,
        address: "House 10, Road 5",
        city: "Dhaka",
        image: "https://picsum.photos/600/400?1",
        ownerId: landlord1.id,
        categoryId: apartment.id,
      },
    }),

    prisma.property.create({
      data: {
        title: "Family House",
        description: "Perfect family home.",
        price: 45000,
        bedrooms: 4,
        bathrooms: 3,
        address: "House 22",
        city: "Chittagong",
        image: "https://picsum.photos/600/400?2",
        ownerId: landlord2.id,
        categoryId: house.id,
      },
    }),

    prisma.property.create({
      data: {
        title: "Studio Flat",
        description: "Affordable studio.",
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        address: "Flat 4A",
        city: "Dhaka",
        image: "https://picsum.photos/600/400?3",
        ownerId: landlord1.id,
        categoryId: studio.id,
      },
    }),
  ]);

  console.log("✅ Properties created");

  // =========================
  // Rental Requests
  // =========================
  const request1 = await prisma.rentalRequest.create({
    data: {
      propertyId: properties[0].id,
      renterId: tenant1.id,
      moveInDate: new Date("2026-09-01"),
      duration: 12,
      message: "Interested in renting this property.",
      status: RentalRequestStatus.APPROVED,
    },
  });

  const request2 = await prisma.rentalRequest.create({
    data: {
      propertyId: properties[1].id,
      renterId: tenant2.id,
      moveInDate: new Date("2026-09-10"),
      duration: 6,
      message: "Need a family house.",
      status: RentalRequestStatus.PENDING,
    },
  });

  const request3 = await prisma.rentalRequest.create({
    data: {
      propertyId: properties[2].id,
      renterId: tenant1.id,
      moveInDate: new Date("2026-10-01"),
      duration: 3,
      status: RentalRequestStatus.COMPLETED,
    },
  });

  console.log("✅ Rental Requests created");

  // =========================
  // Payments
  // =========================
  await prisma.payment.create({
    data: {
      transactionId: randomUUID(),
      rentalRequestId: request1.id,
      renterId: tenant1.id,
      amount: 35000,
      method: PaymentMethod.CARD,
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      transactionId: randomUUID(),
      rentalRequestId: request3.id,
      renterId: tenant1.id,
      amount: 15000,
      method: PaymentMethod.MOBILE_BANKING,
      provider: PaymentProvider.SSLCOMMERZ,
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  console.log("✅ Payments created");

  // =========================
  // Reviews
  // =========================
  await prisma.review.create({
    data: {
      propertyId: properties[2].id,
      renterId: tenant1.id,
      rating: 5,
      comment: "Excellent property. Highly recommended.",
    },
  });

  await prisma.review.create({
    data: {
      propertyId: properties[0].id,
      renterId: tenant2.id,
      rating: 4,
      comment: "Nice apartment with good security.",
    },
  });

  console.log("✅ Reviews created");

  console.log("🎉 Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
