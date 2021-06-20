import { qSel } from "../utils/shortcuts";
import sel from "../constants/selectors";
const $tw = window.$tw;


const displayPopup = () => {
  console.log("display");
  $tw(sel.POPUP).fadeIn();
  $tw(sel.OVERLAY).fadeIn();
};

const hidePopup = () => {
  console.log("hide");
  qSel(sel.POPUP).style.display = "none";
  qSel(sel.OVERLAY).style.display = "none";
};

export default {
  displayPopup,
  hidePopup,
};
