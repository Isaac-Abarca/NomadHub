import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faPen, faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import USER from '../assets/user.png';
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
    // eslint-disable-next-line no-unused-vars
    const [uploading, setUploading] = useState(false);

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
            <section className="profile-container">
                <div className="profile-header">
                    <div className="profile-pic-container">
                        <img 
                            src={profile.photoURL || USER} 
                            alt="Profile" 
                            className="profile-pic" 
                        />
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
                        <label>Nombre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} />
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Apellidos</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} />
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Correo electrónico</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Número de teléfono</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faPhone} />
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Instagram</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faInstagram} />
                            <input
                                type="text"
                                name="instagram"
                                value={profile.instagram}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>WhatsApp</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faWhatsapp} />
                            <input
                                type="text"
                                name="whatsapp"
                                value={profile.whatsapp}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Telegram</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faTelegram} />
                            <input
                                type="text"
                                name="telegram"
                                value={profile.telegram}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
