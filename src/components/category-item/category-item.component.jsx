import './category-item.styles.scss'
import {useNavigate} from "react-router-dom";

const CategoryItem = ({ category }) => {
    const navigate = useNavigate();
    const { imageUrl, title, id } = category
    return (
        <div key={id} className="category-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div onClick={() => navigate("/search")} className="category-body-container">
                <h2>{title}</h2>
                <p>Explore Now</p>
            </div>
        </div>
    )

}

export default CategoryItem;