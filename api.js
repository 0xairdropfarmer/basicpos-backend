const express = require("express");
const router = express.Router();
require("./db");

router.use(require("./api_auth"));
router.use(require("./api_pos_machine"));
router.use(require("./api_product"));
router.use(require("./api_stat"));
router.use(require("./api_order"));
router.use(require("./api_supplier"));
router.use(require("./api_branch"));

module.exports = router;
