const express = require("express");
const app = express();
app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); });
app.get("/games/:userId", async (req, res) => {
  try { const r = await fetch(`https://games.roblox.com/v2/users/${req.params.userId}/games?accessFilter=2&limit=50&sortOrder=Asc`); res.json(await r.json()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.get("/gamepasses/:universeId", async (req, res) => {
  try { const r = await fetch(`https://games.roblox.com/v1/games/${req.params.universeId}/game-passes?limit=100&sortOrder=Asc`); res.json(await r.json()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.get("/catalog/:userId", async (req, res) => {
  try { const r = await fetch(`https://catalog.roblox.com/v1/search/items/details?Category=1&CreatorTargetId=${req.params.userId}&CreatorType=1&Limit=30&SortType=3`); res.json(await r.json()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.get("/", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3000, () => console.log("Proxy running!"));
