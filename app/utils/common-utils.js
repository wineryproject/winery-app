import fetch from 'fetch';
import CountryAdapter from '../adapters/country';
import GrapeAdapter from '../adapters/grape';
import AppellationAdapter from '../adapters/appellation';
import ColorAdapter from '../adapters/color';
import { hash } from 'rsvp';
import _ from 'lodash';
import moment from 'moment';

const COUNTRY_STORAGE_KEY = "winy.countries.info";
const GRAPE_STORAGE_KEY = "winy.grapes.info";
const APPELLATION_STORAGE_KEY = "winy.appellations.info";
const COLOR_STORAGE_KEY = "winy.colors.info";

export function postData(url) {
    return fetchIt(url, "post");
}

export function getData(url) {
    return fetchIt(url, "get");
}

export function fetchData(url) {
    return getData(url);
}

export function fetchDataJwt(url, method) {
    let myjwt = JSON.parse(localStorage.getItem("ember_simple_auth-session")).authenticated.token
    return fetch(url, 
        {
            method : method,
            mode: 'cors', 
            headers : {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+myjwt,
            }
        })
        .then(function(response) {
            return response.json();
        })
        /* check that the default ESA behaviour works*/
        .catch(function(error) {
            //invalidate session
            //TODO use throw exception instead
            throw {"session":"invalidate"};
        })
        
    ;
}

function fetchIt(url, method) {
    return fetch(url, 
        {
            method : method,
            mode: 'cors', 
            headers : {
                'Content-type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
    ;
}

export default { 
    fetchData: fetchData 
};

export function calculateLocale(locales) {
  // whatever you do to pick a locale for the user:
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;

  return  locales.includes(language.toLowerCase()) ? language : 'en-GB';
}

export function getLang()
{
    if (navigator.languages != undefined) 
        return navigator.languages[0]; 
    else 
        return navigator.language;
}

//language
export function getUserI18n() {
    return getUserLanguage().split("-")[0];
}

export function getUserLanguage() {
    var localStorageUserLanguage=window.localStorage.getItem("winy.user.language");
    if (localStorageUserLanguage==undefined || localStorageUserLanguage == "undefined") {
        var language = window.navigator.userLanguage || window.navigator.language;
        setUserLanguage (language);
        return language;
    }
    return localStorageUserLanguage;
}

export function setUserLanguage(locale) {
    window.localStorage.setItem("winy.user.language",locale);
}

//local storage : https://stackoverflow.com/questions/14814472/caching-remote-data-in-local-storage-with-emberdata?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

export function getCountriesInfo2() {
    var c = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    var countriesInfo=c?JSON.parse(c):null;
    if (countriesInfo==undefined) {
        var adapter = CountryAdapter.create(); 
        var promise = adapter.findAll().then((data) => {
            return data.CountryDescriptionOut;
        });
        var promises = {
            promise : promise
        };
        hash(promises).then(function(data) {
            countriesInfo = data.promise;
            window.localStorage.setItem(COUNTRY_STORAGE_KEY,JSON.stringify(countriesInfo));
        });
    }
    return countriesInfo;
}


export function getCountriesInfo() {
    return getJsonFromLocalStorage(
        COUNTRY_STORAGE_KEY, 
        CountryAdapter.create(), 
        function (data) {
            return data.CountryDescriptionOut;
        }
    );
}

export function getGrapesInfo() {
    return getJsonFromLocalStorage(
        GRAPE_STORAGE_KEY, 
        GrapeAdapter.create(), 
        function (data) {
            return data.CepageDescriptionOut;
        }
    );
}

export function getAppellationsInfo() {
    return getJsonFromLocalStorage(
        APPELLATION_STORAGE_KEY, 
        AppellationAdapter.create(), 
        function (data) {
            return data.AppelationBadgeOut;
        }
    );
}

export function getColorsInfo() {
    return getJsonFromLocalStorage(
        COLOR_STORAGE_KEY, 
        ColorAdapter.create(), 
        function (data) {
            return data.ColorInfoOut;
        }
    );
}

export function getJsonFromLocalStorage(key, adapter, dataCallback) {
    var c = window.localStorage.getItem(key);
    var result=(c && c!="undefined")?JSON.parse(c):null;
    if (!result) {
        var promise = adapter.findAll().then((data) => {
            return dataCallback(data);
        });
        var promises = {
            promise : promise
        };
        hash(promises).then(function(data) {
            result = data.promise;
            window.localStorage.setItem(key,JSON.stringify(result));
        });
    }
    return result;
}

export function getFlagIcon (countryWebPath) {
    let country = getCountryInfo (countryWebPath);
    if (country) {
        return country.flagIcon;
    }
    return ;
}

export function getCountryInfo (countryWebPath) {
    var c = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    var countriesInfo=(c && c!="undefined")?JSON.parse(c):null;
    if (!countriesInfo) return;
    return  _.filter(countriesInfo, {'webPath' : countryWebPath})[0];
}

export function getGrapeColor (grapeWebPath) {
    var c = window.localStorage.getItem(GRAPE_STORAGE_KEY);
    var grapesInfo=(c && c!="undefined")?JSON.parse(c):null;
    if (!grapesInfo) return;
    return  _.filter(grapesInfo, {'webPath' : grapeWebPath})[0].rbg;//TODO change to rgb
}

export function getColor (colorName) {
    var c = window.localStorage.getItem(COLOR_STORAGE_KEY);
    var colorInfo=(c && c!="undefined")?JSON.parse(c):null;
    if (!colorInfo) return;
    return  _.filter(colorInfo, {'name' : colorName})[0].rgb;
}

export function getCurrentUrlEnding () {
    let currentUrl = window.location.href;
    let urlProtocolIndex = currentUrl.indexOf('//');
    let urlRoot = currentUrl.indexOf('/',urlProtocolIndex+2);
    let urlEnding = currentUrl.substring(urlRoot+1);
    return urlEnding;
}

export function setFilter(that, filter, type) {
    if (filter && filter.type == type) {
        if (that.get(type) == filter.value) { //TODO change with contains
            that.set(type,null);
        } else {
            that.set(type, filter.value);
        }
    }
}

export function webPath(input) {
    return replaceAll(input.toLowerCase(), " ", "-");
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function getPropertiesOptions(list, property, filter) {
    // ex:getPropertiesOptions(wineries, 'cepageNames', params.wineryCepage)
    //getPropertiesOptions(wineries, 'cepageNames', 'chardonnay')
    if (filter) {
        filter = filter.toString();
    }
    //TODO property is a list and not a unique value
    var v = _.countBy(list, property);

    return Object.entries(v).map(([k, v]) => (
        {
            'name' : k,
            'nb' : v,
            'active' : filter==k.toString()
        }
    ));
}

export function getPropertyOptions(list, property, filter) {
    if (filter) {
        filter = filter.toString();
    }
    var v = _.countBy(list, property);

    return Object.entries(v).map(([k, v]) => (
        {
            'name' : k,
            'nb' : v,
            'active' : filter==k.toString()
        }
    ));
}

export function toWebPath(param) {
  if (param) {
    return param.trim().toLowerCase().split(' ').join('-');
  } else {
    return "";
  }
}

export function formatDateFr(date) {
    return moment(date).format('DD MMMM YYYY');
}