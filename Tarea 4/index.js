
const express = require('express');
const {Router} = express;
const multer = require('multer');
const fs = require('fs');




const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api', router)



class Contenedor {
    constructor(){
        this.productos = './productos.json';
        this.id = 1;
    }


    getApiAll(){

            
        try {
            let file = fs.readFileSync(this.productos, 'utf-8');
            let productosArray = JSON.parse(file)

            router.get('/productos', (req, res) => {
                
                res.send(productosArray)
            })


        }catch(err){
            console.log(err)
            res.status(500).send({Error: 'error del servidor'});
        }
    }

    
        
                
    getById(){

        router.get('/productos/:id', (req, res) => {

            try {
                let file = fs.readFileSync(this.productos, 'utf-8');
                let productosArray = JSON.parse(file);
    
                let id = req.params.id;
                let producto = productosArray.find(e => id == e.id );
                console.log(producto);

                if(producto === undefined) {
                    res.send('producto no encontrado');
                   
                }else{
                    res.send({
                   
                        producto: producto,
                        
                    })
                }
              

                

            }catch(err){
                res.status(500).send({Error: 'error del servidor'});
            }
           
        })

    }

    putById(){

        router.put('/productos/:id', (req, res) => {
            try{
              
               let id = req.params.id - 1;

               let jsonData = fs.readFileSync(this.productos);
               let data =  JSON.parse(jsonData);

               data[id]['title'] = req.body.title;
               data[id]['price'] = req.body.price;
               data[id]['foto'] = req.body.foto;

                fs.writeFileSync(this.productos, (JSON.stringify(data, null, 2)));

                res.json(data);
               
               
               
               
                // let file = fs.readFileSync(this.productos, 'utf-8');
                // let productosArray = JSON.parse(file);

                // let id = req.params.id;

                // let producto = productosArray.find(e => id ==e.id );
                // console.log(producto);

                // if(producto == undefined){
                //     res.send('producto no encontrado');
                // }else{
                //     res.status(200).json({
                //         producto
                        
                //         // id:req.params.id,
                //         // body: producto[req.body]
                //     })
                // }


            }catch(err){
                res.status(500).send({Error: 'error del servidor'});
            }
        })



    }

    postProductos(){

        router.post('/productos', (req, res) => {

            try{
                        // forma 1 /////
                // let nuevo = req.body;

                // let file =  fs.readFileSync(this.productos, 'utf-8');
                // productosArray = JSON.parse(file);

                // productosArray.push(nuevo);
                // let data = fs.writeFileSync(this.productos, JSON.stringify(productosArray, null, 2));

                // res.json(data);


                        // forma 2  /////

            //    let data = fs.writeFileSync(this.productos, JSON.stringify(this.productos))
            //     // let arrId = this.productos.map(e =>e.id);
            //     // let idmax = Math.max (...arrId);
            //     res.status(200).send(data)



                        // forma 3 /////

                let nuevoProduc = {
                    title: req.body.title,
                    price: req.body.price,
                    foto: req.body.foto,
                    
                }
    
                let data = fs.readFileSync(this.productos);
    
                // data = data.toString();
                let Data = JSON.parse(data);
    
                nuevoProduc.id = Data.length + 1;
                Data.push(nuevoProduc)
    
                fs.writeFileSync(__dirname + this.productos, JSON.stringify(Data, null, 2));
    
                return res.json(Data);

            }catch(err){
                res.status(404).send({Error: 'error'});

            }
        
        })

    }

        delete(){

            router.delete('/productos/:id', (req, res) => {

                try{
                     const {id} = req.params;
                     
                     const indexProducto = this.productos.find(producto => producto.id == id);

                     this.productos.splice(indexProducto, 1);

                     return res.send(indexProducto);
                    
                    // let newArr= [];
                    // let id = req.params.id;

                    // let jsonData = fs.readFileSync(this.productos);
                    // let data =  JSON.parse(jsonData);

                    // data[id] = req.body 

                    // fs.writeFileSync(this.Archivo, JSON.stringify(newArr, null, 2));
                    
                    // res.send(data);

                }catch(err){
                    res.status(500).send({Error: 'error del servidor'});

            }
    
            })
        }
}


const contenedor = new Contenedor()

// contenedor.getApiAll()
// contenedor.getById()
// contenedor.putById()
contenedor.postProductos();
contenedor.delete()



const server = app.listen(8080, () => {
    console.log('La aplicacion express esta escuchando');
});

server.on("Error", error => console.log(`Se tiene el siguiente error: ${error}`));



