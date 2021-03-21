import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Main from 'components/Main';
import Contact from 'components/Contact';
import JoinUs from 'assets/join-us.png';

const Info = () => {
  const history = useHistory();

  return (
    <Main>
      <div style={{ marginTop: 0 }} className="basic-info">
        <Container className="content">
          <Contact />
        </Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${JoinUs})`,
            height: 350,
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginTop: 25,
          }}
        >
          <span className="contact-header__footer-title">
            Başarmak İçin Sende Hemen Başla
          </span>
          <div
            className="contact-header__footer-button"
            onClick={() => history.push('/register')}
          >
            <span className="contact-header__footer-button-text">ÜYE OL</span>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Info;
