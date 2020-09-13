// app/storages/countries.js
import StorageObject from 'ember-local-storage/local/object';
import CountryAdapter from '../adapters/country';
import { Promise, hash } from 'rsvp';

const Storage = StorageObject.extend();

//TODO check if service is injected in Storage

// Uncomment if you would like to set initialState
Storage.reopenClass({

   initialState() {

    var adapter = CountryAdapter.create(); 
    var countryPromise = adapter.findAll().then((data) => {
        return data.CountryDescriptionOut;
    });
    var promises = {
        country : countryPromise
    };

    return hash(promises).then(function(data) {
        return data.country;
    });

   }
});

export default Storage;