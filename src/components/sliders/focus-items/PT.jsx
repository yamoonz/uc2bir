import React from 'react';

import Title from '../../../components/typography/Titles';
import Text from '../../../components/typography/Text';
import AwesomeIcon from '../../statics/icon';
import Button from '../../../components/buttons/button';
import IconLabel from '../../../components/buttons/icon-label';

const PT = ({ top = false, bottom = false, val }) => {
  return (
    <>
      {top && (
        <div className="slider-item">
          <div
            className="img"
            style={{
              backgroundImage: `url(${val.image?.default})`,
            }}
          >
            <ul className="points">
              <li className={`${val.stars > 0 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 1 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 2 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 3 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 4 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
            </ul>
            <div className="team">{val.team}</div>
          </div>
        </div>
      )}
      {bottom && (
        <div className="slider-item">
          <div className="slider-item-content">
            <Title
              textAlign="left"
              lineDisable
              variant="h5"
              component="h5"
              children={val.name}
            />
            <Title
              lineDisable
              color="gray3"
              fontWeight="normal"
              textAlign="left"
              variant="h6"
              component="h6"
              children={val.category}
            />
            <Title textAlign="left" variant="h4" component="h4">
              <span>
                {val.price} <AwesomeIcon.Tl />
              </span>
            </Title>
            <Text fontSize="16px" color="gray2" children={val.content} />
            <ul className="slick-button-group row">
              <li>
                <Button text="Meditasyon" />
              </li>
              <li>
                <Button text="Plates" />
              </li>
              <li>
                <Button text="Fitnes" />
              </li>
            </ul>
            <div style={{ width: '100%', margin: '15px 0' }}>
              <IconLabel text={val.location} icon={AwesomeIcon.Map} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PT;
