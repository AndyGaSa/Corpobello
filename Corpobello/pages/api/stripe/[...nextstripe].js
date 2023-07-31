import NextStripe from 'next-stripe';

export default NextStripe({
  stripe_key: process.env.NEXT_STRIPE_RESTRICTED_KEY,
});
