const fs = require('fs');


const producto1 = {title: 'calculadora', price: 232, foto: 'https://www.google.cl/'};
const producto2 = {title: 'cuaderno', price: 123, foto: 'https://www.google.cl/'};
const producto3 = {title: 'lapiz', price: 50, foto: 'https://www.google.cl/'};

class Contenedor {
    constructor(){
        this.Archivo = './productos.json'
        this.id = 1
    }

    save(objetos) {
        objetos.id = this.id++
        let productosArray= [];

        try{

            let file =  fs.readFileSync(this.Archivo, 'utf-8');
            productosArray = JSON.parse(file);

        }catch(e){
            console.log('no existe el archivo')
        }

        productosArray.push(objetos);
        fs.writeFileSync(this.Archivo, JSON.stringify(productosArray, null, 2));
        
    }


    getById(id){
        
        try {
            let file = fs.readFileSync(this.Archivo, 'utf-8');
            let productosArray = JSON.parse(file)
            
            const productos = productosArray.find(pro => pro.id === id);
            console.log(productos)
            

        }catch(e){
            console.log(e);
        }
      
    }

    getAll(){

        try {
            let file = fs.readFileSync(this.Archivo, 'utf-8');
            let productosArray = JSON.parse(file)
            console.log(productosArray);

    }catch(e){
        console.log(e);
    }
}

    deleteById(id){

        let num = id - 1

        try{
            let file = fs.readFileSync(this.Archivo, 'utf-8');
            let productosArray = JSON.parse(file)

            productosArray.splice(num, 1,)

            console.log(productosArray)
                
            fs.writeFileSync(this.Archivo, JSON.stringify(productosArray, null, 2));
            


        }catch(e){
            console.log(e);
        }
    }


    deleteAll(){
        try{
            fs.writeFileSync(this.Archivo, '')
            console.log('Borrado')
        }catch(e){
            console.log(e);
        }
    }

    getAllRandom(){
        

        try {
            let file = fs.readFileSync(this.Archivo, 'utf-8');
            let productosArray = JSON.parse(file)

            let randomValue = productosArray[Math.floor(productosArray.length * Math.random())]
            return randomValue
            // function random(min, max) {
            //     return Math.floor((Math.random() * (max - min + 1)) + min);
            // }
            

        }catch(e){
            console.log(e);
        }
        

    }

}

let contenedor = new Contenedor()

// contenedor.save(producto1)
// contenedor.save(producto2)
// contenedor.save(producto3)

// console.log(contenedor.getById(3))
// console.log(contenedor.getAll())
// console.log(contenedor.deleteById(2))
// console.log(contenedor.deleteAll())
console.log(contenedor.getAllRandom())