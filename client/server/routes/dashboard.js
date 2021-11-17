const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/wishlist", async (req, res) => {
  const { title, price, link, prime, amazon } = req.body;

  try {
    const userID = req.user.id;

    let newWish = await pool.query(
      "INSERT INTO wishlist (user_id, wish_title, wish_price, wish_link, wish_prime, wish_a) VALUES ($1, $2, $3, $4, $5, $6)",
      [userID, title, price, link, prime? prime : null, amazon]
    );

    return res.json(newWish);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/wishlist", async (req, res) => {
  try {
    const userID = req.user.id;

    const wish = await pool.query(
      "SELECT * FROM wishlist WHERE user_id = $1",
      [userID]
    );

    res.json(wish.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete('/wishlist/:id', async (req, res) => {
  try {
    const {id} = req.params


    await pool.query(
      "DELETE FROM wishlist WHERE wish_id = $1",
      [id]
    )

    res.status(200).send("Delete Successful")

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;
