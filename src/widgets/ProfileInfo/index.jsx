// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      { "Nom & Prenoms": user.name },
      { Numero: user.tel },
      { "E-mail": user.email },
    ]);
  }, [user]);
  return (
    <Spring className="card d-flex flex-column g-16 card-padded">
      <h3>Profile information</h3>
      <ul className="d-flex flex-column justify-content-between flex-1 g-14">
        {data.map((item, index) => {
          return (
            <li className={styles.item} key={index}>
              <span className="text-600 text-header">
                {Object.keys(item)[0]}:
              </span>
              <span className={`${styles.value} text-overflow`}>
                {Object.values(item)[0]}
              </span>
            </li>
          );
        })}
      </ul>
    </Spring>
  );
};

export default ProfileInfo;
