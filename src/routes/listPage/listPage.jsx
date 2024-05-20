import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

function ListPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // Properties state
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties list
  const fetchProperties = async (page = currentPage) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/properties/?page=${page}`);
      setProperties(response.data);
      setCurrentPage(response.data.meta.current_page);
      setTotalPage(response.data.meta.last_page);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pagination function (handlePageChange)
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchProperties(newPage);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {loading && <h3 className="text-center"> <Spinner aria-label="Extra large spinner example text-center" size="xl" /></h3>}
          {properties.data && properties.data.map(property => (
            <Card key={property.id} property={property} />
          ))}
          {error && <div className="error">{error}</div>}
          <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} size="large" showFirstButton showLastButton color="primary" />
        </div>
      </div>
      <div className="mapContainer">
        <Map items={properties.data} />
      </div>
    </div>
  );
}

export default ListPage;
