const express = require("express");
const app = express();
const ContenedorV2 = require('./ContenedorV2.js')


const { Router } = express;
const path = require("path");
const routerProducto = Router();

let contenedor= new ContenedorV2()

let producto ={
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}
let producto2 ={
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
let producto3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
}

let producto4 ={
     title: "Trofeo",
     price: 500,
     thumbnail: "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Trophy-256.png",
 
}

let producto5 ={
     title: "Reglas",
     price: 300,
     thumbnail: "reglas.cl",
 
}



contenedor.save(producto)
contenedor.save(producto2)
contenedor.save(producto3)

// console.log("La lista de objetos creada es:")
// console.log(contenedor.getAll())

 
// console.log("El objeto con el id=1 es:")
// console.log(contenedor.getById(1))
// console.log("El objeto con el id=3 es:")
// console.log(contenedor.getById(3))
// console.log("El objeto con el id=0 es:")
// console.log(contenedor.getById(0))
// console.log("La nueva lista de objetos eliminando el objeto con id=2 es:")
// contenedor.deleteById(2)
// console.log(contenedor.getAll())
// console.log("Actualizando el id 3 con nuevo producto 4")
// contenedor.update(producto4,3)
// console.log(contenedor.getAll())
// console.log("Actualizando el id 1 con nuevo producto 5")
// contenedor.update(producto5,1)
// console.log(contenedor.getAll())
// console.log("Eliminando todos los objetos")
// contenedor.deleteAll()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.send("index.html");
});

app.use("/api/productos", routerProducto);

routerProducto.get("/", (req, res) => {
  let result = contenedor.getAll()  
  res.json(result);
});

routerProducto.get("/:id", (req, res) => {
  let id = parseInt(req.params.id)  
  let result = contenedor.getById(id) 
  res.json(result);
});

routerProducto.post("/",  (req, res) => {
    let {title, price, thumbnail}=req.body
    let producto={title,price,thumbnail}
    // console.log(producto)
    let newProducto=contenedor.save(producto)
    // https://flexiple.com/javascript/get-last-array-element-javascript/
    // console.log(producto.pop())
    res.json(newProducto)
});

// https://stackoverflow.com/questions/37763764/set-id-in-put-method-nodejs
// https://es.stackoverflow.com/questions/28012/c%C3%B3mo-agregar-m%C3%A9todo-put-y-delete

routerProducto.put("/:id", (req, res) => {
  let id = parseInt(req.params.id)
  // let a_cambiar = await contenedor.getById(id)
  // let result = await contenedor.getAll()
  // let pos=result.indexOf(a_cambiar)  
  let {title, price, thumbnail}=req.body
  let producto_c={title,price,thumbnail}
  contenedor.update(producto_c,id)
  let productos=contenedor.getAll()
  let i = productos.findIndex(item => item.id == id)
  if (i == -1) {
    return res.sendStatus(404)
  }
  let producto={ id: id, title, price, thumbnail}
  res.json(producto)
});

routerProducto.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id)
  let result = contenedor.deleteById(id)
  res.json(result);
});



app
  .listen(8080, () => {
    console.log("Server corriendo");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });

