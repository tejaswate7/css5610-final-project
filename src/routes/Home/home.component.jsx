
import Directory from "../../components/directory/directory.component";
const Home = () => {
    const categories = [
        {
            id: 1,
            title:'Grill 23 and Bar',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvenue-media.eventup.com%2Fresized%2Fvenue%2Fgrill-23-and-bar%2F2731.1920x1080.jpg&f=1&nofb=1&ipt=c3dcb3821e111728b2544e586d677b712bcfeea26cbb4590a8c1ede65f69aae8&ipo=images'

        },
        {
            id: 2,
            title:'Ostra',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F08%2F53%2Fad%2F66%2Fthe-dining-room-at-ostra.jpg&f=1&nofb=1&ipt=5ce06943f5d3ec458ae1f8aedfbfc9012a0368e44be2d4a5c0dc83958786f5a0&ipo=images'

        }
    ]
    return (
        <div>
            <h2>
                <div className="text-center mb-4">
                    Welcome to TTR - Your favourite place to check out and rate dishes from restaurants
                </div>
            </h2>
            <p className="text-center">TTL is a website that helps you rate dishes that you have eaten at your favourite restaurants in Boston. It helps patrons choose the best dishes next time when you order at your favourite restaurants. Explore different restaurants and the wide variety of dishes they have to offer the next time you go there right here on TTR.</p>
            <Directory categories={categories}/>
        </div>
    );
}

export default Home;
