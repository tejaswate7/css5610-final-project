import './category-item.styles.scss'
import {useNavigate} from "react-router-dom";

const CategoryItem = ({ category }) => {
    const navigate = useNavigate();
    const { imageUrl, title, id } = category
    return (
        <div key={id} className="category-container text-wrap position-relative">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div onClick={() => navigate(`restaurant/${id}/search`)} className="category-body-container text-wrap">
                <h2 className="text-center">{title}</h2>
            </div>
        </div>
    )

}

export default CategoryItem;