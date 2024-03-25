import AppGrid from "@layout/AppGrid";

import PageHeader from "@layout/PageHeader";
import Matches from "@widgets/Matches";

const widgets = {
  matches: <Matches />,
};
const Home1 = () => {
  return (
    <>
      <PageHeader title="Bienvenue" />
      <AppGrid id="bienvenue" widgets={widgets} />
    </>
  );
};

export default Home1;
