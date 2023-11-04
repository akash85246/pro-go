import React, { useState } from "react";
import Navbar from "../utils/navbar";
import PCard from "./priceCards";
import Footer from "../utils/footer";

import img from "../../assets/priceImg.svg"
import "../pricingPlan/pricePlan.css";

export default function Pricing(props) {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedCard(null); // Deselect the card when changing options.
  };
  const handleCardSelect = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const getButtonClassName = (option) => {
    return option === selectedOption ? "selected" : "";
  };

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
          Trusted by millions, Pro-Go powers teams all around the world. Explore
          which option is right for you.
        </h2>
        <div className="switch">
          <button
            className={`monthly ${getButtonClassName("monthly")}`}
            onClick={() => handleOptionChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={`annually ${getButtonClassName("annually")}`}
            onClick={() => handleOptionChange("annually")}
          >
            Annually
          </button>
        </div>
      </div>
      <div className="costChoice">
        {selectedOption === "monthly" && (
          <div className="monthlySet">
            <PCard
              title="Professional"
              cost="$99"
              selected={selectedCard === "Professional"}
              onSelect={handleCardSelect}
              item1="Limited cards"
              item2="Up to 10 Boards per Workspace"
              item3="Power up boards"
              item4="250GB storage"
              item5="Custom background"
              item6="Activity log"
              item7="Assignee and due dates"
              item8="Mobile apps"
              item9="2-step authentication"
            />
            <PCard
              title="Standard"
              cost="$213"
              selected={selectedCard === "Standard"}
              onSelect={handleCardSelect}
              item1="UpLimited cards "
              item2="Advance checklists"
              item3="Custom Field"
              item4="500GB storage"
              item5="custom backgroud & stickers "
              item6="Activity log"
              item7="Assignee and due dates"
              item8="Mobile apps"
              item9="2-step authentication"
            />
            <PCard
              title="Professional"
              cost="$399"
              selected={selectedCard === "Premium"}
              onSelect={handleCardSelect}
              item1="Views: Calendar, Timeline, Table, Dashboard, and Map"
              item2="Organization-visible boards"
              item3="Public board management"
              item4="Unlimited storage"
              item5="Attachment permissions"
              item6="Power-Up administration"
              item7="Collections"
              item8="Observers"
              item9="2-step authentication"
            />
          </div>
        )}
        {selectedOption === "annually" && (
          <div className="annuallySet">
            <PCard
              title="Professional"
              cost="$89"
              selected={selectedCard === "Professional"}
              onSelect={handleCardSelect}
              oldCost="$99/Month"
              item1="Limited cards"
              item2="Up to 10 Boards per Workspace"
              item3="Power up boards"
              item4="250GB storage"
              item5="Custom background"
              item6="Activity log"
              item7="Assignee and due dates"
              item8="Mobile apps"
              item9="2-step authentication"
            />
            <PCard
              title="Standard"
              cost="$199"
              selected={selectedCard === "Standard"}
              onSelect={handleCardSelect}
              oldCost="$213/Month"
              item1="UpLimited cards "
              item2="Advance checklists"
              item3="Custom Field"
              item4="500GB storage"
              item5="custom backgroud & stickers "
              item6="Activity log"
              item7="Assignee and due dates"
              item8="Mobile apps"
              item9="2-step authentication"
            />
            <PCard
              title="Premium"
              cost="$360"
              oldCost="$399/Month"
              selected={selectedCard === "Premium"}
              onSelect={handleCardSelect}
              item1="Views: Calendar, Timeline, Table, Dashboard, and Map"
              item2="Organization-visible boards"
              item3="Public board management"
              item4="Unlimited storage"
              item5="Attachment permissions"
              item6="Power-Up administration"
              item7="Collections"
              item8="Observers"
              item9="2-step authentication"
            />
          </div>
        )}
      </div>
      <div className="suggestion">
        <h1>Didn’t find what you were looking for?</h1>
        <button>Make a suggestion</button>
      </div>
      <div className="frquently">
        <h1>Frequently asked questions</h1>
        <div className="quest">
          <ul>
            <li>
              <div>
                <span>+ </span>Does Pro-Go offer a premium free trails?
              </div>
            </li>
            <li>
              <div>
                <span>+ </span> Do you offer any discount plans?
              </div>
            </li>
            <li>
              <div>
                <span>+ </span>What payment methods do you accept?
              </div>
            </li>
            <li>
              <div>
                <span>+ </span> How do i can my Pro-Go standard and permium free
                trail?
              </div>
            </li>
            <li>
              <div>
                <span>+ </span> How user counted towards billings?
              </div>
            </li>
            <li>
              <div>
                <span>+ </span>How secure is Pro-Go?
              </div>
            </li>
          </ul>
          <img src={img}></img>
        </div>
      </div>
      <Footer/>
    </>
  );
}
