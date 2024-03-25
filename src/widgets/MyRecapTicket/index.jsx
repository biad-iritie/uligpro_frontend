// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import ScrollContainer from "@components/ScrollContainer";
import Popup from "@components/Popup";
import TruncatedText from "@components/TruncatedText";
import IconButton from "@ui/IconButton";
import CompareButton from "@ui/CompareButton";
import Like from "@ui/Like";

// hooks
import useMeasure from "react-use-measure";

// assets
import img1 from "@assets/cart/1.webp";
import img2 from "@assets/cart/2.webp";
import img3 from "@assets/cart/3.webp";
import img4 from "@assets/cart/4.webp";
import img5 from "@assets/cart/5.webp";
import img6 from "@assets/cart/6.webp";
const MyRecapTicket = () => {
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [nameRef, { width }] = useMeasure();
  const data = [
    {
      id: 1,
      img: img1,
      title: "Normal",
      price: 19.99,
      quantity: 2,
    },
    {
      id: 2,
      img: img2,
      title: "VIP",
      price: 15.87,
      quantity: 1,
    },
    {
      id: 3,
      img: img3,
      title: "VVIP",
      price: 120.14,
      quantity: 1,
    },
  ];

  return (
    <Spring className={`${styles.card} card card-padded`}>
      <h3 className={styles.title}>Recapitulatif</h3>

      <div className="track d-flex flex-column flex-1">
        {data.map((item) => {
          const price = `${item.price} FCFA`;
          const total_price = `${item.price * item.quantity} FCFA`;
          return (
            <div
              style={{ paddingBottom: "10px" }}
              className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
              key={item.id}
            >
              <div className="d-flex align-items-center flex-1 g-10">
                <div className="d-flex flex-column flex-1" ref={nameRef}>
                  <TruncatedText
                    className="h4"
                    text={item.title}
                    width={width}
                    lines={1}
                  />

                  <span className={`label label--store h5`}>{price}</span>
                </div>
              </div>

              <h3 className="text-highlight">{total_price}</h3>
            </div>
          );
        })}
      </div>

      <div className="card-padded d-flex flex-column g-20" ref={footerRef}>
        <p className="d-flex justify-content-between h3">
          Total: <span>$985.90</span>
        </p>
      </div>
    </Spring>
  );
};

export default MyRecapTicket;
