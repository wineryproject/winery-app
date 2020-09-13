import _ from 'lodash';
import { convertGrapes } from './business-utils';

export function filterProduct(products, params) {

    if (params.product_key) {
        products = _.filter(products, { product: params.product_key });
    }
    if (params.color) {
        products = _.filter(products, { colorName: params.color });
    }
    if (params.bubbleness) {
        products = _.filter(products, { bubbleness: params.bubbleness });
    }
    if (params.sweetness) {
        products = _.filter(products, { sweetness: params.sweetness });
    }

    if (params.grape) {
        // can have multiple grapes
        products = _.filter(products,
            o => {
                return assessFilterProperty (o.cepageIdNames, params.grape)
            }
        );
    }

    //year for event
    if (params.year) {
        products = _.filter(products, { year : parseInt(params.year)});
    }

/*  years for winery
    if (params.years) {
        products = _.filter(products, o => {
                return assessFilterProperty (o.years, params.years)
        });
    }
*/
    if (params.country) {
        products = _.filter(products, { country: params.country });
    }

    if (params.region) {
        products = _.filter(products, { region: params.region });
    }

    if (params.wineryLabel) {
        products = _.filter(products, { wineryLabel: params.wineryLabel });
    }

    if (params.productLabel) {
        products = _.filter(products, { productLabel: params.productLabel });
    }

    //boolean if not set -> all else only where boolean is true (ie no boolean is false filter)
    if (params.bio) {
        products = _.filter(products, { isBio: params.bio });
    }

    //sort
    if (params.orderByYear) {
        products = sortProduct(products, "year", params.orderByYear);
    }
    if (params.orderByCountry) {
        products = sortProduct(products, "country", params.orderByCountry);
    }
    if (params.orderByRegion) {
        products = sortProduct(products, "region", params.orderByRegion);
    }
    if (params.orderByWinery) {
        products = sortProduct(products, "winery", params.orderByWinery);
    }
    if (params.orderByPrice) {
        products = sortProduct(products, "eventPrice", params.orderByPrice);
    }
    if (params.orderByWineryPrice) {
        products = sortProduct(products, "wineryPrice", params.orderByWineryPrice);
    }
    if (params.orderByPreOrderPrice) {
        products = sortProduct(products, "eventPreOrderPrice", params.orderByPreOrderPrice);
    }
    if (params.orderByPreOrderPriceVariation) {
        products = sortProduct(products, "homeToPreOrderPriceIncPerc", params.orderByPreOrderPriceVariation);
    }
    if (params.orderByPriceVariation) {
        products = sortProduct(products, "homeToEventPriceIncPerc", params.orderByPriceVariation);
    }

    return products;
}
    //TODO unittest field.toLowerCase().split(',') with "4,Sauvignon|54,Côt"

function assessFilterProperty (field, property) {
    if (field === parseInt(field, 10)) {
        field = field.toString();//convert field int into string
    }
    return field |
           property |
           field.toLowerCase().split('|').join(',').split(',').includes(property.toLowerCase());
}

export function prepareEventProducts (data, params) {
    data.allProductsNumber = data.products.length;
    data.productAbstract = initProductFilterOptions (data.products, params);
    data.products = filterProduct (data.products, params);
    
    _.each(data.products, function(item){
        item = prepareProduct(item);
    });
}


export function prepareWineryProducts (data, params) {
    //data.allProductsNumber = data.productItemPrices.length;
    //TODO remove filter for inside winery
    /*
    data.productAbstract = initProductFilterOptions (data.productItemPrices, params);
    data.productItemPrices = filterProduct (data.productItemPrices, params);
    */
    
    _.each(data.productItemPrices, function(item){
        item = prepareProduct(item);
    });
}


export function prepareProducts (data, params) {
    data.allProductsNumber = data.products.length;
    data.productAbstract = initProductFilterOptions (data.products, params);
    data.products = filterProduct (data.products, params);
    
    _.each(data.products, function(item){
        item = prepareProduct(item);
    });
}

export function prepareProduct (item) {
   // item.cepages = item.cepages?item.cepages.split(','):[]; //TODO replace by cepageNames
    //item.cepages = item.cepageIdNames?item.cepageIdNames.split('|'):[]; //TODO replace by cepageNames
    item.cepages = convertGrapes(item.cepageIdNames); //TODO replace by cepageNames
    item.tags = item.tags?item.tags.split(','):[];
    item.hasChemistry = hasChemistry(item);
    item.hasMethod = hasMethod(item);
    item.hasGeography = hasGeography(item);
    item.hasTaste = hasTaste(item);
    item.hasConsumption = hasConsumption(item);
    item.hasVinificationDetails = hasVinificationDetails(item);
    prepareAromas(item);
    return item;
}

function hasVinificationDetails(item) {
    return  item.vinificationDescription ;
}

function hasChemistry(item) {
    //TODO
    if (item.alcoholPercent || 
        item.totalAcidityGL || 
        item.totalSulfiteMgL>0 || 
        item.sugarGL>0 || 
        item.tanninMgL>0) 
        {
        return true;
    }
    return false;
}

function hasMethod(item) {
    if (item.harvestingMethodName || 
        item.sparklingMethodName) {
        return true;
    }
    return false;
}

function hasGeography(item) {
    if (item.altitudeMax>0 || 
        item.altitudeMin>0 || 
        item.terroirSoilType || 
        item.terroirExposition ||
        item.hectolitersPerHectar>0
        ) {
        return true;
    }
    return false;
}

function hasTaste(item) {
    if (item.taste ||
        item.aromaNames ||
        item.degustationRecommandationName) {
        return true;
    }
    return false;
}

function hasConsumption(item) {
    if (item.preservingTemperature>0 
        //|| item.servingTemperatureMin
        //|| item.servingTemperatureMax
        //|| item.conservationMin
        || item.startConsumptionNbOfYear
        ) {
        return true;
    }
    return false;
}

export function prepareGrape (item) {
    item.countryNames = item.countryNames?item.countryNames.split(','):[];
    return item;
}

export function prepareAromas (item) {
    item.aromaNames = item.aromaNames?item.aromaNames.split(','):[];
    return item;
}

export function formatProductYearList(years) {
    return _.map(years, y => {
        if (y.name == '1900') { 
            y.displayName = 'Non Millésimé'
         }
         return y;
    });
}

export function initProductFilterOptions (products, params) {
    //get distinct product colors
    // https://stackoverflow.com/questions/23600897/using-lodash-groupby-how-to-add-your-own-keys-for-grouped-output
    // https://stackoverflow.com/questions/38868820/groupby-count-in-lodash

    var distinctColors = getProductPropertyOptions(products, 'colorName', params.color);
    var distinctBubbleness = getProductPropertyOptions(products, 'bubbleness', params.bubbleness);
    var distinctSweetness = getProductPropertyOptions(products, 'sweetness', params.sweetness);

    var distinctGrapes = getGrapeOptions(products, params.grape);

    var distinctCountries = getProductPropertyOptions(products, 'country', params.country);
    var distinctRegions = getProductPropertyOptions(products, 'region', params.region);
    var distinctYears = getProductPropertyOptions(products, 'year', parseInt(params.year));
    //TODO for years check 1900 => Non milllésimé
    distinctYears = formatProductYearList(distinctYears);
    var distinctCaracteristics = getProductPropertyOptions(products, 'caracteristic', params.caracteristic);
 
    var distinctBio = getProductPropertyOptions(products, 'isBio', params.bio);
    var distinctWineryLabel = getProductPropertyOptions(products, 'wineryLabel', params.wineryLabel);
    var distinctProductLabel = getProductPropertyOptions(products, 'productLabel', params.productLabel);

    var order = [
            {name : "year", type:"orderByYear", direction:params.orderByYear},
            {name : "country", type:"orderByCountry", direction:params.orderByCountry}, 
            {name : "region", type:"orderByRegion", direction:params.orderByRegion},
            {name : "winery", type:"orderByWinery", direction:params.orderByWinery},
            {name : "event-price", type:"orderByPrice", direction:params.orderByPrice},
            {name : "winery-price", type:"orderByWineryPrice", direction:params.orderByWineryPrice},
            {name : "pre-order-price", type:"orderByPreOrderPrice", direction:params.orderByPreOrderPrice},
            {name : "pre-order-price-variation", type:"orderByPreOrderPriceVariation", direction:params.orderByPriceVariation},
            {name : "event-price-variation", type:"orderByPriceVariation", direction:params.orderByPreOrderPriceVariation},
        ];
    var orderOrdered = _.orderBy(order, o => {
                return o.direction!=undefined?0:1;
            });

    return {
        color: distinctColors,
        bubbleness : distinctBubbleness,
        sweetness : distinctSweetness,
        grape : distinctGrapes,

        country : distinctCountries,
        region : distinctRegions,
        year : distinctYears,
        caracteristics : distinctCaracteristics,

        bio : distinctBio,
        wineryLabel: distinctWineryLabel,
        productLabel : distinctProductLabel,

        order : orderOrdered,
    }
}

function sortProduct(products, property, filter) {
    if (filter) {
        filter = filter.toString();
    }
    let direction = filter == "up" ? "asc" : "desc";
    return _.orderBy(products, [property],[direction]);
}

function getGrapeOptions (products, grape) {
    var grapes = _.map(products, 'cepageIdNames').join("|").split("|");
    var grapesCount = _.countBy(grapes);
    var distinctGrapes = Object.entries(grapesCount).map(([k, v]) => (
        {
            'name' : k.split(",")[1],
            'nb' : v,
            'active' : grape | grape==k.split(",")[1]
        }
    ));
    return distinctGrapes;
}

//TODO user common-utils getPropertyOptions
function getProductPropertyOptions(products, property, filter) {
    if (filter) {
        filter = filter.toString();
    }
    var v = _.countBy(products, property);

    return Object.entries(v).map(([k, v]) => (
        {
            'name' : k,
            'nb' : v,
            'active' : filter==k.toString()
        }
    ));
}