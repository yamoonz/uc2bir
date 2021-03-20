import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames'

import {Title, DefBackground, Svg} from 'components';

const Categories = ({className,background,children}) => {
  return (
    <section  className={cx('categories', { [`${className}`]: className } )}>
      {background && (
        <div
          className="background-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container>
        <Title variant="h5" component="h5" lineDisable={false}  >
          Tarzını Seç, Hemen Kategorilere Göz At
        </Title>
        <div className="over-flow-y-auto">
          <ul>
            {Svg.Categories.map((val, key) => (
              <li className="col-4 col-xl col-lg col-md-2 col-sm-3" key={key}>
                <a title={val.name} href={val.link}>
                  {val.svg({ className: 'category-svg' })}{' '}
                  <span>{val.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </Container>
    </section>
  );
};

export default Categories;
