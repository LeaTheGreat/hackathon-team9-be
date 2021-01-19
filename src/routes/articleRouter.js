const express = require("express");
const Article = require("../models/article");
const router = new express.Router();

// TODO router.post("/article", isAdmin, async (req, res) => {
router.post("/article", async (req, res) => {
  const article = new Article({
    ...req.body,
  });

  try {
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /article?limit=3
router.get("/article", async (req, res) => {
  try {
    console.log("article");
    const articles = await Article.find(
      {},
      ["caption", "picture", "shorttext"],
      {
        limit: parseInt(req.query.limit),
      }
    );
    res.status(200).send(articles);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/article/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const article = await Article.findOne({ _id });

    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
});
module.exports = router;
