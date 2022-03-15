const express = require('express')
const router = express.Router()
const Contenedor = require('../contenedor')
const prod = new Contenedor('./src/productos.txt')

router.get('/api/productos', async (req, res) => {
  try {
    const productos = await prod.getAll()
    res.status(200).send(productos)
  } catch (err) {
    console.log(err)
  }
})

router.get('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const producto = await prod.getById(id)
    if (producto === null) {
      res.status(400).json({ error: 'producto no encontrado' })
    } else {
      res.status(200).json(producto)
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/api/productos', async (req, res) => {
  const object = req.body
  try {
    const newProduct = await prod.save(object)
    res.status(200).json(newProduct)
  } catch (err) {
    console.log(err)
  }
})

router.put('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const object = req.body
    const prodUptadte = await prod.updateProd(object, id)
    if (prodUptadte === null) {
      res.status(400).json({ error: 'producto no encontrado' })
    } else {
      res.status(200).json(prodUptadte)
    }
  } catch (err) {
  }
})

router.delete('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productos = await prod.deleteById(id)
    if (productos === null) {
      res.status(400).json({ error: 'producto no encontrado' })
    } else {
      res.status(200).json(productos)
    }
  } catch (error) {
  }
})

module.exports = router
