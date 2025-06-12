// Team logos export file
// This file centralizes all team logo imports for easy access

// Example structure:
export const teamLogos = {
  // Format: 'team-id': {
  //   logo: '/path/to/logo.webp',
  //   name: 'Team Name'
  // }
  uigb: {
    logo: "/teams/flags/uigb.png",
    name: "UIGB",
  },
  bem: {
    logo: "/teams/flags/bem.png",
    name: "BEM",
  },
  biu: {
    logo: "/teams/flags/biu.png",
    name: "BIU",
  },
  hec: {
    logo: "/teams/flags/hec.png",
    name: "HEC",
  },
  iupa: {
    logo: "/teams/flags/iupa.png",
    name: "IUPA",
  },
  ucao: {
    logo: "/teams/flags/ucao.png",
    name: "UCAO",
  },
  iua: {
    logo: "/teams/flags/iua.png",
    name: "IUA",
  },
  gsm: {
    logo: "/teams/flags/gsm.png",
    name: "GSM",
  },
  fupa: {
    logo: "/teams/flags/fupa.png",
    name: "FUPA",
  },
  esma: {
    logo: "/teams/flags/esma.png",
    name: "ESMA",
  },
  ulagunes: {
    logo: "/teams/flags/ulagunes.png",
    name: "U-LAGUNES",
  },
  cerap: {
    logo: "/teams/flags/cerap.png",
    name: "CERAP",
  },
  ispa: {
    logo: "/teams/flags/ispa.png",
    name: "ISPA",
  },
  uicf: {
    logo: "/teams/flags/uicf.png",
    name: "UICF",
  },
  eaa: {
    logo: "/teams/flags/eaa.png",
    name: "EAA",
  },
  uipa: {
    logo: "/teams/flags/uipa.png",
    name: "UIPA",
  },

  // Add more teams as needed
};

// Helper function to get team logo
export const getTeamLogo = (teamId) => {
  return teamLogos[teamId]?.logo || "/teams/flags/default.webp";
};

// Helper function to get team name
export const getTeamName = (teamId) => {
  return teamLogos[teamId]?.name || "Unknown Team";
};
