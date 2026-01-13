# Aptos Fortune Cookie 🥠

A demonstration of the [aptos-x402](https://aptos-x402.vercel.app) payment protocol using Next.js on Aptos Testnet.

## Overview

This project shows how to implement HTTP 402 Payment Required flows on **Aptos** using the aptos-x402 library. It mirrors the EVM Fortune Cookie implementation to demonstrate x402 across different blockchain ecosystems.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Payment Protocol**: aptos-x402
- **Blockchain**: Aptos Testnet
- **Currency**: APT (native token)

## How It Works

```
User clicks "Open Fortune Cookie"
         ↓
1. Client makes request to /api/fortune via x402axios
2. Middleware returns 402 + payment requirements
3. x402axios automatically:
   - Signs payment with Aptos private key
   - Sends to aptos-x402 facilitator
   - Retries request with payment proof
4. Server returns fortune
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example env file and add your credentials:
```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
# Recipient address (receives payments)
PAYMENT_RECIPIENT_ADDRESS=0xyour_aptos_address

# Your private key for signing (payer)
NEXT_PUBLIC_APTOS_PRIVATE_KEY=0xyour_private_key
```

### 3. Get Testnet APT
1. Visit [Aptos Faucet](https://aptoslabs.com/testnet-faucet)
2. Enter your wallet address
3. Request testnet APT

### 4. Run Development Server
```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001)

## Project Structure

```
aptos-fortune/
├── app/
│   ├── api/fortune/route.ts   # Protected API endpoint
│   ├── page.tsx               # Frontend with x402axios
│   ├── providers.tsx          # React providers
│   └── layout.tsx             # App layout
├── middleware.ts              # aptos-x402 payment middleware
├── env.example                # Environment template
└── package.json
```

## EVM vs Aptos Comparison

| Aspect | EVM (x402) | Aptos (aptos-x402) |
|--------|------------|-------------------|
| **Package** | `@x402/next` | `aptos-x402` |
| **Middleware** | `paymentProxy` | `paymentMiddleware` |
| **Client** | `x402Client` + `wrapFetchWithPayment` | `x402axios` |
| **Currency** | USDC | APT |
| **Network** | `eip155:84532` | `aptos-testnet` |

## Key Files

### `middleware.ts`
```typescript
import { paymentMiddleware } from 'aptos-x402';

export default paymentMiddleware(
  process.env.PAYMENT_RECIPIENT_ADDRESS!,
  { '/api/fortune': { price: '1000000', network: 'aptos-testnet' } },
  { url: 'https://aptos-x402.vercel.app/api/facilitator' }
);
```

### `app/page.tsx`
```typescript
import { x402axios } from 'aptos-x402';

const response = await x402axios.get('/api/fortune', {
  privateKey: process.env.NEXT_PUBLIC_APTOS_PRIVATE_KEY!
});
```

## Security Notes

⚠️ **Never commit `.env.local`** - it contains your private key
- The `.gitignore` already excludes all `.env*` files
- For production, use proper secret management

## Resources

- [aptos-x402 Documentation](https://aptos-x402.vercel.app/docs)
- [Aptos Explorer](https://explorer.aptoslabs.com)
- [Aptos Faucet](https://aptoslabs.com/testnet-faucet)

## License

MIT
