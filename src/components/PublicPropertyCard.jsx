import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/PublicPropertyCard.css';
import { HiArrowsPointingOut } from "react-icons/hi2";

const PublicPropertyCard = ({ property }) => {
    return (
        <div className="public-property-card">
            <div className="public-property-image" style={{ backgroundImage: `url(${property.imageUrl})` }}>
                <div className="public-property-actions">
                    <Link to={`/property/${property.id}`}>
                        <button className="action-button">
                            <HiArrowsPointingOut />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="public-property-details">
                <p className="public-property-title">{property.title}</p>
                <p className="public-property-price">${property.price}/hr · {property.spaces} espacios</p>
            </div>
        </div>
    );
};

PublicPropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
};

export default PublicPropertyCard;
