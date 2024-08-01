import { useEffect } from 'react';
import { Crisp } from "crisp-sdk-web";

function CrispChat() {

  useEffect(() =>{
      Crisp.configure('ec132e50-f8a7-4e50-b8e5-14d28fcd6e8f', {
      });
  });


  Crisp.user.setEmail("john.doe@gmail.com");
  Crisp.user.setNickname("John Doe");

  Crisp.session.setData({
    user_id : "123456",
    plan : "free"
  });

  return null;
}

export default CrispChat;
