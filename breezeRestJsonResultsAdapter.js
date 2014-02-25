define([
    'durandal/system',
    'services/logger'],
    function (system, logger) {

        var resultsAdapter = new breeze.JsonResultsAdapter({

            name: "breezeRestJsonResultsAdapter",

            extractResults: function (data) {
            	data = data.results;
                var results;

                // Get the name of the first property from the results object
                // Normally this could be a wrapper property for the results e.g.
                // Countries or Users, etc...
				// Although this is not technically required

                var propName = Object.keys(data)[0];

                var typeName = get_type(data[propName]);
                if(typeName.indexOf("Array") >= 0)
                {
                    // If we have a list of entities
                    results = data[propName];
                }
                else
                {
                    // If we have a single entity
                    results = [ data[propName] ];
                }

                if (!results) throw new Error("[breezeRestJsonResultsAdapter] Unable to resolve property that contains results");

                return results;
            },

            visitNode: function (node, parseContext, nodeContext) {

                var entityManager = parseContext.entityManager;
                var metadataStore = entityManager.metadataStore;

                if(node.entityAspect != null)
                {
                    if(node.entityAspect.entityType == null)
                    {
                        throw new Error("[breezeRestJsonResultsAdapter] - Unable to parse node with null entity type");
                    }

                    var entityType = metadataStore.getEntityType(node.entityAspect.entityType);
                    if(entityType == null)
                    {
                        throw new Error("[breezeRestJsonResultsAdapter] - Unable to parse node with unknown entity type: " + node.entityAspect.entityType);
                    }
                    // Then we are on a top level entity
                    return { entityType: node.entityAspect.entityType };
                }

                if(nodeContext.propertyName == "entityAspect")
                {
                   // Parsing the entityAspect object
                   return;
                }

            }
        });

        // TODO: Use underscore or another library to do this reliably

        /**
         * Gets the type of 'thing'
         * @param thing
         * @returns {string}
         */
        function get_type(thing){
            if(thing===null)return "[object Null]"; // special case
            return Object.prototype.toString.call(thing);
        }

        function removeWrapperObjectFromNavigationProperties(entityType, entity)
        {
            //var navProps = entityType.
        }

        return resultsAdapter;
    }

);
