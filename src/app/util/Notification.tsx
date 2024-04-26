/*   2024-04-25 20:36:14



*/

import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Props 타입 정의
type NotificationProps = {
  // children: ReactNode; // children의 타입을 ReactNode로 지정
};

const Notification: React.FC<NotificationProps> = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Notification;
