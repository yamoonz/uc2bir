import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import LongUserCard from 'components/UserCards/LongUserCard';
import {
  Button,
  GoogleMapClusterer,
  Pagination,
  BackLink,
  Text,
  LocationInput,
} from 'components';
import { searchProffesional } from 'actions';
import Filter from './SearchFilters';

const SearchProfessional = () => {
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const { totalPage, data, totalData } = useSelector(
    (state) => state.searchProfessional.listInfo
  );

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState(undefined);

  const [ratings, setRatings] = useState([]);
  const [classification, setClassification] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = queryString.parse(useLocation().search);

  const { type } = searchParams || 'pt';

  let userTypeText;
  const sortingStates = [
    { id: 'asc', name: 'Fiyat Artan' },
    { id: 'desc', name: 'Fiyat Azalan' },
  ];
  switch (type) {
    case 'gym':
      userTypeText = 'Salon';
      break;
    case 'pt':
      userTypeText = 'Eğitmen';
      break;
    case 'dt':
      userTypeText = 'Diyetisyen';
      break;
    case 'map':
      userTypeText = 'Harita';
    default:
      break;
  }

  useEffect(() => {
    const {
      title,
      location,
      branch,
      page = 1,
      price = '[0, 1000]',
      ratings = '[]',
      classification,
    } = searchParams;

    // Parsing this because it is coming string from url such as '[0, 1000]'
    const parsedPrice = JSON.parse(price);
    const parsedRatings = JSON.parse(ratings);

    setTitle(title);
    setLocation(location);
    setBranch(branch);
    setPage(page);
    setPrice(parsedPrice);
    setRatings(parsedRatings);
    setClassification(classification);

    dispatch(
      searchProffesional({
        title,
        ratings: parsedRatings,
        minPrice: parsedPrice?.[0],
        maxPrice: parsedPrice?.[1],
        // TODO: take it from sorting state
        sortBy: sortBy,
        branch,
        location,
        type,
        page,
        classification,
      })
    );
  }, [window.location.href]);

  const linkChangeHandler = (pageNumber) => {
    let url = `/find?type=${type}`;

    const formData = {
      title,
      location,
      branch,
      page: pageNumber,
      price,
      ratings,
      classification,
      sortBy,
    };

    url = Object.keys(formData).reduce((acc, curr) => {
      if (formData[curr]) {
        if (Array.isArray(formData[curr])) {
          if (formData[curr].length) {
            return acc + `&${curr}=${JSON.stringify(formData[curr])}`;
          } else {
            return acc;
          }
        } else {
          return acc + `&${curr}=${formData[curr]}`;
        }
      }

      return acc;
    }, url);

    history.push(url);
  };

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);

    linkChangeHandler(pageNumber);
  };

  return (
    <div className="mb-5 p-3">
      <Container className="mb-5 d-flex flex-column">
        <BackLink path="/" text={`${userTypeText} Arayın`} />

        <Text mb="15px">
          {userTypeText} için {totalData} sonuç listeleniyor.
        </Text>

        <SearchWrapper className="d-flex mb-3 mx-auto">
          <Row className="search-trainer__search-area">
            <SearchCol>
              <input
                className="search-trainer__search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${userTypeText} Adı...`}
              />
            </SearchCol>

            <SearchCol>
              <LocationInput
                defaultValue={location}
                onChange={(e) => {
                  setLocation(e);
                }}
                placeholder="Lokasyon..."
              />
            </SearchCol>

            {type === 'pt' && (
              <SearchCol>
                <Form.Control
                  as="select"
                  className="search-trainer__select"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option hidden>Branşlar</option>
                  {allBranchList.map((item, index) => (
                    <option key={'option' + index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </SearchCol>
            )}
            <SearchCol>
              <Form.Control
                as="select"
                className="search-trainer__select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  linkChangeHandler(page);
                }}
              >
                <option hidden>Sıralama</option>
                {sortingStates.map((item, index) => (
                  <option key={'option' + index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </SearchCol>
            <SearchCol>
              <FilterButton onClick={() => setShowFilters(!showFilters)}>
                Filtrele
              </FilterButton>

              {showFilters && (
                <Filter
                  type={type}
                  setShowFilters={setShowFilters}
                  page={page}
                  classification={classification}
                  setClassification={setClassification}
                  ratings={ratings}
                  setRatings={setRatings}
                  price={price}
                  setPrice={setPrice}
                  linkChangeHandler={linkChangeHandler}
                />
              )}
            </SearchCol>

            <SearchCol className="pr-0">
              <Button
                justifyContent="space-around"
                display="flex"
                className="blue w-100 ml-md-auto"
                alignItems="center"
                text="Ara"
                search
                width="100%"
                maxWidth="200px"
                onClick={() => linkChangeHandler(page)}
              />
            </SearchCol>
          </Row>
        </SearchWrapper>

        {data && <GoogleMapClusterer data={data} />}

        {data?.length > 0 ? (
          <>
            <GymListWrapper>
              {data?.map((professional) => (
                <LongUserCard
                  favoritedUser={professional?.has_favorite_count > 0}
                  favoriteId={professional?.user_id}
                  showHeartBg
                  key={professional?.id || professional?.user_id}
                  data={professional}
                  city={professional?.city}
                  district={professional?.district}
                />
              ))}
            </GymListWrapper>

            <div className="d-flex w-100 mt-3">
              <Pagination
                className="mx-auto"
                mt="50px"
                count={totalPage}
                page={page}
                onChange={handleChangePage}
              />
            </div>
          </>
        ) : (
          <strong className="mt-3">Arama türüne uygun sonuç bulunamadı.</strong>
        )}
      </Container>
    </div>
  );
};

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 10%;
`;

const SearchWrapper = styled.div`
  width: 100%;

  @media ${device.sm} {
    width: 100%;

    ${SearchCol} {
      flex-basis: 100%;
      border-right: unset;
      margin-bottom: 20px;
    }
  }

  @media ${device.md} {
    width: 100%;
  }
`;

const GymListWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 300px 300px 300px 300px;
  grid-row-gap: 20px;
  padding: 10px;
  margin-top: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;

const FilterButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
  z-index: 2;
  width: 40px;
`;

export default SearchProfessional;
