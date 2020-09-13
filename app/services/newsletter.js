import DS from 'ember-data';
import Adapter from '../adapters/newsletter';
import Service from '@ember/service';
import _ from 'lodash';

export default Service.extend({

//blog
    blogList (params) {
        var adapter = Adapter.create();
        return adapter.blogList(params).then(
            data => {
                _.each(data.BlogListOut, e => prepareBlog(e));
                return data.BlogListOut;
            }
        );
    },
    
});

function prepareBlog(blog) {
    blog.tags = blog.tags?blog.tags.split(','):[];
}
