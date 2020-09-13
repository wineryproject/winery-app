import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import _ from 'lodash';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

//TODO remove $.post for fetch
    feedback: function(feedback){
        return $.post(baseUrl+'/data/sdd/SendFeedbackPostIn', 
        {
            email : feedback.get("email"),
            category : feedback.get("category"),
            comments : feedback.get("comment"),
            origin : feedback.get("origin"),
            originUrl : feedback.get("origin"),
            languageCode : feedback.get("languageCode"),
            ip : feedback.get("ip")
        });
    },

    sendDescription: function(description){
        return $.post(baseUrl+'/data/sdd/SendDescriptionPostIn', 
        {
            email : description.get("email"),
            entityType : description.get("entityType"),
            entityValue : description.get("entityValue"),
            languageCode : description.get("languageCode"),
            description : description.get("description"),
            ip : description.get("ip")
        });
    },

    register: function(registration){
        return $.post(baseUrl+'/data/sdd/SendDomainInscriptionPostIn', 
            {
                payPlanId : 1,
                payPlanName : "Free",
                firstName : registration.firstName,
                lastName : registration.lastName,
                email : registration.email,
                domain : registration.domain,
                countryId : registration.countryId,
                countryName : registration.countryName,
                regionId : registration.regionId,
                regionName : registration.regionName,
                lieuDitId : registration.lieuDitId,
                lieuDitName : registration.lieuDitName,
                grapeIds : _.map(registration.gradeIds, 'id').join(),
                grapeNames : "TODO",
                languageCode : registration.languageCode,
                description : registration.description,
                ip : 'ip'
            }
        );

    },

    registerWithAddress: function(registration){
        //return $.post(baseUrl+'/data/sdd/SendDomainWithAddressInscriptionPostIn', 
        // url : baseUrl+'/data/sdd/SendDomainInscriptionPostIn/withValidation', 
        return $.post({
            url : baseUrl+'/data/sdd/SendDomainWithAddressInscriptionPostIn', 
            dataType: 'json',
            contentType: 'application/json',

            data : JSON.stringify({
                payPlanId : 1,
                payPlanName : "Free",
                firstName : registration.firstName,
                lastName : registration.lastName,
                email : registration.email,
                domain : registration.domain,
                countryId : registration.countryId,
                countryName : registration.countryName,
                regionId : registration.regionId,
                regionName : registration.regionName,
                lieuDitId : registration.lieuDitId,
                lieuDitName : registration.lieuDitName,

                street1 : registration.street1,
                street2 : registration.street2,
                place : registration.place,
                state : registration.state,
                postCode : registration.postCode,

                grapeIds : _.map(registration.gradeIds, 'id').join(),
                grapeNames : "TODO",
                languageCode : registration.languageCode,
                description : registration.description,
                ip : 'ip'
            })
        });
    }

    ,requestEvent: function(event){ 
        return $.post({
            url : baseUrl+'/data/sdd/SendEventRequestIn', 
            dataType: 'json',
            contentType: 'application/json',

            data : event
        });
    }
});
