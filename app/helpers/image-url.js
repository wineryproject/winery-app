import Ember from 'ember';

export function imageUrl(params/*, hash*/) {
  let [entity, id, webPath, pictureMediumSymlink] = params;
  const config = Ember.getOwner(this).resolveRegistration('config:environment');
  //TODO change with env url
  return 'https://winerylabs.com/images/'+entity+'/'+id+'_'+webPath+'/'+pictureMediumSymlink;
}

export default Ember.Helper.helper(imageUrl);
