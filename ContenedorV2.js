class ContenedorV2 {

    constructor()
    {
    this.producto=[]
    this.id=0
    }

    save= (producto)=>{
            let newProduct={
                id: ++this.id,
                ...producto
            }
            this.producto.push(newProduct)
            return newProduct
    }


    getById=(id)=>{
            let producto=this.producto.find(item => item.id == id)
            if (producto==undefined){
                console.log("Producto no encontrado")
            }
            else{
                return producto

            }
    }
  
    deleteById = (id) => {
            let largo_antes=this.producto.length
            // console.log(largo_antes)
            let i = this.producto.findIndex(item => item.id == id)
            if (i == -1) {
               console.log(`El id: ${id} no existe`)
            } else {
              return this.producto.splice(i,1)

            }
            // console.log(nuevo)
            // console.log(nuevo.length)
   
                       
    }

    deleteAll = () => {
           this.producto =[]
    }



    getAll=()=>{
        return [...this.producto]
    }


// title: "Escuadra",
//     price: 123.45,
//     thumbnail
//que el title del producto nuevo no sea igual al nombre de otro producto
//que el thumbnail no sea igual
//el precio puede ser igual
    update=(nuevo_producto, id)=> {
            let i = this.producto.findIndex(item => item.id == id)
            if (i == -1) {
               console.log(`El id: ${id} no existe`)
            } else {

                let producto1=this.producto.find(item => item.title == nuevo_producto.title)
                let producto2=this.producto.find(item => item.thumbnail == nuevo_producto.thumbnail)
                if (producto1==undefined & producto2==undefined){
                    this.producto[i].title = nuevo_producto.title
                    this.producto[i].price = nuevo_producto.price
                    this.producto[i].thumbnail=nuevo_producto.thumbnail
                    return {id:Number(id),...nuevo_producto}

                }
                else{
                    console.log("Hay otro producto con título y URL igual, actualizar con nuevo producto")
                } 
           }
    }


//  let producto_final=productos.splice(i, 1, producto_c)

  
 
     

}

module.exports = ContenedorV2