import { Router } from "express";

const router = Router();

// routes will be added here as you build features
// e.g. router.use("/auth", authRoutes);
// e.g. router.use("/users", userRoutes);

router.get("/event/:eventName", (_req, res) => {
  const { eventName } = _req.params;
  console.log(eventName);
  res.json({ ok: true, value: 5 });
});

export default router;