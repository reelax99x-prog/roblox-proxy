const express = require("express");
const app = express();
app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); });

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept": "application/json"
};

app.get("/games/:userId", async (req, res) => {
  try {
    const r = await fetch(`https://games.roblox.com/v2/users/${req.params.userId}/games?accessFilter=2&limit=50&sortOrder=Asc`, {headers});
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/gamepasses/:universeId", async (req, res) => {
  try {
    const r = await fetch(`https://apis.roblox.com/game-passes/v1/universes/${req.params.universeId}/game-passes?passView=Full&pageSize=100`, {headers});
    const raw = await r.json();
    const passes = (raw.gamePasses || []).filter(gp => gp.isForSale && gp.price > 0);
    res.json({ data: passes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/catalog/:userId", async (req, res) => {
  try {
    const r = await fetch(`https://catalog.roblox.com/v1/search/items/details?Category=1&CreatorTargetId=${req.params.userId}&CreatorType=1&Limit=30&SortType=3`, {headers});
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/", (req, res) => res.json({ status: "ok", version: "3.0" }));
app.listen(process.env.PORT || 3000, () => console.log("Proxy v3 running!"));
