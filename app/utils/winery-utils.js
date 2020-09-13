import _ from 'lodash';
import {getPropertyOptions, getPropertiesOptions, toWebPath} from './common-utils';

export function filterWineries(wineries, wineryFilters) {

    if (wineryFilters.wineryCountry) {
        wineries = _.filter(wineries, { countryName: wineryFilters.wineryCountry });
    }
    if (wineryFilters.wineryRegion) {
        wineries = _.filter(wineries, { regionName: wineryFilters.wineryRegion });
    }
    if (wineryFilters.wineryBio) {
        wineries = _.filter(wineries, { isBio: wineryFilters.wineryBio =='true' });
    }
    if (wineryFilters.wineryCepage) {
        let cepageWebPath = toWebPath(wineryFilters.wineryCepage);
        wineries = _.filter(wineries, e => 
            { 
                if (e.cepageNames) {
                    return e.cepageNames.includes(cepageWebPath); 
                } else {
                    return false;
                }
            });
    }
    return wineries;
}

export function initProductWineryOptions (wineries, params) {

    var distinctCountries = getPropertyOptions(wineries, 'country', params.wineryCountry);
    var distinctRegions = getPropertyOptions(wineries, 'region', params.wineryRegion);
    var distinctCepages = getPropertiesOptions(wineries, 'cepageNames', params.wineryCepage);
    var distinctBio = getPropertyOptions(wineries, 'isBio', params.wineryBio);

    return {
        country : distinctCountries,
        region : distinctRegions,
        cepage : distinctCepages,
        bio : distinctBio,
    }
}

//TODO region utils

export function prepareRegion (region) {
    region.cepages = region.cepageNames?region.cepageNames.split(','):[]; //TODO replace by cepageNames
    region.wineryCepages = region.wineryCepageNames?region.wineryCepageNames.split(','):[]; //TODO put in function
    region.appellations = region.appellationNames?region.appellationNames.split(','):[]; //TODO put in function
    return region;
}