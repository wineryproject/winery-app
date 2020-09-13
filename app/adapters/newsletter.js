import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';
import appendQuery from 'npm:append-query';

import config from '../config/environment';
const { host, namespace } = config.DSNewsletter;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

//blog

/* connector to BlogList info */
    blogList : function(params) {
        return fetchData(baseUrl+'/data/sdd/BlogListIn'+filterBlogList(params));
    },
	requestNewsletter: function(email){
        return $.post(baseUrl+'/data/sdd/RequestNewsletterIn', 
            {
				email : email,
				firstName : '',
				lastName : '',
            }
        );

    },
	revokeNewsletter: function(email){
        return $.post(baseUrl+'/data/sdd/RevokeNewsletterIn', 
            {
				email : email,
            }
        );
    },
});


//blog

/* filter for BlogList entity */
function filterBlogList (filter) {
	if (filter) {
		return appendQuery("",{
				"webPath":filter.webPath ,
				"isActive":filter.isActive ,
				"limit":filter.limit ,
				"offset":filter.offset ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			
