import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creacion del context:
export const ProductContext = createContext() // al context lo voy a importar en productsContainer.jsx


// el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// al provider lo voy a importar en App.jsx
//children es lo que se va a renderizar dentro del provider, es una palabra reservada
export const ProducProvider = ({ children }) => {
    const[products, setProducts]= useState([]); 
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_URL = 'http://localhost:3000/productos';

    const getProducts = async () => {   
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setProducts(response.data.data);
            console.log("response getProducts", response.data.data); //axios me devuelve los datos en .data
        }catch (error) {
            setError(error.message);
            console.error("axios GET error:", error);
        } finally {
            setLoading(false);
        }   
    }
    
    useEffect(() => {
        getProducts()
    }
    , [])
    
    //crear un producto
    const createProduct = async (value) => {
        try {
            setLoading(true);
            const response = await axios.post(API_URL, value); 
            console.log("response createProduct", response.data);
            await getProducts(); // Actualiza la lista de productos después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios POST error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // editar un producto
    const editProduct = async (values) => {
        if(!editingProduct) return; // Si no hay un producto en edición, no hacemos nada
        try {
            setLoading(true);
            await axios.put(`${API_URL}/${editingProduct.id}`, values);
            setEditingProduct(null); // Resetear el producto en edición
            await getProducts(); // Actualiza la lista de productos después de editar uno
        } catch (error) { 
            setError(error.message);
            console.error("Axios PUT error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // eliminar un producto
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            console.log("response deleteProduct", id);
            await getProducts(); // Actualiza la lista de productos luego de eliminar uno
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios DELETE error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return (
        <ProductContext.Provider 
            value={{
                products, 
                getProducts, 
                createProduct, 
                loading, 
                setLoading, 
                editProduct, 
                error, 
                setError, 
                editingProduct, 
                setEditingProduct, 
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}