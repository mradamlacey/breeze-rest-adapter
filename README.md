breeze-rest-adapter
===================

A dataservice adapter for BreezeJS to connect to a generic REST API.

# Overview

This adapter was implemented to allow integration between BreezeJS entities in the browser to a REST-ful service.
There are many examples that the BreezeJS team has provided on data service adapters for various backends like:
* [Breeze on the MEAN stack](http://www.breezejs.com/samples/zza)
* [Edmunds service example - generic read only service](http://www.breezejs.com/samples/edmunds)
* [Breeze with Ruby backend](http://www.breezejs.com/samples/intro-spa-ruby)

This example differs in that it makes the assumption that your resources can actually be object graphs of multiple entity types.  For example:

	{
	    "orderHeader" : {
		    "creator": "Bob",
			"createdDate": "20140101 00:00:00",
			"entityAspect": {
			    "entityType": "OrderHeader",
				"entityState": "Modified"
			}
		},
		"orderLineItems": [
		    {
			    productId: 3,
				amount: 1,
				"entityAspect": {
			        "entityType": "OrderLineItem",
				    "entityState": "Added"
			    }
			},
			{
			    productId: 10,
				amount: 5,
				"entityAspect": {
			        "entityType": "OrderLineItem",
				    "entityState": "Added"
			    }
			}
		],
		"entityAspect": {
			"entityType": "Order",
			"entityState": "Modified"
		}
	}
	
Here we have an 'Order' entity, with child properties that also entities, an 'OrderHeader' entity, and a collection of 'OrderLineItem' entities.
The data service adapter will look at all the changed entities in the local cache and build an object graph (based on the defined relationships
in the metadata).

Additionally this adapter makes the assumption that the backend service provides an 'entityAspect' object that is a property of every entity.
This is a helper property that allows the adapter to know which type of entity is being provided.

The adapter will also craft REST-like URLs for its requests.  E.g.:
	/service/order/3
	/service/order/4/orderItem/6

This adapters works in concert with a JsonResultsAdapter that parses the results from the service, looks at the entityAspect property
and returns to Breeze all the entities it finds in the result.

# Installation
* Simply include the data service adapter script file: `breezeRestDataServiceAdapter.js`
* Include the JsonResultsAdapter script file: `breezeRestJsonResultsAdapter.js`
* Include the following code when setting up your Breeze Data Service:

	breeze.config.initializeAdapterInstances({dataService: "REST"});
	

