import _ from 'lodash';

export function convertProductLinesToWineryProductLines (data, that) {
    //https://stackoverflow.com/questions/44565520/lodash-group-and-restructure-the-json-object-using-lodash
    let list = _.chain(data)
        .groupBy('__wineryWebPath')
        .orderBy(group => group.__wineryWebPath)
        .toPairs()
        .map(
            function (pair) { 
                return _.zipObject(['wineryWebPath', 'productLines'], pair); 
            }
        )
        .value();
    let wineryProductLines = [];    
    _.forEach(list, i => {
        i.productLines = _.orderBy(i.productLines, ["creationDate"], ["desc"])
        let p = i.productLines[0];
        let wp = that.store.createRecord("winery-purchase");
        let date = _.min(_.get(i.productLines, "creationTime"));
        wp.set("winery",p.__winery);
        wp.set("wineryId",p.__wineryId);
        wp.set("wineryWebPath",p.__wineryWebPath);
        wp.set("hasWineryLogo",p.__hasWineryLogo);
        wp.set("productLines",i.productLines);
        wineryProductLines.push(wp);

    });
    return wineryProductLines;
}

export function convertProductLinesToWineryProductLines2 (data, that) {
    // https://stackoverflow.com/questions/44565520/lodash-group-and-restructure-the-json-object-using-lodash
    /*
    const datax = [{"Type":"W","Id":1,"Employee_Role_Desc":null,"Employee_Role_Id":1,"StartDateTime":"2017-06-15T09:00:00","EndDateTime":"2017-06-15T12:30:00","Alert":null},{"Type":"W","Id":1,"Employee_Role_Desc":null,"Employee_Role_Id":1,"StartDateTime":"2017-06-15T09:00:00","EndDateTime":"2017-06-15T12:30:00","Alert":null},{"Type":"W","Id":1,"Employee_Role_Desc":null,"Employee_Role_Id":3,"StartDateTime":"2017-06-15T09:00:00","EndDateTime":"2017-06-15T12:30:00","Alert":null}];

const result = _(datax)
  .groupBy('Employee_Role_Id') // group the items
  .map((group, Role_Id) => ({ // map the groups to new objects
    Role_Id,
    Date: group[0].StartDateTime,
    Blocks: group.map(({ StartDateTime, EndDateTime }) => ({ // extract the dates from the groups
      StartDateTime, 
      EndDateTime
    }))
  }))
  .value();
  */

    let list = _.chain(data)
        .groupBy(['__key' ]) //'productPrice'
        .orderBy(group => group.__key)
        .toPairs()
        .map(
            function (pair) { 
                return _.zipObject(['__key', 'productLines'], pair); 
            }
        )
        .value();
        /*
     let list2 = _(data).groupBy('__key') //'productPrice'
        .map((group) => ({
            key : group[0].__key,
            data: group
        }))
        .value();    
*/
        // lodash does not seem to perform well with ember data   
    let wineryProductLines = [];    
    _.forEach(list, i => {
        i.productLines = _.orderBy(i.productLines, ["creationDate"], ["desc"])
        let p = i.productLines[0];
        let wp = that.store.createRecord("winery-purchase");
        let date = _.min(_.get(i.productLines, "creationTime"));
        wp.set("winery",p.__winery);
        wp.set("wineryId",p.__wineryId);
        wp.set("wineryWebPath",p.__wineryWebPath);
        wp.set("hasWineryLogo",p.__hasWineryLogo);
        wp.set("productLines",i.productLines);
        wineryProductLines.push(wp);

    });

/*
    _.forEach(data, i => {
        i.productLines = _.orderBy(i.productLines, ["creationDate"], ["desc"])
        let p = i.productLines[0];
        let wp = that.store.createRecord("winery-purchase");
        let date = _.min(_.get(i.productLines, "creationTime"));
        wp.set("winery",p.__winery);
        wp.set("wineryId",p.__wineryId);
        wp.set("wineryWebPath",p.__wineryWebPath);
        wp.set("hasWineryLogo",p.__hasWineryLogo);
        wp.set("productLines",i.productLines);
        wineryProductLines.push(wp);

    });
    */

    return wineryProductLines;
}

export function addInCart(that, 
        productItemPriceId, 
        quantity, 
        productId, 
        wineryId, 
        productWebPath, 
        wineryWebPath, 
        priceType, 
        eventId,
        displayPrice,
        currencyName) {
    let cart = that.get("cart");
    let idComposite= getCompositeId(productItemPriceId, priceType, eventId);
    var obj = cart.findBy('idComposite', idComposite);
    cart.removeObject(obj);
    cart.addObject(
        {
            id:productItemPriceId,
            idComposite : idComposite,
            productItemPriceId : productItemPriceId,
            productId : productId,
            wineryId : wineryId,
            quantity:quantity,
            creationTime: Date.now(),
            productWebPath : productWebPath,
            wineryWebPath : wineryWebPath,
            priceType : priceType,
            eventId:eventId,
            displayPrice:displayPrice,
            currencyName:currencyName,
        }
    );
}

export function getCompositeId(productItemPriceId, priceType, eventId) {
    let key = productItemPriceId+"-"+priceType;
    return (eventId)?key+"-"+eventId:key;
}

export function convertEventWinePriceItemToProductLine (pi, data, productLine) {
    productLine.set("productId",pi.productItemPriceId);
    productLine.set("productItemPriceId",pi.productItemPriceId);
    productLine.set("product",pi.productName);
    productLine.set("quantity",data.quantity);
    productLine.set("productFormat",pi.wineRecipientVolumeInMl);
    productLine.set("productFormatQuantity",pi.quantity);
    productLine.set("productYear",pi.year);

    //TODO pi.price is whether home or event presale or event price
    if (data.priceType) {
        if (data.priceType=="winery") {
            productLine.set("productPrice", pi.homePrice);
        }
        if (data.eventId) {
            if (data.priceType=="event-presale") {
                productLine.set("productPrice", pi.eventPreOrderPrice);
            }
            if (data.priceType=="event") {
                productLine.set("productPrice", pi.eventPrice);
            }
        }                    
    } else {
        productLine.set("productPrice", pi.homePrice);
    }
    let idComposite= getCompositeId(pi.productItemPriceId, data.priceType, pi.eventId);
    productLine.set("idComposite",idComposite);
    productLine.set("id",idComposite);

    productLine.set("priceType",data.priceType);
    productLine.set("colorName",pi.colorName);
    productLine.set("colorRgb",pi.colorRgb);
    productLine.set("eventId",pi.eventId);
    productLine.set("eventName",pi.eventName);
    productLine.set("eventWebPath",pi.eventWebPath);
    productLine.set("appellationClassificationAcronym",pi.appellationClassificationAcronym);
    productLine.set("appellationName",pi.appellationName);
    
    productLine.set("productWebPath", pi.productWebPath);
    productLine.set("wineryWebPath", pi.wineryWebPath);
    productLine.set("__wwp", pi.wineryWebPath); //keep wwp as an none productLine property so that it is used as plain json property
    productLine.__wineryWebPath =pi.wineryWebPath; //keep wwp as an none productLine property so that it is used as plain json property
    

    //productLine.__eventId = pi.eventId;
    productLine.set("__eventId",pi.eventId);
    productLine.set("__key",pi.wineryWebPath+"-"+pi.eventId);
    productLine.set("__productPrice",data.priceType);
    //TODO new field
    productLine.set("hasProductLogo", pi.hasProductLogo);
    productLine.set("hasWineryLogo", pi.hasWineryLogo);
    productLine.__hasWineryLogo = pi.hasWineryLogo;
    productLine.set("wineryId", pi.wineryId);
    productLine.__wineryId = pi.wineryId;
    productLine.set("winery", pi.winery);
    productLine.__winery = pi.winery;
    productLine.set("region", pi.region);
    productLine.set("detail", pi.detail);

    return productLine;
}
