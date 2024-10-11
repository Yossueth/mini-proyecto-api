const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../server/data.json");

async function leerData() {
  try {
    const leer = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(leer);
  } catch (error) {
    console.error("Error al leer archivo", error);
  }
}

const getProducts = async (req, res) => {
  try {
    const productos = await leerData();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

const postProducts = async (req, res) => {
  const { nombre, precio, cantidad } = req.body;

  try {
    const inv = await leerData();

    const newProduct = {
      id: inv.Productos.length + 1,
      nombre,
      precio,
      cantidad,
    };

    inv.Productos.push(newProduct);
    await fs.promises.writeFile(filePath, JSON.stringify(inv), "utf8");
    console.log("El archivo ha sido escrito exitosamente");
    res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error en el server: ", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const inv = await leerData();
    const { id } = req.params;
    const produtsIndex = inv.Productos.findIndex(
      (producto) => producto.id === parseInt(id)
    );
    inv.Productos.splice(produtsIndex, 1);
    res.status(200).json({ message: "Producto eliminado con exito" });
  } catch (error) {
    console.error("error al eliminar el producto", error);
    res.status(500).json({ message: "error del servidor" });
  }
};

const updateProduts = async (req, res) => {
  try {
    const inv = await leerData();
    const { id } = req.params;
    const { nombre, precio, cantidad } = req.body;
    const produtsIndex = inv.Productos.findIndex(
      (productos) => productos.id === parseInt(id)
    );
    if (nombre) {
      nombre[produtsIndex].nombre = nombre;
    }
    if (precio) {
      precio[produtsIndex].precio = precio;
    }
    if (cantidad) {
      cantidad[produtsIndex].cantidad = cantidad;
    }
    res.status(200).json({ message: "producto actualizado exitosamento" });
  } catch (error) {
    console.error("error al actualizar el producto", error);
    res.status(500).json({ message: "error interno del servidor" });
  }
};

module.exports = { getProducts, postProducts, deleteProducts, updateProduts };
