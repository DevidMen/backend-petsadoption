import express from "express";

const router = express.Router();

router.get("/logout", function (req, res) {
  res.clearCookie("access-token");
  res.send("Cookie cleared");
  console.log("cookie cleared");
});

export default router;
