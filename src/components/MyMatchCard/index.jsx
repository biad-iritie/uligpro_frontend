// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
//import InfoTabsNav from "@components/InfoTabsNav";
import Score from "@ui/Score";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { useWindowSize } from "react-use";

// utils
import PropTypes from "prop-types";
import { getTeamLogo, getTeamName } from "@assets/teams";

const MyMatchCard = ({ match, index, variant = "basic" }) => {
  const { width } = useWindowSize();
  const { theme } = useThemeProvider();
  /* const team1 = getClubInfo(match.team1.id);
  const team2 = getClubInfo(match.team2.id); */
  //console.log(match);

  const team1Logo = getTeamLogo(match.team1.logo);
  const team2Logo = getTeamLogo(match.team2.logo);
  const team1Name = getTeamName(match.team1.logo);
  const team2Name = getTeamName(match.team2.logo);

  return (
    <Spring
      className={`${styles.container} ${styles[theme]} h-50`}
      type="slideUp"
      index={index}
    >
      <p
        className="h2 text-center"
        style={{ paddingTop: "5px", marginBottom: "0" }}
      >
        {match.time.split("T")[1].split(":")[0] +
          ":" +
          match.time.split("T")[1].split(":")[1]}
      </p>
      <div
        className="card-padded d-flex flex-column g-10"
        style={{
          paddingTop: "0 !important",
          paddingBottom:
            variant !== "extended" ? "calc(var(--card-padding) * 0.7)" : 5,
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-relative">
          <picture>
            <source srcSet={team1Logo} type="image/webp" />
            <img
              className="club-logo"
              src={team1Logo}
              alt={team1Name}
              loading="lazy"
              width="60"
              height="60"
              style={{
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
            />
          </picture>
          {/* <span className="styles_vs__dnnaD h3">vs</span> */}
          <Score team1={match.goal1} team2={match.goal2} variant="alt" />
          <picture>
            <source srcSet={team2Logo} type="image/webp" />
            <img
              className="club-logo"
              src={team2Logo}
              alt={team2Name}
              loading="lazy"
              width="60"
              height="60"
              style={{
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
            />
          </picture>
        </div>
        {width >= 414 && (
          <div className="d-flex justify-content-between g-15">
            <div style={{ minWidth: 0, marginLeft: "30px" }}>
              <h3>{team1Name}</h3>
              {/* <p className="text-12 text-overflow">{match.team1.university}</p> */}
            </div>
            <div
              className="text-right"
              style={{ minWidth: 0, marginRight: "30px" }}
            >
              <h3>{team2Name}</h3>
              {/* <p className="text-12 text-overflow">{match.team2.university}</p> */}
            </div>
          </div>
        )}
      </div>

      {/* <InfoTabsNav variant="alt" /> */}
    </Spring>
  );
};

MyMatchCard.propTypes = {
  match: PropTypes.shape({
    team1: PropTypes.shape({
      id: PropTypes.string.isRequired,
      goal1: PropTypes.number,
    }).isRequired,
    team2: PropTypes.shape({
      id: PropTypes.string.isRequired,
      goal2: PropTypes.number,
    }).isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
  variant: PropTypes.oneOf(["basic", "extended"]),
};

export default MyMatchCard;
