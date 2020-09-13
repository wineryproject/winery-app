import Ember from 'ember';

export function socialNetworkClass(params/*, hash*/) {
  let [value] = params;
  let valueLC = value.toLowerCase();
  if (valueLC == "facebook") {
      return "fa fa-facebook-square fa-3x social social-fb";
  }
  if (valueLC == "twitter") {
      return "fa fa-twitter-square fa-3x social social-tw";
  }
  if (valueLC == "instagram") {
      return "fa fa-instagram fa-square fa-3x social social-in";
  }
  if (valueLC == "youtube") {
    return "fa fa-youtube-square fa-3x social social-yt";
  }
  if (valueLC == "linkedin") {
    return "fa fa-linkedin-square fa-3x social social-lk";
  }
}

export default Ember.Helper.helper(socialNetworkClass);
