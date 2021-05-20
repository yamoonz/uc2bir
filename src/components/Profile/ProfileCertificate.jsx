import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Certificate } from 'components';
import { getUserCertificate } from 'actions';

export default function ProfileCertificate({ userId }) {
  const dispatch = useDispatch();
  const { certificate } = useSelector((state) => state.userProfile.certificate);

  useEffect(() => {
    dispatch(getUserCertificate(userId));
  }, []);
  
  return certificate.length > 0 ? (
    certificate?.map((data, index) => (
      <Certificate
        key={index}
        fileText={data.name}
        isOdd={(index + 1) % 2}
        path={data?.path}
      />
    ))
  ) : (
    <div className="d-flex">
      <strong className="mx-auto">
        İş Yerine kayıtlı herhangi bir sertifika bulunmamaktadır.
      </strong>
    </div>
  );
}
