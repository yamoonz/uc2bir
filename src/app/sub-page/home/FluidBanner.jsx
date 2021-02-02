import React from 'react';
// @ts-ignore
import { default as NativeFluidBanner } from '../../../components/banner/fluid-banner';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/text';

// @ts-ignore
import backgroundImage from '../../../statics/background/images/fluid-banner.jpg';
import { Container } from 'react-bootstrap';
import Button from '../../../components/buttons/button';

const FluidBanner = (props) => {
  return (
    <NativeFluidBanner
      className={props.className}
      backgroundImage={backgroundImage}
      fixed
    >
      <Container>
        <Text textAlign="center">
          <Title
            white
            variant="h5"
            component="h5"
            style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}
            lineDisable
          >
            İSTEDİĞİN EĞİTMEN İLE İSTEDİĞİN SALONDA HEMEN DERSLERE BAŞLA
          </Title>
          <Text textAlign="center" color="white" fontSize="18px">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation
          </Text>
          <Button text="REZERVAZYON YAP" soft />
        </Text>
      </Container>
    </NativeFluidBanner>
  );
};

export default FluidBanner;