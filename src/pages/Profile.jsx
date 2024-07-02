// src/pages/Profile.js

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faPen, faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Profile.css';

const Profile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        instagram: '',
        whatsapp: '',
        telegram: '',
        photoURL: '',
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [setUploading] = useState(false); // Asegúrate de definir setUploading

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, [currentUser]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await setDoc(doc(db, 'users', currentUser.uid), profile);
            updateUserProfile({ photoURL: profile.photoURL });
            alert('Profile updated successfully');
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile: ', error);
        }
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            setUploading(true);
            const file = e.target.files[0];
            const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);
            setProfile((prevProfile) => ({
                ...prevProfile,
                photoURL,
            }));
            setUploading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <section className='profile-container'>
                <div className="profile-header">
                    <div className="profile-pic-container">
                        <img src={profile.photoURL || '/path/to/default-avatar.png'} alt="Profile" className="profile-pic" />
                        {editing && (
                            <label className="profile-pic-edit">
                                <FontAwesomeIcon icon={faCamera} />
                                <input type="file" onChange={handleImageChange} hidden />
                            </label>
                        )}
                    </div>
                    <div>
                        <h2>{profile.firstName} {profile.lastName}</h2>
                        {editing ? (
                            <button className="btn-edit" onClick={handleSave}>Guardar cambios</button>
                        ) : (
                            <button className="btn-edit" onClick={() => setEditing(true)}>
                                <FontAwesomeIcon icon={faPen} /> Editar perfil
                            </button>
                        )}
                        <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /> Eliminar cuenta</button>
                    </div>
                </div>
                <div className="profile-details">
                    <h3>Detalles de {profile.firstName}</h3>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faUser} />
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faUser} />
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faPhone} />
                        <label>Número de teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faInstagram} />
                        <label>Instagram</label>
                        <input
                            type="text"
                            name="instagram"
                            value={profile.instagram}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faWhatsapp} />
                        <label>WhatsApp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            value={profile.whatsapp}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faTelegram} />
                        <label>Telegram</label>
                        <input
                            type="text"
                            name="telegram"
                            value={profile.telegram}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Profile;
