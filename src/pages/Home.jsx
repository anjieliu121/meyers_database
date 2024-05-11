import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/App.css";

const Home = () => {
  return (
      <div>
          <div className="container text-center bg-white rounded">
              <h1>Meyers Database</h1>
              <figure>
                  <blockquote className="blockquote">
                      <p>Offers descriptions and interactive visualizations of data utilized in scenario hubs,
                          forecasts, or
                          other scientific projects.</p>
                  </blockquote>
              </figure>
          </div>
          <div className="container text-center bg-white rounded">
              <h3>Contact Us</h3>
              <a href="http://www.bio.utexas.edu/research/meyers/">
                  <img className="img-responsive" src="src/static/MeyersLab.png"/>
              </a>
          </div>
      </div>


  )
      ;
}

export default Home;