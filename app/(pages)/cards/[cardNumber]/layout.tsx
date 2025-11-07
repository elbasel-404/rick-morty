import type { ReactNode } from "react";

interface CardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const CardLayout = ({ children, modal }: CardLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default CardLayout;
