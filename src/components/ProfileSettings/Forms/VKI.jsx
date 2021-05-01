// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getVKI, setVKI } from 'actions';

const VKI = () => {
  const dispatch = useDispatch();
  const { vki } = useSelector((state) => state.profileSettings);
  const [data, setData] = useState({});
  const [result, setResult] = useState('');

  const actionGetData = () => {
    dispatch(
      getVKI(
        () => {},
        () => {
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  useEffect(() => {
    if (vki.isSuccess) {
      setResult(vki?.data?.vki);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setVKI(
        {
          weight: data.weight || vki.data.weight,
          height: data.height || vki.data.height,
        },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
          setData({});
          actionGetData();
        },
        () =>
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          })
      )
    );
  };

  useEffect(() => {
    actionGetData();
  }, [vki.isSuccess]);

  return (
    <section>
      {vki.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label="Boy (cm)"
            type="text"
            name="height"
            mask="999"
            defaultValue={vki?.data?.height}
            settings="current"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Material.TextField
            label="Ağırlık (kg)"
            type="text"
            mask="999"
            name="weight"
            defaultValue={vki?.data?.weight}
            settings="current"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Span>
            <b>VKI</b>: {vki?.data?.vki || result}
          </Span>
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text="KAYDET"
              fontSize="15px"
              color="blue"
              transparentDisabled={
                Object.keys(data).length === 0 ? true : false
              }
              disabled={Object.keys(data).length === 0 ? true : false}
              isLoading={vki.isLoading}
            />
          </Footer>
        </form>
      )}
    </section>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: -15px;
  margin-right: -15px;
`;

const Span = styled.span`
  display: flex;
  margin-top: 15px;
`;

export default VKI;
