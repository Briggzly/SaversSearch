const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name user_id FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/wishlist", async (req, res) => {
  const { title, price } = req.body;

  try {
    const user = await pool.query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [req.user.id]
    )

    let newWish = await pool.query(
      "INSERT INTO wishlist (user_id, wish_title, wish_price) VALUES ($1, $2, $3)",
      [user.id, title, price]
    )

   return res.json(newWish)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
