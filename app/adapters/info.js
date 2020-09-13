import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

const PATH = baseUrl+'/data/sdd/ImageAuthorIn';
const PATH_IMAGE_INFO = baseUrl+'/data/sdd/ImageInfoIn';

export default BaseAdapter.extend({

    findImageInfo(entityId, entityWebPath, displayOrder) {
        return fetchData(PATH+formatFilter(entityId, entityWebPath, displayOrder));
    },

    findImagesInfo(whereEntity, whereEntityWebPath) {
        return fetchData(PATH_IMAGE_INFO+formatFilterImagesInfo(whereEntity, whereEntityWebPath));
    },

});

function formatFilter(entityId, entityWebPath, displayOrder) {
    let ret = entityId?'entityId='+entityId:'';
    ret += entityWebPath?'&entityWebPath='+entityWebPath:'';
    ret += displayOrder?'&displayOrder='+displayOrder:'';
    return '?'+ret;
}

function formatFilterImagesInfo(entity, entityWebPath) {
    //whereentity=whereregion&whereentity_web_path=alsace
    let ret = entity?'whereentity='+entity:'';
    ret += entityWebPath?'&whereentity_web_path='+entityWebPath:'';
    return '?'+ret;
}
