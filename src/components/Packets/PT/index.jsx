import React, { useState } from 'react';

import Home from './Home';
import EditLesson from './EditLesson';
import Exercises from './Exercises';
import ExerciseDetail from './ExerciseDetail';

const PT = ({ icons, setBannerActive }) => {
  const [page, setPage] = useState('Home');
  const [packageData, setPackageData] = useState();

  switch (page) {
    case 'Home':
      return (
        <Home
          packageData={(data)=> setPackageData(data)}
          setPage={setPage}
        />
      );

    case 'EditLesson':
      return (
        <div>
          <EditLesson
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
            packageData={packageData}
          />
        </div>
      );
    case 'Exercises':
      return (
        <div>
          <Exercises
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
          />
        </div>
      );
    case 'ExerciseDetail':
      return (
        <div>
          <ExerciseDetail
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
          />
        </div>
      );

    default:
      return <></>;
  }
};

export default PT;
