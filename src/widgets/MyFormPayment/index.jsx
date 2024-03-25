// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import TabButton from "@ui/TabButton";
import MyFormMobileMoney from "@widgets/MyFormPayment/MyFormMobileMoney";
import MyFormWave from "@widgets/MyFormPayment/MyFormWave";
import MyFormVisa from "@widgets/MyFormPayment/MyFormVisa";

import Fade from "@mui/material/Fade";

// hooks
import { useState } from "react";
import { useWindowSize } from "react-use";

const MyFormPayment = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { width } = useWindowSize();

  return (
    <Spring className="card d-flex flex-column card-padded">
      <h3>Methode de Paiement</h3>
      <div className="d-flex flex-column justify-content-between flex-1">
        <Tabs value={activeTab}>
          <TabsList className={`${styles.tabs_list} tab-nav col-2`}>
            <TabButton
              title={width >= 375 ? "Mobile money" : "Mobile"}
              onClick={() => setActiveTab("mobile_money")}
              active={activeTab === "mobile_money"}
            />
            <TabButton
              title={width >= 375 ? "Wave" : "Wave"}
              onClick={() => setActiveTab("wave")}
              active={activeTab === "wave"}
            />
            <TabButton
              title={width >= 375 ? "Visa" : "Visa"}
              onClick={() => setActiveTab("visa")}
              active={activeTab === "visa"}
            />
          </TabsList>
          <TabPanel value="mobile_money">
            <Fade in={activeTab === "mobile_money"} timeout={400}>
              <div>
                <MyFormMobileMoney />
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value="wave">
            <Fade in={activeTab === "wave"} timeout={400}>
              <div>
                <MyFormWave />
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value="visa">
            <Fade in={activeTab === "visa"} timeout={400}>
              <div>
                <MyFormVisa />
              </div>
            </Fade>
          </TabPanel>
        </Tabs>
      </div>
    </Spring>
  );
};

export default MyFormPayment;
