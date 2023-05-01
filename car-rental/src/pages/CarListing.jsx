import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";
import carsApi from "../api/carsApi";
import modelsApi from "../api/modelsApi";
import Helmet from "../components/Helmet/Helmet";
import CarItem from "../components/UI/CarItem";
import CommonSection from "../components/UI/CommonSection";

const CarListing = () => {
  const { slug } = useParams();

  // State
  const [carList, setCarList] = useState([]);
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({
    PageSize: 10,
    PageNumber: 1,
    SortColumn: "Name",
    SortOrder: "ASC",
  });

  const [keyword, setKeyword] = useState("");

  // Effect
  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        let data = [];
        if (slug) {
          data = await modelsApi.getCarByModelSlug(slug, filters);
        } else {
          data = await carsApi.getAll(filters);
        }
        const response = await modelsApi.getAll();
        const models = response.result.map((item, index) => {
          return {
            id: item.id,
            name: item.name,
            urlSlug: item.urlSlug,
          };
        });

        setModels(models);
        setCarList(data.result.items);
      } catch (error) {}
    })();
  }, [filters, slug]);

  const handleChange = (e) => {
    let sortOrder = e.target.value;
    let sortColumn = "Price";
    if (!sortOrder) {
      sortColumn = "Name";
      sortOrder = "ASC";
    }

    setFilters({ ...filters, SortColumn: sortColumn, SortOrder: sortOrder });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({ ...filters, Keyword: keyword });
    setKeyword("");
  };

  const handleModelChange = (e) => {
    if (!e.target.value) {
      setFilters({ ...filters });
      return;
    }
    const slug = e.target.value;

    (async () => {
      const data = await modelsApi.getCarByModelSlug(slug, {
        PageSize: 100,
        PageNumber: 1,
      });
      setCarList(data.result.items);
    })();
  };

  return (
    <Helmet title="Cars">
      {slug ? (
        <CommonSection title={`${slug}`} />
      ) : (
        <CommonSection title="Danh sách xe" />
      )}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sắp xếp theo
                </span>

                <select
                  style={{ width: "150px" }}
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value=""> A-Z </option>
                  <option value="ASC">Thấp đến cao</option>
                  <option value="DESC">Cao đến thấp</option>
                </select>

                <span className="d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i> Dòng xe
                </span>
                <select
                  title="Dòng xe"
                  name="authorId"
                  style={{ width: "150px" }}
                  className="form-select"
                  onChange={handleModelChange}
                  value={slug ? slug : ""}
                >
                  <option value="">Tất cả</option>
                  {models.map((item) => (
                    <option key={item.id} value={item.urlSlug}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <div className="form-control">
                      <input
                        style={{ outline: "none", border: "none" }}
                        type="text"
                        placeholder="Tìm kiếm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-sm">
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                </form>
              </div>
            </Col>

            {carList.length > 0 ? (
              carList.map((item, index) => (
                <CarItem item={item} key={item.id} />
              ))
            ) : (
              <h2 className="section__title py-5">Không tìm thấy sản phẩm</h2>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
