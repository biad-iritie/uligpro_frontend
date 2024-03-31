// styled components
import {
  Link,
  SingleLink,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledDrawer,
} from "./styles";

// components
import Logo from "@components/Logo";
import { NavLink, useLocation } from "react-router-dom";

// hooks
import { useSidebar } from "@contexts/sidebarContext";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

// constants
import LINKS from "@constants/links";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { open, setOpen } = useSidebar();

  const [expanded, setExpanded] = useState(undefined);
  const { pathname } = useLocation();
  const { width } = useWindowSize();

  const [isLogged, setIsLogged] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // manually handle accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // collapse opened accordion on route change when the drawer is temporary
  useEffect(() => {
    width < 1280 && setExpanded(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user.name !== undefined) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [pathname, user]);

  return (
    <StyledDrawer
      variant={width < 1920 ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
        },
      }}
      className="main-sidebar"
    >
      <div className="logo-wrapper">
        <Logo size="sm" />
      </div>
      <nav className="d-flex flex-column g-8 flex-1">
        <SingleLink
          className={pathname === "/" ? "pinned active" : "pinned"}
          as="div"
        >
          <NavLink to="/">
            <Link className={`${pathname === "/" ? "active" : ""} h4`}>
              <i className="icon icon-ball" /> Matchs
            </Link>
          </NavLink>
        </SingleLink>
        <SingleLink
          className={pathname === "/myprofile" ? "pinned active" : "pinned"}
          as="div"
        >
          <NavLink to="/myprofile">
            <Link className={`${pathname === "/myprofile" ? "active" : ""} h4`}>
              <i className="icon icon-user" /> Profil
            </Link>
          </NavLink>
        </SingleLink>
      </nav>
      {isLogged && (
        <nav className="d-flex flex-column g-8 flex-1">
          <SingleLink as="div">
            <NavLink to="/">
              <Link className={`h4`}>
                <i className="icon icon-exit" /> Deconnexion
              </Link>
            </NavLink>
          </SingleLink>
        </nav>
      )}

      <nav className="d-flex flex-column g-8 flex-1">
        {LINKS.map((link, index) => (
          <StyledAccordion
            key={link.title}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <StyledAccordionSummary>
              <Link
                className={`${expanded === `panel${index}` ? "active" : ""} h4`}
              >
                <i className={`icon icon-${link.icon}`} /> {link.title}
              </Link>
              <i className="icon icon-chevron-down" />
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              {link.pages.map((page) => (
                <NavLink to={page.path} key={page.title}>
                  {page.title}
                </NavLink>
              ))}
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </nav>

      {/* <SingleLink
        className={pathname === "/settings" ? "pinned active" : "pinned"}
        as="div"
      >
        <NavLink to="/settings">
          <Link className={`${pathname === "/settings" ? "active" : ""} h4`}>
            <i className="icon icon-sliders" /> Settings
          </Link>
        </NavLink>
      </SingleLink> */}
    </StyledDrawer>
  );
};

export default Sidebar;
