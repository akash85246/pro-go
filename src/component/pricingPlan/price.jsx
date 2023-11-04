import Navbar from "../utils/navbar";
import PCard from "./priceCards";
import "../pricingPlan/pricePlan.css";
export default function Pricing(props) {
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="priceplanHeader">
        <h1>
          <span className="darkBlue">Pro-Go </span>
          your way.
        </h1>
        <h2>
          Trusted by millions, Pro-Go powers teams all around the world.Explore
          which option is right for you.
        </h2>
        <div className="switch">
          <button className="monthly">Monthly</button>
          <button className="annually">Annually</button>
        </div>
      </div>
      <div className="costChoice">
        <PCard
          title="Professional"
          cost="$99"
          item1="Limited cards "
          item2="Upto 10 Boards per Workspace "
          item3="Power up boards"
          item4="250GB storage"
          item5="custom backgroud "
          item6="Activity log"
          item7="Assignee and due dates"
          item8="Moblie apps"
          item9="2-step authentication"
        />
        <PCard
          title="Professional"
          cost="$99"
          item1="Limited cards "
          item2="Upto 10 Boards per Workspace "
          item3="Power up boards"
          item4="250GB storage"
          item5="custom backgroud "
          item6="Activity log"
          item7="Assignee and due dates"
          item8="Moblie apps"
          item9="2-step authentication"
        />
        <PCard
          title="Professional"
          cost="$99"
          item1="Limited cards "
          item2="Upto 10 Boards per Workspace "
          item3="Power up boards"
          item4="250GB storage"
          item5="custom backgroud "
          item6="Activity log"
          item7="Assignee and due dates"
          item8="Moblie apps"
          item9="2-step authentication"
        />
      </div>
    </>
  );
}
