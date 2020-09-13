import { helper } from '@ember/component/helper';

export function imageFormat(params/*, hash*/) {
  let [image, format] = params;
  //if format
  if (format) {
    //TODO unit test
    var start = image.substr(0, image.lastIndexOf("."));
    var ext = image.substr(image.lastIndexOf(".") + 1);
    return start+"."+format+"."+ext;
  }
  return image;
}

export default helper(imageFormat);
