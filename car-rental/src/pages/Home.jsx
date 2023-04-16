import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import HeroSlider from "../components/UI/HeroSlider";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const Home = () => {
  return (
    <div>
      <Helmet title="Home">
        <section className="p-0 hero__slider-section">
          <HeroSlider />
        </section>

        {/* About section */}
        <AboutSection />

        {/* =========== car offer section ============= */}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">Tận hưởng</h6>
                <h2 className="section__title">Các dòng Porche</h2>
              </Col>

              {carData.slice(0, 6).map((item) => (
                <CarItem item={item} key={item.id} />
              ))}
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};
export default Home;
