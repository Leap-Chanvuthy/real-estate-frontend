// import { useEffect } from 'react';
// import { Crisp } from "crisp-sdk-web";
// import { useSelector } from 'react-redux';

// function CrispChat() {
//   const { currentUser } = useSelector((state) => state.auth);
//   const user = currentUser?.user;

//   useEffect(() => {
//     Crisp.configure('ec132e50-f8a7-4e50-b8e5-14d28fcd6e8f', {});

//     if (user) {
//       Crisp.user.setEmail(user.email || "john.doe@gmail.com");
//       Crisp.user.setNickname(user.name || "John Doe");

//       Crisp.session.setData({
//         user_id: user.id,
//         plan: "free"
//       });
//     } else {
//       Crisp.user.setEmail("john.doe@gmail.com");
//       Crisp.user.setNickname("John Doe");
//       Crisp.session.setData({
//         user_id: "anonymous", 
//         plan: "free"
//       });
//     }
//   }, [user]);

//   return null;
// }

// export default CrispChat;



import { useEffect, useState } from 'react';
import { Crisp } from "crisp-sdk-web";
import { useSelector } from 'react-redux';

function CrispChat() {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.user;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    Crisp.configure('ec132e50-f8a7-4e50-b8e5-14d28fcd6e8f', {
      autoload : true
    });

    if (user) {
      Crisp.user.setEmail(user.email || "john.doe@gmail.com");
      Crisp.user.setNickname(user.name || "John Doe");

      Crisp.session.setData({
        user_id: user.id,
        plan: "free"
      });
    } else {
      setOpenSnackbar(true);
    }
  }, [user]);

  return  null
}

export default CrispChat;
