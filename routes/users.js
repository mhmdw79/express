const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
let usersData = require("../usersData");

router.get("/", (req, res) => {
  res.json({
    data: usersData,
    message: "oK",
  });
});

router.get("/:id", (req, res) => {
  const user = usersData.find((u) => u.id == req.params.id);
  if (!user)
    return res
      .status(404)
      .json({ data: null, message: "the user with id not found" });
  res.json({
    data: usersData,
    message: "ok",
  });
});

router.post(
  "/users",
  [
    body("name", "name must be valid").isString().notEmpty(),
    body("family", "family must be valid").isString().notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    // console.log(req.body)
    usersData.push({
      id: usersData.length + 1,
      ...req.body,
    });

    res.json({
      data: users,
      message: "ok",
    });
  }
);

router.put(
  "/:id",
  [
    body("name", "name must be valid").isString().notEmpty(),
    body("family", "family must be valid").isString().notEmpty(),
  ],
  (req, res) => {
    const user = usersData.find((u) => u.id == req.params.id);

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "id user != is a data",
      });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }

    users = usersData.map((user) => {
      if (user.id == req.params.id) {
        return { ...user, ...req.body };
      }
      return user;
    });

    res.json({
      data: users,
      message: "ok",
    });
  }
);

router.delete("/:id", (req, res) => {
  const user = usersData.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({
      data: null,
      message: "id user != is a data",
    });
  }
  const index = usersData.indexOf(user);
  usersData.splice(index, 1);

  res.json({
    data: users,
    message: "ok",
  });
});

module.exports = router;
