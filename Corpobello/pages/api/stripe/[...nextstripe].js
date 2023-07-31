import NextStripe from 'next-stripe';

export default NextStripe({
  stripe_key: process.env.NEXT_PUBLIC_STRIPE_RESTRICTED_KEY,
});
