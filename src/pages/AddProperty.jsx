// src/pages/AddProperty.jsx

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/AddProperty.css';

const AddProperty = () => {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [spaces, setSpaces] = useState('');
    const [services, setServices] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleServiceChange = (service) => {
        setServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleAmenityChange = (amenity) => {
        setAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !description || !price || !spaces || !imageFile) {
            setError('Please fill out all fields and upload an image.');
            return;
        }

        try {
            const imageRef = ref(storage, `propertyImages/${currentUser.uid}/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'properties'), {
                title,
                description,
                price,
                spaces,
                services,
                amenities,
                imageUrl,
                userId: currentUser.uid,
            });

            setTitle('');
            setDescription('');
            setPrice('');
            setSpaces('');
            setServices([]);
            setAmenities([]);
            setImageFile(null);
            setSuccess('Property added successfully!');
        } catch (error) {
            setError('Error adding property: ' + error.message);
        }
    };

    return (
        <div className="add-property-container">
            <h2>Detalles de la propiedad </h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div className="container-price-space">
                    <section>
                        <label>Precio</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </section>
                    <section>
                        <label>Espacios</label>
                        <input
                            type="number"
                            value={spaces}
                            onChange={(e) => setSpaces(e.target.value)}
                            required
                        />
                    </section>

                </div>

                <label>Imagen</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                />

                <div>
                    <h3>Servicios</h3>
                    {['Wi-Fi', 'Café y té', 'Agua filtrada', 'Recepción', 'Servicio de impresión'].map((service) => (
                        <label key={service}>
                            <input
                                type="checkbox"
                                checked={services.includes(service)}
                                onChange={() => handleServiceChange(service)}
                            />
                            {service}
                        </label>
                    ))}
                </div>

                <div>
                    <h3>Servicios</h3>
                    {['Baño', 'Ducha', 'Cocina', 'Aire acondicionado', 'Calefacción'].map((amenity) => (
                        <label key={amenity}>
                            <input
                                type="checkbox"
                                checked={amenities.includes(amenity)}
                                onChange={() => handleAmenityChange(amenity)}
                            />
                            {amenity}
                        </label>
                    ))}
                </div>

                <button type="submit">Añadir propiedad</button>
            </form>
        </div>
    );
};

export default AddProperty;