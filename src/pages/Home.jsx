import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/App.css";
import "../css/Home.css";

const Home = () => {
  return (
      <div className="page-container">
          <div className="home">
              <h1>Meyers Database</h1>
              <p>Offers descriptions and interactive visualizations of data utilized in scenario hubs, forecasts, or other scientific projects.</p>
              <div className="home-btns">
                  {/*TODO: add aligned buttons of "Explore (link to the first data visualization)", "Contact", and "Share Data"*/}
              </div>
          </div>
      </div>


  )
      ;
}

export default Home;