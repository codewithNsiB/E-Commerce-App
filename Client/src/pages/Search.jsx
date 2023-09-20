import { useEffect, useState } from "react";
import { PageLayout, ProductCard } from "../components";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../utils/Loader";
import { searchProduct } from "../config/api";

export default function Search() {
  const query = new URLSearchParams(location.search);
  const queryParams = query.get("q");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(queryParams);
  console.log("g", searchResult);

  useEffect(() => {
    document.title = `Search result for "${queryParams}"`;
    const delayDebounceFn = setTimeout(() => {
      const searchRequest = async () => {
        setLoading(true);
        try {
          const res = await searchProduct(queryParams);
          setSearchResult(res.data);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      searchRequest();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (queryParams) {
      params.append("q", queryParams);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() });
  }, [queryParams, navigate]);
  
  error && <p className="mt-5 fs-5">{error.mesage} clas</p>;
  return (
    <PageLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between mt-4 m-4">
        <span className="fw-bold fs-4">Products</span>
        <span className="align-baseline fs-4">
          showing result(s) for &quot;<b> {queryParams} &quot;</b>
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row className="gy-4 mt-4">
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((product) => (
                <Col key={product._id} xs={6} md={4}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </>
          ) : (
            <h1 className="fs-5 text-center">
              We could not find anything matching your search query
            </h1>
          )}
        </Row>
      )}
    </PageLayout>
  );
}
