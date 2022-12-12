import {Link} from "react-router-dom";

const Restaurant = ({rid, restaurants}) => {
    return(
        <div className="fw-bold">
            <Link to={`/restaurant/${rid}/search`}>
                {restaurants.filter(curr_rest => curr_rest.id === rid).map(filteredPerson => (
                    <div>
                        {filteredPerson.title}
                        <img src={filteredPerson.imageUrl} className="float-start me-4" height="100px" width="100px"/>
                    </div>

                ))}
            </Link>
        </div>
    )
}

export default Restaurant