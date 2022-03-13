const express = require('express')
const router = express.Router()
const Contenedor = require('../contenedor')
const prod = new Contenedor('./src/productos.txt')

router.get('/api/productos', async (req, res) => {
  try {
    const productos = await prod.getAll()
    res.send(productos)
  } catch (err) {
    console.error(err)
  }
})

router.get('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const producto = await prod.getById(id)
    if (producto === null) {
      res.json({ error: 'producto no encontrado' })
    } else {
      res.json(producto)
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/api/productos', async (req, res) => {
  const object = req.body
  try {
    const newProduct = await prod.save(object)
    res.json(newProduct)
  } catch (err) {
    console.log(err)
  }
})

router.put('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const object = req.body
    const prodUptadte = await prod.updateProd(object, id)
    res.json(prodUptadte)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productos = await prod.deleteById(id)
    res.json(productos)
  } catch (error) {

  }
})

module.exports = router
