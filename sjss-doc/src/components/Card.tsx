import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className={styles.cardHeader}>{children}</div>;
}

interface CardBodyProps {
  children: React.ReactNode;
}

export function CardBody({ children }: CardBodyProps) {
  return <div className={styles.cardBody}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className={styles.cardFooter}>{children}</div>;
}
