import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';
import PacketSlider from '../../components/sliders/PacketSlider';

const GroupLesson = (props) => {
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    GRUP DERSLERİ
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    ARKADAŞLARINLA BERABER, İSTEDİĞİN SALONDA, İSTEDİĞİN EĞİTMENDEN DERS ALMA FIRSATI
                </Title>
                <Text textAlign="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
                </Text>
            </Container>
            <PacketSlider/>
        </section>
    );
};

export default GroupLesson;