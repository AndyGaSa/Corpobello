module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env: {
    mongodburl: 'mongodb+srv://tanjiro:admin1234@cluster0.pgp7j.mongodb.net/Corpobello',
    jwt_secret: '83e68734-1cac-4e5c-a542-de20e8425b5f',
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: 'pk_test_51JZit7FXhsus6ZXx5jpjmAEtj0sOomFpYJmk6dQ7MUuE4UNUxf3Jxl1EZqoiLSMaGH6Pvqd9kICIIDWWzZhHLdcE00a6tQ64vt',
    STRIPE_RESTRICTED_KEY: 'sk_test_51JZit7FXhsus6ZXx8EUDQIPOwPAyRSWa9WLXLRXxYVTLjjGvISBA8bbDCBj4NMwDuIwpHoaBxngjL8F1C1ZDtuiy00wUxD6eNg',
  },
  images: {
    domains: [],
  },
};
