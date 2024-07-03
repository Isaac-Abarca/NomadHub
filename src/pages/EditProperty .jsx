import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../styles/AddProperty.css';

const EditProperty = () => {
    const { id } = useParams();
    const location = useLocation();
    const [property, setProperty] = useState(location.state?.property || {});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            if (!location.state?.property) {
                const docRef = doc(db, 'properties', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProperty(docSnap.data());
                }
            }
        };

        fetchProperty();
    }, [id, location.state?.property]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProperty((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docRef = doc(db, 'properties', id);
        await updateDoc(docRef, property);
        navigate('/host/listings');
    };

    return (
        <div className="add-property-container">
            <h2>Modificar Propiedad</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre propiedad
                    <input type="text" name="title" value={property.title || ''} onChange={handleChange} required />
                </label>
                <label>
                    Descripción
                    <textarea name="description" value={property.description || ''} onChange={handleChange} required />
                </label>
                <div className="container-price-space">
                    <label>
                        Precio por hora
                        <input type="number" name="price" value={property.price || ''} onChange={handleChange} required />
                    </label>
                    <label>
                        Número de espacios de trabajo
                        <input type="number" name="spaces" value={property.spaces || ''} onChange={handleChange} required />
                    </label>
                </div>
                <label>
                    URL de la imagen
                    <input type="text" name="imageUrl" value={property.imageUrl || ''} onChange={handleChange} required />
                </label>
                <div className="checkbox-group">
                    <p>¿Qué servicios ofreces?</p>
                    <label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={property.wifi || false}
                            onChange={handleCheckboxChange}
                        />
                        Wi-Fi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="coffeeTea"
                            checked={property.coffeeTea || false}
                            onChange={handleCheckboxChange}
                        />
                        Café y té
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="filteredWater"
                            checked={property.filteredWater || false}
                            onChange={handleCheckboxChange}
                        />
                        Agua filtrada
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="reception"
                            checked={property.reception || false}
                            onChange={handleCheckboxChange}
                        />
                        Recepción
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="printingService"
                            checked={property.printingService || false}
                            onChange={handleCheckboxChange}
                        />
                        Servicio de impresión
                    </label>
                </div>
                <div className="checkbox-group">
                    <p>¿Qué comodidades ofreces?</p>
                    <label>
                        <input
                            type="checkbox"
                            name="bathroom"
                            checked={property.bathroom || false}
                            onChange={handleCheckboxChange}
                        />
                        Baño
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="shower"
                            checked={property.shower || false}
                            onChange={handleCheckboxChange}
                        />
                        Ducha
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="kitchen"
                            checked={property.kitchen || false}
                            onChange={handleCheckboxChange}
                        />
                        Cocina
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="airConditioning"
                            checked={property.airConditioning || false}
                            onChange={handleCheckboxChange}
                        />
                        Aire acondicionado
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="heating"
                            checked={property.heating || false}
                            onChange={handleCheckboxChange}
                        />
                        Calefacción
                    </label>
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditProperty;

