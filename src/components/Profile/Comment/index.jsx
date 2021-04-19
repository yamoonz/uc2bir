import React, { useEffect } from 'react';

import Comment from '../../Comment';
import BluePlusIcon from 'assets/blue-plus.svg';
import { useDispatch } from 'react-redux';
import { getUserComment } from 'actions';

const mockData = [
  {
    name: 'Furkan Onbaşılar',
    date: '3 hafta önce',
    comment: 'Çok güzel bir yer herkese öneririm',
    rating: 5,
    photo: BluePlusIcon,
  },
  {
    name: 'Amir Gevelek',
    date: '1 saat önce',
    comment:
      'Fena değildi İstanbulda eve yakın bulmak zor o açıdan benim için iyi oldu.',
    rating: 4,
    photo: BluePlusIcon,
  },
  {
    name: 'Samet Özyeğin',
    date: '1 hafta önce',
    comment:
      'Çok güzel bir yer herkese öneririm. Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    rating: 5,
    photo: BluePlusIcon,
  },
];
 const ProfileComment = ({ userId }) => {
   const dispatch = useDispatch();
   // const { branches: branchList } = useSelector(
   //   (state) => state.userProfile.branch
   // );

   useEffect(() => {
     dispatch(getUserComment(userId));
   }, []);
  return (
    <div>
      {mockData.map((comment, index) => (
        <Comment
          index={index}
          key={index + comment.rating}
          rating={comment.rating}
          name={comment.name}
          date={comment.date}
          comment={comment.comment}
          photo={comment.photo}
        />
      ))}
    </div>
  );
}

export default ProfileComment;
