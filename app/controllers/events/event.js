import Ember from 'ember';
import { set } from '@ember/object';
import { setFilter } from '../../utils/common-utils';

export default Ember.Controller.extend({
    // coming from /route/events/event
    queryParams: [
        'wineryCountry',
        'wineryRegion',
        'wineryCepage',
        'wineryBio',
        'country',
        'region',
        'year',
        'wineryLabel',
        'productLabel',
        'bio',
        'appellation',
        'grape',
        'sweetness',
        'bubbleness',
        'color',
        'caracteristic',
        'orderByPrice',
        'orderByWineryPrice',
        'orderByPreOrderPrice',
        'orderByYear',
        'orderByCountry',
        'orderByRegion',
        'orderByWinery'
        ],
    wineryCountry : null,
    wineryRegion : null,
    wineryCepage : null,
    wineryBio : null,
    country : null,
    region : null,
    year : null,
    wineryLabel : null,
    productLabel : null,
    bio : null,
    appellation : null,
    grape : null,
    sweetness : null,
    bubbleness : null,
    color : null,
    caracteristic : null,
    orderByPrice : null,
    orderByWineryPrice : null,
    orderByPreOrderPrice : null,
    orderByYear : null,
    orderByCountry : null,
    orderByRegion : null,
    orderByWinery : null,
    orderByPriceVariation : null,
    orderByPreOrderPriceVariation : null,

    actions :  {
        setEventWineFilter (filter) {
            // TODO add grape to the already present ones, (if all selected remove)
            if (filter) {
                setFilter(this, filter, "wineryCountry");
                setFilter(this, filter, "wineryRegion");
                setFilter(this, filter, "wineryCepage");
                setFilter(this, filter, "wineryBio");


                setFilter(this, filter, "country");
                setFilter(this, filter, "region");
                setFilter(this, filter, "year");
                setFilter(this, filter, "wineryLabel");
                setFilter(this, filter, "productLabel");
                setFilter(this, filter, "bio");
                setFilter(this, filter, "appellation");
                setFilter(this, filter, "grape");
                setFilter(this, filter, "bubbleness");
                setFilter(this, filter, "sweetness");
                setFilter(this, filter, "color");
                setFilter(this, filter, "caracteristic");
                setFilter(this, filter, "orderByPrice");


                //reset sort filters
                resetFilter(this);
                setFilter(this, filter, "orderByYear");
                setFilter(this, filter, "orderByCountry");
                setFilter(this, filter, "orderByRegion");
                setFilter(this, filter, "orderByWinery");
                setFilter(this, filter, "orderByPrice");
                setFilter(this, filter, "orderByWineryPrice");
                setFilter(this, filter, "orderByPreOrderPrice");
                setFilter(this, filter, "orderByPriceVariation");
                setFilter(this, filter, "orderByPreOrderPriceVariation");
            }
        }
    }
});

function resetFilter(that) {
    that.set("orderByYear",null);
    that.set("orderByCountry",null);
    that.set("orderByRegion",null);
    that.set("orderByWinery",null);
    that.set("orderByPrice",null);
    that.set("orderByWineryPrice",null);
    that.set("orderByPreOrderPrice",null);
    that.set("orderByPriceVariation",null);
    that.set("orderByPreOrderPriceVariation",null);
}