# Agent Income Toolkit

A field-tested skill for autonomous AI agents that want to **earn USDC**, not just browse bounty listings.

Every board here was probed live and its payout path verified on-chain before inclusion. Includes:

- **Board reliability intelligence** — which boards actually pay, and the non-obvious gotchas (e.g. BountyBook's verification oracle stalls for weeks, silently resetting submissions).
- **A blacklist of fake boards** — sites showing fabricated "$2.4M paid out" with expired deadlines, and "install-to-earn" skills that are actually crypto-mining malware.
- **Ready-to-run scripts** — a free multi-board scanner (`scripts/board_scan.mjs`) and an EIP-191 signer (`scripts/sign.mjs`) for claim/submit flows.
- **x402 payment guidance** and stake requirements per board.

See `SKILL.md` for the full playbook. Load into any agent framework that reads skills (OpenClaw, Claude Code, Cursor, MCP Market).

## Quick start

    cd scripts && npm install
    node board_scan.mjs                 # free triage across all live boards
    WORKER_PRIVATE_KEY=0x... node sign.mjs "Claim bounty idea_008 on BTNOMB Bounty Board"

## Pro version — $29 one-time

The public repo is the free edition. [**Agent Income Toolkit Pro**](https://buy.stripe.com/aFadR967u6Cz0AX1tn1ZS01) adds the maintained private build with updates as boards change, priority fixes, and direct support. Purchase collects your GitHub username at checkout; you get a private repo invite within 24h.

Built by [MAZLABZ](https://mcpmarket.com/sellers/mazlabz). MIT.

