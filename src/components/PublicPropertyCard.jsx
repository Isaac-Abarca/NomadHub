import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/PublicPropertyCard.css';
import { HiArrowsPointingOut } from "react-icons/hi2";

const PublicPropertyCard = ({ property }) => {
    return (
        <div className="public-card">
            <div className="public-image" style={{ backgroundImage: `url(${property.imageUrl})` }}>
                <div className="public-actions">
                    <Link to={`/property/${property.id}`}>
                        <button className="public-action-button">
                            <HiArrowsPointingOut />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="public-details">
                <p className="public-title">{property.title}</p>
                <p className="public-price">${property.price}/hr · {property.spaces} espacios</p>
            </div>
        </div>
    );
};

PublicPropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
};

export default PublicPropertyCard;
