// Team logos export file
// This file centralizes all team logo imports for easy access

// Example structure:
export const teamLogos = {
  // Format: 'team-id': {
  //   logo: '/path/to/logo.webp',
  //   name: 'Team Name'
  // }
  UIGB: {
    logo: "/teams/flags/uigb.png",
    name: "UIGB",
  },
  BEM: {
    logo: "/teams/flags/bem.png",
    name: "BEM",
  },
  BIU: {
    logo: "/teams/flags/biu.png",
    name: "BIU",
  },
  HEC: {
    logo: "/teams/flags/hec.png",
    name: "HEC",
  },
  IUPA: {
    logo: "/teams/flags/iupa.png",
    name: "IUPA",
  },
  UCAO: {
    logo: "/teams/flags/ucao.png",
    name: "UCAO",
  },
  IUA: {
    logo: "/teams/flags/iua.png",
    name: "IUA",
  },
  GSM: {
    logo: "/teams/flags/gsm.png",
    name: "GSM",
  },
  FUPA: {
    logo: "/teams/flags/fupa.png",
    name: "FUPA",
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
