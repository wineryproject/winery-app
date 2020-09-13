import _ from 'lodash';
import stringUtils from "./string-utils";
import appendQuery from 'npm:append-query';
import { set } from '@ember/object';
import { filterWineries, initProductWineryOptions } from './winery-utils';

export function convertComposition(appellation) {
    let composition = appellation.composition?appellation.composition.split(','):[];
    let compositionArr = [];
    var all100Percent = true;
    _.each(composition, function (e) {
        let element = e.split('|');
        let jsonElement = {grade : element[0], webPath : element [1], percent : element[2], operator : element[3]};
        compositionArr.push(jsonElement);
        if (element[2] != 100) {
            all100Percent = false;
        }
    });
    //if all min_optional/max_optional 100 and compositionArr.length >= 2 then no percent and operator
    appellation.anyGrape = all100Percent;
    appellation.composition = composition?compositionArr:composition;
    appellation.isToDisplay=true;
}

export function convertGrapes(cepageIdNames) {
    let arr = cepageIdNames?cepageIdNames.split('|'):[];
    let result = [];
    _.each(arr, function (e) {
        let element = e.split(',');
        let jsonElement = {grade : element[1]}//, webPath : element [1], percent : element[2], operator : element[3]};
        result.push(jsonElement);
    });
    return result;
}

export function convertAppellations(winery) {
    //let appellations = winery.appellationDetails?winery.appellationDetails.split(','):[];
    //TODO CHANGE productsDetails to appellationDetails
    let appellations = winery.productsDetails?winery.productsDetails.split(','):[];
    let appellationsArr = [];
    _.each(appellations, function (e) {
        let element = e.split('|');
        if (element[0]) {
            let jsonElement = {
                name : element[0], 
                acronym : element [1], 
                description : element[2],
                webPath : element[3],//webPath(element[0]),
                colorRgb : element[4],
                colorName : element[5],
            };
            appellationsArr.push(jsonElement);
        }
    });
    winery.appellationDetails = appellations?appellationsArr:appellations;
}

function convertLabelsDetails(winery) {
    let labelDetails = winery.labelDetails?winery.labelDetails.split(','):[];
    let pdArr = [];
    _.each(labelDetails, function (e) {
        let element = e.split('|');
        let jsonElement = {
            id : element[0],
            name : element[1],
            webPath : element [2],
            code : element[3],
        };
        pdArr.push(jsonElement);
    });
    winery.labelDetails = labelDetails?pdArr:labelDetails;
}

export function convertProductsDetails(winery) {
    let productsDetails = winery.productsDetails?winery.productsDetails.split(','):[];
    let pdArr = [];
    _.each(productsDetails, function (e) {
        let element = e.split('|');
        let jsonElement = {
            isAppellation : element[0].trim().length > 0,
            appellationName : element[0],
            appellationAcronym : element [1],
            appellationDescription : element[2],
            appellationWebPath: element[3], 
            colorRgb : element[4],
            colorName : element[5],
            nb : element[6]
        };
        pdArr.push(jsonElement);
    });
    winery.productsDetails = productsDetails?_.orderBy(pdArr, ['appellationName', 'nb'], ['desc', 'asc']):productsDetails;
}



export function getProductFilter(products, productFilter) {
    let productArr = products?products:[];
    if (productFilter.byColors) {

    }
    _.each(productsDetails, function (e) {
        let element = e.split('|');
        let jsonElement = {
            isAppellation : element[0].trim().length > 0,
            appellationName : element[0],
            appellationAcronym : element [1],
            appellationDescription : element[2],
            appellationWebPath: element[3], 
            colorRgb : element[4],
            colorName : element[5],
            nb : element[6]
        };
        pdArr.push(jsonElement);
    });
    winery.productsDetails = productsDetails?_.orderBy(pdArr, ['appellationName', 'nb'], ['desc', 'asc']):productsDetails;
}

export function convertSocialNetworkDetails(data) {
    let socialNetworkDetails = data.socialNetworkDetails?data.socialNetworkDetails.split(','):[];
    let arr = [];
    _.each(socialNetworkDetails, function (e) {
        let element = e.split('|');
        let jsonElement = {
            link : element[0],
            socialNetworkName : element[1].toLowerCase()
        };
        arr.push(jsonElement);
    });
    data.socialNetworkDetails = socialNetworkDetails?arr:socialNetworkDetails;
}

export function convertOpeningHours(data) {
    let openingHours = data.openingHours?data.openingHours.split(','):[];
    let arr = [];
    _.each(openingHours, function (e) {
        let element = e.split('|');
        let jsonElement = {
            day : element[0],
            from : element[1],
            to : element[2],
        };
        arr.push(jsonElement);
    });
    data.openingHours = openingHours?arr:openingHours;
}

export function convertWineryParticipation(data, wineryFilter) {
    let eventWineryParticipation = data.eventWineryParticipation?data.eventWineryParticipation.split(','):[];
    let arr = [];
    _.each(eventWineryParticipation, function (e) {
        let element = e.split('|');
        //if (element[0] == data.webPath) { eventWebPath from context : todo in query
            let jsonElement = {
                eventWebPath : element[0],
                level : element[1],
                booth : element[2],
            };
            arr.push(jsonElement);
        //}
    });
    data.eventWineryParticipation = eventWineryParticipation?arr:eventWineryParticipation;
    if (wineryFilter && wineryFilter.eventWebPath && data.eventWineryParticipation){
        data.eventWineryParticipation = _.filter(data.eventWineryParticipation, {'eventWebPath': wineryFilter.eventWebPath});
    } 
}

export function convertWineriesPerRegion(data) {
    let nbOfWineriesPerRegion = data.nbOfWineriesPerRegion?data.nbOfWineriesPerRegion.split(','):[];
    let arr = convertNameWebpathNumberToJson(nbOfWineriesPerRegion);
    data.nbOfWineriesPerRegion = nbOfWineriesPerRegion?arr:nbOfWineriesPerRegion;
}

export function convertWineriesPerCountry(data) {
    let nbOfWineriesPerCountry = data.nbOfWineriesPerCountry?data.nbOfWineriesPerCountry.split(','):[];
    let arr = convertNameWebpathNumberToJson(nbOfWineriesPerCountry);
    data.nbOfWineriesPerCountry = nbOfWineriesPerCountry?arr:nbOfWineriesPerCountry;
}

export function convertNameWebpathNumberToJson(data) {
    let arr = [];
    _.each(data, function (e) {
        let element = e.split('|');
        let jsonElement = {
            name : element[0],
            webPath : element[1],
            nb : element[2]
        };
        arr.push(jsonElement);
    });
    return arr;
}

function hasPriceRange(winery) {
    return  winery.minPrice || 
            winery.maxPrice;
}

export function prepareWinery (winery, wineryFilter) {
    winery.cepages = winery.cepageNames?winery.cepageNames.split(','):[];
    winery.imageArrayIds = winery.pictureIds?winery.pictureIds.split(','):[];
    winery.firstPicture = winery.pictureIds?winery.pictureIds.split(',')[0]:"";
    winery.imageShortcutUrlArray = winery.pictureShortUrls?winery.pictureShortUrls.split():[];
    winery.tags = winery.tags?winery.tags.split(','):[];
    winery.hasPriceRange = hasPriceRange(winery);
    winery.isBioSinceDate = winery.isBioSinceYear?new Date(winery.isBioSinceDate, 0, 1):null;
    winery.certifiedBioDate = winery.certifiedBioYear?new Date(winery.certifiedBioYear, 0, 1):null;
    winery.certifiedBioDynamicDate = winery.certifiedBioDynamicYear?new Date(winery.certifiedBioDynamicDate, 0, 1):null;
    winery.certifiedBioDynamicDate = winery.certifiedBioDynamicYear?new Date(winery.certifiedBioDynamicYear, 0, 1):null;
    convertAppellations(winery);
    convertLabelsDetails(winery);
    convertProductsDetails(winery);    
    convertSocialNetworkDetails(winery);
    convertWineryParticipation(winery, wineryFilter);
    return winery;
}

export function prepareWineries (data, wineryFilter) {
    _.each(data, function(winery){
        winery = prepareWinery(winery, wineryFilter);
    });
    return data;
}

export function filterAndPrepareWineries (data, wineryFilter) {
    data.wineryAbstract = initProductWineryOptions (data.wineries, wineryFilter);
    data.wineries = filterWineries(data.wineries, wineryFilter);
    return prepareWineries(data.wineries, wineryFilter);
}

export function prepareImagesInfo (data) {
    _.each(data, function(imageInfo){
        imageInfo = prepareImageInfo(imageInfo);
    });
    return data;
}

export function prepareImageInfo (imageInfo) {
    imageInfo.id = imageInfo.entityId;
    return imageInfo;
}

export function prepareEventContact (data) {
    return {       
        contact:data.venueName,
        contactStreet1:data.venueStreet1,
        contactStreet2:data.venueStreet2,
        contactPostCode:data.venuePostCode,
        contactCity:data.venueCity,
        contactPhone:data.venueTelephone,
    };
}

export function prepareEvent(event) {
    event.hasVenue = event.venueName ? true : false;
    event.tags = event.tags?event.tags.split(','):[];
    convertSocialNetworkDetails(event);
    convertWineriesPerRegion(event);
    convertWineriesPerCountry(event);
    convertOpeningHours(event);
    let venue = prepareEventContact(event);
    event.venue = venue;
    return event;
}

export function prepareEvents(events) {
    _.forEach (events, function(item) { //data.EventInfoOut
        prepareEvent(item);
    });
    return events;
}

export function toDisplay (list, searchFreeText) {
    if (searchFreeText) {
        var lc = stringUtils.replaceAccents(searchFreeText.toLowerCase());
        _.forEach (list, function(item) {
            if (stringUtils.replaceAccents(item.name.toLowerCase()).includes(lc)) {
                set(item, "toDisplay", true);
            } else {
                set(item, "toDisplay", false);
            }
        });
    } else {
       toDisplayAll (list);
    }
}

export function toDisplayDomain (list, searchFreeText) {
    if (searchFreeText) {
        var lc = stringUtils.replaceAccents(searchFreeText.toLowerCase());
        _.forEach (list, function(item) {
            if (stringUtils.replaceAccents(item.domain.toLowerCase()).includes(lc)) {
                set(item, "toDisplay", true);
            } else {
                set(item, "toDisplay", false);
            }
        }); 
    } else {
       toDisplayAll (list); 
    }
}
//TODO merge with toDisplayWinery
export function toDisplayEvent (list, searchFreeText) {
    if (searchFreeText) {
        var lc = stringUtils.replaceAccents(searchFreeText.toLowerCase());
        _.forEach (list, function(item) {
            if (stringUtils.replaceAccents(item.eventName.toLowerCase()).includes(lc)) {
                set(item, "toDisplay", true);
            } else {
                set(item, "toDisplay", false);
            }
        }); 
    } else {
       toDisplayAll (list); 
    }
}

export function setDisplayCount(obj, list) {
    set(obj, "nbToDisplay", _.filter(list, function(o) { return o.toDisplay; }).length);
}

export function setDisplayWineries(obj, list) {
    set(obj, "wineries", _.filter(list, function(o) { return o.toDisplay; }));
}

export function setDisplayEvents(obj, list) {
    set(obj, "events", _.filter(list, function(o) { return o.toDisplay; }));
}

export function toDisplayAll (list) {
    _.forEach (list, function(item) {
        set(item, "toDisplay", true);
    }); 
}

export function formatFilter(filters) {
    if (filters) {
        return appendQuery("",{
            "countryWebPath":filters.country, 
            "regionWebPath":filters.region, 
            "cepageWebPath":filters.grape, 
            "lieuDitWebPath":filters.place, 
            "appellationWebPath":filters.appellationWebPath,
            "color":filters.color,
            "language":filters.language,
            "webpath":filters.webpath, 
            "webPath":filters.webPath 
        }, { removeNull: true });
    }
    return "";
}

export function formatCepageNamesAndPicture(item){
    //TODO group in a function common code with show.js
    item.cepages = item.cepageNames?item.cepageNames.split(','):[];
    item.imageArrayIds = item.pictureIds?item.pictureIds.split(','):[];
    item.firstPicture = item.pictureIds?item.pictureIds.split(',')[0]:"";
}

export function prepareConservationProcessing (data) {
    return {       
        durationMax:data.conservationProcessingDurationMax,
        durationMin:data.conservationProcessingDurationMin,
        durationUnit:data.conservationProcessingDurationUnit,
        temperatureMax:data.conservationProcessingTemperatureMax,
        temperatureMin:data.conservationProcessingTemperatureMin,
        typeName:data.conservationProcessionTypeName,
        sequenceOrder:data.sequenceOrder,
        vatMaterial:data.vatMaterial,
        vatName:data.vatName,
    };
}
