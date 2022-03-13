const fs = require('fs')

class Contenedor {
  constructor (file) {
    this.file = file
    try {
      this.productos = JSON.parse(fs.readFileSync(`./${this.file}`))
    } catch (error) {
      this.productos = []
    }
  }

  async save (object) {
    try {
      if (this.productos.length === 0) {
        this.id = 1
      } else {
        this.id = this.productos[this.productos.length - 1].id + 1
      }
      const producto = {
        id: this.id,
        title: object.title,
        price: object.price,
        thumbnail: object.thumbnail
      }
      this.productos.push(producto)
      const productoStringify = JSON.stringify(this.productos, null, 2)
      await fs.promises.writeFile(`./${this.file}`, productoStringify)
      return this.productos
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id) {
    try {
      const productos = JSON.parse(await fs.promises.readFile(`./${this.file}`))
      const producto = productos.find(producto => producto.id === id)
      if (!producto) {
        return null
      } else {
        return producto
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteById (id) {
    try {
      const productosCargados = JSON.parse(await fs.promises.readFile(`./${this.file}`))
      const productoCoincide = productosCargados.find(producto => producto.id === id)
      if (!productoCoincide) {
        return { error: 'no existe producto con este id' }
      } else {
        try {
          const productoBorrar = productosCargados.filter(producto => producto.id !== id)
          const productoBorrarStringify = JSON.stringify(productoBorrar, null, 2)
          await fs.promises.writeFile(`./${this.file}`, productoBorrarStringify)
          return productoBorrar
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAll () {
    try {
      const productos = JSON.parse(await fs.promises.readFile(`./${this.file}`))
      return productos
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAll () {
    try {
      await fs.promises.unlink(`./${this.file}`)
      return { delate: 'todos los productos han sido eliminados' }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProd (object, id) {
    try {
      const productos = JSON.parse(await fs.promises.readFile(`./${this.file}`))
      for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
          productos[i].title = object.title
          productos[i].price = object.price
          productos[i].thumbnail = object.thumbnail
        }
      }
      const productoStringify = JSON.stringify(productos, null, 2)
      await fs.promises.writeFile(`./${this.file}`, productoStringify)
      return productos
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Contenedor
