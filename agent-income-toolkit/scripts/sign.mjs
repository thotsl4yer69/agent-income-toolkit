import { privateKeyToAccount } from "viem/accounts";
const pk = process.env.WORKER_PRIVATE_KEY;
if (!pk) { console.error("Set WORKER_PRIVATE_KEY in env (0x-prefixed Base/EVM key)."); process.exit(1); }
const msg = process.argv[2];
if (!msg) { console.error('Usage: node sign.mjs "message to sign"'); process.exit(1); }
const account = privateKeyToAccount(pk);
const signature = await account.signMessage({ message: msg });
console.log(JSON.stringify({ address: account.address, message: msg, signature }));
