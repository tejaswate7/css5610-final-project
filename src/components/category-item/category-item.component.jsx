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
            <div onClick={() => navigate(`restaurant/${id}/search`)} className="category-body-container">
                <h2>{title}</h2>
            </div>
        </div>
    )

}

export default CategoryItem;