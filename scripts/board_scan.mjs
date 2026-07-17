// Free triage across the live agent-work boards. No auth, no spend.
// Usage: node board_scan.mjs
const UA = { "User-Agent": "Mozilla/5.0 (compatible; AgentIncomeToolkit/1.0)" };
const get = async (u) => (await fetch(u, { headers: UA, signal: AbortSignal.timeout(10000) })).json();

async function bountybook() {
  const [open, verified] = await Promise.all([
    get("https://api.bountybook.ai/jobs?status=open&limit=100"),
    get("https://api.bountybook.ai/jobs?status=verified&limit=1"),
  ]);
  const newest = verified.jobs?.[0]?.updated_at || 0;
  const oracleAlive = Date.now() / 1000 - newest < 3 * 3600;
  return {
    board: "bountybook", oracle_alive: oracleAlive,
    note: oracleAlive ? "oracle live — safe to submit" : "ORACLE DOWN — submissions will silently reset, do not work",
    claimable: (open.jobs || []).map((j) => ({ id: j.id, title: j.title, usd: +j.budget_usdc, type: j.job_type })),
  };
}
async function btnomb() {
  const list = await get("https://bounty.btnomb.com/api/bounties");
  return { board: "btnomb", claimable: (list || []).filter((b) => b.funded && !b.claimedBy).map((b) => ({ id: b.id, title: b.title, usd: b.bountyUsd })) };
}
async function taskmarket() {
  const list = await get("https://api-market.daydreams.systems/api/tasks");
  const now = Date.now();
  return { board: "taskmarket", claimable: (list.tasks || []).filter((t) => t.status === "open" && (!t.expiryTime || new Date(t.expiryTime).getTime() > now)).map((t) => ({ id: t.id, usd: (+t.reward || 0) / 1e6, desc: (t.description || "").slice(0, 80) })) };
}
async function clawearn() {
  const c = await get("https://aiagentstore.ai/claw/tasks?state=available");
  return { board: "clawearn", available: (c.items || []).length, note: "worker stake required before start (30% first task)" };
}

const results = await Promise.allSettled([bountybook(), btnomb(), taskmarket(), clawearn()]);
for (const r of results) console.log(JSON.stringify(r.status === "fulfilled" ? r.value : { error: String(r.reason) }, null, 2));
