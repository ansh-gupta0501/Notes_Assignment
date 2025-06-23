import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {id : 1 , name: "Mobile",price: 20000},
        {id : 2 , name: "laptop",price: 80000},
        {id : 3 , name: "tablet",price: 40000}

    ]

    getAllProducts(){
        return this.products;
    }

    getProductById(id: number){
        return this.products.find((product)=>{
            return product.id === id
        })
    }

}
