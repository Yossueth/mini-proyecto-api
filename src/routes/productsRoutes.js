const express = require('express')
const router = express.Router()
const productsControllers = require ("../controllers/productsControllers")

router.get("/", productsControllers.getProducts)
router.post("/",productsControllers.postProducts)
router.delete("/:id",productsControllers.deleteProducts)
router.put("/:id",productsControllers.updateProduts)


module.exports = router
